"use client";
import React, {ChangeEvent, useRef} from 'react';

export default function App() {
    const [progress, setProgress] = React.useState<number>(0);
    const done = useRef<number>(0);
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        
        event.preventDefault();
        const files = Array.from(event.target.files);
        if (files && files.length > 0) {
            // Array.fromAsync thi ok hon :v
            for (const file of files) {
                const reader = new FileReader();

                reader.onprogress = (event) => {
                    if (event.lengthComputable) {
                        // log the progress of 1 file upload
                        // React ngu vl, dung me no Web API di
                        // https://developer.mozilla.org/pt-BR/docs/Web/API/FileReader/
                        // console.log(`File load ${file.name} progress: ${(event.loaded / event.total * 100).toFixed(2)}%`);
                    }
                };

                reader.onloadend = () => {
                    done.current += 1;
                    const val = done.current / files.length * 100;
                    setProgress(Math.round(val));
                };

                reader.readAsDataURL(file);
            }
            console.log("Completed meowww");
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange}
                   multiple webkitdirectory="" mozdirectory=""
                   accept="image/*"/>
            <h1>{progress}</h1>
        </div>
    );
}
