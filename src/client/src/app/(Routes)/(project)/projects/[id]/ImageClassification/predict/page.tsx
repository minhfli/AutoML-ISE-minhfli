"use client";
import Axios from "axios";
import {Loader} from "lucide-react";
import {usePathname} from "next/navigation";
import React, {ChangeEvent, useEffect, useState} from "react";
import {toast} from "sonner";
import httpStatusCode from "@/src/app/errors/httpStatusCode";
import axios from "axios";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";


export default function Predict() {
    const pathName = usePathname();
    const [validationAccuracy, setValidationAccuracy] = useState(0);
    const projectId = pathName.split("/")[2];
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [predictions, setPredictions] = useState<string>("");
    const [InferenceTime, setInferenceTime] = useState<number>(0);
    const runName = localStorage.getItem("runName") as string;

    useEffect(() => {
        let fetchData = async () => {
            const response = await axios.post('/api/projects/info', {
                projectId: pathName.split("/")[2],
            })
            if (response.status === httpStatusCode.OK) {
                const {validation_accuracy} = response.data.project;
                setValidationAccuracy(Math.round(validation_accuracy * 100));
            }
        };

        fetchData().catch(console.error);
    }, []);
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log("File selected");
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setUploadedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result as string);
            }
            reader.readAsDataURL(file);


            const userEmail = localStorage.getItem("userEmail") as string;
            const projectId = pathName.split("/")[2];

            const formData = new FormData();
            formData.append("userEmail", userEmail);
            formData.append("projectId", projectId);
            formData.append("image", file);
            formData.append("runName", runName);
            try {
                setLoading(true);
                setPredictions("");
                const res = await Axios.post('/api/projects/ImageClassification/predict', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const {status, message, load_time, proba, inference_time, predictions} = res.data;
                if (res.status === httpStatusCode.OK) {
                    setPredictions(predictions);
                    setInferenceTime(Math.round(inference_time * 1000))
                } else {
                    toast.error("Please try again!");
                }
            } catch (error) {
                console.error("Error during prediction:", error);
            } finally {
                setLoading(false);
            }
        }

    };
    return (
        <div className="flex flex-col  items-center justify-center rounded-lg bg-white p-4 shadow">
            {/* Model Switcher and Info Section */}
            <div className="flex w-full flex-col justify-between py-2">
                {/* Switch Model */}
                <div className="flex flex-col space-x-2">
          <span className="ml-2 text-sm font-medium text-gray-700">
            Switch Model:
          </span>
                    <button className="rounded border  border-gray-300 bg-white px-4 py-2 shadow-sm">
                        {runName} flower-classifier-biol0/1
                    </button>
                </div>

                {/* Trained On Section */}

                <div className="ml-2 flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-800">Trained On:</p>
                    <p className="text-xs text-gray-500">
                        flower-classifier-biol0 4311 Images
                    </p>
                    {/* View Version Link */}
                    <a href="#" className="text-xs text-blue-500">
                        View Version →
                    </a>
                </div>

                {/* Model Type Section */}
                <div className="ml-2 flex justify-between bg-white">
                    {/* <!-- Left Section - Model Type --> */}
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-800">Model Type:</p>
                        <p className="text-sm text-gray-500">Roboflow 2.0 Classification</p>
                    </div>

                    {/* <!-- Center Section - Validation Accuracy --> */}
                    <div className="flex justify-end items-center space-x-2">
                        <div className="flex items-center space-x-1">
                            <div className="bg-purple-600 w-1 h-6 rounded-sm"></div>
                            <div className="flex flex-col">
                                <div className="flex items-center text-sm font-semibold text-purple-600">
                                    <span>Validation Accuracy</span>

                                </div>
                                <span className="text-sm font-semibold text-purple-600">{validationAccuracy} %</span>
                            </div>
                        </div>
                        <a href="#" className="text-xs text-purple-600 hover:text-purple-800">View Model Graphs →</a>
                    </div>
                </div>
            </div>

            <div className="ml-2 flex w-full flex-wrap justify-center">
                {/* <!-- First Column --> */}
                <div className="w-1/4 ">
                    {/* <!-- Samples from Test Set --> */}
                    <div className="mb-4 rounded-lg border-2 border-gray-300">
                        {/* <!-- Replace with actual images --> */}
                        <div className="mb-2 ml-2 mr-2 mt-2  flex space-x-2">
                            <img
                                src="sample1.jpg"
                                alt="Sample"
                                className="w-1/3 rounded shadow"
                            ></img>
                            <img
                                src="sample2.jpg"
                                alt="Sample"
                                className="w-1/3 rounded shadow"
                            ></img>
                            <img
                                src="sample3.jpg"
                                alt="Sample"
                                className="w-1/3 rounded shadow"
                            ></img>
                        </div>
                    </div>

                    {/* <!-- Upload Image --> */}
                    <div className="mb-4 rounded-lg border-2 border-gray-300">
                        <label className="mb-2 ml-2 block text-sm font-medium text-gray-700">
                            Upload Image
                        </label>
                        <div
                            className="mb-2 ml-2 mr-2 mt-2 rounded-lg border-2 border-dashed border-gray-300 p-4 text-center">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                                id="upload"
                            />

                            <label htmlFor="upload" className="cursor-pointer">
                                <div className="rounded bg-gray-100 p-2 text-sm">
                                    Select File
                                </div>
                            </label>
                            <p className="mt-2 text-xs text-gray-500">Drop files here or</p>
                        </div>
                    </div>

                    {/* <!-- Paste YouTube or Image URL --> */}
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Paste YouTube or Image URL
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-lg border-2 border-gray-300 p-2"
                            readOnly={true}
                        ></input>
                    </div>
                </div>

                {/* <!-- Second Column --> */}
                <div className="flex w-1/2 justify-center ">
                    {loading ? (
                        <div className="flex items-center justify-center w-full h-full">
                            <Loader className="w-10 h-10 animate-spin"/>
                        </div>
                    ) : (
                        previewImage && (
                            <img
                                src={previewImage}
                                alt="Selected"
                                className="rounded-lg border-2 border-gray-300"
                                style={{width: "auto", height: "auto"}}
                            />
                        )
                    )}
                </div>

                {/* <!-- Third Column --> */}
                <div className="w-1/4 rounded-lg border-2 border-gray-300 p-4">
                    {/* <!-- Confidence Threshold --> */}
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Confidence Threshold
                        </label>
                        {/* <!-- Confidence Threshold Slider --> */}
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value="50"
                            className="slider w-full"
                            readOnly={true}
                        ></input>
                    </div>

                    {/* <!-- Predictions --> */}
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Predictions
                        </label>
                        <div className="rounded-lg border-2 border-gray-300 p-4">
                            {predictions && (
                                <span className="text-sm font-semibold text-gray-500">
                                    {predictions}
                                 </span>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <Button className= "">
                        <Link href={"/projects/" + projectId + "/ImageClassification/deploy"}>Ready to deploy?</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
