"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from './badge'
import { Button } from './button'
import { ExternalLink, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  image: string
  demoLink: string
  githubLink: string
  features: string[]
}

interface ProjectCarousel3DProps {
  projects: Project[]
  onSelect: (project: Project) => void
}

export function ProjectCarousel3D({ projects, onSelect }: ProjectCarousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const goToPrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      goToNext()
    } else if (e.key === "ArrowLeft") {
      goToPrev()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Get the indices for the cards to display (previous, current, next)
  const getPrevIndex = (index: number) => (index - 1 + projects.length) % projects.length
  const getNextIndex = (index: number) => (index + 1) % projects.length

  // Calculate positions for each project card
  const getCardVariants = (index: number) => {
    const positions = {
      center: { 
        x: 0, 
        scale: 1, 
        zIndex: 5, 
        opacity: 1,
        rotateY: 0, 
        transition: { type: "spring", stiffness: 300, damping: 20 }
      },
      left: { 
        x: "-55%", 
        scale: 0.85, 
        zIndex: 4, 
        opacity: 0.7,
        rotateY: 15, 
        transition: { type: "spring", stiffness: 300, damping: 20 }
      },
      right: { 
        x: "55%", 
        scale: 0.85, 
        zIndex: 4, 
        opacity: 0.7,
        rotateY: -15, 
        transition: { type: "spring", stiffness: 300, damping: 20 }
      },
      hidden: { 
        x: direction > 0 ? "100%" : "-100%", 
        scale: 0.8, 
        zIndex: 1, 
        opacity: 0,
        rotateY: direction > 0 ? -30 : 30, 
        transition: { type: "spring", stiffness: 300, damping: 20 }
      },
    }

    if (index === currentIndex) {
      return positions.center
    } else if (index === getPrevIndex(currentIndex)) {
      return positions.left
    } else if (index === getNextIndex(currentIndex)) {
      return positions.right
    } else {
      return positions.hidden
    }
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative py-10"
      style={{ perspective: "1200px" }}
    >
      <div className="relative h-[500px]">
        <AnimatePresence initial={false}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="absolute top-0 left-0 right-0 w-full max-w-2xl mx-auto"
              initial="hidden"
              animate={getCardVariants(index)}
              exit="hidden"
              style={{ transformStyle: "preserve-3d" }}
              onClick={() => index === currentIndex && onSelect(project)}
            >
              <div 
                className={`relative bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer h-full
                  ${index === currentIndex ? 
                    'shadow-xl ring-1 ring-zinc-200/50 dark:ring-zinc-700/50' : 
                    'shadow-md hover:shadow-lg'}`}
              >
                {/* Image container with 16:9 aspect ratio */}
                <div className="relative w-full pt-[56.25%] overflow-hidden">
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-900/90 dark:to-zinc-950/90 z-10" />
                  
                  {/* Project image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 
                    ${index === currentIndex ? 'group-hover:opacity-100' : ''} transition-opacity duration-300 z-20" />
                </div>

                <div className="p-6 relative">
                  {/* Title and description */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                      {project.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 my-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-zinc-200/50 dark:border-zinc-700/50 px-2 py-0.5 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge 
                        variant="outline" 
                        className="bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-zinc-200/50 dark:border-zinc-700/50 px-2 py-0.5 text-xs"
                      >
                        +{project.tags.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Features list */}
                  {index === currentIndex && (
                    <div className="space-y-2 mb-4">
                      {project.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* View Details button */}
                  {index === currentIndex && (
                    <Button
                      size="sm"
                      className="w-full mt-2 bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 hover:from-zinc-700 hover:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-700 text-zinc-100 border-0 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(project);
                      }}
                    >
                      View Details <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>

                {/* Metallic border effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 dark:from-white/5 dark:to-black/5" />
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-zinc-700/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-zinc-700/50 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <motion.button
        onClick={() => goToPrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-24 z-50 p-4 rounded-full bg-zinc-100/90 dark:bg-zinc-800/90 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 group"
      >
        <ChevronLeft className="w-7 h-7 text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
      </motion.button>
      
      <motion.button
        onClick={() => goToNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-24 z-50 p-4 rounded-full bg-zinc-100/90 dark:bg-zinc-800/90 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 group"
      >
        <ChevronRight className="w-7 h-7 text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
      </motion.button>

      {/* CTA Button */}
      <div className="text-center mt-48 relative z-20">
        <Link href="/projects">
          <Button
            className="rounded-full px-8 py-6 bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 hover:from-zinc-700 hover:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-700 text-zinc-100 border-0 shadow-lg transition-all duration-200 group"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  )
}