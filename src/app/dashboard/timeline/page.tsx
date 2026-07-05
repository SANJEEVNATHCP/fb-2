"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Clock, ArrowDownRight, ArrowUpRight } from "lucide-react"
import db from "@/data/mock/db.json"

export default function TimelinePage() {
  const history = [...db.history].reverse() // Newest first

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-1"
        >
          <h1 className="text-3xl font-bold tracking-tight">Financial Timeline</h1>
          <p className="text-muted-foreground">
            A chronological view of your wealth journey.
          </p>
        </motion.div>
      </div>

      <div className="relative border-l border-white/10 ml-4 space-y-12 pb-12">
        {history.map((point, index) => (
          <motion.div 
            key={point.month}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="relative pl-8"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[9px] top-4 h-4 w-4 rounded-full bg-primary ring-4 ring-background" />
            
            <Card className="bg-background/40 backdrop-blur-3xl border-white/10 shadow-xl group hover:border-primary/30 transition-all">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {point.month}
                  </CardTitle>
                  <CardDescription className="font-bold text-foreground">
                    Net Worth: ${(point.netWorth).toLocaleString()}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Income</span>
                    <span className="font-semibold text-emerald-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      ${point.income.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Expenses</span>
                    <span className="font-semibold text-rose-500 flex items-center">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      ${point.expenses.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Savings</span>
                    <span className="font-semibold text-primary">
                      ${point.savings.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
