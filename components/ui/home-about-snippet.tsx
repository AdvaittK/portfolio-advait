"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

export function HomeAboutSnippet() {
  const isMobile = useIsMobile()

  return (
    <section className="px-4 xs:px-6 py-14 xs:py-16 sm:py-20" data-scroll-section>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 xs:mb-12">
          <Badge className="px-3 py-1.5 bg-secondary text-secondary-foreground border-border mb-4 text-sm xs:text-base">
            About
          </Badge>
          <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400">
            Design-driven engineering
          </h2>
        </div>

        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 16 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={isMobile ? undefined : { duration: 0.45 }}
          className="grid md:grid-cols-[minmax(0,280px)_1fr] gap-8 md:gap-12 items-center rounded-2xl p-6 xs:p-8 md:p-10 bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50"
        >
          <div className="relative aspect-[4/5] max-w-[240px] mx-auto md:mx-0 w-full rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-700/60 shadow-lg">
            <Image src="/assets/people/advait.webp" alt="Advait" fill className="object-cover" sizes="280px" priority={false} />
          </div>
          <div className="space-y-5 text-center md:text-left">
            <p className="text-base xs:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
              I&apos;m Advait, a full-stack developer and UI designer. I partner with founders and marketing leads who want a site that earns attention: clear story,
              refined visuals, and code that stays fast as you iterate.
            </p>
            <p className="text-base xs:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
              My bias is toward calm, high-trust experiences, whether that&apos;s a conversion-led agency site, a coaching brand, or a corporate presence that has to
              stand up to scrutiny.
            </p>
            <Button asChild className="rounded-full bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900">
              <Link href="/about" className="inline-flex items-center gap-2">
                Full background & credentials
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
