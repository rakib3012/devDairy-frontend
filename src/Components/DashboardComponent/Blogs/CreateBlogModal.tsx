"use client";

import React, { useState } from "react";
import { useCreateBlog, CreateBlogPayload } from "@/lib/hooks/api/useBlogMutations";
import { ImSpinner2 } from "react-icons/im";
import { FiPlus, FiFileText, FiTag, FiType, FiAlignLeft } from "react-icons/fi";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
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

interface FormState {
  title: string;
  content: string;
  summary: string;
  tags: string;
  status: "draft" | "published";
}

const defaultForm: FormState = {
  title: "",
  content: "",
  summary: "",
  tags: "",
  status: "draft",
};

interface CreateBlogModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

export const CreateBlogModal: React.FC<CreateBlogModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const createBlog = useCreateBlog();
  const [form, setForm] = useState<FormState>(defaultForm);
  const [formError, setFormError] = useState("");

  const handleCreate = async () => {
    if (!form.title || !form.content) {
      setFormError("Title and content are required.");
      return;
    }

    const payload: CreateBlogPayload = {
      title: form.title,
      content: form.content,
      summary: form.summary,
      status: form.status,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      await createBlog.mutateAsync(payload);
      setForm(defaultForm);
      setFormError("");
      setOpenModal(false);
    } catch (e: unknown) {
      setFormError(e instanceof Error ? e.message : "Failed to create post.");
    }
  };

  const isMutating = createBlog.isPending;

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="bg-white dark:bg-slate-900/95 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 sm:max-w-xl p-6 sm:p-8 rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 dark:text-cyan-400">
              <FiFileText className="h-5 w-5" />
            </div>
            Create New Post
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Fill in article details to publish or save as a draft.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <FiType className="text-cyan-500 dark:text-cyan-400 h-4 w-4" /> Title *
            </Label>
            <Input
              placeholder="e.g., Master Next.js 15 App Router"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-slate-50 dark:bg-slate-950/80 border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 text-base h-11 focus-visible:ring-cyan-500/50 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <FiAlignLeft className="text-cyan-500 dark:text-cyan-400 h-4 w-4" /> Summary
            </Label>
            <Input
              placeholder="Brief summary of the article..."
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="bg-slate-50 dark:bg-slate-950/80 border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 text-base h-11 focus-visible:ring-cyan-500/50 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <FiFileText className="text-cyan-500 dark:text-cyan-400 h-4 w-4" /> Content *
            </Label>
            <Textarea
              rows={5}
              placeholder="Write full article body here..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="bg-slate-50 dark:bg-slate-950/80 border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 text-base focus-visible:ring-cyan-500/50 rounded-xl resize-none min-h-28"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <FiTag className="text-cyan-500 dark:text-cyan-400 h-4 w-4" /> Tags (Comma Separated)
            </Label>
            <Input
              placeholder="react, nextjs, tailwind"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="bg-slate-50 dark:bg-slate-950/80 border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 text-base h-11 focus-visible:ring-cyan-500/50 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Status</Label>
            <Select
              value={form.status}
              onValueChange={(val: "draft" | "published") => setForm({ ...form, status: val })}
            >
              <SelectTrigger className="bg-slate-50 dark:bg-slate-950/80 border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 text-base h-11 rounded-xl">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                <SelectItem value="draft" className="text-base py-2">Draft</SelectItem>
                <SelectItem value="published" className="text-base py-2">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formError && (
            <p className="text-sm text-red-500 dark:text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-xl font-medium">
              {formError}
            </p>
          )}
        </div>

        <DialogFooter className="pt-4 flex gap-3">
          <Button variant="ghost" size="lg" onClick={() => setOpenModal(false)} className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
            Cancel
          </Button>
          <Button
            size="lg"
            onClick={handleCreate}
            disabled={isMutating}
            className="bg-[#3897ff] hover:bg-[#2887ef] text-white font-extrabold text-base px-6 shadow-md shadow-blue-500/25 rounded-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer border-none"
          >
            {isMutating ? <ImSpinner2 className="animate-spin h-5 w-5" /> : <FiPlus className="h-5 w-5" />}
            {isMutating ? "Creating..." : "Save Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
