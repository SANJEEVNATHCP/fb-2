"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Sparkles, Send, User, Bot } from "lucide-react"

export default function AICopilotPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello Sanjeev! I'm FinVision AI, your personal financial copilot. How can I help you optimize your wealth today?" }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    
    const userMsg = input.trim()
    setMessages(prev => [...prev, { role: "user", content: userMsg }])
    setInput("")
    setIsTyping(true)
    
    // Mock AI response
    setTimeout(() => {
      let aiMsg = "That's an interesting perspective on your finances. Based on your current spending patterns, I'd recommend looking closer at your subscription costs."
      
      if (userMsg.toLowerCase().includes("save")) {
        aiMsg = "To boost your savings rate, consider reducing your dining out expenses which accounted for 15% of your spending last month. Redirecting just half of that into your Vanguard index fund could yield an extra $12,000 over 10 years at a 7% return rate."
      } else if (userMsg.toLowerCase().includes("invest")) {
        aiMsg = "Your current portfolio is heavily weighted towards tech stocks (65%). To reduce volatility risk while maintaining growth, you might want to consider diversifying into total market index funds or bonds, especially as you approach your 30-year goal."
      }
      
      setMessages(prev => [...prev, { role: "assistant", content: aiMsg }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] w-full max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-1 mb-6 shrink-0"
      >
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          FinVision AI Copilot
        </h1>
        <p className="text-muted-foreground">
          Ask questions about your data, get tailored advice, and simulate scenarios.
        </p>
      </motion.div>

      <Card className="bg-background/40 backdrop-blur-3xl border-white/10 shadow-xl flex-1 flex flex-col overflow-hidden relative">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
          {messages.map((msg, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
                {msg.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-secondary/10 text-foreground' : 'bg-white/5 border border-white/10 text-foreground'}`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 max-w-[85%]"
            >
              <div className="shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-primary/20 text-primary">
                <Bot className="h-5 w-5" />
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-foreground flex items-center gap-1">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="h-2 w-2 rounded-full bg-primary/50" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="h-2 w-2 rounded-full bg-primary/50" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="h-2 w-2 rounded-full bg-primary/50" />
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </CardContent>
        
        <div className="p-4 border-t border-white/10 bg-background/50 relative z-10 shrink-0">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your spending, investments, or goals..."
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
