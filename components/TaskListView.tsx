"use client";

import { Task, TaskPriority, TaskStatus } from "@/types/task";

interface TaskListViewProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
}

export default function TaskListView({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskListViewProps) {
  const statusGroups: {
    status: TaskStatus;
    title: string;
    badgeClass: string;
    borderClass: string;
  }[] = [
    {
      status: "to_do",
      title: "TO DO",
      badgeClass: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      borderClass: "border-slate-300 dark:border-slate-700",
    },
    {
      status: "in_progress",
      title: "IN PROGRESS",
      badgeClass: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
      borderClass: "border-amber-400 dark:border-amber-600",
    },
    {
      status: "completed",
      title: "COMPLETED",
      badgeClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
      borderClass: "border-emerald-400 dark:border-emerald-600",
    },
  ];

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case "urgent":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60">
            <svg className="w-3 h-3 fill-rose-600" viewBox="0 0 24 24">
              <path d="M4 3v18h2v-6h11l-1.5-4.5L17 6H6V3H4z" />
            </svg>
            Urgent
          </span>
        );
      case "high":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60">
            <svg className="w-3 h-3 fill-amber-500" viewBox="0 0 24 24">
              <path d="M4 3v18h2v-6h11l-1.5-4.5L17 6H6V3H4z" />
            </svg>
            High
          </span>
        );
      case "normal":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
            <svg className="w-3 h-3 fill-blue-500" viewBox="0 0 24 24">
              <path d="M4 3v18h2v-6h11l-1.5-4.5L17 6H6V3H4z" />
            </svg>
            Normal
          </span>
        );
      case "low":
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            <svg className="w-3 h-3 fill-slate-400" viewBox="0 0 24 24">
              <path d="M4 3v18h2v-6h11l-1.5-4.5L17 6H6V3H4z" />
            </svg>
            Low
          </span>
        );
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-violet-100 dark:bg-violet-950/50 flex items-center justify-center text-violet-600 dark:text-violet-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-slate-800 dark:text-white">No tasks found</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          Try clearing your search or click "+ New Task" above to add one.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {statusGroups.map((group) => {
        const groupTasks = tasks.filter((t) => t.status === group.status);
        if (groupTasks.length === 0) return null;

        return (
          <div key={group.status} className="space-y-2">
            {/* Status Group Header */}
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-md tracking-wider ${group.badgeClass}`}>
                {group.title}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                {groupTasks.length} {groupTasks.length === 1 ? "task" : "tasks"}
              </span>
            </div>

            {/* Tasks in this group */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
              {groupTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 sm:p-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  {/* Left: Checkbox + Title + Description */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => onToggleComplete(task.id)}
                      className="mt-0.5 w-5 h-5 rounded-md border border-slate-300 dark:border-slate-600 flex items-center justify-center hover:border-violet-500 transition-colors shrink-0"
                      aria-label="Toggle completed"
                    >
                      {task.completed && (
                        <div className="w-3.5 h-3.5 rounded bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">
                          ✓
                        </div>
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          onClick={() => onEdit(task)}
                          className={`font-semibold text-sm cursor-pointer hover:text-violet-600 transition-colors break-words ${
                            task.completed
                              ? "line-through text-slate-400 dark:text-slate-500"
                              : "text-slate-900 dark:text-white"
                          }`}
                        >
                          {task.title}
                        </span>

                        {task.category && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {task.category}
                          </span>
                        )}
                      </div>

                      {task.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 break-words line-clamp-2">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Status Dropdown + Priority Badge + Due Date + Actions */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-end sm:self-center pl-8 sm:pl-0">
                    {/* Status Pill / Switcher */}
                    <select
                      value={task.status}
                      onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
                      className="text-[11px] font-medium py-1 px-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500 cursor-pointer"
                    >
                      <option value="to_do">⚪ To Do</option>
                      <option value="in_progress">🟡 In Progress</option>
                      <option value="completed">🟢 Done</option>
                    </select>

                    {/* Priority Badge */}
                    {getPriorityBadge(task.priority)}

                    {/* Due Date */}
                    {task.due_date && (
                      <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {task.due_date}
                      </span>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1">
                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEdit(task)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit task"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDelete(task.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete task"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
