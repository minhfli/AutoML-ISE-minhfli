import React, { useRef, useState } from "react";
import DropZone from "@/components/DropZone";

const UploadImage: React.FC = () => {
  const [showDropzone, setShowDropzone] = useState(false);

  const sleep = (milliseconds: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  // Sử dụng hàm sleep trong hàm handleButtonClick
  const handleButtonClick = async () => {
    try {
      // Gọi các hàm bất đồng bộ ở đây
      console.log("Start sleeping...");
      await sleep(1000); // Sleep 1s (1000 milliseconds)
      console.log("End sleeping. Continue with other async tasks...");
      setShowDropzone(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFilesSelected = async (files: File[]) => {
    try {
      // Thực hiện các công việc bất đồng bộ ở đây
      await someAsyncProcessing(files);
      await sleep(1000); // Sleep 1s (1000 milliseconds)
      console.log("hello")
      // Hiển thị thông tin về mỗi file trong console
      files.forEach((file, index) => {
        console.log(`File ${index + 1}: ${file.name}`);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Hàm mẫu bất đồng bộ
  const someAsyncFunction = async () => {
    // Đoạn code bất đồng bộ ở đây
    // Ví dụ: fetch, call API, etc.
  };

  // Hàm mẫu xử lý bất đồng bộ files
  const someAsyncProcessing = async (files: File[]) => {
    // Đoạn code xử lý bất đồng bộ files ở đây
    // Ví dụ: upload files, process images, etc.
  };

  return (
    <>
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
    </>
  );
};

export default UploadImage;
