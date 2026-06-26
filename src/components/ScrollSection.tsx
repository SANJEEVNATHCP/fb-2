"use client";

import { useEffect, useRef } from "react";

/**
 * ScrollSection
 *
 * Wraps any section so it reveals with a cinematic rotateX tilt as it enters
 * the viewport. Similar to the Active Theory section reveal style.
 *
 * Intentionally subtle: max rotation is ~8deg, not dramatic.
 */
export function ScrollSection({ children, className = "", delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const didInit = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial hidden state
    el.style.opacity = "0";
    el.style.transform = "perspective(1000px) rotateX(6deg) translateY(40px)";
    el.style.willChange = "transform, opacity";
    el.style.transformOrigin = "center top";

    // Use IntersectionObserver to trigger the animation when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !didInit.current) {
            didInit.current = true;

            // Delay support
            const start = performance.now() + delay;

            const animate = (now: number) => {
              if (now < start) {
                rafRef.current = requestAnimationFrame(animate);
                return;
              }

              const elapsed = now - start;
              const duration = 700;
              let t = Math.min(elapsed / duration, 1);
              
              // Ease out expo
              const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

              const rotateX = 6 * (1 - eased);
              const translateY = 40 * (1 - eased);
              const opacity = eased;

              el.style.opacity = String(opacity);
              el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) translateY(${translateY}px)`;

              if (t < 1) {
                rafRef.current = requestAnimationFrame(animate);
              } else {
                // Clean up will-change after animation
                el.style.willChange = "auto";
                el.style.transform = "none";
                el.style.opacity = "1";
              }
            };

            rafRef.current = requestAnimationFrame(animate);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
