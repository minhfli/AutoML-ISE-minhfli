def download_folder(
    bucket_name, source_directory="flower/", destination_directory="", workers=8
):
    """Download a folder in a bucket, concurrently in a process pool.
    Directories will be created automatically as needed, for instance to
    accommodate blob names that include slashes.
    """

    from google.cloud.storage import Client, transfer_manager
    import os
    storage_client = Client()
    bucket = storage_client.bucket(bucket_name)

    blob_names = [blob.name for blob in bucket.list_blobs()
                  if os.path.normpath(blob.name).startswith(os.path.join(source_directory, ""))]
    if len(blob_names) == 0:
        raise FileNotFoundError("Folder not found!")
    print("Preparing to download %s blobs from bucket %s" % (len(blob_names), bucket_name))
    results = transfer_manager.download_many_to_path(
        bucket, blob_names, destination_directory=destination_directory, max_workers=workers
    )

    for name, result in zip(blob_names, results):
        # The results list is either `None` or an exception for each blob in
        # the input list, in order.

        if isinstance(result, Exception):
            print("Failed to download {} due to exception: {}".format(name, result))
        else:
            print("Downloaded {} to {}.".format(name, destination_directory + name))