"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Activity, ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react"
import db from "@/data/mock/db.json"
import { calculateCashFlow, calculateHealthScore, calculateSavingsRate, Transaction } from "@/lib/finance"

export function DashboardStats() {
  const transactions = db.transactions as Transaction[]
  
  // Current month stats
  const cashFlow = calculateCashFlow(transactions)
  const savingsRate = calculateSavingsRate(cashFlow.income, cashFlow.expenses)
  
  // Previous month stats for comparison
  const lastMonth = new Date()
  lastMonth.setMonth(lastMonth.getMonth() - 1)
  const prevCashFlow = calculateCashFlow(transactions, lastMonth)
  
  const healthScore = calculateHealthScore(savingsRate, db.history[0]?.netWorth || 0)

  const items = [
    {
      title: "Financial Health",
      value: healthScore,
      description: "Excellent standing",
      icon: Activity,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      title: "Monthly Income",
      value: `$${cashFlow.income.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      description: prevCashFlow.income > 0 ? `${((cashFlow.income - prevCashFlow.income) / prevCashFlow.income * 100).toFixed(1)}% from last month` : "No previous data",
      icon: ArrowUpRight,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Monthly Expenses",
      value: `$${cashFlow.expenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      description: prevCashFlow.expenses > 0 ? `${((cashFlow.expenses - prevCashFlow.expenses) / prevCashFlow.expenses * 100).toFixed(1)}% from last month` : "No previous data",
      icon: ArrowDownRight,
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    },
    {
      title: "Savings Rate",
      value: `${savingsRate.toFixed(1)}%`,
      description: "Of total monthly income",
      icon: Wallet,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    }
  ]

  return (
    <>
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-background/40 backdrop-blur-2xl border-white/10 shadow-lg group hover:border-primary/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${item.bg}`}>
                <item.icon className={`h-4 w-4 ${item.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">{item.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {item.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </>
  )
}
