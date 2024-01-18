"use client";
import React, { ChangeEvent, useEffect, useRef } from 'react';
import ModalUploadFile from './ModalUploadFile';
import Axios from "axios";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
    const form = new FormData();
    const router = useRouter();

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

    const submitModal = async () => {
        const user_name = localStorage.getItem("user_name") as string;
        const project_name = localStorage.getItem("project_name") as string;
        const training_time = localStorage.getItem("training_time") as string;
        const task = localStorage.getItem("task") as string;

        form.append('user_name', user_name);
        form.append('project_name', project_name);

        const labels = new Set<string>();
        formDataInfo.forEach((formData) => {
            form.append(formData.label, formData.file);
            labels.add(formData.label);
        });
        labels.forEach((label) => {
            form.append('labels', label);
        });
        // const res = await Axios.post('/api/upload/uploadBucket', form, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // });
        // if (res.status === 200) {
        //     toast.success('Upload thành công');
        // }
        // else {
        //     toast.error('Upload thất bại');
        // }

        const resSendData = await Axios.post('/api/upload/infoProject', {
            user_name: user_name,
            project_name: project_name,
            training_time: training_time,
            task: task,
        });
        if (resSendData.status === 200) {
            toast.success('Send data thành công');
        }
        else {
            toast.error('Send data thất bại');
        }

        // if (res.status == 200) {
        //     router.push('/training');
        // }
    }
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
