import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Task } from "@/models/task";


export async function GET() {
  try {
    await connectDB();

    const tasks = await Task.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("GET LEADS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch leads",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
    request: Request
) {
    try {
        const body = await request.json();

        if (
            !body.title ||
            !body.leadId
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Title and Lead are required",
                },
                {
                    status: 400,
                }
            );
        }

        await connectDB();

        const task = await Task.create({
            title: body.title,
            description:
                body.description || "",
            leadId: body.leadId,
            assignedTo:
                body.assignedTo || "",
            dueDate: body.dueDate,
            priority:
                body.priority || "medium",
            status:
                body.status || "todo",
        });

        const populatedTask =
            await Task.findById(task._id)
                .populate("leadId")
                .lean();

        return NextResponse.json(
            {
                success: true,
                task: populatedTask,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(
            "CREATE TASK ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to create task",
            },
            {
                status: 500,
            }
        );
    }
}