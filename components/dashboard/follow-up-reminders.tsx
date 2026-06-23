import Link from "next/link";
import {
  CalendarClock,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

interface Lead {
  _id: string;
  name: string;
  followUpDate: string;
  assignedTo?: string;
}

interface FollowUpRemindersProps {
  leads: Lead[];
}

export default function FollowUpReminders({
  leads,
}: FollowUpRemindersProps) {

    console.log(leads, "log: follow up")
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            Follow-Up Reminders
          </h3>

          <p className="text-sm text-muted-foreground">
            Upcoming and overdue follow-ups.
          </p>
        </div>

        <Link
          href="/dashboard/leads"
          className="flex items-center gap-1 text-sm font-medium text-primary"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {leads.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No upcoming follow-ups.
        </p>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => {
            const followUpDate =
              new Date(lead.followUpDate);

            const isOverdue =
              followUpDate <
              new Date();

            return (
              <div
                key={lead._id}
                className="flex items-start gap-3 rounded-xl border p-3"
              >
                {isOverdue ? (
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-red-500" />
                ) : (
                  <CalendarClock className="mt-0.5 h-5 w-5 text-primary" />
                )}

                <div className="flex-1">
                  <p className="font-medium">
                    {lead.name}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Follow-up:{" "}
                    {followUpDate.toLocaleDateString()}
                  </p>

                  {lead.assignedTo && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Assigned to{" "}
                      {lead.assignedTo}
                    </p>
                  )}
                </div>

                {isOverdue && (
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                    Overdue
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}