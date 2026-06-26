"use client";

import { useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  {
    id: "ai-automation",
    title: "AI Automation",
    description: "Train custom models on your proprietary data to automate decision-making pipelines with 99.9% accuracy.",
    icon: "/svg/cog-8-tooth.svg",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "workflow-builder",
    title: "Workflow Builder",
    description: "Drag-and-drop orchestration interface for complex logic.",
    icon: "/svg/cube-16-solid.svg",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Real-time metrics and predictive insights.",
    icon: "/svg/chart-pie.svg",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "security",
    title: "Security",
    description: "Enterprise-grade encryption and access controls.",
    icon: "/svg/search.svg",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: "cloud-sync",
    title: "Cloud Sync",
    description: "Multi-region active-active replication.",
    icon: "/svg/arrow-trending-up.svg",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: "api",
    title: "API",
    description: "REST & GraphQL endpoints for seamless integration.",
    icon: "/svg/link.svg",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "reporting",
    title: "Reporting",
    description: "Automated scheduled PDF and CSV reports.",
    icon: "/svg/chart-pie.svg",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Connect with 500+ SaaS applications out of the box.",
    icon: "/svg/link-solid.svg",
    className: "md:col-span-1 md:row-span-1",
  },
];

export default function Features() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { ref, revealClass } = useScrollReveal({ threshold: 0.1 });

  // Bento Grid for Desktop
  const renderBentoGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-[200px]">
      {features.map((feature, index) => (
        <div
          key={feature.id}
          className={`relative group rounded-2xl glass-panel p-6 overflow-hidden transition-all duration-300 var(--ease-cinematic) hover-lift cursor-pointer ${
            activeIndex === index ? "bg-white/5 border-white/20" : ""
          } ${feature.className}`}
          onMouseEnter={() => setActiveIndex(index)}
        >
          {/* Subtle Border Sweep effect */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 var(--ease-cinematic) ${activeIndex === index ? "bg-white -translate-y-1" : "bg-surface border border-white/10 group-hover:border-white/20 group-hover:-translate-y-0.5"}`}>
              <Image 
                src={feature.icon} 
                alt="" 
                width={24} 
                height={24} 
                className={`transition-all duration-300 ${activeIndex === index ? "invert-0 filter brightness-0" : "invert opacity-70 group-hover:opacity-100"}`} 
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-mono transition-colors">{feature.title}</h3>
            <p className="text-mint/80 text-sm flex-grow leading-relaxed">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  // Handwritten Accordion for Mobile
  const renderAccordion = () => (
    <div className="flex flex-col gap-4">
      {features.map((feature, index) => {
        const isOpen = activeIndex === index;
        return (
          <div 
            key={feature.id} 
            className={`glass rounded-xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-white/20 bg-white/5' : 'border-white/5'}`}
          >
            <button
              className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white button-press"
              onClick={() => setActiveIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={`feature-desc-${feature.id}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-white" : "bg-surface border border-white/10"}`}>
                  <Image 
                    src={feature.icon} 
                    alt="" 
                    width={20} 
                    height={20} 
                    className={`transition-all duration-300 ${isOpen ? "invert-0 filter brightness-0" : "invert opacity-70"}`} 
                  />
                </div>
                <span className={`font-mono font-bold text-white`}>{feature.title}</span>
              </div>
              <div className={`transition-transform duration-300 var(--ease-cinematic) ${isOpen ? 'rotate-180' : ''}`}>
                <Image src="/svg/chevron-down.svg" alt="" width={16} height={16} className="invert opacity-70" />
              </div>
            </button>
            <div 
              id={`feature-desc-${feature.id}`}
              className="accordion-content"
              data-state={isOpen ? "open" : "closed"}
            >
              <div className="accordion-inner px-5 pb-5 pt-0">
                <p className="text-sm text-mint leading-relaxed translate-y-2 opacity-80 transition-all duration-300" style={{ transform: isOpen ? 'translateY(0)' : 'translateY(8px)', opacity: isOpen ? 1 : 0 }}>{feature.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section id="features" ref={ref} className="py-24 relative overflow-hidden bg-background z-10">
      <div className={`max-w-7xl mx-auto px-6 lg:px-8 ${revealClass}`}>
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-white/50 tracking-widest uppercase mb-2">Platform Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white font-mono mb-4">Unleash Data Automation</h3>
          <p className="text-mint max-w-2xl mx-auto text-lg">A fully-managed suite of tools engineered to transform raw data into intelligent, actionable workflows.</p>
        </div>

        {/* Feature Component conditional rendering */}
        <div>
          {isMobile ? renderAccordion() : renderBentoGrid()}
        </div>
      </div>
    </section>
  );
}
