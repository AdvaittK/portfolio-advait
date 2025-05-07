"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  })

  // Transform values for parallax and glow effects
  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const glow = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <motion.footer 
      ref={footerRef}
      className="relative w-full py-12 px-6 border-t border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-950 mt-auto"
      style={{ y, opacity, scale }}
    >
      {/* Glow effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(99, 102, 241, ${glow.get() * 0.1}) 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3 
              className="text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Advait
            </motion.h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Crafting immersive digital experiences that combine stunning visuals with flawless functionality.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
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
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex gap-4">
              {[
                { icon: <Github className="w-5 h-5" />, label: "GitHub", link: "#" },
                { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", link: "#" },
                { icon: <Twitter className="w-5 h-5" />, label: "Twitter", link: "#" },
                { icon: <Mail className="w-5 h-5" />, label: "Email", link: "mailto:hello@advait.com" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.link}
                  className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors relative group"
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
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Advait. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors relative group"
            >
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="#"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors relative group"
            >
              Terms of Service
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
} 