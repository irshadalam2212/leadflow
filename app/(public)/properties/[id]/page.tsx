import Image from "next/image";
import { notFound } from "next/navigation";
import {
    Bath,
    BedDouble,
    MapPin,
    Ruler,
} from "lucide-react";
import LeadInquiryForm from "@/components/property/lead-inquiry-form";
import { connectDB } from "@/lib/mongodb";
import { Property } from "@/models/Property";
import mongoose from "mongoose";
import { formatCurrency } from "@/lib/utils";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PropertyDetailsPage({
    params,
}: PageProps) {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
        notFound();
    }

    await connectDB();
    // const property = await Property.findOne({
    //     _id: id,
    //     status: "available",
    // }).lean();
    const property = await Property.findById(id).lean();

    if (!property) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero Image */}
            <div className="relative mb-10 h-125 overflow-hidden rounded-3xl">
                <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* Main Content */}
            <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
                {/* Left Section */}
                <div>
                    {/* Property Info */}
                    <div className="space-y-6">
                        <div>
                            <p className="mb-2 flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                {property.location}
                            </p>

                            <h1 className="text-4xl font-bold">
                                {property.title}
                            </h1>
                        </div>

                        <h2 className="text-3xl font-bold text-primary">
                            {formatCurrency(property.price)}
                        </h2>

                        {/* Features */}
                        <div className="grid max-w-xl grid-cols-3 gap-4 rounded-2xl border p-6">
                            <div className="flex flex-col items-center gap-2">
                                <BedDouble className="h-6 w-6 text-primary" />
                                <span className="font-medium">
                                    {property.bedrooms} Beds
                                </span>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <Bath className="h-6 w-6 text-primary" />
                                <span className="font-medium">
                                    {property.bathrooms} Baths
                                </span>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <Ruler className="h-6 w-6 text-primary" />
                                <span className="font-medium">
                                    {property.area} Sq.ft
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="pt-6">
                            <h3 className="mb-4 text-2xl font-semibold">
                                Description
                            </h3>

                            <p className="leading-8 text-muted-foreground">
                                {property.description || "-"}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="pt-6">
                            <h3 className="mb-4 text-2xl font-semibold">
                                Amenities
                            </h3>

                            {property?.amenities?.length > 0 ? (
                                <div className="grid gap-3 sm:grid-cols-2">
                                {property.amenities?.map((amenity: string) => (
                                    <div
                                        key={amenity}
                                        className="rounded-xl border p-4"
                                    >
                                        {amenity}
                                    </div>
                                ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">
                                    No amenities listed.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div>
                    <div className="sticky top-24">
                        <LeadInquiryForm
                            propertyId={property._id.toString()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
