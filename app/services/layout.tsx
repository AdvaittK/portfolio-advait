import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | Advait's Portfolio",
  description: "Explore the range of professional services I offer in web development, software solutions, and digital optimization.",
}

import ServicesWrapper from './services-wrapper';

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ServicesWrapper>
      {children}
    </ServicesWrapper>
  )
} 