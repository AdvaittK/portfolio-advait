"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Building2, Mic2, Factory } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const segments = [
  {
    title: "Agencies & creative studios",
    icon: Building2,
    outcome: "Win premium retainers with a site that sells the craft, not just the stack.",
    bullets: ["Landing + marketing sites", "Portfolio systems", "Launch support"],
  },
  {
    title: "Coaches & personal brands",
    icon: Mic2,
    outcome: "Turn attention into booked calls with clear positioning and calm, high-trust UX.",
    bullets: ["Story-led layouts", "Lead paths & CTAs", "Performance + accessibility"],
  },
  {
    title: "Corporate, industrial & D2C",
    icon: Factory,
    outcome: "Look as serious as the operation behind you, online and on mobile.",
    bullets: ["Corporate & logistics sites", "D2C storefronts", "Ongoing refinement"],
  },
]

export function HomeWhoIWorkWith() {
  return (
    <section className="px-4 xs:px-6 py-14 xs:py-16 sm:py-20" data-scroll-section>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 xs:mb-12 sm:mb-14">
          <Badge className="px-3 py-1.5 bg-secondary text-secondary-foreground border-border mb-4 text-sm xs:text-base">
            Focus
          </Badge>
          <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400">
            Who I work with
          </h2>
          <p className="text-base xs:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Purpose-built web experiences for teams that care how their brand feels before a prospect ever sends a message.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 xs:gap-5 md:gap-6">
          {segments.map((seg, index) => {
            const Icon = seg.icon
            return (
              <motion.div
                key={seg.title}
                initial={{ opacity: 1, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="rounded-2xl p-6 xs:p-7 flex flex-col h-full bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900">
                    <Icon className="h-5 w-5 text-zinc-700 dark:text-zinc-200" aria-hidden />
                  </span>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 leading-snug text-left">
                    {seg.title}
                  </h3>
                </div>
                <p className="text-sm xs:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5 flex-grow">
                  {seg.outcome}
                </p>
                <ul className="text-xs xs:text-sm text-zinc-500 dark:text-zinc-400 space-y-2 mb-6">
                  {seg.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-primary shrink-0 mt-0.5" aria-hidden>
                        •
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/appointment" className="mt-auto">
                  <Button
                    variant="ghost"
                    className="w-full rounded-full justify-center gap-2 text-zinc-800 dark:text-zinc-100 border border-zinc-200/80 dark:border-zinc-600/80 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80"
                  >
                    Discuss your fit <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
