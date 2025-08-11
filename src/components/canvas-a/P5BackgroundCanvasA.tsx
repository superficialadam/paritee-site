'use client'

import { useEffect, useRef } from 'react'

export default function P5BackgroundCanvasA() {
  const sketchRef = useRef<HTMLDivElement>(null)
  const p5Instance = useRef<any>(null)

  useEffect(() => {
    if (!sketchRef.current || typeof window === 'undefined') return

    const initP5 = async () => {
      const p5 = (await import('p5')).default
      
      const sketch = (p: any) => {
        let time = 0
        let scrollOffset = 0
        let mouseInfluence = { x: 0, y: 0 }
        let currentSection = 0
        let grid: GeometricGrid
        let spirals: FibonacciSpiral[] = []
        let lineSystem: StructuredLineSystem

        // Brand color palette from styleguide-d.json
        const brandColors = {
          blue600: [37, 99, 235],      // #2563eb
          blue500: [59, 130, 246],     // #3b82f6  
          blue400: [96, 165, 250],     // #60a5fa
          slate200: [226, 232, 240],   // #e2e8f0
          slate300: [203, 213, 225],   // #cbd5e1
          slate400: [148, 163, 184],   // #94a3b8
          slate600: [71, 85, 105],     // #475569
          slate700: [51, 65, 85],      // #334155
          slate800: [30, 41, 59],      // #1e293b
          slate900: [15, 23, 42],      // #0f172a
        }

        // Geometric Grid System
        class GeometricGrid {
          cells: GridCell[]
          gridSize: number
          
          constructor() {
            this.gridSize = 60
            this.cells = []
            this.generateGrid()
          }

          generateGrid() {
            const cols = Math.ceil(p.windowWidth / this.gridSize) + 2
            const rows = Math.ceil(p.windowHeight / this.gridSize) + 2
            
            for (let x = -1; x < cols; x++) {
              for (let y = -1; y < rows; y++) {
                this.cells.push(new GridCell(x * this.gridSize, y * this.gridSize, this.gridSize))
              }
            }
          }

          update() {
            const mouseX = p.mouseX || p.windowWidth / 2
            const mouseY = p.mouseY || p.windowHeight / 2
            
            for (let cell of this.cells) {
              const distance = p.dist(mouseX, mouseY, cell.x + cell.size/2, cell.y + cell.size/2)
              cell.update(time, scrollOffset, distance)
            }
          }

          draw() {
            for (let cell of this.cells) {
              cell.draw()
            }
          }

          resize() {
            this.cells = []
            this.generateGrid()
          }
        }

        class GridCell {
          x: number
          y: number
          size: number
          rotation: number
          opacity: number
          type: 'square' | 'circle' | 'line'
          colorIndex: number

          constructor(x: number, y: number, size: number) {
            this.x = x
            this.y = y
            this.size = size
            this.rotation = 0
            this.opacity = 0.1
            this.type = p.random(['square', 'circle', 'line'])
            this.colorIndex = Math.floor(p.random(3)) // 0, 1, or 2 for blue variants
          }

          update(time: number, scroll: number, mouseDistance: number) {
            // Subtle rotation based on time and scroll
            this.rotation += 0.002 + (scroll * 0.00001)
            
            // Mouse interaction - closer cells become more visible
            const maxDistance = 200
            if (mouseDistance < maxDistance) {
              const influence = p.map(mouseDistance, 0, maxDistance, 0.8, 0.1)
              this.opacity = p.lerp(this.opacity, influence, 0.05)
            } else {
              this.opacity = p.lerp(this.opacity, 0.1, 0.02)
            }

            // Section-based pattern changes
            const sectionInfluence = currentSection * 0.1
            this.rotation += sectionInfluence * 0.001
          }

          draw() {
            p.push()
            p.translate(this.x + this.size/2, this.y + this.size/2)
            p.rotate(this.rotation)

            // Select color based on index
            const colors = [brandColors.blue600, brandColors.blue500, brandColors.blue400]
            const color = colors[this.colorIndex]
            
            p.strokeWeight(1)
            p.stroke(...color, this.opacity * 255)
            p.noFill()

            // Draw different geometric shapes
            switch (this.type) {
              case 'square':
                p.rect(-this.size/4, -this.size/4, this.size/2, this.size/2)
                break
              case 'circle':
                p.circle(0, 0, this.size/2)
                break
              case 'line':
                p.line(-this.size/3, -this.size/3, this.size/3, this.size/3)
                p.line(this.size/3, -this.size/3, -this.size/3, this.size/3)
                break
            }

            p.pop()
          }
        }

        // Fibonacci Spiral System
        class FibonacciSpiral {
          centerX: number
          centerY: number
          scale: number
          rotation: number
          opacity: number
          points: { x: number, y: number, age: number }[]

          constructor(x: number, y: number) {
            this.centerX = x
            this.centerY = y
            this.scale = p.random(0.5, 2)
            this.rotation = 0
            this.opacity = 0.3
            this.points = []
            this.generatePoints()
          }

          generatePoints() {
            const goldenAngle = Math.PI * (3 - Math.sqrt(5)) // Golden angle in radians
            const numPoints = 89 // Fibonacci number
            
            for (let i = 0; i < numPoints; i++) {
              const radius = Math.sqrt(i) * this.scale * 8
              const angle = i * goldenAngle + this.rotation
              
              this.points.push({
                x: this.centerX + radius * Math.cos(angle),
                y: this.centerY + radius * Math.sin(angle),
                age: i / numPoints
              })
            }
          }

          update(mouseX: number, mouseY: number) {
            this.rotation += 0.005
            
            // Mouse interaction
            const distance = p.dist(mouseX, mouseY, this.centerX, this.centerY)
            if (distance < 300) {
              this.opacity = p.map(distance, 0, 300, 0.6, 0.2)
            } else {
              this.opacity = p.lerp(this.opacity, 0.2, 0.02)
            }

            // Regenerate points with new rotation
            this.points = []
            this.generatePoints()
          }

          draw() {
            p.push()
            
            // Draw connections between spiral points
            p.strokeWeight(0.5)
            for (let i = 0; i < this.points.length - 1; i++) {
              const point1 = this.points[i]
              const point2 = this.points[i + 1]
              
              const alpha = this.opacity * (1 - point1.age) * 255
              p.stroke(...brandColors.blue500, alpha)
              
              p.line(point1.x, point1.y, point2.x, point2.y)
            }

            // Draw points
            p.noStroke()
            for (let point of this.points) {
              const alpha = this.opacity * (1 - point.age * 0.7) * 255
              p.fill(...brandColors.blue400, alpha)
              p.circle(point.x, point.y, 2 * (1 - point.age))
            }
            
            p.pop()
          }
        }

        // Structured Line System
        class StructuredLineSystem {
          lines: StructuredLine[]

          constructor() {
            this.lines = []
            this.generateLines()
          }

          generateLines() {
            // Create horizontal and vertical line patterns
            const spacing = 80
            
            // Horizontal lines
            for (let y = 0; y < p.windowHeight + spacing; y += spacing) {
              this.lines.push(new StructuredLine(0, y, p.windowWidth, y, 'horizontal'))
            }
            
            // Vertical lines
            for (let x = 0; x < p.windowWidth + spacing; x += spacing) {
              this.lines.push(new StructuredLine(x, 0, x, p.windowHeight, 'vertical'))
            }
          }

          update() {
            for (let line of this.lines) {
              line.update(time, scrollOffset, mouseInfluence)
            }
          }

          draw() {
            for (let line of this.lines) {
              line.draw()
            }
          }

          resize() {
            this.lines = []
            this.generateLines()
          }
        }

        class StructuredLine {
          x1: number
          y1: number
          x2: number
          y2: number
          type: 'horizontal' | 'vertical'
          segments: LineSegment[]
          baseOpacity: number

          constructor(x1: number, y1: number, x2: number, y2: number, type: 'horizontal' | 'vertical') {
            this.x1 = x1
            this.y1 = y1
            this.x2 = x2
            this.y2 = y2
            this.type = type
            this.segments = []
            this.baseOpacity = 0.05
            this.createSegments()
          }

          createSegments() {
            const numSegments = 20
            for (let i = 0; i < numSegments; i++) {
              const t = i / (numSegments - 1)
              const x = p.lerp(this.x1, this.x2, t)
              const y = p.lerp(this.y1, this.y2, t)
              this.segments.push(new LineSegment(x, y, i))
            }
          }

          update(time: number, scroll: number, mouse: { x: number, y: number }) {
            for (let segment of this.segments) {
              segment.update(time, scroll, mouse)
            }
          }

          draw() {
            p.strokeWeight(0.5)
            
            for (let i = 0; i < this.segments.length - 1; i++) {
              const seg1 = this.segments[i]
              const seg2 = this.segments[i + 1]
              
              const alpha = (seg1.opacity + seg2.opacity) / 2 * 255
              p.stroke(...brandColors.slate400, alpha)
              
              p.line(seg1.x, seg1.y, seg2.x, seg2.y)
            }
          }
        }

        class LineSegment {
          x: number
          y: number
          index: number
          opacity: number
          originalOpacity: number

          constructor(x: number, y: number, index: number) {
            this.x = x
            this.y = y
            this.index = index
            this.opacity = 0.05
            this.originalOpacity = 0.05
          }

          update(time: number, scroll: number, mouse: { x: number, y: number }) {
            const distance = p.dist(mouse.x, mouse.y, this.x, this.y)
            const maxDistance = 150
            
            if (distance < maxDistance) {
              const influence = p.map(distance, 0, maxDistance, 0.4, this.originalOpacity)
              this.opacity = p.lerp(this.opacity, influence, 0.1)
            } else {
              this.opacity = p.lerp(this.opacity, this.originalOpacity, 0.05)
            }
          }
        }

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight)
          p.pixelDensity(1) // Optimize for performance
          
          // Initialize systems with a delay for better initial load
          setTimeout(() => {
            grid = new GeometricGrid()
            lineSystem = new StructuredLineSystem()
            
            // Create fibonacci spirals at strategic points
            spirals.push(new FibonacciSpiral(p.windowWidth * 0.2, p.windowHeight * 0.3))
            spirals.push(new FibonacciSpiral(p.windowWidth * 0.8, p.windowHeight * 0.7))
            spirals.push(new FibonacciSpiral(p.windowWidth * 0.6, p.windowHeight * 0.2))
          }, 100)
        }

        p.draw = () => {
          // Performance optimization: Skip frames if performance is poor
          if (p.frameRate() < 30 && p.frameCount % 2 === 0) return
          
          // Sophisticated background with gradient effect
          p.background(15, 23, 42) // slate-900
          
          time++
          
          // Early exit if systems not initialized yet
          if (!grid || !lineSystem) return
          
          // Update mouse influence with smoothing
          if (typeof window !== 'undefined') {
            scrollOffset = window.pageYOffset
            mouseInfluence.x = p.lerp(mouseInfluence.x, p.mouseX || p.windowWidth / 2, 0.05)
            mouseInfluence.y = p.lerp(mouseInfluence.y, p.mouseY || p.windowHeight / 2, 0.05)
            
            // Detect current section for pattern variations
            currentSection = Math.floor(scrollOffset / (p.windowHeight * 0.8))
          }

          // Performance optimization: Update systems every other frame when performance drops
          const shouldUpdate = p.frameRate() > 45 || p.frameCount % 2 === 0

          if (shouldUpdate) {
            // Update and draw line system (background layer)
            lineSystem.update()
          }
          lineSystem.draw()

          if (shouldUpdate) {
            // Update and draw geometric grid (middle layer)
            grid.update()
          }
          grid.draw()

          // Update and draw fibonacci spirals (foreground layer) - always update for smooth interaction
          for (let spiral of spirals) {
            spiral.update(mouseInfluence.x, mouseInfluence.y)
            spiral.draw()
          }

          // Add subtle overlay for depth
          p.fill(15, 23, 42, 10) // Very transparent slate-900
          p.noStroke()
          p.rect(0, 0, p.windowWidth, p.windowHeight)
        }

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight)
          grid.resize()
          lineSystem.resize()
          
          // Regenerate spirals for new canvas size
          spirals = []
          spirals.push(new FibonacciSpiral(p.windowWidth * 0.2, p.windowHeight * 0.3))
          spirals.push(new FibonacciSpiral(p.windowWidth * 0.8, p.windowHeight * 0.7))
          spirals.push(new FibonacciSpiral(p.windowWidth * 0.6, p.windowHeight * 0.2))
        }
      }

      p5Instance.current = new p5(sketch, sketchRef.current)
    }
    
    initP5()

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove()
      }
    }
  }, [])

  return (
    <div 
      ref={sketchRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ backgroundColor: '#0f172a' }} // slate-900
    />
  )
}