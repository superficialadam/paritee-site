'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import type p5 from 'p5'

// Advanced performance monitoring
interface PerformanceMetrics {
  fps: number
  frameTime: number
  particleCount: number
  memoryUsage: number
  isPerformant: boolean
  renderMode: 'high' | 'medium' | 'low'
  gpuTier: number
}

// Enhanced particle system
interface AdvancedParticle {
  x: number
  y: number
  vx: number
  vy: number
  ax: number
  ay: number
  alpha: number
  life: number
  maxLife: number
  size: number
  color: [number, number, number]
  trail: Array<{x: number, y: number, alpha: number}>
  energy: number
  mass: number
  charge: number
  behavior: 'organic' | 'geometric' | 'flow' | 'interactive'
  pulsation: number
  magnetism: number
}

// Section-aware configuration
interface SectionConfig {
  particleDensity: number
  colorPalette: Array<[number, number, number]>
  motionComplexity: number
  interactionStrength: number
  visualEffects: string[]
}

// Brand colors from styleguide
const BRAND_COLORS = {
  blue600: [37, 99, 235] as [number, number, number],
  blue500: [59, 130, 246] as [number, number, number],
  blue400: [96, 165, 250] as [number, number, number],
  slate900: [15, 23, 42] as [number, number, number],
  slate800: [30, 41, 59] as [number, number, number],
}

// GPU performance detection
function detectGPUTier(): Promise<number> {
  return new Promise((resolve) => {
    // Create test canvas for GPU benchmarking
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    
    if (!gl) {
      resolve(1) // Low tier
      return
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      
      // Basic GPU tier detection based on renderer string
      if (renderer.includes('RTX') || renderer.includes('RX 6') || renderer.includes('M1') || renderer.includes('M2')) {
        resolve(3) // High tier
      } else if (renderer.includes('GTX') || renderer.includes('RX 5') || renderer.includes('Iris')) {
        resolve(2) // Medium tier
      } else {
        resolve(1) // Low tier
      }
    } else {
      // Fallback performance test
      const start = performance.now()
      const vertices = new Float32Array(10000)
      const buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
      const end = performance.now()
      
      resolve(end - start < 5 ? 3 : end - start < 15 ? 2 : 1)
    }
  })
}

export default function P5AdvancedCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const p5InstanceRef = useRef<p5 | null>(null)
  const performanceRef = useRef<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    particleCount: 0,
    memoryUsage: 0,
    isPerformant: true,
    renderMode: 'high',
    gpuTier: 2
  })
  
  // Advanced state management
  const [isVisible, setIsVisible] = useState(true)
  const [gpuTier, setGpuTier] = useState(2)
  const [currentSection, setCurrentSection] = useState('home')
  const [renderQuality, setRenderQuality] = useState<'high' | 'medium' | 'low'>('high')
  
  // Performance monitoring state
  const particlesRef = useRef<AdvancedParticle[]>([])
  const frameTimesRef = useRef<number[]>([])
  const lastFrameTimeRef = useRef(0)
  const performanceCheckRef = useRef(0)
  
  // Interaction state
  const mouseTrailRef = useRef<Array<{x: number, y: number, time: number, intensity: number}>>([])
  const attractorsRef = useRef<Array<{x: number, y: number, strength: number, type: string}>>([])
  
  // GPU tier detection on mount
  useEffect(() => {
    detectGPUTier().then(tier => {
      setGpuTier(tier)
      performanceRef.current.gpuTier = tier
      setRenderQuality(tier === 3 ? 'high' : tier === 2 ? 'medium' : 'low')
    })
  }, [])

  // Section detection with enhanced intersection observer
  useEffect(() => {
    const sections = document.querySelectorAll('section, [data-section]')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            const sectionName = entry.target.id || 
                              entry.target.getAttribute('data-section') || 
                              'default'
            setCurrentSection(sectionName)
          }
        })
      },
      { 
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: '-10% 0px -20% 0px'
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Reduced motion detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsVisible(!mediaQuery.matches)
    
    const handleChange = () => setIsVisible(!mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Get section-specific configuration
  const getSectionConfig = useCallback((sectionName: string): SectionConfig => {
    const configs: Record<string, SectionConfig> = {
      home: {
        particleDensity: 0.8,
        colorPalette: [BRAND_COLORS.blue500, BRAND_COLORS.blue400],
        motionComplexity: 1.0,
        interactionStrength: 1.0,
        visualEffects: ['flow', 'connection', 'pulse']
      },
      services: {
        particleDensity: 1.2,
        colorPalette: [BRAND_COLORS.blue600, BRAND_COLORS.blue500],
        motionComplexity: 1.3,
        interactionStrength: 1.5,
        visualEffects: ['geometric', 'grid', 'energy']
      },
      cases: {
        particleDensity: 0.9,
        colorPalette: [BRAND_COLORS.blue400, BRAND_COLORS.blue500],
        motionComplexity: 0.8,
        interactionStrength: 1.2,
        visualEffects: ['organic', 'trail', 'breathe']
      },
      contact: {
        particleDensity: 0.6,
        colorPalette: [BRAND_COLORS.blue500],
        motionComplexity: 0.7,
        interactionStrength: 2.0,
        visualEffects: ['attract', 'pulse', 'connect']
      }
    }
    
    return configs[sectionName] || configs.home
  }, [])

  // Advanced particle system
  const createAdvancedParticle = useCallback((p: p5, x: number, y: number, behavior: AdvancedParticle['behavior'] = 'organic'): AdvancedParticle => {
    const config = getSectionConfig(currentSection)
    const color = config.colorPalette[Math.floor(Math.random() * config.colorPalette.length)]
    
    return {
      x: x + p.random(-30, 30),
      y: y + p.random(-30, 30),
      vx: p.random(-1, 1) * config.motionComplexity,
      vy: p.random(-1, 1) * config.motionComplexity,
      ax: 0,
      ay: 0,
      alpha: p.random(0.4, 0.8),
      life: 0,
      maxLife: p.random(120, 240),
      size: p.random(1, 4) * (renderQuality === 'high' ? 1 : 0.7),
      color,
      trail: [],
      energy: p.random(0.5, 2.0),
      mass: p.random(0.8, 1.5),
      charge: p.random(-1, 1),
      behavior,
      pulsation: p.random(0.01, 0.03),
      magnetism: p.random(0.1, 0.5)
    }
  }, [currentSection, renderQuality, getSectionConfig])

  // Enhanced P5.js sketch
  const sketch = useCallback((p: p5) => {
    let canvas: p5.Renderer
    let time = 0
    let flowField: p5.Vector[][] = []
    const scale = 25
    let cols: number, rows: number
    let zoff = 0
    
    // Performance tracking
    let lastPerformanceCheck = 0
    let frameCount = 0
    let totalFrameTime = 0

    p.setup = () => {
      canvas = p.createCanvas(p.windowWidth, p.windowHeight)
      canvas.parent(canvasRef.current!)
      
      // Optimize canvas for performance
      const canvasElement = canvas.canvas as HTMLCanvasElement
      canvasElement.style.position = 'fixed'
      canvasElement.style.top = '0'
      canvasElement.style.left = '0'
      canvasElement.style.zIndex = '1'
      canvasElement.style.pointerEvents = 'none'
      canvasElement.style.mixBlendMode = 'screen'
      canvasElement.style.willChange = 'transform'
      
      p.colorMode(p.RGB, 255, 255, 255, 1)
      p.background(0, 0)
      
      // Initialize flow field
      cols = Math.floor(p.width / scale) + 1
      rows = Math.floor(p.height / scale) + 1
      flowField = Array(cols).fill(null).map(() => Array(rows).fill(null))
      
      // Initialize particles based on GPU tier
      const initialCount = gpuTier === 3 ? 60 : gpuTier === 2 ? 40 : 20
      for (let i = 0; i < initialCount; i++) {
        particlesRef.current.push(
          createAdvancedParticle(p, p.random(p.width), p.random(p.height))
        )
      }
    }

    p.draw = () => {
      if (!isVisible) return
      
      const startTime = performance.now()
      time++
      frameCount++
      
      const config = getSectionConfig(currentSection)
      
      // Adaptive performance monitoring
      if (time % 60 === 0) {
        const avgFrameTime = totalFrameTime / frameCount
        const currentFps = 1000 / avgFrameTime
        
        performanceRef.current.fps = currentFps
        performanceRef.current.frameTime = avgFrameTime
        performanceRef.current.particleCount = particlesRef.current.length
        performanceRef.current.isPerformant = currentFps > 30
        
        // Adaptive quality adjustment
        if (currentFps < 25 && renderQuality !== 'low') {
          setRenderQuality(renderQuality === 'high' ? 'medium' : 'low')
          // Remove excess particles
          particlesRef.current.splice(particlesRef.current.length / 2)
        } else if (currentFps > 50 && renderQuality !== 'high' && gpuTier > 1) {
          setRenderQuality(renderQuality === 'low' ? 'medium' : 'high')
        }
        
        frameCount = 0
        totalFrameTime = 0
      }
      
      // Background with subtle gradient fade
      p.background(BRAND_COLORS.slate900[0], BRAND_COLORS.slate900[1], BRAND_COLORS.slate900[2], 0.08)
      
      // Update flow field for organic movement
      updateFlowField(p)
      
      // Update mouse trail with enhanced tracking
      updateMouseTrail(p)
      
      // Update and render particles
      updateParticles(p, config)
      renderParticles(p, config)
      
      // Render advanced effects based on section
      renderSectionEffects(p, config)
      
      // Performance tracking
      const endTime = performance.now()
      totalFrameTime += (endTime - startTime)
    }

    // Flow field generation with Perlin noise
    const updateFlowField = (p: p5) => {
      let yoff = 0
      for (let y = 0; y < rows; y++) {
        let xoff = 0
        for (let x = 0; x < cols; x++) {
          const angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 3
          const magnitude = p.noise(xoff + 1000, yoff + 1000, zoff) * 2
          flowField[x][y] = p5.Vector.fromAngle(angle).mult(magnitude)
          xoff += 0.08
        }
        yoff += 0.08
      }
      zoff += 0.005
    }

    // Enhanced mouse tracking
    const updateMouseTrail = (p: p5) => {
      if (p.mouseX !== p.pmouseX || p.mouseY !== p.pmouseY) {
        const intensity = p.dist(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY) / 10
        mouseTrailRef.current.push({
          x: p.mouseX,
          y: p.mouseY,
          time: p.millis(),
          intensity: Math.min(intensity, 5)
        })
        
        // Limit trail length based on performance
        const maxTrailLength = renderQuality === 'high' ? 30 : renderQuality === 'medium' ? 20 : 10
        if (mouseTrailRef.current.length > maxTrailLength) {
          mouseTrailRef.current.shift()
        }
      }
      
      // Clean old trail points
      mouseTrailRef.current = mouseTrailRef.current.filter(
        point => p.millis() - point.time < 3000
      )
    }

    // Advanced particle physics
    const updateParticles = (p: p5, config: SectionConfig) => {
      particlesRef.current = particlesRef.current.filter(particle => {
        // Apply flow field
        const x = Math.floor(particle.x / scale)
        const y = Math.floor(particle.y / scale)
        
        if (x >= 0 && x < cols && y >= 0 && y < rows && flowField[x][y]) {
          const force = flowField[x][y].copy()
          force.mult(0.1 * config.motionComplexity)
          particle.ax += force.x
          particle.ay += force.y
        }
        
        // Mouse interaction
        mouseTrailRef.current.forEach(point => {
          const distance = p.dist(particle.x, particle.y, point.x, point.y)
          if (distance < 100) {
            const force = (100 - distance) / 100
            const angle = Math.atan2(particle.y - point.y, particle.x - point.x)
            const strength = point.intensity * config.interactionStrength * 0.1
            
            particle.ax += Math.cos(angle) * force * strength
            particle.ay += Math.sin(angle) * force * strength
          }
        })
        
        // Particle interactions (flocking/magnetism)
        if (renderQuality === 'high') {
          particlesRef.current.forEach(other => {
            if (other === particle) return
            
            const distance = p.dist(particle.x, particle.y, other.x, other.y)
            if (distance < 60 && distance > 0) {
              const force = particle.charge * other.charge / (distance * distance)
              const angle = Math.atan2(other.y - particle.y, other.x - particle.x)
              
              particle.ax += Math.cos(angle) * force * 0.01
              particle.ay += Math.sin(angle) * force * 0.01
            }
          })
        }
        
        // Apply physics
        particle.vx += particle.ax
        particle.vy += particle.ay
        particle.vx *= 0.98 // Damping
        particle.vy *= 0.98
        
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Reset acceleration
        particle.ax = 0
        particle.ay = 0
        
        // Update trail
        if (renderQuality !== 'low') {
          particle.trail.push({
            x: particle.x,
            y: particle.y,
            alpha: particle.alpha * 0.5
          })
          
          const maxTrailLength = renderQuality === 'high' ? 10 : 5
          if (particle.trail.length > maxTrailLength) {
            particle.trail.shift()
          }
        }
        
        // Boundary wrapping
        if (particle.x < -50) particle.x = p.width + 50
        if (particle.x > p.width + 50) particle.x = -50
        if (particle.y < -50) particle.y = p.height + 50
        if (particle.y > p.height + 50) particle.y = -50
        
        // Age particle
        particle.life++
        particle.alpha = Math.max(0, 1 - (particle.life / particle.maxLife))
        
        return particle.life < particle.maxLife
      })
    }

    // Advanced particle rendering
    const renderParticles = (p: p5, config: SectionConfig) => {
      particlesRef.current.forEach(particle => {
        p.push()
        
        // Render trail
        if (renderQuality !== 'low' && particle.trail.length > 1) {
          for (let i = 1; i < particle.trail.length; i++) {
            const current = particle.trail[i]
            const prev = particle.trail[i - 1]
            const alpha = (i / particle.trail.length) * current.alpha
            
            p.stroke(particle.color[0], particle.color[1], particle.color[2], alpha)
            p.strokeWeight(1)
            p.line(prev.x, prev.y, current.x, current.y)
          }
        }
        
        // Main particle with pulsation
        const pulsation = 1 + Math.sin(time * particle.pulsation) * 0.2
        const currentSize = particle.size * pulsation
        
        // Layered glow effect for high quality
        if (renderQuality === 'high') {
          for (let i = 0; i < 3; i++) {
            const glowSize = currentSize + (i * 3)
            const glowAlpha = particle.alpha / (i + 2)
            
            p.fill(particle.color[0], particle.color[1], particle.color[2], glowAlpha)
            p.noStroke()
            p.ellipse(particle.x, particle.y, glowSize)
          }
        }
        
        // Core particle
        p.fill(particle.color[0], particle.color[1], particle.color[2], particle.alpha)
        p.noStroke()
        p.ellipse(particle.x, particle.y, currentSize)
        
        p.pop()
      })
    }

    // Section-specific visual effects
    const renderSectionEffects = (p: p5, config: SectionConfig) => {
      if (config.visualEffects.includes('connection')) {
        renderConnections(p, config)
      }
      
      if (config.visualEffects.includes('grid') && renderQuality !== 'low') {
        renderEnergyGrid(p, config)
      }
      
      if (config.visualEffects.includes('attract')) {
        renderAttractors(p, config)
      }
    }

    // Connection lines between nearby particles
    const renderConnections = (p: p5, config: SectionConfig) => {
      p.stroke(config.colorPalette[0][0], config.colorPalette[0][1], config.colorPalette[0][2], 0.3)
      p.strokeWeight(0.5)
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const distance = p.dist(
            particlesRef.current[i].x, particlesRef.current[i].y,
            particlesRef.current[j].x, particlesRef.current[j].y
          )
          
          if (distance < 120) {
            const alpha = p.map(distance, 0, 120, 0.4, 0) * config.motionComplexity
            p.stroke(config.colorPalette[0][0], config.colorPalette[0][1], config.colorPalette[0][2], alpha)
            p.line(
              particlesRef.current[i].x, particlesRef.current[i].y,
              particlesRef.current[j].x, particlesRef.current[j].y
            )
          }
        }
      }
    }

    // Energy grid visualization
    const renderEnergyGrid = (p: p5, config: SectionConfig) => {
      p.stroke(config.colorPalette[0][0], config.colorPalette[0][1], config.colorPalette[0][2], 0.1)
      p.strokeWeight(0.3)
      
      const gridSize = 60
      for (let x = 0; x < p.width; x += gridSize) {
        for (let y = 0; y < p.height; y += gridSize) {
          const intensity = p.noise(x * 0.01, y * 0.01, time * 0.001)
          if (intensity > 0.6) {
            p.stroke(config.colorPalette[0][0], config.colorPalette[0][1], config.colorPalette[0][2], intensity * 0.3)
            p.point(x, y)
          }
        }
      }
    }

    // Attractor visualization
    const renderAttractors = (p: p5, config: SectionConfig) => {
      attractorsRef.current.forEach(attractor => {
        p.fill(config.colorPalette[0][0], config.colorPalette[0][1], config.colorPalette[0][2], 0.2)
        p.noStroke()
        const breathe = 1 + Math.sin(time * 0.02) * 0.3
        p.ellipse(attractor.x, attractor.y, attractor.strength * breathe)
      })
    }

    // Handle mouse interactions
    p.mousePressed = () => {
      if (!isVisible) return
      
      // Add burst of particles
      const burstCount = renderQuality === 'high' ? 8 : renderQuality === 'medium' ? 5 : 3
      for (let i = 0; i < burstCount; i++) {
        if (particlesRef.current.length < (gpuTier * 30)) {
          particlesRef.current.push(
            createAdvancedParticle(p, p.mouseX, p.mouseY, 'interactive')
          )
        }
      }
      
      // Add attractor
      attractorsRef.current.push({
        x: p.mouseX,
        y: p.mouseY,
        strength: 30,
        type: 'click'
      })
      
      // Clean up old attractors
      setTimeout(() => {
        attractorsRef.current.shift()
      }, 2000)
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
      
      // Recalculate flow field
      cols = Math.floor(p.width / scale) + 1
      rows = Math.floor(p.height / scale) + 1
      flowField = Array(cols).fill(null).map(() => Array(rows).fill(null))
    }
  }, [isVisible, currentSection, renderQuality, gpuTier, getSectionConfig, createAdvancedParticle])

  // Initialize P5.js with error handling
  useEffect(() => {
    if (!canvasRef.current || !isVisible) return

    let p5Instance: p5 | null = null

    const initP5 = async () => {
      try {
        const p5Module = await import('p5')
        const P5 = p5Module.default
        p5Instance = new P5(sketch)
        p5InstanceRef.current = p5Instance
      } catch (error) {
        console.error('Failed to load P5.js:', error)
      }
    }

    initP5()

    return () => {
      if (p5Instance) {
        p5Instance.remove()
        p5InstanceRef.current = null
      }
    }
  }, [sketch, isVisible])

  // Memory management and cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      // Clean up particles periodically
      if (particlesRef.current.length > gpuTier * 40) {
        particlesRef.current.splice(0, 10)
      }
      
      // Clean up old trail points
      mouseTrailRef.current = mouseTrailRef.current.slice(-20)
      
      // Memory usage estimation
      const estimatedMemory = particlesRef.current.length * 0.1 + mouseTrailRef.current.length * 0.05
      performanceRef.current.memoryUsage = estimatedMemory
    }, 5000)

    return () => clearInterval(interval)
  }, [gpuTier])

  if (!isVisible) return null

  return (
    <div 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
      role="presentation"
    />
  )
}