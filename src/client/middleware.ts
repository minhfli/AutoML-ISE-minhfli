import {NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const res = new NextResponse();
    console.log("middleware ping");
    res.headers.set("x-middleware", "true");
    let cookies = request.cookies.get('access_token');
    console.log(cookies);
    if (!cookies) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

  }

  export const config = {
    matcher: '/api/:path*'
  }