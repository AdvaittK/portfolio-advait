export type HomeCaseStudy = {
  id: string
  clientLabel: string
  headline: string
  industryTags: string[]
  problem: string
  approach: string[]
  outcomes: string[]
  quote?: string
  quoteAttribution?: string
}

export const homeCaseStudies: HomeCaseStudy[] = [
  {
    id: "crevo-studio",
    clientLabel: "Crevo Studio",
    headline: "Premium agency presence built to sell packaging work",
    industryTags: ["Agency", "Creator economy", "Conversion"],
    problem:
      "They needed a site that felt as sharp as their creative output, and made the offer obvious to busy creators browsing on mobile.",
    approach: [
      "Defined a clear hierarchy: what they do, proof, and next step.",
      "Designed a bold, minimal visual language aligned with their brand.",
      "Structured pages for audits, FAQs, and booking without clutter.",
    ],
    outcomes: [
      "A polished, high-trust first impression that matches a premium studio.",
      "Conversion-oriented layout with obvious paths to book or enquire.",
      "Fast, responsive experience tuned for thumb-first traffic.",
    ],
    quote:
      "Advait nailed the premium look we wanted and built a site that clearly sells the offer. The flow is clean, the details are sharp, and it feels engineered for conversions.",
    quoteAttribution: "Kashyap Dwivedi, Owner, Crevo Studio",
  },
  {
    id: "asoka-ferrocast",
    clientLabel: "Asoka Ferrocast",
    headline: "Corporate credibility for industrial buyers",
    industryTags: ["Industrial", "B2B", "Corporate"],
    problem:
      "A legacy distributor needed a digital presence that communicated scale, reliability, and technical depth, without feeling dated.",
    approach: [
      "Balanced legacy storytelling with modern layout and typography.",
      "Clarified capabilities and sectors for infrastructure-minded buyers.",
      "Built a calm, authoritative visual system that scales as content grows.",
    ],
    outcomes: [
      "Clear positioning for industrial and infrastructure stakeholders.",
      "Trust-forward presentation that supports long sales conversations.",
      "Navigation and content structure that make complex offerings legible.",
    ],
    quote:
      "The website feels clean, professional, and true to our brand. It makes our work easy to understand and gives us a strong online presence.",
    quoteAttribution: "Management Team, Asoka Ferrocast",
  },
  {
    id: "cult-of-content-agency",
    clientLabel: "Cult of Content",
    headline: "Content-led growth, framed for ambitious brands",
    industryTags: ["Agency", "D2C", "Organic growth"],
    problem:
      "A multi-site growth agency needed polished marketing surfaces that felt cohesive, professional, and easy to trust.",
    approach: [
      "Aligned tone and layout with authority-building positioning.",
      "Structured services and proof so visitors see outcomes, not jargon.",
      "Shipped performant builds that stay easy to iterate on.",
    ],
    outcomes: [
      "Consistent premium feel across related brand properties.",
      "Clear messaging funnel for coaches, creators, and D2C teams.",
      "Solid technical foundation for ongoing marketing iteration.",
    ],
    quote:
      "Advait kept it simple and polished for both Cult of Content sites. The process was smooth, and the final result feels right for our brand.",
    quoteAttribution: "Pulak Pathak, Founder, Cult of Content",
  },
  {
    id: "uvoka-website",
    clientLabel: "UVOKA",
    headline: "LinkedIn-first agency site with motion and clarity",
    industryTags: ["Agency", "Personal branding", "B2B services"],
    problem:
      "A LinkedIn personal-branding agency needed a modern marketing site that felt premium and explained services fast.",
    approach: [
      "Built smooth, intentional motion that supports, not distracts from, the story.",
      "Highlighted services, proof, and contact paths in a tight narrative.",
      "Kept performance and readability ahead of visual effects.",
    ],
    outcomes: [
      "A responsive flagship site that reflects serious brand strategy work.",
      "Balanced storytelling and proof for high-intent visitors.",
      "Polished experience from first scroll to enquiry.",
    ],
  },
  {
    id: "shweta-mishra-quantum-manifestation",
    clientLabel: "Shweta Mishra",
    headline: "Coaching brand site focused on warmth and trust",
    industryTags: ["Coaching", "Wellness", "Personal brand"],
    problem:
      "A coach needed a site that builds credibility quickly while staying approachable and calm.",
    approach: [
      "Designed a soft, professional palette with clear typographic rhythm.",
      "Structured the journey toward consultation or contact with minimal friction.",
      "Optimized for mobile, accessibility, and future content expansion.",
    ],
    outcomes: [
      "Clear brand positioning with calm, confidence-building visuals.",
      "Strong trust cues for a high-touch coaching offer.",
      "Lean structure that can grow with programs and resources.",
    ],
    quote:
      "The website looks perfect and came out beautifully. I’m really happy with the result. Thank you!",
    quoteAttribution: "Shweta Mishra, Quantum Manifestation Coach",
  },
  {
    id: "oriental-air-ship-services",
    clientLabel: "Oriental Air & Ship Services",
    headline: "Logistics legacy made legible online",
    industryTags: ["Logistics", "Enterprise", "Services"],
    problem:
      "A 40+ year logistics brand needed a contemporary site that still felt trustworthy to government and enterprise partners.",
    approach: [
      "Emphasized reliability, scope of services, and ease of navigation.",
      "Used restrained layout systems suited to formal procurement audiences.",
      "Ensured clarity for dense service categories and contact flows.",
    ],
    outcomes: [
      "Professional first touch for PSU, government, and B2B stakeholders.",
      "Service breadth communicated without overwhelming visitors.",
      "Responsive, accessible UI aligned with enterprise expectations.",
    ],
    quote:
      "Advait did an amazing job creating Oriental's website! He really captured the professionalism and trust we've built over 40 years in logistics.",
    quoteAttribution: "Management, Oriental Air & Ship Services",
  },
]
