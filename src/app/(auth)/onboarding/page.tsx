"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight, Wallet, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

const STEPS = [
  { id: 1, title: "Welcome to FinVision AI", description: "Let's personalize your financial workspace.", icon: Sparkles },
  { id: 2, title: "Connect Accounts", description: "Securely link your bank to power our AI engine.", icon: Wallet },
  { id: 3, title: "Set Your Goals", description: "What are you saving for? We'll help you get there faster.", icon: Target },
  { id: 4, title: "Grow Your Wealth", description: "Discover investment opportunities tailored to you.", icon: TrendingUp },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-lg z-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  {(() => {
                    const Icon = STEPS[step].icon
                    return <Icon className="h-8 w-8 text-primary" />
                  })()}
                </div>
                
                <h1 className="text-2xl font-bold tracking-tight mb-2">{STEPS[step].title}</h1>
                <p className="text-muted-foreground mb-8">{STEPS[step].description}</p>
                
                <div className="flex gap-2 mb-8">
                  {STEPS.map((s, i) => (
                    <div key={s.id} className={`h-1.5 w-8 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-muted'}`} />
                  ))}
                </div>

                {step < STEPS.length - 1 ? (
                  <button 
                    onClick={() => setStep(s => s + 1)}
                    className="w-full flex items-center justify-center gap-2 bg-foreground text-background py-3 rounded-xl font-medium hover:scale-[1.02] transition-transform"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <Link 
                    href="/dashboard"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20"
                  >
                    Enter Workspace <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
