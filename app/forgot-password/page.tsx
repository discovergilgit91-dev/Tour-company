import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password — Discover Gilgit",
  description: "Request a link to reset your Discover Gilgit password.",
};

export default async function ForgotPasswordPage() {
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
    // Supabase unreachable — fail open and let them see the page rather
    // than blocking access to it.
  }

  if (isSignedIn) {
    redirect("/");
  }

  return <ForgotPasswordForm />;
}
