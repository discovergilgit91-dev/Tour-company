import { createClient } from "./server";

export type SessionProfile = { email: string; fullName: string | null };

/**
 * Best-effort read of the current session + profile name, for Server
 * Components that want to pre-fill a form or gate a submit button without
 * hard-redirecting (unlike requireUser, which redirects). Treats an
 * unreachable Supabase the same as signed-out, matching the rest of the
 * app's fail-safe direction — never silently grant access when uncertain.
 */
export async function getSessionProfile(): Promise<SessionProfile | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) return null;

    const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).single();

    return { email: user.email, fullName: profile?.full_name ?? null };
  } catch {
    return null;
  }
}
