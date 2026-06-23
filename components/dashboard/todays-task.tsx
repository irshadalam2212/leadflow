import Link from "next/link";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";

interface Task {
  _id: string;
  title: string;
  status: string;
  dueDate: string;
  assignedTo?: string;
}

interface TodaysTasksProps {
  tasks: Task[];
}

export default function TodaysTasks({
  tasks,
}: TodaysTasksProps) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            Today's Tasks
          </h3>

          <p className="text-sm text-muted-foreground">
            Upcoming and pending tasks.
          </p>
        </div>

        <Link
          href="/dashboard/tasks"
          className="flex items-center gap-1 text-sm font-medium text-primary"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No pending tasks.
        </p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-start gap-3 rounded-xl border p-3"
            >
              {task.status === "completed" ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />
              ) : (
                <Circle className="mt-0.5 h-5 w-5 text-primary" />
              )}

              <div className="flex-1">
                <p className="font-medium">
                  {task.title}
                </p>

                <div className="mt-1 text-xs text-muted-foreground">
                  Due:{" "}
                  {new Date(
                    task.dueDate
                  ).toLocaleDateString()}
                </div>

                {task.assignedTo && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    Assigned to{" "}
                    {task.assignedTo}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}