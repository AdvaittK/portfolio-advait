"use client"

import { AnimatePresence } from "framer-motion"
import PageTransition from "./page-transition"
import { useEffect, useState } from "react"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Listen for the transition completion
    const handleTransitionComplete = () => {
      setShowContent(true)
    }

    // Create a custom event for transition completion
    window.addEventListener('transitionComplete', handleTransitionComplete)

    // Wait for loading screen and transition to complete
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200) // Reduced from 1800ms to 1200ms

    return () => {
      window.removeEventListener('transitionComplete', handleTransitionComplete)
      clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      <PageTransition>
        <div className={`w-full transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          {children}
        </div>
      </PageTransition>
    </AnimatePresence>
  )
}