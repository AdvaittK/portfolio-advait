"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-12 text-center"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-square rounded-2xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-600/20 to-zinc-400/20 z-10" />
            <img
              src="/placeholder.svg?height=600&width=600"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">My Journey</h3>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              I'm a passionate developer and designer with over 5 years of experience creating beautiful, functional
              digital experiences. My journey began with a curiosity about how things work on the web, which led me
              to explore the intersection of design and development.
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              I specialize in crafting immersive, user-centered interfaces that not only look stunning but also
              provide seamless interactions. My approach combines technical expertise with creative problem-solving
              to deliver solutions that exceed expectations.
            </p>
            <div className="pt-4">
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="rounded-full border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}