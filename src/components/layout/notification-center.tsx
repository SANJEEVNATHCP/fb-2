"use client"

import * as React from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

const NOTIFICATIONS = [
  { id: 1, title: "Goal Reached", description: "You've hit your Emergency Fund goal!", date: "2 mins ago", unread: true },
  { id: 2, title: "Investment Alert", description: "Your portfolio is up 8% this week.", date: "1 hour ago", unread: true },
  { id: 3, title: "Bill Due", description: "Netflix subscription renews tomorrow.", date: "5 hours ago", unread: false },
  { id: 4, title: "AI Insight", description: "We found a way to save $45 on utilities.", date: "Yesterday", unread: false },
]

export function NotificationCenter() {
  const [open, setOpen] = React.useState(false)
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Notifications" title="Notifications" className="relative text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            )}
          </Button>
        }
      />
      <SheetContent className="w-full sm:max-w-md border-l border-border/50 bg-background/95 backdrop-blur-xl">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2">
            Notifications
            <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs font-normal">
              {unreadCount} New
            </Badge>
          </SheetTitle>
          <SheetDescription>
            Your latest financial updates and AI insights.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          {NOTIFICATIONS.map((notification) => (
            <div
              key={notification.id}
              className={`flex flex-col gap-1 rounded-xl p-4 transition-colors hover:bg-muted/50 ${
                notification.unread ? "bg-muted/30 border border-border/50" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-sm text-foreground">
                  {notification.title}
                </span>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                  {notification.date}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {notification.description}
              </p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
