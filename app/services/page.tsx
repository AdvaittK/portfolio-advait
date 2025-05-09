"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Layout, Server, LineChart, Shield, Database, Check, HelpCircle } from "lucide-react"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 mb-24"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 max-w-7xl mx-auto mb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50 flex flex-col h-full"
          >
            <div className="p-8 pt-6 flex flex-col items-center border-b border-zinc-200/50 dark:border-zinc-700/50 bg-gradient-to-b from-zinc-50/50 to-transparent dark:from-zinc-800/50">
              <div className="mb-6 text-center">
                <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                  Essential Professional Presence
                </h3>
                <div className="h-1 w-16 mx-auto bg-gradient-to-r from-zinc-800/20 to-zinc-600/20 dark:from-zinc-100/20 dark:to-zinc-400/20 rounded-full mb-4"></div>
              </div>
              <div className="bg-gradient-to-br from-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:to-zinc-700/80 rounded-xl p-6 w-full max-w-[200px] shadow-sm border border-zinc-200/50 dark:border-zinc-700/50">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-3xl font-bold">$299</span>
                  <span className="text-base font-normal text-zinc-600 dark:text-zinc-400 ml-1">onwards</span>
                  <div className="relative flex items-center">
                    <span className="group">
                      <HelpCircle className="w-4 h-4 ml-1 text-zinc-500 dark:text-zinc-400 cursor-help align-middle" />
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 text-sm text-zinc-600 dark:text-zinc-400 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        Final price may vary based on specific requirements such as:
                        <ul className="mt-2 space-y-1">
                          <li>• Custom animations and interactions</li>
                          <li>• Special integrations and APIs</li>
                          <li>• Additional pages or features</li>
                          <li>• Content management needs</li>
                        </ul>
                      </div>
                    </span>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 text-center">
                  A professional online presence for individuals or small businesses
                </p>
              </div>
              <div className="w-full flex flex-col items-center mt-2">
                <div className="w-16 h-px bg-zinc-200 dark:bg-zinc-700 mb-2"></div>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <ul className="space-y-3 mb-8 w-full text-left">
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Custom-coded responsive website
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Modern, minimalist design
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Mobile-first approach
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Basic SEO optimization
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Contact form with spam protection
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
              <div className="mt-auto pt-4 border-t border-zinc-200/50 dark:border-zinc-700/50">
                <Button className="w-full rounded-full px-8 py-6 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-base font-semibold transition-all duration-200">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-500/30 dark:border-green-400/30 transform scale-105 z-10 flex flex-col h-full"
          >
            <div className="p-8 pt-6 flex flex-col items-center border-b border-zinc-200/50 dark:border-zinc-700/50 bg-gradient-to-b from-zinc-50/50 to-transparent dark:from-zinc-800/50">
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
              <div className="mb-6 text-center">
                <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                  Enhanced Professional Solution
                </h3>
                <div className="h-1 w-16 mx-auto bg-gradient-to-r from-zinc-800/20 to-zinc-600/20 dark:from-zinc-100/20 dark:to-zinc-400/20 rounded-full mb-4"></div>
              </div>
              <div className="bg-gradient-to-br from-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:to-zinc-700/80 rounded-xl p-6 w-full max-w-[200px] shadow-sm border border-zinc-200/50 dark:border-zinc-700/50">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-3xl font-bold">$549</span>
                  <span className="text-base font-normal text-zinc-600 dark:text-zinc-400 ml-1">onwards</span>
                  <div className="relative flex items-center">
                    <span className="group">
                      <HelpCircle className="w-4 h-4 ml-1 text-zinc-500 dark:text-zinc-400 cursor-help align-middle" />
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 text-sm text-zinc-600 dark:text-zinc-400 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        Final price may vary based on specific requirements such as:
                        <ul className="mt-2 space-y-1">
                          <li>• Custom animations and interactions</li>
                          <li>• Special integrations and APIs</li>
                          <li>• Additional pages or features</li>
                          <li>• Content management needs</li>
                        </ul>
                      </div>
                    </span>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 text-center">
                  A more comprehensive website for established businesses
                </p>
              </div>
              <div className="w-full flex flex-col items-center mt-2">
                <div className="w-16 h-px bg-zinc-200 dark:bg-zinc-700 mb-2"></div>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <ul className="space-y-3 mb-8 w-full text-left">
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  All Essential features included
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Advanced animations & interactions
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Custom content management system
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Blog/news section with admin panel
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Team/staff profiles & testimonials
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Advanced SEO & analytics setup
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Google Maps & social media integration
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  3-4 weeks delivery
                </li>
              </ul>
              <div className="mt-auto pt-4 border-t border-zinc-200/50 dark:border-zinc-700/50">
                <Button className="w-full rounded-full px-8 py-6 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-base font-semibold transition-all duration-200">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50 flex flex-col h-full"
          >
            <div className="p-8 pt-6 flex flex-col items-center border-b border-zinc-200/50 dark:border-zinc-700/50 bg-gradient-to-b from-zinc-50/50 to-transparent dark:from-zinc-800/50">
              <div className="mb-6 text-center">
                <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                  Complete Business Platform
                </h3>
                <div className="h-1 w-16 mx-auto bg-gradient-to-r from-zinc-800/20 to-zinc-600/20 dark:from-zinc-100/20 dark:to-zinc-400/20 rounded-full mb-4"></div>
              </div>
              <div className="bg-gradient-to-br from-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:to-zinc-700/80 rounded-xl p-6 w-full max-w-[200px] shadow-sm border border-zinc-200/50 dark:border-zinc-700/50">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-3xl font-bold">$899</span>
                  <span className="text-base font-normal text-zinc-600 dark:text-zinc-400 ml-1">onwards</span>
                  <div className="relative flex items-center">
                    <span className="group">
                      <HelpCircle className="w-4 h-4 ml-1 text-zinc-500 dark:text-zinc-400 cursor-help align-middle" />
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 text-sm text-zinc-600 dark:text-zinc-400 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        Final price may vary based on specific requirements such as:
                        <ul className="mt-2 space-y-1">
                          <li>• Custom animations and interactions</li>
                          <li>• Special integrations and APIs</li>
                          <li>• Additional pages or features</li>
                          <li>• Content management needs</li>
                        </ul>
                      </div>
                    </span>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 text-center">
                  A fully-featured website with additional functionality
                </p>
              </div>
              <div className="w-full flex flex-col items-center mt-2">
                <div className="w-16 h-px bg-zinc-200 dark:bg-zinc-700 mb-2"></div>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <ul className="space-y-3 mb-8 w-full text-left">
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  All Enhanced features included
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Custom booking/appointment system
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Advanced user authentication
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Document management system
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Interactive image/video gallery
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Multi-language support
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Advanced form builder & validation
                </li>
                <li className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  4-5 weeks delivery
                </li>
              </ul>
              <div className="mt-auto pt-4 border-t border-zinc-200/50 dark:border-zinc-700/50">
                <Button className="w-full rounded-full px-8 py-6 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-base font-semibold transition-all duration-200">
                  Get Started
                </Button>
              </div>
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
          className="flex flex-col sm:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto mb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Maintenance Services */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            className="flex-1 relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50"
          >
            <div className="p-8 flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                  Technical Maintenance Package
                </h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold">$99</span>
                  <span className="text-zinc-600 dark:text-zinc-400">/month</span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                  Available only for websites with backend functionality
                </p>
                <ul className="space-y-3">
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
              </div>
              <div className="mt-8">
                <Button className="w-full rounded-full px-8 py-6 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-base font-semibold transition-all duration-200">
                  Enquire Now
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Addons Section */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            className="flex-1 relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50"
          >
            <div className="p-8 flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                  Enhance Your Package
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                  Additional features to customize your website
                </p>
                <ul className="space-y-4">
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
              </div>
              <div className="mt-8">
                <Button className="w-full rounded-full px-8 py-6 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-base font-semibold transition-all duration-200">
                  Customize Your Package
                </Button>
              </div>
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
              className="rounded-full px-8 py-6 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-base font-semibold transition-all duration-200 group"
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