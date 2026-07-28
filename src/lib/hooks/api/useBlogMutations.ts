import { useMutation, useQueryClient } from "@tanstack/react-query";

// const getBaseUrl = () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/app";
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/blogs`;

const getToken = (): string => {
  if (typeof document === "undefined") return "";
  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : "";
};

// ─── Create Blog ───────────────────────────────────────────────────────────────
export interface CreateBlogPayload {
  title: string;
  content: string;
  summary?: string;
  tags?: string[];
  status?: "draft" | "published";
}

const createBlog = async (payload: CreateBlogPayload) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to create post");
  return data;
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

// ─── Update Blog ───────────────────────────────────────────────────────────────
export interface UpdateBlogPayload {
  id: string;
  title?: string;
  content?: string;
  summary?: string;
  tags?: string[];
  status?: "draft" | "published";
}

const updateBlog = async ({ id, ...payload }: UpdateBlogPayload) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to update blog");
  return data;
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

// ─── Delete Blog ───────────────────────────────────────────────────────────────
const deleteBlog = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to delete blog");
  return data;
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
