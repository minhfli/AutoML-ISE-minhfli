"use client";
import React, { use, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { map } from "zod";
import { InspectionPanelIcon } from "lucide-react";
import instance from "@/src/app/api/axios";

interface ModalUploadFileProps {
  folder: Folder;
  onClose: () => void;
  onSubmit: () => void;
  mapFolder: Map<string, { size: number; count: number }>;
  progress : number;
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

const ModalUploadFile: React.FC<ModalUploadFileProps> = ({
  folder,
  onClose,
  onSubmit,
  progress,
  mapFolder
}) => {
  let totalSize = 0;
  for(let value of mapFolder.values()) {
    totalSize += value.size;
  }
  let totalCount = 0;
  for(let value of mapFolder.values()) {
    totalCount += value.count;
  }
  console.log(mapFolder)
  
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  useEffect(() => {
    if(progress === 100) {
      setIsDialogOpen(true);
    }
  }, [progress]);
  return (
    <>
      <Dialog open = {isDialogOpen}>
        <DialogContent className="max-h-[90vh] w-full overflow-y-auto p-4 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Folder: {folder.name}</DialogTitle>
            <h1>{totalSize}</h1>
            <h1>{totalCount}</h1>
            <DialogDescription className="text-lg font-semibold">
              Click submit to add to project when you done
            </DialogDescription>
          </DialogHeader>

          {folder.subfolders &&
            folder.subfolders.map((subfolder, index) => (
              <div
                key={index}
                className="my-2 border-2 border-gray-300 p-3 hover:border-dotted"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="font-semibold">{subfolder.name}</div>
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {subfolder.images &&
                    subfolder.images.slice(0, 6).map((image, imgIndex) => (
                      <div key={imgIndex} className="min-w-0">
                        <img
                          className="h-24 object-cover" // Adjust 'h-24' to desired image height
                          src={image.url}
                          alt={`Preview of ${subfolder.name} ${imgIndex + 1}`}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          <DialogFooter>
            <Button type="submit" onClick={onSubmit}>
              Save changes
            </Button>
            <Button onClick={()=> setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalUploadFile;
