from app.utils.gcp import Storage

storage = None


def get_storage_client() -> Storage:
    global storage
    if storage is None:
        storage = Storage()  # Your function to initialize the client
    return storage
