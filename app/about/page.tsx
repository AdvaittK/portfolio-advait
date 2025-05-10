"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PageContainer } from "@/components/layout/page-container"
import { Code2, Layout, Server, LineChart, Shield, Database, Award, Briefcase, GraduationCap, Heart, ExternalLink } from "lucide-react"

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
  }
}

const skills = [
  { name: "Frontend Development", icon: Layout, level: 95 },
  { name: "Backend Development", icon: Server, level: 90 },
  { name: "UI/UX Design", icon: Code2, level: 85 },
  { name: "Database Management", icon: Database, level: 88 },
  { name: "Performance Optimization", icon: LineChart, level: 92 },
  { name: "Security Implementation", icon: Shield, level: 87 }
]

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    period: "2021 - Present",
    description: "Leading development of enterprise-scale applications using modern technologies."
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd",
    period: "2019 - 2021",
    description: "Developed and maintained multiple web applications for various clients."
  },
  {
    title: "Junior Developer",
    company: "WebCraft Studios",
    period: "2018 - 2019",
    description: "Started my journey in web development, focusing on frontend technologies."
  }
]

const education = [
  {
    degree: "Master of Computer Science",
    school: "Tech University",
    period: "2016 - 2018",
    description: "Specialized in Software Engineering and Artificial Intelligence"
  },
  {
    degree: "Bachelor of Computer Science",
    school: "State University",
    period: "2012 - 2016",
    description: "Focused on Web Development and Database Systems"
  }
]

const certifications = [
  {
    title: "IT Specialist - HTML5 Application Development",
    issuer: "Certiport - A Pearson VUE Business",
    issueDate: "April 2024",
    description: "Professional certification in modern web application development, demonstrating expertise in creating responsive, interactive, and accessible web applications using the latest HTML5 technologies.",
    skills: [
      "HTML5",
      "JavaScript",
      "CSS3",
      "Responsive Design",
      "Web APIs",
      "Web Accessibility"
    ],
    icon: Code2
  },
  {
    title: "IT Specialist - Databases",
    issuer: "Certiport - A Pearson VUE Business",
    issueDate: "September 2024",
    description: "Expert certification in database systems and administration, covering both theoretical knowledge and practical skills in database design, implementation, and management.",
    skills: [
      "Database Design",
      "SQL",
      "Data Modeling",
      "Query Optimization",
      "Data Security",
      "Transaction Management"
    ],
    icon: Database
  },
  {
    title: "IT Specialist - Artificial Intelligence",
    issuer: "Certiport - A Pearson VUE Business",
    issueDate: "February 2025",
    description: "Advanced certification in AI and cloud technologies, demonstrating proficiency in implementing and managing AI solutions across major cloud platforms.",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "AWS AI Services",
      "Azure AI",
      "Natural Language Processing",
      "Computer Vision"
    ],
    icon: LineChart
  }
]

export default function AboutPage() {
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
            About Me
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Crafting exceptional digital experiences through innovative solutions and modern technologies
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-16 mb-32 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative w-[400px] h-[400px] mb-6">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Profile"
                className="w-[400px] h-[400px] rounded-full object-cover border-4 border-white dark:border-zinc-900 shadow-lg transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-700/20 to-zinc-400/10 dark:from-zinc-700/30 dark:to-zinc-400/10 z-10 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center md:items-start items-center text-center md:text-left gap-6"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">My Journey</h3>
            <div className="space-y-4 max-w-xl">
              <p className="text-muted-foreground leading-relaxed text-lg">
                I'm a passionate developer and designer with over 5 years of experience creating beautiful, functional digital experiences. My journey began with a curiosity about how things work on the web, which led me to explore the intersection of design and development.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                I specialize in crafting immersive, user-centered interfaces that not only look stunning but also provide seamless interactions. My approach combines technical expertise with creative problem-solving to deliver solutions that exceed expectations.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto pt-2 md:pt-4 justify-center md:justify-start">
              <Link href="/contact" className="flex-1 md:flex-initial">
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-5 border-border hover:bg-secondary hover:text-foreground font-medium text-base w-full md:w-auto"
                >
                  Get in Touch
                </Button>
              </Link>
              <Link href="/services" className="flex-1 md:flex-initial">
                <Button
                  className="rounded-full px-6 py-5 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-base font-semibold w-full md:w-auto"
                >
                  View Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-32 max-w-6xl mx-auto px-6"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400"
          >
            Technical Expertise
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <skill.icon className="w-full h-full text-zinc-100" />
                  </div>
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-600 dark:to-zinc-400 h-1.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-32 max-w-7xl mx-auto px-6"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400"
          >
            Professional Certifications
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 group flex flex-col min-h-[550px]"
              >
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3.5 shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <cert.icon className="w-full h-full text-zinc-100" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-1">
                      Issued {cert.issueDate}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-sm mb-8">
                  {cert.description}
                </p>

                <div className="flex-grow">
                  <h4 className="text-base font-semibold mb-4 text-zinc-800 dark:text-zinc-200">
                    Skills & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-200/50 dark:border-zinc-700/50">
                  <Button
                    variant="outline"
                    className="w-full rounded-full px-6 py-5 border-border hover:bg-secondary hover:text-foreground font-medium text-base flex items-center justify-center gap-2"
                    onClick={() => window.open('#', '_blank')}
                  >
                    View Credly Badge
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-24"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/contact">
              <Button
                className="rounded-full px-8 py-6 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-base font-semibold"
              >
                Let's Work Together
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageContainer>
  )
}