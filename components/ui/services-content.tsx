'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Layout, Server, LineChart, Shield, Database, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const services = [
  {
    title: "Full Stack Development",
    description: "End-to-end web application development using modern technologies and best practices. From database design to frontend implementation, I deliver complete solutions that scale.",
    icon: Code2,
    features: [
      "Custom web application development",
      "Database design and optimization",
      "API development and integration",
      "Responsive and interactive UIs",
      "Performance optimization",
    ]
  },
  {
    title: "Frontend Development",
    description: "Creating beautiful, responsive, and performant user interfaces using modern frameworks and best practices.",
    icon: Layout,
    features: [
      "React/Next.js development",
      "Responsive design implementation",
      "UI/UX optimization",
      "Component architecture",
      "State management solutions",
    ]
  },
  {
    title: "Backend Development",
    description: "Robust server-side solutions with scalable architecture and efficient database management.",
    icon: Server,
    features: [
      "API development",
      "Database design",
      "Authentication systems",
      "Server optimization",
      "Cloud integration",
    ]
  },
  {
    title: "CRM Dashboard Development",
    description: "Custom CRM solutions that streamline business operations and enhance customer relationship management.",
    icon: Database,
    features: [
      "Custom dashboard development",
      "Data visualization",
      "User management",
      "Analytics integration",
      "Automation workflows",
    ]
  },
  {
    title: "SEO & Performance Optimization",
    description: "Improve your website's visibility and performance with expert optimization techniques.",
    icon: LineChart,
    features: [
      "Technical SEO implementation",
      "Performance optimization",
      "Core Web Vitals improvement",
      "Analytics setup",
      "Conversion optimization",
    ]
  },
  {
    title: "Security Solutions",
    description: "Implement robust security measures to protect your applications and data.",
    icon: Shield,
    features: [
      "Security audits",
      "Authentication systems",
      "Data encryption",
      "API security",
      "Compliance implementation",
    ]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
}

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3
    }
  })
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
}

export function ServicesContent() {
  return (
    <motion.div 
      className="container mx-auto px-6 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-center mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h1 
          className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Professional Services
        </motion.h1>
        <motion.p 
          className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Elevate your digital presence with our comprehensive suite of professional services, designed to transform your vision into reality
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50 group"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 dark:from-white/10 dark:to-black/10" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
            </div>
            
            <div className="relative z-10 p-6">
              <div className="flex items-center gap-4 mb-4">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-2.5 shadow-lg flex-shrink-0"
                  variants={iconVariants}
                >
                  <service.icon className="w-full h-full text-zinc-100" />
                </motion.div>
                <motion.h3 
                  className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {service.title}
                </motion.h3>
              </div>
              
              <motion.p 
                className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {service.description}
              </motion.p>
              
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                    custom={idx}
                    variants={featureVariants}
                  >
                    <motion.div 
                      className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mr-2"
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    />
                    <span className="line-clamp-1">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="text-center mb-16"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Choose Your Plan
        </motion.h2>
        <motion.p 
          className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Select the perfect package for your needs, with flexible options to scale as you grow
        </motion.p>
      </motion.div>

      <motion.div 
        className="flex justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50"
          >
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                Essential Professional Presence
              </h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">$499</span>
                <span className="text-zinc-600 dark:text-zinc-400">/project</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                A professional online presence for individuals or small businesses
              </p>
              <ul className="space-y-3 mb-8">
                <motion.li 
                  className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                  variants={featureVariants}
                  custom={0}
                >
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Custom-coded responsive website
                </motion.li>
                <motion.li 
                  className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                  variants={featureVariants}
                  custom={1}
                >
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Basic SEO optimization
                </motion.li>
                <motion.li 
                  className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                  variants={featureVariants}
                  custom={2}
                >
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Contact form integration
                </motion.li>
              </ul>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="w-full rounded-full px-8 py-6 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-base font-semibold transition-all duration-200">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50"
          >
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                Business Growth Package
              </h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">$999</span>
                <span className="text-zinc-600 dark:text-zinc-400">/project</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                Comprehensive solutions for growing businesses
              </p>
              <ul className="space-y-3 mb-8">
                <motion.li 
                  className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                  variants={featureVariants}
                  custom={0}
                >
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Advanced web application
                </motion.li>
                <motion.li 
                  className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                  variants={featureVariants}
                  custom={1}
                >
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Full SEO optimization
                </motion.li>
                <motion.li 
                  className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                  variants={featureVariants}
                  custom={2}
                >
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Analytics integration
                </motion.li>
              </ul>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="w-full rounded-full px-8 py-6 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-base font-semibold transition-all duration-200">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50"
          >
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                Enterprise Solution
              </h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">Custom</span>
                <span className="text-zinc-600 dark:text-zinc-400">/project</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                Tailored solutions for enterprise-level requirements
              </p>
              <ul className="space-y-3 mb-8">
                <motion.li 
                  className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                  variants={featureVariants}
                  custom={0}
                >
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Custom enterprise solution
                </motion.li>
                <motion.li 
                  className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                  variants={featureVariants}
                  custom={1}
                >
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Advanced security features
                </motion.li>
                <motion.li 
                  className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                  variants={featureVariants}
                  custom={2}
                >
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Priority support
                </motion.li>
              </ul>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="w-full rounded-full px-8 py-6 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-base font-semibold transition-all duration-200">
                  Contact Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
} 