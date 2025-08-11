'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: [number, number, number]
  consciousness: number
  intention: number
  harmony: number
  trail: Array<{x: number, y: number, alpha: number}>
  resonance: number
  phi: number
}

interface Attractor {
  x: number
  y: number
  strength: number
  consciousness: number
}

export function ExcellenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const attractorsRef = useRef<Attractor[]>([])
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, velocity: 0 })
  const timeRef = useRef(0)
  const performanceRef = useRef({ fps: 60, frameTime: 16.67, lastTime: 0 })
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  // Mathematical Constants for Excellence
  const PHI = 1.618033988749
  const PHI_INVERSE = 0.618033988749
  const FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
  
  // Consciousness-Level Brand Colors
  const EXCELLENCE_COLORS = {
    blue900: [12, 30, 62] as [number, number, number],
    blue800: [30, 58, 95] as [number, number, number],
    blue700: [37, 99, 235] as [number, number, number],
    blue600: [59, 130, 246] as [number, number, number],
    blue500: [96, 165, 250] as [number, number, number],
    blue400: [147, 197, 253] as [number, number, number],
    blue300: [191, 219, 254] as [number, number, number],
  }

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Handle canvas sizing
  const updateCanvasSize = useCallback(() => {
    if (!canvasRef.current) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const width = window.innerWidth
    const height = window.innerHeight
    
    setCanvasSize({ width, height })
    
    canvasRef.current.width = width * dpr
    canvasRef.current.height = height * dpr
    canvasRef.current.style.width = width + 'px'
    canvasRef.current.style.height = height + 'px'
    
    const ctx = canvasRef.current.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
    }
  }, [])

  // Initialize particle system with mathematical beauty
  const initializeParticles = useCallback(() => {
    if (prefersReducedMotion) {
      particlesRef.current = []
      return
    }

    const particles: Particle[] = []
    const particleCount = Math.min(144, Math.floor(canvasSize.width * canvasSize.height / 15000)) // Fibonacci number
    
    for (let i = 0; i < particleCount; i++) {
      // Golden ratio positioning for aesthetic distribution
      const angle = i * PHI * Math.PI * 2
      const radius = Math.sqrt(i) * 20
      
      particles.push({
        x: canvasSize.width * 0.5 + Math.cos(angle) * radius,
        y: canvasSize.height * 0.5 + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 1 + Math.random() * 3,
        alpha: 0.3 + Math.random() * 0.4,
        color: Object.values(EXCELLENCE_COLORS)[Math.floor(Math.random() * Object.values(EXCELLENCE_COLORS).length)],
        consciousness: Math.random(),
        intention: Math.random() * PHI,
        harmony: Math.random() * PHI_INVERSE,
        trail: [],
        resonance: Math.random() * Math.PI * 2,
        phi: PHI + (Math.random() - 0.5) * 0.1,
      })
    }
    
    particlesRef.current = particles
  }, [canvasSize, prefersReducedMotion])

  // Consciousness-level interaction detection
  const updateMouseInteraction = useCallback((event: MouseEvent) => {
    const prevX = mouseRef.current.x
    const prevY = mouseRef.current.y
    
    mouseRef.current.x = event.clientX
    mouseRef.current.y = event.clientY
    
    // Calculate mouse velocity for consciousness response
    const dx = mouseRef.current.x - prevX
    const dy = mouseRef.current.y - prevY
    mouseRef.current.velocity = Math.sqrt(dx * dx + dy * dy)
    
    // Create attractors based on conscious interaction
    if (mouseRef.current.velocity > 5) {
      attractorsRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        strength: Math.min(mouseRef.current.velocity * 0.1, 10),
        consciousness: 1.0,
      })
      
      // Limit attractors for performance
      if (attractorsRef.current.length > 8) { // Fibonacci number
        attractorsRef.current.shift()
      }
    }
  }, [])

  // Perfect physics update with consciousness
  const updateParticles = useCallback((deltaTime: number) => {
    const particles = particlesRef.current
    const attractors = attractorsRef.current
    const time = timeRef.current * 0.001
    
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]
      
      // Consciousness-based movement
      const consciousnessForceX = Math.cos(time * particle.consciousness + particle.resonance) * 0.02
      const consciousnessForcey = Math.sin(time * particle.consciousness * PHI + particle.resonance) * 0.02
      
      particle.vx += consciousnessForceX
      particle.vy += consciousnessForcey
      
      // Attractor influence with consciousness awareness
      for (const attractor of attractors) {
        const dx = attractor.x - particle.x
        const dy = attractor.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance > 0 && distance < 200) {
          const force = (attractor.strength * particle.consciousness) / (distance * distance)
          const forceX = (dx / distance) * force * 0.01
          const forceY = (dy / distance) * force * 0.01
          
          particle.vx += forceX
          particle.vy += forceY
        }
      }
      
      // Harmonic dampening for natural movement
      particle.vx *= 0.995
      particle.vy *= 0.995
      
      // Golden ratio velocity limiting
      const maxSpeed = 2 * PHI_INVERSE
      const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
      if (speed > maxSpeed) {
        particle.vx = (particle.vx / speed) * maxSpeed
        particle.vy = (particle.vy / speed) * maxSpeed
      }
      
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy
      
      // Conscious boundary wrapping
      if (particle.x < -50) particle.x = canvasSize.width + 50
      if (particle.x > canvasSize.width + 50) particle.x = -50
      if (particle.y < -50) particle.y = canvasSize.height + 50
      if (particle.y > canvasSize.height + 50) particle.y = -50
      
      // Update trail with phi-based decay
      particle.trail.push({ x: particle.x, y: particle.y, alpha: particle.alpha })
      if (particle.trail.length > FIBONACCI[6]) { // 8 - perfect trail length
        particle.trail.shift()
      }
      
      // Update consciousness resonance
      particle.resonance += 0.01 * particle.phi
      particle.consciousness = 0.5 + 0.5 * Math.sin(time * particle.intention + particle.resonance)
    }
    
    // Decay attractors with consciousness
    for (let i = attractors.length - 1; i >= 0; i--) {
      attractors[i].strength *= 0.98
      attractors[i].consciousness *= 0.99
      
      if (attractors[i].strength < 0.1 || attractors[i].consciousness < 0.01) {
        attractors.splice(i, 1)
      }
    }
  }, [canvasSize])

  // Perfect rendering with mathematical beauty
  const render = useCallback((ctx: CanvasRenderingContext2D) => {
    const particles = particlesRef.current
    const attractors = attractorsRef.current
    const time = timeRef.current * 0.001
    
    // Consciousness-level background
    const gradient = ctx.createRadialGradient(
      canvasSize.width * 0.5, canvasSize.height * 0.5, 0,
      canvasSize.width * 0.5, canvasSize.height * 0.5, Math.max(canvasSize.width, canvasSize.height)
    )
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.02)')
    gradient.addColorStop(0.5, 'rgba(30, 58, 95, 0.01)')
    gradient.addColorStop(1, 'rgba(12, 30, 62, 0.005)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
    
    // Render particle trails with phi-based opacity
    for (const particle of particles) {
      for (let i = 0; i < particle.trail.length; i++) {
        const trailParticle = particle.trail[i]
        const trailAlpha = (i / particle.trail.length) * particle.alpha * PHI_INVERSE
        const trailSize = particle.size * (i / particle.trail.length) * PHI_INVERSE
        
        ctx.fillStyle = `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${trailAlpha * 0.3})`
        ctx.beginPath()
        ctx.arc(trailParticle.x, trailParticle.y, trailSize, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    // Render particles with consciousness-based pulsing
    for (const particle of particles) {
      const consciousnessPulse = 1 + 0.3 * Math.sin(time * 2 * particle.consciousness + particle.resonance)
      const size = particle.size * consciousnessPulse
      const alpha = particle.alpha * particle.consciousness
      
      // Layered glow effect
      for (let layer = 0; layer < 3; layer++) {
        const layerSize = size + layer * 2
        const layerAlpha = alpha / (layer + 1) * 0.4
        
        ctx.fillStyle = `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${layerAlpha})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, layerSize, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Core particle
      ctx.fillStyle = `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${alpha})`
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
      ctx.fill()
    }
    
    // Render connection lines with golden ratio distances
    ctx.strokeStyle = `rgba(${EXCELLENCE_COLORS.blue500[0]}, ${EXCELLENCE_COLORS.blue500[1]}, ${EXCELLENCE_COLORS.blue500[2]}, 0.1)`
    ctx.lineWidth = 0.5
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = FIBONACCI[7] * PHI // ~140px with golden ratio
        
        if (distance < maxDistance) {
          const alpha = (1 - distance / maxDistance) * 0.2 * Math.min(particles[i].consciousness, particles[j].consciousness)
          ctx.strokeStyle = `rgba(${EXCELLENCE_COLORS.blue400[0]}, ${EXCELLENCE_COLORS.blue400[1]}, ${EXCELLENCE_COLORS.blue400[2]}, ${alpha})`
          
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
    
    // Render attractors with consciousness visualization
    for (const attractor of attractors) {
      const size = attractor.strength * attractor.consciousness * 3
      const alpha = attractor.consciousness * 0.6
      
      ctx.fillStyle = `rgba(${EXCELLENCE_COLORS.blue300[0]}, ${EXCELLENCE_COLORS.blue300[1]}, ${EXCELLENCE_COLORS.blue300[2]}, ${alpha})`
      ctx.beginPath()
      ctx.arc(attractor.x, attractor.y, size, 0, Math.PI * 2)
      ctx.fill()
      
      // Consciousness rings
      for (let ring = 1; ring <= 3; ring++) {
        const ringSize = size + ring * 10
        const ringAlpha = alpha / (ring * 2)
        
        ctx.strokeStyle = `rgba(${EXCELLENCE_COLORS.blue400[0]}, ${EXCELLENCE_COLORS.blue400[1]}, ${EXCELLENCE_COLORS.blue400[2]}, ${ringAlpha})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(attractor.x, attractor.y, ringSize, 0, Math.PI * 2)
        ctx.stroke()
      }
    }
  }, [canvasSize])

  // Perfect animation loop with performance monitoring
  const animate = useCallback(() => {
    if (!canvasRef.current) return
    
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return
    
    const currentTime = performance.now()
    const deltaTime = currentTime - performanceRef.current.lastTime
    performanceRef.current.lastTime = currentTime
    
    // Monitor and maintain 60fps
    performanceRef.current.frameTime = deltaTime
    performanceRef.current.fps = 1000 / deltaTime
    
    // Only render if performance is acceptable
    if (performanceRef.current.fps > 30 || prefersReducedMotion) {
      updateParticles(deltaTime)
      render(ctx)
    }
    
    timeRef.current += deltaTime
    animationRef.current = requestAnimationFrame(animate)
  }, [updateParticles, render, prefersReducedMotion])

  // Initialize canvas
  useEffect(() => {
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [updateCanvasSize])

  // Initialize particles when canvas is ready
  useEffect(() => {
    if (canvasSize.width > 0 && canvasSize.height > 0) {
      initializeParticles()
    }
  }, [canvasSize, initializeParticles])

  // Start animation
  useEffect(() => {
    if (particlesRef.current.length > 0 && !prefersReducedMotion) {
      animate()
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate, prefersReducedMotion])

  // Mouse interaction
  useEffect(() => {
    if (prefersReducedMotion) return
    
    window.addEventListener('mousemove', updateMouseInteraction)
    
    return () => {
      window.removeEventListener('mousemove', updateMouseInteraction)
    }
  }, [updateMouseInteraction, prefersReducedMotion])

  if (prefersReducedMotion) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.03) 0%, rgba(15, 23, 42, 0.05) 100%)'
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        backgroundColor: 'transparent',
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
      role="presentation"
    />
  )
}