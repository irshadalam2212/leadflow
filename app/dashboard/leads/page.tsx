import LeadsTable from "@/components/dashboard/leads-table";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

export default async function LeadsPage() {
  await connectDB();

  const leads = await Lead.find({})
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Leads
        </h1>

        <p className="mt-2 text-muted-foreground">
          View and manage all customer inquiries.
        </p>
      </div>

      <div className="space-y-4">
        <LeadsTable leads={JSON.parse(JSON.stringify(leads))} />
      </div>
    </div>
  );
}