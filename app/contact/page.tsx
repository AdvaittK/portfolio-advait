"use client"

import { useState } from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PageContainer } from "@/components/layout/page-container"
import { Mail, Phone, MapPin, Send, Loader2, Calendar } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      toast.success('Message sent successfully!')
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send message')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <PageContainer>
      <div className="min-h-screen relative bg-transparent">
        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-zinc-500/5 via-zinc-600/5 to-zinc-700/5 dark:from-zinc-500/10 dark:via-zinc-600/10 dark:to-zinc-700/10 rounded-full filter blur-3xl opacity-30"
            animate={{
              x: [0, 10, -5, 0],
              y: [0, -5, 10, 0],
              scale: [1, 1.02, 0.98, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-zinc-600/5 via-zinc-700/5 to-zinc-800/5 dark:from-zinc-600/10 dark:via-zinc-700/10 dark:to-zinc-800/10 rounded-full filter blur-3xl opacity-30"
            animate={{
              x: [0, -10, 5, 0],
              y: [0, 10, -8, 0],
              scale: [1, 0.98, 1.02, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-center mb-24"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
          </motion.p>
        </motion.div>

        {/* Contact Form and Info */}
        <div className="grid md:grid-cols-2 gap-16 mb-32 max-w-6xl mx-auto px-6 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-zinc-200/50 dark:border-zinc-700/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:border-transparent transition-colors duration-200"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:border-transparent transition-colors duration-200"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:border-transparent transition-colors duration-200"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:border-transparent transition-colors duration-200 resize-none"
                  placeholder="Your message..."
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full px-6 py-5 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-base font-semibold hover:opacity-90 transition-opacity duration-200"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-zinc-200/50 dark:border-zinc-700/50">
              <h3 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3 shadow-lg">
                    <Mail className="w-full h-full text-zinc-100" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">Email</h4>
                    <a href="mailto:advaitt.dev@gmail.com" className="text-muted-foreground hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors duration-200">
                      advaitt.dev@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3 shadow-lg">
                    <Phone className="w-full h-full text-zinc-100" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">Phone</h4>
                    <a href="tel:+919975556093" className="text-muted-foreground hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors duration-200">
                      +91 9975556093
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-zinc-200/50 dark:border-zinc-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3 shadow-lg">
                  <Calendar className="w-full h-full text-zinc-100" />
                </div>
                <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                  Schedule a Meeting
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Book a 30-minute consultation to discuss your project, ideas, or any opportunities you'd like to explore together.
              </p>
              <div>
                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                  <div className="bg-white/50 dark:bg-zinc-800/50 rounded-lg p-3 text-center">
                    <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200">30 Minutes</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                  <div className="bg-white/50 dark:bg-zinc-800/50 rounded-lg p-3 text-center">
                    <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200">1-on-1</div>
                    <div className="text-xs text-muted-foreground">Personal</div>
                  </div>
                  <div className="bg-white/50 dark:bg-zinc-800/50 rounded-lg p-3 text-center">
                    <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Flexible</div>
                    <div className="text-xs text-muted-foreground">Timing</div>
                  </div>
                </div>
                <Link href="/appointment">
                  <Button className="w-full rounded-full px-6 py-5 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-base font-semibold hover:opacity-90 transition-opacity duration-200">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  )
} 