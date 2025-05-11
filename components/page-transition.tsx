"use client"

import { motion } from 'framer-motion'
import { ReactNode, useRef, useEffect } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pageRef = useRef<HTMLDivElement>(null)
  
  // Apply hardware acceleration to the page transition
  useEffect(() => {
    if (pageRef.current) {
      // Force GPU rendering for smoother animations
      pageRef.current.style.transform = 'translateZ(0)' 
      pageRef.current.style.backfaceVisibility = 'hidden'
      pageRef.current.style.perspective = '1000px'
    }
  }, [])
  
  return (
    <motion.div
      ref={pageRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1 // Reduced delay
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  )
}