"use client";

import React, { useState } from "react";
import { useGetUsers, User } from "@/lib/hooks/api/useGetUsers";
import {
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  CreateUserPayload,
  UpdateUserPayload,
} from "@/lib/hooks/api/useUserMutations";
import { ImSpinner2 } from "react-icons/im";
import { motion } from "framer-motion";
import { FiPlus, FiSearch } from "react-icons/fi";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { UserTable } from "./UserTable";
import { UserModals, ModalMode, FormState } from "./UserModals";

const defaultForm: FormState = {
  name: "",
  email: "",
  password: "",
  role: "user",
};

const UsersComponent = () => {
  const { data, isLoading, isError, error } = useGetUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [mode, setMode] = useState<ModalMode>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [formError, setFormError] = useState("");

  const openCreate = () => {
    setForm(defaultForm);
    setFormError("");
    setSelectedUser(null);
    setMode("create");
  };

  const openEdit = (user: User) => {
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: (user.role as "user" | "admin") || "user",
    });
    setFormError("");
    setSelectedUser(user);
    setMode("edit");
  };

  const openDelete = (user: User) => {
    setSelectedUser(user);
    setMode("delete");
  };

  const closeModal = () => {
    setMode(null);
    setSelectedUser(null);
    setFormError("");
  };

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.password) {
      setFormError("Name, email and password are required.");
      return;
    }
    try {
      await createUser.mutateAsync(form as CreateUserPayload);
      closeModal();
    } catch (e: unknown) {
      setFormError(e instanceof Error ? e.message : "Failed to create user.");
    }
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    const payload: UpdateUserPayload = {
      id: selectedUser._id,
      ...(form.name && { name: form.name }),
      ...(form.email && { email: form.email }),
      ...(form.role && { role: form.role }),
      ...(form.password && { password: form.password }),
    };

    try {
      await updateUser.mutateAsync(payload);
      closeModal();
    } catch (e: unknown) {
      setFormError(e instanceof Error ? e.message : "Failed to update user.");
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser.mutateAsync(selectedUser._id);
      closeModal();
    } catch (e: unknown) {
      setFormError(e instanceof Error ? e.message : "Failed to delete user.");
    }
  };

  const isMutating =
    createUser.isPending || updateUser.isPending || deleteUser.isPending;

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-80 space-y-4">
        <ImSpinner2 className="animate-spin text-cyan-400 text-4xl" />
        <p className="text-slate-400 text-sm font-medium">Loading users list...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="bg-red-950/20 border-red-500/30 text-red-300">
        <CardHeader>
          <CardTitle className="text-red-400 text-lg">Access Denied or Error</CardTitle>
          <CardDescription className="text-red-300/80">{error.message}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const allUsers = data?.data?.users || [];

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / limit) || 1;
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl text-slate-900 dark:text-slate-100 rounded-2xl transition-colors duration-300">
        {/* HEADER SECTION */}
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 p-6 sm:p-8">
          <div>
            <CardTitle className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              User Administration
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400 text-base mt-1.5 font-medium">
              Manage team accounts, permissions, and roles.
            </CardDescription>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 pl-10 h-10 text-sm focus-visible:ring-cyan-500/50 rounded-xl"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="lg"
              onClick={openCreate}
              className="bg-[#3897ff] hover:bg-[#2887ef] text-white font-extrabold shadow-md shadow-blue-500/25 rounded-2xl gap-2 px-5 text-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer border-none"
            >
              <FiPlus className="h-5 w-5" />
              Add User
            </Button>
          </div>
        </CardHeader>

        {/* TOOLBAR CONTROLS (ABOVE TABLE) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
          <div>
            <span className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 px-3.5 py-1.5 text-xs font-semibold rounded-lg">
              Total: {totalUsers} Users
            </span>
          </div>

          {/* Controls: Role Filter + Rows Per Page */}
          <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-4">
            {/* Filter by Role */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                Role:
              </span>
              <Select
                value={roleFilter}
                onValueChange={(val) => {
                  setRoleFilter(val);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-32 bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 h-10 text-sm rounded-xl">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
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

        {/* USER TABLE COMPONENT */}
        <UserTable
          users={paginatedUsers}
          totalUsers={totalUsers}
          totalPages={totalPages}
          page={page}
          limit={limit}
          setPage={setPage}
          openEdit={openEdit}
          openDelete={openDelete}
        />
      </Card>

      {/* USER MODALS COMPONENT */}
      <UserModals
        mode={mode}
        selectedUser={selectedUser}
        form={form}
        setForm={setForm}
        formError={formError}
        closeModal={closeModal}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        isMutating={isMutating}
      />
    </motion.div>
  );
};

export default UsersComponent;
