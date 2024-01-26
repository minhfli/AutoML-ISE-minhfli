"use client";
import React, { useState, ChangeEvent, useEffect, useRef, use } from "react";
import Papa, { ParseResult } from "papaparse";
import PaginationControls from "./Pagination";
type CsvRow = {
  [key: string]: string;
};

import Axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/src/components/ui/progress";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ModalUploadFile from "@/src/app/(Routes)/(project)/projects/[id]/data/ModalUploadFile";
import httpStatusCode from "@/src/app/errors/httpStatusCode";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { LoaderIcon } from "lucide-react";
import { any } from "zod";

declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    webkitdirectory?: string;
    mozdirectory?: string;
  }
}

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
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [countPage, setCountPage] = useState<number>(0);

  //total pages
  const totalPages = Math.ceil(csvData.length / 10);

  let searchParams = useSearchParams();
  const search = searchParams.get("p");
  console.log(search);
  const startIndex = countPage * 10;
  const endIndex = startIndex + 10;

  useEffect(() => {
    if (search) {
      setCountPage(parseInt(search));
    }
  }, [search]);
  const handlePageChange = (newPage: any) => {
    // Validation to ensure newPage is within the valid range
    const validNewPage = Math.min(Math.max(1, newPage), totalPages);
    setCountPage(validNewPage - 1); // Adjust if you are using zero-based index for countPage
  };
  const handleFileChangeCSV = (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(""); // Reset error message on file change
    const file = event.target.files?.[0];

    if (file) {
      Papa.parse(file, {
        complete: (result: ParseResult<CsvRow>) => {
          if (result.errors.length > 0) {
            setErrorMessage("Error parsing CSV file. Please check the format.");
            console.log(result.errors);
          } else {
            console.log("Parsed CSV result:", result);
            setCsvData(result.data);
          }
        },
        header: true, // Set this to true if your CSV file has a header row
      });
    }
  };

  const pathname = usePathname();
  const [fileName, setFileName] = React.useState<any>("");
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [uploadCloud, setUploadCloud] = React.useState<boolean>(false);
  const [modalInfo, setModalInfo] = React.useState<Folder>({
    name: "",
    subfolders: [],
    images: [],
  });
  const route = useRouter();
  const form = new FormData();
  const [formDataInfo, setFormDataInfo] = React.useState<FormDataInfo[]>([]);

  const done = useRef<number>(0);
  const mapFolder = useRef(new Map<string, { size: number; count: number }>()); // map folder voi size va so luong anh

  const [uploadMethod, setUploadMethod] = React.useState("");

  const handleRadioChange = (event: any) => {
    setUploadMethod(event.target.value);
  };
  const isBlurred = (method :any) => !uploadMethod || uploadMethod !== method;


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setProgress(0);
    event.preventDefault();
    const files = Array.from(event.target.files);
    let totalSize = 0;

    if (files && files.length > 0) {
      //check file type

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
    const userEmail = localStorage.getItem("userEmail") as string;
    const projectId = pathname.split("/")[2];
    form.append("userEmail", userEmail);
    // get the projectId from URL
    form.append("projectId", pathname.split("/")[2]);
    const labels = new Set<string>();
    formDataInfo.forEach((formData) => {
      form.append(formData.label, formData.file);
      labels.add(formData.label);
    });
    labels.forEach((label) => {
      form.append("labels", label);
    });
    setUploadCloud(true);
    const res = await Axios.post("/api/upload/uploadBucket", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === httpStatusCode.CREATED) {
      toast.success("Upload thành công lên cloud !");
      setUploadCloud(false);
      route.push(`/projects/${projectId}/train`);
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
          <div
            className={`flex-1 ${
              uploadMethod !== "folders" && uploadMethod ? "opacity-50" : ""
            }`}
          >
            <label className="text-lg font-semibold">
              <input
                type="radio"
                name="uploadMethod"
                value="folders"
                onChange={handleRadioChange}
                checked={uploadMethod === "folders"}
                className="mr-2"
              />
              Method 1: Pre-arranged folders
            </label>
            <p>
              Organize your images in folders named according to their
              corresponding classes (for instance "dog" or "cat"). Then, upload
              the parent folder using the input below.
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              webkitdirectory=""
              mozdirectory=""
              accept="image/*"
              disabled={uploadMethod !== "folders"}
              className="hover:gray-200 file-input w-full max-w-xs cursor-pointer rounded-md p-2 transition duration-300 "
            />
          </div>
          {/* <!-- Method 2 --> */}
          {/* Method 2 */}
          <div
            className={`flex-1 ${
              uploadMethod !== "csvJson" && uploadMethod ? "opacity-50" : ""
            }`}
          >
            <label className="text-lg font-semibold">
              <input
                type="radio"
                name="uploadMethod"
                value="csvJson"
                onChange={handleRadioChange}
                checked={uploadMethod === "csvJson"}
                className="mr-2"
              />
              Method 2: CSV/JSONL with associated images
            </label>
            <p>
              Upload a .csv or .jsonl file, then the associated images. Each
              data file should have at least 2 columns: one for{" "}
              <code>image_relpath</code>, and one for <code>target</code>.
            </p>
            <input
              type="file"
              onChange={handleFileChangeCSV}
              accept=".csv, .jsonl"
              disabled={uploadMethod !== "csvJson"}
              className="hover:gray-200 file-input w-full max-w-xs cursor-pointer rounded-md p-2 transition duration-300 "
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
        </div>
      </div>
      
      {uploadMethod === "csvJson" && (
        <div className="container mx-auto p-4">
          {csvData.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      {Object.keys(csvData[0]).map((header) => (
                        <th key={header}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.slice(startIndex, endIndex).map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value, colIndex) => (
                          <td key={colIndex}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="container mx-auto p-4">
                <PaginationControls
                  currentPage={countPage + 1} // Adjust if you are using zero-based index for countPage
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      )}
      
      {isUploading && (
        <div className="flex flex-col items-center justify-center  ">
          <p className="mb-2 text-sm text-gray-700">{fileName}</p>
          <Progress value={progress} className="w-[50%]" />
        </div>
      )}

      {modalVisible &&
        (uploadCloud ? (
          <Dialog open={true}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Uploading data to the cloud (It might take a few secs)
                </DialogTitle>
                <DialogDescription className="flex justify-center">
                  <LoaderIcon className="h-10 w-10 animate-spin" />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          <ModalUploadFile
            folder={modalInfo}
            onClose={closeModal}
            onSubmit={submitModal}
            progress={progress}
            mapFolder={mapFolder.current}
          />
        ))}
    </div>
  );
}
