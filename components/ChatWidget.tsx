"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { PeaksMotif } from "./tours/motifs";
import { CHAT_FALLBACK_REPLY, type ChatResponseBody } from "@/lib/chat";

/* ---------------------------------------------------------------------
   Site-wide chat widget. Mounted once in app/layout.tsx (see that file
   for why) so its state survives client-side navigation between pages
   instead of resetting every time the route changes.
   --------------------------------------------------------------------- */

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
};

const GREETING_TEXT =
  "Namaste! I'm here to help you plan a trip through Gilgit-Baltistan — ask me about destinations, tours, or the best time to visit.";

const QUICK_REPLIES = ["Browse tours", "Best time to visit", "Plan my trip"];

let messageCounter = 0;
function nextMessageId() {
  messageCounter += 1;
  return `msg-${messageCounter}`;
}

function newSessionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/**
 * Sends one message to /api/chat (the server route that talks to n8n — the
 * browser never calls n8n directly) and resolves with the bot's reply text.
 * Never rejects: any failure resolves with the fallback reply so it shows
 * up as a normal bot bubble.
 */
// Must stay above the route's 45s TIMEOUT_MS (app/api/chat/route.ts) so the
// route's own fallback reply arrives before the widget gives up.
const CLIENT_TIMEOUT_MS = 50000;

async function sendMessageToBot(userText: string, sessionId: string): Promise<string> {
  // Safety net so a hung request can't leave the typing bubble up forever;
  // the server gives up on n8n well before this.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText, sessionId }),
      signal: controller.signal,
    });
    const data = (await response.json()) as Partial<ChatResponseBody>;
    return typeof data.reply === "string" && data.reply.trim() ? data.reply : CHAT_FALLBACK_REPLY;
  } catch {
    return CHAT_FALLBACK_REPLY;
  } finally {
    clearTimeout(timeout);
  }
}

function CloseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.5 12 20.5 4l-5 16-4-6.5-7-1.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChipArrowIcon() {
  return (
    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M5 12h13.5M13 6l6.5 6-6.5 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* The real company mark (the same file Header/Footer use), set on its
   own solid badge rather than directly on a colored surface — the
   emblem's own green linework would otherwise vanish against the
   launcher/header's green and forest tones. */
function LogoBadge({ box = 28, mark = 20, ring = false }: { box?: number; mark?: number; ring?: boolean }) {
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center rounded-full bg-cream shadow-[0_2px_6px_rgba(7,23,25,0.25)] ${
        ring ? "ring-2 ring-gold/40" : ""
      }`}
      style={{ height: box, width: box }}
    >
      <span className="relative" style={{ height: mark, width: mark }}>
        <Image src="/Images/tours/logo-icon.png" alt="" aria-hidden fill sizes="40px" className="object-contain" />
      </span>
    </span>
  );
}

function TypingBubble() {
  return (
    <div className="chat-bubble-in flex items-end gap-2">
      <LogoBadge box={28} mark={19} />
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-cream px-4 py-3.5 shadow-[0_2px_8px_rgba(20,35,31,0.06)]">
        <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-forest/40" />
        <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-forest/40" />
        <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-forest/40" />
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [showInvite, setShowInvite] = useState(true);
  // "Compact" = a phone-sized screen, or a phone turned sideways (short): the chat
  // takes over the whole screen instead of floating beside the launcher.
  const [compact, setCompact] = useState(false);
  // The part of the screen not covered by the on-screen keyboard (compact only).
  const [viewport, setViewport] = useState<{ top: number; height: number } | null>(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  // One id per conversation so n8n's memory links every message together.
  // In memory only (never localStorage), like the rest of this widget's state.
  const sessionIdRef = useRef<string | null>(null);

  // Invite dot only needs to catch a first-time visitor's eye — fade it
  // out on its own after a few seconds even if they never click it.
  useEffect(() => {
    const timer = setTimeout(() => setShowInvite(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px), (max-height: 519px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // While the full-screen chat is open: stop the page behind it scrolling, and
  // follow the visual viewport so the input stays above the on-screen keyboard
  // (iOS doesn't resize fixed elements for the keyboard, and Chrome only
  // overlays it). `top` follows too, because iOS may scroll the page to reveal
  // the focused field.
  const fullScreen = isOpen && compact;
  useEffect(() => {
    if (!fullScreen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const vv = window.visualViewport;
    const update = () => {
      if (!vv) return;
      setViewport({ top: vv.offsetTop, height: vv.height });
      setKeyboardOpen(window.innerHeight - vv.height > 120);
    };
    update();
    vv?.addEventListener("resize", update);
    vv?.addEventListener("scroll", update);

    return () => {
      document.body.style.overflow = previousOverflow;
      vv?.removeEventListener("resize", update);
      vv?.removeEventListener("scroll", update);
      setViewport(null);
      setKeyboardOpen(false);
    };
  }, [fullScreen]);

  // Keep the newest message in view when the keyboard opens or closes.
  const viewportHeight = viewport?.height;
  useEffect(() => {
    if (viewportHeight === undefined) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [viewportHeight]);

  // Auto-scroll to whatever was just added (a message, or the typing bubble).
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  // Escape closes the window; focus lands in the input as soon as it opens.
  useEffect(() => {
    if (!isOpen) return;
    // Don't pop the keyboard open on touch devices: it would cover the greeting
    // and quick replies before the visitor has read them.
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const focusTimer = touch ? undefined : setTimeout(() => inputRef.current?.focus(), 50);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeChat();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      if (focusTimer) clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function openChat() {
    setIsOpen(true);
    setShowInvite(false);
    if (!hasOpenedOnce) {
      setHasOpenedOnce(true);
      setMessages([{ id: "greeting", role: "bot", text: GREETING_TEXT }]);
    }
  }

  function closeChat() {
    setIsOpen(false);
    launcherRef.current?.focus();
  }

  function appendUserMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { id: nextMessageId(), role: "user", text: trimmed }]);
    setShowQuickReplies(false);
    setIsTyping(true);

    sessionIdRef.current ??= newSessionId();

    void sendMessageToBot(trimmed, sessionIdRef.current).then((replyText) => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: nextMessageId(), role: "bot", text: replyText }]);
    });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim()) return;
    appendUserMessage(draft);
    setDraft("");
  }

  return (
    <>
      {/* Soft ambient glow breathing behind the launcher — the first hint
          of "premium" before anyone even opens the thing. */}
      <span
        aria-hidden="true"
        className="chat-launcher-glow pointer-events-none fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-[calc(env(safe-area-inset-right)+1rem)] z-[89] h-14 w-14 rounded-full bg-green blur-xl sm:bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] sm:right-[calc(env(safe-area-inset-right)+1.5rem)] sm:h-16 sm:w-16"
      />

      <button
        ref={launcherRef}
        type="button"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        onClick={() => (isOpen ? closeChat() : openChat())}
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-[calc(env(safe-area-inset-right)+1rem)] z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green to-green-dark text-cream shadow-[0_10px_30px_-6px_rgba(7,23,25,0.55)] ring-1 ring-cream/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-6px_rgba(7,23,25,0.6)] active:scale-95 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] sm:right-[calc(env(safe-area-inset-right)+1.5rem)] sm:h-16 sm:w-16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 motion-reduce:transition-none ${
            isOpen ? "scale-0 rotate-45 opacity-0" : "scale-100 rotate-0 opacity-100"
          }`}
        >
          <span className="flex scale-90 sm:scale-100">
            <LogoBadge box={42} mark={30} />
          </span>
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 motion-reduce:transition-none ${
            isOpen ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-45 opacity-0"
          }`}
        >
          <CloseIcon size={22} />
        </span>

        {showInvite && !isOpen && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75 motion-reduce:animate-none" />
            <span className="relative flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-cream bg-gold px-1 text-[10px] font-bold leading-none text-forest">
              1
            </span>
          </span>
        )}
      </button>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Discover Gilgit-Baltistan"
        aria-hidden={!isOpen}
        // A closed chat must not be reachable with Tab either.
        inert={!isOpen}
        style={compact && viewport ? { top: viewport.top, height: viewport.height } : undefined}
        className={`chat-window fixed z-[90] flex flex-col overflow-hidden bg-white shadow-[0_28px_70px_-12px_rgba(7,23,25,0.5)] ring-1 ring-black/5 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
          compact
            ? "inset-x-0 top-0 h-dvh rounded-none"
            : "bottom-[calc(env(safe-area-inset-bottom)+6rem)] right-[calc(env(safe-area-inset-right)+1.5rem)] h-[600px] max-h-[calc(100svh-120px)] w-[380px] rounded-bl-[26px] rounded-br-[8px] rounded-tl-[26px] rounded-tr-[26px]"
        } ${isOpen ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
      >
        {/* Thin gold trim along the top edge — a quiet "premium" cue
            instead of a loud one. */}
        <div className="h-[3px] shrink-0 bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden="true" />

        {/* HEADER */}
        <div
          className={`relative shrink-0 overflow-hidden bg-gradient-to-br from-forest to-night text-cream ${
            compact
              ? "pb-4 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] pt-[calc(env(safe-area-inset-top)+1rem)]"
              : "px-5 py-4"
          }`}
        >
          <PeaksMotif className="absolute inset-x-0 bottom-0 h-full w-full text-cream/[0.06]" />
          <span className="chat-grain" aria-hidden="true" />
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <LogoBadge box={44} mark={30} ring />
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gold/80">
                  Your travel concierge
                </p>
                <p className="truncate font-serif text-[15px] leading-tight text-cream">
                  Discover Gilgit-Baltistan
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] text-cream/60">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
                  </span>
                  Usually replies in a few minutes
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={closeChat}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-cream/70 transition-colors sm:h-8 sm:w-8 pointer-coarse:h-11 pointer-coarse:w-11 hover:bg-cream/10 hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <CloseIcon size={16} />
            </button>
          </div>
        </div>

        {/* Ticket-stub seam — two punched notches and a dashed
            perforation line where the header meets the conversation,
            echoing a boarding pass rather than a generic panel divider. */}
        <div className="relative z-10 h-0" aria-hidden="true">
          <span className="absolute -top-[7px] left-0 h-[14px] w-[14px] -translate-x-1/2 rounded-full bg-white" />
          <span className="absolute -top-[7px] right-0 h-[14px] w-[14px] translate-x-1/2 rounded-full bg-white" />
          <span className="absolute inset-x-3 top-0 border-t border-dashed border-forest/15" />
        </div>

        {/* MESSAGE LIST — a real backdrop instead of a flat fill: a
            golden-hour peak from the site's own tour photography, tinted
            and washed with the cream color so it reads as a quiet keepsake
            behind the conversation rather than a busy photo. */}
        <div className="relative min-h-0 flex-1 overflow-hidden bg-[#fbf8f2]">
          <Image
            src="/Images/tours/cones-lit-amber-at-sunset.png"
            alt=""
            aria-hidden
            fill
            sizes="400px"
            className="object-cover object-[center_35%] opacity-[0.5] sepia-[.35] saturate-[.85]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fbf8f2]/45 via-[#fbf8f2]/65 to-[#fbf8f2]/90"
          />
          <div
            ref={scrollRef}
            className={`chat-scroll relative h-full space-y-3 overflow-y-auto overscroll-contain py-4 ${
              compact ? "pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]" : "px-4"
            }`}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-bubble-in flex items-end gap-2 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "bot" && <LogoBadge box={28} mark={19} />}
                <div
                  className={`${
                    compact ? "max-w-[min(85%,32rem)]" : "max-w-[78%]"
                  } min-w-0 whitespace-pre-line rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed [overflow-wrap:anywhere] ${
                    message.role === "user"
                      ? "rounded-br-sm bg-gradient-to-br from-green to-green-dark text-cream shadow-[0_4px_14px_-2px_rgba(31,106,76,0.35)]"
                      : "rounded-bl-sm border border-forest/[0.04] bg-white text-forest shadow-[0_2px_8px_rgba(20,35,31,0.06)]"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && <TypingBubble />}

            {showQuickReplies && messages.length > 0 && !isTyping && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => appendUserMessage(label)}
                    className="group flex items-center gap-1.5 rounded-full border border-forest/15 bg-white px-3.5 py-2 pointer-coarse:min-h-11 text-[12.5px] font-medium text-forest shadow-[0_1px_4px_rgba(20,35,31,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-green/50 hover:bg-green/5 hover:shadow-[0_4px_10px_rgba(20,35,31,0.1)] motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <span className="text-muted transition-colors group-hover:text-green">
                      <ChipArrowIcon />
                    </span>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* INPUT BAR */}
        <form
          onSubmit={handleSubmit}
          className={`flex shrink-0 items-center gap-2 border-t border-forest/10 bg-white pt-3 ${
            compact
              ? `pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] ${
                  // The home-indicator inset only applies while the keyboard is down.
                  keyboardOpen ? "pb-3" : "pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
                }`
              : "px-3 pb-3"
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Type your message…"
            aria-label="Type your message"
            autoComplete="off"
            enterKeyHint="send"
            className="min-w-0 w-full rounded-full border border-forest/15 bg-cream/40 px-4 py-2.5 font-sans text-sm pointer-coarse:text-base text-forest placeholder:text-muted/60 outline-none transition-colors focus:border-green/50 focus:ring-4 focus:ring-green/10"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!draft.trim()}
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green to-green-dark text-cream pointer-coarse:h-11 pointer-coarse:w-11 shadow-[0_4px_12px_-2px_rgba(31,106,76,0.4)] transition-all duration-200 hover:scale-105 hover:shadow-[0_6px_16px_-2px_rgba(31,106,76,0.5)] active:scale-95 disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <span className="inline-flex transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:-rotate-12 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:rotate-0">
              <SendIcon size={16} />
            </span>
          </button>
        </form>
      </div>
    </>
  );
}
