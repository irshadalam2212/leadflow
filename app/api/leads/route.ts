import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Lead } from "@/models/Lead";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        await connectDB();

        const lead = await Lead.create({
            ...body,
            propertyId: body.propertyId,
        });

        return NextResponse.json({
            sucess: true,
            message: "Lead created successfully",
            lead
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Failed to create lead",
        }, { status: 500 });
    }
}