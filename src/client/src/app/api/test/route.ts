import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
     console.log("request", request.cookies);
    const products = {
        name: "1234",
        price: 100,
    };

    return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
    // console.log("request", request);
    const products = {
        name: "1234",
        price: 100,
    };

    return NextResponse.json(products);
}
