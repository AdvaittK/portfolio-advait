"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface UnfoldingTransitionProps {
  children: ReactNode
}

export default function UnfoldingTransition({ children }: UnfoldingTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)',
            opacity: 0,
            scale: 0.95,
          },
          animate: {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
              clipPath: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
              opacity: {
                duration: 0.5,
                delay: 0.2,
              },
            },
          },
          exit: {
            clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)',
            opacity: 0,
            scale: 0.95,
            transition: {
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              clipPath: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          },
        }}
        className="relative w-full"
        style={{
          transformOrigin: 'top left',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

