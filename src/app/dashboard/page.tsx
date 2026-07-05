import { NetWorthChart } from "@/components/dashboard/net-worth-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { AIInsightCard } from "@/components/dashboard/ai-insight-card"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import * as motion from "framer-motion/client"

export default function DashboardPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
      className="flex flex-col gap-6 w-full max-w-6xl mx-auto"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-1"
      >
        <h1 className="text-3xl font-bold tracking-tight">Financial Workspace</h1>
        <p className="text-muted-foreground">
          Welcome back, Sanjeev. Here is your financial overview.
        </p>
      </motion.div>

      {/* Top Stats Row */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full"
      >
        <DashboardStats />
      </motion.div>

      {/* Main Charts & Activity */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid gap-6 grid-cols-1 lg:grid-cols-4 w-full"
      >
        <AIInsightCard />
        <NetWorthChart />
        <RecentActivity />
      </motion.div>
    </motion.div>
  )
}
