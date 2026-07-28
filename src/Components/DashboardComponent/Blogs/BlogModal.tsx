"use client";

import React, { useEffect, useState } from "react";
import { Blog } from "@/lib/types/blogTypes";
import {
  useCreateBlog,
  useUpdateBlog,
  CreateBlogPayload,
  UpdateBlogPayload,
} from "@/lib/hooks/api/useBlogMutations";
import { ImSpinner2 } from "react-icons/im";
import { FiPlus, FiFileText, FiTag, FiType, FiAlignLeft, FiEdit3 } from "react-icons/fi";
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

export type BlogModalMode = "create" | "edit" | null;

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

interface BlogModalProps {
  mode: BlogModalMode;
  selectedBlog: Blog | null;
  closeModal: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({
  mode,
  selectedBlog,
  closeModal,
}) => {
  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();

  const [form, setForm] = useState<FormState>(defaultForm);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (mode === "edit" && selectedBlog) {
      setForm({
        title: selectedBlog.title || "",
        content: selectedBlog.content || "",
        summary: selectedBlog.summary || "",
        tags: selectedBlog.tags ? selectedBlog.tags.join(", ") : "",
        status: selectedBlog.status || "draft",
      });
    } else {
      setForm(defaultForm);
    }
    setFormError("");
  }, [mode, selectedBlog]);

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      setFormError("Title and Content are required fields.");
      return;
    }

    const parsedTags = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    try {
      if (mode === "create") {
        const payload: CreateBlogPayload = {
          title: form.title,
          content: form.content,
          summary: form.summary,
          status: form.status,
          tags: parsedTags,
        };
        await createBlog.mutateAsync(payload);
      } else if (mode === "edit" && selectedBlog) {
        const payload: UpdateBlogPayload = {
          id: selectedBlog._id,
          title: form.title,
          content: form.content,
          summary: form.summary,
          status: form.status,
          tags: parsedTags,
        };
        await updateBlog.mutateAsync(payload);
      }

      closeModal();
    } catch (error: unknown) {
      setFormError(
        error instanceof Error ? error.message : "Failed to save article."
      );
    }
  };

  const isMutating = createBlog.isPending || updateBlog.isPending;
  const isOpen = mode !== null;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="bg-white dark:bg-slate-900/95 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 sm:max-w-2xl p-6 sm:p-8 rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 dark:text-cyan-400">
              {mode === "create" ? <FiFileText className="h-5 w-5" /> : <FiEdit3 className="h-5 w-5" />}
            </div>
            {mode === "create" ? "Create New Article" : "Edit Article"}
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {mode === "create"
              ? "Fill in article details to publish or save as draft."
              : "Update article title, content, tags, or publishing status."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2 max-h-[70vh] overflow-y-auto pr-1">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <FiType className="text-cyan-500 dark:text-cyan-400 h-4 w-4" /> Title *
            </Label>
            <Input
              placeholder="e.g., Master Next.js 15 App Router"
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
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
              onChange={(event) => setForm({ ...form, summary: event.target.value })}
              className="bg-slate-50 dark:bg-slate-950/80 border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 text-base h-11 focus-visible:ring-cyan-500/50 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <FiFileText className="text-cyan-500 dark:text-cyan-400 h-4 w-4" /> Content *
            </Label>
            <Textarea
              rows={6}
              placeholder="Write full article body here..."
              value={form.content}
              onChange={(event) => setForm({ ...form, content: event.target.value })}
              className="bg-slate-50 dark:bg-slate-950/80 border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 text-base focus-visible:ring-cyan-500/50 rounded-xl resize-none min-h-32"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FiTag className="text-cyan-500 dark:text-cyan-400 h-4 w-4" /> Tags (Comma Separated)
              </Label>
              <Input
                placeholder="react, nextjs, tailwind"
                value={form.tags}
                onChange={(event) => setForm({ ...form, tags: event.target.value })}
                className="bg-slate-50 dark:bg-slate-950/80 border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 text-base h-11 focus-visible:ring-cyan-500/50 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Publishing Status</Label>
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
          </div>

          {formError && (
            <p className="text-sm text-red-500 dark:text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-xl font-medium">
              {formError}
            </p>
          )}
        </div>

        <DialogFooter className="pt-4 flex gap-3">
          <Button
            variant="ghost"
            size="lg"
            onClick={closeModal}
            className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </Button>
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={isMutating}
            className="bg-[#3897ff] hover:bg-[#2887ef] text-white font-extrabold text-base px-6 shadow-md shadow-blue-500/25 rounded-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer border-none"
          >
            {isMutating ? <ImSpinner2 className="animate-spin h-5 w-5 mr-2" /> : <FiPlus className="h-5 w-5 mr-2" />}
            {isMutating ? "Saving..." : mode === "create" ? "Save Article" : "Update Article"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
