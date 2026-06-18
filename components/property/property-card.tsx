import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IProperty } from "@/types/property/property.types";

interface PropertyCardProps {
  property: IProperty;
}

export default function PropertyCard({
  property,
}: PropertyCardProps) {
  return (
    <Card className="group overflow-hidden rounded-3xl border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Property Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute right-4 top-4 rounded-full bg-background/90 px-4 py-2 text-sm font-semibold shadow-md backdrop-blur">
          {property.price}
        </div>
      </div>

      <CardContent className="space-y-5 p-6">
        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{property.location}</span>
        </div>

        {/* Title */}
        <h3 className="line-clamp-1 text-xl font-semibold">
          {property.title}
        </h3>

        {/* Property Info */}
        <div className="grid grid-cols-3 gap-4 border-y py-4">
          <div className="flex flex-col items-center gap-2">
            <BedDouble className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">
              {property.bedrooms} Bed
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Bath className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">
              {property.bathrooms} Bath
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Ruler className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">
              {property.area}
            </span>
          </div>
        </div>

        {/* Action */}
        <Button asChild className="w-full rounded-xl">
          <Link href={`/properties/${property.id}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}