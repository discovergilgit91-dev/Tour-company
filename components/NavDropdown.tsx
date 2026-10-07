"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import { ArrowIcon, ChevronDownIcon } from "./ui/icons";
import type { NavMenu } from "@/lib/navMenus";

const CLOSE_DELAY_MS = 180;

/**
 * Desktop header dropdown. Whether it is open is owned by the header (a single
 * `openMenu` id there), so opening one dropdown closes the other.
 *
 * - Mouse: opens on hover, closes shortly after the pointer leaves the trigger
 *   *and* panel (the panel sits flush under the trigger, so there's no gap to
 *   cross; the delay covers clumsy diagonal moves).
 * - Touch / keyboard: the trigger is a disclosure button — tap or Enter/Space
 *   toggles; ArrowDown opens and moves into the list; Up/Down/Home/End move
 *   between items; Escape closes and returns focus to the trigger.
 * - Closes on outside click, on Tab leaving, and on choosing a link.
 *
 * Panel styling mirrors AccountMenu (rounded-2xl white card, same shadow/ring
 * and item hover) so the header's two menu styles stay consistent.
 */
export default function NavDropdown({
  menu,
  open,
  onOpenChange,
  toneClassName,
  activeClassName,
}: {
  menu: NavMenu;
  open: boolean;
  onOpenChange: (next: boolean) => void;
  /** Trigger text color, matched to the header's current tone. */
  toneClassName: string;
  /** Trigger text color while its panel is open. */
  activeClassName: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPointerType = useRef<string>("");
  const focusOnOpen = useRef<"first" | null>(null);
  const panelId = useId();

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => onOpenChange(false), CLOSE_DELAY_MS);
  }

  useEffect(() => cancelClose, []);

  // Outside click / Escape — only listening while open, like AccountMenu.
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) onOpenChange(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onOpenChange(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
    // onOpenChange is recreated by the parent every render; only `open` matters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // After ArrowDown opens the panel, move focus to its first link. Deferred a
  // frame so the panel has been painted visible first (a hidden element can't
  // take focus). The card only transitions opacity/transform on purpose: a
  // `transition-all` would also animate the inherited `visibility`, leaving the
  // links unfocusable for the first moments after opening.
  useEffect(() => {
    if (!open || focusOnOpen.current !== "first") {
      focusOnOpen.current = null;
      return;
    }
    focusOnOpen.current = null;
    const frame = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [open]);

  function links() {
    return Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
  }

  function handleTriggerClick(event: React.MouseEvent) {
    // A real mouse click on a trigger that hover has already opened should
    // keep it open rather than flick it shut; touch and keyboard toggle.
    const fromMouse = lastPointerType.current === "mouse" && event.detail > 0;
    onOpenChange(fromMouse ? true : !open);
  }

  function handleTriggerKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (open) links()[0]?.focus();
      else {
        focusOnOpen.current = "first";
        onOpenChange(true);
      }
    }
  }

  function handlePanelKeyDown(event: React.KeyboardEvent) {
    const items = links();
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);
    let next = -1;
    if (event.key === "ArrowDown") next = (index + 1) % items.length;
    else if (event.key === "ArrowUp") next = index <= 0 ? items.length - 1 : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    if (next >= 0) {
      event.preventDefault();
      items[next]?.focus();
    }
  }

  function handleBlur(event: React.FocusEvent) {
    // Tabbing out of the whole dropdown closes it.
    if (event.relatedTarget && !rootRef.current?.contains(event.relatedTarget as Node)) onOpenChange(false);
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        cancelClose();
        onOpenChange(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") scheduleClose();
      }}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onPointerDown={(event) => {
          lastPointerType.current = event.pointerType;
        }}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        className={`flex items-center gap-1 whitespace-nowrap font-sans text-[12px] xl:text-[13px] font-medium transition-colors ${open ? activeClassName : toneClassName}`}
      >
        {menu.label}
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <ChevronDownIcon size={13} />
        </span>
      </button>

      {/* Outer layer is a transparent bridge (pt-3) so the pointer never
          crosses a dead gap between trigger and card. */}
      <div
        id={panelId}
        ref={panelRef}
        onKeyDown={handlePanelKeyDown}
        className={`absolute left-1/2 top-full z-[60] -translate-x-1/2 pt-3 ${
          open ? "pointer-events-auto" : "pointer-events-none invisible"
        }`}
      >
        <div
          className={`w-80 origin-top overflow-hidden rounded-2xl bg-white p-2 shadow-[0_28px_60px_-20px_rgba(7,23,25,0.32),0_4px_14px_-4px_rgba(7,23,25,0.08)] ring-1 ring-forest/[0.06] transition-[opacity,transform] duration-[260ms] ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none ${
            open ? "translate-y-0 scale-100 opacity-100" : "-translate-y-1.5 scale-[0.97] opacity-0"
          }`}
        >
          <p className="px-3.5 pb-1.5 pt-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted/70">
            {menu.eyebrow}
          </p>

          <ul>
            {menu.items.map((item, index) => (
              <li
                key={item.href}
                style={{ transitionDelay: open ? `${60 + index * 28}ms` : "0ms" }}
                className={`transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
                  open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                }`}
              >
                <Link
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className="group relative flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 transition-colors duration-200 hover:bg-gold/[0.09] focus-visible:bg-gold/[0.09] focus-visible:outline-none"
                >
                  {/* gold accent that grows in on hover / keyboard focus */}
                  <span
                    aria-hidden
                    className="absolute bottom-2.5 left-0 top-2.5 w-[3px] origin-center scale-y-0 rounded-full bg-gold transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none"
                  />
                  <span className="min-w-0 transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none">
                    <span className="block text-sm font-medium leading-snug text-forest/85 transition-colors group-hover:text-forest">
                      {item.label}
                    </span>
                    {item.detail && <span className="mt-0.5 block truncate text-xs text-muted">{item.detail}</span>}
                  </span>
                  <span className="shrink-0 -translate-x-1 text-gold opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
                    <ArrowIcon size={13} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* "View all" sits on its own tinted strip so it reads as a
              secondary, closing action rather than another list item. */}
          <div className="-mx-2 -mb-2 mt-2 border-t border-forest/[0.08] bg-cream/70 p-2">
            <Link
              href={menu.viewAll.href}
              onClick={() => onOpenChange(false)}
              className="group flex items-center justify-between rounded-xl px-3.5 py-2 text-[13px] font-medium text-forest/60 transition-colors duration-200 hover:bg-white hover:text-forest focus-visible:bg-white focus-visible:text-forest focus-visible:outline-none"
            >
              {menu.viewAll.label}
              <span className="text-gold transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none">
                <ArrowIcon size={14} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
