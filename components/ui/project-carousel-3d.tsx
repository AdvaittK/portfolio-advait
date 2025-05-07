"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from './badge'
import { Button } from './button'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from 'next-themes'

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
                className={`bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-lg cursor-pointer h-full
                  ${index === currentIndex ? 
                    'shadow-xl ring-1 ring-black/5 dark:ring-white/10' : 
                    'shadow-md hover:shadow-lg'}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-b 
                      ${isDark 
                        ? 'from-transparent via-transparent to-zinc-800/95' 
                        : 'from-transparent via-transparent to-white/95'}`}
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 
                    ${index === currentIndex ? 'group-hover:opacity-100' : ''} transition-opacity duration-300`}
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-300 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="bg-zinc-100 dark:bg-zinc-800">
                        +{project.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                  {index === currentIndex && (
                    <Button
                      size="sm"
                      className="w-full mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(project);
                      }}
                    >
                      View Details <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/80 dark:bg-zinc-800/80 shadow-md"
          onClick={goToPrev}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/80 dark:bg-zinc-800/80 shadow-md"
          onClick={goToNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentIndex === index
                ? "bg-purple-600 w-5"
                : "bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}