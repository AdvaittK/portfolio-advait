"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { animate, motion, useMotionValue } from "framer-motion"
import {
  ArrowRight,
  Calculator,
  Check,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ShimmerBadge } from "@/components/ui/shimmer-badge"
import { useCurrency } from "@/lib/currency-provider"
import { cn } from "@/lib/utils"

/* =====================================================================
 * Tweak everything from here — base prices, per-page cost, feature costs,
 * timeline multiplier and the spread of the displayed range.
 * ===================================================================== */
type WebsiteType = "portfolio" | "business" | "ecommerce" | "customApp"
type FeatureId = "animations" | "cms" | "seo" | "payments" | "advancedUx"
type TimelineId = "standard" | "fastTrack"
type Money = { inr: number; usd: number }

const ESTIMATOR_CONFIG: {
  basePrices: Record<WebsiteType, Money>
  perPageAfter: number
  perPagePrice: Money
  features: Record<FeatureId, Money>
  timelineMultiplier: Record<TimelineId, number>
  rangeSpread: number
  roundTo: Money
} = {
  // Calibrated against the Starter (₹9,999) and Pro (₹19,999 onwards) tiers.
  // Portfolio 1 page  → ~₹9,000–11,000 (Starter)
  // Business 8–9 pgs + animations + CMS + SEO → ~₹17,000–21,000 (Pro)
  // Business 10–12 pgs + animations + SEO + Advanced UI/UX → ~₹19,000–25,000
  basePrices: {
    portfolio: { inr: 10000, usd: 189 },
    business: { inr: 14000, usd: 279 },
    ecommerce: { inr: 25000, usd: 549 },
    customApp: { inr: 50000, usd: 1099 },
  },
  perPageAfter: 5,
  perPagePrice: { inr: 500, usd: 19 },
  features: {
    animations: { inr: 1500, usd: 39 },
    cms: { inr: 2000, usd: 59 },
    seo: { inr: 1000, usd: 25 },
    payments: { inr: 3000, usd: 99 },
    advancedUx: { inr: 2000, usd: 59 },
  },
  timelineMultiplier: {
    standard: 1,
    fastTrack: 1.25,
  },
  rangeSpread: 0.12,
  roundTo: { inr: 1000, usd: 10 },
}

const WEBSITE_TYPES: { id: WebsiteType; label: string; sub: string }[] = [
  { id: "portfolio", label: "Portfolio", sub: "Personal & creative" },
  { id: "business", label: "Business", sub: "Small to mid teams" },
  { id: "ecommerce", label: "E-commerce", sub: "Online stores" },
  { id: "customApp", label: "Custom Web App", sub: "Full-stack platforms" },
]

const FEATURES: { id: FeatureId; label: string }[] = [
  { id: "animations", label: "Animations" },
  { id: "cms", label: "CMS / Blog" },
  { id: "seo", label: "SEO Setup" },
  { id: "payments", label: "Payment Integration" },
  { id: "advancedUx", label: "Advanced UI/UX" },
]

const TIMELINES: {
  id: TimelineId
  label: string
  sub: string
  icon: typeof Clock
}[] = [
  { id: "standard", label: "Standard", sub: "Comfortable pace", icon: Clock },
  { id: "fastTrack", label: "Fast Track", sub: "Priority delivery", icon: Zap },
]

/* ---------- helpers ---------- */
function calculateEstimate({
  pages,
  websiteType,
  features,
  timeline,
  currency,
}: {
  pages: number
  websiteType: WebsiteType
  features: Set<FeatureId>
  timeline: TimelineId
  currency: "INR" | "USD"
}) {
  const cfg = ESTIMATOR_CONFIG
  const key = currency === "INR" ? "inr" : "usd"

  const base = cfg.basePrices[websiteType][key]
  const extraPages = Math.max(0, pages - cfg.perPageAfter)
  const pageCost = extraPages * cfg.perPagePrice[key]
  const featureCost = Array.from(features).reduce(
    (sum, f) => sum + cfg.features[f][key],
    0,
  )

  const subtotal =
    (base + pageCost + featureCost) * cfg.timelineMultiplier[timeline]

  const step = cfg.roundTo[key]
  const round = (n: number) => Math.round(n / step) * step

  return {
    low: round(subtotal * (1 - cfg.rangeSpread)),
    high: round(subtotal * (1 + cfg.rangeSpread)),
  }
}

function formatMoney(amount: number, currency: "INR" | "USD") {
  const symbol = currency === "INR" ? "₹" : "$"
  return `${symbol}${amount.toLocaleString()}`
}

/* ---------- animated number (smooth count) ---------- */
function AnimatedNumber({
  value,
  currency,
}: {
  value: number
  currency: "INR" | "USD"
}) {
  const [display, setDisplay] = useState(value)
  const motionValue = useMotionValue(value)

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [value, motionValue])

  return <span>{formatMoney(display, currency)}</span>
}

/* ---------- pages slider ---------- */
function PagesSlider({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  return (
    <SliderPrimitive.Root
      className="relative flex w-full touch-none select-none items-center h-6"
      value={[value]}
      min={1}
      max={20}
      step={1}
      onValueChange={(vals) => onChange(vals[0])}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-zinc-700 to-zinc-900 dark:from-zinc-300 dark:to-zinc-100" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label="Number of pages"
        className="block h-5 w-5 rounded-full border-2 border-zinc-900 bg-white shadow-lg shadow-zinc-900/15 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:border-zinc-100 dark:bg-zinc-900 dark:focus-visible:ring-zinc-500"
      />
    </SliderPrimitive.Root>
  )
}

/* ---------- small layout helpers ---------- */
function FieldGroup({
  label,
  hint,
  hintAccent,
  children,
}: {
  label: string
  hint?: string
  hintAccent?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
        {hint && (
          <span
            className={cn(
              "text-xs",
              hintAccent
                ? "tabular-nums font-medium text-zinc-800 dark:text-zinc-200"
                : "text-zinc-500 dark:text-zinc-500",
            )}
          >
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

function PillOption({
  selected,
  onClick,
  title,
  sub,
}: {
  selected: boolean
  onClick: () => void
  title: string
  sub: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group relative rounded-xl border px-3 py-3 text-left transition-all duration-200",
        selected
          ? "border-zinc-900 bg-zinc-900 text-white shadow-sm dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
          : "border-zinc-200 bg-white/70 text-zinc-700 hover:-translate-y-0.5 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300 dark:hover:border-zinc-600",
      )}
    >
      <div className="text-sm font-semibold leading-tight">{title}</div>
      <div
        className={cn(
          "mt-0.5 text-[11px] leading-tight",
          selected ? "opacity-80" : "text-zinc-500 dark:text-zinc-500",
        )}
      >
        {sub}
      </div>
    </button>
  )
}

/* =====================================================================
 *  Main component
 * ===================================================================== */
export function CostEstimator({
  ctaHref = "/contact",
}: {
  ctaHref?: string
}) {
  const { currency } = useCurrency()

  const [pages, setPages] = useState(5)
  const [websiteType, setWebsiteType] = useState<WebsiteType>("business")
  const [features, setFeatures] = useState<Set<FeatureId>>(() => new Set())
  const [timeline, setTimeline] = useState<TimelineId>("standard")

  const toggleFeature = (id: FeatureId) => {
    setFeatures((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const { low, high } = useMemo(
    () =>
      calculateEstimate({
        pages,
        websiteType,
        features,
        timeline,
        currency,
      }),
    [pages, websiteType, features, timeline, currency],
  )

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto mb-24 md:mb-32"
    >
      {/* heading */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-5">
          <ShimmerBadge text="Estimate" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
          Website cost estimator
        </h2>
        <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          Tweak the inputs below for a quick ballpark range. The exact quote is
          finalised after a brief audit of your project.
        </p>
      </div>

      {/* card */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-sm p-5 sm:p-8 lg:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-zinc-200/50 to-zinc-100/30 blur-3xl dark:from-zinc-700/20 dark:to-zinc-800/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-zinc-200/40 to-zinc-100/20 blur-3xl dark:from-zinc-700/15 dark:to-zinc-800/10"
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* INPUTS */}
          <div className="space-y-8 lg:col-span-3">
            <FieldGroup label="Website type" hint="Closest to what you’re building">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {WEBSITE_TYPES.map((t) => (
                  <PillOption
                    key={t.id}
                    selected={websiteType === t.id}
                    onClick={() => setWebsiteType(t.id)}
                    title={t.label}
                    sub={t.sub}
                  />
                ))}
              </div>
            </FieldGroup>

            <FieldGroup
              label="Number of pages"
              hint={`${pages} ${pages === 1 ? "page" : "pages"}`}
              hintAccent
            >
              <div className="px-1">
                <PagesSlider value={pages} onChange={setPages} />
                <div className="mt-2 flex justify-between text-[11px] text-zinc-500 dark:text-zinc-500">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                  <span>20</span>
                </div>
              </div>
            </FieldGroup>

            <FieldGroup label="Features" hint="Pick everything that applies">
              <div className="flex flex-wrap gap-2">
                {FEATURES.map((f) => {
                  const selected = features.has(f.id)
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => toggleFeature(f.id)}
                      aria-pressed={selected}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-200",
                        selected
                          ? "border-zinc-900 bg-zinc-900 text-white shadow-sm dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                          : "border-zinc-200 bg-white/70 text-zinc-700 hover:-translate-y-0.5 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300 dark:hover:border-zinc-600",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-full border transition-colors",
                          selected
                            ? "border-white bg-white dark:border-zinc-900 dark:bg-zinc-900"
                            : "border-zinc-300 dark:border-zinc-600",
                        )}
                      >
                        {selected && (
                          <Check
                            className="h-3 w-3 text-zinc-900 dark:text-zinc-100"
                            strokeWidth={3}
                          />
                        )}
                      </span>
                      {f.label}
                    </button>
                  )
                })}
              </div>
            </FieldGroup>

            <FieldGroup label="Timeline" hint="How quickly you need it">
              <div className="grid grid-cols-2 gap-2">
                {TIMELINES.map((t) => {
                  const Icon = t.icon
                  const selected = timeline === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTimeline(t.id)}
                      aria-pressed={selected}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200",
                        selected
                          ? "border-zinc-900 bg-zinc-900 text-white shadow-sm dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                          : "border-zinc-200 bg-white/70 text-zinc-700 hover:-translate-y-0.5 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300 dark:hover:border-zinc-600",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-8 w-8 place-items-center rounded-lg transition-colors",
                          selected
                            ? "bg-white/15 dark:bg-zinc-900/15"
                            : "bg-zinc-100 group-hover:bg-zinc-200 dark:bg-zinc-800/70 dark:group-hover:bg-zinc-700",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold">{t.label}</span>
                        <span
                          className={cn(
                            "text-[11px]",
                            selected
                              ? "opacity-80"
                              : "text-zinc-500 dark:text-zinc-500",
                          )}
                        >
                          {t.sub}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </FieldGroup>
          </div>

          {/* RESULT */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-zinc-50/80 via-white/70 to-zinc-50/80 dark:from-zinc-900/80 dark:via-zinc-900/60 dark:to-zinc-900/80 p-6 sm:p-8 backdrop-blur-sm">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-zinc-300/60 to-transparent blur-2xl dark:from-zinc-600/20"
                />

                <div className="relative">
                  <div className="mb-4 inline-flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Estimated Cost
                    </span>
                  </div>

                  <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-3xl font-bold tracking-tight tabular-nums text-transparent dark:from-white dark:to-zinc-300 sm:text-4xl">
                      <AnimatedNumber value={low} currency={currency} />
                    </span>
                    <span className="text-2xl font-light text-zinc-400 dark:text-zinc-600 sm:text-3xl">
                      –
                    </span>
                    <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-3xl font-bold tracking-tight tabular-nums text-transparent dark:from-white dark:to-zinc-300 sm:text-4xl">
                      <AnimatedNumber value={high} currency={currency} />
                    </span>
                  </div>

                  <p className="mb-6 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    Final quote is provided after a detailed project audit.
                    Hosting &amp; domain are billed separately.
                  </p>

                  <Link href={ctaHref} className="block">
                    <Button className="w-full rounded-full bg-zinc-900 px-6 py-6 text-sm font-semibold text-white shadow-lg shadow-zinc-900/15 transition-all duration-300 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:shadow-white/10 dark:hover:bg-zinc-100">
                      Get Exact Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  <div className="mt-5 flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-500">
                    <span className="relative inline-flex h-1.5 w-1.5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60 dark:bg-emerald-400/60" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                    </span>
                    <span>Usually replied within 24 hours</span>
                  </div>
                </div>
              </div>

              {/* tiny meta line under card */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-500">
                <Sparkles className="h-3 w-3" />
                <span>Indicative range only • not a final quote</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
