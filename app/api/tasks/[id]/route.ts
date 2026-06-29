import { connectDB } from "@/lib/mongodb";
import { Task } from "@/models/Task";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    await connectDB();

    const task = await Task.findByIdAndUpdate(
      id,
      {
        ...(body.title !== undefined && {
          title: body.title,
        }),

        ...(body.description !== undefined && {
          description: body.description,
        }),

        ...(body.leadId !== undefined && {
          leadId: body.leadId,
        }),

        ...(body.assignedTo !== undefined && {
          assignedTo: body.assignedTo,
        }),

        ...(body.priority !== undefined && {
          priority: body.priority,
        }),

        ...(body.status !== undefined && {
          status: body.status,
        }),

        ...(body.dueDate !== undefined && {
          dueDate: body.dueDate,
        }),

        ...(body.status === "completed" && {
          completedAt: new Date(),
        }),
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("leadId")
      .lean();

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          message: "Task not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(
      "UPDATE TASK ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update task",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;

    await connectDB();

    const task =
      await Task.findByIdAndDelete(id);

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          message: "Task not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Task deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE TASK ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete task",
      },
      {
        status: 500,
      }
    );
  }
}