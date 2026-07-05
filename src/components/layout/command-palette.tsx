"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { LayoutDashboard, Target, Wallet, Calculator, Calendar, GraduationCap, PieChart, Clock, Sparkles } from "lucide-react"

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
            <LayoutDashboard className="mr-2 h-4 w-4 text-primary" />
            <span>Dashboard Overview</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/analytics'))}>
            <PieChart className="mr-2 h-4 w-4 text-primary" />
            <span>Expense Analytics</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/goals'))}>
            <Target className="mr-2 h-4 w-4 text-primary" />
            <span>Goal Planner</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/investments'))}>
            <Wallet className="mr-2 h-4 w-4 text-primary" />
            <span>Investments</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/simulator'))}>
            <Calculator className="mr-2 h-4 w-4 text-primary" />
            <span>Future Simulator</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/subscriptions'))}>
            <Calendar className="mr-2 h-4 w-4 text-primary" />
            <span>Subscriptions</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/literacy'))}>
            <GraduationCap className="mr-2 h-4 w-4 text-primary" />
            <span>Financial Literacy</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/timeline'))}>
            <Clock className="mr-2 h-4 w-4 text-primary" />
            <span>Timeline</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/ai'))}>
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            <span>Ask AI Copilot</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
