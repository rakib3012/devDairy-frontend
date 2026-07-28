"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiUsers,
  FiEye,
  FiTrendingUp,
  // FiPlus,
  FiSettings,
  FiArrowUpRight,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { useGetBlogs } from "@/lib/hooks/api/useGetBlogs";
import { useGetUsers } from "@/lib/hooks/api/useGetUsers";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";

export default function DashboardComponent() {
  const { data: blogsData, isLoading: isBlogsLoading } = useGetBlogs({ page: 1, limit: 5 });
  const { data: usersData, isLoading: isUsersLoading } = useGetUsers();

  const blogs = blogsData?.data?.blogs || [];
  const totalBlogs = blogsData?.data?.pagination?.totalBlogs ?? blogsData?.data?.blogs?.length ?? 0;
  const recentBlogs = blogsData?.data?.blogs || [];
  
  const totalUsers = usersData?.data?.users?.length ?? 0;
  const adminCount = usersData?.data?.users?.filter((user) => user.role === "admin")?.length ?? 0;

  const publishedCount = blogs.filter((blog) => blog.status === "published").length;
  const draftCount = recentBlogs.filter((blog) => blog.status === "draft").length;

  const kpiCards = [
    {
      title: "Total Articles",
      value: isBlogsLoading ? "..." : totalBlogs,
      change: "+12% this month",
      icon: <FiFileText className="h-6 w-6 text-cyan-500" />,
      badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    },
    {
      title: "Registered Users",
      value: isUsersLoading ? "..." : totalUsers,
      change: `${adminCount} Admins`,
      icon: <FiUsers className="h-6 w-6 text-blue-500" />,
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    },
    {
      title: "Published Posts",
      value: isBlogsLoading ? "..." : publishedCount,
      change: `${draftCount} Pending Drafts`,
      icon: <FiCheckCircle className="h-6 w-6 text-emerald-500" />,
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    },
    {
      title: "Total Views",
      value: "24.5k",
      change: "+18.4% vs last week",
      icon: <FiEye className="h-6 w-6 text-indigo-500" />,
      badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 text-white shadow-2xl border border-slate-800/80 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30">
              Overview
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-300">
            Welcome to DevDairy Control Center
          </h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Monitor real-time system performance, manage user roles, and publish high-quality technical articles.
          </p>
        </div>

        {/* <div className="flex items-center gap-3 relative z-10">
          <Link href="/dashboard/blogs">
            <Button
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-500/25 gap-2 px-5 text-sm transition-all hover:scale-105"
            >
              <FiPlus className="h-5 w-5" />
              Create Article
            </Button>
          </Link>
        </div> */}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpiCards.map((card, index) => (
          <Card
            key={index}
            className="bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {card.title}
                </span>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {card.value}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className={`text-[11px] font-medium py-0.5 px-2 rounded-md ${card.badgeColor}`}>
                    <FiTrendingUp className="inline mr-1 h-3 w-3" />
                    {card.change}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid: Recent Activity & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Articles Stream */}
        <Card className="lg:col-span-2 bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200 dark:border-slate-800/80 px-6 py-5">
            <div>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                Recent Articles
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400 text-xs">
                Latest publications and content updates across your platform.
              </CardDescription>
            </div>
            <Link href="/dashboard/blogs">
              <Button variant="ghost" size="sm" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-semibold gap-1 text-xs">
                View All <FiArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>

          <CardContent className="p-6">
            {isBlogsLoading ? (
              <div className="space-y-4 py-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800/60 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : recentBlogs.length === 0 ? (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <FiFileText className="mx-auto h-10 w-10 text-slate-400 mb-2 opacity-50" />
                <p className="text-sm font-medium">No recent articles found.</p>
                <Link href="/dashboard/blogs" className="mt-3 inline-block">
                  <Button size="sm" variant="outline">Create your first article</Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {recentBlogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 p-3 rounded-xl transition-colors"
                  >
                    <div className="space-y-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                        {blog.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <FiClock className="h-3 w-3" />
                          {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Recently"}
                        </span>
                        {blog.tags && blog.tags.length > 0 && (
                          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-medium text-[10px]">
                            {blog.tags[0]}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold ${
                          blog.status === "published"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                        }`}
                      >
                        {blog.status || "published"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column: Quick Action Shortcuts & System Health */}
        <div className="space-y-6">
          <Card className="bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl rounded-2xl">
            <CardHeader className="px-6 py-5 border-b border-slate-200 dark:border-slate-800/80">
              <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">
                Quick Shortcuts
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400 text-xs">
                Direct access to core administration modules.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 space-y-3">
              <Link href="/dashboard/blogs" className="block">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-500 group-hover:scale-110 transition-transform">
                      <FiFileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Blog Manager</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Edit and publish posts</p>
                    </div>
                  </div>
                  <FiArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-cyan-500 transition-colors" />
                </div>
              </Link>

              <Link href="/dashboard/users" className="block">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                      <FiUsers className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">User Administration</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Manage user roles & team</p>
                    </div>
                  </div>
                  <FiArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </Link>

              <Link href="/dashboard/settings" className="block">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
                      <FiSettings className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">System Settings</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Platform preferences</p>
                    </div>
                  </div>
                  <FiArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
