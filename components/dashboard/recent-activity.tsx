import {
  Clock,
  UserPlus,
} from "lucide-react";

interface Lead {
  _id: string;
  name: string;
  status: string;
  createdAt: string;
}

interface RecentActivityProps {
  leads: Lead[];
}

export default function RecentActivity({
  leads,
}: RecentActivityProps) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          Recent Activity
        </h3>

        <p className="text-sm text-muted-foreground">
          Latest CRM activities and lead updates.
        </p>
      </div>

      <div className="space-y-5">
        {leads.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recent activity.
          </p>
        ) : (
          leads.map((lead) => (
            <div
              key={lead._id}
              className="flex gap-4"
            >
              {/* Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <UserPlus className="h-5 w-5 text-primary" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">
                    {lead.name}
                  </span>{" "}
                  created a new inquiry.
                </p>

                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />

                  {new Date(
                    lead.createdAt
                  ).toLocaleString()}
                </div>
              </div>

              {/* Status */}
              <div>
                <span className="rounded-full border px-3 py-1 text-xs font-medium">
                  {lead.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}