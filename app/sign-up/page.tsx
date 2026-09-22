import type { Metadata } from "next";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up — Discover Gilgit",
  description: "Create a free Discover Gilgit account to plan and save your journeys through Gilgit-Baltistan.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
