"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const faqItems = [
  {
    q: "What does a typical timeline look like?",
    a: "Most marketing and brand sites land in roughly 3–6 weeks from kickoff to launch, depending on scope, content readiness, and how quickly feedback comes back. Larger builds or e‑commerce can run longer. We map milestones in the discovery phase.",
  },
  {
    q: "What do you need from me to start?",
    a: "Goals, audience, brand assets (or references), copy if you have it, and access to anything I need to integrate (forms, analytics, domain). If content isn’t ready yet, we can structure the site around placeholders and refine in parallel.",
  },
  {
    q: "What’s included in a website engagement?",
    a: "Discovery, information architecture, UI design implementation, responsive build, performance-conscious delivery, launch support, and a structured handoff. Specifics depend on the proposal we agree on: no surprise scope creep without a conversation.",
  },
  {
    q: "How do revisions work?",
    a: "We work in agreed review rounds so feedback stays organized. Small polish after launch is normal; larger new features or redesigns are scoped separately so timelines stay predictable.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Many clients want light ongoing support (updates, small enhancements, monitoring). We can define a retainer or an as-needed arrangement that fits how you operate.",
  },
  {
    q: "How is this different from templates or gig-marketplace work?",
    a: "You get a partner thinking about narrative, hierarchy, and credibility, not just dropping copy into a theme. The goal is a bespoke experience that fits your offer, your category, and how you actually sell.",
  },
]

export function HomeFaq() {
  return (
    <section className="px-4 xs:px-6 py-14 xs:py-16 sm:py-20 bg-gradient-to-b from-transparent via-zinc-50/30 to-transparent dark:via-zinc-900/20" data-scroll-section>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 xs:mb-12">
          <Badge className="px-3 py-1.5 bg-secondary text-secondary-foreground border-border mb-4 text-sm xs:text-base">
            FAQ
          </Badge>
          <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400">
            Before You Book
          </h2>
          <p className="text-base xs:text-lg text-muted-foreground leading-relaxed">
            Straight answers so serious projects start with aligned expectations.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 bg-gradient-to-br from-zinc-50/80 to-zinc-100/60 dark:from-zinc-800/80 dark:to-zinc-900/60 backdrop-blur-sm open:shadow-md transition-shadow"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-zinc-900 dark:text-zinc-50 text-sm xs:text-base [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span className="shrink-0 text-zinc-400 group-open:rotate-45 transition-transform text-xl leading-none" aria-hidden>
                  +
                </span>
              </summary>
              <p className="px-5 pb-4 pt-4 text-sm xs:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/40 dark:border-zinc-700/40">
                {item.a}
              </p>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
