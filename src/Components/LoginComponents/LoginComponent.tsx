"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLogin, FromData } from "@/lib/hooks/api/useLogin";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/Components/ui/card";

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

  const { mutateAsync, isPending } = useLogin();

  const formData: FromData = { email, password };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const data = await mutateAsync(formData);
      if (data?.data?.token) {
        document.cookie = `token=${data.data.token}; path=/; max-age=1296000; SameSite=Lax`;
        if (data.data.user?.role) {
          document.cookie = `role=${data.data.user.role}; path=/; max-age=1296000; SameSite=Lax`;
        }
      }
      window.location.href = "/dashboard";
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Login failed. Please verify credentials.";
      setErrors({ general: message });
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/90 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-2xl text-slate-900 dark:text-slate-100 p-2 rounded-2xl">
          <CardHeader className="space-y-1.5 text-center">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-[#3897ff] flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-500/25 mb-2">
              D
            </div>
            <CardTitle className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Sign in to your DevDairy account to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-xs text-slate-700 dark:text-slate-300 font-semibold"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@example.com"
                  className="bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus-visible:ring-blue-500/50"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-xs text-slate-700 dark:text-slate-300 font-semibold"
                  >
                    Password
                  </Label>
                  <Link
                    href="#"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    className="bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus-visible:ring-blue-500/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-transparent"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="h-4 w-4" />
                    ) : (
                      <AiOutlineEye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {errors.general && (
                <div className="bg-red-500/10 border border-red-500/30 p-2.5 rounded-lg text-xs text-red-500 dark:text-red-400 text-center font-medium">
                  {errors.general}
                </div>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#3897ff] hover:bg-[#2887ef] text-white font-extrabold h-11 rounded-xl shadow-md shadow-blue-500/25 cursor-pointer border-none"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <ImSpinner2 className="animate-spin h-4 w-4" /> Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-2">
            <p className="text-center text-xs text-slate-600 dark:text-slate-400 font-medium">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-600 dark:text-blue-400 font-extrabold hover:underline"
              >
                Create Account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginComponent;
