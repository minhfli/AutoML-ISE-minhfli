from autogluon.multimodal import AutoMMPredictor
import pandas as pd
predictor = AutoMMPredictor.load('./trained_models/9310817e4e704ff5967a9c4ac247293c-automm_flowers')
test_data = pd.read_csv('./datasets/dataset_splits/test.csv')
score = predictor.evaluate(test_data, metrics=['accuracy'])

print('Top 1 test-acc: %.3f' % score["accuracy"])