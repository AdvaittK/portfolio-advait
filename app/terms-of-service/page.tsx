"use client"

import { PageContainer } from "@/components/layout/page-container"
import { motion } from "framer-motion"

export default function TermsOfServicePage() {
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
          Terms of Service
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
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Services</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              We provide web development and design services, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>Website design and development</li>
              <li>Custom web applications</li>
              <li>E-commerce solutions</li>
              <li>Website maintenance and support</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Project Terms</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              For all projects:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>Payment terms are as specified in the project proposal</li>
              <li>Project timelines are estimates and are dependent on timely client feedback, approvals, and content delivery</li>
              <li>Clients are responsible for providing all required materials (including but not limited to text, images, videos, testimonials, and other assets) within the agreed timeline</li>
              <li>Delays in providing required content or feedback may result in the project being paused or rescheduled based on availability</li>
              <li>Prolonged delays caused by the client may incur a delay or holding fee to account for reserved time and resources</li>
              <li>Client approval is required for major design and development decisions</li>
              <li>Revisions are limited to the scope defined in the project agreement</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Upon final payment:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>Clients receive full ownership of the final deliverables</li>
              <li>We retain the right to use the work in our portfolio</li>
              <li>Third-party assets remain subject to their respective licenses</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Changes to Terms</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Contact Information</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              For any questions regarding these Terms of Service, please contact us at:
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