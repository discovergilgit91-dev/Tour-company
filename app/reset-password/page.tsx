import type { Metadata } from "next";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password — Discover Gilgit",
  description: "Choose a new password for your Discover Gilgit account.",
  robots: { index: false },
};

// Unlike /sign-in and /sign-up this page must NOT bounce signed-in visitors
// away: opening the emailed reset link signs them in with a short-lived
// recovery session, and that session is exactly what lets them set a new
// password here. The form itself checks the link and handles a bad one.
export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
