"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  // Add a state to track if mouse movement has been detected
  const [mouseDetected, setMouseDetected] = useState(false)
  // Add a debugging state that can be toggled if needed
  const [forceEnable, setForceEnable] = useState(false)
  const { resolvedTheme } = useTheme()
  
  // Enable debug keybinding (Ctrl+Alt+C) to toggle cursor on problematic systems
  useEffect(() => {
    if (!mounted) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Alt+C to toggle cursor
      if (e.ctrlKey && e.altKey && e.key === 'c') {
        setForceEnable(prev => !prev);
        setIsMobile(false); // Force disable mobile mode
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mounted]);
  
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
    
    // Only run device detection code on the client side
    if (typeof window !== 'undefined') {
      // Check if device is mobile or touch device with improved desktop detection
      const checkDevice = () => {
        // Check for mobile user agents first (more reliable indicator)
        const mobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
        
        // Only consider touch capabilities on smaller screens to avoid false positives on desktop touch screens
        const isTouchDevice = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && 
                              window.matchMedia('(max-width: 1024px)').matches;
        
        // Check if screen width is typical for mobile devices
        const isMobileWidth = window.matchMedia('(max-width: 768px)').matches;
        
        // If it's a large screen (like 1080p desktop), force enable the cursor regardless of touch capability
        const isDesktopResolution = window.matchMedia('(min-width: 1200px)').matches;
        
        // We're considering it mobile only if it matches mobile indicators AND is not a desktop resolution
        setIsMobile((mobileUserAgent || isTouchDevice || isMobileWidth) && !isDesktopResolution);
      };
      
      // Initial check
      checkDevice();
      
      // Add resize listener
      window.addEventListener('resize', checkDevice);
      
      return () => {
        window.removeEventListener('resize', checkDevice);
      };
    }
  }, [])

  // Detect mouse movement globally - but only set if it's a genuine mouse (not touch event)
  useEffect(() => {
    // Skip this effect during server-side rendering
    if (!mounted || typeof window === 'undefined' || typeof document === 'undefined') return;
    
    let hasTouch = false;
    let hasMouse = false;
    
    // Detect touch first
    const detectTouch = () => {
      hasTouch = true;
      // Remove mouse detection if touch happens first
      document.removeEventListener('mousemove', detectMouseMovement);
    };
    
    // Only set mouseDetected if we have mouse movement and no touch events fired
    const detectMouseMovement = (e: MouseEvent) => {
      // If touch hasn't been detected yet, this is likely a real mouse
      if (!hasTouch) {
        hasMouse = true;
        setMouseDetected(true);
        setIsMobile(false); // Override mobile detection when genuine mouse is used
      }
    };
    
    document.addEventListener('touchstart', detectTouch, { once: true });
    document.addEventListener('mousemove', detectMouseMovement, { once: true });
    
    // Cleanup function
    return () => {
      document.removeEventListener('touchstart', detectTouch);
      document.removeEventListener('mousemove', detectMouseMovement);
    };
  }, [mounted]);

  // Add a separate effect to detect touch events and disable cursor
  useEffect(() => {
    // Skip this effect during server-side rendering
    if (!mounted || typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // Handler for first touch - disables custom cursor
    const handleFirstTouch = () => {
      // If we detect a touch event, this is likely a touch device, disable cursor
      setMouseDetected(false);
      setIsMobile(true);
      
      // Remove the custom cursor classes
      document.body.classList.remove("custom-cursor-enabled");
      document.documentElement.style.removeProperty('--cursor-trail-opacity');
    };
    
    // Add event listener for touch start
    document.addEventListener('touchstart', handleFirstTouch, { once: true });
    
    return () => {
      document.removeEventListener('touchstart', handleFirstTouch);
    };
  }, [mounted]);

  useEffect(() => {
    // Ensure we only run this effect on the client side
    if (!mounted || typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // Show the cursor if mouse is detected or it's not a mobile device or force enabled
    if (mouseDetected || !isMobile || forceEnable) {
      // Force enable cursor when mouse is detected or on desktop systems
      document.body.classList.add("custom-cursor-enabled")
      document.documentElement.style.setProperty('--cursor-trail-opacity', '1')
    } else {
      // Only remove cursor if no mouse detected and on mobile
      document.body.classList.remove("custom-cursor-enabled")
      document.documentElement.style.removeProperty('--cursor-trail-opacity')
      return
    }
    
    let lastTime = 0
    const onMouseMove = (e: MouseEvent) => {
      // Simple approach: if we receive mouse events and touch hasn't been used yet,
      // consider it a genuine mouse
      
      // Only update mouseDetected if not already set
      if (!mouseDetected) {
        setMouseDetected(true);
      }
      
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
  }, [mounted, mouseX, mouseY, isMobile, forceEnable, mouseDetected])

  // Check for touch support directly when deciding to render - safely with SSR
  const isTouchOnly = typeof window !== 'undefined' ? ('ontouchstart' in window && !mouseDetected) : false;
  
  // Show cursor if:
  // 1. Component is mounted AND
  // 2. EITHER:
  //    a) Mouse has been detected OR
  //    b) Force enabled OR
  //    c) Not a mobile/touch-only device
  if (!mounted || (isTouchOnly && isMobile && !forceEnable) || (!mouseDetected && isMobile && !forceEnable)) return null;
  
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