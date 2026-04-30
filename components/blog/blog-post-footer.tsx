"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MessageCircle } from "lucide-react"

export function BlogPostFooter() {
  return (
    <motion.aside
      className="not-prose relative mt-16 overflow-hidden rounded-2xl border border-zinc-200/75 bg-gradient-to-br from-white via-zinc-50/90 to-zinc-100/50 p-8 shadow-lg dark:border-zinc-700/55 dark:from-zinc-900/80 dark:via-zinc-950/60 dark:to-zinc-950/90 sm:rounded-3xl sm:p-10 md:mt-24"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-zinc-300/30 to-transparent blur-3xl dark:from-zinc-600/20"
        aria-hidden
      />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Next step
          </p>
          <h2 className="font-heading mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Want this kind of polish on your product?
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            React, Next.js, performance, and launch-ready detail—tell me what you&apos;re building.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-zinc-800 to-zinc-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-95 dark:from-zinc-100 dark:to-zinc-300 dark:text-zinc-900"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Start a conversation
        </Link>
      </div>
    </motion.aside>
  )
}
