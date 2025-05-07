"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface GlassCardProps {
  className?: string
  name: string
  title: string
  description: string
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
  }
}

export const GlassCard = ({
  className,
  name,
  title,
  description,
  socialLinks
}: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative w-full h-full rounded-2xl overflow-hidden",
        "backdrop-blur-xl bg-white/10 dark:bg-zinc-900/10",
        "border border-white/20 dark:border-zinc-800/20",
        "shadow-2xl",
        className
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20" />
      
      {/* Content */}
      <div className="relative p-8 flex flex-col h-full">
        {/* Header */}
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400"
          >
            {name}
          </motion.h2>
          
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-zinc-600 dark:text-zinc-400"
          >
            {title}
          </motion.h3>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 text-zinc-600 dark:text-zinc-400"
        >
          {description}
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-4 mt-6"
        >
          {socialLinks.github && (
            <motion.a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-zinc-800/50 dark:hover:bg-zinc-800/70 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            </motion.a>
          )}
          {socialLinks.linkedin && (
            <motion.a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-zinc-800/50 dark:hover:bg-zinc-800/70 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            </motion.a>
          )}
          {socialLinks.twitter && (
            <motion.a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-zinc-800/50 dark:hover:bg-zinc-800/70 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            </motion.a>
          )}
          {socialLinks.email && (
            <motion.a
              href={`mailto:${socialLinks.email}`}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-zinc-800/50 dark:hover:bg-zinc-800/70 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            </motion.a>
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-4 mt-auto pt-6"
        >
          <Link href="/projects">
            <Button
              className="rounded-full px-6 py-2 bg-white/10 hover:bg-white/20 dark:bg-zinc-800/50 dark:hover:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 font-medium"
            >
              View Work
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          
          <Link href="/contact">
            <Button
              variant="outline"
              className="rounded-full px-6 py-2 border-white/20 hover:bg-white/10 dark:border-zinc-700/50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 font-medium"
            >
              Contact Me
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
} 