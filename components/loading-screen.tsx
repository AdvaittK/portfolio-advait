"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const preloader = preloaderRef.current
    const text = textRef.current

    if (!preloader || !text) return

    // Split text into characters
    const chars = text.innerText.split("")
    text.innerHTML = ""
    chars.forEach((char) => {
      const span = document.createElement("span")
      span.className = "preloader-char"
      span.textContent = char === " " ? "\u00A0" : char
      text.appendChild(span)
    })

    const tl = gsap.timeline()

    // Start with the text completely hidden
    gsap.set(".preloader-char", {
      y: 100,
      opacity: 0
    })
    
    // Only show the black background initially
    tl
      // Animate each character quickly
      .to(".preloader-char", {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.4,
        ease: "power4.out",
        delay: 0.1,
      })
      .to(".preloader-char", {
        y: -100,
        opacity: 0,
        stagger: 0.02,
        duration: 0.3,
        ease: "power4.in",
        delay: 0.2,
      })
      .to(preloader, {
        x: "100%",
        duration: 0.4,
        ease: "power4.inOut",
        onStart: () => {
          // Trigger transition before the preloader slides out
          const event = new CustomEvent('preloaderComplete')
          window.dispatchEvent(event)
        },
        onComplete: () => {
          // Keep scroll disabled until transition is complete
          setTimeout(() => {
            document.body.style.overflow = "auto"
          }, 1000)
        },
      })

    // Prevent scrolling during preloader
    document.body.style.overflow = "hidden"

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div ref={preloaderRef} className="preloader fixed inset-0 bg-black z-[9999] flex items-center justify-center">
      <div ref={textRef} className="preloader-text preloader-text-small font-montserrat text-white text-4xl">
        PORTFOLIO
      </div>
    </div>
  )
}
