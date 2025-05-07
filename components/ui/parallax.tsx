"use client"

import { useRef, useState, useEffect, ReactNode, CSSProperties } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { cn } from "@/lib/utils"

interface ParallaxProps {
  children: ReactNode
  speed?: number // Speed multiplier (negative = opposite direction)
  className?: string
  style?: CSSProperties
  direction?: 'up' | 'down' | 'left' | 'right'
  mouseParallax?: boolean // Enable mouse movement parallax
  mouseIntensity?: number // Intensity of mouse parallax effect (0-1)
  offset?: number // Starting offset in pixels (used for staggered effect)
  rotate?: boolean // Whether to add a slight rotation effect
}

export function Parallax({
  children,
  speed = 0.5,
  className,
  style,
  direction = 'up',
  mouseParallax = false,
  mouseIntensity = 0.05,
  offset = 0,
  rotate = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  // Convert direction to x/y values
  const getDirectionalMovement = () => {
    switch(direction) {
      case 'up': return { x: 0, y: 1 }
      case 'down': return { x: 0, y: -1 }
      case 'left': return { x: 1, y: 0 }
      case 'right': return { x: -1, y: 0 }
      default: return { x: 0, y: 1 }
    }
  }
  
  const directionMultiplier = getDirectionalMovement()
  
  // Calculate the parallax effect based on scroll position
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [offset, offset + (-200 * speed * directionMultiplier.y)]
  )
  
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, -100 * speed * directionMultiplier.x]
  )
  
  // Subtle rotation effect based on scroll position if enabled
  const rotateEffect = rotate 
    ? useTransform(scrollYProgress, [0, 1], [0, speed * 2])
    : useTransform(scrollYProgress, [0, 1], [0, 0])
  
  // Mouse parallax logic
  useEffect(() => {
    if (!mouseParallax) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      
      // Normalize mouse position from -1 to 1
      const normalizedX = (e.clientX / windowWidth) * 2 - 1
      const normalizedY = (e.clientY / windowHeight) * 2 - 1
      
      setMousePosition({
        x: normalizedX,
        y: normalizedY
      })
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseParallax])
  
  // Combine scroll-based movement with mouse-based movement
  const mouseX = mouseParallax ? mousePosition.x * (mouseIntensity * 100) * -1 : 0
  const mouseY = mouseParallax ? mousePosition.y * (mouseIntensity * 100) * -1 : 0
  
  return (
    <motion.div
      ref={ref}
      style={{
        x: x as MotionValue<number>,
        y: y as MotionValue<number>,
        rotateZ: rotateEffect as MotionValue<number>,
        ...style
      }}
      className={cn(
        "parallax-layer will-change-transform",
        className
      )}
    >
      {mouseParallax ? (
        <motion.div
          animate={{
            x: mouseX,
            y: mouseY
          }}
          transition={{
            type: "spring",
            stiffness: 75,
            damping: 15,
            mass: 0.5
          }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  )
}

// For background images with parallax effect
export function ParallaxBackground({
  children,
  speed = 0.2,
  className,
  style,
}: ParallaxProps) {
  return (
    <Parallax
      speed={speed}
      className={cn("parallax-bg", className)}
      style={style}
    >
      {children}
    </Parallax>
  )
}

// For text elements with parallax effect
export function ParallaxText({
  children,
  speed = 0.3,
  className,
  direction = 'up',
  offset = 0,
}: ParallaxProps) {
  return (
    <Parallax
      speed={speed}
      direction={direction}
      className={cn("inline-block", className)}
      offset={offset}
    >
      {children}
    </Parallax>
  )
}