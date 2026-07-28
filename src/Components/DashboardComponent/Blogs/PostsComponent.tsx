"use client";

import React, { useState } from "react";
import { useGetBlogs } from "@/lib/hooks/api/useGetBlogs";
import { Blog } from "@/lib/types/blogTypes";
import { ImSpinner2 } from "react-icons/im";
import { motion } from "framer-motion";
import { FiPlus, FiSearch, FiFileText, FiCheckCircle, FiClock } from "react-icons/fi";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { BlogTable } from "./BlogTable";
import { BlogModal, BlogModalMode } from "./BlogModal";

const PostsComponent = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modalMode, setModalMode] = useState<BlogModalMode>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const { data, isLoading, isError, error } = useGetBlogs({
    page,
    limit,
    search,
    status: statusFilter,
  });

  const openCreateModal = () => {
    setSelectedBlog(null);
    setModalMode("create");
  };

  const openEditModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedBlog(null);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-80 space-y-4">
        <ImSpinner2 className="animate-spin text-cyan-500 dark:text-cyan-400 text-4xl" />
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Loading articles...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-300 rounded-2xl p-6">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400 text-lg">Error Loading Articles</CardTitle>
          <CardDescription className="text-red-500/80">{error.message}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const blogs = data?.data?.blogs || [];
  const pagination = data?.data?.pagination;
  const totalBlogs = pagination?.totalBlogs ?? data?.data?.total ?? blogs.length;
  const totalPages = pagination?.totalPages ?? (Math.ceil(totalBlogs / limit) || 1);

  const publishedCount = blogs.filter((b) => b.status === "published").length;
  const draftCount = blogs.filter((b) => b.status === "draft").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Top Banner / Stat Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-xl flex items-center gap-3.5 shadow-sm">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500">
            <FiFileText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Articles</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{totalBlogs}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-xl flex items-center gap-3.5 shadow-sm">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
            <FiCheckCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Published</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{publishedCount}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-xl flex items-center gap-3.5 shadow-sm">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
            <FiClock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Drafts</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{draftCount}</p>
          </div>
        </div>
      </div>

      <Card className="bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl text-slate-900 dark:text-slate-100 rounded-2xl transition-colors duration-300">
        {/* HEADER SECTION */}
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 p-6 sm:p-8">
          <div>
            <CardTitle className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Article Management
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 font-medium">
              Create, edit, publish, and delete blog articles across your platform.
            </CardDescription>
          </div>

          {/* Search Input & Action Button */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search by title..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 pl-10 h-10 text-sm focus-visible:ring-cyan-500/50 rounded-xl"
              />
            </div>

            <Button
              size="lg"
              onClick={openCreateModal}
              className="bg-[#3897ff] hover:bg-[#2887ef] text-white font-extrabold shadow-md shadow-blue-500/25 rounded-2xl gap-2 px-5 text-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer border-none"
            >
              <FiPlus className="h-5 w-5" />
              Create Article
            </Button>
          </div>
        </CardHeader>

        {/* TOOLBAR CONTROLS (ABOVE TABLE) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
          <div>
            <Badge
              variant="outline"
              className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 px-3.5 py-1.5 text-xs font-semibold rounded-lg"
            >
              {totalBlogs} Total Posts Found
            </Badge>
          </div>

          {/* Controls: Status Filter + Rows Per Page */}
          <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-4">
            {/* Filter by Status */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                Status:
              </span>
              <Select
                value={statusFilter}
                onValueChange={(val) => {
                  setStatusFilter(val);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-36 bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 h-10 text-sm rounded-xl">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rows per page dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                Rows per page:
              </span>
              <Select
                value={limit.toString()}
                onValueChange={(val) => {
                  setLimit(Number(val));
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-20 bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 h-10 text-sm rounded-xl font-medium">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* SEPARATE BLOG TABLE & PAGINATION COMPONENT */}
        <BlogTable
          blogs={blogs}
          totalBlogs={totalBlogs}
          totalPages={totalPages}
          page={page}
          limit={limit}
          setPage={setPage}
          openEditModal={openEditModal}
        />
      </Card>

      {/* UNIFIED CREATE & EDIT BLOG MODAL */}
      <BlogModal
        mode={modalMode}
        selectedBlog={selectedBlog}
        closeModal={closeModal}
      />
    </motion.div>
  );
};

export default PostsComponent;
