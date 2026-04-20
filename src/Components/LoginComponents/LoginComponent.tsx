"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLogin } from "@/lib/hooks/api/useLogin";
import { useRouter } from "next/navigation";

type FormErrors = {
  email?: string;
  password?: string;
  general?: string;
};
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const { mutate, isError, isSuccess, isPending } = useLogin();

  const formData = {
    email,
    password,
  };

  // basic validation
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

      const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    mutate(formData, {
      onSuccess: (data) => {
        console.log("first login res>>>>>>>...", data.token);
        // localStorage.setItem("access_token", data.access_token);
        // localStorage.setItem("refresh_token", data.refresh_token);
        document.cookie = `access_token=${data.token}; path=/; max-age=3600`;
        // document.cookie = `refresh_token=${data.token}; path=/; max-age=3600`;

        route.push("/home");
      },
      onError: (error: { message: string }) => {
  console.error("Login error:", error.message);
},
    });

    //   try {
    //     // simulate API call
    //     await new Promise((res) => setTimeout(res, 1500));
    //     console.log({ email, password });
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 text-sm mt-2">
              Login to continue your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                placeholder="you@example.com"
              />
               {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-300">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={18} />
                  ) : (
                    <AiOutlineEye size={18} />
                  )}
                </button>
              </div>

               {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400">
                <input type="checkbox" className="accent-cyan-500" />
                Remember me
              </label>
              <button type="button" className="text-cyan-400 hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition font-semibold text-black flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <ImSpinner2 className="animate-spin" size={18} />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-400 text-xs">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm">
              Google
            </button>
            <button className="py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm">
              GitHub
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-cyan-400 cursor-pointer hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginComponent;
