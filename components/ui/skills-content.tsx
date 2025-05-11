'use client'

import { motion } from "framer-motion"
import { SkillsRadarBrowser } from "@/components/ui/skills-radar-browser"
import { 
  Code2, 
  Database, 
  Cloud, 
  GitBranch, 
  Layout, 
  Server, 
  Terminal, 
  Globe, 
  Cpu, 
  Settings,
  Code,
  FileCode,
  FileType,
  FileText,
  Palette,
  Layers,
  GitBranchIcon,
  Box,
  DatabaseIcon,
  Container,
  CloudIcon,
  Flame,
  Search,
  Brain,
  FileJson,
  Network,
  TerminalSquare,
  GitPullRequest
} from "lucide-react"

const skillCategories = [
  {
    name: "Frontend Development",
    icon: Layout,
    skills: [
      { name: "React.js", percentage: 90, icon: Code, description: "Building interactive and responsive user interfaces" },
      { name: "Next.js", percentage: 90, icon: FileCode, description: "Server-side rendering and static site generation" },
      { name: "JavaScript", percentage: 90, icon: FileType, description: "Core language fundamentals and modern ES6+ features" },
      { name: "TypeScript", percentage: 85, icon: FileText, description: "Type-safe development and enhanced code quality" },
      { name: "HTML/CSS", percentage: 95, icon: Palette, description: "Semantic markup and modern styling techniques" },
      { name: "Tailwind CSS", percentage: 95, icon: Layers, description: "Utility-first CSS framework for rapid development" },
      { name: "Redux", percentage: 80, icon: GitBranchIcon, description: "State management and predictable data flow" },
    ]
  },
  {
    name: "Backend Development",
    icon: Server,
    skills: [
      { name: "Node.js", percentage: 85, icon: Box, description: "Server-side JavaScript runtime" },
      { name: "Express.js", percentage: 85, icon: Network, description: "Web application framework for Node.js" },
      { name: "MongoDB", percentage: 85, icon: DatabaseIcon, description: "NoSQL database management" },
      { name: "PostgreSQL", percentage: 75, icon: Database, description: "Relational database management" },
      { name: "Python", percentage: 70, icon: TerminalSquare, description: "General-purpose programming and automation" },
    ]
  },
  {
    name: "DevOps & Tools",
    icon: Settings,
    skills: [
      { name: "Git", percentage: 85, icon: GitPullRequest, description: "Version control and collaboration" },
      { name: "Docker", percentage: 70, icon: Container, description: "Containerization and deployment" },
      { name: "AWS", percentage: 75, icon: CloudIcon, description: "Cloud services and infrastructure" },
      { name: "Azure", percentage: 70, icon: Cloud, description: "Microsoft cloud platform" },
      { name: "Firebase", percentage: 80, icon: Flame, description: "Backend-as-a-Service platform" },
      { name: "Postman/Axios", percentage: 85, icon: FileJson, description: "API testing and development" },
    ]
  },
  {
    name: "Additional Skills",
    icon: Brain,
    skills: [
      { name: "SEO", percentage: 75, icon: Search, description: "Search engine optimization and analytics" },
      { name: "Problem Solving", percentage: 90, icon: Brain, description: "Analytical thinking and solution design" },
    ]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  },
  hover: {
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
}

const progressBarVariants = {
  hidden: { width: 0 },
  visible: (percentage: number) => ({
    width: `${percentage}%`,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: 0.2
    }
  })
}

export function SkillsContent() {
  return (
    <motion.div 
      className="container mx-auto py-16 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.1,
            ease: "easeOut"
          }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            My Skills
          </motion.h1>
          <motion.p
            className="text-xl text-zinc-600 dark:text-zinc-400 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Explore my technical expertise and professional competencies
          </motion.p>
        </motion.div>

        {/* Skills Radar Browser */}
        <motion.div 
          className="w-full h-[600px] mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.1,
            ease: "easeOut"
          }}
        >
          <SkillsRadarBrowser />
        </motion.div>
        
        {/* Enhanced Technical Expertise Section */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Technical Expertise
          </motion.h2>
          
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <category.icon className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                <h3 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200">
                  {category.name}
                </h3>
              </div>
              
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover="hover"
                    className="group relative bg-gradient-to-br from-zinc-50/50 to-zinc-100/50 dark:from-zinc-800/50 dark:to-zinc-900/50 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50"
                  >
                    {/* Metallic border effects */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
                    <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <skill.icon className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-2">
                          <motion.h3 
                            className="text-lg font-semibold text-zinc-800 dark:text-zinc-200"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {skill.name}
                          </motion.h3>
                          <motion.span 
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                          >
                            {skill.percentage}%
                          </motion.span>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                          {skill.description}
                        </p>
                        <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-200 rounded-full"
                            variants={progressBarVariants}
                            custom={skill.percentage}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
} 