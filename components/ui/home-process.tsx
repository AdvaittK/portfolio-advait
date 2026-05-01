"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Compass, PenLine, Code2, Rocket } from "lucide-react"

const steps = [
  {
    title: "Discover",
    description:
      "Goals, audience, and constraints, so we’re not guessing what “good” means for your business.",
    icon: Compass,
  },
  {
    title: "Design",
    description:
      "Structure, messaging, and visual direction that feel premium on every breakpoint.",
    icon: PenLine,
  },
  {
    title: "Build",
    description:
      "Fast, maintainable frontends with clean UI implementation and attention to detail.",
    icon: Code2,
  },
  {
    title: "Launch & refine",
    description:
      "Go-live support, polish passes, and guidance so the site keeps working after shipping.",
    icon: Rocket,
  },
]

export function HomeProcess() {
  return (
    <section className="px-4 xs:px-6 py-14 xs:py-16 sm:py-20 bg-gradient-to-b from-transparent via-zinc-50/30 to-transparent dark:via-zinc-900/20" data-scroll-section>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 xs:mb-12">
          <Badge className="px-3 py-1.5 bg-secondary text-secondary-foreground border-border mb-4 text-sm xs:text-base">
            Process
          </Badge>
          <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400">
            How We Work Together
          </h2>
          <p className="text-base xs:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A calm, predictable rhythm, so you always know what happens next. Typical marketing sites ship in about{" "}
            <span className="font-medium text-foreground">3–6 weeks</span> depending on scope and feedback speed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 xs:gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 1, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex gap-4 p-5 xs:p-6 rounded-2xl bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900 text-sm font-bold text-zinc-700 dark:text-zinc-200">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-primary shrink-0" aria-hidden />
                    <h3 className="text-base xs:text-lg font-bold text-zinc-900 dark:text-zinc-50">{step.title}</h3>
                  </div>
                  <p className="text-sm xs:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
