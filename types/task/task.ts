export interface Task {
  _id: string;
  title: string;
  description?: string;

  leadId?:
    | string
    | {
        _id: string;
        name: string;
      };

  assignedTo: string;

  priority:
    | "low"
    | "medium"
    | "high";

  status:
    | "todo"
    | "in_progress"
    | "completed"
    | "cancelled";

  dueDate: string;
}