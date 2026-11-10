"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HomeAboutSnippet() {
  return (
    <section className="px-4 xs:px-6 py-6 xs:py-8 sm:py-10" data-scroll-section aria-label="About me">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl p-6 xs:p-7 sm:p-8 bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          <div className="relative w-[120px] h-[120px] shrink-0 rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm">
            <Image
              src="/assets/people/advait.webp"
              alt="Advait"
              fill
              className="object-cover"
              sizes="120px"
            />
          </div>
          <div className="space-y-3 text-center sm:text-left flex-1 min-w-0">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">About me</h3>
            <p className="text-sm xs:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              I build marketing sites and portfolios that load fast, read clearly and make it easy for visitors to book a call.
            </p>
            <div className="pt-1">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors group"
              >
                More about me
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
