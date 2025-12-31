"use client"

import React, { useRef, useState } from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode
    strength?: number
}

export function MagneticButton({
    children,
    className,
    strength = 0.8, // range of movement (0-1)
    ...props
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e
        const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 }

        const x = clientX - (left + width / 2)
        const y = clientY - (top + height / 2)
        setPosition({ x, y })
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    const { x, y } = position

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: x * strength, y: y * strength }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={cn(
                "relative inline-flex items-center justify-center overflow-hidden transition-all duration-300",
                className
            )}
            {...props}
        >
            {/* Liquid background effect */}
            <div className="absolute inset-0 -z-10 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {children}
        </motion.button>
    )
}
