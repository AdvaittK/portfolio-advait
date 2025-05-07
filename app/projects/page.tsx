"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, LayoutGrid, ArrowLeftRight } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, Globe, Github } from "lucide-react"

// Define project type
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  demoLink: string;
  githubLink: string;
  features: string[];
}

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Define projects array
  const projects: Project[] = [
    {
      id: "immersive-dashboard",
      title: "Immersive Dashboard",
      description: "A beautiful analytics dashboard with real-time data visualization and interactive charts.",
      longDescription: "This dashboard application provides business intelligence through interactive visualizations. It features real-time data updates, customizable widgets, and comprehensive reporting tools for making data-driven decisions.",
      tags: ["React", "D3.js", "Tailwind CSS", "Firebase"],
      image: "/placeholder.svg?height=600&width=800",
      demoLink: "https://dashboard-demo.com",
      githubLink: "https://github.com/yourusername/dashboard",
      features: [
        "Real-time data synchronization",
        "Interactive drag-and-drop interface",
        "Customizable dashboard widgets",
        "Export reports as PDF"
      ]
    },
    {
      id: "ecommerce-platform",
      title: "E-Commerce Platform",
      description: "A modern e-commerce platform with seamless checkout experience and product recommendations.",
      longDescription: "This full-featured e-commerce platform delivers a premium shopping experience with product recommendation algorithms, secure payment processing, and a responsive design that works flawlessly across all devices.",
      tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
      image: "/placeholder.svg?height=600&width=800",
      demoLink: "https://ecom-demo.com",
      githubLink: "https://github.com/yourusername/ecommerce",
      features: [
        "AI-powered product recommendations",
        "Secure payment processing",
        "Inventory management system",
        "Customer reviews and ratings"
      ]
    },
    {
      id: "ai-content-generator",
      title: "AI Content Generator",
      description: "An AI-powered content generator that creates high-quality articles and social media posts.",
      longDescription: "Leveraging advanced machine learning algorithms, this tool helps marketers and content creators produce engaging content at scale. It can generate articles, social media posts, and even email campaigns with minimal human input.",
      tags: ["Python", "OpenAI", "React", "MongoDB"],
      image: "/placeholder.svg?height=600&width=800",
      demoLink: "https://ai-writer-demo.com",
      githubLink: "https://github.com/yourusername/ai-writer",
      features: [
        "Natural language processing capabilities",
        "Content optimization for SEO",
        "Multiple content formats support",
        "Tone and style customization"
      ]
    },
  ]

  // All unique tags from projects for filtering
  const allTags: string[] = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).sort();
  
  const filteredProjects = activeFilter 
    ? projects.filter(project => project.tags.includes(activeFilter))
    : projects;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-12 text-center"
        >
          Featured Projects
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {/* View toggle */}
            <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-full p-1 mb-4 mx-auto">
              <Button
                variant={viewMode === 'grid' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-full flex items-center gap-1"
              >
                <LayoutGrid className="w-4 h-4" /> Grid
              </Button>
              <Button
                variant={viewMode === 'carousel' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('carousel')}
                className="rounded-full flex items-center gap-1"
              >
                <ArrowLeftRight className="w-4 h-4" /> Carousel
              </Button>
            </div>
            
            {/* Filter buttons */}
            <Button
              variant={activeFilter === null ? "default" : "outline"}
              onClick={() => setActiveFilter(null)}
              className="rounded-full"
            >
              All Projects
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={activeFilter === tag ? "default" : "outline"}
                onClick={() => setActiveFilter(tag)}
                className="rounded-full"
              >
                {tag}
              </Button>
            ))}
          </div>
        </motion.div>

        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="relative overflow-hidden aspect-video">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        className="rounded-full bg-white/90 text-black hover:bg-white"
                        onClick={() => setSelectedProject(project)}
                      >
                        View Details <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
                {filteredProjects.map((project, index) => (
                  <div key={index} className="min-w-full">
                    <div className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                      <div className="relative overflow-hidden aspect-video">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button
                            size="sm"
                            className="rounded-full bg-white/90 text-black hover:bg-white"
                            onClick={() => setSelectedProject(project)}
                          >
                            View Details <ExternalLink className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Project detail modal */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{selectedProject?.title}</DialogTitle>
              <DialogDescription className="text-base mt-2">{selectedProject?.longDescription}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <div className="rounded-xl overflow-hidden">
                <img
                  src={selectedProject?.image}
                  alt={selectedProject?.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-purple-500" /> Key Features
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                  {selectedProject?.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="min-w-4 h-4 mt-1 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedProject?.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  onClick={() => window.open(selectedProject?.demoLink, "_blank")}
                  className="flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" /> View Live Demo
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(selectedProject?.githubLink, "_blank")}
                  className="flex items-center gap-2"
                >
                  <Github className="w-4 h-4" /> View Source Code
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 