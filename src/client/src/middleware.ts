import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";
import {usePathname, useSearchParams, useRouter} from "next/navigation";

export async function middleware(request: NextRequest) {
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
    matcher: '/api/:path*'
}