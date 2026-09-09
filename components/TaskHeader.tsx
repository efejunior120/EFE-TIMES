interface TaskHeaderProps {
  totalTasks: number;
  incompleteTasks: number;
}

export default function TaskHeader({ totalTasks, incompleteTasks }: TaskHeaderProps) {
  const completedTasks = totalTasks - incompleteTasks;

  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            My Tasks
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Stay organized, focused, and productive.
          </p>
        </div>

        {/* Task Counter Badge */}
        <div className="flex items-center gap-2">
          {totalTasks === 0 ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              No tasks yet
            </span>
          ) : incompleteTasks === 0 ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              🎉 All {totalTasks} tasks completed!
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              <span className="w-2 h-2 mr-1.5 rounded-full bg-blue-600 animate-pulse" />
              {incompleteTasks} {incompleteTasks === 1 ? "task" : "tasks"} remaining
              <span className="ml-1.5 text-blue-600/70 dark:text-blue-400/70 font-normal">
                ({completedTasks}/{totalTasks} done)
              </span>
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
