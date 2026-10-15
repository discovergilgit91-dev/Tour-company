import type { ReactElement } from "react";
import type { DistrictIconId } from "@/lib/districts";
import { BloomIcon, DropIcon, FortIcon, PawIcon, PeakIcon, SnowIcon, SunIcon } from "../tours/statIcons";

/**
 * Icons for the "Why visit" cards, looked up by the id used in lib/districts.ts.
 * Most reuse the tour pages' line icons; the three below are new but drawn the
 * same way (24px grid, 1.5–1.6 stroke, currentColor).
 */

function HospitalityIcon({ size = 20 }: { size?: number }) {
  // A cup with steam — the welcome cup of tea.
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 10h11v4.5a4.5 4.5 0 0 1-4.5 4.5h-2A4.5 4.5 0 0 1 5 14.5V10Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8.5 3.5c-1 1 1 2 0 3M12 3.5c-1 1 1 2 0 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function FoodIcon({ size = 20 }: { size?: number }) {
  // A bowl with a spoon.
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 11h17a8.5 8.5 0 0 1-8.5 8.5A8.5 8.5 0 0 1 3.5 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 7.5c0-1.5 1.5-1.5 1.5-3M13.5 7.5c0-1.5 1.5-1.5 1.5-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CultureIcon({ size = 20 }: { size?: number }) {
  // A mask-like emblem: arch over a diamond.
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20V10a8 8 0 0 1 16 0v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 8.5 15 13l-3 4.5L9 13l3-4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export const DISTRICT_ICONS: Record<DistrictIconId, (props: { size?: number }) => ReactElement> = {
  mountain: PeakIcon,
  fort: FortIcon,
  hospitality: HospitalityIcon,
  water: DropIcon,
  blossom: BloomIcon,
  food: FoodIcon,
  wildlife: PawIcon,
  snow: SnowIcon,
  sun: SunIcon,
  culture: CultureIcon,
};
