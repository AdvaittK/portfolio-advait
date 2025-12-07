"use client"

import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

// Import Waves with SSR disabled for better performance
const Waves = dynamic(() => import("./metallic-bg"), { ssr: false })

export default function ClientMetallicBg() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'

  return (
    <Waves 
      lineColor={isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}
      backgroundColor="transparent"
      waveSpeedX={0.015}
      waveSpeedY={0.008}
      waveAmpX={24}
      waveAmpY={12}
      xGap={12}
      yGap={28}
      friction={0.93}
      tension={0.004}
      maxCursorMove={120}
      className="-z-10 pointer-events-none"
    />
  )
}