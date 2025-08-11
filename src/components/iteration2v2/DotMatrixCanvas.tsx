'use client'

import { useEffect, useRef } from 'react'

// DotMatrixDisplay class - A low-resolution display for procedural grayscale animations
class DotMatrixDisplay {
  private p: any
  private cols: number
  private rows: number
  private dotSpacing: number
  private baseDotSize: number
  private luminanceGrid: number[][]
  private darkBlue: number[]
  private white: number[]
  
  constructor(p5Instance: any, spacing = 13, dotSize = 4.5) {
    this.p = p5Instance
    this.dotSpacing = spacing
    this.baseDotSize = dotSize
    this.darkBlue = [8, 20, 40] // Default dark blue
    this.white = [255, 255, 255] // White
    
    this.updateDimensions()
    this.clearDisplay()
  }
  
  updateDimensions() {
    this.cols = Math.ceil(this.p.width / this.dotSpacing)
    this.rows = Math.ceil(this.p.height / this.dotSpacing)
  }
  
  clearDisplay(luminance = 0) {
    this.luminanceGrid = Array(this.cols).fill(null).map(() => Array(this.rows).fill(luminance))
  }
  
  // Set individual pixel luminance (0 = dark blue, 1 = white)
  setPixel(col: number, row: number, luminance: number) {
    if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
      this.luminanceGrid[col][row] = Math.max(0, Math.min(1, luminance))
    }
  }
  
  // Get pixel luminance
  getPixel(col: number, row: number): number {
    if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
      return this.luminanceGrid[col][row]
    }
    return 0
  }
  
  // Draw filled circle
  drawCircle(centerCol: number, centerRow: number, radius: number, luminance: number) {
    const radiusSquared = radius * radius
    for (let col = Math.floor(centerCol - radius); col <= Math.ceil(centerCol + radius); col++) {
      for (let row = Math.floor(centerRow - radius); row <= Math.ceil(centerRow + radius); row++) {
        const distSquared = (col - centerCol) ** 2 + (row - centerRow) ** 2
        if (distSquared <= radiusSquared) {
          this.setPixel(col, row, luminance)
        }
      }
    }
  }
  
  // Draw expanding ring/wave
  drawRing(centerCol: number, centerRow: number, innerRadius: number, outerRadius: number, luminance: number) {
    const innerRadiusSquared = innerRadius * innerRadius
    const outerRadiusSquared = outerRadius * outerRadius
    
    for (let col = Math.floor(centerCol - outerRadius); col <= Math.ceil(centerCol + outerRadius); col++) {
      for (let row = Math.floor(centerRow - outerRadius); row <= Math.ceil(centerRow + outerRadius); row++) {
        const distSquared = (col - centerCol) ** 2 + (row - centerRow) ** 2
        if (distSquared >= innerRadiusSquared && distSquared <= outerRadiusSquared) {
          // Apply luminance with random variations for organic look
          const randomizedLuminance = luminance * (0.3 + Math.random() * 0.7)
          const currentLuminance = this.getPixel(col, row)
          this.setPixel(col, row, Math.max(currentLuminance, randomizedLuminance))
        }
      }
    }
  }
  
  // Create shockwave animation
  drawShockwave(centerCol: number, centerRow: number, waveRadius: number, waveThickness: number, intensity: number) {
    this.drawRing(centerCol, centerRow, waveRadius - waveThickness, waveRadius + waveThickness, intensity)
  }

  // Draw individual particle with luminance
  drawParticle(col: number, row: number, luminance: number) {
    const currentLuminance = this.getPixel(col, row)
    this.setPixel(col, row, Math.max(currentLuminance, luminance))
  }

  // Draw fuzzy particle circle with smooth falloff (uses floating point coordinates)
  drawFuzzyParticle(x: number, y: number, radius: number, luminance: number) {
    const radiusSquared = radius * radius
    const minCol = Math.floor(x - radius - 1)
    const maxCol = Math.ceil(x + radius + 1)
    const minRow = Math.floor(y - radius - 1) 
    const maxRow = Math.ceil(y + radius + 1)
    
    for (let col = minCol; col <= maxCol; col++) {
      for (let row = minRow; row <= maxRow; row++) {
        if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
          const distSquared = (col - x) ** 2 + (row - y) ** 2
          
          if (distSquared <= radiusSquared) {
            // Smooth falloff from center to edge
            const dist = Math.sqrt(distSquared)
            const falloff = Math.max(0, 1 - (dist / radius))
            const effectiveLuminance = luminance * falloff
            
            const currentLuminance = this.getPixel(col, row)
            this.setPixel(col, row, Math.max(currentLuminance, effectiveLuminance))
          }
        }
      }
    }
  }
  
  // Fade entire display towards base luminance
  fadeDisplay(fadeAmount = 0.02, baseLuminance = 0) {
    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        const current = this.luminanceGrid[col][row]
        if (current > baseLuminance) {
          this.luminanceGrid[col][row] = Math.max(baseLuminance, current - fadeAmount)
        } else if (current < baseLuminance) {
          this.luminanceGrid[col][row] = Math.min(baseLuminance, current + fadeAmount)
        }
      }
    }
  }
  
  // Render the display
  render() {
    this.p.noStroke()
    
    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        const x = col * this.dotSpacing + this.dotSpacing / 2
        const y = row * this.dotSpacing + this.dotSpacing / 2
        const luminance = this.luminanceGrid[col][row]
        
        // Apply base opacity to non-animated dots (15% for subtle background)
        // But allow full brightness for animated dots
        const baseOpacity = luminance > 0.01 ? 255 : 38 // 38/255 = ~15%
        
        // Interpolate color between dark blue and white
        const r = this.p.lerp(this.darkBlue[0], this.white[0], luminance)
        const g = this.p.lerp(this.darkBlue[1], this.white[1], luminance)
        const b = this.p.lerp(this.darkBlue[2], this.white[2], luminance)
        
        // Use alpha channel for base dots, full opacity for animated ones
        if (luminance > 0.01) {
          this.p.fill(r, g, b, 255) // Full opacity for animated dots
        } else {
          this.p.fill(r, g, b, baseOpacity) // Low opacity for background
        }
        
        // Scale size based on luminance (0 = base size, 1 = 2.5x base size)
        const size = this.baseDotSize + (luminance * this.baseDotSize * 1.5)
        this.p.circle(x, y, size)
      }
    }
  }
  
  // Resize handler
  onResize() {
    this.updateDimensions()
    // Preserve existing data if possible, or clear if dimensions changed significantly
    this.clearDisplay()
  }
  
  // Getters for external access
  get width() { return this.cols }
  get height() { return this.rows }
  get centerX() { return this.cols / 2 }
  get centerY() { return this.rows / 2 }
}

export default function DotMatrixCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const sketchRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return

    // Dynamic import of p5.js to avoid SSR issues
    const loadP5 = async () => {
      const p5Module = await import('p5')
      const p5 = p5Module.default

      const sketch = (p: any) => {
        let display: DotMatrixDisplay
        let scrollY = 0
        let lastScrollY = 0
        let particles: Array<{
          x: number, y: number, 
          vx: number, vy: number, 
          life: number, maxLife: number,
          drag: number
        }> = []
        let shockwaveActive = false
        let shockwaveStartTime = 0
        const SHOCKWAVE_DURATION = 3000 // ms - longer for particle system
        const RECTANGLE_WIDTH = 240 // Match the logo rectangle width in pixels
        const RECTANGLE_HEIGHT = 104 // Match the logo rectangle height in pixels

        p.setup = () => {
          const canvas = p.createCanvas(window.innerWidth, window.innerHeight)
          canvas.parent(canvasRef.current!)
          
          display = new DotMatrixDisplay(p)
          
          // Listen for logo animation trigger
          window.addEventListener('logoRectangleFullWidth', () => {
            shockwaveActive = true
            shockwaveStartTime = Date.now()
            particles = [] // Clear existing particles
            
            // Create particles starting from rectangle edges (convert to grid coordinates)
            const centerX = display.centerX
            const centerY = display.centerY
            const rectWidthInGrid = (RECTANGLE_WIDTH / display.dotSpacing) / 2
            const rectHeightInGrid = (RECTANGLE_HEIGHT / display.dotSpacing) / 2
            
            const particleCount = 80 // More particles for better coverage
            
            for (let i = 0; i < particleCount; i++) {
              // Create particles around the rectangle perimeter
              const angle = (i / particleCount) * Math.PI * 2
              const isOnVerticalEdge = Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))
              
              let startX, startY
              if (isOnVerticalEdge) {
                // Start from left/right edges
                startX = centerX + (Math.cos(angle) > 0 ? rectWidthInGrid : -rectWidthInGrid)
                startY = centerY + Math.sin(angle) * rectHeightInGrid
              } else {
                // Start from top/bottom edges
                startX = centerX + Math.cos(angle) * rectWidthInGrid
                startY = centerY + (Math.sin(angle) > 0 ? rectHeightInGrid : -rectHeightInGrid)
              }
              
              // Velocity based on rectangle "push" direction with randomization
              const baseSpeed = 0.3 + Math.random() * 0.7 // 0.3 to 1.0
              const velocityX = Math.cos(angle) * baseSpeed
              const velocityY = Math.sin(angle) * baseSpeed
              
              particles.push({
                x: startX,
                y: startY,
                vx: velocityX,
                vy: velocityY,
                life: 1.0, // Start at full life
                maxLife: 1.0,
                drag: 0.96 + Math.random() * 0.03 // 0.96 to 0.99 - different drag per particle
              })
            }
          })
          
          p.frameRate(60)
        }

        p.draw = () => {
          p.clear() // Transparent background
          
          // Clear display each frame
          display.clearDisplay()
          
          // Get current scroll position for subtle background animation
          scrollY = window.pageYOffset || 0
          const scrollDelta = scrollY - lastScrollY
          
          // Add subtle scroll-based random dots (10% of original intensity)
          if (Math.abs(scrollDelta) > 0.1) {
            for (let i = 0; i < 5; i++) { // Much fewer random dots
              const col = Math.floor(Math.random() * display.width)
              const row = Math.floor(Math.random() * display.height)
              const noise = (Math.sin(scrollY * 0.01 + col * 0.1 + row * 0.1) + 1) / 2
              display.setPixel(col, row, noise * 0.15) // Much more subtle
            }
          }
          
          // Handle particle-based shockwave animation
          if (shockwaveActive && particles.length > 0) {
            const elapsed = Date.now() - shockwaveStartTime
            const globalProgress = elapsed / SHOCKWAVE_DURATION
            
            if (globalProgress < 1) {
              // Update and render particles
              for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i]
                
                // Update physics
                particle.vx *= particle.drag
                particle.vy *= particle.drag
                particle.x += particle.vx
                particle.y += particle.vy
                
                // Update lifetime - particles fade out over time
                const lifetimeDecay = 0.008 + Math.random() * 0.004 // 0.008 to 0.012 per frame
                particle.life -= lifetimeDecay
                
                // Remove dead particles
                if (particle.life <= 0) {
                  particles.splice(i, 1)
                  continue
                }
                
                // Calculate luminance - start at full white and fade out
                const velocityMagnitude = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
                
                // Start at full white (1.0) and fade out over lifetime
                const lifeFade = particle.life // Linear fade from 1.0 to 0.0
                const velocityBoost = Math.min(1.2, 0.8 + velocityMagnitude * 2) // Slight velocity boost
                
                const finalLuminance = Math.max(0, Math.min(1, lifeFade * velocityBoost))
                
                // Calculate particle radius based on velocity and life (bigger when faster/younger)
                const baseRadius = 1.2 + velocityMagnitude * 0.8 // 1.2 to 2.0 radius
                const lifeRadius = 0.5 + particle.life * 0.7 // Shrink as it dies
                const particleRadius = baseRadius * lifeRadius
                
                // Draw fuzzy particle at floating point position for smooth movement
                display.drawFuzzyParticle(particle.x, particle.y, particleRadius, finalLuminance)
              }
            } else {
              shockwaveActive = false
              particles = []
            }
          }
          
          // Fade display slowly
          display.fadeDisplay(0.01)
          
          // Render the display
          display.render()
          
          lastScrollY = scrollY
        }

        p.windowResized = () => {
          p.resizeCanvas(window.innerWidth, window.innerHeight)
          display.onResize()
        }
      }

      // Create p5 instance
      sketchRef.current = new p5(sketch)
    }
    
    loadP5()

    // Cleanup function
    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove()
        sketchRef.current = null
      }
    }
  }, [])

  return (
    <div 
      ref={canvasRef} 
      className="dot-matrix-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  )
}