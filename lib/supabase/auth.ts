import { redirect } from "next/navigation";
import { createClient } from "./server";

/**
 * Reads the session on the server and redirects to /sign-in if no one is
 * logged in — for Server Components that must never render for a signed-
 * out visitor (account pages, etc.).
 */
export async function requireUser() {
  let user = null;

  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();
    user = authUser;
  } catch {
    // Supabase unreachable — fall through and treat as signed out below.
  }

  // redirect() works by throwing: called outside the try/catch above so a
  // catch-all there can't swallow that throw as a "Supabase unreachable" case.
  if (!user) {
    redirect("/sign-in");
  }

  return user;
}
