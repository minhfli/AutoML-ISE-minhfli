// "use client";
// import React from "react";
// import { useState, useRef, useEffect } from "react";
// console.log("hello");
// const Feature = () => {
//   //get a request to the server to get the model
// //   useEffect(() => {
// //     const data = fetch("http://localhost:3456/")
// //         .then((data) => console.log("data", data))
// //         .catch((error) => console.error("Error:", error));
// // }, []);

//   const [fileInputKey, setFileInputKey] = useState(0);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFile = () => {
//     if (fileInputRef.current !== null) {
//       fileInputRef.current.click();
//     }
//   };
//   const handleCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });

//       console.log("Webcam stream:", stream);
//     } catch (error) {
//       console.error("Error accessing webcam:", error);
//     }
//   };

//   interface SampleSourceButtonProps {
//     title: string;
//     onClick?: () => void;
//     position: string;
//   }

//   const SampleSourceButton: React.FC<SampleSourceButtonProps> = ({
//     title,
//     onClick,
//     position,
//   }) => (
//     <button
//       role="button"
//       className="sample-source-btn"
//       title={`Add sample: ${title}`}
//       onClick={onClick}
//       style={
//         {
//           // position: "absolute",
//           // top: "10px",
//           // left: position,
//           // display: "block"
//         }
//       }
//     >
//       <svg
//         className="sample-source-icon"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           fill="#1967D2"
//           fillRule="evenodd"
//           clipRule="evenodd"
//           d="M11 7.83L8.41 10.41L7 9L12 4L17 9L15.59 10.42L13 7.83V16H11V7.83ZM6 15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18V18H6V15Z"
//         ></path>
//       </svg>
//       <span className="sample-source-label">{title}</span>
//     </button>
//   );

//   return (
//     <div>
//       <div className="max-w-xl mb-50 md:mx-auto sm:text-center lg:max-w-2xl md:mb-20"></div>
//       <div className="grid max-w-screen-lg gap-8 row-gap-10 mx-auto lg:grid-cols-3">
//         {[
//           {
//             title: "Class 1",
//             content: "Add Image Sample:",
//             buttons: ["Webcam", "Upload"],
//             position: ["10px", "150px"],
//           },
//           { title: "Training", content: "", buttons: ["Train Model"] },
//           {
//             title: "Preview",
//             content:
//               "You must train your model before you can preview it here.",
//             buttons: ["Export Model"],
//           },
//         ].map((item, index) => (
//           <div
//             key={index}
//             className="flex flex-col max-w-md sm:mx-auto sm:flex-row"
//           >
//             <div className="mr-4">
//               <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
//                 <svg
//                   className="w-10 h-10 text-deep-purple-accent-400"
//                   stroke="currentColor"
//                   viewBox="0 0 52 52"
//                 >
//                   <polygon
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     fill="none"
//                     points="29 13 14 29 25 29 23 39 38 23 27 23"
//                   />
//                 </svg>
//               </div>
//             </div>
//             <div>
//               <h3 className="mb-3 text-xl font-bold leading-5">{item.title}</h3>
//               <p>{item.content}</p>
//               {item.buttons.map((button, buttonIndex) => (
//                 <SampleSourceButton
//                   key={buttonIndex}
//                   title={button}
//                   onClick={
//                     button === "Webcam"
//                       ? handleCamera
//                       : button === "Upload"
//                       ? handleFile
//                       : undefined
//                   }
//                   position={buttonIndex === 0 ? "10px" : "100px"}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//         <input
//           ref={fileInputRef}
//           key={fileInputKey}
//           type="file"
//           style={{ display: "none" }}
//           onChange={(e) => {
//             console.log(e.target.files);
//             setFileInputKey((prevKey) => prevKey + 1);
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Feature;
"use client";
import React, { useState } from "react";

const FileUploadComponent = () => {
  return (
    <form
      action="http://localhost:3456/upload"
      method="post"
      encType="multipart/form-data"
    >
      <input type="file" name="sampleFile" />
      <input type="submit" value="Upload!" />
    </form>
  );
};

export default FileUploadComponent;
