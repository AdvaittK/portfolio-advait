"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Typewriter from "typewriter-effect"
import Link from "next/link"
import { gsap } from "gsap"
import { GlassCard } from "@/components/ui/glass-card"
import { SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb, SiPostgresql, SiGit, SiDocker, SiFigma } from "react-icons/si"
import { SkillsRadarBrowser } from "@/components/ui/skills-radar-browser"
import { ProjectCarousel3D } from "@/components/ui/project-carousel-3d"
import { ServicesSection } from "@/components/ui/services-section"
import { NextStepsSection } from "@/components/ui/next-steps-section"
import { LetsWorkTogetherSection } from "@/components/ui/lets-work-together-section"
import { SkillsServicesMarquee } from "@/components/ui/skills-services-marquee"

// Featured projects data
const featuredProjects = [
  {
    id: "kixkart-ecommerce",
    title: "KixKart – Premium Sneakers & Streetwear E-Commerce Platform",
    description: "Cyberpunk-inspired e-commerce platform specializing in premium sneakers and streetwear, built with Next.js, Tailwind, and advanced UI components.",
    longDescription: "KixKart is a modern, cyberpunk-themed e-commerce web application designed for sneakerheads and streetwear enthusiasts. It offers a visually striking interface and smooth shopping experience for users browsing high-end sneakers across categories.",
    tags: ["E-Commerce", "Next.js", "Tailwind CSS", "TypeScript", "Radix UI", "Shadcn UI", "Cyberpunk Design"],
    image: "/kixkart.png",
    demoLink: "https://www.kixkart.advaitt.tech/",
    githubLink: "https://github.com/AdvaittK/kixkart",
    features: [
      "Fully responsive e-commerce UI with shopping cart and wishlist",
      "Theme toggle for dark/light mode",
      "Browse by product categories",
      "Product pages with rich descriptions and visuals",
      "User authentication & account management",
      "Cyberpunk-inspired UI with smooth animations"
    ]
  },
  {
    id: "pulseboard-dashboard",
    title: "PulseBoard – Interactive Dashboard Frontend Showcase",
    description: "A modern, responsive dashboard UI with interactive charts, subscription flows, and a mock backend for demo purposes. Showcasing frontend design, state management, and UI component patterns.",
    longDescription: "PulseBoard is a sleek and responsive dashboard web application designed to demonstrate advanced frontend patterns and UI/UX principles. Built with Next.js 15, React 19, and TypeScript, it features dynamic charts, dark/light theme switching, and comprehensive UI components.",
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS", "Shadcn", "Charts", "Mock Backend"],
    image: "/pulseboard.png",
    demoLink: "https://www.pulseboard.advaitt.tech/",
    githubLink: "https://github.com/AdvaittK/pulse-board-main",
    features: [
      "Responsive dashboard layouts with modern UI/UX",
      "Dynamic charts powered by mock data",
      "Theme switcher (dark/light mode)",
      "Subscription and pricing management UI",
      "Intuitive sidebar navigation",
      "Mock API layer simulating backend interaction"
    ]
  },
  {
    id: "portfolio-website",
    title: "Advait | Web Developer Portfolio",
    description: "A modern, high-performance portfolio website showcasing my work, skills, and services as a frontend developer and UI designer.",
    longDescription: "This portfolio website is a fully custom, responsive web application built to highlight my expertise in frontend development, UI/UX design, and modern web technologies. It features animated transitions, a dynamic projects showcase, a services/pricing section, and a contact form.",
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "Vercel"],
    image: "/new_homepage.png",
    demoLink: "https://advaitt.tech",
    githubLink: "https://github.com/AdvaittK/portfolio-advait",
    features: [
      "Fully responsive, custom-designed UI",
      "Animated page transitions and interactive elements",
      "Dynamic projects and services sections",
      "SEO and social sharing optimized",
      "Vercel Analytics integration",
      "Accessible and performant design"
    ]
  }
]

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false)
  const pageTransitionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)

    if (pageTransitionRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          pageTransitionRef.current,
          { 
            autoAlpha: 0,
            y: 20,
            filter: "blur(10px)",
            scale: 0.98
          },
          {
            duration: 1.2,
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            ease: "power3.out",
            clearProps: "all"
          }
        )
      })

      return () => ctx.revert()
    }
  }, [])

  return (
    <motion.div
      ref={pageTransitionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "min-h-screen bg-transparent text-foreground transition-colors duration-300",
      )}
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="min-h-[90vh] flex flex-col justify-center items-center relative px-4 xs:px-6 py-12 xs:py-16 overflow-hidden"
      >
        {/* Background gradients with enhanced effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 xs:w-80 sm:w-96 h-64 xs:h-80 sm:h-96 bg-gradient-to-br from-zinc-500/10 via-zinc-600/10 to-zinc-700/10 dark:from-zinc-500/20 dark:via-zinc-600/20 dark:to-zinc-700/20 rounded-full filter blur-3xl opacity-30"
            animate={{
              x: [0, 10, -5, 0],
              y: [0, -5, 10, 0],
              scale: [1, 1.02, 0.98, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-64 xs:w-80 sm:w-96 h-64 xs:h-80 sm:h-96 bg-gradient-to-br from-zinc-600/10 via-zinc-700/10 to-zinc-800/10 dark:from-zinc-600/20 dark:via-zinc-700/20 dark:to-zinc-800/20 rounded-full filter blur-3xl opacity-30"
            animate={{
              x: [0, -10, 5, 0],
              y: [0, 10, -8, 0],
              scale: [1, 0.98, 1.02, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/3 w-64 xs:w-80 sm:w-96 h-64 xs:h-80 sm:h-96 bg-gradient-to-br from-zinc-700/10 via-zinc-800/10 to-zinc-900/10 dark:from-zinc-700/20 dark:via-zinc-800/20 dark:to-zinc-900/20 rounded-full filter blur-3xl opacity-30"
            animate={{
              x: [0, 8, -8, 0],
              y: [0, -8, 4, 0],
              scale: [1, 1.03, 0.97, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="grid md:grid-cols-5 gap-6 xs:gap-8 w-full max-w-6xl mx-auto items-center">
          {/* Hero content with staggered animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left md:col-span-2 lg:col-span-3 z-10"
          >
            <div className="space-y-4 xs:space-y-6">
              <Badge className="px-3 py-1.5 bg-secondary text-secondary-foreground border-border text-sm xs:text-base">
                Frontend Developer & UI Designer
              </Badge>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold mb-2"
              >
                Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400">Advait</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg xs:text-xl md:text-2xl text-muted-foreground min-h-[2.5rem]"
              >
                <Typewriter
                  options={{
                    strings: [
                      'I am a Full Stack Developer',
                      'I build elegant user interfaces',
                      'I create seamless experiences',
                      'I design digital products',
                      'I solve complex problems'
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                  }}
                />
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-sm xs:text-base md:text-lg text-muted-foreground max-w-lg mt-2"
              >
                Crafting immersive digital experiences that combine stunning visuals with flawless functionality. Let's create something amazing together.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col xs:flex-row gap-3 xs:gap-4 pt-2"
              >
                <Link href="/projects" className="w-full xs:w-auto">
                  <Button
                    className="w-full xs:w-auto rounded-full px-6 xs:px-8 py-5 xs:py-6 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-base xs:text-lg"
                  >
                    Explore My Work
                  </Button>
                </Link>
                
                <Link href="/contact" className="w-full xs:w-auto">
                  <Button
                    variant="outline"
                    className="w-full xs:w-auto rounded-full px-6 xs:px-8 py-5 xs:py-6 border-border hover:bg-secondary font-medium text-base xs:text-lg"
                  >
                    Contact Me
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="flex gap-4 pt-4"
              >
                {[
                  { icon: <Github className="w-5 h-5" />, label: "GitHub", link: "https://github.com/AdvaittK" },
                  { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", link: "#" },
                  { icon: <Twitter className="w-5 h-5" />, label: "Twitter", link: "#" },
                  { icon: <Mail className="w-5 h-5" />, label: "Email", link: "mailto:hello@advait.com" }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.link}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1 + (index * 0.1) }}
                    className="p-3 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
          
          {/* Enhanced Skills Radar Browser */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="md:col-span-3 lg:col-span-2 h-[300px] xs:h-[350px] sm:h-[400px] md:h-[450px] hidden md:flex items-center justify-center relative"
          >
            <SkillsRadarBrowser 
              skills={[
                { name: "React", value: 90 },
                { name: "TypeScript", value: 85 },
                { name: "UI/UX", value: 88 },
                { name: "Node.js", value: 75 },
                { name: "Next.js", value: 92 },
                { name: "Tailwind", value: 95 },
              ]}
            />
            
            {/* Interactive floating elements around the browser */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute -top-5 -right-5 w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 15, 0, -15, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <SiReact className="w-8 h-8 text-blue-500" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center"
                animate={{ 
                  y: [0, 10, 0],
                  x: [0, 10, 0, -10, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  duration: 7, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <SiTypescript className="w-6 h-6 text-blue-600" />
              </motion.div>
              
              <motion.div
                className="absolute top-1/3 -left-4 w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center"
                animate={{ 
                  x: [0, 10, 0],
                  rotate: 360
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <SiTailwindcss className="w-5 h-5 text-cyan-500" />
              </motion.div>
              
              <motion.div
                className="absolute bottom-1/4 -right-3 w-9 h-9 bg-zinc-100 dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center"
                animate={{ 
                  y: [0, -10, 0, 10, 0],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <SiNextdotjs className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      <SkillsServicesMarquee />
      {/* Featured Projects Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="min-h-screen py-12 xs:py-16 sm:py-20 px-4 xs:px-6 relative overflow-hidden"
      >
        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/4 right-1/4 w-64 xs:w-80 sm:w-96 h-64 xs:h-80 sm:h-96 bg-gradient-to-br from-zinc-500/10 via-zinc-600/10 to-zinc-700/10 dark:from-zinc-500/20 dark:via-zinc-600/20 dark:to-zinc-700/20 rounded-full filter blur-3xl opacity-30"
            animate={{
              x: [0, 10, -5, 0],
              y: [0, -5, 10, 0],
              scale: [1, 1.02, 0.98, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 xs:mb-16"
          >
            <Badge className="px-3 py-1.5 bg-secondary text-secondary-foreground border-border mb-4 text-sm xs:text-base">
              Featured Work
            </Badge>
            <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400">
              Featured Projects
            </h2>
            <p className="text-base xs:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Explore some of my recent work that showcases my expertise in building modern web applications
            </p>
          </motion.div>

          {/* Projects Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <ProjectCarousel3D 
              projects={featuredProjects}
              onSelect={(project) => window.open(project.demoLink, '_blank')}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        <ServicesSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      >
        <NextStepsSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      >
        <LetsWorkTogetherSection />
      </motion.div>
    </motion.div>
  )
}
