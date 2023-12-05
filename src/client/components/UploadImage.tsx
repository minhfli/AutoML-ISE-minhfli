"use client"

import React, { useRef} from "react";
import Image from "next/image";

interface ImageComponentProps {
    imageDataUrl: string;
    index: number;
}

const UploadImage = () => {

    const inputFolder = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (inputFolder.current) {
            inputFolder.current.click();
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {

        }

    }


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
            <input
                type="file"
                className="file-input"
                onChange={handleFileChange}
                ref={(node) => {
                    if (node && node !== inputFolder.current) {
                        // @ts-ignore
                        inputFolder.current = node;
                        ['webkitdirectory', 'directory', 'mozdirectory'].forEach((attr) => {
                            node.setAttribute(attr, '');
                        });
                    }
                }}
                style={{display: 'none'}}
            />
        </>
    )
};

export default UploadImage;





