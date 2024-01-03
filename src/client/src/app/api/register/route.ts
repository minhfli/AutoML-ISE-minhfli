import {NextRequest, NextResponse} from 'next/server';
import axios from "axios";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        console.log(body);
        // Gửi request lên server
        const response = await axios.post(`http://localhost:3456/api/v1/auth/register`, body);
        if (response.status === 201) {
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
        return new NextResponse(JSON.stringify({error: error.message}), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

