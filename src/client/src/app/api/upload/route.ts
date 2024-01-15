import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import JSZip from "jszip";
import { storage } from "@/config/config";

export async function POST(req: NextRequest) {
    console.log("POST /api/upload");
    const data = req.formData();
    // TODO : Lấy user_name và project_name từ req @DuongNam
    // const user_name = "lexuanan18102004"
    // const project_name = "flower-classifier"
    const user_name = (await data).get("user_name") as string;
    const project_name = (await data).get("project_name") as string;

    const bucketName = `${user_name}`;
    const exists = await storage.bucket(bucketName).exists();
    if (!exists[0]) {
        await storage.createBucket(bucketName);
    }
    const labels = (await data).getAll("labels") as string[];
    const mapData = new Map<string, File[]>();
    for (const label of labels) {
        mapData.set(label, (await data).getAll(label) as File[]);
    }
    const labelCounts: Record<string, number> = {};
    const zip = new JSZip();
    const destinationFileName = `${project_name}/datasets/datasets.zip`
    try {
        for (const [label, files] of mapData) {
            if (!labelCounts[label]) {
                labelCounts[label] = 0;
            }
            await Promise.all(files.map(async (file) => {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
                labelCounts[label] += 1;
                const extension = file.name.split(".").pop();
                const filePath = `${label}/${labelCounts[label]}.${extension}`;
                zip.file(filePath, buffer);
            }));
        }
        const zipContent = await zip.generateAsync({ type: "nodebuffer" });
        await storage.bucket(user_name).file(destinationFileName).save(zipContent);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}