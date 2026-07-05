"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"
import {
  LayoutDashboard,
  PieChart,
  Target,
  Wallet,
  Calculator,
  Calendar,
  GraduationCap,
  Settings,
  Sparkles,
} from "lucide-react"

import { motion } from "framer-motion"

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/dashboard/analytics", icon: PieChart },
  { name: "Goals", href: "/dashboard/goals", icon: Target },
  { name: "Investments", href: "/dashboard/investments", icon: Wallet },
  { name: "Simulator", href: "/dashboard/simulator", icon: Calculator },
  { name: "Subscriptions", href: "/dashboard/subscriptions", icon: Calendar },
  { name: "Literacy", href: "/dashboard/literacy", icon: GraduationCap },
  { name: "Timeline", href: "/dashboard/timeline", icon: Calendar },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <motion.aside 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-border/50 bg-background/50 backdrop-blur-xl transition-transform lg:flex"
    >
      <div className="flex h-16 shrink-0 items-center px-6">
        <Logo />
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Workspace
          </div>
          {NAV_ITEMS.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={item.name}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:bg-muted/80",
                    isActive
                      ? "bg-muted text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  {item.name}
                  {isActive && (
                    <motion.span 
                      layoutId="sidebar-active-indicator"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" 
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        <nav className="mt-8 space-y-1 px-3">
          <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            AI Copilot
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/dashboard/ai" className="relative w-full group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary transition-all duration-300 hover:scale-[1.02] bg-primary/5 hover:bg-primary/10 overflow-hidden border border-primary/20">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--color-primary)_360deg)] opacity-20 pointer-events-none"
              />
              <Sparkles className="h-4 w-4 shrink-0 text-primary relative z-10" />
              <span className="relative z-10 text-foreground group-hover:text-primary transition-colors">Ask FinVision...</span>
              <span className="ml-auto text-[10px] font-mono font-normal opacity-50 bg-background px-1.5 py-0.5 rounded relative z-10 border border-border/50 shadow-sm">⌘A</span>
            </Link>
          </motion.div>
        </nav>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-auto p-4"
      >
        <Link
          href="/dashboard/settings"
          className={cn(
            "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:bg-muted/80",
            pathname === "/dashboard/settings"
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Settings className="h-4 w-4 shrink-0" />
          Settings
        </Link>
        <div className="mt-4 flex items-center gap-3 px-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-xs">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-none">Sanjeev</span>
            <span className="text-xs text-muted-foreground mt-1">Free Plan</span>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  )
}
