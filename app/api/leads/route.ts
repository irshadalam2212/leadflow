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

        try {
            await fetch(process.env.N8N_WEBHOOK_URL!, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    leadId: lead._id,
                    name: lead.name,
                    email: lead.email,
                    phone: lead.phone,
                    budget: lead.budget,
                    propertyId: lead.propertyId,
                    status: lead.status,
                }),
            });
        } catch (error) {
            console.error("n8n webhook failed:", error);
        }

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