'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  targetX: number
  targetY: number
  alpha: number
  size: number
  isWorldMap: boolean
  mapX?: number
  mapY?: number
}

export default function P5BackgroundV4D() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const p5Instance = useRef<any>(null)

  useEffect(() => {
    if (!canvasRef.current || typeof window === 'undefined') return

    // Track if component is still mounted
    let isMounted = true
    
    const initP5 = async () => {
      // Prevent multiple instances
      if (p5Instance.current) {
        return
      }

      try {
        const p5 = (await import('p5')).default
        
        const sketch = (p: any) => {
      let particles: Particle[] = []
      let mouseRadius = 150
      let isFooterVisible = false
      let transitionProgress = 0
      let gridSpacing = 40
      let cols: number
      let rows: number
      
      // World map coordinate approximations (simplified)
      const worldMapPoints = [
        // North America
        { x: 0.2, y: 0.3 }, { x: 0.25, y: 0.35 }, { x: 0.3, y: 0.4 },
        // Europe
        { x: 0.5, y: 0.25 }, { x: 0.52, y: 0.28 }, { x: 0.54, y: 0.3 },
        // Asia
        { x: 0.7, y: 0.3 }, { x: 0.75, y: 0.32 }, { x: 0.8, y: 0.35 },
        // Africa
        { x: 0.5, y: 0.5 }, { x: 0.52, y: 0.55 }, { x: 0.54, y: 0.6 },
        // South America
        { x: 0.35, y: 0.6 }, { x: 0.37, y: 0.65 }, { x: 0.39, y: 0.7 },
        // Australia
        { x: 0.8, y: 0.7 }, { x: 0.82, y: 0.72 },
        // Additional points for density
        { x: 0.15, y: 0.25 }, { x: 0.18, y: 0.28 }, { x: 0.22, y: 0.32 },
        { x: 0.28, y: 0.38 }, { x: 0.32, y: 0.42 }, { x: 0.42, y: 0.22 },
        { x: 0.45, y: 0.24 }, { x: 0.48, y: 0.26 }, { x: 0.55, y: 0.32 },
        { x: 0.58, y: 0.34 }, { x: 0.62, y: 0.28 }, { x: 0.65, y: 0.31 },
        { x: 0.68, y: 0.33 }, { x: 0.72, y: 0.36 }, { x: 0.78, y: 0.38 },
        { x: 0.48, y: 0.48 }, { x: 0.46, y: 0.52 }, { x: 0.5, y: 0.58 },
        { x: 0.33, y: 0.58 }, { x: 0.31, y: 0.62 }, { x: 0.36, y: 0.68 },
        { x: 0.78, y: 0.68 }, { x: 0.76, y: 0.66 }, { x: 0.84, y: 0.74 }
      ]

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
        canvas.parent(canvasRef.current!)
        
        cols = Math.floor(p.width / gridSpacing)
        rows = Math.floor(p.height / gridSpacing)
        
        initializeParticles()
      }

      const initializeParticles = () => {
        particles = []
        
        // Create regular grid of particles
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = i * gridSpacing + gridSpacing / 2
            const y = j * gridSpacing + gridSpacing / 2
            
            particles.push({
              x: x + p.random(-10, 10),
              y: y + p.random(-10, 10),
              targetX: x,
              targetY: y,
              alpha: p.random(0.1, 0.3),
              size: p.random(1, 2),
              isWorldMap: false
            })
          }
        }
        
        // Add world map particles
        worldMapPoints.forEach(point => {
          const mapX = point.x * p.width
          const mapY = point.y * p.height
          
          particles.push({
            x: mapX + p.random(-20, 20),
            y: mapY + p.random(-20, 20),
            targetX: mapX,
            targetY: mapY,
            mapX,
            mapY,
            alpha: 0,
            size: p.random(2, 4),
            isWorldMap: true
          })
        })
      }

      p.draw = () => {
        // Exit if component unmounted
        if (!isMounted) {
          p.noLoop()
          return
        }
        
        p.clear()
        
        // Check if footer is visible (scroll position)
        const scrollY = window.scrollY
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const footerThreshold = documentHeight - windowHeight - 500
        
        isFooterVisible = scrollY > footerThreshold
        
        // Update transition progress
        if (isFooterVisible && transitionProgress < 1) {
          transitionProgress = p.lerp(transitionProgress, 1, 0.02)
        } else if (!isFooterVisible && transitionProgress > 0) {
          transitionProgress = p.lerp(transitionProgress, 0, 0.02)
        }

        // Update and draw particles
        particles.forEach((particle, index) => {
          updateParticle(particle, index)
          drawParticle(particle)
        })
        
        // Draw connections for world map
        if (transitionProgress > 0.3) {
          drawWorldMapConnections()
        }
      }

      const updateParticle = (particle: Particle, index: number) => {
        const mouseX = p.mouseX
        const mouseY = p.mouseY
        const distance = p.dist(particle.x, particle.y, mouseX, mouseY)
        
        // Mouse interaction for non-map particles
        if (!particle.isWorldMap && distance < mouseRadius) {
          const angle = p.atan2(particle.y - mouseY, particle.x - mouseX)
          const force = p.map(distance, 0, mouseRadius, 10, 0)
          
          particle.targetX = particle.x + p.cos(angle) * force
          particle.targetY = particle.y + p.sin(angle) * force
        } else if (!particle.isWorldMap) {
          // Return to grid position
          const originalX = (index % cols) * gridSpacing + gridSpacing / 2
          const originalY = Math.floor(index / cols) * gridSpacing + gridSpacing / 2
          
          particle.targetX = p.lerp(particle.targetX, originalX, 0.05)
          particle.targetY = p.lerp(particle.targetY, originalY, 0.05)
        }
        
        // World map transformation
        if (particle.isWorldMap) {
          const targetAlpha = transitionProgress * 0.8
          particle.alpha = p.lerp(particle.alpha, targetAlpha, 0.02)
          
          if (particle.mapX && particle.mapY) {
            particle.targetX = p.lerp(particle.targetX, particle.mapX, 0.02)
            particle.targetY = p.lerp(particle.targetY, particle.mapY, 0.02)
          }
        } else {
          // Regular particles fade during transition
          const targetAlpha = p.map(transitionProgress, 0, 1, p.random(0.1, 0.3), 0.05)
          particle.alpha = p.lerp(particle.alpha, targetAlpha, 0.02)
        }
        
        // Update position
        particle.x = p.lerp(particle.x, particle.targetX, 0.1)
        particle.y = p.lerp(particle.y, particle.targetY, 0.1)
      }

      const drawParticle = (particle: Particle) => {
        if (particle.alpha < 0.01) return
        
        p.push()
        
        if (particle.isWorldMap) {
          // World map particles - gold color
          p.fill(212, 175, 55, particle.alpha * 255)
          p.noStroke()
        } else {
          // Regular particles - subtle gray
          p.fill(100, 100, 100, particle.alpha * 255)
          p.noStroke()
        }
        
        p.circle(particle.x, particle.y, particle.size)
        p.pop()
      }

      const drawWorldMapConnections = () => {
        if (transitionProgress < 0.5) return
        
        const mapParticles = particles.filter(p => p.isWorldMap && p.alpha > 0.1)
        
        p.stroke(212, 175, 55, transitionProgress * 50)
        p.strokeWeight(0.5)
        
        for (let i = 0; i < mapParticles.length; i++) {
          for (let j = i + 1; j < mapParticles.length; j++) {
            const p1 = mapParticles[i]
            const p2 = mapParticles[j]
            const distance = p.dist(p1.x, p1.y, p2.x, p2.y)
            
            if (distance < 200) {
              const alpha = p.map(distance, 0, 200, 30, 0) * transitionProgress
              p.stroke(212, 175, 55, alpha)
              p.line(p1.x, p1.y, p2.x, p2.y)
            }
          }
        }
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
        cols = Math.floor(p.width / gridSpacing)
        rows = Math.floor(p.height / gridSpacing)
        initializeParticles()
      }

      p.mouseMoved = () => {
        // Add subtle particle disturbance on mouse move
        return false
      }
    }

        p5Instance.current = new p5(sketch, canvasRef.current)
      } catch (error) {
        console.error('P5.js initialization error:', error)
      }
    }
    
    initP5()

    return () => {
      isMounted = false
      if (p5Instance.current) {
        try {
          p5Instance.current.remove()
          p5Instance.current = null
        } catch (error) {
          console.warn('P5.js cleanup error:', error)
        }
      }
    }
  }, [])

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        mixBlendMode: 'multiply',
        opacity: 0.6
      }}
    />
  )
}