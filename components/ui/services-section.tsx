import { Code2, Layout, Server, LineChart, Shield, Database } from "lucide-react"
import { Button } from "./button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const services = [
  {
    title: "Full Stack Development",
    description: "End-to-end web application development using modern technologies and best practices.",
    icon: Code2,
  },
  {
    title: "Frontend Development",
    description: "Creating beautiful, responsive, and performant user interfaces.",
    icon: Layout,
  },
  {
    title: "Backend Development",
    description: "Robust server-side solutions with scalable architecture.",
    icon: Server,
  },
  {
    title: "CRM Dashboard",
    description: "Custom CRM solutions that streamline business operations.",
    icon: Database,
  },
  {
    title: "SEO & Performance",
    description: "Improve your website's visibility and performance.",
    icon: LineChart,
  },
  {
    title: "Security Solutions",
    description: "Implement robust security measures for your applications.",
    icon: Shield,
  }
]

export function ServicesSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Professional Services
          </motion.h2>
          <motion.p 
            className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Transforming ideas into exceptional digital experiences with cutting-edge technology and innovative solutions
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            }
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 18 } },
                hover: { scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } }
              }}
              whileHover="hover"
              className="group relative bg-gradient-to-br from-zinc-50/50 to-zinc-100/50 dark:from-zinc-800/50 dark:to-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50"
            >
              {/* Enhanced metallic effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 dark:from-white/10 dark:to-black/10" />
              {/* Metallic border effects */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
              {/* Corner metallic accents */}
              <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-zinc-200/50 to-transparent dark:from-zinc-700/50 rounded-br-2xl" />
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-zinc-200/50 to-transparent dark:from-zinc-700/50 rounded-bl-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-zinc-200/50 to-transparent dark:from-zinc-700/50 rounded-tr-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-zinc-200/50 to-transparent dark:from-zinc-700/50 rounded-tl-2xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-3 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <service.icon className="w-full h-full text-zinc-100" />
                </div>
                <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                  {service.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Link href="/services">
            <Button
              className="rounded-full px-8 py-6 bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 hover:from-zinc-700 hover:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-700 text-zinc-100 border-0 shadow-lg transition-all duration-200 group"
            >
              Explore Services
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 