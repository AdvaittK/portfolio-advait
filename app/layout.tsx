import type { Metadata } from "next"
import localFont from "next/font/local"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CustomCursor from "@/components/custom-cursor"
import ClientLayout from "@/components/client-layout"
import ClientMetallicBg from "@/components/ui/client-metallic-bg"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CurrencyProvider } from "@/lib/currency-provider"
import AOSProvider from "@/components/aos-provider"
import ServiceWorkerRegister from "@/components/service-worker-register"
import SmoothScrollProvider from "@/components/smooth-scroll-provider"

// DM Sans Variable - Primary font for headings (from local files)
const dmSans = localFont({
  src: [
    {
      path: "../public/fonts/DMSans-VariableFont_opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/DMSans-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
})

// Geist Sans - Secondary font for body text (Vercel's premium font)
// Already provides --font-geist-sans variable

export const metadata: Metadata = {
  metadataBase: new URL('https://www.advaitt.tech'),
  title: {
    default: "Advait | Developer Portfolio",
    template: "%s | Advait"
  },
  description: "Crafting performant web apps, clean UIs, and delightful user experiences. Full‑stack JavaScript with React, Next.js, and Node.js.",
  keywords: [
    // Core Services
    "full stack developer for hire",
    "full stack freelancer",
    "freelance full stack developer",
    "hire full stack developer India",
    "remote full stack developer",
    "full stack web developer for hire",
    "web app developer for hire",
    "freelance web developer India",
    "full stack developer India",
    "web app development freelancer",

    // Technology Stack
    "React developer for hire",
    "Node.js developer for hire",
    "MERN stack developer",
    "React Node developer",
    "JavaScript full stack developer",
    "API developer for hire",
    "frontend developer React freelancer",
    "backend developer Node.js freelancer",
    "Next.js developer",
    "TypeScript developer",

    // Specializations
    "custom web application development freelancer",
    "full stack developer for startups",
    "startup web app developer",
    "SaaS product developer",
    "SaaS MVP React Node developer",
    "MVP developer for startups",
    "web development for startups",
    "hire developer for startup",
    "remote dev for SaaS startup",

    // Industry Solutions
    "e-commerce web app developer freelancer",
    "agency web developer freelancer",
    "hire web developer quickly",
    "part-time web developer for hire",
    "affordable full stack developer",
    "freelance full stack developer affordable",

    // Technical Services
    "web app performance optimization developer",
    "page speed optimization React developer",
    "UI/UX developer for hire full stack",
    "API integration freelance developer",
    "bug fixing full stack developer for hire",
    "hire web developer contract",

    // Location-Based
    "hire full stack freelancer remote",
    "freelance full stack developer India",
    "hire full stack developer quickly",
    "React developer India",
    "Node.js developer India",
    "Pune full stack developer",
    "web developer Pune",
    "freelance web developer Pune",
    "React developer Pune",
    "Node.js developer Pune",
    "full stack developer Pune",
    "hire web developer Pune",
    "remote full stack developer India",

    // Personal Branding
    "Advait Kandalgaonkar",
    "Advait developer",
    "Advait web developer",
    "Advait full stack",

    // Additional Technical Skills
    "MongoDB developer",
    "PostgreSQL developer",
    "Express.js developer",
    "REST API development",
    "GraphQL developer",
    "responsive web design",
    "progressive web apps",
    "PWA developer",
    "modern web development",
    "frontend backend developer"
  ],
  authors: [{ name: "Advait", url: "https://www.advaitt.tech" }],
  creator: "Advait",
  publisher: "Advait",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://www.advaitt.tech"
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.advaitt.tech/',
    siteName: 'Advait | Developer Portfolio',
    title: 'Advait | Developer Portfolio',
    description: 'Crafting performant web apps, clean UIs, and delightful user experiences. Full‑stack JavaScript with React, Next.js, and Node.js.',
    images: [
      {
        url: 'https://www.advaitt.tech/new_homepage.png',
        width: 1200,
        height: 630,
        alt: 'Advait - Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advait | Developer Portfolio',
    description: 'Crafting performant web apps, clean UIs, and delightful user experiences. Full‑stack JavaScript with React, Next.js, and Node.js.',
    images: ['https://www.advaitt.tech/new_homepage.png'],
    creator: '@advaittt_dev',
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon-16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/favicon-32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicon-48.png",
        type: "image/png",
        sizes: "48x48",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      }
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      }
    ]
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Minimal Critical CSS for above-the-fold hero stability */}
        <style dangerouslySetInnerHTML={{
          __html: `
          /* Reserve space for hero section to avoid CLS */
          .hero-critical { min-height: 85vh; }
          @media (min-width: 768px) { .hero-critical { min-height: 72vh; } }
          /* Basic gradient placeholders */
          .skeleton-gradient { position: relative; border-radius: 16px; overflow: hidden; }
          .skeleton-gradient::before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(200,200,200,0.3), rgba(220,220,220,0.5), rgba(200,200,200,0.3)); animation: pulse 1.6s ease-in-out infinite; }
          @keyframes pulse { 0% { transform: translateX(-30%); } 50% { transform: translateX(30%); } 100% { transform: translateX(-30%); } }
        `}} />
        {/* Font Preload for Performance */}
        <link
          rel="preload"
          href="/fonts/DMSans-VariableFont_opsz,wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/DMSans-Italic-VariableFont_opsz,wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch and Preconnect for External Resources */}
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link rel="preconnect" href="https://vercel.live" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" crossOrigin="anonymous" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Pune" />
        <meta name="geo.position" content="18.5204;73.8567" />
        <meta name="ICBM" content="18.5204, 73.8567" />
        <link rel="canonical" href="https://www.advaitt.tech/" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Advait - Full Stack Developer",
              "image": "https://www.advaitt.tech/assets/people/advait.webp",
              "url": "https://www.advaitt.tech",
              "telephone": "+919975556093",
              "email": "advaitt.dev@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pune",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 18.5204,
                "longitude": 73.8567
              },
              "sameAs": [
                "https://github.com/AdvaittK",
                "https://x.com/advaittt_dev",
                "https://discord.gg/zQ8gwDK9Zr"
              ],
              "priceRange": "$$",
              "openingHours": "Mo-Su 00:00-24:00",
              "description": "Professional full stack web development services specializing in React, Node.js, and MERN stack. Custom web applications, SaaS MVPs, and startup solutions.",
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 18.5204,
                  "longitude": 73.8567
                },
                "geoRadius": "100000"
              }
            })
          }}
        />

        {/* Structured Data - Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Advait",
              "url": "https://www.advaitt.tech",
              "image": "https://www.advaitt.tech/assets/people/advait.webp",
              "sameAs": [
                "https://github.com/AdvaittK",
                "https://x.com/advaittt_dev",
                "https://discord.gg/zQ8gwDK9Zr"
              ],
              "jobTitle": "Full Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pune",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              },
              "email": "advaitt.dev@gmail.com",
              "telephone": "+919975556093",
              "knowsAbout": [
                "React",
                "Node.js",
                "JavaScript",
                "TypeScript",
                "Next.js",
                "MongoDB",
                "PostgreSQL",
                "Full Stack Development",
                "Web Development",
                "UI/UX Design",
                "MERN Stack",
                "API Development",
                "Frontend Development",
                "Backend Development"
              ],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Certified IT Specialist"
              }
            })
          }}
        />

        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Advait - Full Stack Developer Portfolio",
              "url": "https://www.advaitt.tech",
              "description": "Professional portfolio of Advait, a full stack developer specializing in React, Node.js, and modern web technologies",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.advaitt.tech/projects?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Structured Data - Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Full Stack Web Development",
              "provider": {
                "@type": "Person",
                "name": "Advait"
              },
              "areaServed": {
                "@type": "Country",
                "name": "India"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Web Development Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Full Stack Development",
                      "description": "End-to-end web application development using React, Node.js, and modern technologies"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Frontend Development",
                      "description": "React and Next.js frontend development with responsive design"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Backend Development",
                      "description": "Node.js backend development with API design and database management"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${GeistSans.variable} font-body min-h-screen bg-transparent antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CurrencyProvider>
            <SmoothScrollProvider>
              <ClientMetallicBg />
              <CustomCursor />
              <ServiceWorkerRegister />
              <AOSProvider>
                <div className="relative flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow">
                    <ClientLayout>
                      {children}
                    </ClientLayout>
                  </main>
                  <Footer />
                  <Analytics />
                  <SpeedInsights />
                </div>
              </AOSProvider>
            </SmoothScrollProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
