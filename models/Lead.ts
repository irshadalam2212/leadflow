import { model, models, Schema } from "mongoose";

const leadSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    budget: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        default: "",
    },
    propertyId: {
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
)

export const Lead = models.Lead || model("Lead", leadSchema);