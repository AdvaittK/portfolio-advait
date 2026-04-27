"use client"

import type { ReactNode } from "react"
import { CurrencyProvider } from "@/lib/currency-provider"

export default function PricingWrapper({ children }: { children: ReactNode }) {
  return <CurrencyProvider>{children}</CurrencyProvider>
}

