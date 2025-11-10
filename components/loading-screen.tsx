"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const codeLines = [
  "const portfolio = {",
  "  developer: 'Advait',",
  "  stack: ['React', 'Next.js', 'Node.js'],",
  "  status: 'Building...'",
  "};"
]

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const codeContainerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const progressContainerRef = useRef<HTMLDivElement>(null)
  const percentageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const preloader = preloaderRef.current
    const codeContainer = codeContainerRef.current
    const progressBar = progressBarRef.current
    const progressContainer = progressContainerRef.current
    const percentage = percentageRef.current

    if (!preloader || !codeContainer || !progressBar || !progressContainer || !percentage) return

    // Prevent scrolling during preloader
    document.body.style.overflow = "hidden"

    const tl = gsap.timeline()

    // Initial state - everything hidden
    gsap.set([codeContainer, progressContainer, percentage], {
      opacity: 0,
      y: 20
    })

    // Create code lines with syntax highlighting
    codeContainer.innerHTML = ""
    codeLines.forEach((line, index) => {
      const lineDiv = document.createElement("div")
      lineDiv.className = "flex items-center gap-2 font-mono text-sm sm:text-base"
      lineDiv.style.opacity = "0"
      lineDiv.style.transform = "translateY(10px)"
      
      // Parse line for syntax highlighting
      const parts = line.match(/(const|let|var|=>|{|}|\[|\]|'[^']*'|:)/g) || []
      let lastIndex = 0
      const elements: HTMLElement[] = []
      
      parts.forEach((part) => {
        const partIndex = line.indexOf(part, lastIndex)
        if (partIndex > lastIndex) {
          const textSpan = document.createElement("span")
          textSpan.className = "text-zinc-400"
          textSpan.textContent = line.substring(lastIndex, partIndex)
          elements.push(textSpan)
        }
        
        const keywordSpan = document.createElement("span")
        if (part === "const" || part === "let" || part === "var") {
          keywordSpan.className = "text-purple-400"
        } else if (part === "=>") {
          keywordSpan.className = "text-blue-400"
        } else if (part === "{" || part === "}" || part === "[" || part === "]") {
          keywordSpan.className = "text-yellow-400"
        } else if (part.startsWith("'")) {
          keywordSpan.className = "text-green-400"
        } else if (part === ":") {
          keywordSpan.className = "text-zinc-300"
        } else {
          keywordSpan.className = "text-zinc-400"
        }
        keywordSpan.textContent = part
        elements.push(keywordSpan)
        
        lastIndex = partIndex + part.length
      })
      
      if (lastIndex < line.length) {
        const textSpan = document.createElement("span")
        textSpan.className = "text-zinc-400"
        textSpan.textContent = line.substring(lastIndex)
        elements.push(textSpan)
      }
      
      elements.forEach(el => lineDiv.appendChild(el))
      codeContainer.appendChild(lineDiv)
    })

    // Animate code lines typing effect
    const codeLineElements = codeContainer.children
    let lineIndex = 0
    
    const typeNextLine = () => {
      if (lineIndex < codeLineElements.length) {
        const line = codeLineElements[lineIndex] as HTMLElement
        const chars = line.textContent || ""
        
        // Clear and type character by character
        line.innerHTML = ""
        let charIndex = 0
        
        const typeChar = () => {
          if (charIndex < chars.length) {
            const originalLine = codeLines[lineIndex]
            const currentText = originalLine.substring(0, charIndex + 1)
            
            // Rebuild with syntax highlighting
            line.innerHTML = ""
            const parts = originalLine.match(/(const|let|var|=>|{|}|\[|\]|'[^']*'|:)/g) || []
            let lastIdx = 0
            
            parts.forEach((part) => {
              const partIdx = originalLine.indexOf(part, lastIdx)
              if (partIdx > lastIdx && partIdx < currentText.length) {
                const textSpan = document.createElement("span")
                textSpan.className = "text-zinc-400"
                textSpan.textContent = originalLine.substring(lastIdx, Math.min(partIdx, currentText.length))
                line.appendChild(textSpan)
              }
              
              if (partIdx < currentText.length && partIdx + part.length <= currentText.length) {
                const keywordSpan = document.createElement("span")
                if (part === "const" || part === "let" || part === "var") {
                  keywordSpan.className = "text-purple-400"
                } else if (part === "=>") {
                  keywordSpan.className = "text-blue-400"
                } else if (part === "{" || part === "}" || part === "[" || part === "]") {
                  keywordSpan.className = "text-yellow-400"
                } else if (part.startsWith("'")) {
                  keywordSpan.className = "text-green-400"
                } else if (part === ":") {
                  keywordSpan.className = "text-zinc-300"
                } else {
                  keywordSpan.className = "text-zinc-400"
                }
                keywordSpan.textContent = part
                line.appendChild(keywordSpan)
              }
              
              lastIdx = partIdx + part.length
            })
            
            if (lastIdx < currentText.length) {
              const textSpan = document.createElement("span")
              textSpan.className = "text-zinc-400"
              textSpan.textContent = originalLine.substring(lastIdx, currentText.length)
              line.appendChild(textSpan)
            }
            
            // Add blinking cursor
            const cursor = document.createElement("span")
            cursor.className = "text-yellow-400 animate-blink"
            cursor.textContent = "|"
            line.appendChild(cursor)
            
            charIndex++
            setTimeout(typeChar, 30 + Math.random() * 20)
          } else {
            // Remove cursor and move to next line
            const cursor = line.querySelector(".animate-blink")
            if (cursor) cursor.remove()
            lineIndex++
            setTimeout(typeNextLine, 200)
          }
        }
        
        gsap.to(line, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        })
        
        typeChar()
      } else {
        // All lines typed, show progress
        showProgress()
      }
    }

    const showProgress = () => {
      // Show progress bar and percentage
      gsap.to([progressContainer, percentage], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      })

      // Animate progress from 0 to 100
      let progressValue = 0
      const progressInterval = setInterval(() => {
        progressValue += 2
        if (progressValue <= 100) {
          gsap.to(progressBar, {
            scaleX: progressValue / 100,
            duration: 0.1,
            ease: "none",
            transformOrigin: "left"
          })
          if (percentage) {
            percentage.textContent = `${progressValue}%`
          }
        } else {
          clearInterval(progressInterval)
          // Complete animation
          completeLoading()
        }
      }, 30)
    }

    const completeLoading = () => {
      tl.to([codeContainer, progressContainer, percentage], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.05
      })
      .to(preloader, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        ease: "power3.inOut",
        onStart: () => {
          const event = new CustomEvent('preloaderComplete')
          window.dispatchEvent(event)
        },
        onComplete: () => {
          setTimeout(() => {
            document.body.style.overflow = "auto"
          }, 1000)
        },
      }, "-=0.2")
    }

    // Start animation
    setTimeout(() => {
      typeNextLine()
    }, 300)

    return () => {
      tl.kill()
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div 
      ref={preloaderRef} 
      className="preloader fixed inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 z-[9999] flex flex-col items-center justify-center gap-8"
      style={{
        clipPath: "inset(0 0 0 0)"
      }}
    >
      {/* Code Container */}
      <div 
        ref={codeContainerRef} 
        className="flex flex-col gap-2 px-6 py-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-lg shadow-2xl"
        style={{
          minWidth: "320px",
          maxWidth: "90vw"
        }}
      >
        {/* Code lines will be inserted here */}
      </div>

      {/* Progress Bar */}
      <div ref={progressContainerRef} className="flex flex-col items-center gap-3 w-full max-w-md px-6">
        <div className="w-full h-0.5 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full"
            style={{
              transform: "scaleX(0)",
              transformOrigin: "left"
            }}
          />
        </div>
        <div 
          ref={percentageRef}
          className="font-mono text-xs text-zinc-500 tracking-wider"
        >
          0%
        </div>
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }}
      />
    </div>
  )
}
