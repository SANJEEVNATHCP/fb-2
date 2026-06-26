"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Footer() {
  const { ref, revealClass } = useScrollReveal({ threshold: 0.1 });

  return (
    <footer ref={ref} className="bg-background border-t border-white/5 pt-20 pb-10 relative overflow-hidden z-10">
      <div className={`max-w-7xl mx-auto px-6 lg:px-8 ${revealClass}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-sm bg-white flex items-center justify-center font-mono font-bold text-oceanic">
                AI
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                DataSync
              </span>
            </div>
            <p className="text-mint max-w-sm mb-6">
              The premium data automation platform for modern enterprises. Connect, transform, and analyze at the speed of thought.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover-lift cursor-pointer hover:bg-surface">
                <span className="text-white font-bold text-sm">X</span>
              </div>
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover-lift cursor-pointer hover:bg-surface">
                <span className="text-white font-bold text-sm">in</span>
              </div>
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover-lift cursor-pointer hover:bg-surface">
                <span className="text-white font-bold text-sm">GH</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 font-mono">Product</h4>
            <ul className="space-y-3">
              {['Features', 'Integrations', 'Pricing', 'Changelog', 'Docs'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-mint hover:text-white transition-colors text-sm">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 font-mono">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Blog', 'Contact', 'Partners'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-mint hover:text-white transition-colors text-sm">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 font-mono">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security', 'Compliance'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-mint hover:text-white transition-colors text-sm">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Animated Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-mint text-sm">
            © {new Date().getFullYear()} DataSync AI Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-mint">All systems operational</span>
            </div>
            
            {/* Back to top button */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover-lift cursor-pointer hover:bg-white/10 group border border-white/10 button-press"
              aria-label="Back to top"
            >
              <div className="relative w-5 h-5">
                <Image src="/svg/chevron-up.svg" alt="Up" fill className="invert opacity-70 group-hover:opacity-0 transition-opacity absolute inset-0" />
                <Image src="/svg/chevron-up-solid.svg" alt="Up" fill className="invert opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
