"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOut } from "@/app/auth/actions";
import { ChevronDownIcon } from "./ui/icons";

export default function AccountMenu({
  displayName,
  email,
  initials,
  toneClassName = "text-forest/75",
}: {
  displayName: string;
  email: string;
  initials: string;
  /** Chevron color, matched to the header's current text tone (cream over a
      photo vs. forest once the header goes solid). */
  toneClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-forest to-night text-xs font-semibold uppercase tracking-wide text-gold ring-1 ring-gold/30">
          {initials}
        </span>
        <span className={`transition-transform duration-200 ${toneClassName} ${open ? "rotate-180" : ""}`}>
          <ChevronDownIcon size={14} />
        </span>
      </button>

      <div
        role="menu"
        aria-label="Account"
        className={`absolute right-0 top-full z-[60] mt-3 w-64 origin-top-right rounded-2xl bg-white p-2 shadow-[0_20px_45px_-12px_rgba(7,23,25,0.35)] ring-1 ring-black/5 transition-all duration-200 ease-out motion-reduce:transition-none ${
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="border-b border-forest/10 px-3 py-3">
          <p className="truncate font-serif text-base leading-tight text-forest">{displayName}</p>
          <p className="mt-0.5 truncate text-xs text-muted">{email}</p>
        </div>

        <div className="py-1.5">
          <Link
            href="/account"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-2 text-sm text-forest/80 transition-colors hover:bg-forest/5 hover:text-forest"
          >
            My Account
          </Link>
          <Link
            href="/account/trip-requests"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-2 text-sm text-forest/80 transition-colors hover:bg-forest/5 hover:text-forest"
          >
            My Trip Requests
          </Link>
        </div>

        <div className="border-t border-forest/10 pt-1.5">
          <form action={signOut}>
            <button
              type="submit"
              role="menuitem"
              className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-forest transition-colors hover:bg-forest/5"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
