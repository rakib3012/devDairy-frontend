"use client";

import { useState } from "react";
import Sidebar from "@/Components/DashboardComponent/NavbarSidebar/Sidebar";
import Navbar from "@/Components/DashboardComponent/NavbarSidebar/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <Sidebar
        open={open}
        setOpen={setOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Overlay (mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-gray-60 backdrop-blur-xs z-30 md:hidden transition-opacity"
        />
      )}

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          collapsed ? "md:ml-16" : "md:ml-64"
        }`}
      >
        <Navbar
          setOpen={setOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 bg-slate-100 dark:bg-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
}