"use server";

/**
 * Sends a tour/event "Reserve your spot" submission to its own n8n webhook
 * (N8N_RESERVATION_WEBHOOK_URL) — the only place this form's data goes; it
 * intentionally never touches Supabase. Same pattern as notifyN8n.ts (used
 * by "Plan Your Trip", which has a different data shape and webhook): a
 * "use server" Server Action, so this body and the webhook URL stay out of
 * the client bundle even though a Client Component calls it directly.
 */

export type ReservationNotification = {
  fullName: string;
  email: string;
  phone: string;
  travellers: number;
  specialRequests: string;
  consent: boolean;
  /** Null for a general inquiry made without picking a tour. */
  tour: {
    slug: string;
    name: string;
    dates: string;
    duration: string;
    route: string;
    physicalLevel: string;
    pricePerTraveller: number;
    totalPrice: number;
    currency: "USD";
    included: string[];
    notIncluded: string[];
  } | null;
};

const TIMEOUT_MS = 8000;

// This is a public endpoint (any visitor can invoke a Server Action), so
// keep what gets relayed to n8n bounded.
const clip = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);
const clipList = (value: unknown, max: number) =>
  (Array.isArray(value) ? value : []).slice(0, 20).map((item) => clip(item, max));

export async function notifyN8nReservation(payload: ReservationNotification): Promise<{ ok: boolean }> {
  const webhookUrl = process.env.N8N_RESERVATION_WEBHOOK_URL;
  const fieldNames = Object.keys(payload ?? {}).join(", ");

  if (!webhookUrl) {
    console.error(
      `[notifyN8nReservation] N8N_RESERVATION_WEBHOOK_URL is not set (${new Date().toISOString()}) — fields: ${fieldNames}`
    );
    return { ok: false };
  }

  const tour = payload.tour;
  const body = {
    fullName: clip(payload.fullName, 200),
    email: clip(payload.email, 254),
    phone: clip(payload.phone, 50),
    travellers: Number(payload.travellers) || 0,
    specialRequests: clip(payload.specialRequests, 2000),
    consent: payload.consent === true,
    tour: tour
      ? {
          slug: clip(tour.slug, 100),
          name: clip(tour.name, 200),
          dates: clip(tour.dates, 100),
          duration: clip(tour.duration, 100),
          route: clip(tour.route, 200),
          physicalLevel: clip(tour.physicalLevel, 100),
          pricePerTraveller: Number(tour.pricePerTraveller) || 0,
          totalPrice: Number(tour.totalPrice) || 0,
          currency: "USD" as const,
          included: clipList(tour.included, 200),
          notIncluded: clipList(tour.notIncluded, 200),
        }
      : null,
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
        `[notifyN8nReservation] webhook responded ${response.status} (${new Date().toISOString()}) — fields: ${fieldNames}`
      );
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    const reason = error instanceof Error && error.name === "AbortError" ? "timed out" : "failed to reach";
    console.error(
      `[notifyN8nReservation] webhook ${reason} (${new Date().toISOString()}) — fields: ${fieldNames}`
    );
    return { ok: false };
  } finally {
    clearTimeout(timeout);
  }
}
