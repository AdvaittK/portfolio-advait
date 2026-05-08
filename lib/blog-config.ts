/** Safe to import from Client Components — no Node built-ins. */

export const SITE_URL = "https://advaitt.dev"
export const BLOG_AUTHOR = "Advait"

export type BlogFrontmatter = {
  title: string
  description: string
  /** ISO date string */
  date: string
  /** ISO date; optional, defaults to date */
  updated?: string
  tags?: string[]
  /** Path under /public or absolute URL for Open Graph */
  image?: string
  /** Override canonical path (rare); else /blog/[slug] */
  canonical?: string
  /** Hide from listings but keep route (optional) */
  draft?: boolean
}

export type BlogPostMeta = BlogFrontmatter & {
  slug: string
}

export type BlogPost = BlogPostMeta & {
  content: string
  readingMinutes: number
}
