import { connectDB } from "@/lib/mongodb";
import { Property } from "@/models/Property";
import { NextResponse } from "next/server";

const requiredFields = [
  "title",
  "location",
  "price",
  "image",
  "area",
] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const hasMissingField = requiredFields.some(
      (field) => !String(body[field] ?? "").trim()
    );
    const bedrooms = Number(body.bedrooms);
    const bathrooms = Number(body.bathrooms);

    if (
      hasMissingField ||
      !Number.isFinite(bedrooms) ||
      bedrooms < 0 ||
      !Number.isFinite(bathrooms) ||
      bathrooms < 0
    ) {
      return NextResponse.json(
        { success: false, message: "Please provide valid property details." },
        { status: 400 }
      );
    }

    await connectDB();

    const property = await Property.create({
      title: body.title,
      location: body.location,
      price: body.price,
      image: body.image,
      bedrooms,
      bathrooms,
      area: body.area,
    });

    return NextResponse.json(
      { success: true, property },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create property:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create property." },
      { status: 500 }
    );
  }
}
