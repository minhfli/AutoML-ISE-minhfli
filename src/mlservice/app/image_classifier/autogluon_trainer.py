from pathlib import Path
from autogluon.multimodal import MultiModalPredictor
from typing import Optional, Union
import asyncio
from typing import Optional, Union
from autogluon.multimodal import MultiModalPredictor
import logging

class AutogluonTrainer(object):
	def __init__(self, kwargs: Optional[dict]=None):
		self._logger = logging.getLogger(__name__)
		self._logger.setLevel(logging.INFO)

		self.parse_args(kwargs)
   
	def parse_args(self, kwargs:Optional[dict]=None):
		if not kwargs: return
		self.model_args= kwargs.setdefault("ag_model_args", {})
		self.fit_args = kwargs.setdefault("ag_fit_args", {
			"time_limit":30,
			"hyperparameters":{
				"env.precision": "bf16-mixed",
				"env.compile.turn_on": True,
				"env.compile.mode": "reduce-overhead",
				"env.per_gpu_batch_size": 4,
				"env.batch_size": 4
			}
		})
  

	def train(self, train_data_path: Path, val_data_path: Path, model_path: Path) -> Union[MultiModalPredictor, None]:
		try:
			predictor = MultiModalPredictor(label="label", path=str(model_path), **self.model_args)
			predictor.fit(
       			str(train_data_path), str(val_data_path),
				save_path=str(model_path),
				**self.fit_args,
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


	async def train_async(self, train_data_path: Path, val_data_path: Path, model_path: Path,
						time_expected: int) -> Union[MultiModalPredictor, None]:
		return await asyncio.to_thread(self.train, train_data_path, val_data_path, model_path, time_expected)


	def evaluate(self, predictor: MultiModalPredictor, test_data_path: Path) -> Optional[float]:
		try:
			test_acc = predictor.evaluate(str(test_data_path), metrics="accuracy")
			print(f"Test accuracy: {test_acc}")
			return test_acc
		except Exception as e:
			print(f"An unexpected error occurred: {e}")
			# Handle any other unexpected exceptions.
			# It's often a good idea to log the exception details here for later debugging.
		return None


	async def evaluate_async(self, predictor: MultiModalPredictor, test_data_path: Path) -> Optional[float]:
		return await asyncio.to_thread(self.evaluate, predictor, test_data_path)
