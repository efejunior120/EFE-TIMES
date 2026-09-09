export type TaskStatus = "to_do" | "in_progress" | "completed";
export type TaskPriority = "low" | "normal" | "high" | "urgent";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  status: TaskStatus;
  priority: TaskPriority;
  category?: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}
