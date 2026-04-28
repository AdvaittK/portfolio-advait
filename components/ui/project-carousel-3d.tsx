"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Badge } from './badge'
import { Button } from './button'
import { ExternalLink, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./carousel"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  image: string
  demoLink: string
  githubLink: string
  features: string[]
  showSourceCode?: boolean
}

interface ProjectCarousel3DProps {
  projects: Project[]
  onSelect: (project: Project) => void
}

export function ProjectCarousel3D({ projects, onSelect }: ProjectCarousel3DProps) {
  const [desktopApi, setDesktopApi] = useState<CarouselApi>()
  const [mobileApi, setMobileApi] = useState<CarouselApi>()
  const [desktopCurrent, setDesktopCurrent] = useState(0)
  const [mobileCurrent, setMobileCurrent] = useState(0)
  const [desktopCount, setDesktopCount] = useState(0)
  const [mobileCount, setMobileCount] = useState(0)

  useEffect(() => {
    if (!desktopApi) return
    setDesktopCount(desktopApi.scrollSnapList().length)
    setDesktopCurrent(desktopApi.selectedScrollSnap())
    desktopApi.on("select", () => {
      setDesktopCurrent(desktopApi.selectedScrollSnap())
    })
  }, [desktopApi])

  useEffect(() => {
    if (!mobileApi) return
    setMobileCount(mobileApi.scrollSnapList().length)
    setMobileCurrent(mobileApi.selectedScrollSnap())
    mobileApi.on("select", () => {
      setMobileCurrent(mobileApi.selectedScrollSnap())
    })
  }, [mobileApi])

  const ProjectCard = ({ project }: { project: Project }) => (
    <div
      onClick={() => onSelect(project)}
      className="group flex flex-col h-full w-full bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl overflow-hidden shadow-lg ring-1 ring-zinc-200/50 dark:ring-zinc-700/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Image with 16:9 aspect ratio */}
      <div className="relative w-full pt-[56.25%] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="absolute inset-0 w-full h-full object-cover"
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
        />
        {/* Hover overlay with View Project CTA */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-zinc-100 text-sm font-semibold shadow-lg backdrop-blur-sm scale-95 group-hover:scale-100 transition-transform duration-300">
            View Project
            <ExternalLink className="w-4 h-4" />
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 my-4">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-zinc-200/50 dark:border-zinc-700/50 px-2 py-0.5 text-xs"
            >
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge
              variant="outline"
              className="bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-zinc-200/50 dark:border-zinc-700/50 px-2 py-0.5 text-xs"
            >
              +{project.tags.length - 3} more
            </Badge>
          )}
        </div>

        <div className="space-y-2 mb-4">
          {project.features.slice(0, 2).map((feature, idx) => (
            <div key={idx} className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mr-2 flex-shrink-0" />
              <span className="line-clamp-1">{feature}</span>
            </div>
          ))}
        </div>

        <Button
          size="sm"
          className="w-full mt-auto bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 hover:from-zinc-700 hover:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-700 text-zinc-100 border-0 transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation()
            onSelect(project)
          }}
        >
          {project.showSourceCode === false || !project.githubLink
            ? "View Website"
            : "View Demo"}{" "}
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )

  return (
    <div className="w-full relative py-6">
      <div className="relative max-w-7xl mx-auto">
        {/* Desktop Carousel - 3 cards visible */}
        <div className="hidden md:block">
          <div className="overflow-hidden w-full">
            <Carousel
              setApi={setDesktopApi}
              opts={{
                align: "start",
                slidesToScroll: 1,
                loop: false,
                dragFree: true,
                containScroll: "trimSnaps",
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {projects.map((project) => (
                  <CarouselItem
                    key={project.id}
                    className="pl-4 basis-1/3 min-w-0 flex-shrink-0"
                  >
                    <ProjectCard project={project} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          {/* Desktop Navigation Arrows */}
          <div className="flex justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
              disabled={desktopCurrent === 0}
              onClick={() => desktopApi?.scrollPrev()}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
              disabled={desktopCurrent === desktopCount - 1}
              onClick={() => desktopApi?.scrollNext()}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Carousel - 1 card visible */}
        <div className="md:hidden">
          <div className="overflow-hidden w-full">
            <Carousel
              setApi={setMobileApi}
              opts={{
                align: "start",
                slidesToScroll: 1,
                loop: false,
                dragFree: true,
                containScroll: "trimSnaps",
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {projects.map((project) => (
                  <CarouselItem
                    key={project.id}
                    className="pl-2 basis-full min-w-0 flex-shrink-0"
                  >
                    <ProjectCard project={project} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          {/* Mobile Navigation Arrows */}
          <div className="flex justify-center mt-6 space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
              disabled={mobileCurrent === 0}
              onClick={() => mobileApi?.scrollPrev()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
              disabled={mobileCurrent === mobileCount - 1}
              onClick={() => mobileApi?.scrollNext()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-10 sm:mt-12">
        <Link href="/projects">
          <Button className="rounded-full px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-sm sm:text-base font-semibold transition-all duration-200 group">
            View All Projects
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
