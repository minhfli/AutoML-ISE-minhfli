import config from "@/config/config";
import axios from "axios";
import {NextRequest, NextResponse} from "next/server";
import httpStatusCode from "@/src/app/errors/httpStatusCode";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const response = await axios.post(`${config.backendURL}/projects/train`, data);
        if (response.status === httpStatusCode.OK) {
            return new NextResponse(JSON.stringify(response.data), {
                status: httpStatusCode.OK,
            });
        }
        return new NextResponse(JSON.stringify({error: response.data}), {
            status: httpStatusCode.BAD_REQUEST,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error: any) {
        console.error('Error during POST request:', error);
        return new NextResponse(JSON.stringify({error: error.message}), {
            status: httpStatusCode.BAD_REQUEST,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

}