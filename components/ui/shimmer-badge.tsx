"use client"

import { cn } from "@/lib/utils"

interface ShimmerBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string
}

export function ShimmerBadge({ text, className, ...props }: ShimmerBadgeProps) {
    return (
        <div
            className={cn(
                "relative inline-flex h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-50",
                className
            )}
            {...props}
        >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#52525B_0%,#A1A1AA_50%,#52525B_100%)]" />
            <span className="inline-flex h-full w-full cursor-default items-center justify-center rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-sm font-medium backdrop-blur-3xl">
                {text}
            </span>
        </div>
    )
}
