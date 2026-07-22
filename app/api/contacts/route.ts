import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validation
        if (
            !body.name ||
            !body.email ||
            !body.phone ||
            !body.message
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Name, email and message are required.",
                },
                {
                    status: 400,
                }
            );
        }

        await connectDB();

        const existingContact = await Contact.findOne({
            email: body.email,
            message: body.message,
        });

        if (existingContact) {
            return NextResponse.json(
                {
                    success: false,
                    message: "This inquiry has already been submitted.",
                },
                { status: 409 }
            );
        }

        const contact = await Contact.create({
            name: body.name,
            email: body.email,
            phone: body.phone || "",
            subject: body.subject || "",
            message: body.message,
            status: "new",
        });

        // Future: Trigger n8n workflow
        // try {
        //   await fetch(process.env.N8N_WEBHOOK_URL!, {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(contact),
        //   });
        // } catch (error) {
        //   console.error("n8n webhook failed:", error);
        // }

        return NextResponse.json(
            {
                success: true,
                message:
                    "Contact request submitted successfully.",
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(
            "CREATE CONTACT ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to submit contact request.",
            },
            {
                status: 500,
            }
        );
    }
}

export async function GET() {
    try {
        await connectDB()
        const contacts = await Contact.find({})
            .sort({ createdAt: -1 })
            .lean()

        return NextResponse.json({
            success: true,
            contacts,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch contacts",
            },
            {
                status: 500,
            }
        );
    }
}