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
}: {
  menu: NavMenu;
  open: boolean;
  onOpenChange: (next: boolean) => void;
  /** Trigger text color, matched to the header's current tone. */
  toneClassName: string;
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
        className={`flex items-center gap-1 font-sans text-[13px] font-medium transition-colors ${toneClassName}`}
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
          className={`w-72 origin-top rounded-2xl bg-white p-2 shadow-[0_20px_45px_-12px_rgba(7,23,25,0.35)] ring-1 ring-black/5 transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
            open ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <ul className="py-0.5">
            {menu.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className="block rounded-xl px-3 py-2 transition-colors hover:bg-forest/5 focus-visible:bg-forest/5 focus-visible:outline-none"
                >
                  <span className="block text-sm text-forest/80">{item.label}</span>
                  {item.detail && <span className="mt-0.5 block text-xs text-muted">{item.detail}</span>}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-1.5 border-t border-forest/10 pt-1.5">
            <Link
              href={menu.viewAll.href}
              onClick={() => onOpenChange(false)}
              className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-forest transition-colors hover:bg-forest/5 focus-visible:bg-forest/5 focus-visible:outline-none"
            >
              {menu.viewAll.label}
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                <ArrowIcon size={13} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
