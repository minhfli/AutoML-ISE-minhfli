import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    console.log("request", request);
    const products = {
        name: "1234",
        price: 100,
    };
    return NextResponse.json(products);
}
