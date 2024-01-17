from torch import mm
from app.utils.dataset_utils import find_latest_model, split_data, create_csv, remove_folders_except, create_folder
from app.utils import storage
from app.image_classifier.model import TrainingRequest
from app.image_classifier.autogluon_trainer import AutogluonTrainer
from app.image_classifier.autogluon_predictor import AutogluonPredictor
from contextlib import asynccontextmanager
from fastapi import HTTPException
import os
import joblib
from pathlib import Path
from time import perf_counter
from zipfile import ZipFile
import uuid
from fastapi import APIRouter, File, Form, UploadFile
import pandas as pd
import warnings
from autogluon.multimodal import MultiModalPredictor
warnings.filterwarnings('ignore')


router = APIRouter()

memory = joblib.Memory("/tmp", verbose=0, mmap_mode="r", bytes_limit=1024*1024*1024*10)

@memory.cache
def load_model_from_path(model_path: str) -> MultiModalPredictor:
    return MultiModalPredictor.load(model_path)

async def load_model(user_name: str, project_name: str) -> MultiModalPredictor:
    model_path = find_latest_model(f"/tmp/{user_name}/{project_name}/trained_models")
    return load_model_from_path(model_path)



@asynccontextmanager
# TODO : https://fastapi.tiangolo.com/advanced/events/?h=life  @DuongNam
@router.post("/api/image_classifier/train", tags=["image_classifier"])
async def handler(request: TrainingRequest):
    temp_dataset_path = ""
    start = perf_counter()

    print("Training request received")
    try:
        # temp folder to store dataset and then delete after training
        temp_dataset_path = Path(
            f"/tmp/{request.username}/{request.project_name}/datasets.zip")
        os.makedirs(temp_dataset_path.parent, exist_ok=True)

        res = await (storage.download_blob_async(request.username,
                                                 f"{request.project_name}/datasets/datasets.zip",
                                                 temp_dataset_path))

        download_end = perf_counter()

        if res is None or not res:
            raise ValueError("Error in downloading folder")

        user_dataset_path = f"/tmp/{request.username}/{request.project_name}/datasets"
        user_model_path = f"/tmp/{request.username}/{request.project_name}/trained_models/{uuid.uuid4()}"
        
        create_folder(Path(user_dataset_path))

        with ZipFile(temp_dataset_path, 'r') as zip_ref:
            zip_ref.extractall(user_dataset_path)

        split_data(Path(user_dataset_path), f"{user_dataset_path}/split/")

        # # TODO : User can choose ratio to split data @DuongNam
        # # assume user want to split data into 80% train, 10% val, 10% test

        create_csv(Path(f"{user_dataset_path}/split/train"),
                   Path(f"{user_dataset_path}/train.csv"))
        create_csv(Path(f"{user_dataset_path}/split/val"),
                   Path(f"{user_dataset_path}/val.csv"))
        create_csv(Path(f"{user_dataset_path}/split/test"),
                   Path(f"{user_dataset_path}/test.csv"))
        
        remove_folders_except(Path(user_dataset_path), "split")

        trainer = AutogluonTrainer(request.training_argument)
        model = await trainer.train_async(
            Path(f"{user_dataset_path}/train.csv"),
            Path(f"{user_dataset_path}/val.csv"),
            Path(f"{user_model_path}")
        )

        if model is None:
            raise ValueError("Error in training model")

        acc = AutogluonTrainer.evaluate(
            model, Path(f"{user_dataset_path}/test.csv"))

        end = perf_counter()

        return {
            "status": "success",
            "message": "Training completed",
            "accuracy": acc,
            "time": end - start,
            "download_time": download_end - start,
            "model_path": user_model_path, 
            "model_size" : os.path.getsize(user_model_path)
        }

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error in downloading or extracting folder: {str(e)}")
    finally:
        if os.path.exists(temp_dataset_path):
            os.remove(temp_dataset_path)


@router.post("/api/image_classifier/predict", tags=["image_classifier"])
async def predict(
    user_name: str = Form("lexuanan18102004"),
    project_name: str = Form("flower-classifier"),
    image : UploadFile = File(...)
):
    try:
        # write the image to a temporary file
        temp_image_path = f"/tmp/{user_name}/{project_name}/temp.jpg"
        os.makedirs(Path(temp_image_path).parent, exist_ok=True)
        with open(temp_image_path, "wb") as buffer:
            buffer.write(await image.read())
        
        start_load = perf_counter()
        # TODO : Load model with any path
        model = await load_model(user_name, project_name)
        load_time = perf_counter() - start_load
        inference_start = perf_counter()
        predictions = model.predict(temp_image_path,
                                    realtime=True,
                                    )
                

        return {
            "status": "success",
            "message": "Prediction completed",
            "load_time": load_time,
            "inference_time": perf_counter() - inference_start,
            "predictions": str(predictions),
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error in prediction: {str(e)}")
    finally:
        if os.path.exists(temp_image_path):
            os.remove(temp_image_path)
