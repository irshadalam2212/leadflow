"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

interface Task {
  _id: string;
  title: string;
  status: string;
  dueDate: string;
}

interface LeadTasksProps {
  leadId: string;
}

export default function LeadTasks({
  leadId,
}: LeadTasksProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(
          `/api/tasks?leadId=${leadId}`
        );

        const data = await response.json();

        if (data.success) {
          setTasks(data.tasks);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [leadId]);

  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="rounded-xl border p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">
          Tasks
        </h3>
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No tasks created yet.
        </p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-start gap-3 rounded-lg border p-3"
            >
              {task.status === "completed" ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />
              ) : (
                <Circle className="mt-0.5 h-5 w-5 text-muted-foreground" />
              )}

              <div className="flex-1">
                <p className="font-medium">
                  {task.title}
                </p>

                <p className="text-xs text-muted-foreground">
                  Due:{" "}
                  {new Date(
                    task.dueDate
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}