"use client";

import React, { useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard Segment Error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="max-w-md w-full bg-white dark:bg-slate-900 border-red-200 dark:border-red-900/40 shadow-2xl rounded-2xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-3">
            <FiAlertTriangle className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            Dashboard Error
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400 mt-1">
            An unexpected error occurred while loading this dashboard view.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-2 text-center">
          <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900/30 text-xs font-mono text-red-600 dark:text-red-300 break-words">
            {error.message || "Unknown runtime exception"}
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              onClick={() => reset()}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold gap-2 shadow-lg shadow-cyan-500/20"
            >
              <FiRefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
