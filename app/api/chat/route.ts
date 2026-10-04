import { NextResponse } from "next/server";
import {
  CHAT_FALLBACK_REPLY,
  CHAT_MAX_MESSAGE_LENGTH,
  CHAT_RATE_LIMIT_REPLY,
  CHAT_SESSION_ID_PATTERN,
  type ChatResponseBody,
} from "@/lib/chat";

/**
 * Proxy between the chat widget and the n8n chatbot workflow. This route is
 * the only code that knows N8N_CHATBOT_WEBHOOK_URL (server-only env var), so
 * the widget can never call n8n — or see its URL — directly. Same safety
 * rules as lib/notifyN8n.ts: a timeout, errors logged server-side, and a
 * failure never surfaces as a raw error to the visitor.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// An AI Agent with tool calls can take a while; leave room above TIMEOUT_MS.
export const maxDuration = 30;

const TIMEOUT_MS = 15000;

// Best-effort per-IP limit (in memory, so per server instance) — this route
// fronts an AI agent, so keep a runaway script from running up the bill.
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT_MAX;
}

function reply(body: ChatResponseBody, status = 200) {
  return NextResponse.json(body, { status });
}

/**
 * Pulls the bot's text out of whatever n8n sent back:
 *  - "When Last Node Finishes" mode: JSON like { "output": "..." } (the
 *    AI Agent's key), or an array of one such item.
 *  - Streaming mode: newline-delimited JSON chunks; the text is the
 *    concatenated `content` of the { "type": "item" } chunks.
 */
function extractReply(raw: string): string | null {
  const textFrom = (value: unknown): string | null => {
    const item = Array.isArray(value) ? value[0] : value;
    if (typeof item === "string") return item.trim() || null;
    if (item && typeof item === "object") {
      for (const key of ["output", "text", "response", "message", "reply"]) {
        const candidate = (item as Record<string, unknown>)[key];
        if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
      }
    }
    return null;
  };

  try {
    return textFrom(JSON.parse(raw));
  } catch {
    // Not one JSON document — try newline-delimited streaming chunks.
  }

  let streamed = "";
  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    try {
      const chunk = JSON.parse(line) as { type?: string; content?: unknown };
      if (chunk.type === "item" && typeof chunk.content === "string") streamed += chunk.content;
    } catch {
      // Ignore a malformed line rather than failing the whole reply.
    }
  }
  return streamed.trim() || null;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_CHATBOT_WEBHOOK_URL;

  let message = "";
  let sessionId = "";
  try {
    const body = (await request.json()) as { message?: unknown; sessionId?: unknown };
    message = typeof body.message === "string" ? body.message.trim() : "";
    sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  } catch {
    return reply({ ok: false, reply: CHAT_FALLBACK_REPLY }, 400);
  }

  if (!message || message.length > CHAT_MAX_MESSAGE_LENGTH || !CHAT_SESSION_ID_PATTERN.test(sessionId)) {
    return reply({ ok: false, reply: CHAT_FALLBACK_REPLY }, 400);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return reply({ ok: false, reply: CHAT_RATE_LIMIT_REPLY }, 429);
  }

  // Message text is deliberately never logged — only metadata.
  if (!webhookUrl) {
    console.error(`[chatRoute] N8N_CHATBOT_WEBHOOK_URL is not set (${new Date().toISOString()})`);
    return reply({ ok: false, reply: CHAT_FALLBACK_REPLY });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // The shape n8n's Chat Trigger expects: { action, sessionId, chatInput }.
      body: JSON.stringify({ action: "sendMessage", sessionId, chatInput: message }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`[chatRoute] webhook responded ${response.status} (${new Date().toISOString()})`);
      return reply({ ok: false, reply: CHAT_FALLBACK_REPLY });
    }

    const text = extractReply(await response.text());
    if (!text) {
      console.error(`[chatRoute] webhook returned no reply text (${new Date().toISOString()})`);
      return reply({ ok: false, reply: CHAT_FALLBACK_REPLY });
    }

    return reply({ ok: true, reply: text });
  } catch (error) {
    const reason = error instanceof Error && error.name === "AbortError" ? "timed out" : "failed to reach";
    console.error(`[chatRoute] webhook ${reason} (${new Date().toISOString()})`);
    return reply({ ok: false, reply: CHAT_FALLBACK_REPLY });
  } finally {
    clearTimeout(timeout);
  }
}
