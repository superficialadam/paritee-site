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
        
        // Interpolate color between dark blue and white
        const r = this.p.lerp(this.darkBlue[0], this.white[0], luminance)
        const g = this.p.lerp(this.darkBlue[1], this.white[1], luminance)
        const b = this.p.lerp(this.darkBlue[2], this.white[2], luminance)
        
        this.p.fill(r, g, b)
        
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
        let shockwaveActive = false
        let shockwaveRadius = 0
        let shockwaveStartTime = 0
        const SHOCKWAVE_SPEED = 0.8 // pixels per frame
        const SHOCKWAVE_THICKNESS = 3
        const SHOCKWAVE_DURATION = 2000 // ms

        p.setup = () => {
          const canvas = p.createCanvas(window.innerWidth, window.innerHeight)
          canvas.parent(canvasRef.current!)
          
          display = new DotMatrixDisplay(p)
          
          // Listen for logo animation trigger
          window.addEventListener('logoRectangleFullWidth', () => {
            shockwaveActive = true
            shockwaveRadius = 0
            shockwaveStartTime = Date.now()
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
          
          // Handle shockwave animation
          if (shockwaveActive) {
            const elapsed = Date.now() - shockwaveStartTime
            const progress = elapsed / SHOCKWAVE_DURATION
            
            if (progress < 1) {
              // Calculate wave intensity (fade out over time)
              const intensity = Math.max(0, 1 - progress) * 0.8
              
              // Draw expanding shockwave from center
              display.drawShockwave(
                display.centerX, 
                display.centerY, 
                shockwaveRadius, 
                SHOCKWAVE_THICKNESS, 
                intensity
              )
              
              shockwaveRadius += SHOCKWAVE_SPEED
              
              // Add some random sparkles around the wave
              if (Math.random() < 0.3) {
                const angle = Math.random() * Math.PI * 2
                const sparkleCol = display.centerX + Math.cos(angle) * (shockwaveRadius + Math.random() * 5 - 2.5)
                const sparkleRow = display.centerY + Math.sin(angle) * (shockwaveRadius + Math.random() * 5 - 2.5)
                display.setPixel(Math.floor(sparkleCol), Math.floor(sparkleRow), Math.random() * 0.6)
              }
            } else {
              shockwaveActive = false
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
        pointerEvents: 'none',
        opacity: 0.15
      }}
    />
  )
}