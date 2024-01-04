from typing import Union
import uvicorn
from fastapi import FastAPI
from image_classifier import routes as image_classifier_routes

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(image_classifier_routes.router)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8192)