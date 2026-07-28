"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AiOutlineBell, AiOutlineMenu,  } from "react-icons/ai";
import { FiLogOut, FiUser, FiSettings } from "react-icons/fi";
import { Button } from "@/Components/ui/button";
// import { Input } from "@/Components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ThemeToggle } from "@/Components/ThemeToggle/ThemeToggle";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useGetProfile } from "@/lib/hooks/api/useProfile";

interface HeaderProps {
  setOpen: (open: boolean) => void;
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
}

const Navbar: React.FC<HeaderProps> = ({ setOpen, collapsed, setCollapsed }) => {
  const router = useRouter();
  const { data: userProfile } = useGetProfile();

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/app";
  const backendOrigin =
    process.env.NEXT_PUBLIC_BACKEND_URL || apiBase.replace(/\/app\/?$/, "");

  const avatarSrc = userProfile?.image
    ? userProfile.image.startsWith("http")
      ? userProfile.image
      : `${backendOrigin}${userProfile.image.startsWith("/") ? "" : "/"}${userProfile.image}`
    : "";

  const userName = userProfile?.name || "User";
  const userEmail = userProfile?.email || "";
  const userInitials =
    userName
      .split(" ")
      .map((p: string) => p[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "US";

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    router.push("/login");
  };

  return (
    <header className="h-16 w-full flex items-center justify-between px-4 md:px-6 bg-gray-100 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Left section: mobile drawer toggle & collapse button */}
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <AiOutlineMenu className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}

        </Button>

        {/* Global Search Bar */}
        <div className="relative hidden sm:block w-64 md:w-80">
          <Button
            onClick={() => router.push("/home")}
            variant="ghost"
            size="icon"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Home"
          >
            <Home className="h-5 w-5 mr-2" />
            Home
          </Button>
        </div>
      </div>

      {/* Right section: theme toggle, notifications & profile menu */}
      <div className="flex items-center gap-2.5">
        <ThemeToggle />

        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
        >
          <AiOutlineBell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-cyan-500 rounded-full ring-2 ring-white dark:ring-slate-950 animate-pulse" />
        </Button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 ring-2 ring-cyan-500/30 hover:ring-cyan-500 transition">
              <Avatar className="h-9 w-9">
                <AvatarImage src={avatarSrc} alt={userName} />
                <AvatarFallback className="bg-cyan-600 text-white font-bold text-xs">{userInitials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 shadow-xl rounded-xl" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none text-slate-900 dark:text-white">{userName}</p>
                <p className="text-xs leading-none text-slate-500 dark:text-slate-400">{userEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />
            <DropdownMenuItem onClick={() => router.push("/dashboard/settings")} className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800">
              <FiUser className="mr-2 h-4 w-4 text-cyan-500" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/dashboard/settings")} className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800">
              <FiSettings className="mr-2 h-4 w-4 text-cyan-500" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 dark:text-red-400 hover:bg-red-500/10 focus:bg-red-500/10">
              <FiLogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;