"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { PeakMark } from "./ui/Logo";

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

/**
 * ---------------------------------------------------------------------
 * STUB — this is the single place the real n8n webhook call goes.
 * Swap the setTimeout below for a fetch() to the webhook, await the
 * real reply, and call onReply with its text instead of the canned one.
 * ---------------------------------------------------------------------
 */
function sendMessageToBot(userText: string, onReply: (replyText: string) => void) {
  const delay = 900 + Math.random() * 700;
  setTimeout(() => {
    onReply(
      `Thanks for asking about "${userText}" — once this is connected, a guide will answer here directly. In the meantime, take a look at our destinations or tours pages!`
    );
  }, delay);
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

function BotAvatar() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest/[0.06] text-green">
      <PeakMark className="h-3.5 w-3.5" />
    </span>
  );
}

function TypingBubble() {
  return (
    <div className="chat-bubble-in flex items-end gap-2">
      <BotAvatar />
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-cream px-4 py-3.5">
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

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Invite dot only needs to catch a first-time visitor's eye — fade it
  // out on its own after a few seconds even if they never click it.
  useEffect(() => {
    const timer = setTimeout(() => setShowInvite(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to whatever was just added (a message, or the typing bubble).
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  // Escape closes the window; focus lands in the input as soon as it opens.
  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 50);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeChat();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    sendMessageToBot(trimmed, (replyText) => {
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
      <button
        ref={launcherRef}
        type="button"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        onClick={() => (isOpen ? closeChat() : openChat())}
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] right-5 z-[90] flex h-16 w-16 items-center justify-center rounded-full bg-green text-cream shadow-[0_10px_30px_-6px_rgba(7,23,25,0.5)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-green-dark active:scale-95 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:right-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 motion-reduce:transition-none ${
            isOpen ? "scale-0 rotate-45 opacity-0" : "scale-100 rotate-0 opacity-100"
          }`}
        >
          <PeakMark className="h-6 w-6" />
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 motion-reduce:transition-none ${
            isOpen ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-45 opacity-0"
          }`}
        >
          <CloseIcon size={22} />
        </span>

        {showInvite && !isOpen && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-cream bg-gold" />
          </span>
        )}
      </button>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Discover Gilgit-Baltistan"
        aria-hidden={!isOpen}
        className={`chat-window fixed inset-0 z-[90] flex flex-col overflow-hidden rounded-none bg-white shadow-[0_24px_60px_-12px_rgba(7,23,25,0.45)] transition-all duration-300 ease-out motion-reduce:transition-none sm:inset-auto sm:bottom-[calc(env(safe-area-inset-bottom)+6rem)] sm:right-6 sm:h-[600px] sm:max-h-[calc(100svh-120px)] sm:w-[380px] sm:rounded-[22px] ${
          isOpen ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between gap-3 bg-forest px-5 py-4 text-cream">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream/10 text-gold">
              <PeakMark className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-serif text-[15px] leading-tight text-cream">
                Discover Gilgit-Baltistan
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-[11px] text-cream/60">
                <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
                Usually replies in a few minutes
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close chat"
            onClick={closeChat}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        {/* MESSAGE LIST */}
        <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-bubble-in flex items-end gap-2 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "bot" && <BotAvatar />}
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
                  message.role === "user" ? "rounded-br-sm bg-green text-cream" : "rounded-bl-sm bg-cream text-forest"
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
                  className="rounded-full border border-forest/15 bg-white px-3.5 py-2 text-[12.5px] font-medium text-forest transition-colors duration-200 hover:border-green/50 hover:bg-green/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INPUT BAR */}
        <form onSubmit={handleSubmit} className="flex shrink-0 items-center gap-2 border-t border-forest/10 bg-white px-3 py-3">
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Type your message…"
            aria-label="Type your message"
            className="w-full rounded-full border border-forest/15 bg-cream/40 px-4 py-2.5 font-sans text-sm text-forest placeholder:text-muted/60 outline-none transition-colors focus:border-green/50 focus:ring-4 focus:ring-green/10"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!draft.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green text-cream transition-all duration-200 hover:bg-green-dark disabled:pointer-events-none disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <SendIcon size={16} />
          </button>
        </form>
      </div>
    </>
  );
}
