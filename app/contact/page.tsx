"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PageContainer } from "@/components/layout/page-container"
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"
import { toast } from "sonner"

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
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
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
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
          </motion.p>
        </motion.div>

        {/* Contact Form and Info */}
        <div className="grid md:grid-cols-2 gap-16 mb-32 max-w-6xl mx-auto px-6">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
            transition={{ duration: 0.8, delay: 0.4 }}
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
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3 shadow-lg">
                    <MapPin className="w-full h-full text-zinc-100" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">Location</h4>
                    <p className="text-muted-foreground">
                      Pune, Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-zinc-200/50 dark:border-zinc-700/50">
              <h3 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                Let's Connect
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com/in/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3 shadow-lg hover:scale-110 transition-transform duration-300"
                >
                  <svg className="w-full h-full text-zinc-100" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  href="https://github.com/AdvaittK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3 shadow-lg hover:scale-110 transition-transform duration-300"
                >
                  <svg className="w-full h-full text-zinc-100" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/your-handle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3 shadow-lg hover:scale-110 transition-transform duration-300"
                >
                  <svg className="w-full h-full text-zinc-100" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  )
} 