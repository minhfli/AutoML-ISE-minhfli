"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
export default function Deploy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="p-4">
        <h1 className="mb-2 text-xl font-semibold">🔧 Deploy</h1>
        <p className="mb-2">
          Easily deploy your model on the cloud, locally, or on an edge device.
        </p>
        <h2 className="mb-2 text-xl font-semibold">
          Successful Users Start with These Deployments
        </h2>
        {/* <!-- Add more content here for deployment options --> */}
      </div>
      <div>
      <div className=" ml-2 grid gap-4 md:grid-cols-2">
        {/* Card 1: Hosted Image Inference */}
        <div
          className="cursor-pointer rounded-lg bg-gray-100 p-4 shadow-md hover:bg-gray-300"
          onClick={() => setIsModalOpen(true)}
        >
          <h3 className="mb-2 text-lg font-semibold">Hosted Image Inference</h3>
          <p className="mb-4 text-gray-600">
            Run your model on an endpoint we've already built for you.
          </p>
          <div className="mb-4 flex items-center">
            <span className="mr-2 rounded bg-gray-200 px-2.5 py-0.5 text-sm ">
              Set up in seconds
            </span>
            <span className="mr-2 rounded bg-gray-200 px-2.5 py-0.5 text-sm">
              Requires Internet
            </span>
          </div>
          <button
            className="text-purple-600 hover:bg-purple-200 "
            onClick={() => setIsModalOpen(true)}
          >
            Select Endpoint
          </button>
        </div>

        {/* Card 2: Hosted Video Inference */}
        <div
          className="cursor-pointer rounded-lg bg-gray-100 p-4 shadow-md hover:bg-gray-300"
          onClick={() => setIsModalOpen(true)}
        >
          <h3 className="mb-2 text-lg font-semibold">Hosted Video Inference</h3>
          <p className="mb-4 text-gray-600">
            Receive predictions from an entire video. Best for use cases where
            you don't need results in real-time.
          </p>
          <div className="mb-4 flex items-center">
            <span className="mr-2 rounded bg-gray-200 px-2.5 py-0.5 text-sm ">
              Set up in seconds
            </span>
            <span className="mr-2 rounded bg-gray-200 px-2.5 py-0.5 text-sm">
              Requires Internet
            </span>
          </div>
          <button
            className="text-purple-600 hover:bg-purple-200"
            onClick={() => setIsModalOpen(true)}
          >
            Select Modal Type
          </button>
        </div>

        {/* Card 3: Self-Hosted Inference */}
        <div
          className="cursor-pointer rounded-lg bg-gray-100 p-4 shadow-md hover:bg-gray-300 "
          onClick={() => setIsModalOpen(true)}
        >
          <h3 className="mb-2 text-lg font-semibold">Self-Hosted Inference</h3>
          <p className="mb-4 text-gray-600">
            Run your model on your own computer or on a cloud computing platform
            like AWS, GCP, and Azure.
          </p>
          <div className="mb-4 flex items-center">
            <span className="mr-2 rounded bg-gray-200 px-2.5 py-0.5 text-sm ">
              Self-Hosted
            </span>
            <span className="mr-2 rounded bg-gray-200 px-2.5 py-0.5 text-sm">
              Cloud
            </span>
            <span className="mr-2 rounded bg-gray-200 px-2.5 py-0.5 text-sm">
              Real-Time
            </span>
          </div>
          <button
            className="text-purple-600 hover:bg-purple-200"
            onClick={() => setIsModalOpen(true)}
          >
            Select Setup
          </button>
        </div>

        {/* Card 4: Edge Device */}
        <div
          className="cursor-pointer rounded-lg bg-gray-100 p-4 shadow-md hover:bg-gray-300"
          onClick={() => setIsModalOpen(true)}
        >
          <h3 className="mb-2 text-lg font-semibold">Edge Device</h3>
          <p className="mb-4 text-gray-600">
            Run your model on an NVIDIA Jetson or other edge devices. Scale
            easily with our Docker container.
          </p>
          <div className="mb-4 flex items-center">
            <span className="mr-2 rounded bg-gray-200 px-2.5 py-0.5 text-sm ">
              Edge Device
            </span>
            <span className="mr-2 rounded bg-gray-200 px-2.5 py-0.5 text-sm">
              Multi-Device
            </span>
            <span className="mr-2 rounded bg-gray-200 px-2.5 py-0.5 text-sm">
              Real-Time
            </span>
          </div>
          <button
            className="text-purple-600 hover:bg-purple-200"
            onClick={() => setIsModalOpen(true)}
          >
            Select Device
          </button>
        </div>
        </div>
        <div className="bg-white p-2 gap-4 flex justify-center items-center mt-4">
        <div className="flex justify-center items-stretch gap-4"> {/* Use items-stretch for equal height */}

          {/* <!-- Card 1 --> */}
          <Link
            href={"/"}
            className="flex cursor-pointer flex-col rounded-lg bg-gray-100 p-4 shadow-md hover:bg-gray-300 w-1/4"
            >
            <div className="rounded p-1">
              {/* <!-- Placeholder for the icon --> */}
              <div className="h-8 w-8 rounded bg-gray-400"></div>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              Deploy Mobile iOS
            </h2>
            <p className=" text-sm text-gray-600">
              Utilize your model on your mobile device.
            </p>
          </Link>
              
             {/* <!-- Card 2 --> */}
             <Link
            href={"/"}
            className="flex cursor-pointer flex-col rounded-lg bg-gray-100 p-4 shadow-md hover:bg-gray-300 w-1/4"
          >
            <div className="rounded p-1">
              {/* <!-- Placeholder for the icon --> */}
              <div className="h-8 w-8 rounded bg-gray-400"></div>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              Deploy to NVIDIA Jetson
            </h2>
            <p className=" text-sm text-gray-600">
            Use our SDKs to deploy your model across a range of devices.
            </p>
          </Link>
          {/* <!-- Card 3 --> */}
          <Link
            href={"/"}
            className="flex cursor-pointer flex-col rounded-lg bg-gray-100 p-4 shadow-md hover:bg-gray-300 w-1/4"
          >
            <div className="rounded p-1">
              {/* <!-- Placeholder for the icon --> */}
              <div className="h-8 w-8 rounded bg-gray-400"></div>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              Deploy to Luxonis OAK
            </h2>
            <p className="text-sm text-gray-600">
              Use our SDKs to deploy your model across a range of devices.
            </p>
          </Link>
          {/* <!-- Card 4 --> */}
          <Link
            href={"/"}
            className="flex cursor-pointer flex-col rounded-lg bg-gray-100 p-4 shadow-md hover:bg-gray-300 w-1/4"
          >
            <div className="rounded p-1">
              {/* <!-- Placeholder for the icon --> */}
              <div className="h-8 w-8 rounded bg-gray-400"></div>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              Use with Snap AR's Lens Studio
            </h2>
            <p className=" text-sm text-gray-600">
              Export and use this model to create custom lenses within Snap AR's Lens Studio.
            </p>
          </Link>
          </div>
        </div>
        
      </div>

      {/* Modal */}
      <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div
          className="modal-box"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
        >
          <h3 className="text-lg font-bold">Deployment Details</h3>
          <p className="py-4">Details about the Hosted Image Inference...</p>
          <div className="modal-action">
            <button className="btn" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
