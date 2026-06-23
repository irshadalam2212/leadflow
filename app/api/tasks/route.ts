import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Task } from "@/models/task";


export async function GET(
    request: Request
) {
    try {
        const { searchParams } = new URL(request.url)

        const leadId = searchParams.get("leadId");

        await connectDB()

        const tasks = await Task.find({
            leadId,
        })
            .sort({
                createdAt: -1,
            })
            .lean();
        return NextResponse.json({
            success: true,
            tasks,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to fetch tasks",
            },
            {
                status: 500,
            }
        );
    }
}