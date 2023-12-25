"use client";
import React, { useRef, useState } from "react";
import UploadImage from "@/components/ui/UploadImage";

interface Props {
  title: number;
  onRemove: (title : number) => void;
}

const ClassDivider = ({ title = 1, onRemove }: Props) => {
  const [hasUploadedFile, setHasUploadedFile] = useState(false);

  const handleFileUpload = () => {
    // Xử lý khi có file được tải lên
    setHasUploadedFile(true);
  };
  return (
    <div className="flex w-1/4 ${hasUploadedFile ? 'h-60' : 'h-60'} card bg-base-300 rounded-box ml-40 mb-5">
      <div className=" flex flex-col p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title">Class {title}</h2>
          <button className="btn btn-ghost items-center" onClick={()=>onRemove(title)}>
            <svg
              fill="#000000"
              viewBox="-1.7 0 20.4 20.4"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <path d="M16.417 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.917 7.917zm-6.804.01 3.032-3.033a.792.792 0 0 0-1.12-1.12L8.494 9.173 5.46 6.14a.792.792 0 0 0-1.12 1.12l3.034 3.033-3.033 3.033a.792.792 0 0 0 1.12 1.119l3.032-3.033 3.033 3.033a.792.792 0 0 0 1.12-1.12z"></path>
            </svg>
          </button>
        </div>
        <p>Add Image Samples:</p>
        <div className="flex space-x-4">
          <button className="btn btn-primary">
            <div className="flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path
                  d="M21.5 6.1c-.3-.2-.7-.2-1 0l-4.4 3V7c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2.1l4.4 3c.2.1.4.2.6.2.2 0 .3 0 .5-.1.3-.2.5-.5.5-.9V7c0-.4-.2-.7-.5-.9zM14 17H4V7h10v10zm6-1.9l-4-2.7v-.9l4-2.7v6.3z"
                  fill="#0D0D0D"
                ></path>
              </svg>
            </div>
          </button>
         <UploadImage onUpload={handleFileUpload}/>
        </div>
      </div>
    </div>
  );
};
export default ClassDivider;
