"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Clock, Tag } from "lucide-react"
import type { BlogPost } from "@/lib/blog-config"

export function BlogPostHeader({ post }: { post: BlogPost }) {
  return (
    <header className="mb-10 md:mb-12">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/blog"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
          All posts
        </Link>

        <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
          <time dateTime={post.date} className="tabular-nums">
            {format(new Date(post.date), "MMMM d, yyyy")}
          </time>
          {post.updated && post.updated !== post.date ? (
            <>
              <span aria-hidden className="text-zinc-300 dark:text-zinc-600">
                ·
              </span>
              <span>
                Revised{" "}
                <time dateTime={post.updated} className="tabular-nums">
                  {format(new Date(post.updated), "MMM d, yyyy")}
                </time>
              </span>
            </>
          ) : null}
          <span aria-hidden className="text-zinc-300 dark:text-zinc-600">
            ·
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {post.readingMinutes} min read
          </span>
        </div>

        <h1 className="font-heading text-3xl font-bold leading-[1.12] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
          {post.title}
        </h1>

        <p className="mt-5 text-lg font-normal leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-xl md:leading-relaxed">
          {post.description}
        </p>

        {post.tags && post.tags.length > 0 ? (
          <div className="mt-7 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-zinc-200/80 bg-zinc-50/90 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-800/70 dark:text-zinc-300"
              >
                <Tag className="h-3 w-3 opacity-70" aria-hidden />
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </motion.div>

      {post.image ? (
        <motion.div
          className="mt-10 overflow-hidden rounded-2xl border border-zinc-200/70 shadow-2xl shadow-zinc-900/10 dark:border-zinc-700/50 dark:shadow-black/50 sm:rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[1.9/1] max-h-[420px] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover object-center scale-[1.12]"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        </motion.div>
      ) : null}
    </header>
  )
}
