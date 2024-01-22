from pathlib import Path
import asyncio
from typing import Optional, Union

from autogluon.multimodal import MultiModalPredictor
import logging
import pandas as pd
import time

from app.image_classifier.available_checkpoint import Timm_Checkpoint

class AutogluonTrainer(object):
    def __init__(self, kwargs: Optional[dict] = None):
        self.fit_args = None
        self.model_args = None
        self._logger = logging.getLogger(__name__)
        self._logger.setLevel(logging.INFO)

        self.parse_args(kwargs)

    def parse_args(self, kwargs: Optional[dict] = None):
        if not kwargs: return
        self.model_args = kwargs.setdefault("ag_model_args", {
            "problem_type": "classification",
        })
        self.fit_args = kwargs.setdefault("ag_fit_args", {
            "time_limit": 60,
            "hyperparameters": {
                "env.precision": "bf16-mixed",
                "env.compile.turn_on": True,
                "env.compile.mode": "reduce-overhead",
                "env.per_gpu_batch_size": 16,
                "env.batch_size": 16,
                "optimization.efficient_finetune": "lora",
                "optimization.log_every_n_steps": 2,
                "env.num_workers_evaluation": 16,
                "model.timm_image.checkpoint_name": Timm_Checkpoint.swin_small_patch4_window7_224
            }
        })
    

    def train(self, train_data_path: Path, val_data_path: Path, model_path: Path) -> Union[MultiModalPredictor, None]:
        try:
            # doan nay init lau thi cache lai dung job lib
            # https://joblib.readthedocs.io/en/latest/auto_examples/memory_basic_usage.html
            predictor = MultiModalPredictor(label="label", path=str(model_path), **self.model_args)
            logging.basicConfig(level=logging.DEBUG)
            predictor.fit(
                train_data= pd.read_csv(train_data_path),
                tuning_data=str(val_data_path),
                save_path=str(model_path),
                **self.fit_args,
            )
            
            print(predictor.fit_summary(4, True))
            self._logger.info(f"Training completed. Model saved to {model_path}")
            return predictor
        except ValueError as ve:
            self._logger.error(f"Value Error: {ve}")
        # Handle specific ValueError which might occur due to wrong parameter values, etc.
        except FileNotFoundError as fnfe:
            self._logger.error(f"File Not Found Error: {fnfe}")
        # Handle FileNotFoundError which might occur if the dataset paths are incorrect.
        except Exception as e:
            self._logger.error(f"An unexpected error occurred: {e}")
        # Handle any other unexpected exceptions.
        # It's often a good idea to log the exception details here for later debugging.
        return None

    async def train_async(self, train_data_path: Path, val_data_path: Path, model_path: Path) -> Union[
        MultiModalPredictor, None]:
        return await asyncio.to_thread(self.train, train_data_path, val_data_path, model_path)

    @staticmethod
    def evaluate(predictor: MultiModalPredictor, test_data_path: Path,
                 metrics: str = "accuracy") -> Optional[float]:

        try:
            test_acc = predictor.evaluate(
                pd.read_csv(test_data_path), metrics=metrics, chunk_size = 4096 ,realtime=True).get("accuracy")
            return test_acc
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            return None
            # Handle any other unexpected exceptions.
            # It's often a good idea to log the exception details here for later debugging.
            

   