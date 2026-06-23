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

        const lead = await Lead.findById(id);

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

        if (!lead.activity) {
            lead.activity = [];
        }

        if (body.status !== undefined) {
            lead.status = body.status;

            lead.activity.push({
                action: "status_changed",
                value: body.status,
            });
        }

        if (body.assignedTo !== undefined) {
            lead.assignedTo = body.assignedTo;

            lead.activity.push({
                action: "assigned",
                value: body.assignedTo,
            });
        }

        if (body.notes !== undefined) {
            lead.notes = body.notes;

            lead.activity.push({
                action: "note_added",
                value: body.notes,
            });
        }

        if (
            body.followUpDate !== undefined
        ) {
            lead.followUpDate =
                body.followUpDate;

            lead.activity.push({
                action: "follow_up_set",
                value: body.followUpDate,
            });
        }

        await lead.save();

        return NextResponse.json({
            success: true,
            lead,
        });
    }
    catch (error) {
        console.error(
            "PATCH LEAD ERROR:",
            JSON.stringify(error, null, 2)
        );
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