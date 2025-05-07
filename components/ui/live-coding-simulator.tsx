"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Terminal, Code, Eye } from "lucide-react"

interface LiveCodingSimulatorProps {
  className?: string
  code: string
  language?: string
  preview?: React.ReactNode
}

export const LiveCodingSimulator = ({
  className,
  code,
  language = "typescript",
  preview
}: LiveCodingSimulatorProps) => {
  const [displayedCode, setDisplayedCode] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const codeRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code")

  useEffect(() => {
    if (!codeRef.current) return

    const cursor = cursorRef.current
    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5
    })

    // Blinking cursor animation
    timeline.to(cursor, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut"
    }).to(cursor, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut"
    })

    return () => {
      timeline.kill()
    }
  }, [])

  useEffect(() => {
    if (!codeRef.current) return

    const chars = code.split("")
    let currentIndex = 0
    let currentLine = ""
    let currentLineNumber = 1
    const lines: string[] = []

    const typeNextChar = () => {
      if (currentIndex >= chars.length) {
        setIsTyping(false)
        return
      }

      const char = chars[currentIndex]
      currentLine += char

      if (char === "\n") {
        lines.push(currentLine)
        currentLine = ""
        currentLineNumber++
      }

      setDisplayedCode(lines.join("") + currentLine)
      currentIndex++

      if (currentIndex < chars.length) {
        setTimeout(typeNextChar, Math.random() * 50 + 20)
      } else {
        setIsTyping(false)
      }
    }

    typeNextChar()
  }, [code])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative w-full h-full rounded-2xl overflow-hidden",
        "backdrop-blur-xl bg-white/10 dark:bg-zinc-900/10",
        "border border-white/20 dark:border-zinc-800/20",
        "shadow-2xl",
        className
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20" />
      
      {/* Editor container */}
      <div className="relative w-full h-full flex flex-col">
        {/* Editor header */}
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 border-b border-zinc-800/50">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab("code")}
              className={cn(
                "flex items-center space-x-2 px-3 py-1 rounded-md text-sm",
                activeTab === "code"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <Code className="w-4 h-4" />
              <span>Code</span>
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={cn(
                "flex items-center space-x-2 px-3 py-1 rounded-md text-sm",
                activeTab === "preview"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Editor content */}
        <div className="flex-1 flex">
          {/* Code editor */}
          <div
            className={cn(
              "flex-1 overflow-auto",
              activeTab === "preview" && "hidden"
            )}
          >
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "1rem",
                background: "transparent",
                height: "100%"
              }}
              showLineNumbers
              wrapLines
            >
              {displayedCode}
            </SyntaxHighlighter>
            {isTyping && (
              <div
                ref={cursorRef}
                className="inline-block w-2 h-5 bg-blue-500 ml-1 animate-pulse"
              />
            )}
          </div>

          {/* Preview */}
          {preview && (
            <div
              className={cn(
                "flex-1 p-4 overflow-auto",
                activeTab === "code" && "hidden"
              )}
            >
              {preview}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="px-4 py-1 bg-zinc-900/50 border-t border-zinc-800/50 text-xs text-zinc-400 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span>{language}</span>
            <span>{displayedCode.split("\n").length} lines</span>
          </div>
          <div className="flex items-center space-x-2">
            <Terminal className="w-3 h-3" />
            <span>Live Preview</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 