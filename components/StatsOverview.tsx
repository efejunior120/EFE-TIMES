interface StatsOverviewProps {
  total: number;
  toDo: number;
  inProgress: number;
  completed: number;
  urgent: number;
}

export default function StatsOverview({
  total,
  toDo,
  inProgress,
  completed,
  urgent,
}: StatsOverviewProps) {
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {/* Total Card */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Total Tasks
          </span>
          <span className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs">
            📊
          </span>
        </div>
        <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
          {total}
        </div>
        <div className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          {toDo} waiting to start
        </div>
      </div>

      {/* In Progress Card */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            In Progress
          </span>
          <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 text-xs">
            ⚡
          </span>
        </div>
        <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
          {inProgress}
        </div>
        <div className="mt-1 text-xs text-amber-600/80 dark:text-amber-400/80">
          Currently active
        </div>
      </div>

      {/* Completed Card & Progress Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Completed
          </span>
          <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs">
            ✓
          </span>
        </div>
        <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
          {completed}
        </div>
        <div className="mt-2">
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">
            {completionPercentage}% complete
          </span>
        </div>
      </div>

      {/* Urgent Attention Card */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            Urgent Priority
          </span>
          <span className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-xs">
            🚨
          </span>
        </div>
        <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
          {urgent}
        </div>
        <div className="mt-1 text-xs text-rose-600/80 dark:text-rose-400/80">
          Needs immediate action
        </div>
      </div>
    </div>
  );
}
