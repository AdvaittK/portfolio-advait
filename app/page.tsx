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
import { useTheme } from "next-themes"
import { SiDiscord } from "react-icons/si"
import { useIsMobile } from "@/hooks/use-mobile"
import dynamic from "next/dynamic"
import { HomePortfolioStrip } from "@/components/ui/home-portfolio-strip"
import { HomeWhoIWorkWith } from "@/components/ui/home-who-i-work-with"
import { HomeFeaturedCaseStudies } from "@/components/ui/home-featured-case-studies"
import { HomeProcess } from "@/components/ui/home-process"
import { HomeFaq } from "@/components/ui/home-faq"

const CardSwap = dynamic(() => import("@/components/ui/card-swap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
      <div className="w-72 h-52 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 animate-pulse bg-zinc-100/30 dark:bg-zinc-800/20" />
    </div>
  ),
})

const heroProjectCards = [
  {
    title: "Nirav Panchmatia",
    image: "/assets/projects/niravp.webp",
    alt: "Nirav Panchmatia website",
    link: "https://niravpanchmatia.in",
  },
  {
    title: "Dem's Portfolio",
    image: "/assets/projects/dem-portfolio.webp",
    alt: "Dem thumbnail design portfolio",
    link: "http://demproductions.co/",
  },
  {
    title: "Crevo Studio",
    image: "/assets/projects/crevio.webp",
    alt: "Crevo Studio packaging design agency website",
    link: "https://www.crevostudio.in/",
  },
  {
    title: "Asoka Ferrocast",
    image: "/assets/projects/aoka.webp",
    alt: "Asoka Ferrocast industrial corporate website",
    link: "https://www.asokaferrocast.com/",
  },
  {
    title: "Cult of Content",
    image: "/assets/projects/coc.webp",
    alt: "Cult of Content growth agency website",
    link: "https://www.cultofcontent.agency/",
  },
  {
    title: "Integrated Media Agency",
    image: "/assets/projects/imga.webp",
    alt: "Integrated Media Agency personal brand website",
    link: "https://www.integratedmedia.online/",
  },
  {
    title: "Oriental Air & Ship",
    image: "/assets/projects/oriental-home.webp",
    alt: "Oriental Air & Ship Services logistics website",
    link: "https://www.orientalimited.com/",
  },
  {
    title: "Cult of Content Guitars",
    image: "/assets/projects/gcoc.webp",
    alt: "Cult of Content guitar retail agency website",
    link: "https://guitar.cultofcontent.agency/",
  },
  {
    title: "Sizzle Studios",
    image: "/assets/projects/sizzle-site.webp",
    alt: "Sizzle Studios creative agency website",
    link: "https://www.sizzlestudio.in/",
  },
  {
    title: "VITIRA",
    image: "/assets/projects/vitira.webp",
    alt: "VITIRA business website transformation",
    link: "https://www.vitira.in/",
  },
]

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
  const { resolvedTheme } = useTheme()

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
        className="min-h-fit flex flex-col justify-start pt-36 xs:pt-36 sm:pt-40 md:pt-48 lg:pt-52 items-center relative px-4 xs:px-6 pb-6 xs:pb-8 overflow-visible z-30"
      >
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 w-full max-w-6xl mx-auto items-center relative z-20">
          <motion.div
            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={isMobile ? { duration: 0 } : { duration: getTransitionDuration(), delay: getAnimationDelay(0.4) }}
            className="text-left md:col-span-6 lg:col-span-6 z-10"
          >
            <div className="space-y-4 xs:space-y-6">
              <ShimmerBadge>
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Available for new projects</span>
              </ShimmerBadge>

              <motion.h1
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0 } : { duration: getTransitionDuration(), delay: getAnimationDelay(0.6) }}
                className="text-3xl xs:text-4xl sm:text-5xl md:text-[42px] lg:text-[46px] xl:text-[50px] font-bold mb-3 leading-[1.12] text-foreground tracking-tight max-w-2xl"
              >
                I build websites that make people trust you before they call.
              </motion.h1>

              <motion.p
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0 } : { duration: getTransitionDuration(), delay: getAnimationDelay(0.75) }}
                className="text-base xs:text-lg md:text-lg text-muted-foreground max-w-lg leading-relaxed"
              >
                I&apos;m Advait, a web developer who builds sites for agencies, coaches and industrial businesses. Fast to load, clear to read, and easy to book a call from.
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
                  <Link href="/appointment">Book a Call</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full xs:w-auto rounded-full px-6 xs:px-8 py-3 h-auto text-lg xs:text-lg font-medium border-border bg-background hover:bg-secondary hover:text-foreground"
                >
                  <Link href="#case-studies" className="scroll-smooth">
                    See my work
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: getTransitionDuration(), delay: getAnimationDelay(0.6) }}
              className="md:col-span-6 lg:col-span-6 h-[440px] sm:h-[480px] md:h-[510px] lg:h-[550px] hidden md:flex items-center justify-center relative w-full -translate-y-4 md:-translate-y-6 lg:-translate-y-8 translate-x-4 md:translate-x-8 lg:translate-x-10 z-40"
            >
              <CardSwap
                items={heroProjectCards}
                width={470}
                height={336}
                cardDistance={32}
                verticalDistance={36}
                depth={60}
                skewAmount={4}
                cardRadius={18}
                delay={3500}
                theme={resolvedTheme === "light" ? "light" : "dark"}
              />
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
