import { Code2, Layout, Server, LineChart, Shield, Database } from "lucide-react"
import { Button } from "./button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Enhanced services with additional information for the improved UI
const services = [
  {
    title: "Full Stack Development",
    description: "End-to-end web application development using modern technologies and best practices.",
    icon: Code2,
    accentColor: "from-blue-500/20 to-indigo-500/20",
    accentBorder: "from-blue-500/40 to-indigo-500/40",
    iconBg: "from-blue-600 to-indigo-600",
  },
  {
    title: "Frontend Development",
    description: "Creating beautiful, responsive, and performant user interfaces.",
    icon: Layout,
    accentColor: "from-emerald-500/20 to-teal-500/20",
    accentBorder: "from-emerald-500/40 to-teal-500/40",
    iconBg: "from-emerald-600 to-teal-600",
  },
  {
    title: "Backend Development",
    description: "Robust server-side solutions with scalable architecture.",
    icon: Server,
    accentColor: "from-purple-500/20 to-violet-500/20",
    accentBorder: "from-purple-500/40 to-violet-500/40",
    iconBg: "from-purple-600 to-violet-600",
  },
  {
    title: "CRM Dashboard",
    description: "Custom CRM solutions that streamline business operations.",
    icon: Database,
    accentColor: "from-amber-500/20 to-orange-500/20",
    accentBorder: "from-amber-500/40 to-orange-500/40",
    iconBg: "from-amber-600 to-orange-600",
  },
  {
    title: "SEO & Performance",
    description: "Improve your website's visibility and performance.",
    icon: LineChart,
    accentColor: "from-red-500/20 to-rose-500/20",
    accentBorder: "from-red-500/40 to-rose-500/40",
    iconBg: "from-red-600 to-rose-600",
  },
  {
    title: "Security Solutions",
    description: "Implement robust security measures for your applications.",
    icon: Shield,
    accentColor: "from-sky-500/20 to-cyan-500/20",
    accentBorder: "from-sky-500/40 to-cyan-500/40",
    iconBg: "from-sky-600 to-cyan-600",
  }
]

export function ServicesSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle background elements - removed corner glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-zinc-500/20 dark:via-zinc-400/20 to-transparent" />
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-zinc-500/10 dark:via-zinc-400/10 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center mb-3">
            <span className="h-[1px] w-10 bg-gradient-to-r from-zinc-400/60 to-zinc-600/60 dark:from-zinc-500/60 dark:to-zinc-300/60"></span>
            <span className="px-4 text-sm font-medium tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">What I Offer</span>
            <span className="h-[1px] w-10 bg-gradient-to-r from-zinc-600/60 to-zinc-400/60 dark:from-zinc-300/60 dark:to-zinc-500/60"></span>
          </div>
          
          <h2 
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-300 leading-tight"
          >
            Professional Services
          </h2>
          
          <p 
            className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Transforming ideas into exceptional digital experiences with cutting-edge technology and innovative solutions
          </p>
          
          <div className="mt-6 flex justify-center">
            <div className="h-[3px] w-24 bg-gradient-to-r from-zinc-300/60 via-zinc-500/80 to-zinc-300/60 dark:from-zinc-600/60 dark:via-zinc-400/80 dark:to-zinc-600/60 rounded-full"></div>
          </div>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.06, 
                ease: [0.25, 0.1, 0.25, 1], 
                opacity: { duration: 0.2 } 
              }}
              viewport={{ once: true, margin: "-20px" }}
              className="group relative backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-sm dark:hover:shadow-zinc-900/10"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-zinc-50/95 to-zinc-100/95 dark:from-zinc-800/95 dark:to-zinc-900/95"
                initial={{ opacity: 0.9 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Subtle metallic effect overlay */}
              <motion.div 
                className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.1),rgba(255,255,255,0),rgba(255,255,255,0.05))] dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.05),rgba(255,255,255,0),rgba(255,255,255,0.02))]"
                whileHover={{ opacity: [null, 1.2, 1] }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Premium border effect with animated hover */}
              <motion.div 
                className="absolute inset-0 rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                whileHover={{ 
                  borderColor: "rgba(212, 212, 216, 0.8)", 
                  transition: { duration: 0.15 } 
                }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Content container with snappy hover interactions */}
              <motion.div 
                className="p-8 relative z-10"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {/* Icon with responsive animation */}
                <div className="flex justify-between items-start mb-7">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <motion.div 
                      className="w-14 h-14 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 dark:from-zinc-600 dark:to-zinc-800 p-3 shadow-md"
                      whileHover={{ 
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" 
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Subtle metallic highlight on icon */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/5 to-transparent opacity-50" />
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <service.icon className="w-full h-full text-zinc-100" />
                      </motion.div>
                    </motion.div>
                    {/* Animated accent line */}
                    <motion.div 
                      className="absolute -bottom-1 h-[1px] bg-gradient-to-r from-zinc-400/30 to-transparent dark:from-zinc-500/30"
                      initial={{ width: "32px" }}
                      whileHover={{ width: "48px" }}
                      transition={{ duration: 0.15 }}
                    />
                  </motion.div>
                  
                  {/* Animated arrow indicator */}
                  <motion.div
                    className="w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100"
                    initial={{ x: -5, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-4 h-4 text-zinc-700 dark:text-zinc-400" />
                  </motion.div>
                </div>
                
                {/* Title with crisp styling */}
                <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300">
                  {service.title}
                </h3>
                
                {/* Description with optimal readability */}
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Bottom highlight bar with smooth expansion */}
                <motion.div 
                  className="mt-6 h-[1px] bg-gradient-to-r from-zinc-400/40 to-transparent dark:from-zinc-500/40"
                  initial={{ width: "3rem" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced button section with improved spacing and subtle decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-24 relative"
        >
          {/* Subtle divider above button */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-zinc-300/50 dark:via-zinc-600/50 to-transparent"></div>
          
          <Link href="/services">
            <Button
              className="rounded-full px-8 py-6 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-base font-semibold transition-all duration-300 group hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-zinc-100/5"
            >
              Explore All Services
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 