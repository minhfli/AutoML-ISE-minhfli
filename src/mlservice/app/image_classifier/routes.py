import os
from pathlib import Path
from time import perf_counter
from zipfile import ZipFile
import uuid
from fastapi import APIRouter
from fastapi import HTTPException
from contextlib import asynccontextmanager

from app.image_classifier.autogluon_trainer import train_async
from app.image_classifier.model import TrainingRequest
from app.utils import storage
from app.utils.dataset_utils import split_data, create_csv, remove_folders_except, create_folder

router = APIRouter()


@asynccontextmanager
# TODO : https://fastapi.tiangolo.com/advanced/events/?h=life  @DuongNam
@router.post("/api/image_classifier/train", tags=["image_classifier"])
async def handler(request: TrainingRequest):
    dataset_path = ""
    start = perf_counter()

    print("Training request received")
    try:
        dataset_path = Path(f"/tmp/{request.username}-{uuid.uuid4()}.zip")
        res = await storage.download_blob_async(request.username,
                                                f"{request.project_name}/datasets/datasets.zip",
                                                dataset_path)

        if res is None or not res:
            raise ValueError("Error in downloading folder")

        # Có thể dùng /dev/shm để truy cập nhanh hơn /tmp chi sau RAM
        # https://stackoverflow.com/questions/9745281/tmp-vs-dev-shm-for-temp-file-storage-on-linux
        user_dataset_path = f"/tmp/{request.username}/datasets/"

        with ZipFile(dataset_path, 'r') as zip_ref:
            zip_ref.extractall(user_dataset_path)

        # Dcm refactor lại code đc k a Nam =)))

        split_data(Path(user_dataset_path), f"{user_dataset_path}/split/")
        # TODO : User can choose ratio to split data
        # assume user want to split data into 80% train, 10% val, 10% test
        create_csv(Path(f"{user_dataset_path}/split/train"), Path(f"{user_dataset_path}/train.csv"))
        create_csv(Path(f"{user_dataset_path}/split/val"), Path(f"{user_dataset_path}/val.csv"))
        create_csv(Path(f"{user_dataset_path}/split/test"), Path(f"{user_dataset_path}/test.csv"))
        create_folder(Path(user_dataset_path), "trained_models")

        # delete all folders except split folder to save memory
        remove_folders_except(Path(user_dataset_path), "split")

        await train_async(
            Path(f"{user_dataset_path}/split/train"),
            Path(f"{user_dataset_path}/split/val"),
            Path(f"{user_dataset_path}/trained_models"),
            request.time_expected
        )



    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error in downloading or extracting folder: {str(e)}")
    finally:
        if os.path.exists(dataset_path):
            os.remove(dataset_path)

    end = perf_counter()
    return {"Time to download and extract": end - start}
