from pydantic import BaseModel
from pydantic.fields import Field
from pydantic.networks import HttpUrl
from pathlib import Path


class TrainingRequest(BaseModel):
    # Mỗi user là 1 bucket riêng trong GCS
    username: str = Field(default="lexuanan18102004", title="Username to get the bucket => Have to be unique")
    project_name: str = Field(default="flower-classifier", title="Project name")
    time_expected: int = Field(default=90, title="Time expected to train model")
