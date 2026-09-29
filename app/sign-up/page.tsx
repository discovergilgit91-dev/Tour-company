import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up — Discover Gilgit",
  description: "Create a free Discover Gilgit account to plan and save your journeys through Gilgit-Baltistan.",
};

export default async function SignUpPage() {
  // Read outside the try/catch: redirect() works by throwing, and a
  // catch-all here would otherwise swallow that throw as if Supabase
  // were unreachable and silently fail to redirect.
  let isSignedIn = false;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    isSignedIn = !!user;
  } catch {
    // Supabase unreachable — fail open and let them see the sign-up page
    // rather than blocking access to it.
  }

  if (isSignedIn) {
    redirect("/");
  }

  return <SignUpForm />;
}
