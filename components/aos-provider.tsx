"use client"

import { ReactNode, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface AOSProviderProps {
  children: ReactNode
}

export default function AOSProvider({ children }: AOSProviderProps) {
  useEffect(() => {
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
      AOS.refreshHard()
    }
  }, [])

  return <>{children}</>
}

