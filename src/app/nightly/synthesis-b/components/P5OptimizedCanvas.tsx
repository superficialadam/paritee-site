'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import type p5 from 'p5'

// Performance monitoring interface from Canvas-C
interface PerformanceMetrics {
  fps: number
  frameTime: number
  particleCount: number
  isPerformant: boolean
}

// Optimized particle interface
interface OptimizedParticle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  life: number
  maxLife: number
  size: number
  color: [number, number, number]
  noiseOffset: number
  pulsation: number
}

// Brand colors from styleguide
const BRAND_COLORS = {
  blue600: [37, 99, 235] as [number, number, number],
  blue500: [59, 130, 246] as [number, number, number],
  blue400: [96, 165, 250] as [number, number, number],
  slate800: [30, 41, 59] as [number, number, number],
  slate900: [15, 23, 42] as [number, number, number],
}

export default function P5OptimizedCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const p5InstanceRef = useRef<p5 | null>(null)
  const performanceRef = useRef<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    particleCount: 0,
    isPerformant: true
  })
  
  // State for adaptive behavior
  const [isVisible, setIsVisible] = useState(true)
  const [currentSection, setCurrentSection] = useState('home')
  const [performance, setPerformance] = useState<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    particleCount: 0,
    isPerformant: true
  })
  
  // Particles and interaction state
  const particlesRef = useRef<OptimizedParticle[]>([])
  const mouseTrailRef = useRef<Array<{x: number, y: number, time: number}>>([])
  const lastFrameTimeRef = useRef<number>(0)
  const frameTimesRef = useRef<number[]>([])
  
  // Adaptive settings based on performance and device
  const getAdaptiveSettings = useCallback(() => {
    const isHighPerf = performance.fps > 45
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const isLowEnd = typeof navigator !== 'undefined' && 'hardwareConcurrency' in navigator && navigator.hardwareConcurrency <= 4
    
    return {
      maxParticles: isHighPerf ? (isMobile ? 25 : 40) : (isMobile ? 12 : 20),
      trailLength: isHighPerf ? 15 : 8,
      updateFrequency: isHighPerf ? 1 : 2,
      particleSize: isMobile ? 2 : 3,
      interactionRadius: isMobile ? 60 : 100,
      organicFlowStrength: isLowEnd ? 0.05 : 0.1,
      enableFlocking: isHighPerf && !isMobile,
    }
  }, [performance.fps])

  // Section detection using Intersection Observer
  useEffect(() => {
    const sections = document.querySelectorAll('section[id], main section, div[data-section]')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const sectionName = entry.target.id || 
                              entry.target.getAttribute('data-section') || 
                              'home'
            setCurrentSection(sectionName)
          }
        })
      },
      { 
        threshold: [0.3, 0.5, 0.7],
        rootMargin: '-20% 0px -20% 0px'
      }
    )

    sections.forEach((section) => observer.observe(section))
    
    return () => observer.disconnect()
  }, [])

  // P5.js sketch with combined best practices
  const sketch = useCallback((p: p5) => {
    let canvas: p5.Renderer
    let time = 0
    let flowField: p5.Vector[][] = []
    let cols: number, rows: number
    const scale = 25
    let zoff = 0
    
    p.setup = () => {
      canvas = p.createCanvas(p.windowWidth, p.windowHeight)
      canvas.parent(canvasRef.current!)
      
      // Optimal canvas styling for layering and performance
      const canvasElement = canvas.canvas as HTMLCanvasElement
      canvasElement.style.position = 'fixed'
      canvasElement.style.top = '0'
      canvasElement.style.left = '0'
      canvasElement.style.zIndex = '1'
      canvasElement.style.pointerEvents = 'none'
      canvasElement.style.mixBlendMode = 'screen'
      
      p.colorMode(p.RGB, 255, 255, 255, 1)
      p.background(BRAND_COLORS.slate900[0], BRAND_COLORS.slate900[1], BRAND_COLORS.slate900[2], 0.1)
      
      // Initialize flow field for organic movement
      cols = Math.floor(p.width / scale) + 1
      rows = Math.floor(p.height / scale) + 1
      initializeFlowField()
      
      // Create initial particle system
      const settings = getAdaptiveSettings()
      for (let i = 0; i < Math.min(settings.maxParticles, 20); i++) {
        addOrganicParticle(p.random(p.width), p.random(p.height))
      }
    }

    const initializeFlowField = () => {
      flowField = new Array(cols)
      for (let i = 0; i < cols; i++) {
        flowField[i] = new Array(rows)
        for (let j = 0; j < rows; j++) {
          flowField[i][j] = p.createVector(0, 0)
        }
      }
    }

    p.draw = () => {
      if (!isVisible) return
      
      const currentTime = p.millis()
      const settings = getAdaptiveSettings()
      
      // Performance monitoring from Canvas-C
      const frameTime = currentTime - lastFrameTimeRef.current
      lastFrameTimeRef.current = currentTime
      
      frameTimesRef.current.push(frameTime)
      if (frameTimesRef.current.length > 10) {
        frameTimesRef.current.shift()
      }
      
      const avgFrameTime = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length
      const currentFps = 1000 / avgFrameTime
      
      performanceRef.current = {
        fps: currentFps,
        frameTime: avgFrameTime,
        particleCount: particlesRef.current.length,
        isPerformant: currentFps > 30
      }
      
      // Update performance state periodically
      if (p.frameCount % 60 === 0) {
        setPerformance({...performanceRef.current})
      }
      
      // Adaptive background clearing
      const fadeAmount = settings.updateFrequency === 1 ? 0.03 : 0.06
      p.background(BRAND_COLORS.slate900[0], BRAND_COLORS.slate900[1], BRAND_COLORS.slate900[2], fadeAmount)
      
      time++
      
      // Update organic flow field using Perlin noise
      updateFlowField()
      
      // Handle mouse interaction with organic feel
      handleMouseInteraction(currentTime, settings)
      
      // Update and render particles with organic behavior
      updateParticles(settings)
      renderParticles(settings)
      
      // Draw organic connections between nearby particles
      if (settings.enableFlocking) {
        drawOrganicConnections()
      }
      
      // Section-aware ambient effects
      addSectionAwareParticles(settings)
    }

    const updateFlowField = () => {
      let yoff = 0
      for (let y = 0; y < rows; y++) {
        let xoff = 0
        for (let x = 0; x < cols; x++) {
          const angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 2
          flowField[x][y] = p.createVector(p.cos(angle), p.sin(angle))
          xoff += 0.1
        }
        yoff += 0.1
      }
      zoff += 0.008
    }

    const handleMouseInteraction = (currentTime: number, settings: any) => {
      if (p.mouseX !== p.pmouseX || p.mouseY !== p.pmouseY) {
        mouseTrailRef.current.push({
          x: p.mouseX,
          y: p.mouseY,
          time: currentTime
        })
        
        if (mouseTrailRef.current.length > settings.trailLength) {
          mouseTrailRef.current.shift()
        }
        
        // Add particles with organic variation
        if (Math.random() < 0.4) {
          addOrganicParticle(
            p.mouseX + p.random(-30, 30), 
            p.mouseY + p.random(-30, 30)
          )
        }
      }
      
      // Clean old trail points
      mouseTrailRef.current = mouseTrailRef.current.filter(
        point => currentTime - point.time < 1500
      )
      
      // Draw mouse trail with organic curves
      drawOrganicMouseTrail()
    }

    const addOrganicParticle = (x: number, y: number) => {
      const settings = getAdaptiveSettings()
      if (particlesRef.current.length >= settings.maxParticles) return
      
      // Section-aware colors
      let color = BRAND_COLORS.blue500
      if (currentSection.includes('service')) color = BRAND_COLORS.blue600
      if (currentSection.includes('case')) color = BRAND_COLORS.blue400
      if (currentSection.includes('contact')) color = BRAND_COLORS.blue400
      
      const particle: OptimizedParticle = {
        x: x,
        y: y,
        vx: p.random(-1, 1),
        vy: p.random(-1, 1),
        alpha: p.random(0.4, 0.8),
        life: 0,
        maxLife: p.random(120, 240),
        size: p.random(1.5, settings.particleSize),
        color,
        noiseOffset: p.random(1000),
        pulsation: p.random(0.01, 0.03)
      }
      
      particlesRef.current.push(particle)
    }

    const updateParticles = (settings: any) => {
      particlesRef.current = particlesRef.current.filter(particle => {
        // Apply flow field for organic movement
        const x = Math.floor(particle.x / scale)
        const y = Math.floor(particle.y / scale)
        
        if (x >= 0 && x < cols && y >= 0 && y < rows) {
          const flowForce = flowField[x][y].copy()
          flowForce.mult(settings.organicFlowStrength)
          particle.vx += flowForce.x
          particle.vy += flowForce.y
        }
        
        // Add organic noise-based movement
        const noiseForce = {
          x: (p.noise(particle.noiseOffset, time * 0.005) - 0.5) * 0.08,
          y: (p.noise(particle.noiseOffset + 1000, time * 0.005) - 0.5) * 0.08
        }
        particle.vx += noiseForce.x
        particle.vy += noiseForce.y
        
        // Apply gentle mouse repulsion for organic feel
        if (mouseTrailRef.current.length > 0) {
          const mouse = mouseTrailRef.current[mouseTrailRef.current.length - 1]
          const dx = particle.x - mouse.x
          const dy = particle.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < settings.interactionRadius && dist > 0) {
            const force = (settings.interactionRadius - dist) / settings.interactionRadius
            particle.vx += (dx / dist) * force * 0.02
            particle.vy += (dy / dist) * force * 0.02
          }
        }
        
        // Update position and life
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++
        
        // Organic velocity damping
        particle.vx *= 0.98
        particle.vy *= 0.98
        
        // Wrap around edges organically
        if (particle.x < -10) particle.x = p.width + 10
        if (particle.x > p.width + 10) particle.x = -10
        if (particle.y < -10) particle.y = p.height + 10
        if (particle.y > p.height + 10) particle.y = -10
        
        // Update alpha for organic fade
        particle.alpha = (1 - (particle.life / particle.maxLife)) * 0.8
        particle.noiseOffset += 0.01
        
        return particle.life < particle.maxLife && particle.alpha > 0.01
      })
    }

    const renderParticles = (settings: any) => {
      particlesRef.current.forEach(particle => {
        p.push()
        
        // Organic pulsation from Canvas-B
        const pulsation = 1 + Math.sin(time * particle.pulsation) * 0.2
        const currentSize = particle.size * pulsation
        
        // Multi-layer glow for organic feel
        for (let i = 0; i < (settings.enableFlocking ? 3 : 2); i++) {
          const glowSize = currentSize + (i * 2)
          const glowAlpha = particle.alpha / (i + 1) * 0.4
          
          p.fill(particle.color[0], particle.color[1], particle.color[2], glowAlpha)
          p.noStroke()
          p.ellipse(particle.x, particle.y, glowSize)
        }
        
        // Core particle
        p.fill(particle.color[0], particle.color[1], particle.color[2], particle.alpha)
        p.noStroke()
        p.ellipse(particle.x, particle.y, currentSize)
        
        p.pop()
      })
    }

    const drawOrganicMouseTrail = () => {
      if (mouseTrailRef.current.length < 2) return
      
      p.strokeWeight(1.5)
      p.noFill()
      
      for (let i = 1; i < mouseTrailRef.current.length; i++) {
        const current = mouseTrailRef.current[i]
        const prev = mouseTrailRef.current[i - 1]
        const alpha = (i / mouseTrailRef.current.length) * 0.6
        
        p.stroke(BRAND_COLORS.blue400[0], BRAND_COLORS.blue400[1], BRAND_COLORS.blue400[2], alpha)
        
        // Use quadratic curves for organic feel
        if (i > 1) {
          const prevPrev = mouseTrailRef.current[i - 2]
          p.beginShape()
          p.noFill()
          p.curveVertex(prevPrev.x, prevPrev.y)
          p.curveVertex(prev.x, prev.y)
          p.curveVertex(current.x, current.y)
          if (i < mouseTrailRef.current.length - 1) {
            p.curveVertex(mouseTrailRef.current[i + 1].x, mouseTrailRef.current[i + 1].y)
          }
          p.endShape()
        }
      }
    }

    const drawOrganicConnections = () => {
      p.strokeWeight(0.5)
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 80) {
            const alpha = Math.max(0, (80 - dist) / 80 * 0.3 * Math.min(p1.alpha, p2.alpha))
            p.stroke(BRAND_COLORS.blue500[0], BRAND_COLORS.blue500[1], BRAND_COLORS.blue500[2], alpha)
            p.line(p1.x, p1.y, p2.x, p2.y)
          }
        }
      }
    }

    const addSectionAwareParticles = (settings: any) => {
      if (p.frameCount % 180 === 0 && Math.random() < 0.3) {
        const x = p.random(p.width)
        const y = p.random(p.height)
        
        if (particlesRef.current.length < settings.maxParticles - 3) {
          addOrganicParticle(x, y)
        }
      }
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
      cols = Math.floor(p.width / scale) + 1
      rows = Math.floor(p.height / scale) + 1
      initializeFlowField()
    }

    p.mousePressed = () => {
      // Create gentle ripple effect on interaction
      const rippleCount = performance.isPerformant ? 6 : 3
      
      for (let i = 0; i < rippleCount; i++) {
        const angle = (i / rippleCount) * p.TWO_PI
        const distance = p.random(20, 40)
        const x = p.mouseX + Math.cos(angle) * distance
        const y = p.mouseY + Math.sin(angle) * distance
        
        addOrganicParticle(x, y)
      }
    }

    p5InstanceRef.current = p
  }, [isVisible, currentSection, getAdaptiveSettings, performance])

  // Initialize P5.js with error handling
  useEffect(() => {
    if (!canvasRef.current || !isVisible) return

    let cleanup: (() => void) | undefined

    // Dynamic import for optimal performance
    import('p5').then((p5Module) => {
      const P5 = p5Module.default
      const p5Instance = new P5(sketch)
      
      cleanup = () => {
        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove()
        }
      }
    }).catch(error => {
      console.warn('P5.js failed to load:', error)
    })

    return cleanup
  }, [sketch, isVisible])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove()
      }
    }
  }, [])

  return (
    <>
      <div 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
        role="presentation"
      />
      {/* Performance indicator for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-20 right-4 bg-slate-900/90 text-white p-3 rounded-lg text-xs font-mono z-50 backdrop-blur-sm">
          <div className="space-y-1">
            <div>FPS: <span className={performance.fps > 45 ? 'text-green-400' : performance.fps > 30 ? 'text-yellow-400' : 'text-red-400'}>{Math.round(performance.fps)}</span></div>
            <div>Particles: <span className="text-blue-400">{performance.particleCount}</span></div>
            <div>Section: <span className="text-blue-300">{currentSection}</span></div>
            <div className={performance.isPerformant ? 'text-green-400' : 'text-red-400'}>
              {performance.isPerformant ? '✓ Performant' : '⚠ Low Perf'}
            </div>
          </div>
        </div>
      )}
    </>
  )
}