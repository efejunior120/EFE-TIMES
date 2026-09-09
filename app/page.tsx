"use client";

import { useState, useMemo } from "react";
import { Task, TaskPriority, TaskStatus } from "@/types/task";
import { initialTasks } from "@/data/mockTasks";
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";
import StatsOverview from "@/components/StatsOverview";
import TaskListView from "@/components/TaskListView";
import TaskBoardView from "@/components/TaskBoardView";
import TaskModal from "@/components/TaskModal";

export default function Home() {
  // State: all tasks in memory
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "board">("list");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // 1. CREATE or UPDATE task
  const handleSaveTask = (taskData: {
    id?: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    category?: string;
    due_date?: string;
  }) => {
    if (taskData.id) {
      // Update existing task
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskData.id
            ? {
                ...t,
                title: taskData.title,
                description: taskData.description,
                status: taskData.status,
                completed: taskData.status === "completed",
                priority: taskData.priority,
                category: taskData.category,
                due_date: taskData.due_date,
                updated_at: new Date().toISOString(),
              }
            : t
        )
      );
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        completed: taskData.status === "completed",
        priority: taskData.priority,
        category: taskData.category || "General",
        due_date: taskData.due_date,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
    }
  };

  // 2. DELETE task
  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // 3. TOGGLE COMPLETED
  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          return {
            ...t,
            completed: nextCompleted,
            status: nextCompleted ? "completed" : "to_do",
            updated_at: new Date().toISOString(),
          };
        }
        return t;
      })
    );
  };

  // 4. STATUS CHANGE
  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: newStatus,
              completed: newStatus === "completed",
              updated_at: new Date().toISOString(),
            }
          : t
      )
    );
  };

  // 5. OPEN EDIT MODAL
  const handleOpenEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  // 6. OPEN NEW TASK MODAL
  const handleOpenNewModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  // Filter and Search logic
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Search matching (title or category)
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.category && task.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Filter by active navigation tab
      if (activeFilter === "all") return true;
      if (activeFilter === "to_do") return task.status === "to_do";
      if (activeFilter === "in_progress") return task.status === "in_progress";
      if (activeFilter === "completed") return task.status === "completed";
      if (activeFilter === "urgent") return task.priority === "urgent";

      if (activeFilter.startsWith("category:")) {
        const categoryName = activeFilter.replace("category:", "");
        return task.category?.toLowerCase() === categoryName.toLowerCase();
      }

      return true;
    });
  }, [tasks, searchQuery, activeFilter]);

  // Counts for sidebar and stats
  const taskCounts = {
    all: tasks.length,
    to_do: tasks.filter((t) => t.status === "to_do").length,
    in_progress: tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
    urgent: tasks.filter((t) => t.priority === "urgent").length,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex">
      {/* Left Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        taskCounts={taskCounts}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <TopNavbar
          onOpenMobileMenu={() => setSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenNewTaskModal={handleOpenNewModal}
        />

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Welcome & Context Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
                EFE TIMES
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
                  Workspace
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Manage, prioritize, and complete your tasks with ClickUp-style agility.
              </p>
            </div>

            {/* Quick Action in Header on Mobile */}
            <div className="sm:hidden">
              <button
                onClick={handleOpenNewModal}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md shadow-violet-500/20"
              >
                + Create Task
              </button>
            </div>
          </div>

          {/* Stats & Progress Overview */}
          <StatsOverview
            total={taskCounts.all}
            toDo={taskCounts.to_do}
            inProgress={taskCounts.in_progress}
            completed={taskCounts.completed}
            urgent={taskCounts.urgent}
          />

          {/* Active View Container (List or Board) */}
          <div className="mt-6">
            {viewMode === "list" ? (
              <TaskListView
                tasks={filteredTasks}
                onToggleComplete={handleToggleComplete}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ) : (
              <TaskBoardView
                tasks={filteredTasks}
                onToggleComplete={handleToggleComplete}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500">
          EFE TIMES &bull; Productivity Suite &bull; ClickUp Inspired UI
        </footer>
      </div>

      {/* Create / Edit Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={taskToEdit}
        onSave={handleSaveTask}
      />
    </div>
  );
}
