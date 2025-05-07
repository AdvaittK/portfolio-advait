'use client'

import { motion } from "framer-motion"
import { SkillsRadarBrowser } from "@/components/ui/skills-radar-browser"

const technicalSkills = [
  { name: "React.js", percentage: 90 },
  { name: "Next.js", percentage: 90 },
  { name: "JavaScript", percentage: 90 },
  { name: "TypeScript", percentage: 85 },
  { name: "HTML/CSS", percentage: 95 },
  { name: "Tailwind CSS", percentage: 95 },
  { name: "Redux", percentage: 80 },
  { name: "Node.js", percentage: 85 },
  { name: "Express.js", percentage: 85 },
  { name: "MongoDB", percentage: 85 },
  { name: "PostgreSQL", percentage: 75 },
  { name: "Python", percentage: 70 },
  { name: "Git", percentage: 85 },
  { name: "Docker", percentage: 70 },
  { name: "AWS", percentage: 75 },
  { name: "Azure", percentage: 70 },
  { name: "Firebase", percentage: 80 },
  { name: "Postman/Axios", percentage: 85 },
  { name: "SEO", percentage: 75 },
  { name: "Problem Solving", percentage: 90 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
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
      stiffness: 100,
      damping: 15
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
      duration: 1,
      ease: "easeOut",
      delay: 0.5
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
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.8
          }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            My Skills
          </motion.h1>
          <motion.p
            className="text-xl text-zinc-600 dark:text-zinc-400 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
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
            duration: 0.8,
            delay: 0.4,
            ease: "easeOut"
          }}
        >
          <SkillsRadarBrowser />
        </motion.div>
        
        {/* Detailed Skills Grid */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Technical Expertise
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {technicalSkills.map((skill, index) => (
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
                <div className="flex justify-between items-center mb-3">
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
                <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-200 rounded-full"
                    variants={progressBarVariants}
                    custom={skill.percentage}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
} 