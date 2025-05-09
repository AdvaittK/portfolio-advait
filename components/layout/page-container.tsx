import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn(
      "pt-24 sm:pt-28 md:pt-32 min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16",
      "max-w-[2000px] mx-auto",
      className
    )}>
      {children}
    </div>
  )
} 