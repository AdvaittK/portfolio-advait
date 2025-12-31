"use client"

import { ReactNode, useEffect, useRef, useState, createContext, useContext } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Context to expose Lenis instance for programmatic scroll control
const LenisContext = createContext<Lenis | null>(null)
export const useLenis = () => useContext(LenisContext)

interface SmoothScrollProviderProps {
  children: ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    // Framer-level smooth scrolling settings
    // These settings create a premium, buttery-smooth experience
    const lenis = new Lenis({
      // Duration controls how long the scroll animation takes
      // Higher = smoother but more delayed feel (1.2 is Framer-like)
      duration: 1.2,

      // Custom easing for natural deceleration - exponential ease out
      // This creates that signature Framer "momentum" feel
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      // Scroll direction
      orientation: 'vertical',
      gestureOrientation: 'vertical',

      // Enable smooth wheel scrolling
      smoothWheel: true,

      // Wheel multiplier - controls scroll speed per wheel tick
      // Lower = smoother, slower; Higher = faster, snappier
      wheelMultiplier: 0.8,

      // Touch multiplier for mobile devices
      touchMultiplier: 1.5,

      // Disable infinite scrolling
      infinite: false,

      // Lerp (linear interpolation) for ultra-smooth updates
      // Lower = smoother but more delayed (0.1 is very smooth)
      lerp: 0.08,
    })

    lenisRef.current = lenis
    setLenisInstance(lenis)

    // Expose lenis globally for debugging and external access
    // @ts-ignore
    window.lenis = lenis

    // Use GSAP ticker for optimal animation frame timing
    // This syncs Lenis with GSAP's optimized RAF loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Disable GSAP ticker lag smoothing for more responsive scrolling
    gsap.ticker.lagSmoothing(0)

    // Connect Lenis scroll events to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Refresh ScrollTrigger after Lenis is ready
    ScrollTrigger.refresh()

    // Handle anchor link clicks for smooth scrolling to sections
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')

      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href !== '#') {
          e.preventDefault()
          const targetElement = document.querySelector(href)

          if (targetElement) {
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: -80, // Account for fixed header
              duration: 1.5, // Smooth scroll duration
              easing: (t: number) => 1 - Math.pow(1 - t, 4), // Ease out quart
            })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // Handle keyboard navigation for accessibility
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+S to toggle smooth scrolling (for users who prefer native)
      if (e.altKey && e.key === 's') {
        if (lenis.isStopped) {
          lenis.start()
          console.log('Smooth scrolling: enabled')
        } else {
          lenis.stop()
          console.log('Smooth scrolling: disabled')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Handle page visibility for performance
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenis.stop()
      } else {
        lenis.start()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup
    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  )
}