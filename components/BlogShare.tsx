"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, MailIcon } from "./ui/icons";

/**
 * Minimal share row: copy link plus a handful of plain share links, in the
 * round icon-button style the footer's social icons use. No third-party
 * scripts — each button is just a link (or a clipboard write).
 */

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.8 20.5l4.4-1.2A8.4 8.4 0 1 0 12 3.5Z" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9 9.6c.1-.6.6-.6 1-.6h.5c.3 0 .5.1.6.4l.6 1.4c.1.2 0 .5-.1.6l-.5.6c-.1.1-.1.3 0 .4.4.9 1.2 1.7 2.1 2.1.1.1.3.1.4 0l.6-.5c.2-.1.4-.2.6-.1l1.4.6c.3.1.4.3.4.6v.5c0 .4 0 .9-.6 1-1 .2-2.4 0-4.2-1.2-1.5-1-2.4-2.2-2.9-3.4-.5-1.1-.5-2-.4-2.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.5 21v-7.2h2.4l.4-2.8h-2.8V9.1c0-.8.2-1.4 1.4-1.4h1.5V5.2C16.9 5.1 15.9 5 14.8 5c-2.5 0-4.2 1.5-4.2 4.3v2.7H8.2v2.8h2.4V21h3.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4l16 16M20 4 4 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const BUTTON =
  "flex h-10 w-10 items-center justify-center rounded-full border border-forest/15 text-forest/60 transition-all duration-200 hover:border-green/40 hover:bg-green/10 hover:text-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

export default function BlogShare({ url, title }: { url: string; title: string }) {
  // Start from the canonical URL so the server-rendered links are valid, then
  // switch to the address actually in the browser (covers previews and staging).
  const [href, setHref] = useState(url);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setHref(`${window.location.origin}${window.location.pathname}`);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(href);
    } catch {
      const field = document.createElement("textarea");
      field.value = href;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      try {
        document.execCommand("copy");
      } catch {
        // Nothing more to try — the share links beside it still work.
      }
      document.body.removeChild(field);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  }

  const encodedUrl = encodeURIComponent(href);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, Icon: WhatsAppIcon },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, Icon: FacebookIcon },
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, Icon: XIcon },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Share this article</p>
      <div className="flex items-center gap-2.5">
        <button type="button" onClick={copy} aria-label="Copy link" className={BUTTON}>
          {copied ? <CheckIcon size={16} /> : <LinkIcon />}
        </button>
        {links.map(({ label, href: target, Icon }) => (
          <a key={label} href={target} aria-label={label} target="_blank" rel="noopener noreferrer" className={BUTTON}>
            <Icon />
          </a>
        ))}
        <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`} aria-label="Share by email" className={BUTTON}>
          <MailIcon size={16} />
        </a>
      </div>
      <span role="status" aria-live="polite" className="text-xs font-medium text-green">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
