"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdArticle, MdSettings } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <MdDashboard /> },
  { label: "Posts", href: "/dashboard/posts", icon: <MdArticle /> },
  { label: "Users", href: "/dashboard/users", icon: <FaUsers /> },
  { label: "Settings", href: "/dashboard/settings", icon: <MdSettings /> },
];

 const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-slate-950 border-r border-white/10 text-white p-4">
      <h1 className="text-xl font-bold mb-6">DevDairy</h1>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                ${active ? "bg-cyan-500 text-black" : "hover:bg-white/10"}`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
export default Sidebar;