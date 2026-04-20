import { useMutation } from "@tanstack/react-query";

export interface FromData {
  email: string;
  password: string;
}
type ApiResponse = {
  message: string;
  status: boolean;
  token: string;
};
const fetchLogin = async (formData: FromData) => {
  const url = "http://localhost:8000/api/auth/signin";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
        console.log("Login failed with status:", response.status);
      throw new Error("Login failed",);
    }
    const data: ApiResponse = await response.json();
    console.log("Login successful", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useLogin = () => {
  return useMutation<ApiResponse, Error, FromData>({
    mutationKey: ["login"],
    mutationFn: (formData: FromData) => fetchLogin(formData),
  });
};
