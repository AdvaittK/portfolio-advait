"use client"

import { ReactNode, useEffect, useRef, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface SmoothScrollProviderProps {
  children: ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  // Initialize Lenis smooth scrolling only on desktop
  useEffect(() => {
    // Determine device on mount
    setIsDesktop(typeof window !== 'undefined' ? window.innerWidth > 1024 : false)
  }, [])

  useEffect(() => {
    // Skip initialization on mobile/tablet to reduce initial JS and potential conflicts
    if (!isDesktop) return

    gsap.registerPlugin(ScrollTrigger)

    // Optimized settings for high-performance, natural feeling scrolling
    lenisRef.current = new Lenis({
      duration: 0.6, // Faster response time for snappier scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Optimized easing curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.8, // Higher multiplier for faster scrolling speed
      touchMultiplier: 3, // Higher touch multiplier for mobile
      infinite: false,
    })

    // Optional: Add a way to temporarily disable smooth scrolling with keyboard shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+S to toggle smooth scrolling
      if (e.altKey && e.key === 's') {
        if (lenisRef.current) {
          // Access the internal configuration properly
          const isSmoothEnabled = lenisRef.current.isSmooth;
          
          // Toggle smooth scrolling
          if (isSmoothEnabled) {
            lenisRef.current.stop();
            lenisRef.current.destroy();
            lenisRef.current = new Lenis({
              duration: 0.6,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              orientation: 'vertical',
              gestureOrientation: 'vertical',
              smoothWheel: false, // Disable smooth scrolling
              wheelMultiplier: 1.8,
              touchMultiplier: 3,
              infinite: false,
            });
            console.log('Smooth scrolling: disabled');
          } else {
            lenisRef.current.stop();
            lenisRef.current.destroy();
            lenisRef.current = new Lenis({
              duration: 0.6,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              orientation: 'vertical',
              gestureOrientation: 'vertical',
              smoothWheel: true, // Enable smooth scrolling
              wheelMultiplier: 1.8,
              touchMultiplier: 3,
              infinite: false,
            });
            console.log('Smooth scrolling: enabled');
          }
          
          // Reconnect all integrations
          gsap.ticker.add((time) => {
            lenisRef.current?.raf(time * 1000)
          });
          
          lenisRef.current.on('scroll', ScrollTrigger.update);
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);

    // Use requestAnimationFrame directly for more consistent performance
    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Update ScrollTrigger when Lenis scrolls with throttling to improve performance
    let lastScrollTime = 0;
    const scrollThreshold = 20; // ms threshold

    lenisRef.current.on('scroll', (e: any) => {
      const now = performance.now();
      if (now - lastScrollTime > scrollThreshold) {
        ScrollTrigger.update();
        lastScrollTime = now;
      }
    });

    return () => {
      // Cleanup on unmount
      window.removeEventListener('keydown', handleKeyDown);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    }
  }, [isDesktop])

  return <>{children}</>
}