import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio Projects | Full Stack Developer Work - React, Node.js, MERN Stack",
  description: "Explore Advait's portfolio of full stack development projects. E-commerce platforms, SaaS applications, business websites, and custom web solutions built with React, Node.js, Next.js, TypeScript, and modern technologies.",
  keywords: [
    "full stack portfolio",
    "React projects",
    "Node.js projects",
    "MERN stack projects",
    "Next.js portfolio",
    "web development portfolio",
    "e-commerce development",
    "SaaS development examples",
    "business website examples",
    "custom web applications",
    "developer portfolio India",
    "web developer work samples"
  ],
  openGraph: {
    title: "Full Stack Developer Portfolio | React & Node.js Projects",
    description: "Explore professional web development projects - E-commerce, SaaS, business websites built with modern technologies",
    images: [{ url: "/new_homepage.png", width: 1200, height: 630 }],
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

