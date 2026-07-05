"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { LineChart, Zap, BrainCircuit, Activity } from "lucide-react"

const features = [
  {
    title: "Real-time Simulation",
    description: "Model your future wealth based on dynamic variables and instantly see how today's decisions impact tomorrow.",
    icon: LineChart,
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Intelligent Tracking",
    description: "Sync your accounts seamlessly. Our system categorizes and analyzes your spending patterns with pinpoint accuracy.",
    icon: Activity,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "AI-Powered Insights",
    description: "Get personalized, actionable suggestions to optimize your financial path and reach your goals faster.",
    icon: BrainCircuit,
    color: "from-emerald-400 to-cyan-400"
  },
  {
    title: "Lightning Fast",
    description: "Built for speed. Experience instantaneous updates and fluid interactions across your entire financial universe.",
    icon: Zap,
    color: "from-amber-400 to-orange-500"
  }
]

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section ref={containerRef} className="relative z-10 py-32 px-6 md:px-12 overflow-hidden">
      {/* Smooth transition from the hero's fixed background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/90 to-background pointer-events-none -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase mb-6"
          >
            Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Trajectory</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-foreground/60 max-w-2xl mx-auto font-light"
          >
            Everything you need to take control of your financial destiny, unified in one powerful interface.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const y = useTransform(
              scrollYProgress,
              [0, 1],
              [100 * (index % 2 ? 1 : 0.5), -100 * (index % 2 ? 1 : 0.5)]
            )

            return (
              <motion.div
                key={index}
                style={{ y }}
                className="group relative p-8 rounded-3xl bg-foreground/[0.03] backdrop-blur-md border border-foreground/[0.05] hover:bg-foreground/[0.05] transition-colors overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" 
                     style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                />
                
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-10 mb-6 relative z-10`}>
                  <feature.icon className="h-8 w-8 text-foreground" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4 relative z-10">{feature.title}</h3>
                <p className="text-foreground/60 leading-relaxed relative z-10 font-light">
                  {feature.description}
                </p>
                
                {/* Decorative background glow */}
                <div className={`absolute -bottom-24 -right-24 w-64 h-64 bg-gradient-to-br ${feature.color} rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none`} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
