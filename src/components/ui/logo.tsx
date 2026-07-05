import React from "react"
import { cn } from "@/lib/utils"

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "minimal"
}

export function Logo({ className, variant = "default", ...props }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 font-mono font-bold tracking-tight", className)} {...props}>
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground overflow-hidden">
        {/* SVG Mark combining F, V, and growth arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          {/* V Shape */}
          <path d="M4 7l8 10 8-10" className="opacity-40" />
          {/* F / Arrow Integration */}
          <path d="M12 17V3m0 0l-4 4m4-4l4 4" />
        </svg>
      </div>
      {variant !== "minimal" && (
        <div className="flex items-baseline leading-none">
          <span className="text-xl font-black tracking-tighter">FinVision</span>
          <span className="text-primary text-[10px] tracking-[0.2em] font-bold uppercase ml-1 relative -top-1">AI</span>
        </div>
      )}
    </div>
  )
}
