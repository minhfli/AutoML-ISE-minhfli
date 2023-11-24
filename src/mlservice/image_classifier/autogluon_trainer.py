from autogluon.multimodal import MultiModalPredictor
import uuid
import pandas as pd
from data.process_image import prepare_imagefolder

train_df, valid_df, test_df = prepare_imagefolder('./datasets/flowers', './datasets/dataset_splits')

model_path = f"./trained_models/{uuid.uuid4().hex}-automm_flowers"
predictor = MultiModalPredictor(label="label", path=model_path)
predictor.fit(train_data=train_df, tuning_data=valid_df, time_limit=90)

score = predictor.evaluate(test_df, metrics=['accuracy'])

print('Top 1 test-acc: %.3f' % score["accuracy"])
