"use client";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
  taskCounts: {
    all: number;
    to_do: number;
    in_progress: number;
    completed: number;
    urgent: number;
  };
}

export default function Sidebar({
  isOpen,
  onClose,
  activeFilter,
  onSelectFilter,
  taskCounts,
}: SidebarProps) {
  const navItems = [
    {
      id: "all",
      label: "All Tasks",
      count: taskCounts.all,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
    },
    {
      id: "to_do",
      label: "To Do",
      count: taskCounts.to_do,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" strokeWidth={2} />
        </svg>
      ),
    },
    {
      id: "in_progress",
      label: "In Progress",
      count: taskCounts.in_progress,
      icon: (
        <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: "completed",
      label: "Completed",
      count: taskCounts.completed,
      icon: (
        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: "urgent",
      label: "Urgent Priority",
      count: taskCounts.urgent,
      icon: (
        <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 3v18h2v-6h11l-1.5-4.5L17 6H6V3H4z" />
        </svg>
      ),
    },
  ];

  const spaces = ["Productivity", "Engineering", "Design", "Backend"];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-purple-500/25">
              E
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white block">
                EFE TIMES
              </span>
              <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
                Workspace
              </span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Main Views */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Overview
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeFilter === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectFilter(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                        isActive
                          ? "bg-violet-200/60 text-violet-800 dark:bg-violet-900/60 dark:text-violet-200"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Spaces / Categories */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Spaces & Projects
            </div>
            <nav className="space-y-1">
              {spaces.map((space) => {
                const spaceFilterId = `category:${space}`;
                const isActive = activeFilter === spaceFilterId;
                return (
                  <button
                    key={space}
                    onClick={() => {
                      onSelectFilter(spaceFilterId);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-violet-500" />
                    <span>{space}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer Badge */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800">
          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 p-3 rounded-xl border border-violet-100 dark:border-violet-900/40">
            <p className="text-xs font-semibold text-violet-900 dark:text-violet-300">
              ClickUp Inspired
            </p>
            <p className="text-[11px] text-violet-600 dark:text-violet-400 mt-0.5">
              EFE TIMES Project Workspace
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
