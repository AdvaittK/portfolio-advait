import fs from "fs"
import path from "path"
import matter from "gray-matter"
import {
  SITE_URL,
  type BlogFrontmatter,
  type BlogPost,
  type BlogPostMeta,
} from "./blog-config"

export type { BlogFrontmatter, BlogPost, BlogPostMeta }
export { BLOG_AUTHOR, SITE_URL } from "./blog-config"

const POSTS_DIR = path.join(process.cwd(), "content/blog")

function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

function parseImageToAbsolute(image: string | undefined): string | undefined {
  if (!image) return undefined
  if (image.startsWith("http://") || image.startsWith("https://")) return image
  const pathPart = image.startsWith("/") ? image : `/${image}`
  return `${SITE_URL}${pathPart}`
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const full = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(full)) return null
  const raw = fs.readFileSync(full, "utf8")
  const { data, content } = matter(raw)
  const fm = data as Partial<BlogFrontmatter>
  if (!fm.title || !fm.description || !fm.date) {
    throw new Error(`Post "${slug}" requires title, description, and date in frontmatter`)
  }
  const meta: BlogPostMeta = {
    slug,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    updated: fm.updated,
    tags: fm.tags ?? [],
    image: fm.image,
    canonical: fm.canonical,
    draft: fm.draft,
  }
  return {
    ...meta,
    content,
    readingMinutes: readingTime(content),
  }
}

export function getAllPosts(includeDrafts = false): BlogPost[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => p !== null)
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return posts
}

export function getCanonicalUrl(slug: string, meta?: Pick<BlogPostMeta, "canonical">): string {
  if (meta?.canonical?.startsWith("http")) return meta.canonical
  if (meta?.canonical) return `${SITE_URL}${meta.canonical.startsWith("/") ? "" : "/"}${meta.canonical}`
  return `${SITE_URL}/blog/${slug}`
}

export function getOgImageForPost(meta: Pick<BlogPostMeta, "image">): string {
  const fallback = `${SITE_URL}/new_homepage.png`
  return parseImageToAbsolute(meta.image) ?? fallback
}
