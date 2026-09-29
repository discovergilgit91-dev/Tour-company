import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client, for use inside Server Components, Server
 * Actions, and Route Handlers. Reads/writes auth cookies via next/headers.
 *
 * Server Components can't write cookies (there's no response to attach
 * them to), so `setAll` there is a no-op wrapped in try/catch — that's
 * fine as long as the middleware below is refreshing the session on
 * every request.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Called from a Server Component — safe to ignore since the
            // middleware refreshes the user's session on every request.
          }
        },
      },
    }
  );
}
