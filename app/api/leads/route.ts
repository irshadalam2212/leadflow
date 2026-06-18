import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    console.log("Lead Received:", body);

    return NextResponse.json({
        sucess: true,
        message: "Lead received successfully"
    });
}