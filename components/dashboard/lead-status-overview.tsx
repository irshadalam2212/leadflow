interface LeadStatusOverviewProps {
  stats: {
    new: number;
    contacted: number;
    qualified: number;
    closed: number;
    lost: number;
  };
}

export default function LeadStatusOverview({
  stats,
}: LeadStatusOverviewProps) {
  const total =
    stats.new +
    stats.contacted +
    stats.qualified +
    stats.closed +
    stats.lost;

  const statuses = [
    {
      label: "New",
      value: stats.new,
    },
    {
      label: "Contacted",
      value: stats.contacted,
    },
    {
      label: "Qualified",
      value: stats.qualified,
    },
    {
      label: "Closed",
      value: stats.closed,
    },
    {
      label: "Lost",
      value: stats.lost,
    },
  ];

  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          Lead Status Overview
        </h3>

        <p className="text-sm text-muted-foreground">
          Distribution of leads across the sales pipeline.
        </p>
      </div>

      <div className="space-y-5">
        {statuses.map((status) => {
          const percentage =
            total > 0
              ? (status.value / total) * 100
              : 0;

          return (
            <div key={status.label}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">
                  {status.label}
                </span>

                <span className="text-sm text-muted-foreground">
                  {status.value}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}