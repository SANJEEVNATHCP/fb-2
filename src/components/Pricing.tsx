"use client";

import { createContext, useContext, useState, useMemo, memo } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { AnimatedCounter } from "./AnimatedCounter";

type Currency = "USD" | "EUR" | "INR";
type BillingCycle = "monthly" | "annual";

const pricingMatrix = {
  Starter: { basePrice: 49 },
  Professional: { basePrice: 149 },
  Enterprise: { basePrice: 499 },
};

const currencyRates = {
  USD: { symbol: "$", multiplier: 1 },
  EUR: { symbol: "€", multiplier: 0.92 },
  INR: { symbol: "₹", multiplier: 83.5 },
};

const discountRate = 0.8; // 20% discount

const PricingContext = createContext<{
  currency: Currency;
  setCurrency: (c: Currency) => void;
  billingCycle: BillingCycle;
  setBillingCycle: (b: BillingCycle) => void;
} | null>(null);

// Controls for Currency & Billing Cycle (Memoized so it only renders when its own state changes, parent doesn't re-render)
const PricingControls = memo(function PricingControls() {
  const ctx = useContext(PricingContext);
  if (!ctx) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
      {/* Billing Toggle */}
      <div className="flex bg-surface p-1 rounded-full border border-white/5 w-fit mx-auto relative overflow-hidden">
        <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full transition-transform duration-500 var(--ease-cinematic) ${ctx.billingCycle === 'annual' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'}`}></div>
        
        <button 
          className={`relative w-32 py-2.5 text-sm font-bold z-10 transition-colors duration-300 button-press ${ctx.billingCycle === 'monthly' ? 'text-oceanic' : 'text-mint hover:text-white'}`}
          onClick={() => ctx.setBillingCycle('monthly')}
        >
          Monthly
        </button>
        <button 
          className={`relative w-32 py-2.5 text-sm font-bold z-10 transition-colors duration-300 button-press ${ctx.billingCycle === 'annual' ? 'text-oceanic' : 'text-mint hover:text-white'}`}
          onClick={() => ctx.setBillingCycle('annual')}
        >
          Annually <span className={ctx.billingCycle === 'annual' ? 'text-oceanic/70' : 'text-white/50'}>(-20%)</span>
        </button>
      </div>

      {/* Currency Selector */}
      <div className="relative group">
        <select
          value={ctx.currency}
          onChange={(e) => ctx.setCurrency(e.target.value as Currency)}
          className="appearance-none bg-surface border border-border text-white text-sm font-bold rounded-full px-6 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer hover:border-white/20 transition-colors"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="INR">INR (₹)</option>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Image src="/svg/chevron-down.svg" alt="" width={12} height={12} className="invert opacity-70" />
        </div>
      </div>
    </div>
  );
});

// Memoized Price Display that strictly only updates the localized text nodes
const PriceDisplay = memo(function PriceDisplay({ plan }: { plan: keyof typeof pricingMatrix }) {
  const ctx = useContext(PricingContext);
  if (!ctx) return null;

  const config = currencyRates[ctx.currency];
  const base = pricingMatrix[plan].basePrice;
  const rawPrice = base * config.multiplier;
  
  // Calculate final value
  const finalPrice = ctx.billingCycle === "annual" 
    ? (rawPrice * discountRate) 
    : rawPrice;

  const price = Math.round(finalPrice);

  return (
    <div className="flex items-baseline gap-2 my-6 transition-all duration-500 var(--ease-cinematic)">
      <span className="text-5xl font-bold text-white font-mono tracking-tight">
        <AnimatedCounter 
          value={price} 
          prefix={config.symbol} 
          duration={800} 
        />
      </span>
      <span className="text-mint font-medium">/mo</span>
    </div>
  );
});

// The Card layout is statically rendered and never re-renders when pricing state changes
const StaticPricingCard = memo(function StaticPricingCard({ plan, isPopular, features }: { plan: keyof typeof pricingMatrix, isPopular?: boolean, features: string[] }) {
  return (
    <div className={`relative rounded-3xl p-8 flex flex-col h-full transition-all duration-300 var(--ease-cinematic) hover-lift group ${isPopular ? "glass-panel border-white/20" : "glass border-white/5"}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-oceanic text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_5px_15px_rgba(255,255,255,0.2)]">
          Most Popular
        </div>
      )}
      
      <h3 className="text-2xl font-bold font-mono text-white">{plan}</h3>
      <p className="text-sm text-mint mt-2">
        {plan === "Starter" && "Perfect for small teams and startups."}
        {plan === "Professional" && "Advanced features for scaling businesses."}
        {plan === "Enterprise" && "Custom solutions for large organizations."}
      </p>

      {/* Dynamic Isolated Node */}
      <PriceDisplay plan={plan} />

      <button className={`w-full py-3 rounded-full font-bold mb-8 transition-all duration-300 var(--ease-cinematic) button-press ${isPopular ? "btn-sheen" : ""} ${
        isPopular 
          ? "bg-white text-oceanic hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:scale-105" 
          : "bg-surface border border-white/10 text-white hover:bg-surface/80 hover:border-white/30 group-hover:bg-surface/50"
      }`}>
        Get Started
      </button>

      <div className="flex-1">
        <ul className="space-y-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Image src="/svg/cube-16-solid.svg" alt="Included" width={16} height={16} className="invert opacity-40 mt-1 shrink-0" />
              <span className="text-sm text-mint">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

// Pricing wrapper
export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const { ref, revealClass } = useScrollReveal({ threshold: 0.1 });

  // Providing Context so state changes don't re-render the heavy static layout
  const value = useMemo(() => ({ currency, setCurrency, billingCycle, setBillingCycle }), [currency, billingCycle]);

  return (
    <section id="pricing" ref={ref} className="py-24 relative overflow-hidden bg-background z-10 border-t border-white/5">
      <div className={`max-w-7xl mx-auto px-6 lg:px-8 ${revealClass}`}>
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold text-white/50 tracking-widest uppercase mb-2">Transparent Pricing</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white font-mono mb-4">Scale without limits</h3>
          <p className="text-mint max-w-2xl mx-auto text-lg">Choose the perfect plan for your data workflow needs.</p>
        </div>

        <PricingContext.Provider value={value}>
          {/* Controls update Context, isolated re-renders */}
          <PricingControls />

          {/* Cards rely entirely on memoization, preventing structural DOM thrashing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <StaticPricingCard 
              plan="Starter"
              features={[
                "Up to 1M rows/month",
                "3 Active Pipelines",
                "Community Support",
                "Standard Integrations"
              ]}
            />
            <StaticPricingCard 
              plan="Professional"
              isPopular
              features={[
                "Up to 50M rows/month",
                "Unlimited Pipelines",
                "Priority Email Support",
                "Advanced Transformations",
                "Custom AI Models"
              ]}
            />
            <StaticPricingCard 
              plan="Enterprise"
              features={[
                "Unlimited Data Processing",
                "Dedicated Infrastructure",
                "24/7 Phone Support",
                "On-premise deployment options",
                "Custom SLA & Compliance"
              ]}
            />
          </div>
        </PricingContext.Provider>
      </div>
    </section>
  );
}
