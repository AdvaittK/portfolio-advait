"use client"

import { useRef, useEffect, ReactNode, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

interface ScrollSectionProps {
  children: ReactNode
  className?: string
  pinned?: boolean
  id?: string
  triggerStart?: string // ScrollTrigger start position
  triggerEnd?: string // ScrollTrigger end position
  transition?: {
    type?: 'fade' | 'slide' | 'zoom' | 'none'
    direction?: 'up' | 'down' | 'left' | 'right'
    intensity?: 'light' | 'medium' | 'heavy'
  }
  fadeInChildren?: boolean
  staggerChildren?: number
  backgroundParallax?: boolean
}

export default function ScrollSection({
  children,
  className,
  pinned = false,
  id,
  triggerStart = 'top bottom',
  triggerEnd = 'bottom top',
  transition = {
    type: 'fade',
    direction: 'up',
    intensity: 'medium'
  },
  fadeInChildren = false,
  staggerChildren = 0.1,
  backgroundParallax = false,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])
  
  // Set up scroll-based animations
  useEffect(() => {
    if (!sectionRef.current) return
    
    const section = sectionRef.current
    
    // Get transition parameters
    const { type, direction, intensity } = transition
    
    // Helper to calculate transform values based on direction
    const getTransform = () => {
      const intensityValue = 
        intensity === 'light' ? 50 :
        intensity === 'heavy' ? 150 : 100
        
      switch (direction) {
        case 'up': return `translateY(${intensityValue}px)`
        case 'down': return `translateY(-${intensityValue}px)`
        case 'left': return `translateX(${intensityValue}px)`
        case 'right': return `translateX(-${intensityValue}px)`
        default: return `translateY(${intensityValue}px)`
      }
    }
    
    // Initial state for the section
    if (type !== 'none') {
      gsap.set(section, {
        opacity: 0,
        ...(type === 'slide' && { transform: getTransform() }),
        ...(type === 'zoom' && { transform: 'scale(0.9)' }),
      })
    }
    
    // Create timeline for the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: triggerStart,
        end: triggerEnd,
        toggleActions: "play none none none",
        onEnter: () => setIsVisible(true),
        ...(pinned ? {
          pin: true,
          pinSpacing: true,
          scrub: true,
        } : {})
      }
    })
    
    // Animate the section
    if (type !== 'none') {
      tl.to(section, {
        opacity: 1,
        ...(type === 'slide' && { transform: 'translate(0, 0)' }),
        ...(type === 'zoom' && { transform: 'scale(1)' }),
        duration: 0.8,
        ease: "power3.out",
      })
    }
    
    // Staggered animation for children
    if (fadeInChildren) {
      const childElements = section.querySelectorAll('.animate-on-scroll')
      tl.fromTo(childElements, 
        { 
          opacity: 0, 
          y: 30 
        }, 
        {
          opacity: 1,
          y: 0,
          stagger: staggerChildren,
          duration: 0.5,
          ease: "power2.out",
        }, 
        "-=0.4" // Start slightly before the main animation ends
      )
    }
    
    return () => {
      // Clean up ScrollTrigger
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill()
      }
    }
  }, [transition, triggerStart, triggerEnd, pinned, fadeInChildren, staggerChildren])
  
  // Set up background parallax if enabled
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Smoother animation with spring physics
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30,
    restDelta: 0.001 
  })
  
  const backgroundY = useTransform(
    smoothProgress,
    [0, 1],
    ['0%', '20%']
  )
  
  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative w-full overflow-hidden",
        className
      )}
    >
      {/* Background parallax layer if enabled */}
      {backgroundParallax && (
        <motion.div 
          className="absolute inset-0 -z-10"
          style={{
            y: backgroundY as MotionValue<string>,
            scale: 1.2
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        </motion.div>
      )}
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}

// Helper component for items that animate when the parent section becomes visible
export function AnimatedItem({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <div 
      className={cn("animate-on-scroll opacity-0", className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}