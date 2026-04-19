"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import Link from "next/link";

const SignupComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 1500));
      console.log({ name, email, password });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-gray-400 text-sm mt-2">
              Sign up to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-300">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="you@example.com"
              />
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
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-12"
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
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-300">Confirm Password</label>
              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible size={18} />
                  ) : (
                    <AiOutlineEye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition font-semibold text-black flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <ImSpinner2 className="animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
          <span>  Already have an account? </span>
            <Link href="/login" className="text-cyan-400 cursor-pointer hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default SignupComponent;