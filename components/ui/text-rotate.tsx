"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextRotateProps {
    texts: string[]
    rotationInterval?: number
    className?: string
    staggerDuration?: number
    transition?: {
        type: string
        stiffness: number
        damping: number
    }
}

export function TextRotate({
    texts,
    rotationInterval = 3000,
    className,
    staggerDuration = 0,
    transition = { type: "spring", stiffness: 50, damping: 20 },
}: TextRotateProps) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length)
        }, rotationInterval)

        return () => clearInterval(intervalId)
    }, [texts, rotationInterval])

    return (
        <div className={cn("inline-flex flex-col overflow-hidden h-[1.5em] align-top", className)}>
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={texts[index]}
                    initial={{ y: "120%", filter: "blur(8px)", opacity: 0 }}
                    animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
                    exit={{ y: "-120%", filter: "blur(8px)", opacity: 0 }}
                    transition={transition}
                    className="flex flex-col items-start justify-center"
                >
                    {texts[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
