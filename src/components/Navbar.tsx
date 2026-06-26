"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 var(--ease-cinematic) ${
        isScrolled ? "glass-panel py-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)]" : "bg-transparent py-5 shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-white flex items-center justify-center font-mono font-bold text-oceanic">
            AI
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-mono">
            DataSync
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-mint hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saffron transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="#get-started"
            className="group relative px-5 py-2.5 rounded-full overflow-hidden hover-lift bg-surface border border-white/10 button-press"
          >
            <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            <span className="relative text-sm font-bold text-white flex items-center gap-2">
              Start Free Trial
              <Image src="/svg/arrow-trending-up.svg" alt="Arrow" width={16} height={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 var(--ease-cinematic) invert" />
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 text-mint hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <Image src="/svg/x-mark.svg" alt="Close menu" width={24} height={24} className="invert" />
          ) : (
            <div className="space-y-1.5">
              <div className="w-6 h-0.5 bg-current transition-all"></div>
              <div className="w-6 h-0.5 bg-current transition-all"></div>
              <div className="w-6 h-0.5 bg-current transition-all"></div>
            </div>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-[400px] opacity-100 border-t border-border bg-surface/95 backdrop-blur-xl" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pt-4 pb-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-base font-medium text-mint hover:text-white py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4">
              <Link
                href="#get-started"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-white text-oceanic font-bold button-press"
                onClick={() => setMobileMenuOpen(false)}
              >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
