"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js"
import { Radar } from "react-chartjs-2"
import { useTheme } from "next-themes"

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

interface SkillsRadarBrowserProps {
  className?: string
  skills?: { name: string; value: number }[]
}

export const SkillsRadarBrowser = ({
  className,
  skills = [
    { name: "React", value: 90 },
    { name: "Next.js", value: 85 },
    { name: "TypeScript", value: 80 },
    { name: "Node.js", value: 75 },
    { name: "Tailwind", value: 90 },
    { name: "MongoDB", value: 70 }
  ]
}: SkillsRadarBrowserProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend'>('frontend')
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"
  
  // Mouse movement for tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [5, -5]), {
    stiffness: 300,
    damping: 30
  })
  
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-5, 5]), {
    stiffness: 300,
    damping: 30
  })

  // Add useEffect to handle tab changes
  useEffect(() => {
    // Force a re-render when tab changes
    const contentArea = document.querySelector('.content-area')
    if (contentArea) {
      contentArea.scrollTop = 0
    }
  }, [activeTab])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const frontendSkills = [
    { name: "React", level: 90, color: "from-blue-400 to-blue-600" },
    { name: "Next.js", level: 95, color: "from-purple-400 to-purple-600" },
    { name: "TypeScript", level: 80, color: "from-cyan-400 to-cyan-600" },
    { name: "Tailwind", level: 90, color: "from-teal-400 to-teal-600" }
  ]

  const backendSkills = [
    { name: "Node.js", level: 90, color: "from-green-400 to-green-600" },
    { name: "Express", level: 80, color: "from-yellow-400 to-yellow-600" },
    { name: "MongoDB", level: 75, color: "from-emerald-400 to-emerald-600" },
    { name: "PostgreSQL", level: 75, color: "from-blue-500 to-blue-700" },
    { name: "Docker", level: 75, color: "from-sky-400 to-sky-600" }
  ]

  const frontendCode = `// React Component with TypeScript
import { useState } from 'react';

type SkillProps = {
  name: string;
  level: number;
};

export function SkillMeter({ 
  name, 
  level 
}: SkillProps) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div className="skill-meter">
      <div className="skill-name">{name}</div>
      <div className="skill-level">{level}%</div>
    </div>
  );
}`

  const backendCode = `// Express API Route
import express from 'express';
import { db } from '../config';

const router = express.Router();

// Get skills endpoint
router.get('/api/skills', async (req, res) => {
  try {
    const skills = await db.collection('skills')
      .find()
      .toArray();
    
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch skills' 
    });
  }
});`

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className={cn(
        "relative w-full max-h-[550px] rounded-2xl overflow-hidden",
        "backdrop-blur-sm bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950",
        "shadow-[0_0_30px_rgba(0,0,0,0.15)] dark:shadow-[0_0_30px_rgba(0,0,0,0.5)]",
        "border border-zinc-300/30 dark:border-zinc-700/40",
        className
      )}
    >
      {/* Light reflections */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-gradient-to-br from-white via-zinc-500/20 to-zinc-800/10 mix-blend-overlay" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
      </div>

      {/* Browser chrome/header */}
      <div className="h-10 bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 border-b border-zinc-300/40 dark:border-zinc-700/40 flex items-center px-3 gap-1.5">
        {/* Browser dots */}
        <div className="flex gap-1.5">
          <motion.div 
            className="w-2.5 h-2.5 rounded-full bg-rose-400 dark:bg-rose-500 shadow-sm flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
          <motion.div 
            className="w-2.5 h-2.5 rounded-full bg-amber-400 dark:bg-amber-500 shadow-sm flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
          <motion.div 
            className="w-2.5 h-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500 shadow-sm flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        </div>
        {/* Address bar */}
        <div className="flex-1 mx-2 h-5 rounded-md bg-zinc-200/50 dark:bg-zinc-700/50 border border-zinc-300/30 dark:border-zinc-600/30 flex items-center px-2">
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono truncate">
            https://portfolio.dev/skills/{activeTab}
          </span>
        </div>
      </div>

      {/* Browser tabs */}
      <div className="flex h-8 border-b border-zinc-200/50 dark:border-zinc-700/50">
        <button
          onClick={() => setActiveTab('frontend')}
          type="button"
          aria-selected={activeTab === 'frontend'}
          className={`flex items-center px-4 h-full text-sm font-medium relative z-10 cursor-pointer transition-all duration-200 ${
            activeTab === 'frontend'
              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-r border-zinc-200/50 dark:border-zinc-700/50'
              : 'bg-zinc-100/50 dark:bg-zinc-800/70 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          Frontend
        </button>
        <button
          onClick={() => setActiveTab('backend')}
          type="button"
          aria-selected={activeTab === 'backend'}
          className={`flex items-center px-4 h-full text-sm font-medium relative z-10 cursor-pointer transition-all duration-200 ${
            activeTab === 'backend'
              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-r border-zinc-200/50 dark:border-zinc-700/50'
              : 'bg-zinc-100/50 dark:bg-zinc-800/70 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          Backend
        </button>
      </div>

      {/* Content area */}
      <div className="flex flex-col overflow-hidden content-area" style={{ height: "calc(100% - 58px)" }}>
        {/* Main content */}
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden h-full">
          {/* Code Editor Section */}
          <div className="w-full sm:w-1/2 p-3 overflow-auto h-full">
            <div className="h-full rounded-lg overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-700/50 flex flex-col">
              {/* Editor Header */}
              <div className="px-3 py-1.5 bg-zinc-100/50 dark:bg-zinc-800/50 border-b border-zinc-200/50 dark:border-zinc-700/50 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                </div>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                  {activeTab === 'frontend' ? 'SkillMeter.tsx' : 'skills.routes.js'}
                </span>
              </div>
              
              {/* Code Content */}
              <div className="p-3 font-mono text-2xs overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                <pre className="whitespace-pre-wrap break-words">
                  <code className="text-[9px] sm:text-xs overflow-hidden">
                    {activeTab === 'frontend' ? frontendCode : backendCode}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Skills Visualization */}
          <div className="w-full sm:w-1/2 p-3 overflow-auto h-full">
            <div className="h-full rounded-lg overflow-hidden bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-700/50 flex flex-col">
              {/* Graph Header */}
              <div className="px-3 py-1.5 bg-zinc-100/50 dark:bg-zinc-800/50 border-b border-zinc-200/50 dark:border-zinc-700/50 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                </div>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                  {activeTab === 'frontend' ? 'frontend-skills.json' : 'backend-skills.json'}
                </span>
              </div>

              {/* Skills Grid */}
              <div className="p-4 overflow-y-auto flex-1">
                <h4 className="text-xs font-semibold mb-4 text-zinc-800 dark:text-zinc-200">
                  {activeTab === 'frontend' ? 'Frontend Technologies' : 'Backend Technologies'}
                </h4>
                <div className="space-y-3">
                  {(activeTab === 'frontend' ? frontendSkills : backendSkills).map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                      className="space-y-1"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                          {skill.name}
                        </span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-zinc-200/70 dark:bg-zinc-700/70 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                        />
                      </div>
                      <p className="text-[8px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {getSkillDescription(skill.name)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section - Tech Stack */}
        <div className="p-2 border-t border-zinc-200/50 dark:border-zinc-700/50 bg-zinc-50/50 dark:bg-zinc-800/50">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Tech Stack:</span>
              {['React', 'Next.js', 'Node', 'MongoDB'].map((tech, i) => (
                <span 
                  key={i} 
                  className="px-1.5 py-0.5 text-[8px] rounded-sm bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
              {new Date().getFullYear()} Full Stack Developer
            </span>
          </div>
        </div>
      </div>

      {/* Hover effect - brushed metal */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          style={{
            backgroundSize: "200% 100%",
            animation: "shine 1.5s linear infinite"
          }}
        />
      )}
    </motion.div>
  )
}

// Helper function to get skill descriptions
function getSkillDescription(skill: string): string {
  const descriptions: Record<string, string> = {
    "React": "Component-based UI library with virtual DOM for efficient rendering",
    "Next.js": "React framework with SSR/SSG, routing, and optimizations",
    "TypeScript": "Strongly typed JavaScript for better developer experience",
    "Tailwind": "Utility-first CSS framework for rapid UI development",
    "Node.js": "JavaScript runtime for building scalable server applications",
    "Express": "Minimal and flexible Node.js web application framework",
    "MongoDB": "NoSQL database for flexible document-based data structures",
    "PostgreSQL": "Powerful, open-source object-relational database system",
    "GraphQL": "Query language and runtime for APIs to request exactly what's needed",
    "Docker": "Platform for developing, shipping, and running applications in containers"
  }
  
  return descriptions[skill] || "Advanced proficiency in this technology"
}