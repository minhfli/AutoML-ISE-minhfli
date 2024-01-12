import os
import logging
from dotenv import load_dotenv

load_dotenv()

def _authenticate_client():
    from google.cloud.storage import Client
    
    storage_client = Client.from_service_account_json(os.path.join("..", os.getenv("GCP_CREDENTIALS")))
    return storage_client

def download_folder(
    bucket_name, source_directory="flower/", destination_directory="", workers=8, logger=None
):
    """Download a folder in a bucket, concurrently in a process pool.
    Directories will be created automatically as needed, for instance to
    accommodate blob names that include slashes.
    """

    from google.cloud.storage import transfer_manager
    import os
    storage_client = _authenticate_client()
    bucket = storage_client.bucket(bucket_name)

    blob_names = [blob.name for blob in bucket.list_blobs()
                  if os.path.normpath(blob.name).startswith(os.path.join(source_directory, ""))]
    if len(blob_names) == 0:
        raise FileNotFoundError("Folder not found!")
    if logger is None:
        logger = logging.getLogger(__name__)
        logger.setLevel(logging.INFO)
    
    logger.info("Preparing to download %s blobs from bucket %s" % (len(blob_names), bucket_name))
    results = transfer_manager.download_many_to_path(
        bucket, blob_names, destination_directory=destination_directory, max_workers=workers
    )

    for name, result in zip(blob_names, results):
        # The results list is either `None` or an exception for each blob in
        # the input list, in order.

        if isinstance(result, Exception):
            logger.info("Failed to download {} due to exception: {}".format(name, result))
        else:
            logger.info("Downloaded {} to {}.".format(name, destination_directory + name))
            
def download_file(
    bucket_name, source_blob_name="flower/", destination_file_name="", logger=None):
    """Downloads a blob from the bucket."""
    # The ID of your GCS bucket
    # bucket_name = "your-bucket-name"

    # The ID of your GCS object
    # source_blob_name = "storage-object-name"

    # The path to which the file should be downloaded
    # destination_file_name = "local/path/to/file"
    storage_client = _authenticate_client()

    bucket = storage_client.bucket(bucket_name)

    # Construct a client side representation of a blob.
    # Note `Bucket.blob` differs from `Bucket.get_blob` as it doesn't retrieve
    # any content from Google Cloud Storage. As we don't need additional data,
    # using `Bucket.blob` is preferred here.
    blob = bucket.blob(source_blob_name)
    os.makedirs(os.path.dirname(destination_file_name), exist_ok=True)
    blob.download_to_filename(destination_file_name)

    if logger is None:
        logger = logging.getLogger(__name__)
        logger.setLevel(logging.INFO)
    logger.info(
        "Downloaded storage object {} from bucket {} to local file {}.".format(
            source_blob_name, bucket_name, destination_file_name
        )
    )
