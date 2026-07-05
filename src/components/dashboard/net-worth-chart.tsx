"use client"

import { useMemo } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import db from "@/data/mock/db.json"
import { TrendingUp } from "lucide-react"

export function NetWorthChart() {
  const data = useMemo(() => [...db.history].reverse(), []) // Chronological order
  
  const currentNetWorth = data[data.length - 1].netWorth
  const previousNetWorth = data[0].netWorth
  const growth = ((currentNetWorth - previousNetWorth) / previousNetWorth) * 100

  return (
    <Card className="col-span-full lg:col-span-3 bg-background/40 backdrop-blur-3xl border-white/10 shadow-2xl overflow-hidden relative group transition-all duration-500 hover:border-primary/30 hover:shadow-primary/5">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="relative z-10">
        <CardTitle>Net Worth Growth</CardTitle>
        <CardDescription>Your 5-year financial trajectory</CardDescription>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-3xl font-bold tracking-tight">${currentNetWorth.toLocaleString()}</span>
          <span className="flex items-center text-sm font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
            <TrendingUp className="h-4 w-4 mr-1" />
            {growth.toFixed(1)}% All Time
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0 pb-4 h-[300px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              minTickGap={30}
              dy={10}
            />
            <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl border border-white/20 bg-background/80 backdrop-blur-xl p-4 shadow-2xl">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-primary mb-1">{payload[0].payload.month}</p>
                      <p className="text-xl font-black text-foreground">
                        ${Number(payload[0].value).toLocaleString()}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="netWorth"
              stroke="var(--primary)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorNetWorth)"
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
