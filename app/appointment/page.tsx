"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { PageContainer } from "@/components/layout/page-container"
import { Calendar, Clock, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AppointmentPage() {
  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <PageContainer>
      <div className="min-h-screen relative bg-transparent">
        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-zinc-500/5 via-zinc-600/5 to-zinc-700/5 dark:from-zinc-500/10 dark:via-zinc-600/10 dark:to-zinc-700/10 rounded-full filter blur-3xl opacity-30"
            animate={{
              x: [0, 10, -5, 0],
              y: [0, -5, 10, 0],
              scale: [1, 1.02, 0.98, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-zinc-600/5 via-zinc-700/5 to-zinc-800/5 dark:from-zinc-600/10 dark:via-zinc-700/10 dark:to-zinc-800/10 rounded-full filter blur-3xl opacity-30"
            animate={{
              x: [0, -10, 5, 0],
              y: [0, 10, -8, 0],
              scale: [1, 0.98, 1.02, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        </div>


        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            Schedule a Meeting
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            Book a 30-minute consultation to discuss your project, ideas, or any opportunities you'd like to explore together.
          </motion.p>
        </motion.div>

        {/* Main Content - Meeting Info and Calendly */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 max-w-6xl mx-auto px-6">
          {/* Meeting Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.15 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3 shadow-lg mx-auto mb-4">
                <Clock className="w-full h-full text-zinc-100" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">30 Minutes</h3>
              <p className="text-muted-foreground text-sm">Perfect duration for a focused discussion</p>
            </div>
            
            <div className="bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3 shadow-lg mx-auto mb-4">
                <Users className="w-full h-full text-zinc-100" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">1-on-1</h3>
              <p className="text-muted-foreground text-sm">Personalized consultation tailored to your needs</p>
            </div>
            
            <div className="bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3 shadow-lg mx-auto mb-4">
                <Calendar className="w-full h-full text-zinc-100" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Flexible</h3>
              <p className="text-muted-foreground text-sm">Choose a time that works best for you</p>
            </div>
          </motion.div>

          {/* Calendly Widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="flex items-start"
          >
            <div className="bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 w-full">
              <div className="calendly-inline-widget" 
                   data-url="https://calendly.com/advaitt-dev/30min" 
                   style={{minWidth: '320px', height: '500px'}}>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.25 }}
          className="max-w-2xl mx-auto px-6 mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-zinc-200/50 dark:border-zinc-700/50">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
              What to Expect
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              During our consultation, we'll discuss your project requirements, explore potential solutions, 
              and determine how I can help bring your vision to life. Whether you're looking for web development, 
              design consultation, or technical guidance, this meeting will help us align on the best path forward.
            </p>
            <p className="text-sm text-muted-foreground">
              You'll receive a calendar invite with meeting details and a Google Meet link once you book your appointment.
            </p>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  )
}
