"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { FinancialUniverse3D } from "@/components/layout/marketing/financial-universe"
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { useEffect } from "react"

export function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, -200])
  const y2 = useTransform(scrollY, [0, 1000], [0, -400])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none'

    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      <CustomCursor />



      {/* Full-screen WebGL Background */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />
        <FinancialUniverse3D />
      </div>

      <div className="relative min-h-screen flex flex-col items-center overflow-x-hidden z-10">
        
        {/* Navbar */}
        <nav className="absolute top-0 w-full flex items-center justify-between p-6 md:px-12 z-50">
          <Logo className="text-white" />
          <div className="flex items-center gap-8">
            <MagneticWrapper>
              <Link href="/dashboard" className="text-sm font-bold uppercase tracking-widest text-white hover:text-primary transition-colors">Log in</Link>
            </MagneticWrapper>
            <MagneticWrapper>
              <Link href="/onboarding" className="text-sm font-bold uppercase tracking-widest bg-white text-black px-6 py-3 rounded-full hover:scale-105 transition-transform">Get Started</Link>
            </MagneticWrapper>
          </div>
        </nav>

        {/* Content */}
        <motion.div 
          style={{ y: y1, opacity }}
          className="flex flex-col items-center text-center px-4 w-full max-w-6xl mx-auto mt-[30vh]"
        >

          
          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="text-[4rem] leading-[0.9] md:text-[8rem] font-black tracking-tighter mb-8 text-white uppercase"
          >
            Predict Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary mix-blend-normal">Future.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-white/60 mb-16 max-w-2xl font-light"
          >
            The financial workspace that simulates your wealth and guides your spending in real-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <MagneticWrapper>
              <Link href="/dashboard" className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-110 transition-transform duration-500">
                Enter Workspace <ArrowRight className="h-5 w-5" />
              </Link>
            </MagneticWrapper>
            <MagneticWrapper>
              <Link href="/dashboard/simulator" className="inline-flex items-center justify-center gap-3 bg-white/5 border border-white/20 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/10 hover:scale-105 transition-all duration-500 backdrop-blur-md">
                Try Simulator
              </Link>
            </MagneticWrapper>
          </motion.div>
        </motion.div>


      </div>
    </>
  )
}
