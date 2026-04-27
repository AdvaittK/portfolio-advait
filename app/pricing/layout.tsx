import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing | Advait's Portfolio",
  description: "Transparent pricing for web development packages and ongoing maintenance.",
}

import PricingWrapper from "./pricing-wrapper"

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PricingWrapper>{children}</PricingWrapper>
}

