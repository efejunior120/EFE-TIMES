"use client";

import { Task, TaskPriority, TaskStatus } from "@/types/task";

interface TaskBoardViewProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
}

export default function TaskBoardView({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskBoardViewProps) {
  const columns: {
    status: TaskStatus;
    title: string;
    badgeColor: string;
    accentBar: string;
  }[] = [
    {
      status: "to_do",
      title: "To Do",
      badgeColor: "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200",
      accentBar: "bg-slate-400",
    },
    {
      status: "in_progress",
      title: "In Progress",
      badgeColor: "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300",
      accentBar: "bg-amber-500",
    },
    {
      status: "completed",
      title: "Completed",
      badgeColor: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300",
      accentBar: "bg-emerald-500",
    },
  ];

  const getPriorityTag = (priority: TaskPriority) => {
    switch (priority) {
      case "urgent":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
            🚨 Urgent
          </span>
        );
      case "high":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
            🟡 High
          </span>
        );
      case "normal":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
            🔵 Normal
          </span>
        );
      case "low":
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            ⚪ Low
          </span>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
      {columns.map((column) => {
        const columnTasks = tasks.filter((t) => t.status === column.status);

        return (
          <div
            key={column.status}
            className="bg-slate-100/70 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-200/60 dark:border-slate-800"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${column.accentBar}`} />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {column.title}
                </h3>
              </div>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${column.badgeColor}`}>
                {columnTasks.length}
              </span>
            </div>

            {/* Cards List */}
            <div className="space-y-3 min-h-[140px]">
              {columnTasks.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                  No tasks in {column.title}
                </div>
              ) : (
                columnTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all group"
                  >
                    {/* Top row: Priority & Category */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      {getPriorityTag(task.priority)}
                      {task.category && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                          {task.category}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4
                      onClick={() => onEdit(task)}
                      className={`font-semibold text-sm cursor-pointer hover:text-violet-600 transition-colors break-words ${
                        task.completed ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {task.title}
                    </h4>

                    {/* Description */}
                    {task.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 break-words">
                        {task.description}
                      </p>
                    )}

                    {/* Footer: Due date & Action buttons */}
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        {task.due_date || "No date"}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {/* Quick Progress Button */}
                        {column.status === "to_do" && (
                          <button
                            type="button"
                            onClick={() => onStatusChange(task.id, "in_progress")}
                            className="text-[11px] font-medium text-amber-600 dark:text-amber-400 hover:underline"
                          >
                            Start &rarr;
                          </button>
                        )}
                        {column.status === "in_progress" && (
                          <button
                            type="button"
                            onClick={() => onStatusChange(task.id, "completed")}
                            className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            Complete ✓
                          </button>
                        )}
                        {column.status === "completed" && (
                          <button
                            type="button"
                            onClick={() => onStatusChange(task.id, "to_do")}
                            className="text-[11px] font-medium text-slate-500 hover:underline"
                          >
                            Reopen ↩
                          </button>
                        )}

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => onEdit(task)}
                          className="p-1 text-slate-400 hover:text-violet-600 transition-colors rounded"
                          title="Edit"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => onDelete(task.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors rounded"
                          title="Delete"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
