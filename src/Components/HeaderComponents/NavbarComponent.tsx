"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Home, BookOpen, Info, LayoutDashboard, LogOut, LogIn } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { ThemeToggle } from "@/Components/ThemeToggle/ThemeToggle";

const NavbarComponent = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    setIsLoggedIn(false);
    window.location.href = "/home";
  };

  const baseNavItems = [
    { name: "Home", link: "/home", icon: Home },
    { name: "Blogs", link: "/blogs", icon: BookOpen },
    { name: "About", link: "/about", icon: Info },
  ];

  const navItems = isLoggedIn
    ? [...baseNavItems, { name: "Dashboard", link: "/dashboard", icon: LayoutDashboard }]
    : baseNavItems;

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3.5">
        <Link href="/home" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-[#3897ff] flex items-center justify-center font-black text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition duration-300">
            D
          </div>
          <span className="text-xl font-black tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-blue-600 dark:from-white dark:via-slate-200 dark:to-blue-400">
            DevDairy
          </span>
        </Link>

        <ul className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const active = pathname === item.link;
            const IconComponent = item.icon;
            return (
              <li key={item.link}>
                <Link href={item.link}>
                  <Button
                    variant="ghost"
                    className={`text-sm font-semibold transition flex items-center gap-2 ${
                      active
                        ? "text-blue-600 dark:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          {isLoggedIn ? (
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white font-semibold transition-colors cursor-pointer flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button className="bg-[#3897ff] hover:bg-[#2887ef] text-white font-extrabold shadow-md shadow-blue-500/25 rounded-xl cursor-pointer flex items-center gap-2 transition-all hover:scale-[1.02] border-none">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavbarComponent;