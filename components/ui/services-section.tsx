"use client"

import { Code2, Layout, Server, LineChart, Shield, Database } from "lucide-react"
import { Button } from "./button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"
import { useEffect, useState, MouseEvent } from "react"
import { getCookie } from "cookies-next"

// Bento Grid Layout Configuration
const services = [
  {
    title: "Full Stack Development",
    description: "End-to-end web application development using modern technologies and best practices.",
    icon: Code2,
    className: "md:col-span-2",
  },
  {
    title: "Frontend Development",
    description: "Creating beautiful, responsive, and performant user interfaces.",
    icon: Layout,
    className: "md:col-span-1",
  },
  {
    title: "Backend Development",
    description: "Robust server-side solutions with scalable architecture.",
    icon: Server,
    className: "md:col-span-1",
  },
  {
    title: "CRM Dashboard",
    description: "Custom CRM solutions that streamline business operations.",
    icon: Database,
    className: "md:col-span-2",
  },
  {
    title: "SEO & Performance",
    description: "Improve your website's visibility and performance.",
    icon: LineChart,
    className: "md:col-span-2",
  },
  {
    title: "Security Solutions",
    description: "Implement robust security measures for your applications.",
    icon: Shield,
    className: "md:col-span-1",
  }
]

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const [isMounted, setIsMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Wait for mount to prevent hydration flickering
  useEffect(() => {
    setIsMounted(true)
  }, [])

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  // Pre-compute the motion template to prevent re-renders
  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.06),
      transparent 80%
    )
  `

  const spotlightBackgroundLight = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      rgba(0,0,0,0.04),
      transparent 80%
    )
  `

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "group relative rounded-2xl overflow-hidden border",
        "bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm",
        "border-zinc-200/50 dark:border-zinc-700/50",
        "shadow-lg hover:shadow-xl hover:shadow-zinc-900/10 dark:hover:shadow-zinc-100/10",
        "will-change-transform",
        service.className
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight effect - only render after mount to prevent flicker */}
      {isMounted && (
        <>
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:block hidden"
            style={{ background: spotlightBackground }}
          />
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:hidden block"
            style={{ background: spotlightBackgroundLight }}
          />
        </>
      )}

      <div className="relative h-full p-8 flex flex-col justify-between z-10">
        <div className="mb-0">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-6",
            "bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 shadow-md",
            "text-zinc-100"
          )}>
            <service.icon className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
            {service.title}
          </h3>

          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
            {service.description}
          </p>
        </div>
      </div>

      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        "bg-gradient-to-br from-zinc-100/50 via-transparent to-transparent dark:from-zinc-800/50"
      )} />
    </motion.div>
  )
}

export function ServicesSection() {
  const [isIndia, setIsIndia] = useState(false)

  useEffect(() => {
    const currency = getCookie('currency')
    setIsIndia(currency === 'INR')
  }, [])

  return (
    <section className="py-8 xs:py-12 sm:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-3">
            <span className="h-[1px] w-10 bg-gradient-to-r from-zinc-400/60 to-zinc-600/60 dark:from-zinc-500/60 dark:to-zinc-300/60"></span>
            <span className="px-4 text-sm font-medium tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
              Services
            </span>
            <span className="h-[1px] w-10 bg-gradient-to-r from-zinc-600/60 to-zinc-400/60 dark:from-zinc-300/60 dark:to-zinc-500/60"></span>
          </div>

          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-300 leading-tight">
            Premium Services for<br />Digital Growth
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            Elevate your integrated presence with comprehensive suite of digital solutions, designed to scale with your ambition.
          </p>

          <div className="flex justify-center mb-16">
            <div className="h-[3px] w-24 bg-gradient-to-r from-zinc-300/60 via-zinc-500/80 to-zinc-300/60 dark:from-zinc-600/60 dark:via-zinc-400/80 dark:to-zinc-600/60 rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>


      </div>
    </section>
  )
}