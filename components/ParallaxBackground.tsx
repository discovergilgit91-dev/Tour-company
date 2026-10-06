"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps a background image (or any absolutely-positioned layer) so it drifts
 * slower than the page as the section scrolls past — a scroll parallax.
 *
 * The layer is made taller than its section by `strength` on both edges and
 * shifted by up to ±`strength` of the section's height, so the image's edges
 * never slide into view. Put it inside a `relative overflow-hidden` section;
 * children that use `fill` (next/image) fill the layer.
 *
 * Does nothing for visitors who prefer reduced motion, and only listens to
 * scroll while the section is actually on screen.
 */
export default function ParallaxBackground({
  children,
  strength = 0.15,
  className = "",
}: {
  children: ReactNode;
  /** Fraction of the section's height the image may travel in each direction. */
  strength?: number;
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const layer = layerRef.current;
    if (!frame || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = frame.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 0 when the section's top enters the bottom of the screen, 1 when its
      // bottom leaves the top.
      const progress = (viewport - rect.top) / (viewport + rect.height);
      const clamped = Math.min(1, Math.max(0, progress));
      const shift = (clamped - 0.5) * 2 * strength * rect.height;
      layer.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          update();
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
        } else {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
      },
      { rootMargin: "100px 0px" }
    );
    observer.observe(frame);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div ref={frameRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        ref={layerRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `${-strength * 100}%`, height: `${(1 + strength * 2) * 100}%` }}
      >
        {children}
      </div>
    </div>
  );
}
