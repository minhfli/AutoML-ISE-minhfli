from autogluon.multimodal import MultiModalPredictor
import pandas as pd
from PIL import Image
import matplotlib.pyplot as plt
import random


# Load model
predictor = MultiModalPredictor.load(
    './trained_models/23111701060755115235-automm_flowers')
test_data = pd.read_csv('./datasets/dataset_splits/test.csv')

# Evaluate test score
score = predictor.evaluate(test_data, metrics=['accuracy'])
print('Top 1 test-acc: %.3f' % score["accuracy"])

# Predict
img_id = random.randint(0, len(test_data))
img = Image.open(test_data.image.iloc[img_id])
pred = predictor.predict(test_data.iloc[[img_id]]).iloc[0]
plt.imshow(img)
plt.title(pred)
plt.show()
