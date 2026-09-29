/**
 * Preserves a gated form's in-progress values across a sign-up/sign-in
 * detour. A signed-out visitor who tries to submit a trip request or
 * reservation gets redirected to /sign-up with their input stashed here;
 * the auth pages read it (without clearing it) to show a contextual
 * notice and to know where to send them back, and the original form page
 * reads + restores + clears it once it's back on screen.
 *
 * One shared key is enough — only one gated form can plausibly be "in
 * flight" per browser tab at a time.
 */

export type PendingFormId = "book" | "plan-your-trip" | "build-your-trip";

export type PendingSubmission<T = Record<string, unknown>> = {
  formId: PendingFormId;
  /** Path (with query string, if any) to send the visitor back to once signed in. */
  returnTo: string;
  values: T;
  savedAt: number;
};

const STORAGE_KEY = "dg-pending-trip-submission";
const MAX_AGE_MS = 30 * 60 * 1000;

export function savePendingSubmission<T>(submission: Omit<PendingSubmission<T>, "savedAt">) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...submission, savedAt: Date.now() }));
  } catch {
    // sessionStorage unavailable (private browsing, quota, etc.) — the
    // redirect still happens, the visitor just retypes the form.
  }
}

export function readPendingSubmission<T = Record<string, unknown>>(): PendingSubmission<T> | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as PendingSubmission<T>;
    if (Date.now() - parsed.savedAt > MAX_AGE_MS) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearPendingSubmission() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export const PENDING_FORM_LABEL: Record<PendingFormId, string> = {
  book: "reservation",
  "plan-your-trip": "trip request",
  "build-your-trip": "custom trip request",
};
