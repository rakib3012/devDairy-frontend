"use client";

import React from "react";
import { User } from "@/lib/hooks/api/useGetUsers";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
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
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface UserTableProps {
  users: User[];
  totalUsers: number;
  totalPages: number;
  page: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  openEdit: (user: User) => void;
  openDelete: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  totalPages,
  page,
  limit,
  setPage,
  openEdit,
  openDelete,
}) => {
  return (
    <>
      {/* TABLE CONTENT */}
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-slate-100/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
            <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
              <TableHead className="text-slate-700 dark:text-slate-200 font-bold text-sm uppercase tracking-wider py-4 px-6">
                SL
              </TableHead>
              <TableHead className="text-slate-700 dark:text-slate-200 font-bold text-sm uppercase tracking-wider py-4 px-6">
                User
              </TableHead>
              <TableHead className="text-slate-700 dark:text-slate-200 font-bold text-sm uppercase tracking-wider py-4 px-6">
                Email
              </TableHead>
              <TableHead className="text-slate-700 dark:text-slate-200 font-bold text-sm uppercase tracking-wider py-4 px-6">
                Role
              </TableHead>
              <TableHead className="text-slate-700 dark:text-slate-200 font-bold text-sm uppercase tracking-wider py-4 px-6">
                Joined Date
              </TableHead>
              <TableHead className="text-slate-700 dark:text-slate-200 font-bold text-sm uppercase tracking-wider py-4 px-6 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-40 text-center text-slate-500 dark:text-slate-400 text-base font-medium"
                >
                  No users found matching search/filter.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user, index) => (
                <TableRow
                  key={user._id}
                  className="border-slate-200 dark:border-slate-800/80 hover:bg-slate-100/60 dark:hover:bg-slate-800/50 transition-all duration-200"
                >
                  <TableCell className="font-bold text-base text-slate-900 dark:text-white py-4 px-6">
                    {(page - 1) * limit + index + 1}
                  </TableCell>
                  <TableCell className="font-semibold text-base text-slate-900 dark:text-white py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 bg-cyan-100 dark:bg-cyan-950 border border-cyan-500/40 shadow-xs">
                        <AvatarFallback className="text-cyan-600 dark:text-cyan-400 font-bold text-xs">
                          {user.name?.slice(0, 2).toUpperCase() || "US"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-bold text-base text-slate-900 dark:text-white">
                        {user.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-800 dark:text-slate-200 text-base font-medium py-4 px-6">
                    {user.email}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <Badge
                      variant="outline"
                      className={
                        user.role === "admin"
                          ? "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/40 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-xs"
                          : user.role === "writer"
                            ? "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/40 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-xs"
                            : "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/40 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-xs"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400 text-sm font-medium py-4 px-6">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(user)}
                        title="Edit user"
                        className="h-9 w-9 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-200 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 rounded-xl transition-all duration-200 cursor-pointer"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDelete(user)}
                        title="Delete user"
                        className="h-9 w-9 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-200 hover:bg-red-500/10 dark:hover:bg-red-500/20 rounded-xl transition-all duration-200 cursor-pointer"
                      >
                        <FiTrash2 className="h-4 w-4" />
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
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 sm:px-6 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 rounded-b-2xl">
        
        {/* Navigation controls */}
        <Pagination className="justify-center sm:justify-end w-full sm:w-auto mx-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage((prev) => prev - 1);
                }}
                disabled={page <= 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
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
                        onClick={(e) => {
                          e.preventDefault();
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
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages) setPage((prev) => prev + 1);
                }}
                disabled={page >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};
