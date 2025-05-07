"use client"

import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

// Import MetallicBackground with SSR disabled for better performance
const MetallicBackground = dynamic(() => import("./metallic-bg"), { ssr: false })

export default function ClientMetallicBg() {
  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  
  return (
    <>
      <MetallicBackground theme={currentTheme || 'dark'} />
      {/* Add subtle blur overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fixed inset-0 pointer-events-none -z-5 backdrop-blur-[2px]"
        style={{ 
          backgroundColor: 'transparent',
          backdropFilter: 'blur(2px)'
        }}
        aria-hidden="true"
      />
    </>
  )
}