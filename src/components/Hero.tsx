"use client";

import Image from "next/image";
import Link from "next/link";

import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useScrollTransform } from "@/hooks/useScrollTransform";

export default function Hero() {
  const parallaxRef = useMouseParallax();
  const dashboardRef = useScrollTransform();

  return (
    <section 
      id="hero" 
      ref={parallaxRef}
      className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50"></div>
      
      {/* Mouse Spotlight */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(600px circle at calc(50% + var(--mouse-x, 0) * 50vw) calc(50% + var(--mouse-y, 0) * 50vh), rgba(255, 255, 255, 0.1), transparent 40%)`
        }}
      />
      
      {/* Floating Blobs (pure CSS) */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-forsythia/20 rounded-full blur-[100px] animate-blob pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-nocturnal/40 rounded-full blur-[100px] animate-blob pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-saffron/20 rounded-full blur-[100px] animate-blob pointer-events-none" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center" style={{ transform: 'translate3d(calc(var(--mouse-x, 0) * -5px), calc(var(--mouse-y, 0) * -5px), 0)', transition: 'transform 0.1s linear' }}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8 animate-[fade-up_600ms_var(--ease-cinematic)_both]" style={{ animationDelay: '100ms' }}>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white/70"></span>
          </span>
          <span className="text-sm font-medium text-mint">DataSync AI 2.0 is now live</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mb-6 font-mono leading-[1.1]">
          <span className="block animate-[fade-up_600ms_var(--ease-cinematic)_both]" style={{ animationDelay: '200ms' }}>Automate your data</span>
          <span className="block text-mint/80 animate-[fade-up_600ms_var(--ease-cinematic)_both]" style={{ animationDelay: '300ms' }}>with AI precision.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-mint max-w-2xl mb-10 animate-[fade-up_600ms_var(--ease-cinematic)_both]" style={{ animationDelay: '400ms' }}>
          Connect disparate sources, orchestrate intelligent workflows, and unlock actionable insights in milliseconds—without writing a single line of code.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 animate-[fade-up_600ms_var(--ease-cinematic)_both]" style={{ animationDelay: '500ms' }}>
          <Link
            href="#pricing"
            className="group relative px-8 py-4 rounded-full hover-lift bg-white text-oceanic font-bold w-full sm:w-auto button-press btn-sheen"
          >
            <span className="relative flex items-center justify-center gap-2">
              Start Building Free
              <Image src="/svg/arrow-trending-up.svg" alt="" width={20} height={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 var(--ease-cinematic)" />
            </span>
          </Link>
          <Link
            href="#demo"
            className="group px-8 py-4 rounded-full glass hover-lift hover:bg-surface/50 text-white font-medium flex items-center justify-center gap-2 transition-colors w-full sm:w-auto button-press"
          >
            <Image src="/svg/chevron-right.svg" alt="" width={16} height={16} className="invert" />
            Watch Demo
          </Link>
        </div>

        {/* Statistics / Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl w-full border-y border-border py-8 mb-16 animate-[fade-up_600ms_var(--ease-cinematic)_both]" style={{ animationDelay: '600ms' }}>
          {[
            { label: "Data Processed", value: "10PB+" },
            { label: "Active Pipelines", value: "250K" },
            { label: "Avg. Latency", value: "<12ms" },
            { label: "Uptime SLA", value: "99.99%" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl font-bold font-mono text-white mb-1">{stat.value}</span>
              <span className="text-sm text-mint">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div 
          ref={dashboardRef}
          className="relative w-full max-w-5xl aspect-video rounded-xl glass-panel p-2" 
          style={{ 
            animationDelay: '700ms',
            transformOrigin: 'center top',
            willChange: 'transform, opacity',
          }}
        >
          <div className="absolute -inset-1 bg-white opacity-5 blur-xl rounded-xl z-0 pointer-events-none"></div>
          <div className="relative w-full h-full bg-[#0A0A0A] rounded-lg overflow-hidden border border-white/5 flex items-center justify-center z-10 shadow-2xl">
            {/* Mock Dashboard UI */}
            <div className="absolute inset-0 flex flex-col">
              {/* Header */}
              <div className="h-12 border-b border-border flex items-center px-4 gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="h-6 w-64 bg-surface rounded ml-4"></div>
              </div>
              {/* Body */}
              <div className="flex-1 flex p-4 gap-4">
                {/* Sidebar */}
                <div className="w-48 hidden sm:flex flex-col gap-2">
                  <div className="h-8 bg-surface rounded w-full"></div>
                  <div className="h-8 bg-surface rounded w-3/4"></div>
                  <div className="h-8 bg-surface rounded w-5/6"></div>
                </div>
                {/* Main Content */}
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex gap-4 h-24">
                    <div className="flex-1 bg-surface rounded-lg border border-border p-4">
                       <div className="h-3 w-16 bg-mint/20 rounded mb-2"></div>
                       <div className="h-6 w-24 bg-white/10 rounded"></div>
                    </div>
                    <div className="flex-1 bg-surface rounded-lg border border-border p-4">
                       <div className="h-3 w-16 bg-mint/20 rounded mb-2"></div>
                       <div className="h-6 w-24 bg-white/10 rounded"></div>
                    </div>
                    <div className="flex-1 bg-surface rounded-lg border border-border p-4 hidden md:block">
                       <div className="h-3 w-16 bg-mint/20 rounded mb-2"></div>
                       <div className="h-6 w-24 bg-white/10 rounded"></div>
                    </div>
                  </div>
                  <div className="flex-1 bg-surface rounded-lg border border-border relative overflow-hidden flex items-center justify-center">
                    {/* Mock Graph */}
                    <div className="absolute bottom-0 w-full h-1/2 flex items-end gap-2 px-4 pb-4">
                      {[40, 70, 45, 90, 65, 80, 100, 55, 85, 75].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-white/30 to-white/5 rounded-t-sm transition-all duration-1000 ease-out" style={{ height: `${h}%`, animation: `fade-in 1s ease-out ${0.6 + (i * 0.1)}s both` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[fade-in_1s_ease-out_both]" style={{ animationDelay: '1s' }}>
        <span className="text-xs text-mint uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-5 h-8 border border-border rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-saffron rounded-full animate-[float_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </section>
  );
}
