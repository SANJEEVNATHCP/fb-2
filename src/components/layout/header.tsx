"use client"

import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationCenter } from "@/components/layout/notification-center"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/layout/sidebar"
import { Logo } from "@/components/ui/logo"

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/50 bg-background/50 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex lg:hidden">
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Menu" title="Menu" className="-ml-2 shrink-0 lg:hidden" />}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            {/* We duplicate the sidebar content here but normally would extract inner content */}
            <Sidebar />
          </SheetContent>
        </Sheet>
        <div className="ml-4">
          <Logo variant="minimal" />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        <Button
          variant="outline"
          className="hidden w-full max-w-sm justify-start text-sm text-muted-foreground sm:flex shadow-none bg-muted/50 border-border/50"
          onClick={() => {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
          }}
        >
          <Search className="mr-2 h-4 w-4 shrink-0" />
          <span>Search or type a command...</span>
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
        <NotificationCenter />
      </div>
    </header>
  )
}
