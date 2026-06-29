import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // Ensure activity array exists
    if (!lead.activity) {
      lead.activity = [];
    }

    // Mark reminder as sent
    lead.lastReminderSentAt = new Date();

    // Store activity
    lead.activity.push({
      action: "reminder_sent",
      value: lead.assignedTo || "Unassigned",
    });

    await lead.save();

    return NextResponse.json({
      success: true,
      message: "Reminder marked as sent.",
      lead,
    });
  } catch (error) {
    console.error(
      "REMINDER SENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update reminder status.",
      },
      {
        status: 500,
      }
    );
  }
}