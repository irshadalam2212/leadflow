import PropertyCard from "@/components/property/property-card";
import PropertyFilters from "@/components/property/property-filter";
import { properties } from "@/data/property";

const Page = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Header Section */}
            <div className="mb-12">
                <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
                    Properties
                </p>

                <h1 className="text-4xl font-bold tracking-tight">
                    Discover Your Perfect Property
                </h1>

                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                    Browse premium villas, apartments, penthouses, and
                    family homes across top locations.
                </p>

                <div className="mt-6">
                    <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                        {properties.length} Properties Found
                    </span>
                </div>
            </div>
            <PropertyFilters />
            {/* Property Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                    />
                ))}
            </div>
        </div>
    );
};

export default Page;