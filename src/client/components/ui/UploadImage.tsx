import React, { useState } from "react";
import DropZone from "@/components/ui/DropZone";

interface UploadImageProps {
  onUpload: () => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onUpload }) => {
  const [showDropzone, setShowDropzone] = useState(false);

  const sleep = (milliseconds: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const handleButtonClick = async () => {
    try {
      console.log("Start sleeping...");
      await sleep(1000);
      console.log("End sleeping. Continue with other async tasks...");
      setShowDropzone(true);
      onUpload(); // Call the onUpload prop when the button is clicked
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFilesSelected = async (files: File[]) => {
    try {
      await sleep(1000);
      files.forEach((file, index) => {
        console.log(`File ${index + 1}: ${file.name}`);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleButtonClick}>
        <div className="flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </g>
          </svg>
        </div>
      </button>
      {showDropzone && <DropZone onDrop={handleFilesSelected} />}
    </div>
  );
};

export default UploadImage;
