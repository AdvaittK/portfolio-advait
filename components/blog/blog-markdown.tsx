"use client"

import { useEffect, useState } from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism"
import { useTheme } from "next-themes"

const proseArticle =
  "prose prose-lg prose-zinc dark:prose-invert max-w-none " +
  "prose-headings:font-heading prose-headings:font-semibold " +
  "prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:scroll-mt-28 " +
  "prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:scroll-mt-28 " +
  "prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-p:leading-relaxed " +
  "prose-li:text-zinc-600 dark:prose-li:text-zinc-300 " +
  "prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100 " +
  "prose-a:text-zinc-900 dark:prose-a:text-zinc-100 prose-a:font-medium prose-a:no-underline " +
  "prose-a:underline-offset-4 hover:prose-a:underline prose-a:decoration-zinc-400 dark:prose-a:decoration-zinc-600 " +
  "prose-blockquote:border-l-zinc-400 dark:prose-blockquote:border-l-zinc-600 " +
  "prose-blockquote:text-zinc-600 dark:prose-blockquote:text-zinc-400 " +
  "prose-hr:border-zinc-200 dark:prose-hr:border-zinc-800 " +
  "prose-table:text-sm " +
  "prose-th:border prose-th:border-zinc-200 dark:prose-th:border-zinc-800 " +
  "prose-td:border prose-td:border-zinc-200 dark:prose-td:border-zinc-800"

type Props = {
  content: string
}

function MarkdownCode({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"code">) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const match = /language-(\w+)/.exec(className || "")
  const language = match?.[1]
  const codeText = String(children).replace(/\n$/, "")
  const isBlock = Boolean(language) || codeText.includes("\n")

  if (isBlock && language) {
    const style = mounted && resolvedTheme === "dark" ? oneDark : oneLight
    return (
      <span className="block my-6 not-prose rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-700/80 shadow-lg">
        <SyntaxHighlighter
          language={language}
          style={style}
          customStyle={{
            margin: 0,
            padding: "1.25rem 1.5rem",
            borderRadius: "1rem",
            fontSize: "0.875rem",
            lineHeight: 1.65,
            background: "transparent",
          }}
          codeTagProps={{
            className: "font-mono",
          }}
        >
          {codeText}
        </SyntaxHighlighter>
      </span>
    )
  }

  if (isBlock) {
    return (
      <pre className="my-6 not-prose rounded-2xl overflow-x-auto border border-zinc-200/80 dark:border-zinc-700/80 bg-zinc-950 dark:bg-zinc-950 p-4 sm:p-5 shadow-inner">
        <code
          className="font-mono text-sm text-zinc-100 leading-relaxed whitespace-pre"
          {...props}
        >
          {codeText}
        </code>
      </pre>
    )
  }

  return (
    <code
      className="rounded-md bg-zinc-100 dark:bg-zinc-800/90 px-1.5 py-0.5 text-[0.9em] font-mono text-zinc-800 dark:text-zinc-200"
      {...props}
    >
      {children}
    </code>
  )
}

export function BlogMarkdown({ content }: Props) {
  const components: Components = {
    pre: ({ children }) => <>{children}</>,
    a: ({ href, children }) => {
      if (href?.startsWith("/")) {
        return (
          <Link
            href={href}
            className="text-zinc-900 dark:text-zinc-100 underline-offset-4 hover:underline decoration-zinc-400 dark:decoration-zinc-600 font-medium"
          >
            {children}
          </Link>
        )
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-900 dark:text-zinc-100 underline-offset-4 hover:underline decoration-zinc-400 dark:decoration-zinc-600 font-medium"
        >
          {children}
        </a>
      )
    },
    img: ({ src, alt }) => (
      <span className="my-10 block overflow-hidden rounded-2xl border border-zinc-200/80 not-prose shadow-xl dark:border-zinc-700/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src ?? ""}
          alt={alt ?? ""}
          className="h-auto w-full scale-[1.06] object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </span>
    ),
    code: MarkdownCode as Components["code"],
  }

  return (
    <article className={proseArticle}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </article>
  )
}
