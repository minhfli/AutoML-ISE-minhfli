"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Axios from "axios";
import React, { HtmlHTMLAttributes, useEffect, useState } from "react";
import { toast } from "sonner";

declare module "react" {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        webkitdirectory?: string;
        mozdirectory?: string;
    }
}

export default function Page() {
    const [file, setFile] = React.useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleTrain = async () => {
        const user_name = localStorage.getItem("user_name") as string;
        const project_name = localStorage.getItem("project_name") as string;
        const training_time = localStorage.getItem("training_time") as string;
        const task = localStorage.getItem("task") as string;
        const res = await Axios.post('api/train/trainProject', {
            user_name: user_name,
            project_name: project_name,
        })
        console.log(res.data.accuracy);
        console.log(res.data.time);
        console.log(res.data.download_time);
        if (res.status === 200) {
            toast.success("Train thành công!");
        } else {
            toast.error("Train thất bại :(");
        }
    }

    const handlePredict = async () => {
        if (!file) {
            toast.error("Please select an image before predicting.");
            return;
        }

        const user_name = localStorage.getItem("user_name") as string;
        const project_name = localStorage.getItem("project_name") as string;

        const formData = new FormData();
        formData.append("user_name", user_name);
        formData.append("project_name", project_name);
        formData.append("image", file);

        try {
            const res = await Axios.post('api/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const { status, message, load_time, inference_time, predictions } = res.data;

            if (status === "success") {
                toast.success(message);
                toast.success(`Load Time: ${load_time}`);
                toast.success(`Inference Time: ${inference_time}`);
                toast.success(`Predictions: ${predictions}`);
            } else {
                toast.error(`Prediction failed: ${message}`);
            }
        } catch (error) {
            console.error("Error during prediction:", error);
            toast.error("Prediction thất bại :(");
        }
    }
    return (
        <div>
            <Button id="train" onClick={handleTrain}> Train </Button>
            <form onSubmit={handlePredict}>
                <Input type="file" onChange={handleImageChange}
                    accept={"image/*"} />
                <Input type="submit" value="Submit" />
            </form>
        </div>
    );
}