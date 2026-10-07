/**
 * Site-wide constants for absolute URLs and structured data. The canonical
 * origin comes from the SITE_URL environment variable (server-only — set it
 * to the production origin, e.g. https://discovergilgit.com); the fallback is
 * used when it isn't set, so local builds still produce well-formed URLs.
 */
export const SITE_URL = (process.env.SITE_URL ?? "https://discovergilgit.com").replace(/\/+$/, "");

/** The name used in page titles and Open Graph `siteName` (matches app/layout.tsx). */
export const SITE_NAME = "Discover Gilgit";

/** The longer brand name shown in the logo wordmark. */
export const SITE_LEGAL_NAME = "Discover Gilgit-Baltistan";

/** Publisher logo for structured data (the same artwork the header uses). */
export const SITE_LOGO_PATH = "/Images/tours/logo-icon.png";

/** Turns a site path ("/blog", "/Images/a(1).png") into a full, URL-encoded absolute URL. */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${encodeURI(normalized)}`;
}
