import { model, models, Schema } from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        leadId: {
            type: Schema.Types.ObjectId,
            ref: "Lead",
            required: true,
        },

        assignedTo: {
            type: String,
            default: "",
        },

        dueDate: {
            type: Date,
            default: Date.now,
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },

        status: {
            type: String,
            enum: [
                "todo",
                "in_progress",
                "completed",
                "cancelled",
            ],
            default: "todo",
        },

        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export const Task =
    models.Task || model("Task", taskSchema);