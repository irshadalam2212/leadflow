import { model, models, Schema } from "mongoose";

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            default: "",
        },

        message: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            default: "new",
        },
    },
    {
        timestamps: true,
    }
);

export const Contact = models.Contact || model("Contact", contactSchema);