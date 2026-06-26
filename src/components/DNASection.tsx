"use client";

import { useEffect, useRef } from "react";

/**
 * DNASection — Particle-only version
 *
 * Hundreds of dots are pre-positioned along two sine-wave DNA paths.
 * At rest they float scattered randomly. As the user scrolls,
 * they drift INTO their DNA helix formation across the full screen width.
 * Inspired by the Active Theory particle atmosphere.
 */

interface Dot {
  // "home" position on the helix
  hx: number;
  hy: number;
  // current position (lerps toward home on scroll)
  x: number;
  y: number;
  // drift
  dx: number;
  dy: number;
  r: number;
  baseOpacity: number;
  color: string; // white, gray, or soft blue-green
  strand: 0 | 1; // which strand
}

const COLORS = [
  "255,255,255",
  "200,200,200",
  "160,200,180",
  "120,180,160",
  "180,220,200",
  "80,160,140",
];

export default function DNASection() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number | null>(null);
  const dotsRef    = useRef<Dot[]>([]);
  const progRef    = useRef(0);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── resize & init ─────────────────────────────── */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    const initDots = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx   = W / 2;
      const AMP  = W * 0.4;   // helix spans 80% of width
      const TURNS = 2.2;
      const TOP  = H * 0.04;
      const BOT  = H * 0.96;
      const HH   = BOT - TOP;
      const N    = 300;        // dots per strand

      const dots: Dot[] = [];

      for (let strand = 0; strand < 2; strand++) {
        const offset = strand === 0 ? 0 : Math.PI;

        for (let i = 0; i < N; i++) {
          const t     = i / (N - 1);
          const angle = t * TURNS * Math.PI * 2 + offset;
          const hx    = cx + Math.sin(angle) * AMP;
          const hy    = TOP + t * HH;

          const color = COLORS[Math.floor(Math.random() * COLORS.length)];
          const r     = Math.random() * 2.8 + 0.8;

          dots.push({
            hx, hy,
            // start scattered randomly
            x:  Math.random() * W,
            y:  Math.random() * H,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5,
            r,
            baseOpacity: Math.random() * 0.5 + 0.2,
            color,
            strand: strand as 0 | 1,
          });
        }
      }

      // Also add ~80 pure ambient background dots (no home position, just float)
      for (let i = 0; i < 80; i++) {
        dots.push({
          hx: Math.random() * W,
          hy: Math.random() * H,
          x:  Math.random() * W,
          y:  Math.random() * H,
          dx: (Math.random() - 0.5) * 0.4,
          dy: (Math.random() - 0.5) * 0.4,
          r:  Math.random() * 2 + 0.5,
          baseOpacity: Math.random() * 0.25 + 0.05,
          color: COLORS[0],
          strand: 0,
        });
      }

      dotsRef.current = dots;
    };

    resize();
    window.addEventListener("resize", resize);

    /* ── scroll ──────────────────────────────────────── */
    const onScroll = () => {
      const rect  = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      progRef.current = Math.max(0, Math.min(1, -rect.top / total));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ── draw ────────────────────────────────────────── */
    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const p = progRef.current;

      ctx.clearRect(0, 0, W, H);

      // Formation strength: 0 = scattered, 1 = full helix formation
      // Ramps from 0 → 1 as scroll goes from 0.1 → 0.9
      const formation = Math.max(0, Math.min(1, (p - 0.05) / 0.75));

      dotsRef.current.forEach((dot, idx) => {
        // Lerp toward home position based on formation
        // Each dot has a slight stagger so they don't all move at once
        const dotPhase = (idx % 300) / 300; // 0-1 within each strand
        const dotFormation = Math.max(0, Math.min(1, (formation - dotPhase * 0.3) / 0.7));

        // Smooth the lerp with easing
        const eased = 1 - Math.pow(1 - dotFormation, 2);

        // When not forming, drift freely
        if (eased < 0.99) {
          dot.x += dot.dx;
          dot.y += dot.dy;
          // Wrap around edges
          if (dot.x < -5)  dot.x = W + 5;
          if (dot.x > W+5) dot.x = -5;
          if (dot.y < -5)  dot.y = H + 5;
          if (dot.y > H+5) dot.y = -5;
        }

        // Interpolate between drifting position and helix home
        const drawX = dot.x + (dot.hx - dot.x) * eased;
        const drawY = dot.y + (dot.hy - dot.y) * eased;

        // Opacity increases as they form
        const opacity = dot.baseOpacity * (0.3 + eased * 0.7);

        ctx.beginPath();
        ctx.arc(drawX, drawY, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dot.color}, ${opacity})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "400vh" }}
      aria-label="Particle DNA Architecture"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#080808]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ width: "100%", height: "100%" }}
          aria-hidden="true"
        />

        {/* Centered text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10">
          <p className="text-[11px] text-white/20 tracking-[0.5em] uppercase mb-5 font-mono">
            Scroll to form
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-white font-mono tracking-tight text-center leading-none">
            Data<br/>Architecture
          </h2>
          <p className="text-white/25 mt-6 text-sm md:text-base max-w-xs mx-auto text-center leading-relaxed">
            Six layers of intelligence,<br />perfectly interwoven.
          </p>
        </div>
      </div>
    </section>
  );
}
