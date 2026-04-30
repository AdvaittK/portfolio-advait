"use client"

import { useEffect, useState } from "react"
import { useLenis } from "@/components/smooth-scroll-provider"

/** Top reading bar; syncs with Lenis on desktop and native scroll on mobile. */
export function BlogReadingProgress() {
  const lenis = useLenis()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      if (lenis && typeof lenis.scroll === "number" && typeof lenis.limit === "number") {
        const lim = lenis.limit
        setProgress(lim <= 0 ? 0 : Math.min(1, Math.max(0, lenis.scroll / lim)))
        return
      }
      const el = document.documentElement
      const range = el.scrollHeight - window.innerHeight
      setProgress(range <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / range)))
    }

    if (lenis) {
      lenis.on("scroll", update)
      update()
      return () => lenis.off("scroll", update)
    }

    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update, { passive: true })
    update()
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [lenis])

  const pct = Math.round(progress * 100)

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[10001] h-[2px] bg-zinc-200/40 dark:bg-zinc-800/50 pointer-events-none"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-400 dark:from-zinc-200 dark:via-zinc-400 dark:to-zinc-500 transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(0,0,0,0.15)] dark:shadow-[0_0_12px_rgba(255,255,255,0.12)]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
