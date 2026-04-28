"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Check,
  Layers,
  Cpu,
  Rocket,
  ShieldCheck,
  Gauge,
  Smartphone,
  Search,
  HeartHandshake,
  Code2,
  Plus,
  Minus,
  MessageCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Price } from "@/components/ui/price"
import { PageContainer } from "@/components/layout/page-container"
import { ShimmerBadge } from "@/components/ui/shimmer-badge"
import { CostEstimator } from "@/components/ui/cost-estimator"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
}

type Tier = {
  id: "starter" | "pro" | "custom"
  name: string
  tagline: string
  bestFor: string
  inr: number | null
  usd: number | null
  priceLabel?: string
  priceSuffix?: string
  highlight?: boolean
  icon: typeof Rocket
  cta: { label: string; href: string }
  features: string[]
}

const tiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "A polished online presence that makes the right first impression.",
    bestFor: "Solo founders, freelancers & small businesses",
    inr: 9999,
    usd: 249,
    priceSuffix: "one-time",
    icon: Rocket,
    cta: { label: "Get Started", href: "/contact" },
    features: [
      "Custom-coded high-converting landing page",
      "Hero, services, about, testimonials & contact sections",
      "Privacy Policy page",
      "Terms & Conditions page",
      "Mobile-first responsive design",
      "On-page SEO basics (meta, OG, sitemap)",
      "Contact form with email forwarding",
      "Performance & accessibility tuned",
      "1 round of revisions",
      "Delivery in 7–10 days",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "A complete, brand-aligned website built to scale with your business.",
    bestFor: "Growing brands, agencies & service businesses",
    inr: 19999,
    usd: 599,
    priceSuffix: "onwards",
    highlight: true,
    icon: Layers,
    cta: { label: "Start Pro Project", href: "/contact" },
    features: [
      "8–9 fully designed, custom pages",
      "Bespoke UI tailored to your brand identity",
      "Advanced animations & micro-interactions",
      "Blog, portfolio or services listing module",
      "Newsletter & advanced contact form integration",
      "On-page SEO, schema & analytics setup",
      "CMS-friendly content sections (where applicable)",
      "Performance, accessibility & Core Web Vitals tuning",
      "2 rounds of revisions",
      "Delivery in 3–4 weeks",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    tagline: "Full-stack apps, dashboards & complex platforms — scoped to fit.",
    bestFor: "Startups & teams shipping real products",
    inr: null,
    usd: null,
    priceLabel: "Let's talk",
    icon: Cpu,
    cta: { label: "Book a Discovery Call", href: "/contact" },
    features: [
      "Authentication, dashboards & admin panels",
      "Custom APIs and database design",
      "Payments (Stripe / Razorpay) & 3rd-party integrations",
      "Real-time features (websockets, webhooks, queues)",
      "Scalable cloud architecture & deployment",
      "CI/CD pipeline + staging environments",
      "Iterative sprints with weekly demos",
      "Dedicated post-launch support window",
      "Tailored timeline & milestone-based pricing",
      "Scope and quote finalised on a quick call",
    ],
  },
]

const tierStyles = {
  iconBg:
    "bg-gradient-to-br from-zinc-200 to-zinc-100 dark:from-zinc-700 dark:to-zinc-800",
  iconRing: "ring-zinc-300/60 dark:ring-zinc-600/50",
  check: "text-zinc-800 dark:text-zinc-200",
  glow: "from-zinc-200/40 via-transparent to-zinc-200/40 dark:from-zinc-700/40 dark:to-zinc-700/40",
  chip:
    "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-700/70",
}

const trustItems = [
  {
    icon: Code2,
    title: "Custom-coded",
    description: "No templates. Every site is built from scratch for you.",
  },
  {
    icon: Gauge,
    title: "Lightning fast",
    description: "Tuned for Core Web Vitals and a buttery user experience.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    description: "Pixel-perfect across phones, tablets and desktops.",
  },
  {
    icon: Search,
    title: "SEO ready",
    description: "Semantic markup, meta tags, sitemap and OG out of the box.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description: "SSL, sane headers and protected forms with spam filtering.",
  },
  {
    icon: HeartHandshake,
    title: "Ongoing support",
    description: "Bug fixes covered for 14 days post-launch, on the house.",
  },
]

const faqs = [
  {
    q: "Which plan should I pick?",
    a: "If you only need a clean online presence with a single landing page plus legal pages, go with Starter. If you need a full multi-page website with a brand-aligned design, Pro is the right fit. For full-stack products with auth, dashboards, payments or APIs, the Custom plan is scoped to fit on a quick call.",
  },
  {
    q: "What does the price actually include?",
    a: "Design, frontend development, deployment setup, on-page SEO and a clean handover. Hosting and domain costs are billed separately by the provider — I'll recommend the most cost-effective options for your stack.",
  },
  {
    q: "How does the timeline work?",
    a: "Timelines start once I have your brand assets and content. Starter typically ships in 7–10 days, Pro in 3–4 weeks, and Custom timelines are mapped out during the discovery call.",
  },
  {
    q: "What about revisions and changes?",
    a: "Starter includes 1 round of revisions and Pro includes 2. Anything beyond that is billed at a fair hourly rate. Custom projects run in iterative sprints, so revisions are baked into the workflow.",
  },
  {
    q: "How do payments work?",
    a: "Milestone-based: 40% to start, 30% at the main milestone, and 30% on final delivery. For Custom projects we structure it around sprints. All payments are securely invoiced.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Yes — basic post-launch fixes are free for 14 days. After that you can opt into a monthly maintenance plan for updates, monitoring and small enhancements.",
  },
]

function FaqItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string
  a: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-sm overflow-hidden transition-colors hover:border-zinc-300 dark:hover:border-zinc-700">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-medium text-zinc-800 dark:text-zinc-100">
          {q}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full grid place-items-center border border-zinc-200 dark:border-zinc-700 transition-colors ${
            isOpen
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "bg-zinc-50 text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300"
          }`}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <PageContainer>
      <div className="relative">
        {/* Ambient background blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 -z-10 flex justify-center overflow-hidden"
        >
          <div className="h-[420px] w-[820px] max-w-[90vw] rounded-full bg-gradient-to-br from-zinc-300/50 via-zinc-200/30 to-zinc-300/50 dark:from-zinc-500/10 dark:via-zinc-400/5 dark:to-zinc-500/10 blur-3xl" />
        </div>

        <motion.div
          className="container mx-auto px-2 sm:px-6 py-12 md:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Hero */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-14 md:mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <ShimmerBadge text="Pricing" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-5 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-300 dark:to-white"
            >
              Simple, honest pricing.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
            >
              Three clear tiers — from a focused online presence to a fully
              custom full-stack platform. Pick what fits today, scale when
              you&apos;re ready.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-6 inline-flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500"
            >
              <span>Hosting &amp; domain billed separately by the provider</span>
            </motion.div>
          </motion.div>

          {/* Pricing tiers */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-24 md:mb-32 items-stretch"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {tiers.map((tier) => {
              const TierIcon = tier.icon
              const isPro = tier.highlight

              return (
                <motion.div
                  key={tier.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 200, damping: 22 }}
                  className={`group relative flex flex-col rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-2xl ${
                    isPro
                      ? "lg:-my-2 ring-2 ring-zinc-900/70 dark:ring-zinc-100/40 bg-white/90 dark:bg-zinc-900/80"
                      : "ring-1 ring-zinc-200/70 dark:ring-zinc-800/70 bg-white/70 dark:bg-zinc-900/50"
                  }`}
                >
                  {/* Accent glow on hover */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tierStyles.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative p-7 sm:p-8 flex flex-col flex-1">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className={`w-11 h-11 rounded-xl grid place-items-center ring-1 ${tierStyles.iconBg} ${tierStyles.iconRing}`}
                      >
                        <TierIcon className="w-5 h-5 text-zinc-800 dark:text-zinc-100" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                          {tier.name}
                        </h3>
                        <span
                          className={`inline-flex items-center mt-2 px-2.5 py-1 rounded-full text-[11px] font-medium leading-snug ${tierStyles.chip}`}
                        >
                          {tier.bestFor}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed min-h-[3rem]">
                      {tier.tagline}
                    </p>

                    {/* Price */}
                    <div className="mt-6 mb-6 flex items-end gap-2">
                      {tier.inr !== null && tier.usd !== null ? (
                        <Price
                          inr={tier.inr}
                          usd={tier.usd}
                          suffix={tier.priceSuffix ?? "onwards"}
                        />
                      ) : (
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                            {tier.priceLabel}
                          </span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            quoted on a discovery call
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700/70 to-transparent mb-6" />

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
                        >
                          <span
                            className={`flex-shrink-0 mt-0.5 w-4 h-4 rounded-full grid place-items-center ${tierStyles.check}`}
                          >
                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                          </span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Link href={tier.cta.href} className="block">
                        <Button
                          className={`w-full rounded-full px-6 py-6 text-sm font-semibold shadow-lg transition-all duration-300 ${
                            isPro
                              ? "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 shadow-zinc-900/20 dark:shadow-white/10"
                              : tier.id === "custom"
                                ? "bg-transparent border border-zinc-300 hover:bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:text-zinc-100"
                                : "bg-gradient-to-r from-zinc-800 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 dark:from-zinc-100 dark:to-zinc-300 dark:hover:from-zinc-50 dark:hover:to-zinc-200 text-white dark:text-zinc-900"
                          }`}
                        >
                          {tier.id === "custom" ? (
                            <MessageCircle className="w-4 h-4 mr-2" />
                          ) : null}
                          {tier.cta.label}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Website cost estimator */}
          <CostEstimator ctaHref="/contact" />

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto mb-24 md:mb-32"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
                Every project ships with these as standard
              </h2>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                No matter which plan you pick, the foundations stay the same.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {trustItems.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="group relative rounded-2xl p-5 border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg grid place-items-center bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200/70 dark:border-zinc-700/70">
                        <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto mb-24"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
                Frequently asked
              </h2>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400">
                Quick answers to the things people usually ask before booking.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <FaqItem
                  key={faq.q}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openFaq === idx}
                  onToggle={() => setOpenFaq(openFaq === idx ? null : idx)}
                />
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="relative overflow-hidden rounded-3xl border border-zinc-200/70 dark:border-zinc-800/70 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-900/80 dark:to-zinc-900 p-8 sm:p-12 text-center">
              <div
                aria-hidden
                className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-zinc-300/50 to-zinc-200/40 dark:from-zinc-500/15 dark:to-zinc-700/15 blur-3xl"
              />
              <div
                aria-hidden
                className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-zinc-200/40 to-zinc-300/40 dark:from-zinc-700/15 dark:to-zinc-500/15 blur-3xl"
              />

              <div className="relative">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
                  Not sure which one fits you?
                </h2>
                <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-8">
                  Tell me a bit about your project and I&apos;ll send back the
                  best-fit plan with a clear scope, timeline and quote — no
                  pressure, no fluff.
                </p>
                <Link href="/contact">
                  <Button className="rounded-full px-8 py-6 bg-gradient-to-r from-zinc-900 to-zinc-700 hover:from-zinc-800 hover:to-zinc-600 dark:from-white dark:to-zinc-200 dark:hover:from-zinc-100 dark:hover:to-zinc-300 text-white dark:text-zinc-900 text-sm font-semibold shadow-xl">
                    Start a Conversation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageContainer>
  )
}
