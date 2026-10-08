/**
 * Looks up the signed-in user's trip requests, reservations and custom-trip
 * submissions. The data lives in Google Sheets (one tab per form) and is read
 * by an n8n workflow behind N8N_LOOKUP_WEBHOOK_URL — nothing here touches
 * Supabase data or any other database.
 *
 * Deliberately NOT a "use server" module (unlike the notifyN8n* files): that
 * directive would expose this as a public endpoint anyone could call with
 * someone else's email. It is a plain server-side helper, imported only by the
 * server component that has already verified the session.
 *
 * Request  — POST N8N_LOOKUP_WEBHOOK_URL with header x-lookup-secret (from
 *            N8N_LOOKUP_SECRET), JSON body: { "email": "user@example.com" }
 * Response — JSON: { "requests": [ ...rows ] } (a bare array is accepted too).
 * Each row is one Google Sheets row, flattened:
 *   source        "trip_request" | "reservation" | "custom_trip"
 *   submittedAt   ISO-8601 timestamp of the submission
 *   destinations  string[] (or a comma-separated string) — trip_request / custom_trip
 *   tourName      string — reservation (empty for a general inquiry)
 *   dateMode      "exact" | "flexible" — trip_request / custom_trip
 *   startDate     "YYYY-MM-DD" (or empty) — trip_request / custom_trip
 *   endDate       "YYYY-MM-DD" (or empty) — trip_request / custom_trip
 *   tourDates     string, e.g. "20 Jul – 22 Jul, 2027" — reservation
 *   groupSize     string, e.g. "Couple" — or the traveller count for a reservation
 *   email         (optional) the submitter's email; rows that don't match the
 *                 signed-in user are dropped as a safety net
 * Anything missing or malformed degrades gracefully; any failure returns [].
 */

export type TripRequestSource = "trip_request" | "reservation" | "custom_trip";

export type MyTripRequest = {
  source: TripRequestSource;
  /** ISO timestamp, or null if the sheet value couldn't be parsed. */
  submittedAt: string | null;
  /** Tour name for a reservation, otherwise the destinations, otherwise a neutral fallback. */
  title: string;
  /** A date range, the departure dates, or "Flexible". */
  dates: string;
  /** "Couple", "2 travellers", … — empty when the sheet row has none. */
  groupSize: string;
};

const TIMEOUT_MS = 10000;
const MAX_ROWS = 50;

const clip = (value: unknown, max: number) => (typeof value === "string" || typeof value === "number" ? String(value) : "").trim().slice(0, max);

function parseSource(value: unknown): TripRequestSource | null {
  const key = clip(value, 40).toLowerCase().replace(/[^a-z]/g, "");
  if (["triprequest", "plan", "plantrip"].includes(key)) return "trip_request";
  if (["reservation", "reserve", "booking"].includes(key)) return "reservation";
  if (["customtrip", "custom", "buildyourowntrip", "buildtrip"].includes(key)) return "custom_trip";
  return null;
}

function parseList(value: unknown): string[] {
  const items = Array.isArray(value) ? value : typeof value === "string" ? value.split(/[,\n;]/) : [];
  return items.map((item) => clip(item, 100)).filter(Boolean).slice(0, 20);
}

function parseIso(value: unknown): string | null {
  const text = clip(value, 40);
  if (!text) return null;
  const time = Date.parse(text);
  return Number.isNaN(time) ? null : new Date(time).toISOString();
}

const DAY = /^\d{4}-\d{2}-\d{2}/;

function formatDay(isoDay: string, withYear: boolean): string {
  return new Date(`${isoDay.slice(0, 10)}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    ...(withYear ? { year: "numeric" } : {}),
    timeZone: "UTC",
  });
}

function formatDates(row: Record<string, unknown>): string {
  const tourDates = clip(row.tourDates, 100);
  if (tourDates) return tourDates;

  const start = clip(row.startDate, 10);
  const end = clip(row.endDate, 10);
  const exact = clip(row.dateMode, 20).toLowerCase() !== "flexible";

  if (exact && DAY.test(start)) {
    if (DAY.test(end) && end !== start) {
      const sameYear = start.slice(0, 4) === end.slice(0, 4);
      return `${formatDay(start, !sameYear)} – ${formatDay(end, true)}`;
    }
    return formatDay(start, true);
  }
  return "Flexible";
}

function formatGroupSize(value: unknown): string {
  const text = clip(value, 100);
  if (/^\d+$/.test(text)) return `${text} ${text === "1" ? "traveller" : "travellers"}`;
  return text;
}

function normalizeRow(raw: unknown, userEmail: string): MyTripRequest | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;

  const source = parseSource(row.source);
  if (!source) return null;

  // Defence in depth: n8n should already filter by email, but never show a
  // row that says it belongs to somebody else.
  const rowEmail = clip(row.email, 254).toLowerCase();
  if (rowEmail && rowEmail !== userEmail) return null;

  const tourName = clip(row.tourName, 200);
  const destinations = parseList(row.destinations);
  const title =
    source === "reservation"
      ? tourName || "General inquiry"
      : destinations.length > 0
        ? destinations.join(", ")
        : "Destination to be decided";

  return {
    source,
    submittedAt: parseIso(row.submittedAt),
    title,
    dates: formatDates(row),
    groupSize: formatGroupSize(row.groupSize),
  };
}

function extractRows(body: unknown): unknown[] {
  if (Array.isArray(body)) return body;
  if (body && typeof body === "object" && Array.isArray((body as { requests?: unknown }).requests)) {
    return (body as { requests: unknown[] }).requests;
  }
  return [];
}

/** Newest submission first; rows with an unreadable date go last. */
function bySubmittedDesc(a: MyTripRequest, b: MyTripRequest): number {
  const timeA = a.submittedAt ? Date.parse(a.submittedAt) : -Infinity;
  const timeB = b.submittedAt ? Date.parse(b.submittedAt) : -Infinity;
  if (timeA === timeB) return 0;
  return timeA < timeB ? 1 : -1;
}

export async function getMyTripRequests(email: string | null | undefined): Promise<MyTripRequest[]> {
  const userEmail = (email ?? "").trim().toLowerCase();
  const webhookUrl = process.env.N8N_LOOKUP_WEBHOOK_URL;
  const secret = process.env.N8N_LOOKUP_SECRET ?? "";

  if (!userEmail) return [];
  if (!webhookUrl) {
    console.error(`[getMyTripRequests] N8N_LOOKUP_WEBHOOK_URL is not set (${new Date().toISOString()})`);
    return [];
  }
  if (!secret) {
    // Still sent (as an empty header) so the failure shows up as n8n rejecting it, not a silent skip.
    console.error(`[getMyTripRequests] N8N_LOOKUP_SECRET is not set (${new Date().toISOString()})`);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Shared secret checked by the workflow's "Check Secret" node.
        "x-lookup-secret": secret,
      },
      body: JSON.stringify({ email: userEmail }),
      signal: controller.signal,
      // Always the live sheet — this is someone's own request history.
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`[getMyTripRequests] webhook responded ${response.status} (${new Date().toISOString()})`);
      return [];
    }

    const rows = extractRows(await response.json());
    return rows
      .map((row) => normalizeRow(row, userEmail))
      .filter((row): row is MyTripRequest => row !== null)
      .sort(bySubmittedDesc)
      .slice(0, MAX_ROWS);
  } catch (error) {
    const reason = error instanceof Error && error.name === "AbortError" ? "timed out" : "failed";
    console.error(`[getMyTripRequests] lookup ${reason} (${new Date().toISOString()})`);
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
