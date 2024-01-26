import { NextRequest, NextResponse } from 'next/server';
import axios from "axios";
import config from '@/config/config';
import httpStatusCode from "@/src/app/errors/httpStatusCode";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log(body);

        const response = await axios.post(`${config.backendURL}/projects/createProject`, body);

        if (response.status === httpStatusCode.CREATED) {
            return new NextResponse(JSON.stringify(response.data), {
                status: httpStatusCode.CREATED,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return new NextResponse(JSON.stringify({ error: response.data }), {
            status: httpStatusCode.BAD_REQUEST,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error: any) {
        console.error('Error during POST request:', error);
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: httpStatusCode.BAD_REQUEST,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}