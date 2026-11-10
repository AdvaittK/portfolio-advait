import type { Metadata } from "next"
import localFont from "next/font/local"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ClientLayout from "@/components/client-layout"
import ClientCursor from "@/components/client-cursor"
import ClientMetallicBg from "@/components/ui/client-metallic-bg"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CurrencyProvider } from "@/lib/currency-provider"
import { SITE_URL } from "@/lib/blog-config"
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

// Geist Sans - Secondary font for body text
// Already provides --font-geist-sans variable

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Advait | Developer for Agencies and Brands",
    template: "%s | Advait"
  },
  description: "I build fast, clear websites for agencies, coaches and industrial brands, working with clients worldwide.",
  authors: [{ name: "Advait", url: SITE_URL }],
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
    canonical: SITE_URL
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Advait | Developer for Agencies and Brands',
    title: 'Advait | Developer for Agencies and Brands',
    description: "I build fast, clear websites for agencies, coaches and industrial brands, working with clients worldwide.",
    images: [
      {
        url: `${SITE_URL}/homepage.webp`,
        width: 1200,
        height: 630,
        alt: 'Advait - Developer for Agencies and Brands',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advait | Developer for Agencies and Brands',
    description: "I build fast, clear websites for agencies, coaches and industrial brands, working with clients worldwide.",
    images: [`${SITE_URL}/homepage.webp`],
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
      <head suppressHydrationWarning>
        {/* Minimal Critical CSS for above-the-fold hero stability */}
        <style
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
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

        {/* Structured Data - ProfessionalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Advait",
              "image": `${SITE_URL}/assets/people/advait.webp`,
              "url": SITE_URL,
              "email": "advaitt.dev@gmail.com",
              "sameAs": [
                "https://github.com/AdvaittK",
                "https://x.com/advaittt_dev"
              ],
              "areaServed": "Worldwide",
              "description": "I build fast, clear websites for agencies, coaches and industrial brands."
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
              "url": SITE_URL,
              "image": `${SITE_URL}/assets/people/advait.webp`,
              "email": "advaitt.dev@gmail.com",
              "sameAs": [
                "https://github.com/AdvaittK",
                "https://x.com/advaittt_dev"
              ],
              "jobTitle": "Developer",
              "areaServed": "Worldwide"
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
              "url": SITE_URL,
              "description": "Professional portfolio of Advait, a full stack developer specializing in React, Node.js, and modern web technologies",
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${SITE_URL}/projects?search={search_term_string}`,
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
        <ThemeProvider>
          <CurrencyProvider>
            <SmoothScrollProvider>
              <ClientMetallicBg />
              <ClientCursor />
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
