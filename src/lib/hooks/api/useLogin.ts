import { useMutation } from "@tanstack/react-query";

export interface FromData {
  email: string;
  password: string;
}

export interface LoginResponseData {
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
  token: string;
}

export type ApiResponse = {
  status: string;
  message: string;
  data: LoginResponseData;
};

const fetchLogin = async (formData: FromData) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/app";
  const url = `${baseUrl}/auth/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data?.message || "Login failed. Please check your credentials.";
      throw new Error(errorMessage);
    }

    return data as ApiResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useLogin = () => {
  return useMutation<ApiResponse, Error, FromData>({
    mutationKey: ["login"],
    mutationFn: fetchLogin,
  });
};
