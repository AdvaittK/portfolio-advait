"use client"

import { useRef, useState, useEffect } from "react"
import { motion, transform } from "framer-motion"
import { ArrowDown, Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Typewriter from "typewriter-effect"
import Link from "next/link"
import { gsap } from "gsap"
import { GlassCard } from "@/components/ui/glass-card"
import { SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb, SiPostgresql, SiGit, SiDocker, SiFigma, SiDiscord } from "react-icons/si"
import { SkillsRadarBrowser } from "@/components/ui/skills-radar-browser"
import { ProjectCarousel3D } from "@/components/ui/project-carousel-3d"
import { ServicesSection } from "@/components/ui/services-section"
import { NextStepsSection } from "@/components/ui/next-steps-section"
import { LetsWorkTogetherSection } from "@/components/ui/lets-work-together-section"
import { SkillsServicesMarquee } from "@/components/ui/skills-services-marquee"
import { TestimonialsSection } from "@/components/ui/testimonials-section"
import { useIsMobile } from "@/hooks/use-mobile"

// Featured projects data
const featuredProjects = [
  {
    id: "oriental-air-ship-services",
    title: "Oriental Air & Ship Services – Import Clearing & Forwarding",
    description: "Oriental’s new website was designed to provide a clean, professional, and user-friendly experience for clients and partners.",
    longDescription: "Oriental’s new website was designed to provide a clean, professional, and user-friendly experience for clients and partners. The focus was on showcasing their wide range of logistics services with clarity, ensuring smooth navigation, and creating a visually appealing platform that reflects Oriental’s 40+ years of trust and excellence in the industry.",
    tags: ["Logistics", "Import Export", "Clearing & Forwarding", "Business", "Website"],
    image: "/homepageo.png",
    demoLink: "https://www.orientalimited.com/",
    githubLink: "",
    features: [
      "Service showcase for import clearing & forwarding",
      "Focus on PSU and Government clientele",
      "Trust- and legacy-driven brand narrative",
      "Modern, responsive, and accessible UI"
    ]
  },
  {
    id: "vitira-website",
    title: "VITIRA – Business Website Transformation",
    description: "A modern, high-performance business website for VITIRA, designed to elevate their digital presence and showcase their services.",
    longDescription: "VITIRA's new website was transformed to deliver a clean, professional, and engaging experience for their clients. The project focused on clear service presentation, fast performance, and a visually appealing interface that aligns with VITIRA's brand values.",
    tags: ["Business", "Website", "Transformation", "UI/UX", "Next.js"],
    image: "/vitira.png",
    demoLink: "https://www.vitira.in/",
    githubLink: "",
    features: [
      "Modern, responsive business website",
      "Clear service and value proposition presentation",
      "Fast performance and SEO optimization",
      "Brand-aligned visual design",
      "Contact and inquiry system",
      "Mobile-first experience"
    ]
  },
  {
    id: "dems-portfolio",
    title: "Dem's Portfolio – Thumbnail Designer Showcase",
    description: "A stunning portfolio website showcasing Dem's exceptional thumbnail design work, featuring a modern and creative interface that highlights their unique artistic style.",
    longDescription: "Dem's Portfolio is a beautifully crafted showcase of thumbnail design work, built to highlight their creative process and artistic vision. The website features a modern, minimalist design that puts the focus on the artwork while maintaining excellent user experience. It includes a dynamic gallery of thumbnail designs, case studies of successful projects, and a seamless contact system for potential clients.",
    tags: ["Portfolio", "Design", "Thumbnails", "Creative", "UI/UX"],
    image: "/homepage.png",
    demoLink: "https://dems8.com",
    githubLink: "https://github.com/AdvaittK/dem-portfolio",
    features: [
      "Dynamic gallery of thumbnail designs",
      "Case studies and project breakdowns",
      "Client testimonials and success stories",
      "Contact and commission system",
      "Responsive design optimized for all devices",
      "Portfolio filtering and search functionality"
    ]
  },
  {
    id: "uvoka-website",
    title: "UVOKA – LinkedIn Personal Branding Agency Website",
    description: "A modern, responsive website for UVOKA, a LinkedIn personal branding agency. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion for smooth animations and interactions.",
    longDescription: "UVOKA's website is a comprehensive platform showcasing their LinkedIn personal branding services. The website features a modern design with smooth animations, clear service presentation, client testimonials, and a professional portfolio that reflects their expertise in personal branding. Built with cutting-edge technologies for optimal performance and user experience.",
    tags: ["Business", "Website", "Personal Branding", "LinkedIn", "Next.js", "Agency"],
    image: "/uvoka.png",
    demoLink: "https://uvoka.in",
    githubLink: "",
    features: [
      "Modern, responsive agency website",
      "Smooth animations and interactions",
      "Service showcase and pricing packages",
      "Client testimonials and success stories",
      "Professional portfolio presentation",
      "Contact and inquiry system"
    ]
  },
  {
    id: "royal-sarees",
    title: "Royal Sarees – Premium Indian Ethnic Wear E-Commerce",
    description: "A luxurious e-commerce platform specializing in premium Indian ethnic wear, featuring an elegant design that showcases traditional craftsmanship and modern fashion.",
    longDescription: "Royal Sarees is a sophisticated e-commerce platform dedicated to showcasing premium Indian ethnic wear. The website features a rich, elegant design that highlights the intricate details of traditional Indian garments while providing a seamless shopping experience. Built with modern web technologies, it offers advanced filtering, detailed product views, and a secure checkout process.",
    tags: ["E-Commerce", "Next.js", "React", "TypeScript", "TailwindCSS"],
    image: "/homepage.jpg",
    demoLink: "https://royalsarees.advaitt.tech/",
    githubLink: "https://github.com/AdvaittK/saree-ecommerce",
    features: [
      "Elegant product showcase with high-quality imagery",
      "Advanced filtering by style, occasion, and region",
      "Detailed product pages with size guides",
      "Secure payment integration",
      "Responsive design for all devices",
      "Multi-language support for global reach"
    ]
  },
  {
    id: "cardhint",
    title: "CardHint – Smart Credit Card Comparison Platform",
    description: "A smart platform for comparing credit cards and maximizing rewards, built with Next.js, Tailwind, and advanced UI components.",
    longDescription: "CardHint is a modern web application designed to help users compare credit cards and find the best options for their needs. It features a user-friendly interface, advanced filtering options, and detailed information on various credit cards.",
    tags: ["Finance", "Next.js", "Tailwind CSS"],
    image: "/cardh.png",
    demoLink: "https://www.cardhint.com/",
    githubLink: "https://github.com/AdvaittK/cardhint",
    features: [
      "Smart credit card recommendations powered by expert insights",
        "Advanced filtering based on rewards, fees, and user goals",
        "Secure and privacy-focused platform architecture",
        "Responsive design optimized for all devices",
        "User-friendly interface with clean, modern UI elements",
        "Regularly updated database with the latest card offers"
    ]
  },
  {
    id: "kixkart-ecommerce",
    title: "KixKart – Premium Sneakers E-Commerce Platform",
    description: "Cyberpunk-inspired e-commerce platform specializing in premium sneakers and streetwear, built with Next.js, Tailwind, and advanced UI components.",
    longDescription: "KixKart is a modern, cyberpunk-themed e-commerce web application designed for sneakerheads and streetwear enthusiasts. It offers a visually striking interface and smooth shopping experience for users browsing high-end sneakers across categories.",
    tags: ["E-Commerce", "Next.js", "Tailwind CSS"],
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
    id: "symtolink-health",
    title: "SymtoLink – Health Symptom Analysis Platform",
    description: "AI-powered health symptom analysis platform that helps users identify potential health conditions and connect with healthcare providers.",
    longDescription: "SymtoLink is a healthcare technology platform that combines AI algorithms with medical knowledge to help users analyze their symptoms, understand potential conditions, and find appropriate care. The platform features a user-friendly interface for symptom input, analysis reports, and healthcare provider connections.",
    tags: ["Healthcare Tech", "AI", "Next.js", "React", "TailwindCSS"],
    image: "/symptolink.png",
    demoLink: "https://symptolink.advaitt.tech",
    githubLink: "https://github.com/AdvaittK/symtolink",
    features: [
      "Intuitive symptom input interface",
      "AI-powered analysis of reported symptoms",
      "Condition probability assessments",
      "Healthcare provider recommendations",
      "Secure user health profiles",
      "Responsive design for all devices"
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
  },
  {
    id: "truthsense-fact-checker",
    title: "TruthSense – AI-Powered Fact Checking Platform",
    description: "Web application that uses AI to analyze and verify claims against trusted sources, helping users identify misinformation online.",
    longDescription: "TruthSense is an advanced fact-checking platform that leverages artificial intelligence to analyze claims against a database of trusted sources. Users can submit statements or URLs for verification, and the system provides reliability scores, source citations, and context to help combat misinformation.",
    tags: ["AI", "NLP", "React", "Node.js", "TailwindCSS"],
    image: "/ts.png",
    demoLink: "https://truthsense.advaitt.tech",
    githubLink: "https://github.com/AdvaittK/truthsense",
    features: [
      "Text and URL submission for fact checking",
      "AI-powered claim extraction and verification",
      "Source reliability scoring system",
      "Citation links to trusted sources",
      "User-friendly analysis reports",
      "Responsive design for mobile and desktop"
    ]
  },
  {
    id: "json-gen-tool",
    title: "JSON Gen – Advanced Mock Data Generator",
    description: "Developer tool for generating custom JSON mock data with advanced schema options, templates, and API endpoint simulation.",
    longDescription: "JSON Gen is a comprehensive developer utility designed to simplify the creation of mock data for frontend development and testing. It offers a robust schema editor, template system, and API endpoint simulation features to help developers prototype and test applications efficiently.",
    tags: ["Developer Tool", "JSON", "React", "TypeScript", "API Mocking"],
    image: "/jsonge.png",
    demoLink: "https://www.jsongen.advaitt.tech/",
    githubLink: "https://github.com/AdvaittK/json-generator",
    features: [
      "Visual schema editor for custom JSON structures",
      "Predefined templates for common data patterns",
      "Advanced type and constraint options",
      "One-click data generation with adjustable volume",
      "Simulated API endpoint creation",
      "Export options for various formats"
    ]
  }
]

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false)
  const pageTransitionRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    setIsMounted(true)

    // Only run GSAP animations on desktop
    if (pageTransitionRef.current && !isMobile) {
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
  }, [isMobile])

  // Simplified transitions for mobile
  const getTransitionDuration = () => {
    return isMobile ? 0 : 0.5 // No transitions on mobile
  }

  const getAnimationDelay = (desktop: number) => {
    return isMobile ? 0 : desktop // No delays on mobile
  }

  return (
    <motion.div
      ref={pageTransitionRef}
      initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 40 }}
      animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={isMobile ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
      className={cn(
        "min-h-screen bg-transparent text-foreground transition-colors duration-300",
      )}
    >
      {/* Hero Section */}
      <motion.section
        initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={isMobile ? { duration: 0 } : { duration: getTransitionDuration(), delay: getAnimationDelay(0.2) }}
        className="min-h-[85vh] flex flex-col justify-start pt-16 xs:pt-20 items-center relative px-4 xs:px-6 py-8 xs:py-12 overflow-hidden md:pt-72"
      >
        {/* Background gradients - simplified for mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {!isMobile ? (
            // Full animations on desktop
            <>
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
            </>
          ) : (
            // Static gradients for mobile
            <>
              <div className="absolute top-1/4 left-1/4 w-64 xs:w-80 sm:w-96 h-64 xs:h-80 sm:h-96 bg-gradient-to-br from-zinc-500/5 via-zinc-600/5 to-zinc-700/5 dark:from-zinc-500/10 dark:via-zinc-600/10 dark:to-zinc-700/10 rounded-full filter blur-3xl opacity-20" />
              <div className="absolute top-1/3 right-1/4 w-64 xs:w-80 sm:w-96 h-64 xs:h-80 sm:h-96 bg-gradient-to-br from-zinc-600/5 via-zinc-700/5 to-zinc-800/5 dark:from-zinc-600/10 dark:via-zinc-700/10 dark:to-zinc-800/10 rounded-full filter blur-3xl opacity-20" />
              <div className="absolute bottom-1/4 right-1/3 w-64 xs:w-80 sm:w-96 h-64 xs:h-80 sm:h-96 bg-gradient-to-br from-zinc-700/5 via-zinc-800/5 to-zinc-900/5 dark:from-zinc-700/10 dark:via-zinc-800/10 dark:to-zinc-900/10 rounded-full filter blur-3xl opacity-20" />
            </>
          )}
        </div>

        <div className="grid md:grid-cols-5 gap-6 xs:gap-8 w-full max-w-6xl mx-auto items-start relative z-10">
          {/* Hero content - optimized for mobile */}
          <motion.div
            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={isMobile ? { duration: 0 } : { duration: getTransitionDuration(), delay: getAnimationDelay(0.4) }}
            className="text-left md:col-span-2 lg:col-span-3 z-10"
          >
            <div className="space-y-4 xs:space-y-6">
              <Badge className="px-3 py-1.5 bg-secondary text-secondary-foreground border-border text-sm xs:text-base">
                Full Stack Developer & UI Designer
              </Badge>
              
              <motion.h1
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0 } : { duration: getTransitionDuration(), delay: getAnimationDelay(0.6) }}
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold mb-2"
              >
                Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400">Advait</span>
              </motion.h1>
              
              <motion.div
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0 } : { duration: getTransitionDuration(), delay: getAnimationDelay(0.8) }}
                className="text-lg xs:text-xl md:text-2xl text-muted-foreground min-h-[2.5rem]"
              >
                <Typewriter
                  options={{
                    strings: [
                      'I build elegant user interfaces',
                      'I create seamless experiences',
                      'I design digital products',
                      'I solve complex problems',
                      'I craft responsive interfaces',
                      'I bring ideas to life in code',
                      'I engineer user-centric solutions',
                      'I build fast, accessible websites',
                      'I transform pixels into performance',
                      'I design with purpose and precision',
                      'I develop scalable web apps',
                      'I blend creativity with functionality',
                      'I optimize for speed and impact',
                      'I write clean, modern code',
                      'I turn challenges into code',
                      'I connect brands with users',
                      'I create on the edge of technology',
                      'I code with clarity and intent',
                      'I shape the future of the web'
                    ],
                    autoStart: true,
                    loop: true,
                    delay: isMobile ? 20 : 50,
                    deleteSpeed: isMobile ? 10 : 30,
                  }}
                />
              </motion.div>
              
              <motion.p
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0 } : { duration: getTransitionDuration(), delay: getAnimationDelay(1.0) }}
                className="text-sm xs:text-base md:text-lg text-muted-foreground max-w-lg mt-2"
              >
                Crafting immersive digital experiences that combine stunning visuals with flawless functionality. Let's create something amazing together.
              </motion.p>
              
              <motion.div
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0 } : { duration: getTransitionDuration(), delay: getAnimationDelay(1.2) }}
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
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0 } : { duration: getTransitionDuration(), delay: getAnimationDelay(1.4) }}
                className="flex justify-center xs:justify-start gap-4 pt-4"
              >
                {[
                  { icon: <Github className="w-5 h-5" />, label: "GitHub", link: "https://github.com/AdvaittK" },
                  { icon: <Twitter className="w-5 h-5" />, label: "Twitter", link: "https://x.com/advaittt_dev" },
                  { icon: <Mail className="w-5 h-5" />, label: "Email", link: "mailto:advaitt.dev@gmail.com" },
                  { icon: <SiDiscord className="w-5 h-5" />, label: "Discord", link: "https://discord.gg/zQ8gwDK9Zr" }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.link}
                    initial={isMobile ? { opacity: 1 } : { opacity: 0, x: -10 }}
                    animate={isMobile ? { opacity: 1 } : { opacity: 1, x: 0 }}
                    transition={isMobile ? { duration: 0 } : { duration: 0.4, delay: 1 + (index * 0.1) }}
                    className="p-3 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
                    aria-label={social.label}
                    whileHover={!isMobile ? { scale: 1.1 } : undefined}
                    whileTap={!isMobile ? { scale: 0.95 } : undefined}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
          
          {/* Skills Radar Browser - only shown on desktop */}
          {!isMobile && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: getTransitionDuration(), delay: getAnimationDelay(0.6) }}
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
              
              {/* Interactive floating elements - only on desktop */}
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
          )}
        </div>
      </motion.section>

      {/* Skills Services Marquee - enabled for all devices */}
      <div className="relative w-full -mt-8 xs:-mt-12 md:mt-0 md:pt-8">
        <SkillsServicesMarquee />
      </div>

      {/* Featured Projects Section - simplified for mobile */}
      <section
        className="min-h-screen py-12 xs:py-16 sm:py-20 px-4 xs:px-6 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header - simplified for mobile */}
          <div className="text-center mb-12 xs:mb-16">
            <Badge className="px-3 py-1.5 bg-secondary text-secondary-foreground border-border mb-4 text-sm xs:text-base">
              Featured Work
            </Badge>
            <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400">
              Featured Projects
            </h2>
            <p className="text-base xs:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Explore some of my recent work that showcases my expertise in building modern web applications
            </p>
          </div>

          {/* Projects Carousel - simplified for mobile */}
          <div className="relative px-1 sm:px-4 md:px-6">
            <ProjectCarousel3D 
              projects={featuredProjects}
              onSelect={(project) => window.open(project.demoLink, '_blank')}
            />
          </div>
        </div>
      </section>

      {/* Services Section - reduced spacing */}
      <div className="-mt-8 md:-mt-12">
        <ServicesSection />
      </div>
      
      {/* Testimonials Section - reduced spacing */}
      <div className="-mt-8 md:-mt-12">
        <TestimonialsSection />
      </div>
      
      {/* Next Steps Section - reduced spacing */}
      <div className="-mt-8 md:-mt-12">
        <NextStepsSection />
      </div>
      
      {/* Let's Work Together Section - reduced spacing */}
      <div className="-mt-8 md:-mt-12">
        <LetsWorkTogetherSection />
      </div>
    </motion.div>
  )
}
