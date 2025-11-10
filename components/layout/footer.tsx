"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, Moon, Sun, ArrowUp } from "lucide-react"
import { SiDiscord } from "react-icons/si"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import LogoMark from "@/components/ui/logo-mark"
import { useTheme } from "next-themes"

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { theme, setTheme } = useTheme()
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  })

  // Transform values for parallax and glow effects
  // Make footer visible by default, animate on scroll
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 1])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1])
  const glow = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  // Check if mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show scroll to top button when scrolled down
  useEffect(() => {
    const handleScroll = (e?: any) => {
      if (typeof window !== 'undefined') {
        // Check Locomotive Scroll scroll event or native scroll
        let scrollY = 0
        if (e && e.scroll && typeof e.scroll.y !== 'undefined') {
          // Locomotive Scroll event
          scrollY = Math.abs(e.scroll.y)
        } else {
          // Native scroll or Locomotive Scroll container
          const scrollContainer = document.querySelector('[data-scroll-container]') as HTMLElement
          scrollY = scrollContainer?.scrollTop || window.scrollY || document.documentElement.scrollTop
        }
        setShowScrollTop(scrollY > 300)
      }
    }

    // Listen to native scroll
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Listen for Locomotive Scroll events
    const scrollContainer = document.querySelector('[data-scroll-container]')
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    }
    
    // Also listen for Locomotive Scroll's custom scroll event
    window.addEventListener('locomotive-scroll', handleScroll as EventListener, { passive: true })
    
    handleScroll() // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('locomotive-scroll', handleScroll as EventListener)
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // Scroll to top function with Locomotive Scroll support
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      // Use Locomotive Scroll's scrollTo method for smooth scrolling
      const locomotiveScroll = (window as any).locomotiveScrollInstance
      if (locomotiveScroll) {
        locomotiveScroll.scrollTo(0, {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
        })
      } else {
        // Fallback to native smooth scroll
        const scrollContainer = document.querySelector('[data-scroll-container]') as HTMLElement
        if (scrollContainer) {
          scrollContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }
      }
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <motion.footer 
      ref={footerRef}
      className="relative w-full py-16 px-6 overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"
      style={{ y, opacity, scale }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-zinc-900/30 to-zinc-900/50" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-white to-zinc-400 p-2.5 rounded-2xl shadow-sm">
                <LogoMark className="w-7 h-7 text-zinc-900" />
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                Advait
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Crafting immersive digital experiences that combine stunning visuals with flawless functionality.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-br from-zinc-300 to-zinc-500">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Projects", href: "/projects" },
                { name: "Skills", href: "/skills" },
                { name: "Contact", href: "/contact" }
              ].map((item, index) => (
                <motion.li 
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link 
                    href={item.href}
                    className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-zinc-600 to-zinc-400 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-br from-zinc-300 to-zinc-500">Services</h3>
            <ul className="space-y-3">
              {[
                "Web Development",
                "Frontend Development",
                "Backend Development",
                "UI/UX Design"
              ].map((service, index) => (
                <motion.li 
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-sm text-zinc-400"
                >
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-br from-zinc-300 to-zinc-500">Contact</h3>
            <ul className="space-y-4">
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex items-start space-x-3"
              >
                <MapPin className="w-5 h-5 text-zinc-500 mt-0.5" />
                <span className="text-sm text-zinc-400">Pune, Maharashtra, India</span>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-start space-x-3"
              >
                <Mail className="w-5 h-5 text-zinc-500 mt-0.5" />
                <a href="mailto:advaitt.dev@gmail.com" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                  advaitt.dev@gmail.com
                </a>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex items-start space-x-3"
              >
                <Phone className="w-5 h-5 text-zinc-500 mt-0.5" />
                <a href="tel:+919975556093" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                  +91 9975556093
                </a>
              </motion.li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {[
                { icon: <Github className="w-5 h-5 !text-zinc-200" />, label: "GitHub", link: "https://github.com/AdvaittK" },
                { icon: <Twitter className="w-5 h-5 !text-zinc-200" />, label: "Twitter", link: "https://x.com/advaittt_dev" },
                { icon: <SiDiscord className="w-5 h-5 !text-zinc-200" />, label: "Discord", link: "https://discord.gg/zQ8gwDK9Zr" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.link}
                  className="p-3 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 transition-all duration-300 relative group shadow-lg border border-zinc-700/20"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                    delay: index * 0.1 
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-300 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-zinc-700/20">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="mt-12 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Advait. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            {mounted && (
              <motion.button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 transition-all duration-300 shadow-lg border border-zinc-700/20 relative group"
                aria-label="Toggle theme"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                  delay: 0.2
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme === "dark" ? "dark" : "light"}
                    initial={{ scale: 0.5, rotate: -30, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.5, rotate: 30, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4 text-zinc-300" />
                    ) : (
                      <Moon className="w-4 h-4 text-zinc-300" />
                    )}
                  </motion.div>
                </AnimatePresence>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-300 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-zinc-700/20 whitespace-nowrap">
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </span>
              </motion.button>
            )}

            {/* Scroll to Top */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  onClick={scrollToTop}
                  className="p-2.5 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 transition-all duration-300 shadow-lg border border-zinc-700/20 relative group"
                  aria-label="Scroll to top"
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0, y: 20 }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 17
                  }}
                >
                  <ArrowUp className="w-4 h-4 text-zinc-300" />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-300 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-zinc-700/20 whitespace-nowrap">
                    Back to Top
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

            <div className="flex gap-6">
              <Link
                href="/privacy-policy"
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors relative group"
              >
                Privacy Policy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-zinc-600 to-zinc-400 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                href="/terms-of-service"
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors relative group"
              >
                Terms of Service
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-zinc-600 to-zinc-400 group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
} 