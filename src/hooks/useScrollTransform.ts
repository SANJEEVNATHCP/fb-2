"use client";

import { useEffect, useRef } from "react";

/**
 * useScrollTransform
 *
 * A high-performance scroll-driven animation hook.
 * Maps scroll progress within a section to CSS transform values,
 * creating a cinematic "rotating into the scene" effect on scroll.
 *
 * Uses requestAnimationFrame + direct DOM mutation for 60FPS.
 * Never touches React state to avoid re-render overhead.
 */
export function useScrollTransform() {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let lastScrollY = -1;

    const update = () => {
      const scrollY = window.scrollY;

      // Only recalculate when scroll actually changed
      if (scrollY === lastScrollY) {
        rafRef.current = requestAnimationFrame(update);
        return;
      }
      lastScrollY = scrollY;

      const rect = el.getBoundingClientRect();
      const elTop = rect.top + scrollY;
      const elHeight = rect.height;
      const viewportH = window.innerHeight;

      // Progress: 0 = element enters top of viewport, 1 = element exits top
      // We start the effect when the element is in the lower half of the screen
      const startTrigger = elTop - viewportH;
      const endTrigger = elTop + elHeight;
      const range = endTrigger - startTrigger;
      const rawProgress = (scrollY - startTrigger) / range;
      const progress = Math.max(0, Math.min(1, rawProgress));

      // === TRANSFORM MAPPINGS ===
      // Phase 0-0.3: Element rotates from -20deg to 0 (tilted like AT's entry)
      // Phase 0.3-0.7: Element is flat, fully visible
      // Phase 0.7-1.0: Element scales slightly and fades (exits upward)

      let rotateX = 0;
      let scale = 1;
      let opacity = 1;
      let translateY = 0;

      if (progress < 0.35) {
        // Entry: tilt from -20deg (top edge far, bottom edge near) → 0
        const t = progress / 0.35;
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        rotateX = -20 * (1 - eased);
        scale = 0.88 + 0.12 * eased;
        opacity = 0.4 + 0.6 * eased;
        translateY = 40 * (1 - eased);
      } else if (progress < 0.7) {
        // Resting: fully flat
        rotateX = 0;
        scale = 1;
        opacity = 1;
        translateY = 0;
      } else {
        // Exit: slight scale-down and fade
        const t = (progress - 0.7) / 0.3;
        const eased = t * t; // ease-in
        scale = 1 - 0.05 * eased;
        opacity = 1 - 0.3 * eased;
        translateY = -20 * eased;
      }

      // Apply directly to the element's style, bypassing React
      el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) translateY(${translateY}px) scale(${scale})`;
      el.style.opacity = String(opacity);

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return ref;
}
