"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon-sm" className="w-9 h-9 rounded-xl border-slate-700/60 opacity-0">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          className="w-9 h-9 rounded-xl border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 transition-all duration-200"
          title="Toggle color theme"
        >
          {theme === "dark" ? (
            <FiMoon className="h-4 w-4 text-cyan-400 transition-all" />
          ) : theme === "light" ? (
            <FiSun className="h-4 w-4 text-amber-400 transition-all" />
          ) : (
            <FiMonitor className="h-4 w-4 text-cyan-400 transition-all" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-900/95 border-slate-800 text-slate-100 min-w-36 rounded-xl shadow-xl">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`flex items-center gap-2 px-3 py-2 cursor-pointer font-medium text-sm rounded-lg ${
            theme === "light" ? "bg-cyan-500/20 text-cyan-300 font-bold" : "hover:bg-slate-800"
          }`}
        >
          <FiSun className="h-4 w-4 text-amber-400" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-2 px-3 py-2 cursor-pointer font-medium text-sm rounded-lg ${
            theme === "dark" ? "bg-cyan-500/20 text-cyan-300 font-bold" : "hover:bg-slate-800"
          }`}
        >
          <FiMoon className="h-4 w-4 text-cyan-400" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`flex items-center gap-2 px-3 py-2 cursor-pointer font-medium text-sm rounded-lg ${
            theme === "system" ? "bg-cyan-500/20 text-cyan-300 font-bold" : "hover:bg-slate-800"
          }`}
        >
          <FiMonitor className="h-4 w-4 text-slate-400" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
