/**
 * Constants shared by the chat widget (client) and app/api/chat (server).
 * Nothing secret lives here — the n8n URL is read only inside the route.
 */

export const CHAT_FALLBACK_REPLY =
  "Sorry, I'm having trouble connecting right now — please try again or reach us directly at hello@discovergilgit.com.";

export const CHAT_RATE_LIMIT_REPLY =
  "You're sending messages quite quickly — please give me a moment and try again.";

export const CHAT_MAX_MESSAGE_LENGTH = 2000;

/** Letters, digits, "-" and "_" only, so a session id can't carry anything odd into n8n. */
export const CHAT_SESSION_ID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;

export type ChatRequestBody = { message: string; sessionId: string };
export type ChatResponseBody = { reply: string; ok: boolean };
