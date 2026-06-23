"use client";

import {
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskFormDialog from "./task-form-dialog";
import DeleteTaskDialog from "./delete-task-dialog";
import { Task } from "@/types/task/task";

interface TasksTableProps {
  tasks: Task[];
  onRefresh: () => void;
}

export default function TasksTable({
  tasks,
  onRefresh,
}: TasksTableProps) {
  const getPriorityBadge = (
    priority: string
  ) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";

      case "medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusBadge = (
    status: string
  ) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "in_progress":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (tasks?.length === 0) {
    return (
      <div className="rounded-xl border p-10 text-center">
        <p className="text-muted-foreground">
          No tasks found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left">
              Title
            </th>

            <th className="px-4 py-3 text-left">
              Lead
            </th>

            <th className="px-4 py-3 text-left">
              Assigned To
            </th>

            <th className="px-4 py-3 text-left">
              Priority
            </th>

            <th className="px-4 py-3 text-left">
              Status
            </th>

            <th className="px-4 py-3 text-left">
              Due Date
            </th>

            <th className="px-4 py-3 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {tasks?.map((task) => (
            <tr
              key={task?._id}
              className="border-b last:border-0"
            >
              <td className="px-4 py-4">
                <div>
                  <p className="font-medium">
                    {task?.title}
                  </p>

                  {task.description && (
                    <p className="text-sm text-muted-foreground">
                      {task?.description}
                    </p>
                  )}
                </div>
              </td>

              <td className="px-4 py-4">
                {task?.title || "-"}
              </td>

              <td className="px-4 py-4">
                {task?.assignedTo || "-"}
              </td>

              <td className="px-4 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getPriorityBadge(
                    task?.priority
                  )}`}
                >
                  {task?.priority}
                </span>
              </td>

              <td className="px-4 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(
                    task?.status
                  )}`}
                >
                  {task?.status}
                </span>
              </td>

              <td className="px-4 py-4">
                {new Date(
                  task?.dueDate
                ).toLocaleDateString()}
              </td>

              <td className="px-4 py-4">
                <div className="flex justify-end gap-2">
                  <TaskFormDialog
                    task={task}
                    onSaved={onRefresh}
                    trigger={
                      <Button
                        variant="outline"
                        size="icon"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    }
                  />

                  <DeleteTaskDialog
                    taskId={task._id}
                    onDeleted={onRefresh}
                    trigger={
                      <Button
                        variant="destructive"
                        size="icon"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    }
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}