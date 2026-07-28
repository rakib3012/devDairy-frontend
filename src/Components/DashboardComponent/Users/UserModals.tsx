"use client";

import React from "react";
import { User } from "@/lib/hooks/api/useGetUsers";
import { ImSpinner2 } from "react-icons/im";
import { FiPlus, FiEdit2, FiTrash2, FiUser, FiMail, FiLock, FiShield } from "react-icons/fi";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/Components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

export type ModalMode = "create" | "edit" | "delete" | null;

export interface FormState {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "writer";
}

interface UserModalsProps {
  mode: ModalMode;
  selectedUser: User | null;
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  formError: string;
  closeModal: () => void;
  handleCreate: () => void;
  handleUpdate: () => void;
  handleDelete: () => void;
  isMutating: boolean;
}

export const UserModals: React.FC<UserModalsProps> = ({
  mode,
  selectedUser,
  form,
  setForm,
  formError,
  closeModal,
  handleCreate,
  handleUpdate,
  handleDelete,
  isMutating,
}) => {
  return (
    <>
      {/* CREATE USER DIALOG */}
      <Dialog open={mode === "create"} onOpenChange={closeModal}>
        <DialogContent className="bg-slate-900/95 border-slate-800 text-slate-100 sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-white flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <FiUser className="h-5 w-5" />
              </div>
              Add New User
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-sm font-medium">
              Create a new user account with assigned role permissions.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <FiUser className="text-cyan-400 h-4 w-4" /> Full Name *
              </Label>
              <Input
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-slate-950/80 border-slate-700/80 text-slate-100 text-base h-11 focus-visible:ring-cyan-500/50 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <FiMail className="text-cyan-400 h-4 w-4" /> Email *
              </Label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-slate-950/80 border-slate-700/80 text-slate-100 text-base h-11 focus-visible:ring-cyan-500/50 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <FiLock className="text-cyan-400 h-4 w-4" /> Password *
              </Label>
              <Input
                type="password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="bg-slate-950/80 border-slate-700/80 text-slate-100 text-base h-11 focus-visible:ring-cyan-500/50 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <FiShield className="text-cyan-400 h-4 w-4" /> Role
              </Label>
              <Select
                value={form.role}
                onValueChange={(val: "user" | "admin") => setForm({ ...form, role: val })}
              >
                <SelectTrigger className="bg-slate-950/80 border-slate-700/80 text-slate-100 text-base h-11 rounded-xl">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                  <SelectItem value="user" className="text-base py-2">User</SelectItem>
                  <SelectItem value="admin" className="text-base py-2">Admin</SelectItem>
                  <SelectItem value="writer" className="text-base py-2">Writer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formError && (
              <p className="text-sm text-red-400 bg-red-950/40 border border-red-500/30 p-3 rounded-xl font-medium">
                {formError}
              </p>
            )}
          </div>

          <DialogFooter className="pt-4 flex gap-3">
            <Button variant="ghost" size="lg" onClick={closeModal} className="text-slate-300 hover:text-white hover:bg-slate-800">
              Cancel
            </Button>
            <Button
              size="lg"
              onClick={handleCreate}
              disabled={isMutating}
              className="bg-[#3897ff] hover:bg-[#2887ef] text-white font-extrabold text-base px-6 shadow-md shadow-blue-500/25 rounded-2xl hover:scale-[1.02] transition-all duration-300 border-none cursor-pointer"
            >
              {isMutating ? <ImSpinner2 className="animate-spin h-5 w-5" /> : <FiPlus className="h-5 w-5" />}
              {isMutating ? "Creating..." : "Save User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT USER DIALOG */}
      <Dialog open={mode === "edit"} onOpenChange={closeModal}>
        <DialogContent className="bg-slate-900/95 border-slate-800 text-slate-100 sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-white flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <FiEdit2 className="h-5 w-5" />
              </div>
              Edit User Account
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-200">Full Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-slate-950/80 border-slate-700/80 text-slate-100 text-base h-11 focus-visible:ring-cyan-500/50 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-200">Email Address</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-slate-950/80 border-slate-700/80 text-slate-100 text-base h-11 focus-visible:ring-cyan-500/50 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-200">Role</Label>
              <Select
                value={form.role}
                onValueChange={(val: "user" | "admin") => setForm({ ...form, role: val })}
              >
                <SelectTrigger className="bg-slate-950/80 border-slate-700/80 text-slate-100 text-base h-11 rounded-xl">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                  <SelectItem value="user" className="text-base py-2">User</SelectItem>
                  <SelectItem value="admin" className="text-base py-2">Admin</SelectItem>
                  <SelectItem value="writer" className="text-base py-2">Writer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formError && (
              <p className="text-sm text-red-400 bg-red-950/40 border border-red-500/30 p-3 rounded-xl font-medium">
                {formError}
              </p>
            )}
          </div>

          <DialogFooter className="pt-4 flex gap-3">
            <Button variant="ghost" size="lg" onClick={closeModal} className="text-slate-300 hover:text-white hover:bg-slate-800">
              Cancel
            </Button>
            <Button
              size="lg"
              onClick={handleUpdate}
              disabled={isMutating}
              className="bg-[#3897ff] hover:bg-[#2887ef] text-white font-extrabold text-base px-6 shadow-md shadow-blue-500/25 rounded-2xl hover:scale-[1.02] transition-all duration-300 border-none cursor-pointer"
            >
              {isMutating ? <ImSpinner2 className="animate-spin h-5 w-5" /> : <FiEdit2 className="h-5 w-5" />}
              {isMutating ? "Updating..." : "Update User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE USER DIALOG */}
      <Dialog open={mode === "delete"} onOpenChange={closeModal}>
        <DialogContent className="bg-slate-900/95 border-red-900/50 text-slate-100 sm:max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-red-400 flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <FiTrash2 className="h-5 w-5" />
              </div>
              Delete User
            </DialogTitle>
            <DialogDescription className="text-slate-300 text-base font-medium mt-2">
              Are you sure you want to delete user{" "}
              <strong className="text-white underline">{selectedUser?.name}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-6 flex gap-3">
            <Button variant="ghost" size="lg" onClick={closeModal} className="text-slate-300 hover:text-white hover:bg-slate-800">
              Cancel
            </Button>
            <Button
              size="lg"
              variant="destructive"
              onClick={handleDelete}
              disabled={isMutating}
              className="bg-red-600 hover:bg-red-500 text-white font-extrabold text-base px-6 shadow-lg shadow-red-500/30 hover:scale-105 transition-all duration-300"
            >
              {isMutating ? <ImSpinner2 className="animate-spin h-5 w-5" /> : <FiTrash2 className="h-5 w-5" />}
              {isMutating ? "Deleting..." : "Confirm Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
