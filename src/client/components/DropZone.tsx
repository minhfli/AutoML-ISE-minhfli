import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface MyDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const DropZone: React.FC<MyDropzoneProps> = ({ onDrop }) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      // Xử lý ảnh và tạo xem trước
      const newImagePreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prevImagePreviews) => [
        ...prevImagePreviews,
        ...newImagePreviews,
      ]);

      // Gọi hàm callback để truyền giá trị acceptedFiles ra khỏi component
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
      {imagePreviews.length > 0 && (
        <div>
          <h3>Image Previews:</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                style={{
                  maxWidth: "50px",
                  maxHeight: "50px",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropZone;
