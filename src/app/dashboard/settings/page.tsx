"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun, Monitor } from "lucide-react"

export default function SettingsPage() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-card/50 backdrop-blur-xl border-border/50">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how FinVision AI looks on your device.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <button 
                onClick={() => setTheme("light")}
                className={`flex flex-col items-center justify-center p-4 border rounded-xl w-24 gap-2 transition-all hover:bg-muted/50 ${theme === 'light' ? 'border-primary text-primary bg-primary/5' : 'border-border/50 text-muted-foreground'}`}
              >
                <Sun className="h-6 w-6" />
                <span className="text-xs font-medium">Light</span>
              </button>
              <button 
                onClick={() => setTheme("dark")}
                className={`flex flex-col items-center justify-center p-4 border rounded-xl w-24 gap-2 transition-all hover:bg-muted/50 ${theme === 'dark' ? 'border-primary text-primary bg-primary/5' : 'border-border/50 text-muted-foreground'}`}
              >
                <Moon className="h-6 w-6" />
                <span className="text-xs font-medium">Dark</span>
              </button>
              <button 
                onClick={() => setTheme("system")}
                className={`flex flex-col items-center justify-center p-4 border rounded-xl w-24 gap-2 transition-all hover:bg-muted/50 ${theme === 'system' ? 'border-primary text-primary bg-primary/5' : 'border-border/50 text-muted-foreground'}`}
              >
                <Monitor className="h-6 w-6" />
                <span className="text-xs font-medium">System</span>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-border/50">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Name</label>
              <input type="text" defaultValue="Sanjeev" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <input type="email" defaultValue="sanjeev@example.com" disabled className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
