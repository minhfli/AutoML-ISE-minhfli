import React from 'react'
import { useDropzone } from 'react-dropzone';

interface MyDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

function MyDropzone({ onDrop }: MyDropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone-container">
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}

export default MyDropzone;
