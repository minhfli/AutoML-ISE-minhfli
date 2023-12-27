import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    console.log("request", request.cookies);
    const products = {
        name: "1234",
        price: 100,
    };
    // append cookie
    return NextResponse.json(products, {
        headers: {
            "Set-Cookie": "test=1234; Path=/; HttpOnly",
        },
    });

}

export async function POST(request: NextRequest) {
    // console.log("request", request);
    const products = {
        name: "1234",
        price: 100,
    };

    return NextResponse.json(products);
}
