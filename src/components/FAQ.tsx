"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    question: "What is DataSync AI?",
    answer: "DataSync AI is a premium data automation platform that allows you to connect, orchestrate, and analyze data from hundreds of sources using AI-powered workflows without writing any code.",
  },
  {
    question: "How secure is my data?",
    answer: "We use enterprise-grade AES-256 encryption at rest and TLS 1.3 in transit. We are SOC2 Type II, HIPAA, and GDPR compliant.",
  },
  {
    question: "Can I connect my custom internal APIs?",
    answer: "Yes, our Universal API connector allows you to integrate with any REST or GraphQL endpoint using custom authentication headers and OAuth2.",
  },
  {
    question: "What happens if I exceed my plan's row limit?",
    answer: "We never throttle or stop your pipelines. Overage rows are billed at a flat rate of $0.001 per row, which you can track in real-time on your dashboard.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, revealClass } = useScrollReveal({ threshold: 0.1 });

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={ref} className="py-24 bg-background border-t border-white/5 relative z-10">
      <div className={`max-w-3xl mx-auto px-6 lg:px-8 ${revealClass}`}>
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-white/50 tracking-widest uppercase mb-2">FAQ</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white font-mono mb-4">Got questions?</h3>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="glass rounded-xl overflow-hidden border border-white/5 transition-colors duration-300"
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white hover:bg-white/5 transition-colors button-press"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className={`text-lg font-bold font-mono transition-colors duration-300 var(--ease-cinematic) ${isOpen ? "text-white" : "text-mint hover:text-white"}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 ml-4 transition-transform duration-400 var(--ease-cinematic) ${isOpen ? "rotate-180" : ""}`}>
                    <Image src="/svg/chevron-down.svg" alt="" width={20} height={20} className="invert opacity-70" />
                  </div>
                </button>
                <div 
                  id={`faq-answer-${index}`}
                  className="accordion-content"
                  data-state={isOpen ? "open" : "closed"}
                >
                  <div className="accordion-inner px-6 pb-5 pt-0">
                    <p className="text-mint leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
