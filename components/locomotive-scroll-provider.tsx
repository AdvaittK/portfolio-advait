"use client"

import { ReactNode, useEffect, useRef, useState } from 'react'

interface LocomotiveScrollProviderProps {
  children: ReactNode
}

export default function LocomotiveScrollProvider({ children }: LocomotiveScrollProviderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const locomotiveScrollRef = useRef<any>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || !scrollRef.current || typeof window === 'undefined') return

    let cleanup: (() => void) | null = null

    // Dynamically import Locomotive Scroll only on client side
    import('locomotive-scroll').then((LocomotiveScroll) => {
      if (!scrollRef.current) return

      // Initialize Locomotive Scroll
      locomotiveScrollRef.current = new LocomotiveScroll.default({
        el: scrollRef.current,
        smooth: true,
        smoothMobile: false, // Disable on mobile for better performance
        multiplier: 1,
        class: 'is-revealed',
        scrollbarContainer: undefined,
        resetNativeScroll: true,
        lerp: 0.1,
        smartphone: {
          smooth: false,
        },
        tablet: {
          smooth: false,
        },
      })

      // Update on resize with debounce
      let resizeTimer: NodeJS.Timeout
      const handleResize = () => {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(() => {
          locomotiveScrollRef.current?.update()
        }, 150)
      }

      window.addEventListener('resize', handleResize)

      // Update scroll on route change
      const handleRouteChange = () => {
        setTimeout(() => {
          locomotiveScrollRef.current?.update()
          locomotiveScrollRef.current?.scrollTo(0, { duration: 0 })
        }, 300)
      }

      window.addEventListener('routeChange', handleRouteChange)

      cleanup = () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('routeChange', handleRouteChange)
        clearTimeout(resizeTimer)
        if (locomotiveScrollRef.current) {
          locomotiveScrollRef.current.destroy()
          locomotiveScrollRef.current = null
        }
      }
    })

    return () => {
      if (cleanup) cleanup()
    }
  }, [isMounted])

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  )
}

