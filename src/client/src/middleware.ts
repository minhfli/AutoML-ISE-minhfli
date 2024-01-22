import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { toast } from "sonner";

export async function middleware(request: NextRequest) {
    const res = new NextResponse();
    res.headers.set("x-middleware", "true");
    let access_token = request.cookies.get('accessToken');
    if (access_token === undefined) {
        const redirectURL = new URL('/login', request.url);
        return NextResponse.redirect(redirectURL);
    }
    return NextResponse.next();
}

const verifyToken = (token: string, secretSignature: string): Promise<any> =>
    new Promise((resolve, reject) => {
        jwt.verify(token, secretSignature, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            return resolve(decoded);
        });
    });

export const config = {
    matcher: '/projects/:path*'
}
