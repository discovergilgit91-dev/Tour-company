"use server";

/**
 * Sends a "Build Your Own Trip" (/build-your-trip) submission to its own n8n
 * webhook (N8N_CUSTOM_TRIP_WEBHOOK_URL) — the only place this form's data
 * goes; it intentionally never touches Supabase. Same pattern as
 * notifyN8n.ts and notifyN8nReservation.ts: a "use server" Server Action, so
 * this body and the webhook URL stay out of the client bundle even though a
 * Client Component calls it directly.
 *
 * The timeout is long (45s) because the n8n workflow behind it can run
 * several steps. The form therefore does NOT wait on this call — it shows
 * its success state first and fires this in the background.
 */

export type CustomTripNotification = {
  name: string;
  email: string;
  phone: string;
  /** Destination display names, e.g. ["Hunza Valley", "Skardu"] — one or more. */
  destinations: string[];
  dateMode: "exact" | "flexible";
  startDate: string | null;
  endDate: string | null;
  groupSize: string;
  pace: "relaxed" | "moderate" | "adventurous";
  budget: string;
  notes: string;
  consent: boolean;
};

const TIMEOUT_MS = 45000;

// This is a public endpoint (any visitor can invoke a Server Action), so
// keep what gets relayed to n8n bounded and well-typed.
const clip = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);
const clipDate = (value: unknown) => {
  const text = clip(value, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : null;
};
const PACES = ["relaxed", "moderate", "adventurous"] as const;

export async function notifyN8nCustomTrip(payload: CustomTripNotification): Promise<{ ok: boolean }> {
  const webhookUrl = process.env.N8N_CUSTOM_TRIP_WEBHOOK_URL;
  const fieldNames = Object.keys(payload ?? {}).join(", ");

  if (!webhookUrl) {
    console.error(
      `[notifyN8nCustomTrip] N8N_CUSTOM_TRIP_WEBHOOK_URL is not set (${new Date().toISOString()}) — fields: ${fieldNames}`
    );
    return { ok: false };
  }

  const dateMode = payload.dateMode === "exact" ? "exact" : "flexible";
  const body = {
    name: clip(payload.name, 200),
    email: clip(payload.email, 254),
    phone: clip(payload.phone, 50),
    destinations: (Array.isArray(payload.destinations) ? payload.destinations : [])
      .slice(0, 20)
      .map((item) => clip(item, 100)),
    dateMode,
    startDate: dateMode === "exact" ? clipDate(payload.startDate) : null,
    endDate: dateMode === "exact" ? clipDate(payload.endDate) : null,
    groupSize: clip(payload.groupSize, 100),
    pace: PACES.find((pace) => pace === payload.pace) ?? "",
    budget: clip(payload.budget, 100),
    notes: clip(payload.notes, 2000),
    consent: payload.consent === true,
    submittedAt: new Date().toISOString(),
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(
        `[notifyN8nCustomTrip] webhook responded ${response.status} (${new Date().toISOString()}) — fields: ${fieldNames}`
      );
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    const reason = error instanceof Error && error.name === "AbortError" ? "timed out" : "failed to reach";
    console.error(`[notifyN8nCustomTrip] webhook ${reason} (${new Date().toISOString()}) — fields: ${fieldNames}`);
    return { ok: false };
  } finally {
    clearTimeout(timeout);
  }
}
