from pydantic import BaseModel
from pydantic.fields import Field
from pydantic.networks import HttpUrl
from pathlib import Path


class TrainingRequest(BaseModel):
    # Mỗi user là 1 bucket riêng trong GCS
    username: str = Field(default="lexuanan18102004", title="Username to get the bucket => Have to be unique")
    project_name: str = Field(default="flower-classifier", title="Project name")
    request_body: dict = Field(default=
    {
        "data_args": {},
        "ag_model_args": {
            "pretrained": True,
            "hyperparameters": {
                "model.timm_image.checkpoint_name": "swin_small_patch4_window7_224"
            }
        },
        "ag_fit_args": {
            "time_limit": 60,
            "hyperparameters":{
                "env.per_gpu_batch_size": 128,
                "env.batch_size": 128
            }
        }
    }, title="Training arguments.")