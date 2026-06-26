"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const companies = [
  "Acme Corp", "GlobalTech", "Nexus", "Quantum", "Starlight", "Horizon", "Velocity", "Apex", "Nova"
];

export default function TrustedBy() {
  const { ref, revealClass } = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-12 border-y border-white/5 bg-background overflow-hidden relative z-10">
      <div className={`max-w-7xl mx-auto px-6 lg:px-8 mb-6 text-center ${revealClass}`}>
        <p className="text-sm font-medium text-mint">Trusted by forward-thinking teams globally</p>
      </div>
      
      <div className={`relative w-full flex overflow-hidden mask-horizontal group ${revealClass}`}>
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap">
          {[...companies, ...companies].map((company, i) => (
            <div key={i} className="flex items-center justify-center mx-12">
              <span className="text-2xl font-bold font-mono text-white/30 tracking-tighter uppercase select-none transition-colors duration-300 hover:text-white/60">{company}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Required CSS for the mask effect */}
      <style jsx>{`
        .mask-horizontal {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
}
