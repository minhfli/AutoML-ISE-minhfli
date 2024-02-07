#!/bin/bash
sudo yum update -y
sudo yum upgrade -y

sudo yum install -y python3-pip npm git docker epel-release parallel
sudo systemctl start docker && sudo systemctl enable docker

aws s3 cp s3://${bucket_name}/${project_name}/ /home/${bucket_name}/${project_name} --recursive
aws s3 cp s3://automl-train-script/xg-boost.py /home/${bucket_name}/${project_name}/xg-boost.py

sudo chmod 777 /home/${bucket_name}/${project_name}/
sudo touch /tmp/data/score.txt
sudo chmod 777 /tmp/data/

cd /home/${bucket_name}/${project_name}
python3 -m venv /home/${bucket_name}/${project_name}/venv
source /home/${bucket_name}/${project_name}/venv/bin/activate &&
pip install sklearn pyarrow xgboost pandas numpy joblib &&
python3 /home/${bucket_name}/${project_name}/xg-boost.py --data-path="/home/${bucket_name}/${project_name}/${project_name}.csv"

