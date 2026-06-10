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
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiUser,
  FiMail,
  FiLock,
  FiShield,
} from "react-icons/fi";

// ─── Types ─────────────────────────────────────────────────────────────────────
type ModalMode = "create" | "edit" | "delete" | null;

interface FormState {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

const defaultForm: FormState = {
  name: "",
  email: "",
  password: "",
  role: "user",
};

// ─── Overlay Modal ──────────────────────────────────────────────────────────────
const Modal = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
        {/* Panel */}
        <motion.div
          className="relative z-10 w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Input Field ────────────────────────────────────────────────────────────────
const Field = ({
  label,
  icon: Icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: React.ElementType;
}) => (
  <div>
    <label className="text-xs text-gray-400 font-medium mb-1 block">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
      <input
        {...props}
        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
      />
    </div>
  </div>
);

// ─── Main Component ─────────────────────────────────────────────────────────────
const UsersComponent = () => {
  const { data, isLoading, isError, error } = useGetUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

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
    setForm({ name: user.name, email: user.email, password: "", role: user.role as "user" | "admin" });
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
    ...(form.password && { password: form.password })
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

  const isMutating = createUser.isPending || updateUser.isPending || deleteUser.isPending;

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ImSpinner2 className="animate-spin text-cyan-500 text-4xl" />
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-xl text-red-500 shadow-lg">
        <h3 className="font-bold text-lg mb-2">Access Denied or Error</h3>
        <p>{error.message}</p>
        <p className="text-sm mt-2 opacity-80">
          Note: This endpoint is restricted to admins only.
        </p>
      </div>
    );
  }

  const users = data?.data?.users || [];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">All Users</h2>
            <p className="text-sm text-gray-400 mt-1">Manage user accounts and roles.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 px-4 py-2 rounded-lg text-sm text-gray-300 font-medium">
              Total: {users.length}
            </div>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm px-4 py-2 rounded-xl transition"
            >
              <FiPlus size={16} />
              Add User
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/5 text-gray-300 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-white/5 transition group">
                    <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                            : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => openEdit(user)}
                          title="Edit user"
                          className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/25 text-blue-400 transition"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          onClick={() => openDelete(user)}
                          title="Delete user"
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 transition"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ── CREATE MODAL ──────────────────────────────────────────────────────── */}
      <Modal open={mode === "create"} onClose={closeModal}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-white">Create New User</h3>
          <button onClick={closeModal} className="text-gray-400 hover:text-white">
            <FiX size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <Field label="Full Name" icon={FiUser} placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Field label="Email" icon={FiMail} type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Field label="Password" icon={FiLock} type="password" placeholder="Min. 6 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <div>
            <label className="text-xs text-gray-400 font-medium mb-1 block">Role</label>
            <div className="relative">
              <FiShield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as "user" | "admin" })}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition appearance-none"
              >
                <option value="user" className="bg-slate-800">user</option>
                <option value="admin" className="bg-slate-800">admin</option>
              </select>
            </div>
          </div>
          {formError && <p className="text-red-400 text-xs">{formError}</p>}
          <button
            onClick={handleCreate}
            disabled={isMutating}
            className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition mt-2"
          >
            {isMutating ? <ImSpinner2 className="animate-spin" size={16} /> : <FiPlus size={16} />}
            {isMutating ? "Creating..." : "Create User"}
          </button>
        </div>
      </Modal>

      {/* ── EDIT MODAL ────────────────────────────────────────────────────────── */}
      <Modal open={mode === "edit"} onClose={closeModal}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-white">Edit User</h3>
          <button onClick={closeModal} className="text-gray-400 hover:text-white">
            <FiX size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <Field label="Full Name" icon={FiUser} placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Field label="Email" icon={FiMail} type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Field label="New Password (leave blank to keep current)" icon={FiLock} type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <div>
            <label className="text-xs text-gray-400 font-medium mb-1 block">Role</label>
            <div className="relative">
              <FiShield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as "user" | "admin" })}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition appearance-none"
              >
                <option value="user" className="bg-slate-800">user</option>
                <option value="admin" className="bg-slate-800">admin</option>
              </select>
            </div>
          </div>
          {formError && <p className="text-red-400 text-xs">{formError}</p>}
          <button
            onClick={handleUpdate}
            disabled={isMutating}
            className="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition mt-2"
          >
            {isMutating ? <ImSpinner2 className="animate-spin" size={16} /> : <FiEdit2 size={16} />}
            {isMutating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </Modal>

      {/* ── DELETE MODAL ──────────────────────────────────────────────────────── */}
      <Modal open={mode === "delete"} onClose={closeModal}>
        <div className="text-center">
          <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiTrash2 className="text-red-400" size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Delete User</h3>
          <p className="text-gray-400 text-sm mb-6">
            Are you sure you want to delete{" "}
            <span className="text-white font-semibold">{selectedUser?.name}</span>? This
            action cannot be undone.
          </p>
          {formError && <p className="text-red-400 text-xs mb-4">{formError}</p>}
          <div className="flex gap-3">
            <button
              onClick={closeModal}
              className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isMutating}
              className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition"
            >
              {isMutating ? <ImSpinner2 className="animate-spin" size={16} /> : <FiTrash2 size={16} />}
              {isMutating ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UsersComponent;
