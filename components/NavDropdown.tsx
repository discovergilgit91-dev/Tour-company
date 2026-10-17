"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowIcon, ChevronDownIcon } from "./ui/icons";
import type { NavMenu, NavMenuItem } from "@/lib/navMenus";

const CLOSE_DELAY_MS = 180;
// A region only opens its flyout once the pointer has rested on it this long,
// so sweeping diagonally across other rows toward the flyout doesn't switch it.
const REGION_HOVER_DELAY_MS = 150;
// Flyout card (w-72) + the transparent bridge between it and the dropdown (pl-3/pr-3).
const FLYOUT_SPACE_PX = 288 + 12;
const VIEWPORT_MARGIN_PX = 16;

const CARD_CLASSES =
  "overflow-hidden rounded-2xl bg-white p-2 shadow-[0_1.75rem_3.75rem_-1.25rem_rgba(7,23,25,0.32),0_0.25rem_0.875rem_-0.25rem_rgba(7,23,25,0.08)] ring-1 ring-forest/[0.06]";

/**
 * One dropdown / flyout row: label, optional muted detail line, a gold accent
 * on the left and an arrow that slide in on hover or keyboard focus. `active`
 * holds that same look (used for the region whose flyout is open).
 */
function Row({
  item,
  active = false,
  ...linkProps
}: { item: NavMenuItem; active?: boolean } & Omit<React.ComponentProps<typeof Link>, "href" | "children" | "className">) {
  return (
    <Link
      href={item.href}
      {...linkProps}
      className={`group relative flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 transition-colors duration-200 hover:bg-gold/[0.09] focus-visible:bg-gold/[0.09] focus-visible:outline-none ${
        active ? "bg-gold/[0.09]" : ""
      }`}
    >
      {/* gold accent that grows in on hover / keyboard focus */}
      <span
        aria-hidden
        className={`absolute bottom-2.5 left-0 top-2.5 w-[0.1875rem] origin-center rounded-full bg-gold transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none ${
          active ? "scale-y-100" : "scale-y-0"
        }`}
      />
      <span
        className={`min-w-0 transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none ${
          active ? "translate-x-1" : ""
        }`}
      >
        <span
          className={`block text-sm font-medium leading-snug transition-colors group-hover:text-forest ${
            active ? "text-forest" : "text-forest/85"
          }`}
        >
          {item.label}
        </span>
        {item.detail && <span className="mt-0.5 block truncate text-xs text-muted">{item.detail}</span>}
      </span>
      <span
        className={`shrink-0 text-gold transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none ${
          active ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
        }`}
      >
        <ArrowIcon size={13} />
      </span>
    </Link>
  );
}

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
 * A menu with `sections` is two-level: the dropdown lists groups (regions,
 * months…), and hovering (or Right arrow / Enter on) one opens a flyout of its
 * items beside
 * the dropdown — on the right, or the left when there isn't room. The flyout
 * opens after a short hover delay, and a transparent bridge joins it to the
 * dropdown so the pointer can cross the gap. On touch, the first tap on a
 * region opens its flyout and a second tap goes to the region page. Arrow Up /
 * Down move within a list, Left arrow or Escape closes the flyout. (Phones use
 * an accordion instead — see HeaderClient.)
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

  const sections = menu.sections;
  // Every group across all sections — each one owns a flyout.
  const regions = sections?.flatMap((section) => section.groups);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [flip, setFlip] = useState(false);
  const regionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusFlyoutOf = useRef<string | null>(null);

  function clearRegionTimer() {
    if (regionTimer.current) clearTimeout(regionTimer.current);
    regionTimer.current = null;
  }

  function activateRegionAfterDelay(id: string) {
    clearRegionTimer();
    regionTimer.current = setTimeout(() => setActiveRegion(id), REGION_HOVER_DELAY_MS);
  }

  function openRegionWithKeyboard(id: string) {
    clearRegionTimer();
    focusFlyoutOf.current = id;
    setActiveRegion(id);
  }

  function closeFlyoutAndFocusRegion(id: string) {
    clearRegionTimer();
    setActiveRegion(null);
    panelRef.current?.querySelector<HTMLAnchorElement>(`[data-region-link="${id}"]`)?.focus();
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => onOpenChange(false), CLOSE_DELAY_MS);
  }

  useEffect(() => cancelClose, []);
  useEffect(() => clearRegionTimer, []);

  // Closing the dropdown also closes any flyout.
  useEffect(() => {
    if (!open) {
      clearRegionTimer();
      setActiveRegion(null);
    }
  }, [open]);

  // Open the flyout on the left when the right edge of the screen is too close.
  useEffect(() => {
    if (!open || !regions) return;
    function measure() {
      const rect = panelRef.current?.getBoundingClientRect();
      if (!rect) return;
      // the flyout is rem-wide, so its pixel width follows the root font size (80% on laptop screens)
      const scale = parseFloat(getComputedStyle(document.documentElement).fontSize) / 16 || 1;
      const spaceRight = window.innerWidth - rect.right - VIEWPORT_MARGIN_PX;
      const spaceLeft = rect.left - VIEWPORT_MARGIN_PX;
      setFlip(spaceRight < FLYOUT_SPACE_PX * scale && spaceLeft > spaceRight);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open, regions]);

  // After a keyboard open (Right arrow / Enter), move focus into the flyout once it's visible.
  useEffect(() => {
    if (!activeRegion || focusFlyoutOf.current !== activeRegion) return;
    focusFlyoutOf.current = null;
    const frame = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLAnchorElement>(`[data-flyout-link="${activeRegion}"]`)?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [activeRegion]);

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

  // The dropdown's own links — not the ones inside a flyout.
  function links() {
    return Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a:not([data-flyout-link])") ?? []);
  }

  function flyoutLinks(regionId: string) {
    return Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>(`[data-flyout-link="${regionId}"]`) ?? []);
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
    const current = document.activeElement as HTMLElement | null;
    if (!current) return;

    const inFlyout = current.getAttribute("data-flyout-link");
    const regionLink = current.getAttribute("data-region-link");
    const items = inFlyout ? flyoutLinks(inFlyout) : links();
    const index = items.indexOf(current as HTMLAnchorElement);

    // Inside a flyout: Left arrow / Escape close it and hand focus back to its region.
    if (inFlyout && (event.key === "ArrowLeft" || event.key === "Escape")) {
      event.preventDefault();
      event.stopPropagation();
      closeFlyoutAndFocusRegion(inFlyout);
      return;
    }

    if (regionLink) {
      // Right arrow / Enter open the flyout (Enter doesn't follow the link — the
      // flyout's "View all in …" row is the keyboard route to the region page).
      if (event.key === "ArrowRight" || event.key === "Enter") {
        event.preventDefault();
        openRegionWithKeyboard(regionLink);
        return;
      }
      if ((event.key === "ArrowLeft" || event.key === "Escape") && activeRegion) {
        event.preventDefault();
        event.stopPropagation();
        clearRegionTimer();
        setActiveRegion(null);
        return;
      }
    }

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
        className={`flex items-center gap-1 whitespace-nowrap font-sans text-[0.75rem] xl:text-[0.8125rem] font-medium transition-colors ${open ? activeClassName : toneClassName}`}
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
        onPointerDownCapture={(event) => {
          lastPointerType.current = event.pointerType;
        }}
        className={`absolute left-1/2 top-full z-[60] -translate-x-1/2 pt-3 ${
          open ? "pointer-events-auto" : "pointer-events-none invisible"
        }`}
      >
        {/* Positioning context for the flyouts: they hang off the card's top edge. */}
        <div className="relative">
          <div
            className={`w-80 origin-top ${CARD_CLASSES} transition-[opacity,transform] duration-[260ms] ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none ${
              open ? "translate-y-0 scale-100 opacity-100" : "-translate-y-1.5 scale-[0.97] opacity-0"
            }`}
          >
            {!sections?.[0]?.eyebrow && (
              <p className="px-3.5 pb-1.5 pt-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted/70">
                {menu.eyebrow}
              </p>
            )}

            {sections ? (
              sections.map((section, sectionIndex) => {
                const offset = sections.slice(0, sectionIndex).reduce((count, previous) => count + previous.groups.length, 0);
                return (
                  <div key={sectionIndex}>
                    {section.eyebrow && (
                      <p
                        className={`px-3.5 pb-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted/70 ${
                          sectionIndex > 0 ? "mt-2 border-t border-forest/[0.08] pt-3.5" : "pt-2.5"
                        }`}
                      >
                        {section.eyebrow}
                      </p>
                    )}

                    {section.groups.length === 0 ? (
                      section.emptyText && <p className="px-3.5 pb-2 pt-1 text-sm text-muted">{section.emptyText}</p>
                    ) : (
                      <ul>
                        {section.groups.map((region, groupIndex) => {
                          const isActive = activeRegion === region.id;
                          return (
                            <li
                              key={region.id}
                              style={{ transitionDelay: open ? `${60 + (offset + groupIndex) * 28}ms` : "0ms" }}
                              className={`transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
                                open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                              }`}
                            >
                              <Row
                                item={{ href: region.href, label: region.label, detail: region.detail }}
                                active={isActive}
                                data-region-link={region.id}
                                aria-haspopup="true"
                                aria-expanded={isActive}
                                aria-controls={`${panelId}-${region.id}`}
                                onPointerEnter={(event) => {
                                  if (event.pointerType === "mouse") activateRegionAfterDelay(region.id);
                                }}
                                onPointerLeave={(event) => {
                                  // Left before the delay ran out (e.g. passing over on the way to the flyout): don't switch.
                                  if (event.pointerType === "mouse") clearRegionTimer();
                                }}
                                onFocus={() => {
                                  if (activeRegion && activeRegion !== region.id) setActiveRegion(null);
                                }}
                                onClick={(event) => {
                                  // On touch there is no hover: the first tap opens the flyout, the second follows the link.
                                  const touch = lastPointerType.current === "touch" || lastPointerType.current === "pen";
                                  if (touch && !isActive) {
                                    event.preventDefault();
                                    setActiveRegion(region.id);
                                    return;
                                  }
                                  onOpenChange(false);
                                }}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })
            ) : (
              <ul>
                {menu.items.map((item, index) => (
                  <li
                    key={item.href}
                    style={{ transitionDelay: open ? `${60 + index * 28}ms` : "0ms" }}
                    className={`transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
                      open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                    }`}
                  >
                    <Row item={item} onClick={() => onOpenChange(false)} />
                  </li>
                ))}
              </ul>
            )}

            {/* "View all" sits on its own tinted strip so it reads as a
                secondary, closing action rather than another list item. */}
            <div className="-mx-2 -mb-2 mt-2 border-t border-forest/[0.08] bg-cream/70 p-2">
              <Link
                href={(menu.dropdownViewAll ?? menu.viewAll).href}
                onClick={() => onOpenChange(false)}
                onFocus={() => setActiveRegion(null)}
                className="group flex items-center justify-between rounded-xl px-3.5 py-2 text-[0.8125rem] font-medium text-forest/60 transition-colors duration-200 hover:bg-white hover:text-forest focus-visible:bg-white focus-visible:text-forest focus-visible:outline-none"
              >
                {(menu.dropdownViewAll ?? menu.viewAll).label}
                <span className="text-gold transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none">
                  <ArrowIcon size={14} />
                </span>
              </Link>
            </div>
          </div>

          {/* Flyouts — one per region, stacked in the same spot so switching regions crossfades.
              The padding on the side facing the dropdown is the invisible bridge. */}
          {regions?.map((region) => {
            const isActive = open && activeRegion === region.id;
            return (
              <div
                key={region.id}
                id={`${panelId}-${region.id}`}
                role="group"
                aria-label={`${region.label} — ${region.detail}`}
                onPointerEnter={clearRegionTimer}
                className={`absolute top-0 z-10 ${flip ? "right-full pr-3" : "left-full pl-3"} ${
                  isActive ? "pointer-events-auto" : "pointer-events-none invisible"
                }`}
              >
                <div
                  className={`w-72 ${CARD_CLASSES} transition-[opacity,transform] duration-[220ms] ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none ${
                    isActive ? "translate-x-0 opacity-100" : flip ? "translate-x-1.5 opacity-0" : "-translate-x-1.5 opacity-0"
                  }`}
                >
                  <p className="px-3.5 pb-1.5 pt-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted/70">
                    {region.label}
                  </p>

                  {/* Long regions scroll inside the card instead of running off short screens. */}
                  <ul className="max-h-[min(60vh,26rem)] overflow-y-auto overscroll-contain">
                    {region.items.map((item) => (
                      <li key={item.label}>
                        <Row item={item} data-flyout-link={region.id} onClick={() => onOpenChange(false)} />
                      </li>
                    ))}
                  </ul>

                  {region.viewAll && (
                    <div className="-mx-2 -mb-2 mt-2 border-t border-forest/[0.08] bg-cream/70 p-2">
                      <Link
                        href={region.viewAll.href}
                        data-flyout-link={region.id}
                        onClick={() => onOpenChange(false)}
                        className="group flex items-center justify-between rounded-xl px-3.5 py-2 text-[0.8125rem] font-medium text-forest/60 transition-colors duration-200 hover:bg-white hover:text-forest focus-visible:bg-white focus-visible:text-forest focus-visible:outline-none"
                      >
                        {region.viewAll.label}
                        <span className="text-gold transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none">
                          <ArrowIcon size={14} />
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
