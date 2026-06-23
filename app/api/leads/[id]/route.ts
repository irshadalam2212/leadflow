import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    try {
        const { id } = await params;
        const body = await request.json();
        await connectDB();

        const lead = await Lead.findByIdAndUpdate(
            id,
            {
                ...(body.status !== undefined && {
                    status: body.status,
                }),

                ...(body.assignedTo !== undefined && {
                    assignedTo: body.assignedTo,
                }),

                ...(body.notes !== undefined && {
                    notes: body.notes,
                }),
            },
            {
                new: true,
                runValidators: true,
            }
        );
        
        if (!lead) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Lead not found",
                },
                {
                    status: 404,
                }
            );
        }
        return NextResponse.json({
            success: true,
            lead,
        });
    }
    catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                success: false,
                message: "Error updating lead",
            },
            {
                status: 500,
            }
        );
    }
}