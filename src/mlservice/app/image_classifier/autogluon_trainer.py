from autogluon.multimodal import MultiModalPredictor
from image_classifier.data.process_image import split_imagefolder
import datetime
import os
import shutil
from gcp.fetch_data import download_folder


def train(dataset_name):
    dataset_directory = "./image_classifier/datasets/" # hardcoded
    datasplits_directory = os.path.join(dataset_directory, "datasplits")
    if not os.path.exists(os.path.join(dataset_directory, dataset_name)):
        print("Fetching dataset from GCP")
        try:
            download_folder("automl_imagebucket", dataset_name, dataset_directory)
        except FileNotFoundError as e:
            raise Exception("Dataset does not exist!")
    print("Splitting train, validate, test sets...")
    if os.path.exists(datasplits_directory):
        shutil.rmtree(datasplits_directory)
    train_df, valid_df, test_df = split_imagefolder(os.path.join(dataset_directory, dataset_name),
                                                    datasplits_directory)

    model_path = f"./trained_models/{datetime.datetime.now().strftime('%y%m%s%H%M%S')}-automm_{dataset_name}"
    predictor = MultiModalPredictor(label="label", path=model_path)
    predictor.fit(train_data=train_df, tuning_data=valid_df, time_limit=30,
                hyperparameters={
                    "env.per_gpu_batch_size": 4,
                    "env.batch_size": 4
                })

    score = predictor.evaluate(test_df, metrics=['accuracy'])

    print('Top 1 test-acc: %.3f' % score["accuracy"])
