"use client"

import { ReactNode, useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface AOSProviderProps {
  children: ReactNode
}

export default function AOSProvider({ children }: AOSProviderProps) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Only initialize AOS on desktop for better mobile performance
    const checkDesktop = window.innerWidth > 1024
    setIsDesktop(checkDesktop)
    
    if (!checkDesktop) return // Skip AOS on mobile/tablet

    AOS.init({
      duration: 800,
      easing: 'ease-in-out-cubic',
      once: true,
      offset: 100,
      delay: 0,
      anchorPlacement: 'top-bottom',
      disable: false,
      startEvent: 'DOMContentLoaded',
      animatedClassName: 'aos-animate',
      initClassName: 'aos-init',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
    })

    // Refresh AOS on route changes
    const handleRouteChange = () => {
      setTimeout(() => {
        AOS.refresh()
      }, 100)
    }

    window.addEventListener('routeChange', handleRouteChange)

    return () => {
      window.removeEventListener('routeChange', handleRouteChange)
      if (isDesktop) {
        AOS.refreshHard()
      }
    }
  }, [])

  return <>{children}</>
}

