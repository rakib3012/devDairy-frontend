"use client";

import React, { useState } from "react";
import { Blog } from "@/lib/types/blogTypes";
import { Badge } from "@/Components/ui/badge";
import { CardContent } from "@/Components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";
import { Button } from "@/Components/ui/button";
import { FileEdit } from "lucide-react";
import { FiTrash2, FiEdit, FiFileText } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { useUpdateBlog, useDeleteBlog } from "@/lib/hooks/api/useBlogMutations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/Components/ui/dialog";

interface BlogTableProps {
  blogs: Blog[];
  totalBlogs: number;
  totalPages: number;
  page: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  openEditModal: (blog: Blog) => void;
}

export const BlogTable: React.FC<BlogTableProps> = ({
  blogs,
  totalPages,
  page,
  limit,
  setPage,
  openEditModal,
}) => {
  const updateBlog = useUpdateBlog();
  const deleteBlogMutation = useDeleteBlog();

  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string>("");

  const handleToggleStatus = async (blog: Blog) => {
    const newStatus = blog.status === "published" ? "draft" : "published";
    setUpdatingId(blog._id);
    try {
      await updateBlog.mutateAsync({
        id: blog._id,
        status: newStatus,
      });
    } catch (error) {
      console.error("Failed to update blog status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;
    setDeleteError("");
    try {
      await deleteBlogMutation.mutateAsync(blogToDelete._id);
      setBlogToDelete(null);
    } catch (error: unknown) {
      setDeleteError(
        error instanceof Error ? error.message : "Failed to delete post."
      );
    }
  };

  return (
    <>
      {/* TABLE CONTENT */}
      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-100/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
            <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
              <TableHead className="text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider py-4 px-6">
                SL
              </TableHead>
              <TableHead className="text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider py-4 px-6">
                Article Title & Summary
              </TableHead>
              <TableHead className="text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider py-4 px-6">
                Status
              </TableHead>
              <TableHead className="text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider py-4 px-6">
                Tags
              </TableHead>
              <TableHead className="text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider py-4 px-6">
                Author
              </TableHead>
              <TableHead className="text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider py-4 px-6">
                Created Date
              </TableHead>
              <TableHead className="text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider py-4 px-6 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-48 text-center text-slate-500 dark:text-slate-400 text-sm font-medium"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <FiFileText className="h-8 w-8 text-slate-400 opacity-60" />
                    <p>No articles found matching search or filters.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog, index) => (
                <TableRow
                  key={blog._id}
                  className="border-slate-200 dark:border-slate-800/80 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-all duration-200"
                >
                  <TableCell className="font-bold text-sm text-slate-900 dark:text-white py-4 px-6">
                    {(page - 1) * limit + index + 1}
                  </TableCell>
                  <TableCell className="py-4 px-6 max-w-md">
                    <div className="space-y-1">
                      <p className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                        {blog.title}
                      </p>
                      {blog.summary && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 font-medium">
                          {blog.summary}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <Badge
                      variant="outline"
                      className={
                        blog.status === "published"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full shadow-2xs"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full shadow-2xs"
                      }
                    >
                      {blog.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {blog.tags && blog.tags.length > 0 ? (
                        blog.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 px-2 py-0.5 text-[10px] font-semibold rounded-md"
                          >
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                      {blog.tags && blog.tags.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] px-1.5 py-0.5 rounded-md"
                        >
                          +{blog.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 text-sm font-medium py-4 px-6">
                    {blog.author?.name || "—"}
                  </TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400 text-xs font-medium py-4 px-6 whitespace-nowrap">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      {/* Edit Article Content */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(blog)}
                        className="h-8 px-2.5 border-slate-300 dark:border-slate-700 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 cursor-pointer text-xs font-semibold"
                        title="Edit Article Content"
                      >
                        <FiEdit className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </Button>

                      {/* Quick Status Toggle */}
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={updatingId === blog._id}
                        onClick={() => handleToggleStatus(blog)}
                        className="h-8 px-2 text-xs border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        title={
                          blog.status === "published"
                            ? "Change to Draft"
                            : "Publish Article"
                        }
                      >
                        {updatingId === blog._id ? (
                          <ImSpinner2 className="animate-spin h-3.5 w-3.5" />
                        ) : (
                          <FileEdit className="h-3.5 w-3.5" />
                        )}
                      </Button>

                      {/* Delete Article */}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setBlogToDelete(blog)}
                        className="h-8 px-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 font-bold cursor-pointer transition-colors"
                        title="Delete Article"
                      >
                        <FiTrash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* PAGINATION FOOTER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:px-6 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 rounded-b-2xl">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Showing page <span className="font-bold text-slate-900 dark:text-white">{page}</span> of{" "}
          <span className="font-bold text-slate-900 dark:text-white">{totalPages || 1}</span>
        </p>

        <Pagination className="justify-center sm:justify-end w-full sm:w-auto mx-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  if (page > 1) setPage((prev) => prev - 1);
                }}
                disabled={page <= 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1)
              .filter(
                (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
              )
              .map((p, idx, arr) => {
                const prevP = arr[idx - 1];
                const showEllipsis = prevP && p - prevP > 1;
                return (
                  <React.Fragment key={p}>
                    {showEllipsis && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        isActive={page === p}
                        onClick={(event) => {
                          event.preventDefault();
                          setPage(p);
                        }}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  </React.Fragment>
                );
              })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  if (page < totalPages) setPage((prev) => prev + 1);
                }}
                disabled={page >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      <Dialog open={!!blogToDelete} onOpenChange={() => setBlogToDelete(null)}>
        <DialogContent className="bg-slate-900/95 border-red-900/50 text-slate-100 sm:max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-red-400 flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <FiTrash2 className="h-5 w-5" />
              </div>
              Delete Article
            </DialogTitle>
            <DialogDescription className="text-slate-300 text-sm font-medium mt-2">
              Are you sure you want to delete{" "}
              <strong className="text-white underline">
                {blogToDelete?.title}
              </strong>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {deleteError && (
            <p className="text-sm text-red-400 bg-red-950/40 border border-red-500/30 p-3 rounded-xl font-medium mt-2">
              {deleteError}
            </p>
          )}

          <DialogFooter className="pt-6 flex gap-3">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setBlogToDelete(null)}
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              size="lg"
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteBlogMutation.isPending}
              className="bg-red-600 hover:bg-red-500 text-white font-extrabold text-base px-6 shadow-lg shadow-red-500/30 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {deleteBlogMutation.isPending ? (
                <ImSpinner2 className="animate-spin h-5 w-5 mr-2" />
              ) : (
                <FiTrash2 className="h-5 w-5 mr-2" />
              )}
              {deleteBlogMutation.isPending ? "Deleting..." : "Confirm Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
