import React from "react";

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-slate-300 dark:bg-slate-800 rounded-lg" />
          <div className="h-4 w-96 bg-slate-200 dark:bg-slate-800/60 rounded-md" />
        </div>
        <div className="h-10 w-32 bg-slate-300 dark:bg-slate-800 rounded-xl" />
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-slate-300 dark:bg-slate-800 rounded-md" />
              <div className="h-10 w-10 bg-slate-300 dark:bg-slate-800 rounded-xl" />
            </div>
            <div className="h-8 w-20 bg-slate-300 dark:bg-slate-800 rounded-lg" />
            <div className="h-3 w-32 bg-slate-200 dark:bg-slate-800/60 rounded-md" />
          </div>
        ))}
      </div>

      {/* Content Area Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-96 bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="h-6 w-48 bg-slate-300 dark:bg-slate-800 rounded-md" />
          <div className="h-72 w-full bg-slate-300/60 dark:bg-slate-800/40 rounded-xl" />
        </div>
        <div className="h-96 bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="h-6 w-36 bg-slate-300 dark:bg-slate-800 rounded-md" />
          <div className="space-y-3 pt-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-14 w-full bg-slate-300/60 dark:bg-slate-800/40 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
