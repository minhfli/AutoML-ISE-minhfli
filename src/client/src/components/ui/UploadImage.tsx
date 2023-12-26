import React, { useState } from "react";
import DropZone from "@/src/components/ui/DropZone";

type UploadImageProps = {
  onUpload: () => Promise<void> | void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onUpload }) => {
  const [showDropzone, setShowDropzone] = useState(false);

  const handleButtonClick = async () => {
    setShowDropzone(true);
    if (onUpload) { // Check if onUpload is provided
      try {
        await onUpload(); // Await the onUpload call if it's async
      } catch (error) {
        console.error("Error in onUpload:", error);
      }
    }
  };

  const handleFilesSelected = async (files: File[]) => {
    files.forEach((file, index) => {
      console.log(`File ${index + 1}: ${file.name}`);
    });
  };

  return (
      <div>
        <button className="btn btn-primary" onClick={handleButtonClick}>
          <div className="flex items-center justify-center">
            {/* SVG icon for upload */}
            <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor" // Changed to currentColor for dynamic coloring
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
        </button>
        {showDropzone && <DropZone onDrop={handleFilesSelected} />}
      </div>
  );
};

export default UploadImage;
