import {NextRequest, NextResponse} from 'next/server';
import axios from "axios";
import config from '@/config/config';
import { middleware } from '@/middleware';

export async function POST(req: NextRequest) {
    try {
        await middleware(req);
        const body = await req.json();

        console.log(body);

        const response = await axios.post(`${config.backendURL}/project/createProject`, body);
        if (response.status === 200) {
            return new NextResponse(JSON.stringify(response.data), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        return new NextResponse(JSON.stringify({error: response.data}), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error: any) {
        console.error('Error during POST request:', error);
        return new NextResponse(JSON.stringify({error: error.message}), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}