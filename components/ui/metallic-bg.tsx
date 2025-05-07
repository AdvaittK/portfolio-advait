"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MetallicBackgroundProps {
  theme?: string
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  blur: number
}

interface CodeElement {
  x: number
  y: number
  content: string
  size: number
  opacity: number
  color: string
  velocityX: number
  velocityY: number
}

interface WebDevIcon {
  x: number
  y: number
  type: string
  size: number
  opacity: number
  rotation: number
  rotationSpeed: number
}

const MetallicBackground = ({ theme = 'dark' }: MetallicBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false })
  const [lastMoveTime, setLastMoveTime] = useState(Date.now())
  const [currentTheme, setCurrentTheme] = useState(theme)

  // Update current theme when theme prop changes
  useEffect(() => {
    setCurrentTheme(theme)
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Handle resize
    const handleResize = () => {
      if (!canvas) return
      
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: e.clientX, 
        y: e.clientY,
        active: true
      })
      setLastMoveTime(Date.now())
    }

    // Handle mouse leave
    const handleMouseLeave = () => {
      setMousePos(prev => ({ ...prev, active: false }))
    }

    window.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Set theme-based colors
    const isLightTheme = currentTheme === 'light'
    
    // Color configurations based on theme
    const colors = {
      background: isLightTheme ? 'rgb(250, 250, 252)' : 'rgb(10, 10, 12)',
      vignette: {
        start: isLightTheme ? 'rgba(240, 240, 245, 0)' : 'rgba(18, 18, 22, 0)',
        middle: isLightTheme ? 'rgba(235, 235, 240, 0.2)' : 'rgba(8, 8, 10, 0.2)',
        end: isLightTheme ? 'rgba(225, 225, 230, 0.4)' : 'rgba(0, 0, 0, 0.4)',
      },
      particles: isLightTheme 
        ? [
            'rgba(100, 100, 120, 0.5)',    // Dark blue/gray
            'rgba(120, 120, 140, 0.45)',   // Medium blue/gray
            'rgba(140, 140, 160, 0.4)',    // Light blue/gray
            'rgba(160, 160, 180, 0.35)',   // Very light blue/gray
            'rgba(180, 180, 200, 0.3)',    // Lightest blue/gray
          ]
        : [
            'rgba(180, 180, 190, 0.4)',    // Light silver
            'rgba(130, 130, 140, 0.35)',   // Mid silver
            'rgba(100, 100, 110, 0.3)',    // Darker silver
            'rgba(80, 80, 90, 0.25)',      // Grey
            'rgba(40, 40, 50, 0.2)',       // Dark grey
          ],
      gradients: {
        start: isLightTheme ? 'rgba(160, 160, 180, 0.1)' : 'rgba(60, 60, 70, 0.07)',
        middle: isLightTheme ? 'rgba(140, 140, 160, 0.08)' : 'rgba(40, 40, 50, 0.056)',
        end: isLightTheme ? 'rgba(120, 120, 140, 0.05)' : 'rgba(25, 25, 30, 0.035)',
        outer: isLightTheme ? 'rgba(100, 100, 120, 0)' : 'rgba(10, 10, 15, 0)',
      },
      codeElements: isLightTheme 
        ? (opacity: number) => `rgba(60, 60, 80, ${opacity})` 
        : (opacity: number) => `rgba(180, 180, 200, ${opacity})`,
      webDevIcons: isLightTheme
        ? (opacity: number) => `rgba(70, 70, 90, ${opacity})`
        : (opacity: number) => `rgba(170, 170, 190, ${opacity})`,
      binaryRain: isLightTheme
        ? (opacity: number) => `rgba(50, 50, 70, ${opacity})`
        : (opacity: number) => `rgba(170, 170, 190, ${opacity})`,
      mouseEffect: isLightTheme 
        ? {
            start: 'rgba(100, 110, 140, 0.06)',
            middle: 'rgba(80, 90, 120, 0.04)',
            end: 'rgba(60, 70, 100, 0)'
          }
        : {
            start: 'rgba(100, 110, 140, 0.08)',
            middle: 'rgba(80, 90, 120, 0.05)',
            end: 'rgba(60, 70, 100, 0)'
          }
    }

    // Create particles
    const particleCount = 120
    const particles: Particle[] = []
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5, // Smaller particles
        speedX: (Math.random() - 0.5) * 0.2, // Slower movement
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.3 + 0.1, // Lower opacity
        color: colors.particles[Math.floor(Math.random() * colors.particles.length)],
        blur: Math.random() * 2 + 0.5
      })
    }

    // Create code elements (binary, brackets, etc.)
    // Increase the number of binary code elements
    const codeElementCount = 80 // Increased from 40
    const codeElements: CodeElement[] = []
    
    const webDevSymbols = [
      '01', '10', '00', '11',                 // Binary
      '01', '10', '00', '11',                 // Adding more binary to increase their frequency
      '01', '10', '00', '11',                 // Adding even more binary
      '<>', '</>', '{', '}', '()', '[]',      // Brackets
      ';', '=', '=>', '!=', '&&', '||',       // Operators
      'const', 'let', 'var', 'function',      // JS Keywords
      'div', 'img', 'nav', 'span', 'main',    // HTML tags
    ]
    
    for (let i = 0; i < codeElementCount; i++) {
      // Increase base opacity for better visibility
      const baseOpacity = Math.random() * 0.3 + 0.15 // Increased from 0.15 + 0.05
      codeElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        content: webDevSymbols[Math.floor(Math.random() * webDevSymbols.length)],
        size: Math.random() * 14 + 8, // Slightly larger (was 12 + 6)
        opacity: baseOpacity,
        color: colors.codeElements(baseOpacity),
        velocityX: (Math.random() - 0.5) * 0.3,
        velocityY: (Math.random() - 0.5) * 0.3
      })
    }
    
    // Create web dev icons
    const webDevIconsCount = 15
    const webDevIcons: WebDevIcon[] = []
    
    const iconTypes = [
      'HTML', 'CSS', 'JS', 'TS', 'REACT', 
      'VUE', 'NODE', 'NEXT', 'API', 'SQL'
    ]
    
    for (let i = 0; i < webDevIconsCount; i++) {
      const baseOpacity = Math.random() * 0.2 + 0.1 // Increased from 0.15 + 0.05
      webDevIcons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        type: iconTypes[Math.floor(Math.random() * iconTypes.length)],
        size: Math.random() * 20 + 14, // Larger (was 18 + 12)
        opacity: baseOpacity,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01
      })
    }
    
    // Create subtle gradient areas
    const gradientAreaCount = 5
    const gradientAreas: { 
      x: number; 
      y: number; 
      radius: number; 
      opacity: number;
      speed: { x: number; y: number };
    }[] = []
    
    for (let i = 0; i < gradientAreaCount; i++) {
      gradientAreas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 350 + 200,
        opacity: Math.random() * 0.07 + 0.03, // Very subtle
        speed: { 
          x: (Math.random() - 0.5) * 0.1, 
          y: (Math.random() - 0.5) * 0.1 
        }
      })
    }
    
    // Track active binary rain columns for persistence
    const binaryRainColumns: {
      x: number,
      progress: number,
      length: number,
      speed: number,
      chars: string[]
    }[] = [];
    
    // Create initial binary rain columns (more of them)
    for (let i = 0; i < 10; i++) {
      const columnWidth = 20;
      const columns = Math.floor(canvas.width / columnWidth);
      const x = Math.floor(Math.random() * columns) * columnWidth;
      const length = Math.random() * (canvas.height / 2) + (canvas.height / 4);
      const chars: string[] = [];
      
      // Generate binary characters for this column
      const charCount = Math.ceil(length / 20);
      for (let j = 0; j < charCount; j++) {
        chars.push(Math.random() > 0.5 ? '1' : '0');
      }
      
      binaryRainColumns.push({
        x,
        progress: 0,
        length,
        speed: Math.random() * 1 + 0.5,
        chars
      });
    }

    // Animation loop
    let animationFrameId: number
    const render = () => {
      if (!ctx || !canvas) return

      // Draw background
      ctx.fillStyle = colors.background
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Subtle vignette effect
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 1.5
      )
      vignette.addColorStop(0, colors.vignette.start)
      vignette.addColorStop(0.7, colors.vignette.middle)
      vignette.addColorStop(1, colors.vignette.end)
      
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Check if mouse has been inactive for 2 seconds
      const isMouseActive = mousePos.active && (Date.now() - lastMoveTime < 2000)
      
      // Draw mouse interaction effect when active
      if (isMouseActive) {
        const mouseRadius = 200
        const mouseGradient = ctx.createRadialGradient(
          mousePos.x, mousePos.y, 0,
          mousePos.x, mousePos.y, mouseRadius
        )
        mouseGradient.addColorStop(0, colors.mouseEffect.start)
        mouseGradient.addColorStop(0.5, colors.mouseEffect.middle)
        mouseGradient.addColorStop(1, colors.mouseEffect.end)
        
        ctx.fillStyle = mouseGradient
        ctx.beginPath()
        ctx.arc(mousePos.x, mousePos.y, mouseRadius, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Draw subtle gradient areas
      gradientAreas.forEach(area => {
        // Move gradient areas slowly
        area.x += area.speed.x
        area.y += area.speed.y
        
        // Wrap around canvas
        if (area.x > canvas.width + area.radius) area.x = -area.radius
        if (area.x < -area.radius) area.x = canvas.width + area.radius
        if (area.y > canvas.height + area.radius) area.y = -area.radius
        if (area.y < -area.radius) area.y = canvas.height + area.radius
        
        // Create soft gradient
        const gradient = ctx.createRadialGradient(
          area.x, area.y, 0,
          area.x, area.y, area.radius
        )
        
        // Apply theme-based gradients
        gradient.addColorStop(0, colors.gradients.start)
        gradient.addColorStop(0.3, colors.gradients.middle)
        gradient.addColorStop(0.7, colors.gradients.end)
        gradient.addColorStop(1, colors.gradients.outer)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(area.x, area.y, area.radius, 0, Math.PI * 2)
        ctx.fill()
      })
      
      // Add subtle noise texture for metallic effect
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const opacity = Math.random() * (isLightTheme ? 0.02 : 0.015)
        ctx.fillStyle = `rgba(${isLightTheme ? '20, 20, 40' : '255, 255, 255'}, ${opacity})`
        ctx.fillRect(x, y, 1, 1)
      }

      // Draw binary rain effect (more visible and persistent)
      // Process all active binary rain columns
      for (let i = 0; i < binaryRainColumns.length; i++) {
        const column = binaryRainColumns[i];
        column.progress += column.speed;
        
        // Restart the column if it's gone past its length
        if (column.progress > column.length + canvas.height) {
          column.progress = 0;
          
          // Optionally change position
          if (Math.random() > 0.7) {
            const columnWidth = 20;
            const columns = Math.floor(canvas.width / columnWidth);
            column.x = Math.floor(Math.random() * columns) * columnWidth;
          }
          
          // Generate new binary sequence
          column.chars = [];
          const charCount = Math.ceil(column.length / 20);
          for (let j = 0; j < charCount; j++) {
            column.chars.push(Math.random() > 0.5 ? '1' : '0');
          }
        }
        
        // Draw the binary characters in this column
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'center';
        
        const visibleLength = Math.min(column.progress, column.length);
        for (let j = 0; j < column.chars.length; j++) {
          const y = column.progress - (j * 20);
          
          // Only draw if in visible range
          if (y >= 0 && y <= canvas.height) {
            const distanceFromTop = y;
            const distanceFromBottom = column.length - y;
            const fadeDistance = 100;
            
            // Fade in at top, fade out at bottom
            let alpha = 0.3; // Base alpha (higher than before)
            
            if (distanceFromTop < fadeDistance) {
              alpha *= (distanceFromTop / fadeDistance);
            } else if (distanceFromBottom < fadeDistance) {
              alpha *= (distanceFromBottom / fadeDistance);
            }
            
            ctx.fillStyle = colors.binaryRain(alpha);
            ctx.fillText(column.chars[j], column.x, y);
          }
        }
      }
      
      // Occasionally add new binary rain columns
      if (Math.random() > 0.99 && binaryRainColumns.length < 15) {
        const columnWidth = 20;
        const columns = Math.floor(canvas.width / columnWidth);
        const x = Math.floor(Math.random() * columns) * columnWidth;
        const length = Math.random() * (canvas.height / 2) + (canvas.height / 4);
        const chars: string[] = [];
        
        const charCount = Math.ceil(length / 20);
        for (let j = 0; j < charCount; j++) {
          chars.push(Math.random() > 0.5 ? '1' : '0');
        }
        
        binaryRainColumns.push({
          x,
          progress: 0,
          length,
          speed: Math.random() * 1 + 0.5,
          chars
        });
      }
      
      // Draw code elements
      codeElements.forEach(element => {
        // Update position
        element.x += element.velocityX
        element.y += element.velocityY
        
        // Wrap around edges
        if (element.x > canvas.width) element.x = 0
        if (element.x < 0) element.x = canvas.width
        if (element.y > canvas.height) element.y = 0
        if (element.y < 0) element.y = canvas.height
        
        // Mouse interaction
        if (isMouseActive) {
          const dx = mousePos.x - element.x
          const dy = mousePos.y - element.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150
          
          if (distance < maxDistance) {
            // Push code away from mouse
            const force = (1 - distance / maxDistance) * 0.8
            element.velocityX -= (dx / distance) * force
            element.velocityY -= (dy / distance) * force
            
            // Limit velocity
            const maxVel = 2
            const vel = Math.sqrt(element.velocityX * element.velocityX + element.velocityY * element.velocityY)
            if (vel > maxVel) {
              element.velocityX = (element.velocityX / vel) * maxVel
              element.velocityY = (element.velocityY / vel) * maxVel
            }
            
            // Temporarily increase opacity
            ctx.font = `bold ${element.size}px monospace` // Added bold
            ctx.fillStyle = colors.codeElements(element.opacity * 4) // Increased multiplier
            ctx.fillText(element.content, element.x, element.y)
          } else {
            // Normal rendering
            ctx.font = `${element.size}px monospace`
            ctx.fillStyle = colors.codeElements(element.opacity)
            ctx.fillText(element.content, element.x, element.y)
          }
        } else {
          // Normal rendering
          ctx.font = `${element.size}px monospace`
          ctx.fillStyle = colors.codeElements(element.opacity)
          ctx.fillText(element.content, element.x, element.y)
        }
        
        // Apply friction to velocity
        element.velocityX *= 0.98
        element.velocityY *= 0.98
        
        // Apply minimum velocity
        const minVel = 0.2
        const vel = Math.sqrt(element.velocityX * element.velocityX + element.velocityY * element.velocityY)
        if (vel < minVel && Math.random() > 0.95) {
          const angle = Math.random() * Math.PI * 2
          element.velocityX = Math.cos(angle) * minVel
          element.velocityY = Math.sin(angle) * minVel
        }
      })
      
      // Draw web dev icons
      webDevIcons.forEach(icon => {
        // Update rotation
        icon.rotation += icon.rotationSpeed
        
        // Random slow movement
        if (Math.random() > 0.98) {
          icon.x += (Math.random() - 0.5) * 1
          icon.y += (Math.random() - 0.5) * 1
        }
        
        // Mouse interaction
        if (isMouseActive) {
          const dx = mousePos.x - icon.x
          const dy = mousePos.y - icon.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 200
          
          if (distance < maxDistance) {
            // Move slightly toward mouse
            const force = (1 - distance / maxDistance) * 0.5
            icon.x += (dx / distance) * force
            icon.y += (dy / distance) * force
            
            // Temporarily increase opacity and size
            ctx.save()
            ctx.translate(icon.x, icon.y)
            ctx.rotate(icon.rotation)
            ctx.font = `bold ${icon.size * 1.2}px sans-serif`
            ctx.textAlign = 'center'
            ctx.fillStyle = colors.webDevIcons(icon.opacity * 5) // Increased multiplier
            ctx.fillText(icon.type, 0, 0)
            ctx.restore()
          } else {
            // Normal rendering
            ctx.save()
            ctx.translate(icon.x, icon.y)
            ctx.rotate(icon.rotation)
            ctx.font = `bold ${icon.size}px sans-serif`
            ctx.textAlign = 'center'
            ctx.fillStyle = colors.webDevIcons(icon.opacity)
            ctx.fillText(icon.type, 0, 0)
            ctx.restore()
          }
        } else {
          // Normal rendering
          ctx.save()
          ctx.translate(icon.x, icon.y)
          ctx.rotate(icon.rotation)
          ctx.font = `bold ${icon.size}px sans-serif`
          ctx.textAlign = 'center'
          ctx.fillStyle = colors.webDevIcons(icon.opacity)
          ctx.fillText(icon.type, 0, 0)
          ctx.restore()
        }
        
        // Keep within bounds
        if (icon.x > canvas.width + 50) icon.x = -50
        if (icon.x < -50) icon.x = canvas.width + 50
        if (icon.y > canvas.height + 50) icon.y = -50
        if (icon.y < -50) icon.y = canvas.height + 50
      })

      // Update and draw particles (floating metallic dust effect)
      particles.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        // Mouse interaction for particles
        if (isMouseActive) {
          const dx = mousePos.x - particle.x
          const dy = mousePos.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 100
          
          if (distance < maxDistance) {
            // Push particles away
            const force = (1 - distance / maxDistance) * 0.2
            particle.x -= (dx / distance) * force
            particle.y -= (dy / distance) * force
            
            // Draw with increased brightness
            ctx.shadowColor = particle.color.replace(/[\d\.]+\)$/g, '0.6)')
            ctx.shadowBlur = particle.blur * 2
            ctx.fillStyle = particle.color.replace(/[\d\.]+\)$/g, '0.8)')
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2)
            ctx.fill()
          } else {
            // Normal rendering
            ctx.shadowColor = particle.color
            ctx.shadowBlur = particle.blur
            ctx.fillStyle = particle.color
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
          }
        } else {
          // Normal rendering
          ctx.shadowColor = particle.color
          ctx.shadowBlur = particle.blur
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // Wrap particles around screen
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height
      })
      
      animationFrameId = window.requestAnimationFrame(render)
    }
    
    render()
    
    // Cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [currentTheme])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 -z-10"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </motion.div>
  )
}

export default MetallicBackground