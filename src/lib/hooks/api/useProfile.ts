import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role?: string;
  bio?: string;
  phone?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProfileResponse = {
  status: string;
  message: string;
  data: {
    user: UserProfile;
  };
};

const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/app";

const getToken = (): string => {
  if (typeof document === "undefined") return "";
  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : "";
};

const fetchProfile = async (): Promise<UserProfile> => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${getBaseUrl()}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch profile");
  }

  return data.data.user;
};

export const useGetProfile = () => {
  return useQuery<UserProfile, Error>({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
};

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  bio?: string;
  phone?: string;
  imageFile?: File | null;
}

const updateProfile = async (
  payload: UpdateProfilePayload
): Promise<UserProfile> => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const formData = new FormData();
  if (payload.name !== undefined) formData.append("name", payload.name);
  if (payload.email !== undefined) formData.append("email", payload.email);
  if (payload.bio !== undefined) formData.append("bio", payload.bio);
  if (payload.phone !== undefined) formData.append("phone", payload.phone);
  if (payload.imageFile) {
    formData.append("image", payload.imageFile);
  }

  const response = await fetch(`${getBaseUrl()}update/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to update profile");
  }

  return data.data.user;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
