"use client";

import {
    ReactNode,
    useEffect,
    useState,
} from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Task } from "@/types/task/task";

interface Lead {
    _id: string;
    name: string;
}

interface TaskFormDialogProps {
    task?: Task;
    trigger: ReactNode;
    onSaved: () => void;
}

export default function TaskFormDialog({
    task,
    trigger,
    onSaved,
}: TaskFormDialogProps) {
    const [open, setOpen] =
        useState(false);

    const [leads, setLeads] =
        useState<Lead[]>([]);

    const [isSaving, setIsSaving] =
        useState(false);

    const [form, setForm] = useState<{
        title: string;
        description: string;
        leadId: string;
        assignedTo: string;
        priority: "low" | "medium" | "high";
        status:
        | "todo"
        | "in_progress"
        | "completed"
        | "cancelled";
        dueDate: string;
    }>({
        title: "",
        description: "",
        leadId: "",
        assignedTo: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
    });

    useEffect(() => {
        if (task) {
            setForm({
                title: task.title,
                description:
                    task.description || "",
                leadId:
                    typeof task.leadId === "string"
                        ? task.leadId
                        : task.leadId?._id || "",
                assignedTo:
                    task.assignedTo || "",
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate
                    ? task.dueDate.slice(0, 10)
                    : "",
            });
        }
    }, [task]);

    useEffect(() => {
        async function fetchLeads() {
            try {
                const response = await fetch("/api/leads");

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch leads (${response.status})`
                    );
                }

                const data = await response.json();

                if (data.success) {
                    setLeads(data.leads || []);
                }
            } catch (error) {
                console.error(
                    "FETCH LEADS ERROR:",
                    error
                );
            }
        }

        fetchLeads();
    }, []);

    useEffect(() => {
        if (!task && open) {
            setForm({
                title: "",
                description: "",
                leadId: "",
                assignedTo: "",
                priority: "medium",
                status: "todo",
                dueDate: "",
            });
        }
    }, [open, task]);

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        try {
            setIsSaving(true);

            const response =
                await fetch(
                    task
                        ? `/api/tasks/${task._id}`
                        : "/api/tasks",
                    {
                        method: task
                            ? "PATCH"
                            : "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify(form),
                    }
                );

            const data =
                await response.json();

            if (!data.success) {
                throw new Error();
            }

            onSaved();
            setOpen(false);
        } catch (error) {
            console.error(error);
            alert(
                "Failed to save task"
            );
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        {task
                            ? "Edit Task"
                            : "Create Task"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        placeholder="Task title"
                        value={form.title}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                title: e.target.value,
                            })
                        }
                        className="w-full rounded-lg border p-3"
                    />

                    <textarea
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description:
                                    e.target.value,
                            })
                        }
                        className="w-full rounded-lg border p-3"
                    />

                    <select
                        value={form.leadId}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                leadId:
                                    e.target.value,
                            })
                        }
                        className="w-full rounded-lg border p-3"
                    >
                        <option value="">
                            Select Lead
                        </option>

                        {leads.map((lead) => (
                            <option
                                key={lead._id}
                                value={lead._id}
                            >
                                {lead.name}
                            </option>
                        ))}
                    </select>

                    <input
                        placeholder="Assigned To"
                        value={form.assignedTo}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                assignedTo:
                                    e.target.value,
                            })
                        }
                        className="w-full rounded-lg border p-3"
                    />

                    <input
                        type="date"
                        value={form.dueDate}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                dueDate:
                                    e.target.value,
                            })
                        }
                        className="w-full rounded-lg border p-3"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <select
                            value={form.priority}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    priority:
                                        e.target
                                            .value as any,
                                })
                            }
                            className="rounded-lg border p-3"
                        >
                            <option value="low">
                                Low
                            </option>
                            <option value="medium">
                                Medium
                            </option>
                            <option value="high">
                                High
                            </option>
                        </select>

                        <select
                            value={form.status}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    status:
                                        e.target
                                            .value as any,
                                })
                            }
                            className="rounded-lg border p-3"
                        >
                            <option value="todo">
                                Todo
                            </option>
                            <option value="in_progress">
                                In Progress
                            </option>
                            <option value="completed">
                                Completed
                            </option>
                            <option value="cancelled">
                                Cancelled
                            </option>
                        </select>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSaving}
                    >
                        {isSaving
                            ? "Saving..."
                            : task
                                ? "Update Task"
                                : "Create Task"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}