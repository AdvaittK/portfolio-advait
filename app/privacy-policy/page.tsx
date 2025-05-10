"use client"

import { PageContainer } from "@/components/layout/page-container"
import { motion } from "framer-motion"

export default function PrivacyPolicyPage() {
  return (
    <PageContainer>
      <motion.div 
        className="container mx-auto px-6 py-16 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Privacy Policy
        </motion.h1>

        <motion.div 
          className="prose prose-zinc dark:prose-invert max-w-none"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>Contact information (name, email address)</li>
              <li>Information about your business and project requirements</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Communicate with you about your projects</li>
              <li>Send you updates and marketing communications (with your consent)</li>
              <li>Improve our services and user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Analytics and Tracking</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              We use Vercel Analytics to collect anonymous usage data to improve our website. This includes:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>Page views and navigation patterns</li>
              <li>Time spent on pages</li>
              <li>Geographic location (country/region level)</li>
              <li>Device and browser information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              Email: advaitt.dev@gmail.com
            </p>
          </section>
        </motion.div>
      </motion.div>
    </PageContainer>
  )
} 