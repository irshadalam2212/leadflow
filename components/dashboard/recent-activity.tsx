import {
  Clock,
  FileText,
  RefreshCcw,
  UserCheck,
  UserPlus,
} from "lucide-react";

interface Activity {
  action: string;
  value: string;
  createdAt: string;
}

interface Lead {
  _id: string;
  name: string;
  activity?: Activity[];
}

interface RecentActivityProps {
  leads: Lead[];
}

export default function RecentActivity({
  leads,
}: RecentActivityProps) {
  const activities = leads
    .flatMap((lead) =>
      (lead.activity || []).map((activity) => ({
        leadName: lead.name,
        ...activity,
      }))
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 10);

  const getActivityDetails = (
    action: string,
    value: string,
    leadName: string
  ) => {
    switch (action) {
      case "lead_created":
        return {
          icon: UserPlus,
          text: `${leadName} created a new inquiry`,
        };

      case "assigned":
        return {
          icon: UserCheck,
          text: `${leadName} assigned to ${value}`,
        };

      case "status_changed":
        return {
          icon: RefreshCcw,
          text: `${leadName} status changed to ${value}`,
        };

      case "note_added":
        return {
          icon: FileText,
          text: `${leadName} note updated`,
        };

      default:
        return {
          icon: Clock,
          text: `${leadName} activity updated`,
        };
    }
  };

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
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recent activity.
          </p>
        ) : (
          activities.map((activity, index) => {
            const details =
              getActivityDetails(
                activity.action,
                activity.value,
                activity.leadName
              );

            const Icon = details.icon;

            return (
              <div
                key={`${activity.createdAt}-${index}`}
                className="flex gap-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <div className="flex-1">
                  <p className="text-sm">
                    {details.text}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />

                    {new Date(
                      activity.createdAt
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}