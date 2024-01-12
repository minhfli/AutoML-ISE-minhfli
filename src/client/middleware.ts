import {NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const res = new NextResponse();
    console.log("middleware ping");
    res.headers.set("x-middleware", "true");
    let access_token = request.cookies.get('accessToken');
    console.log(access_token);
    if (access_token === undefined) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
  }

  export const config = {
    matcher: '/api/:path*'
  }