"use client";
import React, {useRef, useState} from "react";

interface Props {
    title: number;
}

const ClassDivider = ({title = 1}: Props) => {
    return (

        <div className="flex w-1/4 h-40 card bg-base-300 rounded-box ml-40 mb-5">
            <div className=" flex flex-col p-4">
                <h2 className="card-title mb-4">Class {title}</h2>
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
                    <button className="btn btn-primary">
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
                </div>
            </div>

        </div>);
};
export default ClassDivider;

