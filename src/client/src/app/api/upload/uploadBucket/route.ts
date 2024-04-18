import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import config, { storage } from "@/config/config";
import httpStatusCode from "@/src/app/errors/httpStatusCode";
import { extractNameFromEmail } from "@/utils";
import Axios from "axios";

export async function POST(req: NextRequest) {
  console.log("Upload bucket");
  const data = await req.formData();
  // Chỉ có chỗ này cần extract name từ email. Tất cả các chỗ còn lại đều gửi nguyên mail
  const bucketName = extractNameFromEmail(data.get("userEmail") as string);
  //! dangerous code, fix later
  //const bucketName = "test-automl-bucket0";
  const projectId = data.get("projectId") as string;

  const projectInfo = await Axios.get(
    `${config.backendURL}/projects/${projectId}`,
  );

  const project_name = projectInfo.data.project.name;

  console.log(`Bucket name: ${bucketName} - Project name: ${project_name}`);

  const exists = await storage.bucket(bucketName).exists();
  if (!exists[0]) {
    await storage.createBucket(bucketName);
  }
  const labels = data.getAll("labels") as string[];
  const mapData = new Map<string, File[]>();
  for (const label of labels) {
    mapData.set(label, data.getAll(label) as File[]);
  }
  const labelCounts: Record<string, number> = {};
  const zip = new JSZip();
  const destinationFileName = `${project_name}/datasets/datasets.zip`;
  try {
    for (const [label, files] of mapData) {
      if (!labelCounts[label]) {
        labelCounts[label] = 0;
      }
      await Promise.all(
        files.map(async (file) => {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          labelCounts[label] += 1;
          const extension = file.name.split(".").pop();
          const filePath = `${label}/${labelCounts[label]}.${extension}`;
          zip.file(filePath, buffer);
        }),
      );
    }
    const zipContent = await zip.generateAsync({ type: "nodebuffer" });
    await storage.bucket(bucketName).file(destinationFileName).save(zipContent);
    return NextResponse.json(
      { success: true },
      {
        status: httpStatusCode.CREATED,
      },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false },
      {
        status: httpStatusCode.INTERNAL_SERVER_ERROR,
      },
    );
  }
}
