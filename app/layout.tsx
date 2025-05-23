import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CustomCursor from "@/components/custom-cursor"
import LoadingScreen from "@/components/loading-screen"
import TransitionOverlay from "@/components/transition-overlay"
import ClientLayout from "@/components/client-layout"
import ClientMetallicBg from "@/components/ui/client-metallic-bg"
import { Analytics } from "@vercel/analytics/next"
import { CurrencyProvider } from "@/lib/currency-provider"
  
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Advait | Developer Portfolio",
  keywords: ["Advait", "Full Stack Developer", "Portfolio", "Full Stack Developer", "UI Designer"],
  description: "Full Stack Developer & UI Designer",
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
  manifest: "/site.webmanifest"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:title" content="Advait | Developer Portfolio" />
        <meta property="og:description" content="Full Stack Developer & UI Designer. Crafting modern, high-performance web experiences. See my work and get in touch!" />
        <meta property="og:image" content="https://www.advaitt.tech/new_homepage.png" />
        <meta property="og:url" content="https://www.advaitt.tech/" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Advait | Developer Portfolio" />
        <meta name="twitter:description" content="Full Stack Developer & UI Designer. Crafting modern, high-performance web experiences. See my work and get in touch!" />
        <meta name="twitter:image" content="https://www.advaitt.tech/new_homepage.png" />
      </head>
      <body className={`${inter.className} min-h-screen bg-transparent antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CurrencyProvider>
            <ClientMetallicBg />
            <div className="relative flex flex-col min-h-screen">
              <LoadingScreen />
              <TransitionOverlay />
              <Header />
              <main className="flex-grow">
                <ClientLayout>
                  {children}
                </ClientLayout>
              </main>
              <Footer />
              <CustomCursor />
              <Analytics />
            </div>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
