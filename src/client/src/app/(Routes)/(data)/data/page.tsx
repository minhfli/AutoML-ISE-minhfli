// [id].tsx or [page].tsx or any other page file
"use client";
import React from "react";
import Dropzone from "react-dropzone";
export default function DataPage() {
  return (
    <div className="container mx-auto bg-gray-100 px-4 py-5">
      <h2 className="mb-3 text-xl font-semibold">
        Prepare your data for Image Classification
      </h2>
      <p className="mb-6">
        AutoTrain needs example data which can be uploaded using one of the two
        methods below, or imported from the Hugging Face Hub.
      </p>

      <div className="flex flex-wrap gap-10 md:flex-nowrap">
        <div className="md:flex-1">
          <h3 className="mb-2 text-lg font-bold">
            Method 1: Pre-arranged folders
          </h3>
          <p className="mb-4">
            Organize your images in folders named according to their
            corresponding classes (for instance "dog" or "cat"). Then, upload
            the parent folder using the input below.
          </p>
          {/* Add your input or form for uploading folders here */}
        </div>

        <div className="md:flex-1">
          <h3 className="mb-2 text-lg font-bold">
            Method 2: CSV/JSONL with associated images
          </h3>
          <p className="mb-4">
            Upload a .csv or .jsonl file, then the associated images. Each data
            file should have at least 2 columns: one for{" "}
            <code>image_relpath</code>, and one for <code>target</code>.
          </p>
          {/* Add your input or form for uploading CSV/JSONL here */}
        </div>
      </div>
      <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
        {/* Your Dropzone here */}
        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    </div>
  );
}
