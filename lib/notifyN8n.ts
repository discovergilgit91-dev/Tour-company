"use server";

/**
 * Sends a "Plan Your Trip" submission to the n8n webhook — the only place
 * this form's data goes (it intentionally never touches Supabase). Marked
 * "use server" so this is itself a Server Action: Next.js keeps its body,
 * and N8N_WEBHOOK_URL, out of the client bundle even though it's called
 * directly from a Client Component.
 */

export type TripRequestNotification = {
  name: string;
  email: string;
  phone: string;
  interests: string[];
  destinations: string[];
  flexibleDestination: boolean;
  dateMode: "exact" | "flexible";
  startDate: string | null;
  endDate: string | null;
  groupSize: string;
  duration: string;
  budget: string;
  notes: string;
};

const TIMEOUT_MS = 8000;

export async function notifyN8n(payload: TripRequestNotification): Promise<{ ok: boolean }> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const fieldNames = Object.keys(payload).join(", ");

  if (!webhookUrl) {
    console.error(`[notifyN8n] N8N_WEBHOOK_URL is not set (${new Date().toISOString()}) — fields: ${fieldNames}`);
    return { ok: false };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(
        `[notifyN8n] webhook responded ${response.status} (${new Date().toISOString()}) — fields: ${fieldNames}`
      );
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    const reason = error instanceof Error && error.name === "AbortError" ? "timed out" : "failed to reach";
    console.error(`[notifyN8n] webhook ${reason} (${new Date().toISOString()}) — fields: ${fieldNames}`);
    return { ok: false };
  } finally {
    clearTimeout(timeout);
  }
}
