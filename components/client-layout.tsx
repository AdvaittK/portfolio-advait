"use client"

import UnfoldingTransition from "./unfolding-transition"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
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
    }, 1200)

    return () => {
      window.removeEventListener('transitionComplete', handleTransitionComplete)
      clearTimeout(timer)
    }
  }, [])

  // Dispatch route change event for Locomotive Scroll and AOS
  useEffect(() => {
    if (!isLoading) {
      window.dispatchEvent(new CustomEvent('routeChange'))
    }
  }, [pathname, isLoading])

  if (isLoading) {
    return null
  }

  return (
    <UnfoldingTransition>
      <div className={`w-full transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </UnfoldingTransition>
  )
}