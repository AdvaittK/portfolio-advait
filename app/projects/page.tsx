"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, LayoutGrid, ArrowLeftRight, Github, Globe, Code2, Star, ChevronLeft, ChevronRight, Search, Filter, X } from "lucide-react"
import { PageContainer } from "@/components/layout/page-container"
import { Input } from "@/components/ui/input"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import Portal from "@/components/Portal";
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiFirebase, SiOpenai, SiFastapi, SiPytorch, SiJavascript, SiPython, SiNodedotjs, SiMongodb, SiPostgresql, SiDocker, SiVercel } from "react-icons/si";
import { Price } from "@/components/ui/price"

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
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllTags, setShowAllTags] = useState(false);
  // Use mobile detection hook
  const isMobile = useIsMobile();

  // Define projects array
  const projects: Project[] = [
    {
      id: "pulseboard-dashboard",
      title: "PulseBoard – Interactive Dashboard Frontend Showcase",
      description: "A modern, responsive dashboard UI with interactive charts, subscription flows, and a mock backend for demo purposes. Showcasing frontend design, state management, and UI component patterns.",
      longDescription: "PulseBoard is a sleek and responsive dashboard web application designed to demonstrate advanced frontend patterns and UI/UX principles. Built with Next.js 15, React 19, and TypeScript, it features dynamic charts, dark/light theme switching, and comprehensive UI components for dashboards, user profiles, and subscription management. Although it doesn't include real backend functionality, PulseBoard simulates API behavior using mock data and API utilities, allowing full interaction with charts, tables, and flows like login, registration, and subscription comparison. It's an ideal project for showcasing frontend skills and component-based architecture in a professional portfolio.",
      tags: ["Next.js", "React", "TypeScript", "TailwindCSS", "Shadcn", "Charts", "Mock Backend"],
      image: "/pulseboard.png",
      demoLink: "https://www.pulseboard.advaitt.tech/",
      githubLink: "https://github.com/AdvaittK/pulse-board-main",
      features: [
        "Responsive dashboard layouts with modern UI/UX",
        "Dynamic charts powered by mock data",
        "Theme switcher (dark/light mode)",
        "Subscription and pricing management UI",
        "Intuitive sidebar navigation and user profile interface",
        "Mock API layer simulating backend interaction"
      ],
      category: "Web Application / Dashboard UI",
      technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Shadcn", "Chart.js", "Zustand"],
      year: 2024
    },
    {
      id: "portfolio-website",
      title: "Advait | Web Developer Portfolio",
      description: "A modern, high-performance portfolio website showcasing my work, skills, and services as a frontend developer and UI designer.",
      longDescription: "This portfolio website is a fully custom, responsive web application built to highlight my expertise in frontend development, UI/UX design, and modern web technologies. It features animated transitions, a dynamic projects showcase, a services/pricing section, and a contact form. The site is optimized for performance, accessibility, and SEO, and includes integrations such as Vercel Analytics and Open Graph meta tags for rich social sharing. Designed and developed from scratch, it reflects my design sensibility and technical skills.",
      tags: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "Vercel", "Portfolio"],
      image: "/new_homepage.png",
      demoLink: "https://advaitt.tech",
      githubLink: "https://github.com/AdvaittK/portfolio-advait",
      features: [
        "Fully responsive, custom-designed UI",
        "Animated page transitions and interactive elements",
        "Dynamic projects and services sections",
        "SEO and social sharing optimized (Open Graph, Twitter Cards)",
        "Vercel Analytics integration",
        "Accessible and performant design",
        "Contact form and clear call-to-actions"
      ],
      category: "Portfolio Website",
      technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "Vercel"],
      year: 2024
    },
    {
      id: "kixkart-ecommerce",
      title: "KixKart – Premium Sneakers & Streetwear E-Commerce Platform",
      description: "Cyberpunk-inspired e-commerce platform specializing in premium sneakers and streetwear, built with Next.js, Tailwind, and advanced UI components.",
      longDescription: "KixKart is a modern, cyberpunk-themed e-commerce web application designed for sneakerheads and streetwear enthusiasts. It offers a visually striking interface and smooth shopping experience for users browsing high-end sneakers across categories like running, basketball, lifestyle, training, and exclusive drops. Built with Next.js 15 and styled using Tailwind CSS, the platform features category-based navigation, detailed product pages, a responsive shopping cart, a wishlist system, and user account management. Its frontend leverages advanced tools like Framer Motion for animations, shadcn/ui and Radix UI for sleek components, and form validation using React Hook Form and Zod. The project also includes newsletter subscription and toast notifications, bringing the feel of a premium online store.",
      tags: ["E-Commerce", "Next.js", "Tailwind CSS", "TypeScript", "Radix UI", "Shadcn UI", "Cyberpunk Design"],
      image: "/kixkart.png",
      demoLink: "https://www.kixkart.advaitt.tech/",
      githubLink: "https://github.com/AdvaittK/kixkart",
      features: [
        "Fully responsive e-commerce UI with shopping cart and wishlist",
        "Theme toggle for dark/light mode",
        "Browse by product categories (Running, Lifestyle, Basketball, etc.)",
        "Product pages with rich descriptions and visuals",
        "User authentication & account management",
        "Newsletter subscription & promotional alerts",
        "Cyberpunk-inspired UI with smooth animations and carousels"
      ],
      category: "Web Application / E-Commerce Platform",
      technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Radix UI", "shadcn/ui", "Framer Motion", "Embla Carousel", "Zod", "React Hook Form", "Lucide React", "Sonner"],
      year: 2025
    },
    {
      id: "json-generator",
      title: "JSON Generator – Smart JSON Generator & Editor",
      description: "AI-powered tool for creating, editing, and visualizing JSON files with ease. Supports code, visual, and intelligent AI editing modes.",
      longDescription: "JSONAI is a powerful, user-friendly platform designed to simplify JSON file creation and editing. Whether you're a developer crafting complex structures or a beginner learning JSON, JSONAI adapts to your needs. It features three interactive modes—code editor for hands-on coding, visual mode for drag-and-drop structure building, and an AI-powered assistant that can generate or modify JSON using natural language prompts. The intuitive interface, real-time preview, and error highlighting make JSONAI a versatile tool for building APIs, configuration files, and structured data.",
      tags: ["React", "JavaScript", "AI", "JSON", "TailwindCSS"],
      image: "/jsonge.png",
      demoLink: "https://www.jsongen.advaitt.tech/",
      githubLink: "https://github.com/AdvaittK/json-generator",
      features: [
        "Three editing modes: Code, Visual, and AI-driven",
        "Natural language to JSON conversion",
        "Syntax highlighting and error detection",
        "Real-time preview and auto-formatting",
        "Export/import functionality for .json files",
        "Dark/light theme toggle"
      ],
      category: "Web Application",
      technologies: ["React", "TailwindCSS", "OpenAI API", "Vite", "TypeScript"],
      year: 2025
    },
    {
      id: "symptolink-healthcare",
      title: "SymptoLink – AI-Powered Healthcare Assistant",
      description: "A smart healthcare web app offering AI-based symptom analysis, doctor search, and emergency access features, with Firebase integration and multilingual support.",
      longDescription: "SymptoLink is an intelligent healthcare platform that empowers users to understand their symptoms, explore possible diagnoses, locate nearby healthcare professionals, and access emergency resources. Built using Next.js, TypeScript, Firebase, and OpenAI, SymptoLink combines responsive design with real-world utility. The application features AI-powered symptom checking, secure authentication via Firebase, internationalization support, and an intuitive UI built with Shadcn components. Though primarily frontend-driven, SymptoLink integrates with Firestore and simulates backend interactions, making it a robust full-stack showcase for healthcare tech.",
      tags: ["Next.js", "React", "TypeScript", "Firebase", "OpenAI", "TailwindCSS", "Healthcare", "AI"],
      image: "/symptolink.png",
      demoLink: "https://www.symptolink.advaitt.tech/",
      githubLink: "https://github.com/AdvaittK/SymptoLink",
      features: [
        "AI-powered Symptom Checker using OpenAI",
        "Doctor Finder by location and specialty",
        "Emergency contact and resource access",
        "Secure authentication with Firebase Auth",
        "Multi-language support (i18n)",
        "Light/Dark theme switching",
        "Fully responsive across devices",
        "Mock backend integration for local testing"
      ],
      category: "Web Application / Healthcare",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Firebase", "Firestore", "OpenAI", "Vercel AI SDK", "React Context API", "pnpm"],
      year: 2025
    },
    {
      id: "truthsense-lie-detection",
      title: "TruthSense – Lie Detection System",
      description: "An AI-driven lie detection system that analyzes facial expressions, voice stress, and micro-gestures using a CNN-LSTM model.",
      longDescription: "TruthSense is a cutting-edge deception detection platform that uses deep learning to analyze video inputs for signs of lying. By combining Convolutional Neural Networks (CNNs) with Long Short-Term Memory (LSTM) networks, the system evaluates both spatial and temporal features, such as facial micro-expressions, vocal stress levels, and body movements. The frontend is developed using Next.js and Tailwind CSS, providing a sleek, responsive interface, while the backend is powered by FastAPI, PyTorch, OpenCV, and Librosa for deep behavior analysis. Users can upload videos, train custom models, and view detailed feature-level breakdowns of deception indicators. Though not intended for legal or diagnostic purposes, TruthSense offers a compelling research and educational tool in behavioral analysis.",
      tags: ["AI", "CNN-LSTM", "Computer Vision", "Next.js", "FastAPI", "PyTorch", "TailwindCSS", "Lie Detection", "Audio Processing"],
      image: "/ts.png",
      demoLink: "https://www.truthsense.advaitt.tech/",
      githubLink: "https://github.com/AdvaittK/TruthSense",
      features: [
        "Upload and analyze videos for signs of deception",
        "CNN-LSTM model trained for micro-expression and vocal analysis",
        "Fast video/audio processing with breakdown of detected cues",
        "Feature-wise deception analysis report",
        "Responsive UI with modern design components",
        "Docker support for backend containerization"
      ],
      category: "AI Research Tool / Behavioral Analysis",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "FastAPI", "PyTorch", "OpenCV", "Librosa", "Docker"],
      year: 2025
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
    const matchesFilter =
      !activeFilter ||
      project.tags.includes(activeFilter) ||
      project.category === activeFilter ||
      (project.technologies && project.technologies.includes(activeFilter));
    return matchesSearch && matchesFilter;
  });

  // Define a metallic button for grid view only
  const MetallicGridButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
    <Button
      onClick={onClick}
      className="rounded-full px-6 py-2 bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300 dark:from-zinc-600 dark:via-zinc-500 dark:to-zinc-600 text-zinc-800 dark:text-zinc-100 shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-gradient-to-br hover:from-zinc-100 hover:to-zinc-400 hover:dark:from-zinc-700 hover:dark:to-zinc-400 transition-all duration-300 hover:scale-105 font-semibold"
      style={{ fontWeight: 600 }}
    >
      {children}
    </Button>
  );

  const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
    // Lock background scroll when modal is open
    useEffect(() => {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, []);

    // Shorten description if too long
    const shortDescription = project.longDescription.length > 220
      ? project.longDescription.slice(0, 210) + '...'
      : project.longDescription;

    // Show only first 4 features
    const featuresToShow = project.features.slice(0, 4);

    // Updated technology icon mapping with colorful icons
    const getTechnologyIcon = (tech: string) => {
      const techLower = tech.toLowerCase();
      if (techLower.includes('next')) return <SiNextdotjs className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white" />;
      if (techLower.includes('react')) return <SiReact className="w-4 h-4 sm:w-5 sm:h-5 text-[#61DAFB]" />;
      if (techLower.includes('typescript')) return <SiTypescript className="w-4 h-4 sm:w-5 sm:h-5 text-[#3178C6]" />;
      if (techLower.includes('tailwind')) return <SiTailwindcss className="w-4 h-4 sm:w-5 sm:h-5 text-[#06B6D4]" />;
      if (techLower.includes('firebase')) return <SiFirebase className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFCA28]" />;
      if (techLower.includes('openai')) return <SiOpenai className="w-4 h-4 sm:w-5 sm:h-5 text-[#412991]" />;
      if (techLower.includes('fastapi')) return <SiFastapi className="w-4 h-4 sm:w-5 sm:h-5 text-[#009688]" />;
      if (techLower.includes('pytorch')) return <SiPytorch className="w-4 h-4 sm:w-5 sm:h-5 text-[#EE4C2C]" />;
      if (techLower.includes('javascript')) return <SiJavascript className="w-4 h-4 sm:w-5 sm:h-5 text-[#F7DF1E]" />;
      if (techLower.includes('python')) return <SiPython className="w-4 h-4 sm:w-5 sm:h-5 text-[#3776AB]" />;
      if (techLower.includes('node')) return <SiNodedotjs className="w-4 h-4 sm:w-5 sm:h-5 text-[#339933]" />;
      if (techLower.includes('mongodb')) return <SiMongodb className="w-4 h-4 sm:w-5 sm:h-5 text-[#47A248]" />;
      if (techLower.includes('postgresql')) return <SiPostgresql className="w-4 h-4 sm:w-5 sm:h-5 text-[#336791]" />;
      if (techLower.includes('docker')) return <SiDocker className="w-4 h-4 sm:w-5 sm:h-5 text-[#2496ED]" />;
      if (techLower.includes('vercel')) return <SiVercel className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white" />;
      return <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />;
    };

    return (      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-[100] flex items-center justify-center ${isMobile ? 'p-1' : 'p-2'} sm:p-4 bg-black/50 backdrop-blur-sm overflow-y-auto overflow-x-hidden`}
        onClick={onClose}
      >          <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`relative ${isMobile ? 'w-[94%]' : 'w-[95%]'} xs:w-[90%] sm:w-full max-w-3xl my-4 bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-zinc-200/50 dark:border-zinc-700/50 overflow-hidden`}
          onClick={e => e.stopPropagation()}
          style={{ maxHeight: isMobile ? '85vh' : '90vh' }}
        >
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/95 text-black hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={onClose}
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          <div className={`p-${isMobile ? '3' : '4'} sm:p-6 md:p-8 overflow-y-auto w-full`} style={{ maxHeight: `calc(${isMobile ? '85vh' : '90vh'} - 2rem)` }}>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 pr-8">
                {project.title}
              </h3>
              {project.stats && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {project.stats.stars}
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 mb-4 sm:mb-6">
              {shortDescription}
            </p>

            <div className="mb-4 sm:mb-6">
              <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                <Code2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" /> Key Features
              </h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {featuresToShow.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-1.5 sm:mt-2 mr-1.5 sm:mr-2 md:mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4 sm:mb-6">
              <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                <Code2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" /> Technologies Used
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                {project.technologies?.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm hover:scale-105 transition-transform duration-200"
                  >
                    {getTechnologyIcon(tech)}
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 text-xs px-1.5 sm:px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
            </div>            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                className={`flex-1 rounded-full bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm md:text-base ${isMobile ? 'py-1.5 px-3' : 'py-2'} sm:py-3`}
                onClick={() => window.open(project.demoLink, '_blank')}
              >
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2" /> Live Demo
              </Button>
              {project.githubLink && (
                <Button
                  className={`flex-1 rounded-full bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm md:text-base ${isMobile ? 'py-1.5 px-3' : 'py-2'} sm:py-3`}
                  onClick={() => window.open(project.githubLink, '_blank')}
                >
                  <Github className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2" /> Source Code
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
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
                    variant={activeFilter === null ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveFilter(null)}
                    className="rounded-full flex items-center gap-1"
                  >
                    All Projects
                  </Button>
                </div>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 xs:gap-4 justify-start py-2 items-center">
              {/* Show limited or all categories/tags based on showAllTags */}
              {categories.concat(allTags).slice(0, showAllTags ? categories.length + allTags.length : 8).map((item) => (
                <Button
                  key={item}
                  variant={activeFilter === item ? "default" : "outline"}
                  onClick={() => setActiveFilter(item)}
                  className="rounded-full"
                >
                  {item}
                </Button>
              ))}
              {(categories.length + allTags.length) > 8 && (
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setShowAllTags((prev) => !prev)}
                >
                  {showAllTags ? "Show Less" : "Show More"}
                </Button>
              )}
            </div>
          </motion.div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
            {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative group h-full"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* View Details Button - Now only on image */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                      <Button
                        onClick={() => setSelectedProject(project)}
                        className="bg-white/95 dark:bg-zinc-800/95 text-zinc-800 dark:text-zinc-100 hover:bg-white dark:hover:bg-zinc-800 shadow-lg px-6 py-2 rounded-full font-medium text-sm"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-4 xs:p-5 flex-1 flex flex-col">
                    <h3 className="text-base xs:text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-100">
                      {project.title}
                    </h3>
                    <p className="text-xs xs:text-sm text-zinc-600 dark:text-zinc-400 mb-3 xs:mb-4 line-clamp-2 flex-1">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 xs:gap-2 mb-3 xs:mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge
                          variant="outline"
                          className="bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5"
                        >
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      <Button
                        size="sm"
                        className="flex-1 rounded-full px-2 xs:px-3 py-1 xs:py-1.5 bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300 dark:from-zinc-600 dark:via-zinc-500 dark:to-zinc-600 text-zinc-800 dark:text-zinc-100 text-[10px] xs:text-xs shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-gradient-to-br hover:from-zinc-100 hover:to-zinc-400 hover:dark:from-zinc-700 hover:dark:to-zinc-400 transition-all duration-300"
                        onClick={() => window.open(project.demoLink, '_blank')}
                      >
                        View Demo <ExternalLink className="w-2.5 h-2.5 xs:w-3 xs:h-3 ml-1" />
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 rounded-full px-2 xs:px-3 py-1 xs:py-1.5 bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300 dark:from-zinc-600 dark:via-zinc-500 dark:to-zinc-600 text-zinc-800 dark:text-zinc-100 text-[10px] xs:text-xs shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-gradient-to-br hover:from-zinc-100 hover:to-zinc-400 hover:dark:from-zinc-700 hover:dark:to-zinc-400 transition-all duration-300"
                        onClick={() => window.open(project.githubLink, '_blank')}
                      >
                        View Code <Github className="w-2.5 h-2.5 xs:w-3 xs:h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        
        </div>

        {/* Let's Grow Together Section */}
        <div className="w-full flex flex-col items-center justify-center mt-16 md:mt-24 mb-8 px-4">
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
                <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-600 text-zinc-800 dark:text-zinc-100 text-sm font-semibold shadow-sm border border-zinc-200/50 dark:border-zinc-700/50">
                  Starting from <Price inr={9999} usd={299} suffix="" />
                </div>
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
                <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-600 text-zinc-800 dark:text-zinc-100 text-sm font-semibold shadow-sm border border-zinc-200/50 dark:border-zinc-700/50">
                  Starting from <Price inr={24999} usd={549} suffix="" />
                </div>
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
      <AnimatePresence>
        {selectedProject && (
          <Portal>
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
} 