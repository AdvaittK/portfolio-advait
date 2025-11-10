"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Code, Hash, Braces, FileCode, Brackets, Terminal } from "lucide-react"

// Use a seeded random number generator for consistent values with fixed precision
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return Number((x - Math.floor(x)).toFixed(4))
}

export default function TransitionOverlay() {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const codeSymbolsRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  
  // Generate random positions for symbols with consistent seed and fixed precision
  const getRandomPositions = (count: number) => {
    const positions = []
    for (let i = 0; i < count; i++) {
      positions.push({
        x: Number((seededRandom(i) * 100).toFixed(2)),
        y: Number((seededRandom(i + 100) * 100).toFixed(2)),
        size: Number((seededRandom(i + 200) * 1.5 + 1).toFixed(2)),
        rotate: Number((seededRandom(i + 300) * 40 - 20).toFixed(2))
      })
    }
    return positions
  }

  // Trigger transition immediately on mount (no loading screen)
  useEffect(() => {
    if (overlayRef.current) {
      // Show overlay immediately
      gsap.set(overlayRef.current, {
        display: 'flex',
        opacity: 1,
        clipPath: "inset(0 100% 0 0)"
      })
    }
    setShouldAnimate(true)
  }, [])

  // Use GSAP for a more sophisticated transition effect
  useEffect(() => {
    if (!overlayRef.current || !codeSymbolsRef.current || !shouldAnimate) return
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const tl = gsap.timeline()
    const symbols = codeSymbolsRef.current.children

    // First phase - overlay wipes in with code symbols animation
    tl.to(overlayRef.current, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.3,
      ease: "power3.inOut",
      onStart: () => {
        // Animate in code symbols as the wipe happens
        gsap.fromTo(symbols, 
          {
            opacity: 0,
            scale: 0,
            rotation: (i) => Number((seededRandom(i) * 20 - 10).toFixed(2))
          }, 
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            stagger: { 
              each: 0.02, 
              from: "random" 
            },
            duration: 0.3,
            ease: "back.out(1.7)",
          }
        )
      }
    })
    
    // Brief pause at full overlay
    .to({}, { duration: 0.1 })
    
    // Animate out code symbols
    .to(symbols, {
      opacity: 0,
      scale: 1.5,
      rotate: (i) => Number((seededRandom(i) * 40 - 20).toFixed(2)),
      stagger: { 
        each: 0.01, 
        from: "random" 
      },
      duration: 0.2,
      ease: "power1.in"
    })
    
    // Wipe out the overlay
    .to(overlayRef.current, {
      clipPath: "inset(0 0 0 100%)",
      duration: 0.3,
      ease: "power3.inOut",
      onComplete: () => {
        // Hide overlay completely after animation
        gsap.set(overlayRef.current, {
          display: 'none',
          opacity: 0
        })
        // Dispatch transition complete event
        window.dispatchEvent(new CustomEvent('transitionComplete'))
      }
    }, "-=0.1")
    
    // Cleanup function
    return () => {
      tl.kill()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [shouldAnimate])

  // Random positions for all symbols with consistent seed and fixed precision
  const symbolPositions = getRandomPositions(30) // Reduced number of symbols for better performance
  
  // Code symbols for the transition animation
  const codeSymbols = [
    "{}", "<>", "()", "[]", "//", "/*", "*/", "=>", ";;", "&&", "||", "++",
    "!=", "==", "===", "+=", "-=", "*=", "/=", "!!", "??", "?.", "...", "::"
  ]

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
      style={{ display: 'none', overflow: 'hidden' }}
      aria-hidden="true"
      data-transition-overlay
    >
      {/* Metallic black gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 via-black to-zinc-900">
        {/* Metallic overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,120,120,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_50%,rgba(255,255,255,0.05)_100%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>
      
      {/* Scattered code symbols */}
      <div ref={codeSymbolsRef} className="absolute inset-0 overflow-hidden">
        {symbolPositions.map((pos, index) => (
          <div 
            key={index} 
            className="absolute font-mono font-bold text-white/60"
            style={{ 
              left: `${pos.x}%`, 
              top: `${pos.y}%`,
              fontSize: `${pos.size}rem`,
              transform: `rotate(${pos.rotate}deg)`,
            }}
          >
            {codeSymbols[index % codeSymbols.length]}
          </div>
        ))}
        
        {/* Icon symbols scattered around with fixed positions */}
        <Code className="absolute text-white/70" style={{ left: '15%', top: '25%', width: 40, height: 40 }} />
        <Braces className="absolute text-white/70" style={{ left: '78%', top: '42%', width: 35, height: 35 }} />
        <FileCode className="absolute text-white/70" style={{ left: '35%', top: '67%', width: 38, height: 38 }} />
        <Brackets className="absolute text-white/70" style={{ left: '85%', top: '18%', width: 36, height: 36 }} />
        <Terminal className="absolute text-white/70" style={{ left: '22%', top: '82%', width: 42, height: 42 }} />
        <Hash className="absolute text-white/70" style={{ left: '65%', top: '75%', width: 30, height: 30 }} />

        {/* Central logo/symbol */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Code size={100} className="text-white" strokeWidth={1} />
        </div>
      </div>
    </div>
  )
}