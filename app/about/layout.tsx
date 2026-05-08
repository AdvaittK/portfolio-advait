import type { Metadata } from "next"
import { SITE_URL } from "@/lib/blog-config"

const mergedKeywords = [
  "Advait full stack developer",
  "about full stack developer",
  "developer background",
  "developer certifications",
  "React developer skills",
  "Node.js expertise",
  "MERN stack skills",
  "JavaScript developer",
  "TypeScript developer",
  "Next.js expert",
  "MongoDB developer",
  "PostgreSQL skills",
  "API development",
  "frontend skills",
  "backend skills",
  "full stack technologies",
  "GraphQL developer",
  "REST API developer",
  "responsive design developer",
  "UI UX developer",
  "SaaS developer expertise",
]

export const metadata: Metadata = {
  title: "About — experience & technical stack",
  description:
    "Meet Advait — background, certifications, and full-stack depth: React.js, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, Express.js, REST and GraphQL APIs, responsive UI/UX, and modern web applications and SaaS.",
  keywords: mergedKeywords,
  openGraph: {
    title: "About Advait | Full-stack expertise, stack & certifications",
    description:
      "Expert-level work across React, Node.js, MERN stack, TypeScript, databases, APIs, and modern web technologies — with the story and credentials behind it.",
    url: `${SITE_URL}/about`,
    images: [{ url: "/new_homepage.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/about",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
