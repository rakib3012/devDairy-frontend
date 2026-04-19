"use client";

import { useState } from "react";
import Header from "@/Components/DashboardComponent/DashboardHeader";
import Sidebar from "@/Components/DashboardComponent/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      
      {/* Sidebar (desktop + mobile controlled) */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Overlay (mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        <Header setOpen={setOpen} />

        <main className="p-4 md:p-6 pt-20 md:pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}