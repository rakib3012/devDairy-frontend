"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdArticle, MdSettings } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <MdDashboard className="h-5 w-5" /> },
  { label: "Blogs", href: "/dashboard/blogs", icon: <MdArticle className="h-5 w-5" />, badge: "Manage" },
  { label: "Users", href: "/dashboard/users", icon: <FaUsers className="h-5 w-5" /> },
  { label: "Settings", href: "/dashboard/settings", icon: <MdSettings className="h-5 w-5" /> },
];

const Sidebar = ({
  open,
  setOpen,
  collapsed,
  setCollapsed,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
}) => {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white/95 dark:bg-slate-950/95 border-r border-slate-200 dark:border-slate-800/80 text-slate-900 dark:text-slate-100 p-3 flex flex-col justify-between transition-all duration-300 z-40 ${
        collapsed ? "w-16" : "w-64"
      } ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      aria-label="Sidebar navigation"
    >
      <div>
        {/* Header & Mobile Close */}
        <div className="flex items-center justify-between h-14 px-2 mb-4 border-b border-slate-200 dark:border-slate-800/60">
          <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
            <div
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="h-8 w-8 rounded-lg bg-[#3897ff] flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20 cursor-pointer hover:scale-105 transition"
            >
              D
            </div>
            {!collapsed && (
              <span className="font-extrabold text-lg tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-blue-600 dark:from-white dark:via-slate-200 dark:to-blue-400">
                DevDairy
              </span>
            )}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <IoClose className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation items */}
        <nav className="space-y-1.5" role="navigation">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <Button
                  variant={active ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-3 h-10 px-3 transition-all ${
                    active
                      ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-semibold border border-cyan-500/30 hover:bg-cyan-500/20 shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <span className={active ? "text-cyan-600 dark:text-cyan-400" : "text-slate-500 dark:text-slate-400"}>{item.icon}</span>
                  {!collapsed && (
                    <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <Badge variant="outline" className="text-[10px] bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 py-0 px-1.5 font-semibold">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      {!collapsed && (
        <div className="p-3 bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800/60 mb-2">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">DevDairy Admin v1.0</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Connected to Express API</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;