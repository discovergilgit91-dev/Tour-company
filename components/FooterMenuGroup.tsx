"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowIcon, ChevronDownIcon } from "./ui/icons";
import type { NavMenuItem, NavRegion } from "@/lib/navMenus";

/**
 * One group of a header dropdown (a region, a month…) in the footer: the group
 * name links to its page and its places/tours are listed under it. From lg
 * every group is simply open; below that each one is an accordion, so the long
 * lists don't push the rest of the footer a screen further down.
 */
export default function FooterMenuGroup({ group, showDetail = false }: { group: NavRegion; showDetail?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="break-inside-avoid border-b border-cream/[0.08] lg:border-b-0 lg:pb-5">
      {/* Mobile / tablet: the row that opens the accordion. */}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-11 w-full items-center justify-between gap-3 text-left text-[0.8125rem] text-cream/80 transition-colors hover:text-cream lg:hidden"
      >
        <span>
          {group.label} <span className="text-[0.6875rem] text-cream/40">· {group.detail}</span>
        </span>
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <ChevronDownIcon />
        </span>
      </button>

      {/* Desktop: the group name is a plain heading link. */}
      <Link
        href={group.href}
        className="hidden items-baseline gap-2 text-[0.8125rem] font-medium text-cream/90 transition-colors hover:text-gold lg:flex"
      >
        {group.label}
        <span className="text-[0.6875rem] font-normal text-cream/40">{group.detail}</span>
      </Link>

      <ul className={`${open ? "block" : "hidden"} pb-2 lg:mt-2 lg:block lg:space-y-1.5 lg:pb-0`}>
        {group.items.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <FooterMenuLink item={item} showDetail={showDetail} />
          </li>
        ))}
        {group.viewAll && (
          <li className="lg:hidden">
            <Link
              href={group.viewAll.href}
              className="flex min-h-11 items-center gap-2 text-[0.8125rem] font-medium text-gold"
            >
              {group.viewAll.label}
              <ArrowIcon />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

function FooterMenuLink({ item, showDetail }: { item: NavMenuItem; showDetail: boolean }) {
  return (
    <Link
      href={item.href}
      className="flex min-h-11 flex-col justify-center pl-3 text-[0.8125rem] leading-snug text-cream/60 transition-colors hover:text-cream lg:min-h-0 lg:pl-0"
    >
      {item.label}
      {showDetail && item.detail && <span className="mt-0.5 text-[0.6875rem] text-cream/35">{item.detail}</span>}
    </Link>
  );
}
