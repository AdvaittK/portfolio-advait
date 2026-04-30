"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { HOME_STAT_BAR_ITEMS } from "@/lib/home-stats"

export function HomePortfolioStrip() {
  const isMobile = useIsMobile()

  return (
    <section
      className="w-full px-4 xs:px-6 py-12 xs:py-14 sm:py-16 bg-gradient-to-b from-transparent via-zinc-50/35 to-transparent dark:via-zinc-900/20"
      aria-label="Portfolio overview"
      data-scroll-section
    >
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 8 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={isMobile ? undefined : { duration: 0.45 }}
          className="rounded-2xl p-4 xs:p-6 sm:p-8 bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm"
        >
          <div className="flex flex-row divide-x divide-zinc-200/60 dark:divide-zinc-600/45">
            {HOME_STAT_BAR_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex-1 min-w-0 px-2 xs:px-3 sm:px-6 py-1 text-center first:pl-1 last:pr-1 xs:first:pl-2 xs:last:pr-2 sm:first:pl-2 sm:last:pr-2"
              >
                <p className="text-2xl xs:text-3xl sm:text-[2.25rem] font-bold tabular-nums tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400 leading-none">
                  {item.value}
                </p>
                <p className="text-[10px] xs:text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 sm:mt-2 font-medium leading-snug">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed text-pretty">
            Sites, products, and internal tools from discovery through launch.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors group"
          >
            View all projects
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
