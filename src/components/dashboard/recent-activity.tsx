"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import db from "@/data/mock/db.json"
import { ArrowDownRight, ArrowUpRight, Coffee, Home, ShoppingBag, Zap, Shield, TrendingUp, Compass, CreditCard } from "lucide-react"
import { motion } from "framer-motion"

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Housing': return <Home className="h-4 w-4" />
    case 'Food': return <Coffee className="h-4 w-4" />
    case 'Transportation': return <Compass className="h-4 w-4" />
    case 'Utilities': return <Zap className="h-4 w-4" />
    case 'Insurance': return <Shield className="h-4 w-4" />
    case 'Saving, Investing, & Debt Payments': return <TrendingUp className="h-4 w-4" />
    case 'Personal Spending': return <ShoppingBag className="h-4 w-4" />
    default: return <CreditCard className="h-4 w-4" />
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Housing': return 'bg-blue-500/10 text-blue-500'
    case 'Food': return 'bg-orange-500/10 text-orange-500'
    case 'Transportation': return 'bg-teal-500/10 text-teal-500'
    case 'Utilities': return 'bg-yellow-500/10 text-yellow-500'
    case 'Insurance': return 'bg-purple-500/10 text-purple-500'
    case 'Saving, Investing, & Debt Payments': return 'bg-emerald-500/10 text-emerald-500'
    case 'Personal Spending': return 'bg-pink-500/10 text-pink-500'
    default: return 'bg-gray-500/10 text-gray-500'
  }
}

export function RecentActivity() {
  const transactions = db.transactions.slice(0, 5)

  return (
    <Card className="col-span-full lg:col-span-1 bg-background/40 backdrop-blur-3xl border-white/10 shadow-lg relative group transition-all duration-500 hover:border-primary/30">
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/5 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="relative z-10">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest transactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        {transactions.map((t, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            key={t.id} 
            className="flex items-center justify-between group/item hover:bg-white/5 p-2 -mx-2 rounded-xl transition-colors cursor-default"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform group-hover/item:scale-110 ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : getCategoryColor(t.category)}`}>
                {t.type === 'income' ? <ArrowDownRight className="h-4 w-4" /> : getCategoryIcon(t.category)}
              </div>
              <div>
                <p className="text-sm font-medium leading-none group-hover/item:text-primary transition-colors">{t.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.category}</p>
              </div>
            </div>
            <div className={`font-semibold ${t.type === 'income' ? 'text-emerald-500' : 'text-foreground'}`}>
              {t.type === 'income' ? '+' : ''}${Math.abs(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
