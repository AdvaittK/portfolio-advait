"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./dialog";
import { Badge } from "./badge";
import { Button } from "./button";
import { ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

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

interface ProjectCarouselModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
}

export function ProjectCarouselModal({ open, onOpenChange, project }: ProjectCarouselModalProps) {
  if (!project) return null;
  
  // Detect small screens for responsive adjustments
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Only prevent scroll when modal is open
    if (open) {
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      // Restore scroll when modal closes
      document.body.style.overflow = "";
    };
  }, [open]); // Add open to dependency array

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "z-[1000] sm:max-w-lg w-[92%] xs:w-[95%] sm:w-full h-auto max-h-[92vh] xs:max-h-[90vh] sm:max-h-[85vh] p-0",
        "rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700",
        "bg-gradient-to-br from-zinc-50/95 via-zinc-100/95 to-zinc-50/95 dark:from-zinc-800/95 dark:via-zinc-900/95 dark:to-zinc-800/95",
        "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto my-auto shadow-xl"
      )}>
        <DialogClose className="absolute right-3 xs:right-4 top-3 xs:top-4 z-50">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 xs:h-8 xs:w-8 rounded-full bg-zinc-200/80 dark:bg-zinc-800/80 backdrop-blur-sm hover:bg-zinc-300 dark:hover:bg-zinc-700"
          >
            <X className="h-3 w-3 xs:h-4 xs:w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogClose>

        <div className="p-3 xs:p-4 sm:p-5 overflow-y-auto max-h-[85vh] sm:max-h-[80vh] scrollbar-thin">
          <DialogHeader className="mb-2 sm:mb-3">
            <DialogTitle className="text-base xs:text-lg sm:text-2xl font-bold pr-6 sm:pr-8 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 leading-tight">
              {project.title}
            </DialogTitle>
          </DialogHeader>
          {/* Project Image */}
          <div className="mb-3 xs:mb-4 sm:mb-5 w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-inner">
            <div className="relative pt-[56.25%]">
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/5 dark:to-white/5 pointer-events-none" />
            </div>
          </div>
          
          <p className="text-xs xs:text-sm md:text-base text-zinc-600 dark:text-zinc-400 mb-3 xs:mb-4">
            {project.longDescription}
          </p>
          
          <div className="mb-3 xs:mb-4">
            <h4 className="font-semibold text-xs sm:text-base mb-1 xs:mb-2 flex items-center">
              Key Features
            </h4>
            <ul className="list-disc pl-4 xs:pl-5 space-y-1 text-[10px] xs:text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              {project.features.slice(0, 4).map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-1 xs:gap-2 mb-3 xs:mb-4">
            {project.tags.map(tag => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-col xs:flex-row gap-2 w-full mt-2">
            <Button
              size="sm"
              className={cn(
                "flex-1 rounded-full px-2 xs:px-3 sm:px-6 py-1 xs:py-1.5 sm:py-2",
                "bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300 dark:from-zinc-600 dark:via-zinc-500 dark:to-zinc-600",
                "text-zinc-800 dark:text-zinc-100 text-[10px] xs:text-xs sm:text-sm md:text-base",
                "shadow-lg border border-zinc-200/50 dark:border-zinc-700/50",
                "hover:bg-gradient-to-br hover:from-zinc-100 hover:to-zinc-400 hover:dark:from-zinc-700 hover:dark:to-zinc-400",
                "transition-all duration-300 font-semibold"
              )}
              onClick={() => window.open(project.demoLink, '_blank')}
            >
              View Demo <ExternalLink className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 ml-1 xs:ml-1.5 sm:ml-2" />
            </Button>
            <Button
              size="sm" 
              className={cn(
                "flex-1 rounded-full px-2 xs:px-3 sm:px-6 py-1 xs:py-1.5 sm:py-2",
                "bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300 dark:from-zinc-600 dark:via-zinc-500 dark:to-zinc-600",
                "text-zinc-800 dark:text-zinc-100 text-[10px] xs:text-xs sm:text-sm md:text-base",
                "shadow-lg border border-zinc-200/50 dark:border-zinc-700/50",
                "hover:bg-gradient-to-br hover:from-zinc-100 hover:to-zinc-400 hover:dark:from-zinc-700 hover:dark:to-zinc-400",
                "transition-all duration-300 font-semibold"
              )}
              onClick={() => window.open(project.githubLink, '_blank')}
            >
              View Code <ExternalLink className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 ml-1 xs:ml-1.5 sm:ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}