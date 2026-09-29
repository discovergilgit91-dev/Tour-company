/**
 * Shared display helpers for anywhere a user's name/avatar shows up
 * (header menu, account page). Keeps the "no full_name yet" fallback
 * rule in one place instead of repeated per component.
 */

export function getDisplayName(fullName: string | null | undefined, email: string): string {
  const trimmed = fullName?.trim();
  if (trimmed) return trimmed;
  return email.split("@")[0] || email;
}

export function getInitials(displayName: string): string {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
