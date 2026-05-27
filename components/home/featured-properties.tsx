import { MapPin, Star } from "lucide-react";

import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const properties = [
  {
    id: 1,
    title: "Luxury Villa",
    location: "Mumbai",
    price: "₹2.5 Cr",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
  },
  {
    id: 2,
    title: "Modern Apartment",
    location: "Pune",
    price: "₹1.2 Cr",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    id: 3,
    title: "Sea View Penthouse",
    location: "Goa",
    price: "₹3.8 Cr",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  },
];

export default function FeaturedProperties() {
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

          <Button variant="outline" className="rounded-xl">
            View All
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="overflow-hidden rounded-3xl border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative">
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

                <h3 className="text-2xl font-semibold">
                  {property.title}
                </h3>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                    <span className="text-sm font-medium">
                      4.9 Ratings
                    </span>
                  </div>

                  <Button className="rounded-xl">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}