"use client"

import { useState, useMemo } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { projectFutureWealth } from "@/lib/finance"
import db from "@/data/mock/db.json"

export default function SimulatorPage() {
  const [principal, setPrincipal] = useState(db.investments.totalValue)
  const [monthlyContribution, setMonthlyContribution] = useState(1500)
  const [interestRate, setInterestRate] = useState(7)
  const [years, setYears] = useState(30)

  const { futureValue, projection } = useMemo(() => {
    return projectFutureWealth(principal, monthlyContribution, interestRate, years)
  }, [principal, monthlyContribution, interestRate, years])

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-1"
      >
        <h1 className="text-3xl font-bold tracking-tight">Future Simulator</h1>
        <p className="text-muted-foreground">
          Adjust the variables to see how your financial future could unfold.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-4"
        >
          <Card className="bg-background/40 backdrop-blur-3xl border-white/10 shadow-xl h-full">
            <CardHeader>
              <CardTitle>Simulation Variables</CardTitle>
              <CardDescription>Drag sliders to update in real-time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Starting Principal</label>
                  <span className="text-sm font-bold text-primary">${principal.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="250000" step="1000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Monthly Contribution</label>
                  <span className="text-sm font-bold text-primary">${monthlyContribution.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="10000" step="100"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Expected Annual Return</label>
                  <span className="text-sm font-bold text-primary">{interestRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="1" max="15" step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Time Horizon (Years)</label>
                  <span className="text-sm font-bold text-primary">{years} Years</span>
                </div>
                <input 
                  type="range" 
                  min="5" max="50" step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>

            </CardContent>
          </Card>
        </motion.div>

        {/* Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-8 flex flex-col gap-6"
        >
          {/* Big Number */}
          <Card className="bg-gradient-to-br from-primary/20 via-background to-background border-primary/20 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <CardContent className="p-8">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">Projected Future Value</p>
              <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                ${futureValue.toLocaleString()}
              </h2>
            </CardContent>
          </Card>

          {/* Area Chart */}
          <Card className="bg-background/40 backdrop-blur-3xl border-white/10 shadow-xl flex-1 min-h-[400px]">
            <CardContent className="p-6 h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projection} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="year" 
                    tickFormatter={(val) => `Year ${val}`} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} 
                    dy={10} 
                  />
                  <YAxis 
                    tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} 
                  />
                  <RechartsTooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Projected Value']}
                    labelFormatter={(label) => `Year ${label}`}
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--primary)" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorGrowth)" 
                    animationDuration={500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
