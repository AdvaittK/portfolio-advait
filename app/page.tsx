"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Mail } from "lucide-react"
import XIcon from "@/components/ui/x-icon"
import { cn } from "@/lib/utils"
import { ShimmerBadge } from "@/components/ui/shimmer-badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { gsap } from "gsap"
import { SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiDiscord } from "react-icons/si"
import { useIsMobile } from "@/hooks/use-mobile"
import dynamic from "next/dynamic"
import { HomePortfolioStrip } from "@/components/ui/home-portfolio-strip"
import { HomeWhoIWorkWith } from "@/components/ui/home-who-i-work-with"
import { HomeFeaturedCaseStudies } from "@/components/ui/home-featured-case-studies"
import { HomeProcess } from "@/components/ui/home-process"
import { HomeFaq } from "@/components/ui/home-faq"

const SkillsRadarBrowser = dynamic(() => import("@/components/ui/skills-radar-browser").then((mod) => ({ default: mod.SkillsRadarBrowser })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  ),
})

const LetsWorkTogetherSection = dynamic(() => import("@/components/ui/lets-work-together-section").then((mod) => ({ default: mod.LetsWorkTogetherSection })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-200/60 to-zinc-300/60 dark:from-zinc-800/40 dark:to-zinc-700/40 animate-pulse" />
    </div>
  ),
})

const SkillsServicesMarquee = dynamic(() => import("@/components/ui/skills-services-marquee").then((mod) => ({ default: mod.SkillsServicesMarquee })), {
  ssr: false,
})

const TestimonialsSection = dynamic(() => import("@/components/ui/testimonials-section").then((mod) => ({ default: mod.TestimonialsSection })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-200/60 to-zinc-300/60 dark:from-zinc-800/40 dark:to-zinc-700/40 animate-pulse" />
    </div>
  ),
})

export default function HomePage() {
  const pageTransitionRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (pageTransitionRef.current && !isMobile) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          pageTransitionRef.current,
          {
            autoAlpha: 0,
            y: 20,
            filter: "blur(10px)",
            scale: 0.98,
          },
          {
            duration: 1.2,
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            ease: "power3.out",
            clearProps: "all",
          }
        )
      })

      return () => ctx.revert()
    }
  }, [isMobile])

  const getTransitionDuration = () => (isMobile ? 0 : 0.5)
  const getAnimationDelay = (desktop: number) => (isMobile ? 0 : desktop)

  return (
    <motion.div
      ref={pageTransitionRef}
      initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 40 }}
      animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={isMobile ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
      className={cn("min-h-screen bg-transparent text-foreground transition-colors duration-300")}
    >
      <motion.section
        data-scroll-section
        initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={isMobile ? { duration: 0 } : { duration: getTransitionDuration(), delay: getAnimationDelay(0.2) }}
        className="min-h-fit flex flex-col justify-start pt-28 xs:pt-28 sm:pt-24 items-center relative px-4 xs:px-6 pb-6 xs:pb-8 overflow-hidden md:pt-72"
      >
        <div className="grid md:grid-cols-5 gap-6 xs:gap-8 w-full max-w-6xl mx-auto items-start relative z-10">
          <motion.div
            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={isMobile ? { duration: 0 } : { duration: getTransitionDuration(), delay: getAnimationDelay(0.4) }}
            className="text-left md:col-span-2 lg:col-span-3 z-10"
          >
            <div className="space-y-4 xs:space-y-6">
              <ShimmerBadge text="Premium web experiences for serious brands" />

              <motion.h1
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0 } : { duration: getTransitionDuration(), delay: getAnimationDelay(0.6) }}
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold mb-2 leading-tight"
              >
                Websites that turn clarity into{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400">
                  trust, and trust into leads
                </span>
              </motion.h1>

              <motion.p
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0 } : { duration: getTransitionDuration(), delay: getAnimationDelay(0.75) }}
                className="text-base xs:text-lg md:text-lg text-muted-foreground max-w-lg leading-relaxed"
              >
                I design and build fast, elegant frontends for agencies, founders, and established businesses, pairing conversion-minded structure with a polished
                visual language.
              </motion.p>

              <motion.div
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0 } : { duration: getTransitionDuration(), delay: getAnimationDelay(0.9) }}
                className="flex flex-col xs:flex-row gap-3 xs:gap-4 pt-2"
              >
                <Button
                  asChild
                  className="w-full xs:w-auto rounded-full px-6 xs:px-8 py-3 h-auto text-lg xs:text-lg font-medium"
                >
                  <Link href="/appointment">Book a strategy call</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full xs:w-auto rounded-full px-6 xs:px-8 py-3 h-auto text-lg xs:text-lg font-medium border-border bg-background hover:bg-secondary hover:text-foreground"
                >
                  <Link href="#case-studies" className="scroll-smooth">
                    View case studies
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0 } : { duration: getTransitionDuration(), delay: getAnimationDelay(1.05) }}
                className="flex justify-center xs:justify-start gap-4 pt-4"
              >
                {[
                  { icon: <Github className="w-5 h-5" />, label: "GitHub", link: "https://github.com/AdvaittK" },
                  { icon: <XIcon className="w-5 h-5" />, label: "X", link: "https://x.com/advaittt_dev" },
                  { icon: <Mail className="w-5 h-5" />, label: "Email", link: "mailto:advaitt.dev@gmail.com" },
                  { icon: <SiDiscord className="w-5 h-5" />, label: "Discord", link: "https://discord.gg/zQ8gwDK9Zr" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.link}
                    initial={isMobile ? { opacity: 1 } : { opacity: 0, x: -10 }}
                    animate={isMobile ? { opacity: 1 } : { opacity: 1, x: 0 }}
                    transition={isMobile ? { duration: 0 } : { duration: 0.4, delay: 0.95 + index * 0.1 }}
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
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute -top-5 -right-5 w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 15, 0, -15, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <SiReact className="w-8 h-8 text-blue-500" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-6 -left-6 w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center"
                  animate={{
                    y: [0, 10, 0],
                    x: [0, 10, 0, -10, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <SiTypescript className="w-6 h-6 text-blue-600" />
                </motion.div>
                <motion.div
                  className="absolute top-1/3 -left-4 w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center"
                  animate={{
                    x: [0, 10, 0],
                    rotate: 360,
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
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
                    repeatType: "reverse",
                  }}
                >
                  <SiNextdotjs className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.section>

      <HomePortfolioStrip />

      <HomeWhoIWorkWith />

      <HomeFeaturedCaseStudies />

      <HomeProcess />

      <div className="w-full px-0 pt-2 pb-10" data-scroll-section>
        <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4 px-4">
          Tools & stack I ship with
        </p>
        <SkillsServicesMarquee />
      </div>

      <div className="mt-0" data-scroll-section>
        <TestimonialsSection />
      </div>

      <HomeFaq />

      <div className="mt-0" data-scroll-section>
        <LetsWorkTogetherSection />
      </div>
    </motion.div>
  )
}
