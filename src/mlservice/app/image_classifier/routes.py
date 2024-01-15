import os
from pathlib import Path
from time import perf_counter
from zipfile import ZipFile
import uuid
from fastapi import APIRouter
from fastapi import HTTPException
from contextlib import asynccontextmanager

from app.image_classifier.autogluon_trainer import AutogluonTrainer
from app.image_classifier.model import TrainingRequest
from app.utils import storage
from app.utils.dataset_utils import split_data, create_csv, remove_folders_except, create_folder

router = APIRouter()


@asynccontextmanager
# TODO : https://fastapi.tiangolo.com/advanced/events/?h=life  @DuongNam
@router.post("/api/image_classifier/train", tags=["image_classifier"])
async def handler(request: TrainingRequest):
    temp_dataset_path = ""
    start = perf_counter()

    print("Training request received")
    try:
        # temp folder to store dataset and then delete after training
        temp_dataset_path = Path(f"/tmp/{request.username}/{request.project_name}/datasets.zip")
        os.makedirs(temp_dataset_path.parent, exist_ok=True)

        res = await (storage.download_blob_async(request.username,
                                                 f"{request.project_name}/datasets/datasets.zip",
                                                 temp_dataset_path))

        print(f"time to download: {perf_counter() - start}")

        if res is None or not res:
            raise ValueError("Error in downloading folder")

        user_dataset_path = f"/tmp/{request.username}/{request.project_name}/datasets"
        create_folder(Path(user_dataset_path))

        with ZipFile(temp_dataset_path, 'r') as zip_ref:
            zip_ref.extractall(user_dataset_path)

        split_data(Path(user_dataset_path), f"{user_dataset_path}/split/")

        # # TODO : User can choose ratio to split data @DuongNam
        # # assume user want to split data into 80% train, 10% val, 10% test

        create_csv(Path(f"{user_dataset_path}/split/train"), Path(f"{user_dataset_path}/train.csv"))
        create_csv(Path(f"{user_dataset_path}/split/val"), Path(f"{user_dataset_path}/val.csv"))
        create_csv(Path(f"{user_dataset_path}/split/test"), Path(f"{user_dataset_path}/test.csv"))
        remove_folders_except(Path(user_dataset_path), "split")


        trainer = AutogluonTrainer(request.training_argument)
        model = await trainer.train_async(
            Path(f"{user_dataset_path}/train.csv"),
            Path(f"{user_dataset_path}/val.csv"),
            Path(f"{user_dataset_path}/trained_models")
        )

        if model is None:
            raise ValueError("Error in training model")

        acc = await AutogluonTrainer.evaluate_async(model, Path(f"{user_dataset_path}/test.csv"))

        end = perf_counter()

        return {
            "status": "success",
            "message": "Training completed",
            "accuracy": acc,
            "time": end - start
        }

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error in downloading or extracting folder: {str(e)}")
    finally:
        if os.path.exists(temp_dataset_path):
            os.remove(temp_dataset_path)


@router.post("/api/image_classifier/predict", tags=["image_classifier"])
def predict():
    pass
