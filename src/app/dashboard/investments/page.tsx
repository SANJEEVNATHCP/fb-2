"use client"

import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Wallet, TrendingUp, ShieldCheck, AlertCircle } from "lucide-react"
import db from "@/data/mock/db.json"

export default function InvestmentsPage() {
  const portfolio = db.investments

  const riskScore = useMemo(() => {
    // Simple mock logic: more stocks = higher risk
    const stockAllocation = portfolio.allocation.find(a => a.asset === 'Stocks')?.percentage || 0
    if (stockAllocation > 80) return { score: "High", color: "text-rose-500", icon: AlertCircle }
    if (stockAllocation > 50) return { score: "Moderate", color: "text-amber-500", icon: ShieldCheck }
    return { score: "Conservative", color: "text-emerald-500", icon: ShieldCheck }
  }, [portfolio])

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-1"
      >
        <h1 className="text-3xl font-bold tracking-tight">Investment Portfolio</h1>
        <p className="text-muted-foreground">
          Track your wealth generation and asset allocation.
        </p>
      </motion.div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 w-full mt-4">
        {/* Total Value */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="bg-background/40 backdrop-blur-3xl border-white/10 shadow-xl h-full flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Wallet className="w-32 h-32" />
            </div>
            <CardHeader>
              <CardTitle>Total Balance</CardTitle>
              <CardDescription>Across all brokerage accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-4">
                ${portfolio.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h2>
              <div className="flex items-center gap-4 text-sm font-medium">
                <span className="flex items-center text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8.4% YTD
                </span>
                <span className={`flex items-center ${riskScore.color} bg-background/50 px-2 py-1 rounded-full border border-border/50`}>
                  <riskScore.icon className="h-4 w-4 mr-1" />
                  {riskScore.score} Risk
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Allocation Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-background/40 backdrop-blur-3xl border-white/10 shadow-xl h-full">
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
              <CardDescription>Your portfolio diversification</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolio.allocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {portfolio.allocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
