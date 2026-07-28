import React from "react";
import SettingsComponent from "@/Components/DashboardComponent/Settings/SettingsComponent";

export const metadata = {
  title: "Settings - DevDairy Dashboard",
  description: "Manage admin profile, security settings, and notification preferences",
};

export default function SettingsPage() {
  return <SettingsComponent />;
}