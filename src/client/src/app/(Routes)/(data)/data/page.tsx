"use client";
import React, { ChangeEvent, useEffect, useRef } from 'react';
import ModalUploadFile from './ModalUploadFile';

interface ImageObject {
    name: string;
    url: string;
}

interface Folder {
    name: string;
    subfolders?: Folder[];
    images?: ImageObject[];
}

interface FormDataInfo {
    label: string;
    file: File;
}

export default function App() {
    const [progress, setProgress] = React.useState<number>(0);
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [modalInfo, setModalInfo] = React.useState<Folder>({
        name: '',
        subfolders: [],
        images: [],
    });

    const [formDataInfo, setFormDataInfo] = React.useState<FormDataInfo[]>([]);

    const done = useRef<number>(0);
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        event.preventDefault();
        const files = Array.from(event.target.files);
        if (files && files.length > 0) {
            setModalInfo((prevModalInfo) => {
                const newModalInfo: Folder = { ...prevModalInfo, subfolders: [] };
                for (const file of files) {
                    const pathParts = file.webkitRelativePath.split('/');
                    if (!newModalInfo.subfolders) {
                        newModalInfo.subfolders = [];
                    }
                    let subfolder = newModalInfo.subfolders.find(sub => sub.name === pathParts[1]);
                    if (!subfolder) {
                        subfolder = {
                            name: pathParts[1],
                            subfolders: [],
                            images: [],
                        };
                        newModalInfo.subfolders.push(subfolder);
                    }
                    subfolder.images = subfolder.images || [];
                    subfolder.images.push({
                        name: file.name,
                        url: URL.createObjectURL(file),
                    });
                }
                newModalInfo.name = files[0].webkitRelativePath.split('/')[0];
                console.log(newModalInfo);
                return newModalInfo;
            });

            const newFormDataInfo: FormDataInfo[] = files.map((file) => {
                const pathParts = file.webkitRelativePath.split('/');
                return {
                    label: pathParts[1],
                    file: file,
                };
            });

            setFormDataInfo(newFormDataInfo);

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

    const closeModal = () => {
        setModalVisible(false);
    };

    const submitModal = () => {
        const form = new FormData();

        formDataInfo.forEach((formData) => {
            form.append(formData.label, formData.file);
            console.log(formData);
        });

        fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            body: form,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        console.log(`Progress changed: ${progress}%`);

        if (progress === 100) {
            console.log('Progress is 100%, opening modal');
            setModalVisible(true);
        }
    }, [progress]);

    return (
        <div>
            <input type="file" onChange={handleFileChange}
                multiple webkitdirectory="" mozdirectory=""
                accept="image/*" />
            <h1>{progress}</h1>

            {modalVisible && (
                <ModalUploadFile
                    folder={modalInfo}
                    onClose={closeModal}
                    onSubmit={submitModal}
                />
            )}
        </div>
    );
}
