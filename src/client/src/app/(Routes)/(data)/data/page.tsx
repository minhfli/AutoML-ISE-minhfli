"use client";
import React, { ChangeEvent, useEffect, useRef } from "react";
import ModalUploadFile from "./ModalUploadFile";
import Axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/src/components/ui/progress";
import { set } from "react-hook-form";

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
  const [fileName, setFileName] = React.useState<any>("");
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [modalInfo, setModalInfo] = React.useState<Folder>({
    name: "",
    subfolders: [],
    images: [],
  });
  const form = new FormData();

  const [formDataInfo, setFormDataInfo] = React.useState<FormDataInfo[]>([]);

  const done = useRef<number>(0);
  const mapFolder = useRef(new Map<string, { size: number; count: number }>()); // map folder voi size va so luong anh
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setProgress(0);
    event.preventDefault();
    const files = Array.from(event.target.files);
    let totalSize = 0;

    if (files && files.length > 0) {
      setModalInfo((prevModalInfo) => {
        const newModalInfo: Folder = { ...prevModalInfo, subfolders: [] };
        for (const file of files) {
          totalSize += file.size;
          const pathParts = file.webkitRelativePath.split("/");
          const folderParts = pathParts[1]; // "flowers"/"tulip"/"tulip_0001.jpg" -> "tulip"
          if (mapFolder.current.has(folderParts)) {
            const value = mapFolder.current.get(folderParts);
            if (value) {
              value.size += file.size;
              value.count += 1;
            }
          } else {
            mapFolder.current.set(folderParts, { size: file.size, count: 1 });
          }
          if (!newModalInfo.subfolders) {
            newModalInfo.subfolders = [];
          }
          let subfolder = newModalInfo.subfolders.find(
            (sub) => sub.name === pathParts[1],
          );
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
        console.log(totalSize);
        console.log(files.length);
        newModalInfo.name = files[0].webkitRelativePath.split("/")[0];
        return newModalInfo;
      });

      const newFormDataInfo: FormDataInfo[] = files.map((file) => {
        const pathParts = file.webkitRelativePath.split("/");
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
            setFileName(file.name);
            // log the progress of 1 file upload
            // React ngu vl, dung me no Web API di
            // https://developer.mozilla.org/pt-BR/docs/Web/API/FileReader/
            // console.log(`File load ${file.name} progress: ${(event.loaded / event.total * 100).toFixed(2)}%`);
          }
        };

        reader.onloadend = () => {
          done.current += 1;
          const val = (done.current / files.length) * 100;
          setProgress(Math.round(val));
        };

        reader.readAsDataURL(file);
      }
      setIsUploading(true);
    }
    
    
  };
  const closeModal = () => {
    setProgress(0);
    setModalVisible(false);
  };

  const submitModal = async () => {
    const user_name = localStorage.getItem("user_name") as string;
    const project_name = localStorage.getItem("project_name") as string;
    form.append("user_name", user_name);
    form.append("project_name", project_name);

    const labels = new Set<string>();
    formDataInfo.forEach((formData) => {
      form.append(formData.label, formData.file);
      labels.add(formData.label);
    });
    labels.forEach((label) => {
      form.append("labels", label);
    });
    const res = await Axios.post("/api/upload", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.status === 200) {
      toast.success("Upload thành công");
    } else {
      toast.error("Upload thất bại");
    }
  };
  useEffect(() => {
    console.log(`Progress changed: ${progress}%`);

    if (progress == 100) {
      console.log("Progress is 100%, opening modal");
      setIsUploading(false);
      setModalVisible(true);
      for (const [key, value] of Array.from(mapFolder.current.entries())) {
        console.log(key, value);
      }
    }
  }, [progress, mapFolder]);

  return (
    <div>
      <div className="container mx-auto p-4">
        <h2 className="mb-3 text-xl font-bold">
          Prepare your data for Image Classification
        </h2>
        <div className="flex flex-col gap-4 md:flex-row">
          {/* <!-- Method 1 --> */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">
              Method 1: Pre-arranged folders
            </h3>
            <p>
              Organize your images in folders named according to their
              corresponding classes (for instance "dog" or "cat"). Then, upload
              the parent folder using the input below.
            </p>
            {/* <!-- Your form/input elements here --> */}
          </div>

          {/* <!-- Method 2 --> */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">
              Method 2: CSV/JSONL with associated images
            </h3>
            <p>
              Upload a .csv or .jsonl file, then the associated images. Each
              data file should have at least 2 columns: one for{" "}
              <code>image_relpath</code>, and one for <code>target</code>.
            </p>
            {/* <!-- Your form/input elements here --> */}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <input
          className="hover:gray-200 file-input w-full max-w-xs cursor-pointer rounded-md p-2 transition duration-300 "
          type="file"
          onChange={handleFileChange}
          multiple
          webkitdirectory=""
          mozdirectory=""
          accept="image/*"
        />
      </div>
      {isUploading && (
        <div className="flex flex-col items-center justify-center  ">
          <p className="mb-2 text-sm text-gray-700">{fileName}</p>
          <Progress value={progress} className="w-[50%]" />
        </div>
      )}

      {modalVisible && (
        <ModalUploadFile
          folder={modalInfo}
          onClose={closeModal}
          onSubmit={submitModal}
          progress={progress}
          mapFolder={mapFolder.current}
        />
      )}
    </div>
  );
}
