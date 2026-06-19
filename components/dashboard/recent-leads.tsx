import Link from "next/link";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
}

interface RecentLeadsProps {
  leads: Lead[];
}

export default function RecentLeads({
  leads,
}: RecentLeadsProps) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            Recent Leads
          </h3>

          <p className="text-sm text-muted-foreground">
            Latest customer inquiries.
          </p>
        </div>

        <Link
          href="/dashboard/leads"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="space-y-4">
        {leads.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No leads found.
          </p>
        ) : (
          leads.map((lead) => (
            <div
              key={lead._id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <h4 className="font-medium">
                  {lead.name}
                </h4>

                <p className="text-sm text-muted-foreground">
                  {lead.email}
                </p>
              </div>

              <span className="rounded-full border px-3 py-1 text-xs font-medium">
                {lead.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}