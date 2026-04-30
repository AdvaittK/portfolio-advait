import type { Metadata } from "next"
import { PageContainer } from "@/components/layout/page-container"
import { BlogIndexContent } from "@/components/blog/blog-index-content"
import { getAllPosts, SITE_URL } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog | Next.js, Full‑Stack Development & SEO — Advait",
  description:
    "Blog posts on Next.js, React, Node.js, web performance, SEO, and hiring a full‑stack developer—for founders and technical teams.",
  keywords: [
    "Next.js blog",
    "full stack developer blog",
    "hire full stack developer India",
    "React SEO",
    "web performance blog",
    "freelance web developer",
    "Advait blog",
  ],
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Blog | Advait — Next.js & full‑stack development",
    description:
      "Guides and insights on modern web development, performance, and SEO.",
    images: [{ url: "/new_homepage.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Advait",
    description:
      "Guides and insights on modern web development, performance, and SEO.",
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <PageContainer>
      <BlogIndexContent posts={posts} />
    </PageContainer>
  )
}
