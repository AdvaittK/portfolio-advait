"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Moon, Sun, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import LogoMark from "@/components/ui/logo-mark"
import Link from "next/link"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [prevPath, setPrevPath] = useState(pathname)
  const { scrollY } = useScroll()

  // Transform scroll position to opacity and blur values
  const headerOpacity = useTransform(scrollY, [0, 100], [0.7, 0.85])
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    [
      "rgba(255, 255, 255, 0.7)",
      "rgba(255, 255, 255, 0.85)"
    ]
  )
  const headerBackgroundDark = useTransform(
    scrollY,
    [0, 100],
    [
      "rgba(24, 24, 27, 0.7)",
      "rgba(24, 24, 27, 0.85)"
    ]
  )

  // Track path changes for animation direction
  useEffect(() => {
    setPrevPath(pathname)
  }, [pathname])

  // Only show theme toggle after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update background color after mount to prevent hydration mismatch
  useEffect(() => {
    const updateBackground = () => {
      const nav = document.querySelector('nav > div > div') as HTMLDivElement
      if (nav) {
        nav.style.backgroundColor = theme === 'dark' ? headerBackgroundDark.get() : headerBackground.get()
      }
    }

    const unsubscribe = scrollY.on('change', updateBackground)
    updateBackground() // Initial update

    return () => unsubscribe()
  }, [theme, headerBackground, headerBackgroundDark, scrollY])

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Determine animation direction based on path change
  const getAnimationDirection = () => {
    const paths = ["/", "/about", "/projects", "/skills", "/contact"]
    const currentIndex = paths.indexOf(pathname)
    const prevIndex = paths.indexOf(prevPath)
    return currentIndex > prevIndex ? 1 : -1
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.nav 
          key={pathname}
          className="fixed top-0 left-0 right-0 z-[9990] px-6 py-4"
          initial={{ 
            y: -100, 
            opacity: 0,
            x: getAnimationDirection() * 20
          }}
          animate={{ 
            y: 0, 
            opacity: 1,
            x: 0
          }}
          exit={{ 
            y: -100, 
            opacity: 0,
            x: -getAnimationDirection() * 20
          }}
          transition={{ 
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1],
            opacity: { duration: 0.3 }
          }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="rounded-3xl shadow-xl border border-zinc-200/30 dark:border-zinc-700/30 transition-all duration-300 backdrop-blur-md"
            >
              <div className="flex justify-between items-center px-8 py-5">
                {/* Logo with gradient effect */}
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-white dark:to-zinc-400 p-2.5 rounded-2xl shadow-sm">
                    <LogoMark className="w-7 h-7 text-white dark:text-zinc-900" />
                  </div>
                  <span className="ml-3 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-white dark:to-zinc-400">
                    Advait
                  </span>
                </motion.div>
                
                {/* Navigation items */}
                <ul className="hidden md:flex items-center gap-8">
                  {[
                    { name: "Home", href: "/" },
                    { name: "About", href: "/about" },
                    { name: "Projects", href: "/projects" },
                    { name: "Skills", href: "/skills" },
                    { name: "Contact", href: "/contact" }
                  ].map((item, index) => (
                    <motion.li 
                      key={item.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                    >
                      <Link 
                        href={item.href}
                        className={cn(
                          "relative px-4 py-2.5 text-base font-medium transition-all",
                          "text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                        )}
                      >
                        <span className="relative z-10">{item.name}</span>
                        <motion.span
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-zinc-200/80 to-zinc-300/50 dark:from-zinc-700/80 dark:to-zinc-800/50 -z-10"
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                        {pathname === item.href && (
                          <motion.div
                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-zinc-800/30 via-zinc-600/20 to-zinc-400/30 dark:from-zinc-200/30 dark:via-zinc-400/20 dark:to-zinc-600/30 -z-10"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ 
                              scale: [0.8, 1.2, 1],
                              opacity: [0, 0.8, 0.6],
                            }}
                            transition={{ 
                              duration: 0.6,
                              ease: "easeOut",
                              times: [0, 0.5, 1]
                            }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Right side controls */}
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {mounted && (
                    <button
                      onClick={toggleDarkMode}
                      className="p-3 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 transition-colors shadow-sm backdrop-blur-sm"
                      aria-label="Toggle dark mode"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={theme === "dark" ? "dark" : "light"}
                          initial={{ scale: 0.5, rotate: -30, opacity: 0 }}
                          animate={{ scale: 1, rotate: 0, opacity: 1 }}
                          exit={{ scale: 0.5, rotate: 30, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </motion.div>
                      </AnimatePresence>
                    </button>
                  )}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-3 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 transition-colors shadow-sm backdrop-blur-sm"
                    aria-label="Toggle mobile menu"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={mobileMenuOpen ? "open" : "closed"}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.nav>
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-0 right-0 z-40 px-6"
          >
            <div className="max-w-md mx-auto backdrop-blur-lg bg-white/90 dark:bg-zinc-900/90 rounded-2xl shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 overflow-hidden">
              <ul className="flex flex-col gap-2 p-4">
                {[
                  { name: "Home", href: "/" },
                  { name: "About", href: "/about" },
                  { name: "Projects", href: "/projects" },
                  { name: "Skills", href: "/skills" },
                  { name: "Contact", href: "/contact" }
                ].map((item, index) => (
                  <motion.li 
                    key={item.name} 
                    className="w-full"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link 
                      href={item.href}
                      className={cn(
                        "block w-full text-center py-3 px-6 rounded-xl text-base font-medium relative",
                        "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200",
                        "hover:bg-gradient-to-r hover:from-zinc-200 hover:to-zinc-100",
                        "dark:hover:bg-gradient-to-r dark:hover:from-zinc-700 dark:hover:to-zinc-800",
                        "transition-all duration-300"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                      {pathname === item.href && (
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-zinc-800/30 via-zinc-600/20 to-zinc-400/30 dark:from-zinc-200/30 dark:via-zinc-400/20 dark:to-zinc-600/30"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ 
                            scale: [0.8, 1.2, 1],
                            opacity: [0, 0.8, 0.6],
                          }}
                          transition={{ 
                            duration: 0.6,
                            ease: "easeOut",
                            times: [0, 0.5, 1]
                          }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 