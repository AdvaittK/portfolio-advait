"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

function NotFoundContent() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // Server-side render - static fallback
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-transparent text-foreground">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-zinc-500/10 via-zinc-600/10 to-zinc-700/10 dark:from-zinc-500/20 dark:via-zinc-600/20 dark:to-zinc-700/20 rounded-full filter blur-3xl opacity-30" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-zinc-600/10 via-zinc-700/10 to-zinc-800/10 dark:from-zinc-600/20 dark:via-zinc-700/20 dark:to-zinc-800/20 rounded-full filter blur-3xl opacity-30" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-zinc-700/10 via-zinc-800/10 to-zinc-900/10 dark:from-zinc-700/20 dark:via-zinc-800/20 dark:to-zinc-900/20 rounded-full filter blur-3xl opacity-30" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <div>
            <h1 className="text-[150px] sm:text-[200px] font-bold leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/20 select-none font-heading">
              404
            </h1>
          </div>

          <div className="space-y-6 max-w-md mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg">
              The page you are looking for doesn't exist or has been moved. Let's get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/">
                <Button size="lg" className="rounded-full px-8 gap-2 w-full sm:w-auto">
                  <Home className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 gap-2 w-full sm:w-auto"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Client-side render - with animations
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-transparent text-foreground">
      {/* Background Gradients - Matching Homepage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-zinc-500/10 via-zinc-600/10 to-zinc-700/10 dark:from-zinc-500/20 dark:via-zinc-600/20 dark:to-zinc-700/20 rounded-full filter blur-3xl opacity-30"
          animate={{
            x: [0, 10, -5, 0],
            y: [0, -5, 10, 0],
            scale: [1, 1.02, 0.98, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-zinc-600/10 via-zinc-700/10 to-zinc-800/10 dark:from-zinc-600/20 dark:via-zinc-700/20 dark:to-zinc-800/20 rounded-full filter blur-3xl opacity-30"
          animate={{
            x: [0, -10, 5, 0],
            y: [0, 10, -8, 0],
            scale: [1, 0.98, 1.02, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-zinc-700/10 via-zinc-800/10 to-zinc-900/10 dark:from-zinc-700/20 dark:via-zinc-800/20 dark:to-zinc-900/20 rounded-full filter blur-3xl opacity-30"
          animate={{
            x: [0, 8, -8, 0],
            y: [0, -8, 4, 0],
            scale: [1, 1.03, 0.97, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[150px] sm:text-[200px] font-bold leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/20 select-none font-heading">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6 max-w-md mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg">
            The page you are looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/">
              <Button size="lg" className="rounded-full px-8 gap-2 w-full sm:w-auto">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 gap-2 w-full sm:w-auto"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFoundContent


