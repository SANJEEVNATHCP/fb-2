"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Calendar, CreditCard, ArrowUpRight } from "lucide-react"
import db from "@/data/mock/db.json"

export default function SubscriptionsPage() {
  const subscriptions = db.subscriptions
  
  const totalMonthly = subscriptions.reduce((acc, sub) => acc + sub.amount, 0)
  const totalAnnual = totalMonthly * 12

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-1"
        >
          <h1 className="text-3xl font-bold tracking-tight">Subscription Manager</h1>
          <p className="text-muted-foreground">
            Monitor and manage your recurring payments.
          </p>
        </motion.div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-4 w-full mt-4">
        {/* Summary Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="bg-gradient-to-b from-primary/10 to-background border-primary/20 shadow-xl h-full flex flex-col">
            <CardHeader>
              <CardTitle>Total Recurring</CardTitle>
              <CardDescription>What you pay for subscriptions</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <h2 className="text-4xl font-black text-primary mb-2">
                ${totalMonthly.toFixed(2)}<span className="text-lg text-muted-foreground font-medium">/mo</span>
              </h2>
              <p className="text-sm text-muted-foreground flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1 text-rose-500" />
                ${totalAnnual.toFixed(2)} projected per year
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subscription List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <Card className="bg-background/40 backdrop-blur-3xl border-white/10 shadow-xl h-full">
            <CardHeader>
              <CardTitle>Active Subscriptions ({subscriptions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...subscriptions].sort((a, b) => b.amount - a.amount).map((sub, index) => (
                  <motion.div 
                    key={sub.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (index * 0.05) }}
                    className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        {sub.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{sub.name}</h4>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          Billed {sub.billingCycle} on {new Date(sub.nextBillingDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="font-bold block">${sub.amount.toFixed(2)}</span>
                        <span className="text-xs text-muted-foreground uppercase">Software</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
