"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ExternalLink, ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { featuredProjects } from "@/lib/featured-projects"
import type { HomeCaseStudy } from "@/lib/home-case-studies"
import { homeCaseStudies } from "@/lib/home-case-studies"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

function projectForId(id: string) {
  return featuredProjects.find((p) => p.id === id)
}

function hostnameFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return "Live preview"
  }
}

function CaseStudyModalContent({
  study,
  project,
}: {
  study: HomeCaseStudy
  project: NonNullable<ReturnType<typeof projectForId>>
}) {
  const host = hostnameFromUrl(project.demoLink)
  const meta = [study.role, study.result].filter(Boolean).join(" · ")

  return (
    <div className="flex flex-col gap-4 text-left">
      {/* Header Info */}
      <div className="space-y-2 pr-6 text-left">
        <div className="flex flex-wrap items-center gap-1.5">
          {study.category && (
            <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">
              {study.category}
            </span>
          )}
          {study.year && (
            <span className="rounded-full border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 text-[11px] text-muted-foreground font-mono">
              {study.year}
            </span>
          )}
          {study.industryTags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 text-[10px] text-zinc-600 dark:text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-tight">
              {study.clientLabel}
            </h3>
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
            >
              <span>{host}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          {meta && (
            <p className="text-xs font-medium text-muted-foreground mt-0.5">
              {meta}
            </p>
          )}
          <p className="text-xs sm:text-sm font-normal text-muted-foreground mt-1 leading-snug">
            {study.headline}
          </p>
        </div>
      </div>

      {/* The Challenge / Problem */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-50 dark:bg-zinc-900/40 p-3 sm:p-3.5 space-y-1">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          The Challenge
        </h4>
        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
          {study.problem}
        </p>
      </div>

      {/* Approach & Outcomes in 2 Clean Side-by-Side Cards */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-50 dark:bg-zinc-900/40 p-3 sm:p-3.5 space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
            Execution & Approach
          </h4>
          <ul className="space-y-1.5 text-xs text-foreground/85 leading-relaxed">
            {study.approach.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-muted-foreground font-mono text-[10px] select-none shrink-0 mt-0.5">
                  0{i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-50 dark:bg-zinc-900/40 p-3 sm:p-3.5 space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Key Results
          </h4>
          <ul className="space-y-1.5 text-xs text-foreground/85 leading-relaxed">
            {study.outcomes.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold text-xs select-none shrink-0 mt-0.5">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Client Testimonial / Quote */}
      {study.quote && (
        <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-50 dark:bg-zinc-900/50 p-3 sm:p-3.5">
          <p className="text-xs sm:text-sm italic text-foreground/90 leading-relaxed">
            &ldquo;{study.quote}&rdquo;
          </p>
          {study.quoteAttribution && (
            <p className="text-[11px] font-semibold text-muted-foreground mt-1.5">
              — {study.quoteAttribution}
            </p>
          )}
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2.5 border-t border-zinc-200 dark:border-zinc-800">
        <Button asChild size="sm" className="w-full sm:w-auto rounded-full px-5 py-2 font-semibold text-xs sm:text-sm">
          <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
            Visit live website
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Button>
        <Button asChild size="sm" variant="outline" className="w-full sm:w-auto rounded-full px-4 py-2 font-medium text-xs sm:text-sm border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <Link href="/appointment" className="inline-flex items-center gap-1.5">
            Book a call
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

function CaseStudySlide({
  study,
  project,
  index,
  isMobile,
  mobileExpanded,
  onOpenDetails,
}: {
  study: HomeCaseStudy
  project: NonNullable<ReturnType<typeof projectForId>>
  index: number
  isMobile: boolean
  mobileExpanded: boolean
  onOpenDetails: () => void
}) {
  const host = hostnameFromUrl(project.demoLink)
  const previewAlt = `Screenshot of ${host}`
  const reduceMotion = useReducedMotion()
  const loop = reduceMotion ? 0 : Infinity

  return (
    <div className="flex flex-col">
      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/90 bg-zinc-50/90 dark:bg-zinc-950/60 p-2 sm:p-3 shadow-lg">
        <div className="overflow-hidden rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-zinc-100/90 dark:from-zinc-900 dark:to-zinc-950">
          <div className="flex items-center gap-2 border-b border-zinc-200/85 dark:border-zinc-800/90 px-2.5 py-2 sm:px-3 bg-zinc-100/95 dark:bg-zinc-900/95">
            <div className="flex gap-1.5 shrink-0" aria-hidden>
              <span className="h-2 w-2 rounded-full bg-[#ff5f5f] shadow-sm" />
              <span className="h-2 w-2 rounded-full bg-[#ffbd2e] shadow-sm" />
              <span className="h-2 w-2 rounded-full bg-[#28c840] shadow-sm" />
            </div>
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-0 flex-1 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
              aria-label={`Open ${host} in a new tab`}
            >
              <span className="flex w-full items-center gap-1.5 rounded-md border border-zinc-200/90 dark:border-zinc-700/80 bg-white dark:bg-zinc-950/80 px-2 py-1 text-[10px] sm:text-[11px] font-mono text-muted-foreground shadow-sm">
                <span className="shrink-0 select-none">https://</span>
                <span className="truncate text-foreground">{host}</span>
              </span>
            </a>
          </div>

          <div className="relative aspect-[16/10] w-full bg-zinc-200 dark:bg-zinc-950">
            <Image
              src={project.image}
              alt={previewAlt}
              fill
              sizes="(min-width: 1024px) 960px, 90vw"
              className="object-cover object-top"
              priority={index === 0}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex w-full flex-col items-center gap-3 px-1">
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <Button asChild variant="outline" className="rounded-full px-5 border-zinc-300/90 dark:border-zinc-600 bg-background/80">
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              View project
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </Button>
          <motion.div
            animate={reduceMotion ? undefined : { scale: [1, 1.02, 1] }}
            transition={{ duration: 2.2, repeat: loop, ease: "easeInOut" }}
          >
            <Button
              type="button"
              onClick={onOpenDetails}
              aria-expanded={isMobile ? mobileExpanded : undefined}
              aria-controls={isMobile ? `case-study-expanded-${study.id}` : undefined}
              className="rounded-full px-6 py-3 bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg font-semibold transition-all duration-300 group hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-zinc-100/5"
            >
              View case study
              {isMobile ? (
                <ChevronDown
                  className={cn(
                    "ml-2 h-4 w-4 shrink-0 transition-transform duration-300",
                    mobileExpanded && "rotate-180"
                  )}
                  aria-hidden
                />
              ) : (
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      {isMobile && mobileExpanded ? (
        <div
          className="mt-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 sm:p-5 text-left shadow-lg"
          id={`case-study-expanded-${study.id}`}
        >
          <CaseStudyModalContent study={study} project={project} />
        </div>
      ) : null}
    </div>
  )
}

export function HomeFeaturedCaseStudies() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedStudy, setSelectedStudy] = useState<HomeCaseStudy | null>(null)
  const [mobileExpandedStudyId, setMobileExpandedStudyId] = useState<string | null>(null)
  const isMobile = useIsMobile()
  const reduceMotion = useReducedMotion()
  const navLoop = reduceMotion ? 0 : Infinity

  const openDetails = (study: HomeCaseStudy) => {
    if (isMobile) {
      setMobileExpandedStudyId((prev) => (prev === study.id ? null : study.id))
      return
    }
    setSelectedStudy(study)
    setModalOpen(true)
  }

  const selectedProject = selectedStudy ? projectForId(selectedStudy.id) : undefined

  useEffect(() => {
    if (!carouselApi || !isMobile) return
    const onSelect = () => setMobileExpandedStudyId(null)
    carouselApi.on("select", onSelect)
    return () => {
      carouselApi.off("select", onSelect)
    }
  }, [carouselApi, isMobile])

  useEffect(() => {
    if (isMobile && modalOpen) {
      setModalOpen(false)
      setSelectedStudy(null)
    }
  }, [isMobile, modalOpen])

  useEffect(() => {
    if (!mobileExpandedStudyId || !isMobile) return
    const timer = window.setTimeout(() => {
      document.getElementById(`case-study-expanded-${mobileExpandedStudyId}`)?.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "nearest",
      })
    }, 80)
    return () => window.clearTimeout(timer)
  }, [mobileExpandedStudyId, isMobile])

  return (
    <section
      id="case-studies"
      className="relative px-4 xs:px-6 py-12 xs:py-14 sm:py-16 scroll-mt-24"
      data-scroll-section
      aria-labelledby="case-studies-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 max-w-3xl mx-auto">
          <Badge className="px-3 py-1.5 bg-secondary text-secondary-foreground border-border mb-4 text-sm">Case Studies</Badge>
          <h2
            id="case-studies-heading"
            className="text-3xl xs:text-4xl md:text-5xl font-bold mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400"
          >
            Selected Client Work
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed text-pretty">
            Browse previews below. Open any case for the full story, approach, and outcomes.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          setApi={setCarouselApi}
          className="w-full"
        >
          <CarouselContent className="-ml-3 sm:-ml-4">
            {homeCaseStudies.map((study, index) => {
              const project = projectForId(study.id)
              if (!project) return null
              return (
                <CarouselItem key={study.id} className="pl-3 sm:pl-4 basis-full min-w-0">
                  <CaseStudySlide
                    study={study}
                    project={project}
                    index={index}
                    isMobile={isMobile}
                    mobileExpanded={mobileExpandedStudyId === study.id}
                    onOpenDetails={() => openDetails(study)}
                  />
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>

        <div className="mt-5 flex flex-col items-center gap-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
            <motion.span
              animate={reduceMotion ? undefined : { x: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.6, repeat: navLoop, ease: "easeInOut" }}
              className="inline-flex text-primary"
              aria-hidden
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.span>
            Browse Studies
            <motion.span
              animate={reduceMotion ? undefined : { x: [0, 3, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.6, repeat: navLoop, ease: "easeInOut" }}
              className="inline-flex text-primary"
              aria-hidden
            >
              <ChevronRight className="h-4 w-4" />
            </motion.span>
          </p>
          <div className="flex items-center justify-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-zinc-300 dark:border-zinc-600 shadow-sm"
                onClick={() => carouselApi?.scrollPrev()}
                aria-label="Previous case study"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-zinc-300 dark:border-zinc-600 shadow-sm"
                onClick={() => carouselApi?.scrollNext()}
                aria-label="Next case study"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center text-center max-w-md mx-auto">
          <p className="text-sm text-muted-foreground leading-relaxed">
            More builds, demos, and experiments on the projects page.
          </p>
          <div
            className="mt-5 mb-5 h-px w-16 bg-gradient-to-r from-transparent via-zinc-400 to-transparent dark:via-zinc-500 opacity-80"
            aria-hidden
          />
          <Button
            asChild
            className="rounded-full px-6 py-3 bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg font-semibold transition-all duration-300 group hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-zinc-100/5"
          >
            <Link href="/projects" className="inline-flex items-center">
              View all projects
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>

      {!isMobile ? (
        <Dialog
          open={modalOpen}
          onOpenChange={(open) => {
            setModalOpen(open)
            if (!open) setSelectedStudy(null)
          }}
        >
          <DialogContent className="max-w-2xl w-[92vw] max-h-[88vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 sm:p-7 shadow-2xl focus:outline-none">
            {selectedStudy && selectedProject ? (
              <>
                <DialogTitle className="sr-only">{selectedStudy.clientLabel}</DialogTitle>
                <DialogDescription className="sr-only">{selectedStudy.headline}</DialogDescription>
                <CaseStudyModalContent study={selectedStudy} project={selectedProject} />
              </>
            ) : null}
          </DialogContent>
        </Dialog>
      ) : null}
    </section>
  )
}
