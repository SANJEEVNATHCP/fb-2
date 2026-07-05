"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { BookOpen, CheckCircle2, PlayCircle, Trophy } from "lucide-react"
import db from "@/data/mock/db.json"

const MOCK_COURSES = [
  { id: 'c1', title: 'Investing 101', modules: 5, level: 'Beginner', progress: 100, completed: true },
  { id: 'c2', title: 'Understanding Taxes', modules: 4, level: 'Intermediate', progress: 50, completed: false },
  { id: 'c3', title: 'Real Estate Fundamentals', modules: 8, level: 'Advanced', progress: 0, completed: false },
  { id: 'c4', title: 'Retirement Planning', modules: 6, level: 'Intermediate', progress: 0, completed: false }
]

const MOCK_BADGES = [
  { id: 'b1', name: 'Saved 50k', icon: '🏆', description: 'Reached 50k in total savings.', earnedAt: '2025-06-12' },
  { id: 'b2', name: 'Investment Beginner', icon: '📈', description: 'Bought your first index fund.', earnedAt: '2024-01-15' },
  { id: 'b3', name: 'Budget Master', icon: '🎯', description: 'Stayed under budget for 3 months.', earnedAt: '2025-11-20' }
]

export default function LiteracyPage() {
  const courses = MOCK_COURSES
  const badges = MOCK_BADGES

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-1"
        >
          <h1 className="text-3xl font-bold tracking-tight">Financial Literacy</h1>
          <p className="text-muted-foreground">
            Level up your wealth-building knowledge.
          </p>
        </motion.div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-4 w-full mt-4">
        {/* Badges sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="bg-background/40 backdrop-blur-3xl border-white/10 shadow-xl h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                Your Badges
              </CardTitle>
              <CardDescription>Achievements unlocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {badges.map((badge, index) => (
                  <motion.div 
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    className="flex flex-col items-center p-4 bg-white/5 border border-white/5 rounded-xl text-center relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{badge.icon}</div>
                    <h4 className="font-bold text-sm">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                    <span className="text-[10px] uppercase tracking-wider text-primary font-bold mt-3">Earned {new Date(badge.earnedAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric'})}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Courses List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course, index) => (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.05) }}
              >
                <Card className="bg-background/40 backdrop-blur-3xl border-white/10 shadow-xl h-full hover:border-primary/30 transition-all group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 relative flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-primary/50 group-hover:scale-110 transition-transform" />
                      {course.completed && (
                        <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg leading-tight">{course.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                        <span className="flex items-center"><PlayCircle className="h-3 w-3 mr-1" /> {course.modules} Modules</span>
                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">{course.level}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full ${course.completed ? 'bg-emerald-500' : 'bg-primary'}`}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
