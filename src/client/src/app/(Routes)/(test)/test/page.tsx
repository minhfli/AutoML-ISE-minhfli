"use client";
import {Input} from "@/src/components/ui/input";
import React, {HtmlHTMLAttributes, useEffect, useState} from "react";

import Image from "next/image";
import {Button} from "@/src/components/ui/button";
// https://stackoverflow.com/questions/71444475/webkitdirectory-in-typescript-and-react
// https://github.com/facebook/react/issues/3468
// dirty hack to make webkitdirectory work with react :v

declare module "react" {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        webkitdirectory?: string;
        mozdirectory?: string;
    }
}

export default function Page() {
    const [files, setFiles] = useState<FileList | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [displayCount, setDisplayCount] = useState(100);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            const urls = Array.from(e.target.files)
                .map(file => URL.createObjectURL(file));
            setImageUrls(urls);
            setFiles(e.target.files);
        }
        const end_time = new Date().getTime();
    };

    useEffect(() => {
        return () => {
            imageUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [imageUrls]);

    const handleLoadMore = () => {
        setDisplayCount(prevCount => prevCount + 100);
    };

    return (
        <>
            <Input type="file" onChange={handleImageChange} multiple webkitdirectory="" mozdirectory=""
                   accept={"image/*"}/>
            {files && files.length > 0 && (
                <div className="grid grid-cols-3 gap">
                    {imageUrls.slice(0, displayCount).map((url, index) => (
                        <div key={index}>
                            <Image src={url} alt={`Preview ${index}`} width={200} height={200} loading={"lazy"}/>
                            <p>{files[index].name} - Size: {files[index].size} bytes -
                                Label: {files[index].webkitRelativePath.split('/')[1]}</p> {/* flowers/roses -> roses */}
                        </div>
                    ))}
                </div>
            )}
            {displayCount < (imageUrls.length) && (
                <Button onClick={handleLoadMore}>Load More</Button>
            )}
        </>
    );
}