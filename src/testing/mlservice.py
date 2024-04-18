from cgi import test
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), "..","mlservice/app/tabular/"))
import autogluon_trainer

train_path=os.path.dirname(__file__)+"/titanic/train.csv"
test_path=os.path.dirname(__file__)+"/titanic/test.csv"
target="Survived"
current_dir = os.path.dirname(__file__)

trainer = autogluon_trainer.AutogluonTrainer()
model = trainer.train(target, train_path, None, "./models/autogluon")

output= model.predict(test_path)

import pandas as pd
output = pd.DataFrame(output)
test_csv=pd.read_csv(test_path)
output.insert(0, "PassengerId", test_csv["PassengerId"])
output.columns = ["PassengerId", "Survived"]

output.to_csv(os.path.join(current_dir, "titanic_output.csv"), index=False)

print(output.head())