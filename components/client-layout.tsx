"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  useEffect(() => {
    // Dispatch route change event for Locomotive Scroll and AOS
    window.dispatchEvent(new CustomEvent('routeChange'))

    // Trigger edge route to set currency cookie based on geolocation
    // Runs once per navigation; server will set cookie if missing or needs update
    fetch('/api/currency').catch(() => {})
  }, [pathname])

  return <>{children}</>
}