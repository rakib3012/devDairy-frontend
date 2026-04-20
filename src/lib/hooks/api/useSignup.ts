
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export type SignupResponse = {
  message: string;
  status: boolean;
  token?: string;
};


const fetchSignup = async (
  formData: SignupFormData
): Promise<SignupResponse> => {
  const url = "http://localhost:8000/api/auth/signup";

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
      throw new Error(data?.message || "Signup failed");
    }

    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation<SignupResponse, Error, SignupFormData>({
    mutationKey: ["signup"],
    mutationFn: fetchSignup,
  });
};