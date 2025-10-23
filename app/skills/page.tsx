import type { Metadata } from "next"
import { PageContainer } from "@/components/layout/page-container"
import { SkillsContent } from "@/components/ui/skills-content"

export const metadata: Metadata = {
  title: "Technical Skills | React, Node.js, MERN Stack Developer Expertise",
  description: "Comprehensive technical skills: React.js, Node.js, Next.js, TypeScript, MongoDB, PostgreSQL, Express.js, REST APIs, GraphQL, responsive design, UI/UX, and modern web development technologies. Full stack expertise for web applications and SaaS development.",
  keywords: [
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
    "full stack technologies"
  ],
  openGraph: {
    title: "Technical Skills | Full Stack Developer Expertise",
    description: "Expert skills in React, Node.js, MERN stack, TypeScript, and modern web technologies",
    images: [{ url: "/new_homepage.png", width: 1200, height: 630 }],
  },
}

export default function SkillsPage() {
  return (
    <PageContainer>
      <SkillsContent />
    </PageContainer>
  )
}