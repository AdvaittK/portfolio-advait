"use client"

import UnfoldingTransition from "./unfolding-transition"
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
  }, [pathname])

  return (
    <UnfoldingTransition>
      {children}
    </UnfoldingTransition>
  )
}