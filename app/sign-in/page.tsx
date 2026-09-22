import type { Metadata } from "next";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign In — Discover Gilgit",
  description: "Sign in to your Discover Gilgit account to manage your bookings and saved trips.",
};

export default function SignInPage() {
  return <SignInForm />;
}
