from fastapi import APIRouter, Path, Query, Request, HTTPException
from image_classifier.autogluon_trainer import train
router = APIRouter()


@router.post("/image_classifier/train/{username}/{dataset_name}/")
async def train_image_classifier(
        username: str = Path(..., description="Username of the user posting the request"),
        dataset_name: str = Path(..., description="Name of the dataset to train on"),
):
    """
    Starts image classifier training based on the provided dataset and username.
    """

    # Access dataset and username for training logic
    print(f"Starting training with dataset: {dataset_name} for user: {username}")

    try:
        train(dataset_name)
    except Exception as e:
        raise HTTPException(status_code=500, detail={"error": str(e)})

    return {"message": "Image classifier training started successfully"}
