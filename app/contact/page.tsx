"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageContainer } from "@/components/layout/page-container"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <PageContainer>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Let's discuss your project and create something amazing together
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-zinc-50/50 to-zinc-100/50 dark:from-zinc-800/50 dark:to-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-zinc-200/50 dark:border-zinc-700/50"
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
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-700/50 focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:border-transparent transition-all duration-200"
                    required
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
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-700/50 focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:border-transparent transition-all duration-200"
                    required
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
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-700/50 focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:border-transparent transition-all duration-200"
                    required
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
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-700/50 focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:border-transparent transition-all duration-200 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-6 rounded-xl bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 hover:from-zinc-700 hover:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-700 text-zinc-100 border-0 shadow-lg transition-all duration-200"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-zinc-50/50 to-zinc-100/50 dark:from-zinc-800/50 dark:to-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-zinc-200/50 dark:border-zinc-700/50">
                <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                      <Mail className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Email</p>
                      <a href="mailto:hello@advait.com" className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                        hello@advait.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                      <Phone className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Phone</p>
                      <a href="tel:+1234567890" className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                      <MapPin className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Location</p>
                      <p className="text-zinc-800 dark:text-zinc-200">
                        San Francisco, CA
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-zinc-50/50 to-zinc-100/50 dark:from-zinc-800/50 dark:to-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-zinc-200/50 dark:border-zinc-700/50">
                <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                  Connect with Me
                </h2>
                <div className="flex space-x-4">
                  {[
                    { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "#" },
                    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "#" },
                    { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "#" }
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
} 