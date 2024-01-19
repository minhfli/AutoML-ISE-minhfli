import config from "@/config/config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = req.formData();
        const user_name = (await data).get("user_name") as string;
        const project_name = (await data).get("project_name") as string;
        const image = (await data).get("image") as File;
        const formData = new FormData();

        formData.append("user_name", user_name);
        formData.append("project_name", project_name);
        formData.append("image", image, image.name);

        console.log(user_name, project_name, image);

        const response = await axios.post(`${config.mlURL}/api/image_classifier/predict`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.status);

        if (response.status === 200) {
            console.log("hehe");
            return new NextResponse(response.data, {
                status: 200,
            });
        }
        return new NextResponse(JSON.stringify({ error: response.data }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error : any) {
        console.error('Error during POST request:', error);
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

}