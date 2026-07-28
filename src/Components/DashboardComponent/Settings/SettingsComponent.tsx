"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiLock,
  FiBell,
  FiSliders,
  FiSave,
  FiCheckCircle,
  FiShield,
  FiMail,
  FiPhone,
  FiAlertCircle,
  FiUploadCloud,
  FiLoader,
} from "react-icons/fi";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { useGetProfile, useUpdateProfile } from "@/lib/hooks/api/useProfile";

export default function SettingsComponent() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "notifications" | "appearance"
  >("profile");

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  // React Query hooks for Profile
  const { data: userProfile, isLoading: isProfileLoading, isError: isProfileError, error: profileError } = useGetProfile();
  const { mutateAsync: updateProfileMutate, isPending: isUpdating } = useUpdateProfile();

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    bio: "",
    phone: "",
    role: "User",
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationState, setNotificationState] = useState({
    emailDigest: true,
    newCommentAlert: true,
    weeklyReport: false,
  });

  // Populate profile form when userProfile is loaded
  useEffect(() => {
    if (userProfile) {
      setProfileForm({
        name: userProfile.name || "",
        email: userProfile.email || "",
        bio: userProfile.bio || "",
        phone: userProfile.phone || "",
        role: userProfile.role || "User",
      });
    }
  }, [userProfile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Image size must be less than 5MB");
        return;
      }
      setSelectedImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setErrorMessage("");
    }
  };

  const handleSaveSettings = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    setSavedSuccess(false);

    try {
      await updateProfileMutate({
        name: profileForm.name,
        email: profileForm.email,
        bio: profileForm.bio,
        phone: profileForm.phone,
        imageFile: selectedImageFile,
      });

      setSavedSuccess(true);
      setSelectedImageFile(null);
      setImagePreviewUrl("");
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update profile";
      setErrorMessage(msg);
    }
  };

  // Helper to compute display avatar URL
  const getAvatarSrc = () => {
    if (imagePreviewUrl) return imagePreviewUrl;
    if (userProfile?.image) {
      if (
        userProfile.image.startsWith("http://") ||
        userProfile.image.startsWith("https://")
      ) {
        return userProfile.image;
      }
      const apiBase =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/app";
      const backendOrigin =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        apiBase.replace(/\/app\/?$/, "");
      return `${backendOrigin}${userProfile.image.startsWith("/") ? "" : "/"}${userProfile.image}`;
    }
    return "";
  };

  const getInitials = (name?: string) => {
    if (!name) return "US";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <FiUser className="h-4 w-4" /> },
    { id: "security", label: "Security & Passwords", icon: <FiLock className="h-4 w-4" /> },
    { id: "notifications", label: "Notifications", icon: <FiBell className="h-4 w-4" /> },
    { id: "appearance", label: "Preferences", icon: <FiSliders className="h-4 w-4" /> },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Account & Profile Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Manage your personal profile information, security preferences, and account settings.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Settings Form Card */}
      <Card className="bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl rounded-2xl">
        <form onSubmit={handleSaveSettings}>
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <CardContent className="p-6 md:p-8 space-y-6">
              <CardHeader className="p-0 pb-4 border-b border-slate-200 dark:border-slate-800/80">
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  Profile Information
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 text-xs">
                  Update your public profile image, full name, email, phone number, and bio details.
                </CardDescription>
              </CardHeader>

              {isProfileLoading ? (
                <div className="py-12 flex items-center justify-center gap-2 text-cyan-500 font-semibold text-sm">
                  <FiLoader className="animate-spin h-5 w-5" />
                  Loading profile data...
                </div>
              ) : isProfileError ? (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                  <FiAlertCircle className="h-4 w-4 shrink-0" />
                  {profileError?.message || "Failed to load user profile."}
                </div>
              ) : (
                <>
                  {/* Avatar upload section */}
                  <div className="flex items-center gap-5 pt-2">
                    <Avatar className="h-20 w-20 ring-4 ring-cyan-500/20 shadow-md">
                      <AvatarImage src={getAvatarSrc()} alt={profileForm.name || "User"} />
                      <AvatarFallback className="bg-cyan-600 text-white font-bold text-lg">
                        {getInitials(profileForm.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1.5">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs font-semibold gap-1.5 cursor-pointer"
                      >
                        <FiUploadCloud className="h-4 w-4 text-cyan-500" />
                        {selectedImageFile ? "Change Selected Image" : "Upload Profile Photo"}
                      </Button>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {selectedImageFile
                          ? `Selected: ${selectedImageFile.name}`
                          : "JPG, PNG or WEBP. Maximum file size 5MB."}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Full Name
                      </label>
                      <Input
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, name: e.target.value })
                        }
                        placeholder="Your Full Name"
                        className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Email Address
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <Input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, email: e.target.value })
                          }
                          placeholder="name@example.com"
                          className="pl-9 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Phone Number
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <Input
                          type="text"
                          value={profileForm.phone}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, phone: e.target.value })
                          }
                          placeholder="+8801700000000"
                          className="pl-9 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                        />
                      </div>
                    </div>

                    {/* Role Badge */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Account Role
                      </label>
                      <div>
                        <Badge
                          variant="outline"
                          className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 px-3 py-1.5 text-xs font-bold capitalize"
                        >
                          <FiShield className="inline mr-1.5 h-3.5 w-3.5" />
                          {profileForm.role}
                        </Badge>
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Bio / Description
                      </label>
                      <textarea
                        rows={3}
                        value={profileForm.bio}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, bio: e.target.value })
                        }
                        placeholder="Write a brief introduction about yourself..."
                        className="w-full px-3 py-2 text-sm rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <CardContent className="p-6 md:p-8 space-y-6">
              <CardHeader className="p-0 pb-4 border-b border-slate-200 dark:border-slate-800/80">
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  Password & Security Settings
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 text-xs">
                  Ensure your account security with strong password management.
                </CardDescription>
              </CardHeader>

              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={securityForm.currentPassword}
                    onChange={(e) =>
                      setSecurityForm({
                        ...securityForm,
                        currentPassword: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={securityForm.newPassword}
                    onChange={(e) =>
                      setSecurityForm({
                        ...securityForm,
                        newPassword: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={securityForm.confirmPassword}
                    onChange={(e) =>
                      setSecurityForm({
                        ...securityForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                  />
                </div>
              </div>
            </CardContent>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === "notifications" && (
            <CardContent className="p-6 md:p-8 space-y-6">
              <CardHeader className="p-0 pb-4 border-b border-slate-200 dark:border-slate-800/80">
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 text-xs">
                  Choose how and when you receive platform alerts and digests.
                </CardDescription>
              </CardHeader>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Email Digest
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Receive daily summary of platform activities.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationState.emailDigest}
                    onChange={(e) =>
                      setNotificationState({
                        ...notificationState,
                        emailDigest: e.target.checked,
                      })
                    }
                    className="h-5 w-5 accent-cyan-500 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      New Comment Alerts
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Get notified when a new comment is posted on articles.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationState.newCommentAlert}
                    onChange={(e) =>
                      setNotificationState({
                        ...notificationState,
                        newCommentAlert: e.target.checked,
                      })
                    }
                    className="h-5 w-5 accent-cyan-500 cursor-pointer"
                  />
                </label>
              </div>
            </CardContent>
          )}

          {/* APPEARANCE / PREFERENCES TAB */}
          {activeTab === "appearance" && (
            <CardContent className="p-6 md:p-8 space-y-6">
              <CardHeader className="p-0 pb-4 border-b border-slate-200 dark:border-slate-800/80">
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  Platform Preferences
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 text-xs">
                  Customize theme display mode and dashboard layout settings.
                </CardDescription>
              </CardHeader>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Theme Mode
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Use the sun/moon icon in the top Navbar to toggle Light or Dark theme.
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs font-semibold">
                    Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          )}

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800/80 rounded-b-2xl">
            <div>
              {savedSuccess ? (
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5 animate-fadeIn">
                  <FiCheckCircle className="h-4 w-4" />
                  Profile settings saved successfully!
                </span>
              ) : errorMessage ? (
                <span className="text-xs font-bold text-rose-500 flex items-center gap-1.5">
                  <FiAlertCircle className="h-4 w-4" />
                  {errorMessage}
                </span>
              ) : (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Unsaved changes will be discarded on navigation.
                </span>
              )}
            </div>

            <Button
              type="submit"
              disabled={isUpdating || isProfileLoading}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold gap-2 px-6 shadow-lg shadow-cyan-500/20 cursor-pointer w-full sm:w-auto"
            >
              {isUpdating ? (
                <>
                  <FiLoader className="h-4 w-4 animate-spin" />
                  Saving Profile...
                </>
              ) : (
                <>
                  <FiSave className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
