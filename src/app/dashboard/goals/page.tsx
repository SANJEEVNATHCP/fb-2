"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Target, Plus, TrendingUp } from "lucide-react"
import db from "@/data/mock/db.json"

export default function GoalsPage() {
  const goals = db.goals

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-1"
        >
          <h1 className="text-3xl font-bold tracking-tight">Goal Planner</h1>
          <p className="text-muted-foreground">
            Track and manage your financial milestones.
          </p>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-primary/20 transition-all"
        >
          <Plus className="h-4 w-4" />
          New Goal
        </motion.button>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 w-full mt-4">
        {goals.map((goal, index) => {
          const progress = Math.min((goal.current / goal.target) * 100, 100)
          
          return (
            <motion.div 
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-background/40 backdrop-blur-3xl border-white/10 shadow-xl group hover:border-primary/30 transition-all overflow-hidden h-full flex flex-col">
                <div 
                  className="h-2 w-full opacity-80" 
                  style={{ backgroundColor: goal.color }} 
                />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1">{goal.name}</CardTitle>
                      <CardDescription>Target: {new Date(goal.deadline).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</CardDescription>
                    </div>
                    <div 
                      className="p-2 rounded-lg" 
                      style={{ backgroundColor: `${goal.color}20`, color: goal.color }}
                    >
                      <Target className="h-5 w-5" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end mt-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-2xl font-bold">${goal.current.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">of ${goal.target.toLocaleString()}</span>
                  </div>
                  
                  {/* Custom Progress Bar */}
                  <div className="w-full h-3 bg-secondary/10 rounded-full overflow-hidden mb-4 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + (index * 0.1) }}
                      className="h-full rounded-full relative"
                      style={{ backgroundColor: goal.color }}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full animate-pulse" />
                    </motion.div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-foreground">{progress.toFixed(1)}% Completed</span>
                    <span className="flex items-center text-emerald-500 font-medium">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      On Track
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
