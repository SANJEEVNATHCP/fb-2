"use client"

import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AIInsightCard } from "@/components/dashboard/ai-insight-card"
import db from "@/data/mock/db.json"
import { motion, Variants } from "framer-motion"
import { calculateCategoryBreakdown, Transaction } from "@/lib/finance"

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export default function AnalyticsPage() {
  const transactions = db.transactions as Transaction[]
  
  const spendingData = useMemo(() => {
    return calculateCategoryBreakdown(transactions).slice(0, 5) // Top 5 categories
  }, [transactions])

  const historyData = useMemo(() => {
    // Reverse to show chronological order
    return [...db.history].reverse().slice(-12) // Last 12 months
  }, [])

  const COLORS = ['#10B981', '#6366F1', '#FBBF24', '#EF4444', '#8B5CF6']

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-1"
      >
        <h1 className="text-3xl font-bold tracking-tight">Expense Analytics</h1>
        <p className="text-muted-foreground">
          Deep dive into your spending habits and patterns.
        </p>
      </motion.div>

      <AIInsightCard />

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 grid-cols-1 lg:grid-cols-2 w-full"
      >
        {/* Category Breakdown (Pie) */}
        <motion.div variants={item}>
          <Card className="bg-background/40 backdrop-blur-3xl border-white/10 shadow-xl group hover:border-primary/30 transition-all h-full">
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>Top 5 areas where your money goes</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
        
        {/* Cash Flow (Bar) */}
        <motion.div variants={item}>
          <Card className="bg-background/40 backdrop-blur-3xl border-white/10 shadow-xl group hover:border-primary/30 transition-all h-full">
            <CardHeader>
              <CardTitle>Income vs Expenses</CardTitle>
              <CardDescription>Your cash flow over the last 12 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                  <RechartsTooltip 
                    formatter={(value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
                    itemStyle={{ color: '#fff' }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Legend />
                  <Bar dataKey="income" name="Income" fill="#10B981" radius={[4, 4, 0, 0]} animationDuration={1500} />
                  <Bar dataKey="expenses" name="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Savings Trend (Line) */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="bg-background/40 backdrop-blur-3xl border-white/10 shadow-xl group hover:border-primary/30 transition-all">
            <CardHeader>
              <CardTitle>Savings Trend</CardTitle>
              <CardDescription>How much you've managed to save each month</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                  <RechartsTooltip 
                    formatter={(value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="savings" 
                    name="Savings" 
                    stroke="#6366F1" 
                    strokeWidth={4} 
                    dot={{ fill: '#6366F1', strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 8, fill: '#fff', stroke: '#6366F1' }}
                    animationDuration={2000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
