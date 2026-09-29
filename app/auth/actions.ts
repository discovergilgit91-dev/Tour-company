"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Supabase unreachable — the cookies may not clear, but don't block
    // the user from navigating away.
  }

  redirect("/");
}
