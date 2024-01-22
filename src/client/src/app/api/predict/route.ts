import config from "@/config/config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import httpStatusCode from "@/src/app/errors/httpStatusCode";

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();
        const userEmail = data.get("userEmail") as string;
        const projectId = data.get("projectId") as string;
        const projectInfo = await axios.get(`${config.backendURL}/projects/${projectId}`);

        if (projectInfo.status !== httpStatusCode.OK) {
            return new NextResponse(JSON.stringify({ error: "Project not found" }), {
                status: httpStatusCode.BAD_REQUEST,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const projectName = projectInfo.data.project.name;
        const image = data.get("image") as File;
        const formData = new FormData();

        formData.append("userEmail", userEmail.split('@')[0]);
        formData.append("projectName", projectName);
        formData.append("image", image, image.name);

        if (!(image instanceof File)) {
            console.error("No image file provided");
            return;
        }

        const response = await axios.post(`${config.mlURL}/image_classifier/predict`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });


        if (response.status === httpStatusCode.OK) {
            return new NextResponse(JSON.stringify(response.data), {
                status: httpStatusCode.OK,
            });
        }

        return new NextResponse(JSON.stringify({ error: response.data }), {
            status: httpStatusCode.BAD_REQUEST,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error : any) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: httpStatusCode.INTERNAL_SERVER_ERROR,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

}