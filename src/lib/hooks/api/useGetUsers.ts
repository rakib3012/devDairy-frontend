import { useQuery } from "@tanstack/react-query";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export type UsersResponse = {
  status: string;
  message: string;
  data: {
    users: User[];
  };
};

const fetchUsers = async (): Promise<UsersResponse> => {
  const url = "http://localhost:8000/app/users";
  
  // Get token from cookie
  let token = null;
  if (typeof document !== "undefined") {
    const tokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    token = tokenCookie ? tokenCookie.split("=")[1] : null;
  }

  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch users");
    }

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const useGetUsers = () => {
  return useQuery<UsersResponse, Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
