"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Layout, Server, LineChart, Shield, Database, Check } from "lucide-react"
import { PageContainer } from "@/components/layout/page-container"
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
      delayChildren: 0.2,
      duration: 0.5
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
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
}

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const descriptionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.95
  }
}

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

export default function ServicesPage() {
  return (
    <PageContainer>
      <motion.div 
        className="container mx-auto px-6 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400"
            variants={titleVariants}
          >
            Professional Services
          </motion.h1>
          <motion.p 
            className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            variants={descriptionVariants}
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
              initial="hidden"
              animate="visible"
              className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50 group"
            >
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 dark:from-white/10 dark:to-black/10" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
              </motion.div>
              
              <div className="relative z-10 p-6">
                <motion.div 
                  className="flex items-center gap-4 mb-4"
                  variants={featureVariants}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-2.5 shadow-lg flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <service.icon className="w-full h-full text-zinc-100" />
                  </motion.div>
                  <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                    {service.title}
                  </h3>
                </motion.div>
                
                <motion.p 
                  className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2"
                  variants={descriptionVariants}
                >
                  {service.description}
                </motion.p>
                
                <motion.ul 
                  className="space-y-2"
                  variants={containerVariants}
                >
                  {service.features.map((feature, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                      variants={featureVariants}
                      custom={idx}
                    >
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mr-2"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span className="line-clamp-1">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
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
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Custom-coded responsive website
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  3-5 pages (Home, About, Services, etc.)
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Mobile-optimized design
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Basic SEO setup
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  GDPR-compliant contact form
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  SSL security certificate
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Social media integration
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  2-3 weeks delivery
                </li>
              </ul>
              <Button className="w-full rounded-full bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 hover:from-zinc-700 hover:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-700 text-zinc-100 border-0 shadow-lg">
                Get Started
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-500/30 dark:border-green-400/30 transform scale-105 z-10"
          >
            <div className="p-8 pt-6 flex flex-col items-center">
              <motion.div 
                className="mb-4 bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 px-4 py-1 rounded-full shadow-lg border border-zinc-200/20 dark:border-zinc-700/20 whitespace-nowrap flex items-center gap-1.5"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-xs font-medium text-white">Most Popular</span>
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-center">
                Enhanced Professional Solution
              </h3>
              <div className="mb-6 text-center">
                <span className="text-3xl font-bold">$1,199</span>
                <span className="text-zinc-600 dark:text-zinc-400">/project</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 text-center">
                A more comprehensive website for established businesses
              </p>
              <ul className="space-y-3 mb-8 w-full text-left mx-0">
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  All ESSENTIAL features
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Up to 8 pages of content
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Team/staff profiles
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Client testimonials section
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Blog/news capability
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Google Maps integration
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Enhanced SEO features
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  3-4 weeks delivery
                </li>
              </ul>
              <Button className="w-full rounded-full bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 hover:from-zinc-700 hover:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-700 text-zinc-100 border-0 shadow-lg">
                Get Started
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50"
          >
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                Complete Business Platform
              </h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">$1,999</span>
                <span className="text-zinc-600 dark:text-zinc-400">/project</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                A fully-featured website with additional functionality
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  All ENHANCED features
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Custom design elements
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Basic enquiry/booking system
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Document download area
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  FAQ section
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Image gallery
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Advanced contact forms
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  4-5 weeks delivery
                </li>
              </ul>
              <Button className="w-full rounded-full bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 hover:from-zinc-700 hover:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-700 text-zinc-100 border-0 shadow-lg">
                Get Started
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="text-center mt-32 mb-24"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Additional Services
          </motion.h2>
          <motion.p 
            className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            Enhance your website with our maintenance and addon services
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Maintenance Services */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50"
          >
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                Technical Maintenance Package
              </h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">$149</span>
                <span className="text-zinc-600 dark:text-zinc-400">/month</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                Available only for websites with backend functionality
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Regular code updates
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Security monitoring
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Database management
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Booking system maintenance
                </li>
              </ul>
              <Button className="w-full rounded-full bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 hover:from-zinc-700 hover:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-700 text-zinc-100 border-0 shadow-lg">
                Enquire Now
              </Button>
            </div>
          </motion.div>

          {/* Addons Section */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50"
          >
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                Enhance Your Package
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                Additional features to customize your website
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Additional Pages</span>
                  <span className="font-semibold">$59/page</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">E-commerce Integration</span>
                  <span className="font-semibold">$299</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Custom Animations</span>
                  <span className="font-semibold">$199</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Advanced SEO Package</span>
                  <span className="font-semibold">$249</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Content Management System</span>
                  <span className="font-semibold">$399</span>
                </li>
              </ul>
              <Button className="w-full rounded-full bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 hover:from-zinc-700 hover:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-700 text-zinc-100 border-0 shadow-lg">
                Customize Your Package
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="text-center mt-32 mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Why Choose Us
          </motion.h2>
          <motion.p 
            className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            We combine technical expertise with creative innovation to deliver exceptional results
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50 p-8"
          >
            <h3 className="text-lg font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
              Custom Development
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Every website is built from scratch, tailored to your specific needs. No cookie-cutter templates or generic solutions.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50 p-8"
          >
            <h3 className="text-lg font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
              Accessibility First
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              WCAG 2.1 compliant websites that are accessible to everyone, ensuring your content reaches the widest possible audience.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50 p-8"
          >
            <h3 className="text-lg font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
              Performance Optimized
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Lightning-fast loading times and optimized performance across all devices, ensuring the best user experience.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50 p-8"
          >
            <h3 className="text-lg font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
              Modern Tech Stack
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Built with the latest technologies and best practices, ensuring your website is future-proof and maintainable.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50 p-8"
          >
            <h3 className="text-lg font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
              SEO Ready
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Built-in SEO optimization and best practices to help your website rank higher in search results.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50 p-8"
          >
            <h3 className="text-lg font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
              Ongoing Support
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Dedicated support and maintenance services to keep your website running smoothly and securely.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="max-w-2xl mx-auto mb-24"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <div className="bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 p-8">
            <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
              Payment Terms
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              To ensure a smooth and transparent collaboration, our payment structure is milestone-based:
            </p>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 mb-2">
              <li><span className="font-semibold text-zinc-800 dark:text-zinc-100">40%</span> initial deposit to begin the project</li>
              <li><span className="font-semibold text-zinc-800 dark:text-zinc-100">30%</span> upon completion of the main milestone (e.g., design approval or core functionality)</li>
              <li><span className="font-semibold text-zinc-800 dark:text-zinc-100">30%</span> upon final delivery and project launch</li>
            </ul>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              * Payment terms can be tailored to your needs for larger or ongoing projects. All payments are securely invoiced.
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              className="rounded-full px-8 py-6 bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 hover:from-zinc-700 hover:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-700 text-zinc-100 border-0 shadow-lg transition-all duration-200 group"
            >
              Get a Quote
              <motion.div
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </PageContainer>
  )
} 