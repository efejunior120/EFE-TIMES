"use client";

import { useState } from "react";
import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDescription?: string) => void;
}

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || ""
  );

  const handleSave = () => {
    const trimmed = editTitle.trim();
    if (!trimmed) return;
    onEdit(task.id, trimmed, editDescription.trim() || undefined);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <li className="group bg-white dark:bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all">
      {isEditing ? (
        /* Edit Mode */
        <div className="flex flex-col gap-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Edit Task
          </label>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-3.5 py-2 text-sm sm:text-base rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <textarea
            rows={2}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Add description (optional)..."
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex items-center gap-2 justify-end pt-1">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!editTitle.trim()}
              className="px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        /* View Mode */
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Completion Checkbox */}
          <div className="pt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              id={`task-${task.id}`}
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="w-5 h-5 rounded-md border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
              aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
            />
          </div>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <label
              htmlFor={`task-${task.id}`}
              className={`block text-base font-medium cursor-pointer transition-colors break-words ${
                task.completed
                  ? "line-through text-slate-400 dark:text-slate-500"
                  : "text-slate-900 dark:text-white"
              }`}
            >
              {task.title}
            </label>

            {task.description && (
              <p
                className={`mt-1 text-xs sm:text-sm break-words ${
                  task.completed
                    ? "line-through text-slate-300 dark:text-slate-600"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {task.description}
              </p>
            )}

            <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500">
              <span>
                {new Date(task.created_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              {task.completed && (
                <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  ✓ Completed
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons (Edit & Delete) */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            {/* Edit Button */}
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors text-xs font-medium flex items-center gap-1"
              title="Edit Task"
              aria-label="Edit Task"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span className="hidden sm:inline">Edit</span>
            </button>

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors text-xs font-medium flex items-center gap-1"
              title="Delete Task"
              aria-label="Delete Task"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
