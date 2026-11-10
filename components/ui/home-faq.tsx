"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const faqItems = [
  {
    q: "What does a typical timeline look like?",
    a: "Most marketing sites take 3–6 weeks from kickoff to launch. The exact timeline depends on project scope and how quickly we review revisions.",
  },
  {
    q: "What do you need from me to start?",
    a: "I need your project brief, brand assets, and any draft copy you have ready. If your copy is still in progress, I start with wireframe drafts while you finish it.",
  },
  {
    q: "What’s included in a website engagement?",
    a: "Every engagement includes custom page design, a responsive Next.js build, deployment, and post-launch support. We define every deliverable before starting so there are no surprise costs.",
  },
  {
    q: "How do revisions work?",
    a: "We review work at agreed milestones so you can share feedback before I move to the next stage. Minor refinements are included, while new feature requests are scoped separately.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes, every build includes post-launch bug fixes. If you need ongoing updates or maintenance, I offer monthly retainers and hourly support.",
  },
  {
    q: "How is this different from templates or gig-marketplace work?",
    a: "I design the layout around your offer instead of filling a theme. Everything is hand-built, so there's no plugin bloat and you own the code.",
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
            Common questions about timelines, deliverables and how I work.
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
