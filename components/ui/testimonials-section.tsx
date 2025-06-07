import { motion } from "framer-motion"
import { Quote, ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./button"

const testimonials = [
  {
    name: "Dem",
    role: "Professional Thumbnail Designer",
    image: "/dem.webp",
    content: "Advait did an amazing job creating my website! He's super passionate about his work and delivered exactly what I wanted. Communication was quick and friendly, and the entire process was faster than expected. I'm totally happy with the result... highly recommended!",
    projectLink: "https://www.dems8.com/"
  },
  {
    name: "Lalith Kumar",
    role: "Owner, Royal Sarees",
    image: "/royal.png",
    content: "Advait did a fantastic job with our Royal Sarees website. He understood exactly what we needed and delivered a clean, elegant design that really showcases our brand. Super easy to work with and very professional throughout.",
    projectLink: "https://royalsarees.advaitt.tech/"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Remove background elements */}
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
            <span className="px-4 text-sm font-medium tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">Testimonials</span>
            <span className="h-[1px] w-10 bg-gradient-to-r from-zinc-600/60 to-zinc-400/60 dark:from-zinc-300/60 dark:to-zinc-500/60"></span>
          </div>

          <h2
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-300 leading-tight"
          >
            What My Clients Say
          </h2>

          <p
            className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed mb-6"
          >
            Hear what some of my clients have to say about their experience working with me
          </p>

          <div className="flex justify-center">
            <div className="h-[3px] w-24 bg-gradient-to-r from-zinc-300/60 via-zinc-500/80 to-zinc-300/60 dark:from-zinc-600/60 dark:via-zinc-400/80 dark:to-zinc-600/60 rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative h-full"
            >
              <div className="relative backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-sm dark:hover:shadow-zinc-900/10 h-full flex flex-col">
                {/* Enhanced gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80"
                  initial={{ opacity: 0.9 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Border and shadow effects */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 dark:from-white/10 dark:to-black/10" />
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
                  <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-200/80 dark:via-zinc-700/80 to-transparent" />
                </div>

                <div className="p-8 relative z-10 flex flex-col h-full">
                  {/* Enhanced quote icon with gradient */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-2.5 shadow-md">
                      <Quote className="w-full h-full text-zinc-100" />
                    </div>
                  </div>

                  {/* Testimonial content with enhanced typography */}
                  <p className="text-zinc-700 dark:text-zinc-400 text-lg leading-relaxed mb-8 flex-grow font-medium">
                    {testimonial.content}
                  </p>

                  {/* Author info and button with enhanced layout */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-4 ring-2 ring-zinc-200/50 dark:ring-zinc-700/50">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-zinc-800 dark:text-zinc-100">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <a 
                      href={testimonial.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        className="w-full rounded-full px-6 py-3 bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-sm font-semibold transition-all duration-300 group hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-zinc-100/5"
                      >
                        View Project
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 