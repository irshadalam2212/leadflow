import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

export async function GET() {
    try {
        await connectDB();

        const now = new Date();

        const leads = await Lead.find({
            followUpDate: {
                $ne: null,
                $lte: now,
            },

            status: {
                $nin: ["closed", "won", "lost"],
            },

            $or: [
                {
                    lastReminderSentAt: null,
                },
                {
                    $expr: {
                        $lt: [
                            "$lastReminderSentAt",
                            "$followUpDate",
                        ],
                    },
                },
            ],
        })
            .select(
                "_id name email phone assignedTo followUpDate status"
            )
            .sort({
                followUpDate: 1,
            })
            .lean();

        return NextResponse.json({
            success: true,
            count: leads.length,
            leads,
        });
    } catch (error) {
        console.error(
            "DUE REMINDERS ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to fetch due reminders",
            },
            {
                status: 500,
            }
        );
    }
}