import { MapPin, Star } from "lucide-react";
import Link from "next/link";

import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { connectDB } from "@/lib/mongodb";
import { Property } from "@/models/Property";

export default async function FeaturedProperties() {
  await connectDB();
  const properties = await Property.find()
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <section className="py-10">
      <Container>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
              Featured Properties
            </p>

            <h2 className="text-3xl font-bold tracking-tight">
              Explore Premium Listings
            </h2>
          </div>

          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/properties">View All</Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Card
              key={property._id.toString()}
              className="overflow-hidden rounded-3xl border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative">
                {/* Property image URLs are managed through the dashboard. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-60 w-full object-cover"
                />

                <div className="absolute right-4 top-4 rounded-full bg-background/90 px-4 py-2 text-sm font-semibold shadow">
                  {property.price}
                </div>
              </div>

              <CardContent className="p-4">
                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </div>

                <h3 className="text-2xl font-semibold">{property.title}</h3>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">Featured</span>
                  </div>

                  <Button asChild className="rounded-xl">
                    <Link href={`/properties/${property._id.toString()}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="rounded-2xl border border-dashed py-12 text-center text-muted-foreground">
            No featured properties available right now.
          </div>
        )}
      </Container>
    </section>
  );
}
