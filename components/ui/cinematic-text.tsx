"use client"

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, Variants, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SplitTextProps {
  children: string
  className?: string
  type?: 'words' | 'chars'
  duration?: number
  staggerChildren?: number
  animationType?: 'fade-up' | 'slide-in' | 'glitch' | 'typewriter'
  threshold?: number
  delay?: number
}

interface CinematicTextProps {
  children: string
  className?: string
  intensity?: 'light' | 'medium' | 'heavy'
  duration?: number
  delay?: number
  threshold?: number
  splitType?: 'words' | 'chars'
}

export function SplitText({
  children,
  className,
  type = 'chars',
  duration = 0.5,
  staggerChildren = 0.03,
  animationType = 'fade-up',
  threshold = 0.3,
  delay = 0,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  
  const getAnimation = (type: string): Variants => {
    switch (type) {
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
              opacity: { duration: duration * 0.5, ease: 'easeOut' },
              y: { duration: duration, ease: [0.33, 1, 0.68, 1] },
              delay: delay + staggerChildren * i,
            },
          }),
        }
      case 'slide-in':
        return {
          hidden: { opacity: 0, y: 50, x: -20 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
              opacity: { duration: duration * 0.6 },
              y: { duration: duration, ease: [0.215, 0.61, 0.355, 1] },
              x: { duration: duration * 0.7, ease: [0.215, 0.61, 0.355, 1] },
              delay: delay + staggerChildren * i,
            },
          }),
        }
      case 'glitch':
        return {
          hidden: { opacity: 0, y: 0, 
            filter: 'blur(10px)',
            textShadow: '-2px 0 #ff0080, 2px 2px #0000ff' 
          },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            textShadow: '0 0 0 rgba(0,0,0,0)',
            transition: {
              opacity: { duration: duration * 0.4 },
              filter: { duration: duration * 0.4, ease: 'easeOut' },
              textShadow: { duration: duration * 0.5, ease: 'easeOut' },
              delay: delay + staggerChildren * i,
            },
          }),
        }
      case 'typewriter':
        return {
          hidden: { opacity: 0, scale: 1.1, y: 10 },
          visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              opacity: { duration: 0.1 },
              y: { duration: 0.3, ease: 'backOut' },
              scale: { duration: 0.3, ease: 'backOut' },
              delay: delay + staggerChildren * i,
            },
          }),
        }
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
              duration: duration,
              delay: delay + staggerChildren * i,
            },
          }),
        }
    }
  }
  
  const animation = getAnimation(animationType)
  
  // Split text into words or characters
  const splitText = () => {
    if (type === 'words') {
      return children.split(' ').map((word, i) => (
        <motion.span
          custom={i}
          key={i}
          variants={animation}
          className="inline-block mx-[0.15em] whitespace-pre"
        >
          {word}
        </motion.span>
      ))
    } else {
      return children.split('').map((char, i) => (
        <motion.span
          custom={i}
          key={i}
          variants={animation}
          className="inline-block char-animation"
          style={{
            whiteSpace: char === " " ? "pre" : "normal",
            display: "inline-block",
            marginRight: char === " " ? "0.25em" : "0"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))
    }
  }
  
  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {splitText()}
    </motion.span>
  )
}

// Rockstar Games-style cinematic text with intense reveal animations
export function CinematicText({
  children,
  className,
  intensity = 'medium',
  duration = 0.7,
  delay = 0,
  threshold = 0.3,
  splitType = 'chars',
}: CinematicTextProps) {
  const intensities = {
    light: { staggerFactor: 0.015, animType: 'fade-up' as const },
    medium: { staggerFactor: 0.025, animType: 'slide-in' as const },
    heavy: { staggerFactor: 0.035, animType: 'glitch' as const }
  }

  const { staggerFactor, animType } = intensities[intensity]
  
  return (
    <SplitText
      className={className}
      type={splitType}
      duration={duration}
      staggerChildren={staggerFactor}
      animationType={animType}
      threshold={threshold}
      delay={delay}
    >
      {children}
    </SplitText>
  )
}

// Section title with cinematic reveal
export function CinematicTitle({ 
  children,
  className
}: { 
  children: string
  className?: string 
}) {
  return (
    <h2 className={cn("text-3xl md:text-5xl font-bold mb-12", className)}>
      <CinematicText intensity="medium" splitType="chars">
        {children}
      </CinematicText>
    </h2>
  )
}