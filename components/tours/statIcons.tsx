/* ---------------------------------------------------------------------
   Small (≈17px) line icons used in tour detail pages' stat-strip
   badges. Kept separate from the big decorative motifs in motifs.tsx —
   these are compact enough to sit inside a 40px circle badge.

   Stat data (lib/tourDetails.ts) references these by string id rather
   than by component reference — a Server Component route passes that
   data to a Client Component, and bare function references can't cross
   that boundary, only serializable data. UsersIcon lives in ui/icons.tsx
   and is looked up here too so every stat icon resolves the same way.
   --------------------------------------------------------------------- */

import { UsersIcon } from "@/components/ui/icons";

export function BloomIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="2.4" fill="currentColor" />
      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const cx = 12 + Math.cos(angle) * 5.6;
        const cy = 12 + Math.sin(angle) * 5.6;
        return <circle key={i} cx={cx} cy={cy} r="3" stroke="currentColor" strokeWidth="1.4" />;
      })}
    </svg>
  );
}

export function PeakIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 18.5 9 8l3.5 5.5L15 10l6 8.5H3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 8 10.5 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function OrchardIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21v-7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3v3.2M8.2 5.4l1.4 2M15.8 5.4l-1.4 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function SnowIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2v20M4 7l16 10M20 7 4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function FortIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 21V11h2V7h2.5v3H12V5h2.5v5H17V7h2v4h2v10H5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 21v-5h3v5M12 21v-5h3v5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function DropIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5s6.5 7 6.5 11.5a6.5 6.5 0 1 1-13 0C5.5 10.5 12 3.5 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PawIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="15" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="9" r="1.9" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18" cy="9" r="1.9" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="5.5" r="1.7" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="15" cy="5.5" r="1.7" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function SunIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FlagIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 21V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 4h13l-3.5 4L18 12H5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export type StatIconId = "bloom" | "peak" | "orchard" | "users" | "flag" | "snow" | "fort" | "drop" | "paw" | "sun";

export const STAT_ICON_COMPONENTS: Record<StatIconId, (props: { size?: number }) => React.ReactElement> = {
  bloom: BloomIcon,
  peak: PeakIcon,
  orchard: OrchardIcon,
  users: UsersIcon,
  flag: FlagIcon,
  snow: SnowIcon,
  fort: FortIcon,
  drop: DropIcon,
  paw: PawIcon,
  sun: SunIcon,
};
