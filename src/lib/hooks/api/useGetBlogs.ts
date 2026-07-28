import { useQuery } from "@tanstack/react-query";
import { BlogsResponse } from "@/lib/types/blogTypes";

export interface GetBlogsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

const fetchBlogs = async (params: GetBlogsParams = {}): Promise<BlogsResponse> => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.search) queryParams.append("search", params.search);
  if (params.status && params.status !== "all") queryParams.append("status", params.status);

  const queryString = queryParams.toString();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/app";
  const url = `${baseUrl}/blogs${queryString ? `?${queryString}` : ""}`;

  // Get token from cookie so admins receive all posts (incl. drafts)
  let token = null;
  if (typeof document !== "undefined") {
    const tokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    token = tokenCookie ? tokenCookie.split("=")[1] : null;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch posts");
    }

    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const useGetBlogs = (params: GetBlogsParams = {}) => {
  return useQuery<BlogsResponse, Error>({
    queryKey: ["blogs", params],
    queryFn: () => fetchBlogs(params),
  });
};
