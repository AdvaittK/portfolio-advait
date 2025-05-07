"use client"

import React, { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

interface ParticleProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
}

export default function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const { theme } = useTheme()
  const particles = useRef<Array<InstanceType<typeof Particle>>>([])
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const animationFrame = useRef<number | null>(null)
  const isDark = theme === "dark"

  const Particle = class {
    x: number
    y: number
    size: number
    originalX: number
    originalY: number
    vx: number
    vy: number
    color: string
    ctx: CanvasRenderingContext2D

    constructor(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string
    ) {
      this.x = x
      this.y = y
      this.size = size
      this.originalX = x
      this.originalY = y
      this.vx = 0
      this.vy = 0
      this.color = color
      this.ctx = ctx
    }

    draw() {
      this.ctx.fillStyle = this.color
      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      this.ctx.fill()
    }

    update() {
      let dx = mouse.current.x - this.x
      let dy = mouse.current.y - this.y
      let distance = Math.sqrt(dx * dx + dy * dy)
      let forceDirectionX = dx / distance
      let forceDirectionY = dy / distance
      let maxDistance = staticity
      let force = (maxDistance - distance) / maxDistance
      if (force < 0) force = 0

      let directionX = forceDirectionX * force * ease
      let directionY = forceDirectionY * force * ease

      if (distance < staticity) {
        this.vx -= directionX
        this.vy -= directionY
      } else {
        if (this.x !== this.originalX) {
          let dx = this.x - this.originalX
          this.vx = -dx / ease
        }
        if (this.y !== this.originalY) {
          let dy = this.y - this.originalY
          this.vy = -dy / ease
        }
      }
      this.x += this.vx
      this.y += this.vy
    }
  }

  const initCanvas = () => {
    const canvas = canvasRef.current
    const container = canvasContainerRef.current
    if (!canvas || !container) return

    context.current = canvas.getContext("2d")
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight

    initParticles()

    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current)
    }
    animationFrame.current = requestAnimationFrame(animate)
  }

  const initParticles = () => {
    particles.current = []
    const canvas = canvasRef.current
    const ctx = context.current
    if (!canvas || !ctx) return

    const particleColor = isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"

    for (let i = 0; i < quantity; i++) {
      const size = Math.random() * 2 + 1
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      particles.current.push(new Particle(ctx, x, y, size, particleColor))
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    const ctx = context.current
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particles.current.length; i++) {
      particles.current[i].update()
      particles.current[i].draw()
    }
    animationFrame.current = requestAnimationFrame(animate)
  }

  const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    mouse.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const handleResize = () => {
    const canvas = canvasRef.current
    const container = canvasContainerRef.current
    if (!canvas || !container) return

    canvas.width = container.clientWidth
    canvas.height = container.clientHeight
    initParticles()
  }

  useEffect(() => {
    initCanvas()
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [])

  useEffect(() => {
    initParticles()
  }, [theme, refresh])

  return (
    <div
      ref={canvasContainerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}