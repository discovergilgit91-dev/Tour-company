/* ---------------------------------------------------------------------
   Shared decorative motifs for tour detail pages. No photography exists
   for most of these tours yet, so every visual here is an honest,
   clearly-decorative vector (currentColor line art) rather than a
   mislabeled placeholder image. Each tour picks one "theme" motif
   (snowflake/fort/leaf/wave/dune/blossom) matching its category, plus
   the universal mountain motifs used everywhere.
   --------------------------------------------------------------------- */

export type MotifShape = "blossom" | "snowflake" | "fort" | "leaf" | "wave" | "dune";

export function PeaksMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 200" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <path
        d="M-40 180 60 100l60 60 70-100 70 90 60-50 100 110 90-70 130 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M-40 200 80 130l70 70 80-110 80 100 70-60 110 120 100-80 140 130"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/** Tile-friendly mountain zigzag (fills a whole card, unlike PeaksMotif's wide banner shape). */
export function PeakZigzagMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <path
        d="M-10 78 14 50l12 16 14-24 14 22 12-12 20 26 16-14 22 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M-10 90 16 62l13 17 15-25 15 23 13-13 21 27 17-15 23 21"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function BlossomBranch({ className = "" }: { className?: string }) {
  const blossoms = [
    [18, 58],
    [34, 42],
    [52, 50],
    [66, 30],
    [82, 38],
    [96, 18],
  ];
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      <path
        d="M2 70C20 66 34 58 46 50S70 34 96 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
      {blossoms.map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx} ${cy})`}>
          {Array.from({ length: 5 }, (_, p) => {
            const angle = (p / 5) * Math.PI * 2;
            return (
              <circle
                key={p}
                cx={Math.cos(angle) * 3.4}
                cy={Math.sin(angle) * 3.4}
                r="2.6"
                className="fill-rose-300/70"
              />
            );
          })}
          <circle r="1.4" className="fill-gold" />
        </g>
      ))}
    </svg>
  );
}

export function SnowflakeMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x2 = 50 + Math.cos(angle) * 34;
        const y2 = 50 + Math.sin(angle) * 34;
        const bx = 50 + Math.cos(angle) * 20;
        const by = 50 + Math.sin(angle) * 20;
        return (
          <g key={i}>
            <line x1="50" y1="50" x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.4" />
            <line
              x1={bx}
              y1={by}
              x2={bx + Math.cos(angle + 1) * 7}
              y2={by + Math.sin(angle + 1) * 7}
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <line
              x1={bx}
              y1={by}
              x2={bx + Math.cos(angle - 1) * 7}
              y2={by + Math.sin(angle - 1) * 7}
              stroke="currentColor"
              strokeWidth="1.1"
            />
          </g>
        );
      })}
    </svg>
  );
}

export function FortMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M20 85V45h8V30h10v15h8V20h8v25h8V30h10v15h8v40H20Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M30 85V65h12v20M58 85V65h12v20" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function LeafMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 12C30 20 18 42 22 62c4 18 20 28 28 28s24-10 28-28C82 42 70 20 50 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M50 15v70M50 35 34 45M50 50 30 58M50 65 34 72M50 35 66 45M50 50 70 58M50 65 66 72"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export function WaveMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="72" cy="28" r="10" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 55c8-6 16-6 24 0s16 6 24 0 16-6 24 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 70c8-6 16-6 24 0s16 6 24 0 16-6 24 0" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 85c8-6 16-6 24 0s16 6 24 0 16-6 24 0" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function DuneMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="22" cy="24" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M-5 60c15-14 30-14 45 0s30 14 45 0" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M-5 78c15-16 30-16 45 0s30 16 45 0" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M-5 94c15-12 30-12 45 0s30 12 45 0" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export const MOTIF_COMPONENTS: Record<MotifShape, (props: { className?: string }) => React.ReactElement> = {
  blossom: BlossomBranch,
  snowflake: SnowflakeMotif,
  fort: FortMotif,
  leaf: LeafMotif,
  wave: WaveMotif,
  dune: DuneMotif,
};
