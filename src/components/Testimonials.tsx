"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    quote: "DataSync AI completely transformed our ETL processes. What used to take days now takes milliseconds.",
    author: "Sarah Jenkins",
    role: "VP of Engineering, Acme Corp",
  },
  {
    quote: "The intuitive workflow builder allowed our non-technical teams to orchestrate complex data operations.",
    author: "David Chen",
    role: "Head of Data, GlobalTech",
  },
  {
    quote: "Performance is unmatched. We are processing 10x the volume with half the infrastructure cost.",
    author: "Elena Rodriguez",
    role: "CTO, Nexus",
  },
];

export default function Testimonials() {
  const { ref, revealClass } = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-[#0A0A0A] z-10">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      
      <div className={`max-w-7xl mx-auto px-6 lg:px-8 relative z-10 ${revealClass}`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-sm font-bold text-white/50 tracking-widest uppercase mb-2">Social Proof</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white font-mono">Loved by Engineers</h3>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors button-press group">
              <Image src="/svg/chevron-left.svg" alt="Previous" width={20} height={20} className="invert opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors button-press group">
              <Image src="/svg/chevron-right.svg" alt="Next" width={20} height={20} className="invert opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, i) => (
            <div 
              key={i} 
              className="w-full flex-shrink-0 glass rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-colors duration-300"
            >
              <p className="text-white text-lg mb-8 leading-relaxed">"{test.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-sm">
                  {test.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{test.author}</h4>
                  <p className="text-sm text-white/50">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
