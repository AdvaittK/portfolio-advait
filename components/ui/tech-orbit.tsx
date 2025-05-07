"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiFigma
} from "react-icons/si"

interface TechOrbitProps {
  className?: string
  profileImage?: string
  techStack: {
    name: string
    icon: React.ReactNode
    description: string
  }[]
}

export const TechOrbit = ({
  className,
  profileImage = "/profile.jpg",
  techStack = [
    {
      name: "React",
      icon: <SiReact className="w-6 h-6" />,
      description: "3+ years of experience building modern web applications"
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="w-6 h-6" />,
      description: "Strong type safety and modern JavaScript features"
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="w-6 h-6" />,
      description: "Server-side rendering and static site generation"
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="w-6 h-6" />,
      description: "Utility-first CSS framework for rapid UI development"
    },
    {
      name: "Node.js",
      icon: <SiNodedotjs className="w-6 h-6" />,
      description: "Backend development and API creation"
    },
    {
      name: "MongoDB",
      icon: <SiMongodb className="w-6 h-6" />,
      description: "NoSQL database for scalable applications"
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql className="w-6 h-6" />,
      description: "Relational database for complex data structures"
    },
    {
      name: "Git",
      icon: <SiGit className="w-6 h-6" />,
      description: "Version control and collaboration"
    },
    {
      name: "Docker",
      icon: <SiDocker className="w-6 h-6" />,
      description: "Containerization and deployment"
    },
    {
      name: "Figma",
      icon: <SiFigma className="w-6 h-6" />,
      description: "UI/UX design and prototyping"
    }
  ]
}: TechOrbitProps) => {
  const orbitRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!orbitRef.current) return

    const orbit = orbitRef.current
    const icons = iconsRef.current.filter(Boolean)
    const radius = 120 // Orbit radius in pixels
    const duration = 20 // Seconds for one complete orbit

    // Create timeline for continuous rotation
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none" }
    })

    // Position icons in a circle
    icons.forEach((icon, i) => {
      if (!icon) return
      const angle = (i * 2 * Math.PI) / icons.length
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      gsap.set(icon, {
        x,
        y,
        rotation: -angle * (180 / Math.PI)
      })
    })

    // Animate orbit
    tl.to(orbit, {
      rotation: 360,
      duration,
      ease: "none",
      transformOrigin: "center center"
    })

    // Pause animation on hover
    const handleMouseEnter = () => {
      tl.pause()
    }

    const handleMouseLeave = () => {
      tl.play()
    }

    orbit.addEventListener("mouseenter", handleMouseEnter)
    orbit.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      orbit.removeEventListener("mouseenter", handleMouseEnter)
      orbit.removeEventListener("mouseleave", handleMouseLeave)
      tl.kill()
    }
  }, [])

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
      
      {/* Orbit container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          ref={orbitRef}
          className="absolute w-[300px] h-[300px]"
        >
          <TooltipProvider>
            {techStack.map((tech, index) => (
              <Tooltip key={tech.name}>
                <TooltipTrigger asChild>
                  <motion.div
                    ref={(el) => {
                      iconsRef.current[index] = el;
                    }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="p-3 rounded-full bg-white/10 hover:bg-white/20 dark:bg-zinc-800/50 dark:hover:bg-zinc-800/70 transition-colors">
                      <div className="text-zinc-700 dark:text-zinc-300">
                        {tech.icon}
                      </div>
                    </div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm font-medium">{tech.name}</p>
                  <p className="text-xs text-muted-foreground">{tech.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>

        {/* Center profile image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 dark:border-zinc-800/20 shadow-xl"
        >
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  )
} 