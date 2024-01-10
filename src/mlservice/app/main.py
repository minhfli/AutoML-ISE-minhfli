import os
from fastapi import FastAPI
from contextlib import asynccontextmanager

from ray import serve

from image_classifier import routes as image_classifier_routes

app = FastAPI()


@asynccontextmanager  # lifespan cua context, sau nay su dung de release resource sau khi serve xong model
def init():
    pass


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(image_classifier_routes.router)


@serve.deployment(num_replicas=1, ray_actor_options={"num_cpus": 8, "num_gpus": 1})
@serve.ingress(app)
class FastAPIWrapper:
    pass


if __name__ == "__main__":
    ray_app = FastAPIWrapper.bind()
    os.system("uvicorn main:app --reload")
    # os.system("serve run main:ray_app")
