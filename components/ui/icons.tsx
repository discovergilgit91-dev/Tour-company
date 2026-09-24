export function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="m13 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CompassIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 6.5 14 12 12 17.5 10 12 12 6.5Z" fill="currentColor" />
      <circle cx="12" cy="12" r="1" className="fill-cream" />
    </svg>
  );
}

export function ClockIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5v4.8l3.2 1.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 10.5c0 5.2-7 10-7 10s-7-4.8-7-10a7 7 0 1 1 14 0Z" fill="currentColor" />
      <circle cx="12" cy="10.3" r="2.4" className="fill-forest" />
    </svg>
  );
}

export function CalendarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.75" y="5" width="16.5" height="15" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 3.2v3.6M16 3.2v3.6M3.75 9.6h16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MenuIcon({ open, size = 20 }: { open: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {open ? (
        <path
          d="M4 4l12 12M16 4L4 16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M2.5 5.5h15M2.5 10h15M2.5 14.5h15"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
