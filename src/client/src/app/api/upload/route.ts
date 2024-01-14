import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import JSZip from "jszip";
import { storage } from "@/config/config";

export async function POST(req: NextRequest) {
    // // data :{
   //         roses : [
//                 binary
    //        ], 
    // }
    const data = req.formData();
    const user_name = "lexuanan18102004"
    const files = (await data).getAll("roses") as File[];
    const destinationFileName = "meow.zip"
    const zip = new JSZip(); 
    
    
    try {
        await Promise.all(files.map(async (file) => {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filePath = `${destinationFileName}/${file.webkitRelativePath}`;
            zip.file(filePath, buffer);
        }));
        const zipContent = await zip.generateAsync({ type: "nodebuffer" });
        
        await storage.bucket(user_name).file(destinationFileName).save(zipContent);
        return NextResponse.json({
            status: "ok",
            message: "Files uploaded successfully"
        });
    } catch (error) {
        console.error("Error during file upload:", error);
        return NextResponse.json({
            status: "error",
            message: "Error uploading files"
        });
    }
}


