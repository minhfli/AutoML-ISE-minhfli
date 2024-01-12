import { NextRequest, NextResponse } from 'next/server';
import axios from "axios";
import config from '@/config/config';
import { middleware } from '@/middleware';

export async function POST(req: NextRequest) {
    try {
        const middlewareResponse = await middleware(req);
        if (middlewareResponse?.status === 401) {
            return middlewareResponse;
        }
        const body = await req.json();

        console.log(body);

        const response = await axios.post(`${config.backendURL}/project/createProject`, body);
        console.log(response.status);

        if (response.status === 201) {
            return new NextResponse(JSON.stringify(response.data), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return new NextResponse(JSON.stringify({ error: response.data }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error: any) {
        console.error('Error during POST request:', error);
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}