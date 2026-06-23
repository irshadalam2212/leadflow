"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import TaskFormDialog from "@/components/dashboard/task-form-dialog";
import { Task } from "@/types/task/task";
import TasksTable from "@/components/dashboard/task-table";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] =
    useState(true);

  async function fetchTasks() {
    try {
      const response =
        await fetch("/api/tasks");

      const data =
        await response.json();

      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
     <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Tasks
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage sales tasks and
            follow-ups.
          </p>
        </div>

        <TaskFormDialog
          onSaved={fetchTasks}
          trigger={
            <Button>
              Add Task
            </Button>
          }
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="rounded-xl border p-10 text-center">
          Loading tasks...
        </div>
      ) : (
        <TasksTable
          tasks={tasks}
          onRefresh={fetchTasks}
        />
      )}
    </div>
  );
}