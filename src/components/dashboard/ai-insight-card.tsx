"use client"

import { Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import db from "@/data/mock/db.json"
import { motion } from "framer-motion"

export function AIInsightCard() {
  const insight = db.aiInsights[0] // Taking the first one for the dashboard main view

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="col-span-full"
    >
      <Card className="bg-background/40 backdrop-blur-2xl border-white/10 shadow-lg overflow-hidden relative group">
        {/* Animated pulsing background gradient */}
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent pointer-events-none" 
        />
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        <CardContent className="p-4 sm:p-6 flex items-start gap-4 relative z-10">
          <div className="p-2 bg-primary/20 rounded-full shrink-0 mt-1 relative overflow-hidden">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--color-primary)_360deg)] opacity-40 pointer-events-none"
            />
            <Sparkles className="h-5 w-5 text-primary relative z-10" />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              AI Copilot Insight
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {insight.message}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
