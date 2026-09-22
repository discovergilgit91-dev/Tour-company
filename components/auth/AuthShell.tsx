import Image from "next/image";
import type { ReactNode } from "react";
import { Logo, PeakMark } from "../ui/Logo";

/* ---- faint topographic contour lines, same technique as AboutStory ---- */
function ring(cx: number, cy: number, r: number, seed: number, squash = 1) {
  const points: string[] = [];
  const steps = 56;
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const wobble =
      1 + 0.16 * Math.sin(3 * t + seed) + 0.09 * Math.sin(5 * t + seed * 1.7) + 0.05 * Math.sin(9 * t + seed * 0.6);
    const x = cx + Math.cos(t) * r * wobble;
    const y = cy + Math.sin(t) * r * wobble * squash;
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `${points.join(" ")}Z`;
}

const CONTOURS = Array.from({ length: 9 }, (_, i) => ring(120, 460, 30 + (280 * i) / 8, 1.4 + i * 0.35, 0.85));

function RotatingBadge() {
  return (
    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-cream/25 bg-night/40 backdrop-blur-md">
      <svg viewBox="0 0 120 120" className="auth-spin absolute inset-0 h-full w-full text-cream/70">
        <defs>
          <path id="auth-ring" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
        </defs>
        <text fontSize="9" fontWeight="600" fill="currentColor">
          <textPath href="#auth-ring" textLength="270" lengthAdjust="spacing">
            DISCOVER GILGIT • LOCAL GUIDES •
          </textPath>
        </text>
      </svg>
      <PeakMark className="relative h-8 w-8 text-gold" />
    </div>
  );
}

export type AuthQuote = {
  text: string;
  author: string;
  role: string;
};

export function AuthShell({
  eyebrow,
  title,
  titleAccent,
  tagline,
  image,
  imageAlt,
  quote,
  stats,
  children,
}: {
  eyebrow: string;
  title: string;
  titleAccent: string;
  tagline: string;
  image: string;
  imageAlt: string;
  quote?: AuthQuote;
  stats?: { value: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-cream">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
        {/* ---------------- photo panel ---------------- */}
        <div className="relative flex h-64 shrink-0 flex-col justify-between overflow-hidden bg-forest px-6 py-6 text-cream sm:h-72 sm:px-10 sm:py-8 lg:h-auto lg:min-h-screen lg:px-14 lg:py-12">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            quality={85}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest via-forest/55 to-forest/25" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-night/40 via-transparent to-transparent" />
          <svg
            aria-hidden
            viewBox="0 0 240 600"
            preserveAspectRatio="xMidYMax slice"
            className="pointer-events-none absolute inset-0 h-full w-full text-cream/[0.06]"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1">
              {CONTOURS.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
          </svg>

          {/* top: brand mark, links back home */}
          <div className="relative z-10">
            <Logo compact />
          </div>

          {/* middle: tagline, hidden on the compact mobile banner to keep it tidy */}
          <div className="relative z-10 hidden max-w-md lg:block">
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream backdrop-blur-sm">
              {eyebrow}
            </span>
            <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-cream xl:text-5xl">
              {title}
              <br />
              <span className="heading-accent">{titleAccent}</span>
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">{tagline}</p>

            {stats && (
              <div className="mt-8 flex items-center gap-6 border-t border-cream/15 pt-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-serif text-2xl text-gold">{stat.value}</p>
                    <p className="mt-1 text-[11px] leading-snug text-cream/55">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* compact mobile/tablet tagline (single line, no card) */}
          <p className="relative z-10 max-w-sm text-sm leading-snug text-cream/85 lg:hidden">{tagline}</p>

          {/* bottom: quote card + rotating badge, desktop only */}
          <div className="relative z-10 hidden items-end justify-between gap-6 lg:flex">
            {quote ? (
              <div className="max-w-[260px] rounded-2xl border border-cream/15 bg-night/35 p-5 backdrop-blur-md">
                <p className="font-serif text-[15px] italic leading-snug text-cream/90">&ldquo;{quote.text}&rdquo;</p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">{quote.author}</p>
                <p className="text-[11px] text-cream/50">{quote.role}</p>
              </div>
            ) : (
              <span />
            )}
            <RotatingBadge />
          </div>
        </div>

        {/* ---------------- form panel ---------------- */}
        <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8 sm:py-14 lg:px-16">
          <div className="auth-fade-in w-full max-w-md motion-reduce:animate-none">{children}</div>
        </div>
      </div>

      <style>{`
        .auth-spin { animation: auth-spin 26s linear infinite; }
        @keyframes auth-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .auth-spin { animation: none; }
        }
      `}</style>
    </main>
  );
}
