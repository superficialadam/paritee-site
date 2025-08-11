'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import type p5 from 'p5'

// Performance monitoring interface
interface PerformanceMetrics {
  fps: number
  frameTime: number
  particleCount: number
  isPerformant: boolean
}

// Interactive particle system
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  life: number
  maxLife: number
  size: number
  color: [number, number, number]
}

// Section detection interface
interface SectionInfo {
  name: string
  progress: number
  isActive: boolean
}

// Brand colors from styleguide-d.json
const BRAND_COLORS = {
  blue600: [37, 99, 235] as [number, number, number],
  blue500: [59, 130, 246] as [number, number, number],
  blue400: [96, 165, 250] as [number, number, number],
}

export function P5InteractiveCanvas() {
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
  const [currentSection, setCurrentSection] = useState<SectionInfo>({
    name: 'home',
    progress: 0,
    isActive: true
  })
  
  // Performance monitoring
  const [performance, setPerformance] = useState<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    particleCount: 0,
    isPerformant: true
  })
  
  // Particles and interaction state
  const particlesRef = useRef<Particle[]>([])
  const mouseTrailRef = useRef<Array<{x: number, y: number, time: number}>>([])
  const lastFrameTimeRef = useRef<number>(0)
  const frameTimesRef = useRef<number[]>([])
  
  // Adaptive settings based on performance
  const getAdaptiveSettings = useCallback(() => {
    const isHighPerf = performance.fps > 45
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    
    return {
      maxParticles: isHighPerf ? (isMobile ? 30 : 50) : (isMobile ? 15 : 25),
      trailLength: isHighPerf ? 20 : 10,
      updateFrequency: isHighPerf ? 1 : 2, // Skip frames for low performance
      particleSize: isMobile ? 2 : 3,
      interactionRadius: isMobile ? 80 : 120,
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
                              entry.target.tagName.toLowerCase()
            
            setCurrentSection({
              name: sectionName,
              progress: entry.intersectionRatio,
              isActive: true
            })
          }
        })
      },
      { 
        threshold: [0.1, 0.3, 0.5, 0.7],
        rootMargin: '-10% 0px -10% 0px'
      }
    )

    sections.forEach((section) => observer.observe(section))
    
    return () => observer.disconnect()
  }, [])

  // Motion preference detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsVisible(!mediaQuery.matches)
    
    const handleChange = () => setIsVisible(!mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // P5.js sketch
  const sketch = useCallback((p: p5) => {
    let canvas: p5.Renderer
    
    p.setup = () => {
      canvas = p.createCanvas(p.windowWidth, p.windowHeight)
      canvas.parent(canvasRef.current!)
      
      // Set canvas style for proper layering
      const canvasElement = canvas.canvas as HTMLCanvasElement
      canvasElement.style.position = 'fixed'
      canvasElement.style.top = '0'
      canvasElement.style.left = '0'
      canvasElement.style.zIndex = '1'
      canvasElement.style.pointerEvents = 'none'
      canvasElement.style.mixBlendMode = 'screen'
      
      p.colorMode(p.RGB, 255, 255, 255, 1)
      p.background(0, 0)
    }

    p.draw = () => {
      if (!isVisible) return
      
      const currentTime = p.millis()
      const settings = getAdaptiveSettings()
      
      // Performance monitoring
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
      if (p.frameCount % 30 === 0) {
        setPerformance({...performanceRef.current})
      }
      
      // Clear canvas with subtle fade for trails
      p.background(0, 0, 0, 0.05)
      
      // Update mouse trail
      if (p.mouseX !== p.pmouseX || p.mouseY !== p.pmouseY) {
        mouseTrailRef.current.push({
          x: p.mouseX,
          y: p.mouseY,
          time: currentTime
        })
        
        // Limit trail length
        if (mouseTrailRef.current.length > settings.trailLength) {
          mouseTrailRef.current.shift()
        }
        
        // Add particles at cursor with section-aware colors
        if (mouseTrailRef.current.length > 1 && Math.random() < 0.3) {
          addInteractionParticle(p.mouseX, p.mouseY, currentSection.name)
        }
      }
      
      // Clean old trail points
      mouseTrailRef.current = mouseTrailRef.current.filter(
        point => currentTime - point.time < 2000
      )
      
      // Update and draw particles
      updateParticles(currentTime, settings)
      drawParticles(p, settings)
      
      // Draw cursor trail
      drawMouseTrail(p)
      
      // Section-aware ambient effects
      drawSectionEffects(p, currentTime)
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
    }

    p.mousePressed = () => {
      if (!isVisible) return
      
      // Create ripple effect on click
      createRippleEffect(p.mouseX, p.mouseY)
    }

    // Particle management functions
    const addInteractionParticle = (x: number, y: number, sectionName: string) => {
      const settings = getAdaptiveSettings()
      if (particlesRef.current.length >= settings.maxParticles) return
      
      // Choose color based on current section
      let color = BRAND_COLORS.blue500
      if (sectionName.includes('service')) color = BRAND_COLORS.blue600
      if (sectionName.includes('case')) color = BRAND_COLORS.blue400
      
      const particle: Particle = {
        x: x + p.random(-20, 20),
        y: y + p.random(-20, 20),
        vx: p.random(-2, 2),
        vy: p.random(-2, 2),
        alpha: 0.8,
        life: 0,
        maxLife: p.random(60, 120),
        size: p.random(2, settings.particleSize),
        color
      }
      
      particlesRef.current.push(particle)
    }

    const createRippleEffect = (x: number, y: number) => {
      const rippleCount = performance.isPerformant ? 8 : 4
      
      for (let i = 0; i < rippleCount; i++) {
        const angle = (i / rippleCount) * p.TWO_PI
        const speed = p.random(3, 6)
        
        const particle: Particle = {
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          life: 0,
          maxLife: 90,
          size: p.random(3, 6),
          color: BRAND_COLORS.blue400
        }
        
        particlesRef.current.push(particle)
      }
    }

    const updateParticles = (currentTime: number, settings: any) => {
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++
        
        // Fade out over time
        particle.alpha = 1 - (particle.life / particle.maxLife)
        
        // Apply subtle gravity
        particle.vy += 0.02
        
        // Fade velocity
        particle.vx *= 0.99
        particle.vy *= 0.99
        
        return particle.life < particle.maxLife && particle.alpha > 0.01
      })
    }

    const drawParticles = (p: p5, settings: any) => {
      particlesRef.current.forEach(particle => {
        p.fill(
          particle.color[0],
          particle.color[1], 
          particle.color[2],
          particle.alpha
        )
        p.noStroke()
        p.ellipse(particle.x, particle.y, particle.size)
        
        // Add subtle glow for high-performance devices
        if (settings.maxParticles > 30) {
          p.fill(
            particle.color[0],
            particle.color[1],
            particle.color[2],
            particle.alpha * 0.3
          )
          p.ellipse(particle.x, particle.y, particle.size * 2)
        }
      })
    }

    const drawMouseTrail = (p: p5) => {
      if (mouseTrailRef.current.length < 2) return
      
      p.strokeWeight(2)
      p.noFill()
      
      for (let i = 1; i < mouseTrailRef.current.length; i++) {
        const current = mouseTrailRef.current[i]
        const prev = mouseTrailRef.current[i - 1]
        const alpha = (i / mouseTrailRef.current.length) * 0.5
        
        p.stroke(BRAND_COLORS.blue400[0], BRAND_COLORS.blue400[1], BRAND_COLORS.blue400[2], alpha)
        p.line(prev.x, prev.y, current.x, current.y)
      }
    }

    const drawSectionEffects = (p: p5, currentTime: number) => {
      // Subtle ambient particles based on section
      if (p.frameCount % 120 === 0 && Math.random() < 0.5) {
        const x = p.random(p.width)
        const y = p.random(p.height)
        
        if (particlesRef.current.length < getAdaptiveSettings().maxParticles - 5) {
          addInteractionParticle(x, y, currentSection.name)
        }
      }
    }

    p5InstanceRef.current = p
  }, [isVisible, currentSection, getAdaptiveSettings])

  // Initialize P5.js
  useEffect(() => {
    if (!canvasRef.current || !isVisible) return

    // Dynamic import for better performance
    import('p5').then((p5Module) => {
      const P5 = p5Module.default
      const p5Instance = new P5(sketch)
      
      return () => {
        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove()
        }
      }
    })
  }, [sketch, isVisible])

  // Cleanup
  useEffect(() => {
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove()
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <div 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />
      {/* Performance indicator for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-20 right-4 bg-slate-900/80 text-white p-2 rounded text-xs font-mono z-50">
          <div>FPS: {Math.round(performance.fps)}</div>
          <div>Particles: {performance.particleCount}</div>
          <div>Section: {currentSection.name}</div>
          <div className={performance.isPerformant ? 'text-green-400' : 'text-red-400'}>
            {performance.isPerformant ? 'Performant' : 'Low Perf'}
          </div>
        </div>
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(P5InteractiveCanvas), {
  ssr: false,
  loading: () => null
})