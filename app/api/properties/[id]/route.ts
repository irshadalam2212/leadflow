import { connectDB } from "@/lib/mongodb";
import { Property } from "@/models/Property";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

const propertyStatuses = ["available", "sold", "pending"] as const;

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid property ID." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const bedrooms = Number(body.bedrooms);
    const bathrooms = Number(body.bathrooms);
    const status = String(body.status || "");
    const amenities = Array.isArray(body.amenities)
      ? body.amenities
          .map((amenity: unknown) => String(amenity).trim())
          .filter(Boolean)
      : [];
    const requiredValues = [
      body.title,
      body.location,
      body.price,
      body.image,
      body.area,
      body.description,
    ];

    if (
      requiredValues.some((value) => !String(value ?? "").trim()) ||
      !Number.isFinite(bedrooms) ||
      bedrooms < 0 ||
      !Number.isFinite(bathrooms) ||
      bathrooms < 0 ||
      !propertyStatuses.includes(
        status as (typeof propertyStatuses)[number]
      )
    ) {
      return NextResponse.json(
        { success: false, message: "Please provide valid property details." },
        { status: 400 }
      );
    }

    await connectDB();

    const property = await Property.findByIdAndUpdate(
      id,
      {
        title: body.title,
        location: body.location,
        price: body.price,
        image: body.image,
        bedrooms,
        bathrooms,
        area: body.area,
        description: body.description,
        amenities,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!property) {
      return NextResponse.json(
        { success: false, message: "Property not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, property });
  } catch (error) {
    console.error("Failed to update property:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update property." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid property ID." },
        { status: 400 }
      );
    }

    await connectDB();
    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return NextResponse.json(
        { success: false, message: "Property not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete property:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete property." },
      { status: 500 }
    );
  }
}
