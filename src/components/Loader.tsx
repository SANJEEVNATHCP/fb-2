"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Strict 500ms timeline as per requirements
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450); // Finish slightly before 500ms for safety
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-oceanic flex items-center justify-center transition-opacity duration-300 ease-out animate-[fade-out_500ms_ease-in-out_forwards]">
      <div className="relative flex flex-col items-center">
        {/* Logo Container */}
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-forsythia to-saffron flex items-center justify-center font-mono font-bold text-oceanic text-2xl shadow-[0_0_30px_rgba(255,200,1,0.5)] overflow-hidden relative">
          <span className="relative z-10">AI</span>
          {/* Gradient sweep */}
          <div className="absolute inset-0 bg-white/40 transform -skew-x-12 -translate-x-full animate-[sweep_400ms_ease-in-out_forwards]"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-out {
          0%, 80% { opacity: 1; pointer-events: auto; }
          100% { opacity: 0; pointer-events: none; }
        }
        @keyframes sweep {
          0% { transform: skewX(-12deg) translateX(-150%); }
          100% { transform: skewX(-12deg) translateX(150%); }
        }
      `}</style>
    </div>
  );
}
