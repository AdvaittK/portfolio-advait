"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react"
import type { BlogPost } from "@/lib/blog-config"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 220, damping: 26 },
  },
}

function PostMeta({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 tabular-nums ${className ?? ""}`}
    >
      <time dateTime={post.date}>{format(new Date(post.date), "MMM d, yyyy")}</time>
      <span aria-hidden className="text-zinc-300 dark:text-zinc-600">
        ·
      </span>
      <span className="inline-flex items-center gap-1">
        <Clock className="w-3.5 h-3.5" aria-hidden />
        {post.readingMinutes} min
      </span>
    </div>
  )
}

export function BlogIndexContent({ posts }: { posts: BlogPost[] }) {
  const [featured, ...rest] = posts

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[min(90vw,52rem)] -translate-x-1/2 rounded-full bg-gradient-to-b from-zinc-400/15 via-transparent to-transparent blur-3xl dark:from-zinc-500/10"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-0 pb-24 md:pb-28">
        <motion.header
          className="mb-12 md:mb-16 lg:mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-12 bg-gradient-to-r from-zinc-400 to-transparent dark:from-zinc-500" />
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                <BookOpen className="h-3.5 w-3.5 opacity-80" aria-hidden />
                Blog
              </span>
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-[3.25rem] md:leading-[1.08]">
              <span className="bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-500 bg-clip-text text-transparent dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-400">
                Guides &amp; insights
              </span>
              <br />
              <span className="text-zinc-600 dark:text-zinc-400 text-[0.92em] font-semibold">
                for modern web products
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Practical posts on full‑stack development, Next.js, performance, and SEO—useful whether
              you&apos;re hiring, building, or both.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-mono tabular-nums text-zinc-700 dark:text-zinc-300">
                {posts.length.toString().padStart(2, "0")}
              </span>{" "}
              {posts.length === 1 ? "post" : "posts"}
            </p>
          </div>
        </motion.header>

        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-300/80 bg-zinc-50/50 px-8 py-14 text-center text-zinc-600 dark:border-zinc-700/70 dark:bg-zinc-900/30 dark:text-zinc-400">
            New posts will appear here soon.{" "}
            <Link
              href="/contact"
              className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
            >
              Get in touch
            </Link>{" "}
            if you&apos;d like to collaborate on a topic.
          </p>
        ) : null}

        {featured ? (
          <motion.div
            className="mb-10 md:mb-14"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-[1.75rem] p-[1px] bg-gradient-to-br from-zinc-300/90 via-zinc-200/50 to-zinc-400/40 shadow-xl shadow-zinc-900/5 dark:from-zinc-600/50 dark:via-zinc-700/30 dark:to-zinc-500/25 dark:shadow-black/40">
              <article className="overflow-hidden rounded-[1.7rem] bg-white/85 backdrop-blur-xl dark:bg-zinc-950/75">
                <Link href={`/blog/${featured.slug}`} className="group block">
                  <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
                    <div className="relative aspect-[16/11] min-h-[220px] overflow-hidden bg-zinc-100 dark:bg-zinc-900 lg:aspect-auto lg:min-h-[320px]">
                      {featured.image ? (
                        <Image
                          src={featured.image}
                          alt={featured.title}
                          fill
                          className="object-cover object-center scale-[1.14] transition duration-700 ease-out group-hover:scale-[1.22]"
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          priority
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-200/80 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-90 lg:from-black/35" />
                      <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-900 shadow-sm backdrop-blur dark:bg-zinc-950/80 dark:text-zinc-100">
                        Latest
                      </span>
                    </div>
                    <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10 lg:pl-12">
                      <PostMeta post={featured} className="mb-4" />
                      <h2 className="font-heading text-2xl font-semibold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-zinc-50 dark:group-hover:text-white sm:text-3xl">
                        {featured.title}
                      </h2>
                      <p className="mt-4 line-clamp-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {featured.description}
                      </p>
                      {featured.tags && featured.tags.length > 0 ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {featured.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 rounded-full border border-zinc-200/80 bg-zinc-50/90 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-800/60 dark:text-zinc-300"
                            >
                              <Tag className="h-3 w-3 opacity-70" aria-hidden />
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        Read article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </div>
          </motion.div>
        ) : null}

        {rest.length > 0 ? (
          <motion.ul
            className="grid gap-6 sm:gap-7 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {rest.map((post, i) => {
              const n = String(i + 2).padStart(2, "0")
              return (
                <motion.li key={post.slug} variants={itemVariants}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/65 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300/90 hover:shadow-xl dark:border-zinc-700/55 dark:bg-zinc-900/40 dark:hover:border-zinc-600/80 sm:rounded-3xl sm:p-7"
                  >
                    <span className="pointer-events-none absolute right-5 top-5 font-mono text-4xl font-bold tabular-nums text-zinc-200/90 transition-colors group-hover:text-zinc-300/80 dark:text-zinc-800 dark:group-hover:text-zinc-700/90">
                      {n}
                    </span>
                    <PostMeta post={post} className="mb-4 pr-14" />
                    <h2 className="font-heading text-xl font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[1.35rem]">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {post.description}
                    </p>
                    {post.image ? (
                      <div className="relative mt-5 aspect-[2.2/1] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800/50">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover object-center scale-[1.12] opacity-95 transition duration-500 group-hover:scale-[1.2] group-hover:opacity-100"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ) : (
                      <div className="mt-5 h-px w-full bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-700" />
                    )}
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.li>
              )
            })}
          </motion.ul>
        ) : null}
      </div>
    </div>
  )
}
