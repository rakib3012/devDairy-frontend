import { useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "http://localhost:8000/app/users";

const getToken = (): string => {
  if (typeof document === "undefined") return "";
  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : "";
};

// ─── Create User ───────────────────────────────────────────────────────────────
export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

const createUser = async (payload: CreateUserPayload) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to create user");
  return data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// ─── Update User ───────────────────────────────────────────────────────────────
export interface UpdateUserPayload {
  id: string;
  name?: string;
  email?: string;
  role?: "user" | "admin";
  password?: string;
}

const updateUser = async ({ id, ...payload }: UpdateUserPayload) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to update user");
  return data;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// ─── Delete User ───────────────────────────────────────────────────────────────
const deleteUser = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to delete user");
  return data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
