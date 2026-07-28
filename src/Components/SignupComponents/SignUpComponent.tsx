"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import Link from "next/link";
import { SignupFormData, useSignup } from "@/lib/hooks/api/useSignup";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/Components/ui/card";

const SignupComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [apiError, setApiError] = useState("");

  const { mutate, isPending } = useSignup();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setValidationError("");
    setApiError("");

    if (!name || !email || !password) {
      setValidationError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    const formData: SignupFormData = { name, email, password };

    mutate(formData, {
      onSuccess: (responseData) => {
        const token = (responseData as { data?: { token?: string } })?.data?.token;
        if (token) {
          document.cookie = `token=${token}; path=/; max-age=1296000; SameSite=Lax`;
        }
        window.location.href = "/dashboard";
      },
      onError: (err) => {
        setApiError(err.message || "Failed to create account.");
      },
    });
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
            <CardTitle className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Create Account</CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Join DevDairy to publish, read, and manage developer articles
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs text-slate-700 dark:text-slate-300 font-semibold">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus-visible:ring-blue-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs text-slate-700 dark:text-slate-300 font-semibold">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus-visible:ring-blue-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs text-slate-700 dark:text-slate-300 font-semibold">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    {showPassword ? <AiOutlineEyeInvisible className="h-4 w-4" /> : <AiOutlineEye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-xs text-slate-700 dark:text-slate-300 font-semibold">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus-visible:ring-blue-500/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-0 top-0 h-full px-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-transparent"
                  >
                    {showConfirmPassword ? <AiOutlineEyeInvisible className="h-4 w-4" /> : <AiOutlineEye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {(validationError || apiError) && (
                <div className="bg-red-500/10 border border-red-500/30 p-2.5 rounded-lg text-xs text-red-500 dark:text-red-400 text-center font-medium">
                  {validationError || apiError}
                </div>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#3897ff] hover:bg-[#2887ef] text-white font-extrabold h-11 rounded-xl shadow-md shadow-blue-500/25 cursor-pointer border-none"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <ImSpinner2 className="animate-spin h-4 w-4" /> Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-2">
            <p className="text-center text-xs text-slate-600 dark:text-slate-400 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 dark:text-blue-400 font-extrabold hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignupComponent;