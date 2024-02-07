import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
import argparse
from sklearn import ensemble
import os

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--data-path", type=str, required=True, help="Path to training data")
    parser.add_argument("--test-size", type=float, default=0.2, help="Size of the test dataset")
    parser.add_argument("--random-state", type=int, default=42, help="Random state for splitting data")
    parser.add_argument("--n-estimators", type=int, default=100, help="Number of trees in the forest")
    parser.add_argument("--learning-rate", type=float, default=1.0, help="Learning rate")
    parser.add_argument("--max-depth", type=int, default=1, help="Maximum depth of the trees")
    parser.add_argument("--output-path", type=str, default="/tmp/data/score.txt", help="Path to output the score")
    args = parser.parse_args()

    train_data = pd.read_csv(args.data_path)
    features = ['Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare']
    X = train_data[features]
    y = train_data['Survived']

    X_train, X_val, y_train, y_val = train_test_split(
        X, y, test_size=args.test_size, random_state=args.random_state)

    numerical_cols = ['Age', 'SibSp', 'Parch', 'Fare']
    categorical_cols = ['Pclass', 'Sex']

    numerical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())])

    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('onehot', OneHotEncoder(handle_unknown='ignore'))])

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numerical_transformer, numerical_cols),
            ('cat', categorical_transformer, categorical_cols)])

    model = ensemble.GradientBoostingClassifier(
        n_estimators=args.n_estimators, 
        learning_rate=args.learning_rate,
        max_depth=args.max_depth, 
        random_state=args.random_state)

    clf = Pipeline(steps=[('preprocessor', preprocessor),
                          ('model', model)])

    clf.fit(X_train, y_train)
    
    preds = clf.predict(X_val)

    score = accuracy_score(y_val, preds)

    os.makedirs(os.path.dirname(args.output_path), exist_ok=True)
    
    with open(args.output_path, "w") as file:
        file.write(str(score))
