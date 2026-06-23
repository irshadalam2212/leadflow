"use client";

import { ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteTaskDialogProps {
  taskId: string;
  trigger: ReactNode;
  onDeleted: () => void;
}

export default function DeleteTaskDialog({
  taskId,
  trigger,
  onDeleted,
}: DeleteTaskDialogProps) {
  async function handleDelete() {
    try {
      const response =
        await fetch(
          `/api/tasks/${taskId}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (!data.success) {
        throw new Error();
      }

      onDeleted();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete task"
      );
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Task?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}