import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | Advait's Portfolio",
  description: "Explore the range of professional services I offer in web development, software solutions, and digital optimization.",
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 