import {NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
    const res = new NextResponse();
    console.log("middleware ping");
    res.headers.set("x-middleware", "true");
  }

