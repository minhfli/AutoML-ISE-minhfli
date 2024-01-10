from pathlib import Path

from autogluon.multimodal import MultiModalPredictor
from typing import Optional, Union

import asyncio


def train(train_data_path: Path, val_data_path: Path, model_path: Path,
          time_expected: int) -> Union[MultiModalPredictor, None]:
    try:
        predictor = MultiModalPredictor(label="label", path=str(model_path))
        predictor.fit(str(train_data_path), str(val_data_path),
                      time_limit=time_expected,
                      save_path=str(model_path),
                      hyperparameters={
                          "env.precision": "bf16-mixed",
                          "env.compile.turn_on": True,
                          "env.compile.mode": "reduce-overhead"
                      }
                      )
        print("Training completed successfully.")
        return predictor
    except ValueError as ve:
        print(f"Value Error: {ve}")
        # Handle specific ValueError which might occur due to wrong parameter values, etc.
    except FileNotFoundError as fnfe:
        print(f"File Not Found Error: {fnfe}")
        # Handle FileNotFoundError which might occur if the dataset paths are incorrect.
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        # Handle any other unexpected exceptions.
        # It's often a good idea to log the exception details here for later debugging.
    return None


async def train_async(train_data_path: Path, val_data_path: Path, model_path: Path,
                      time_expected: int) -> Union[MultiModalPredictor, None]:
    return await asyncio.to_thread(train, train_data_path, val_data_path, model_path, time_expected)


def evaluate(predictor: MultiModalPredictor, test_data_path: Path) -> Optional[float]:
    try:
        test_acc = predictor.evaluate(str(test_data_path), metrics="accuracy")
        print(f"Test accuracy: {test_acc}")
        return test_acc
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        # Handle any other unexpected exceptions.
        # It's often a good idea to log the exception details here for later debugging.
    return None


async def evaluate_async(predictor: MultiModalPredictor, test_data_path: Path) -> Optional[float]:
    return await asyncio.to_thread(evaluate, predictor, test_data_path)
