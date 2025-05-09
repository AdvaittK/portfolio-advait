"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, LayoutGrid, ArrowLeftRight, Github, Globe, Code2, Star, ChevronLeft, ChevronRight, Search, Filter } from "lucide-react"
import { PageContainer } from "@/components/layout/page-container"
import { Input } from "@/components/ui/input"

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
  stats?: {
    stars?: number;
    forks?: number;
    views?: number;
  };
  category?: string;
  technologies?: string[];
  year?: number;
}

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

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
      ],
      stats: {
        stars: 245,
        forks: 89,
        views: 1200
      },
      category: "Web Application",
      technologies: ["React", "TypeScript", "D3.js", "Firebase", "Tailwind CSS"],
      year: 2024
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
      ],
      stats: {
        stars: 189,
        forks: 45,
        views: 950
      },
      category: "E-Commerce",
      technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
      year: 2023
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
      ],
      stats: {
        stars: 312,
        forks: 156,
        views: 2100
      },
      category: "AI/ML",
      technologies: ["Python", "OpenAI", "React", "MongoDB", "FastAPI"],
      year: 2024
    },
  ]

  // All unique tags from projects for filtering
  const allTags: string[] = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).sort();

  // Categories for filtering
  const categories = Array.from(
    new Set(projects.map(project => project.category))
  ).filter(Boolean) as string[];
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = !activeFilter || project.tags.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  // Auto-play carousel
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying && viewMode === 'carousel') {
      interval = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % filteredProjects.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, viewMode, filteredProjects.length]);

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
            Featured Projects
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Explore my latest work and personal projects. Each project showcases different aspects of my skills and expertise.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 mb-12"
        >
          {/* Search and View Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col xs:flex-row items-center gap-4 w-full sm:w-auto">
              <div className="relative w-full xs:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full xs:w-[300px]"
                />
              </div>
              <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-full p-1 w-full xs:w-auto justify-center">
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
            </div>
            {viewMode === 'carousel' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="rounded-full"
              >
                {isAutoPlaying ? "Pause" : "Auto Play"}
              </Button>
            )}
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 xs:gap-4 justify-center">
            <Button
              variant={activeFilter === null ? "default" : "outline"}
              onClick={() => setActiveFilter(null)}
              className="rounded-full"
            >
              All Projects
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="bg-gradient-to-br from-zinc-50/50 to-zinc-100/50 dark:from-zinc-800/50 dark:to-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50 h-full">
                  <div className="relative overflow-hidden aspect-video">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="rounded-full bg-white/90 text-black hover:bg-white flex-1"
                          onClick={() => window.open(project.demoLink, '_blank')}
                        >
                          <Globe className="w-4 h-4 mr-2" /> Live Demo
                        </Button>
                        <Button
                          size="sm"
                          className="rounded-full bg-white/90 text-black hover:bg-white flex-1"
                          onClick={() => window.open(project.githubLink, '_blank')}
                        >
                          <Github className="w-4 h-4 mr-2" /> Source Code
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                        {project.title}
                      </h3>
                      {project.stats && (
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            {project.stats.stars}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover Info Tab */}
                <AnimatePresence>
                  {hoveredProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-0 left-0 right-0 bg-white dark:bg-zinc-800 rounded-t-2xl shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 p-6 z-30"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold">Project Details</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full"
                          onClick={() => setHoveredProject(null)}
                        >
                          <Code2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {project.longDescription}
                        </p>
                        <div>
                          <h5 className="text-sm font-medium mb-2">Key Features:</h5>
                          <ul className="space-y-2">
                            {project.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {project.stats && (
                          <div className="flex items-center gap-4 pt-2 border-t border-zinc-200/50 dark:border-zinc-700/50">
                            <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                              <Star className="w-4 h-4 mr-1" />
                              {project.stats.stars} stars
                            </div>
                            <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                              <Code2 className="w-4 h-4 mr-1" />
                              {project.stats.forks} forks
                            </div>
                            <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                              <Globe className="w-4 h-4 mr-1" />
                              {project.stats.views} views
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="relative h-[600px] perspective-1000">
            <div className="absolute inset-0 flex items-center justify-center">
              {filteredProjects.map((project, index) => {
                const isActive = index === carouselIndex;
                const isNext = index === (carouselIndex + 1) % filteredProjects.length;
                const isPrev = index === (carouselIndex - 1 + filteredProjects.length) % filteredProjects.length;
                
                return (
                  <motion.div
                    key={project.id}
                    className="absolute w-full max-w-2xl"
                    initial={false}
                    animate={{
                      scale: isActive ? 1 : 0.85,
                      rotateY: isActive ? 0 : isNext ? 45 : -45,
                      x: isActive ? 0 : isNext ? "60%" : "-60%",
                      z: isActive ? 0 : -200,
                      opacity: isActive ? 1 : 0.3,
                      filter: isActive ? "none" : "blur(1px)",
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="bg-gradient-to-br from-zinc-50/50 to-zinc-100/50 dark:from-zinc-800/50 dark:to-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 transform-gpu">
                      <div className="relative overflow-hidden aspect-video">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="rounded-full bg-white/90 text-black hover:bg-white flex-1"
                              onClick={() => window.open(project.demoLink, '_blank')}
                            >
                              <Globe className="w-4 h-4 mr-2" /> Live Demo
                            </Button>
                            <Button
                              size="sm"
                              className="rounded-full bg-white/90 text-black hover:bg-white flex-1"
                              onClick={() => window.open(project.githubLink, '_blank')}
                            >
                              <Github className="w-4 h-4 mr-2" /> Source Code
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                          {project.title}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Carousel Navigation */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/90 text-black hover:bg-white pointer-events-auto ml-4"
                onClick={prevSlide}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/90 text-black hover:bg-white pointer-events-auto mr-4"
                onClick={nextSlide}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Let's Grow Together Section */}
      <div className="w-full flex flex-col items-center justify-center mt-24 mb-8 px-4">
        <div className="w-full max-w-3xl relative rounded-2xl shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm p-8 md:p-14 flex flex-col items-center">
          {/* Subtle gradient overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{background: 'radial-gradient(ellipse at 60% 0%,rgba(255,255,255,0.15) 0%,rgba(255,255,255,0.00) 60%)'}} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-600 text-zinc-800 dark:text-zinc-100 text-sm font-semibold shadow-sm border border-zinc-200/50 dark:border-zinc-700/50">
              Let's Connect
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 leading-tight md:leading-[1.15] bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-[#e0e7ef] dark:to-white whitespace-normal break-words drop-shadow-md dark:drop-shadow-[0_4px_32px_rgba(255,255,255,0.25)] relative"
              style={{
                textShadow: '0 2px 16px rgba(0,0,0,0.10)',
                filter: 'drop-shadow(0 2px 16px rgba(255,255,255,0.10))',
              }}
            >
              <span className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true"
                style={{
                  background: 'radial-gradient(ellipse at 50% 60%,rgba(255,255,255,0.10) 0%,rgba(0,0,0,0.00) 70%)',
                  filter: 'blur(8px)',
                  borderRadius: 'inherit',
                }}
              />
              {"Let's "}
              <span className="font-extrabold">Grow</span>{" "}
              <span className="whitespace-normal">Together</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Transform your ideas into reality with our comprehensive web development solutions
            </p>
          </motion.div>

          <div className="w-full space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-xl bg-gradient-to-br from-zinc-50/50 to-zinc-100/50 dark:from-zinc-800/50 dark:to-zinc-900/50 border border-zinc-200/50 dark:border-zinc-700/50"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                  Simple Web Design
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Showcasing sleek, high-performance designs tailored for impact
                </p>
              </div>
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-600 text-zinc-800 dark:text-zinc-100 text-sm font-semibold shadow-sm border border-zinc-200/50 dark:border-zinc-700/50">
                Starting from $299
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-xl bg-gradient-to-br from-zinc-50/50 to-zinc-100/50 dark:from-zinc-800/50 dark:to-zinc-900/50 border border-zinc-200/50 dark:border-zinc-700/50"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                  Full Stack Development
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Building visually stunning, user-focused websites that elevate brands
                </p>
              </div>
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-600 text-zinc-800 dark:text-zinc-100 text-sm font-semibold shadow-sm border border-zinc-200/50 dark:border-zinc-700/50">
                Starting from $549
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mt-8 w-full"
          >
            <Button
              className="flex-1 rounded-full px-8 py-6 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-base font-semibold transition-all duration-200"
              onClick={() => window.location.href = '/projects'}
            >
              See All Projects
            </Button>
            <Button
              className="flex-1 rounded-full px-8 py-6 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-base font-semibold transition-all duration-200"
              onClick={() => window.location.href = '/contact'}
            >
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  )
} 