import React from "react";

const handleFile = () => {};
const handleCamera = () => {};
export const Feature = () => {
  return (
    <div>
      <div className="max-w-xl mb-50 md:mx-auto sm:text-center lg:max-w-2xl md:mb-20"></div>
      <div className="grid max-w-screen-lg gap-8 row-gap-10 mx-auto lg:grid-cols-3">
        <div className="flex flex-col max-w-md sm:mx-auto sm:flex-row">
          <div className="mr-4">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
              <svg
                className="w-10 h-10 text-deep-purple-accent-400"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-xl font-bold leading-5">Class 1</h3>
            <p>
              Add Image Sample:
            </p>
            <div style={{ position: "relative" }}>
              <button
                role="button"
                className="sample-source-btn"
                title="Add sample: Webcam"
                // onClick={handleWebcamButtonClick}
                style={{ position: "absolute", top: "10px", left: "10px" , display: "block"}}
              >
                <svg
                  className="sample-source-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#1967D2"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11 7.83L8.41 10.41L7 9L12 4L17 9L15.59 10.42L13 7.83V16H11V7.83ZM6 15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18V18H6V15Z"
                  ></path>
                </svg>
                <span className="sample-source-label">Webcam</span>
              </button>

              <input type="file" id="fileInput" style={{ display: "none" }} />
              <button
                role="button"
                className="sample-source-btn"
                title="Add sample: Upload"
                // onClick={() => document.getElementById('fileInput').click()}
                style={{ position: "absolute", top: "10px", left: "100px" }}
              >
                <svg
                  className="sample-source-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#1967D2"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11 7.83L8.41 10.41L7 9L12 4L17 9L15.59 10.42L13 7.83V16H11V7.83ZM6 15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18V18H6V15Z"
                  ></path>
                </svg>
                <span className="sample-source-label">Upload</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-md sm:mx-auto sm:flex-row">
          <div className="mr-4">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
              <svg
                className="w-10 h-10 text-deep-purple-accent-400"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-xl font-bold leading-5">Training</h3>
            <button 
            >
                Train Model
            </button>
          </div>
        </div>
        <div className="flex flex-col max-w-md sm:mx-auto sm:flex-row">
          <div className="mr-4">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
              <svg
                className="w-10 h-10 text-deep-purple-accent-400"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-xl font-bold leading-5">
                Preview 
            </h3>
            <p className="mb-3 text-sm text-gray-900">
              You must train your model before you can preview it here.
            </p>
            <button>
                Export Model
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Feature;
