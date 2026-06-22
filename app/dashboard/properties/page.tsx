import PropertiesTable from "@/components/dashboard/properties-table";
import { connectDB } from "@/lib/mongodb";
import { Property } from "@/models/Property";

export default async function PropertiesPage() {
  await connectDB();

  const properties = await Property.find({})
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Properties</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage all property listings.
        </p>
      </div>

      <PropertiesTable
        initialProperties={JSON.parse(JSON.stringify(properties))}
      />
    </div>
  );
}
