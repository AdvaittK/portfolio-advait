"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { resolvedTheme } = useTheme()
  
  // Use Framer Motion's values for smoother animation
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Optimized spring configurations for better performance
  const springConfig = { damping: 25, stiffness: 700, mass: 0.1 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)
  
  // Optimized trail effect
  const trailConfig = { damping: 20, stiffness: 400, mass: 0.1 }
  const trailX = useSpring(mouseX, trailConfig)
  const trailY = useSpring(mouseY, trailConfig)
  
  // Create motion values for state tracking
  const isLinkHovered = useMotionValue(0)
  const isClicked = useMotionValue(0)
  
  // Update motion values when state changes
  useEffect(() => {
    isLinkHovered.set(linkHovered ? 1 : 0)
  }, [linkHovered, isLinkHovered])
  
  useEffect(() => {
    isClicked.set(clicked ? 1 : 0)
  }, [clicked, isClicked])
  
  // Transform values for different cursor sizes
  const cursorSize = useTransform(
    isLinkHovered, 
    [0, 1], 
    [clicked ? 16 : 16, 24]
  )
  
  const trailSize = useTransform(
    isLinkHovered,
    [0, 1],
    [clicked ? 24 : 32, 48]
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    document.body.classList.add("custom-cursor-enabled")
    document.documentElement.style.setProperty('--cursor-trail-opacity', '1')
    
    let lastTime = 0
    const onMouseMove = (e: MouseEvent) => {
      const currentTime = performance.now()
      if (currentTime - lastTime >= 16) { // Cap at ~60fps
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
        lastTime = currentTime
      }
    }

    const onMouseEnter = () => {
      setHidden(false)
      document.documentElement.style.setProperty('--cursor-trail-opacity', '1')
    }

    const onMouseLeave = () => {
      setHidden(true)
      document.documentElement.style.setProperty('--cursor-trail-opacity', '0')
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const handleLinkHoverEvents = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]')
      
      const handleMouseEnter = (e: Event) => {
        const target = e.target as HTMLElement
        const rect = target.getBoundingClientRect()
        const isInViewport = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= window.innerHeight &&
          rect.right <= window.innerWidth
        )

        if (isInViewport) {
          setLinkHovered(true)
        }
      }
      
      const handleMouseLeave = () => {
        setLinkHovered(false)
      }
      
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter)
        el.addEventListener("mouseleave", handleMouseLeave)
      })
      
      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnter)
          el.removeEventListener("mouseleave", handleMouseLeave)
        })
      }
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseenter", onMouseEnter)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)
    
    const cleanupHoverEvents = handleLinkHoverEvents()

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      cleanupHoverEvents()
      
      document.body.classList.remove("custom-cursor-enabled")
      document.documentElement.style.removeProperty('--cursor-trail-opacity')
    }
  }, [mounted, mouseX, mouseY])

  if (!mounted) return null;

  return (
    <>
      {/* Primary cursor dot with hardware acceleration */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[99999]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          scale: linkHovered ? 1.5 : clicked ? 0.8 : 1,
          backgroundColor: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(4px)',
        }}
      />
      
      {/* Trailing cursor ring with hardware acceleration */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99999]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          scale: clicked ? 0.9 : 1,
          border: `2px solid ${resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'}`,
          backdropFilter: 'blur(1px)',
        }}
      />
    </>
  )
}
