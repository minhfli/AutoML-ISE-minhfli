import {NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';
import axios from "axios";
import config from "@/config/config";

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(8)
});

async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const parsedBody = await RegisterSchema.safeParseAsync(body);

        if (parsedBody.success) {
            await axios.post(`${config.backendURL}/auth/register`, {
                email: parsedBody.data.email,
                password: parsedBody.data.password,
                name: parsedBody.data.name
            })
        } else {
            return new NextResponse(JSON.stringify({error: parsedBody.error}), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Trả về phản hồi thành công
        return new NextResponse(JSON.stringify({message: "Đăng ký thành công"}), {
            status: 200,
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

// Export hàm POST để sử dụng trong route
export default function handler(req: NextRequest) {
    if (req.method === 'POST') {
        return POST(req);
    }

    // Xử lý các phương thức HTTP khác nếu cần
    return new NextResponse(null, {status: 405});
}
