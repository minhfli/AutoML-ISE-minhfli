import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface MyDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const DropZone: React.FC<MyDropzoneProps> = ({ onDrop }) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      // Process images and create previews
      const newImagePreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prevImagePreviews) => [
        ...prevImagePreviews,
        ...newImagePreviews,
      ]);

      // Call the callback function to pass the acceptedFiles value out of the component
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropCallback,
  });

  return (
    <div className="">
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop images here, or click to select images</p>
      </div>
      {imagePreviews.length > 0 && imagePreviews.length <= 100 && (
        <div
          style={{
            overflowY: "auto", // Vertical scrollbar
            maxHeight: "250px", // Set a max height to limit the number of images displayed vertically
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            maxWidth: "100%",
            whiteSpace: "nowrap",
          }}
        >
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index}`}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "50px",
                maxHeight: "50px",
              }}
            />
          ))}
        </div>
      )}

      {imagePreviews.length > 100 && (
        <div
          style={{
            overflowX: "auto", // Horizontal scrollbar
            whiteSpace: "nowrap",
            display: "flex",
            maxWidth: "100%",
          }}
        >
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index}`}
              style={{
                flex: "0 0 auto",
                width: "50px",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "50px",
                
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DropZone;
