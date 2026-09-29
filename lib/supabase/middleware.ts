import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth session on every matched request, per
 * Supabase's documented Next.js SSR middleware pattern. This keeps
 * server-rendered pages (Header, sign-in/up guards, etc.) from ever
 * reading a stale/expired session.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Fail open rather than crash every page if Supabase is misconfigured
  // or briefly unreachable — the rest of the site still needs to load.
  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      },
    },
  });

  // Do not run code between createServerClient and supabase.auth.getUser().
  // A simple mistake here can make it very hard to debug users being
  // randomly logged out.
  try {
    await supabase.auth.getUser();
  } catch {
    // Supabase unreachable — let the request through with whatever
    // session state cookies already reflect, instead of failing the page.
  }

  // IMPORTANT: return the supabaseResponse object as-is.
  return supabaseResponse;
}
