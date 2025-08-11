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
    // Background is #0E2756 (14, 39, 86) - make dots slightly lighter
    this.darkBlue = [20, 47, 94] // Slightly lighter than bg, same hue
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
        
        // Interpolate color between dark blue and white
        // When luminance = 0: dark blue (slightly lighter than bg)
        // When luminance = 1: pure white
        const r = this.p.lerp(this.darkBlue[0], this.white[0], luminance)
        const g = this.p.lerp(this.darkBlue[1], this.white[1], luminance)
        const b = this.p.lerp(this.darkBlue[2], this.white[2], luminance)
        
        // All dots render at full opacity now that the base color is subtle
        this.p.fill(r, g, b, 255)
        
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
        let currentSection = 'default'
        let lastSection = 'default'
        let worldMapDots: Array<{
          x: number, y: number, 
          targetLuminance: number, 
          currentLuminance: number,
          flickerDelay: number,
          isOffice: boolean
        }> = []
        let isFillingIn = false
        let isFadingOut = false
        const SHOCKWAVE_DURATION = 3000 // ms - longer for particle system
        const RECTANGLE_WIDTH = 240 // Match the logo rectangle width in pixels
        const RECTANGLE_HEIGHT = 104 // Match the logo rectangle height in pixels
        
        // Office locations (normalized coordinates)
        const officeLocations = [
          { name: 'San Francisco', x: 0.12, y: 0.4 },
          { name: 'Minneapolis', x: 0.21, y: 0.35 },
          { name: 'New York', x: 0.35, y: 0.42 },
          { name: 'Dublin', x: 0.48, y: 0.31 },
          { name: 'London', x: 0.495, y: 0.325 },
          { name: 'Oslo', x: 0.51, y: 0.22 },
          { name: 'Copenhagen', x: 0.515, y: 0.28 },
          { name: 'Stockholm', x: 0.535, y: 0.23 },
          { name: 'Berlin', x: 0.52, y: 0.32 },
          { name: 'Frankfurt', x: 0.51, y: 0.34 },
          { name: 'Munich', x: 0.515, y: 0.36 },
          { name: 'Dubai', x: 0.62, y: 0.51 },
        ]
        
        // Generate filled continents with proper contours
        function generateFilledContinents() {
          const dots: {x: number, y: number}[] = []
          
          // Helper function to check if point is inside continent shape
          function isInsideNorthAmerica(x: number, y: number): boolean {
            // Rough North America shape with curves
            if (x < 0.08 || x > 0.38 || y < 0.15 || y > 0.52) return false
            
            // Western coast curve
            if (x <= 0.14) {
              const coastCurve = 0.24 + (0.23 * Math.sin((x - 0.08) / 0.06 * Math.PI))
              return y >= coastCurve && y <= coastCurve + 0.23
            }
            
            // Main body with northern curve and southern indent
            if (x <= 0.32) {
              const northCurve = 0.17 + 0.05 * Math.sin((x - 0.15) / 0.17 * Math.PI)
              const southCurve = 0.48 - 0.08 * Math.sin((x - 0.15) / 0.17 * Math.PI)
              return y >= northCurve && y <= southCurve
            }
            
            // Eastern coast
            const eastTop = 0.15 + 0.12 * (x - 0.32) / 0.06
            const eastBottom = 0.42 - 0.12 * (x - 0.32) / 0.06
            return y >= eastTop && y <= eastBottom
          }
          
          function isInsideSouthAmerica(x: number, y: number): boolean {
            if (x < 0.25 || x > 0.35 || y < 0.50 || y > 0.78) return false
            
            // Narrowing shape from north to south
            const width = 0.10 - 0.03 * (y - 0.50) / 0.28
            const center = 0.30 + 0.02 * Math.sin((y - 0.50) / 0.28 * Math.PI)
            return Math.abs(x - center) <= width / 2
          }
          
          function isInsideEurope(x: number, y: number): boolean {
            if (x < 0.46 || x > 0.56 || y < 0.18 || y > 0.36) return false
            
            // Irregular Europe shape
            const northCurve = 0.20 + 0.04 * Math.sin((x - 0.46) / 0.10 * Math.PI)
            const southCurve = 0.34 - 0.06 * Math.sin((x - 0.46) / 0.10 * Math.PI * 0.7)
            return y >= northCurve && y <= southCurve
          }
          
          function isInsideAfrica(x: number, y: number): boolean {
            if (x < 0.47 || x > 0.57 || y < 0.36 || y > 0.70) return false
            
            // Africa bulge shape
            let width: number
            if (y < 0.50) {
              // Northern part - wider
              width = 0.09 - 0.02 * (y - 0.36) / 0.14
            } else {
              // Southern part - narrowing
              width = 0.07 - 0.02 * (y - 0.50) / 0.20
            }
            
            const center = 0.52 + 0.01 * Math.sin((y - 0.36) / 0.34 * Math.PI)
            return Math.abs(x - center) <= width / 2
          }
          
          function isInsideAsia(x: number, y: number): boolean {
            if (x < 0.54 || x > 0.87 || y < 0.15 || y > 0.58) return false
            
            // Large irregular Asia shape
            const northBound = 0.16 + 0.04 * Math.sin((x - 0.54) / 0.33 * Math.PI)
            const southBound = 0.56 - 0.18 * Math.sin((x - 0.54) / 0.33 * Math.PI * 0.8)
            return y >= northBound && y <= southBound
          }
          
          function isInsideAustralia(x: number, y: number): boolean {
            if (x < 0.76 || x > 0.89 || y < 0.66 || y > 0.78) return false
            
            // Oval Australia shape
            const centerX = 0.825
            const centerY = 0.72
            const radiusX = 0.065
            const radiusY = 0.06
            const dx = (x - centerX) / radiusX
            const dy = (y - centerY) / radiusY
            return (dx * dx + dy * dy) <= 1
          }
          
          // Generate dots with proper continent shapes
          for (let x = 0.05; x <= 0.92; x += 0.008) {
            for (let y = 0.12; y <= 0.82; y += 0.008) {
              let isLand = false
              
              if (isInsideNorthAmerica(x, y) || 
                  isInsideSouthAmerica(x, y) || 
                  isInsideEurope(x, y) || 
                  isInsideAfrica(x, y) || 
                  isInsideAsia(x, y) || 
                  isInsideAustralia(x, y)) {
                
                // Add some randomness for organic coastlines
                if (Math.random() > 0.15) {
                  dots.push({x, y})
                }
              }
            }
          }
          
          return dots
        }
        
        const continentOutlines = generateFilledContinents()

        // Simple section detection based on scroll position
        function detectCurrentSection() {
          const sections = ['#home', '#mission', '#news', '#services', '#sectors', '#geographies', '#agencies', '#cases', '#team', '#contact']
          const viewportCenter = window.innerHeight / 2
          
          for (const sectionId of sections) {
            const section = document.querySelector(sectionId) as HTMLElement
            if (section) {
              const rect = section.getBoundingClientRect()
              if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
                return sectionId.substring(1) // Remove the #
              }
            }
          }
          return 'default'
        }
        
        // Get SVG bounds for coordinate mapping
        function getSVGBounds() {
          const geographiesSection = document.querySelector('#geographies')
          if (!geographiesSection) return null
          
          const svgImg = geographiesSection.querySelector('img') as HTMLImageElement
          if (!svgImg) return null
          
          const imgRect = svgImg.getBoundingClientRect()
          const canvasRect = p.canvas.getBoundingClientRect()
          
          // Calculate relative position of SVG within the canvas coordinate system
          const relativeX = imgRect.left - canvasRect.left
          const relativeY = imgRect.top - canvasRect.top
          
          // The image uses object-contain, so calculate actual rendered size
          const imgAspectRatio = imgRect.width / imgRect.height // Use displayed dimensions for SVG
          const containerAspectRatio = imgRect.width / imgRect.height
          
          return {
            x: relativeX,
            y: relativeY,
            width: imgRect.width,
            height: imgRect.height
          }
        }
        
        // Get section center position
        function getSectionCenter() {
          const geographiesSection = document.querySelector('#geographies')
          if (!geographiesSection) return { x: p.width / 2, y: p.height / 2 }
          
          const rect = geographiesSection.getBoundingClientRect()
          const canvasRect = p.canvas.getBoundingClientRect()
          
          // Calculate section center relative to canvas
          const sectionCenterX = (rect.left + rect.width / 2) - canvasRect.left
          const sectionCenterY = (rect.top + rect.height / 2) - canvasRect.top
          
          return { x: sectionCenterX, y: sectionCenterY }
        }

        // Initialize world map dots when entering section
        function initializeWorldMapDots() {
          worldMapDots = []
          const sectionCenter = getSectionCenter()
          
          // Size the world map
          const mapWidth = 600  // Fixed width in pixels
          const mapHeight = 400 // Fixed height in pixels
          const mapStartX = sectionCenter.x - mapWidth / 2
          const mapStartY = sectionCenter.y - mapHeight / 2
          
          // Add continent dots
          for (const continent of continentOutlines) {
            const screenX = mapStartX + (continent.x * mapWidth)
            const screenY = mapStartY + (continent.y * mapHeight)
            const col = Math.floor(screenX / display.dotSpacing)
            const row = Math.floor(screenY / display.dotSpacing)
            
            worldMapDots.push({
              x: col,
              y: row,
              targetLuminance: 0.55, // 55% white for continents
              currentLuminance: 0,
              flickerDelay: Math.random() * 30, // Much faster reveal - up to 30 frames
              isOffice: false
            })
          }
          
          // Add office dots
          for (const office of officeLocations) {
            const screenX = mapStartX + (office.x * mapWidth)
            const screenY = mapStartY + (office.y * mapHeight)
            const col = Math.floor(screenX / display.dotSpacing)
            const row = Math.floor(screenY / display.dotSpacing)
            
            worldMapDots.push({
              x: col,
              y: row,
              targetLuminance: 1.0, // Full white for offices
              currentLuminance: 0,
              flickerDelay: Math.random() * 15, // Offices appear very fast
              isOffice: true
            })
          }
        }
        
        // Update world map positions to follow scroll
        function updateWorldMapPositions() {
          const sectionCenter = getSectionCenter()
          const mapWidth = 600
          const mapHeight = 400
          const mapStartX = sectionCenter.x - mapWidth / 2
          const mapStartY = sectionCenter.y - mapHeight / 2
          
          let i = 0
          // Update continent positions
          for (const continent of continentOutlines) {
            const screenX = mapStartX + (continent.x * mapWidth)
            const screenY = mapStartY + (continent.y * mapHeight)
            const col = Math.floor(screenX / display.dotSpacing)
            const row = Math.floor(screenY / display.dotSpacing)
            
            if (worldMapDots[i]) {
              worldMapDots[i].x = col
              worldMapDots[i].y = row
            }
            i++
          }
          
          // Update office positions
          for (const office of officeLocations) {
            const screenX = mapStartX + (office.x * mapWidth)
            const screenY = mapStartY + (office.y * mapHeight)
            const col = Math.floor(screenX / display.dotSpacing)
            const row = Math.floor(screenY / display.dotSpacing)
            
            if (worldMapDots[i]) {
              worldMapDots[i].x = col
              worldMapDots[i].y = row
            }
            i++
          }
        }
        
        // Update world map animation
        function updateWorldMapAnimation() {
          for (const dot of worldMapDots) {
            if (isFillingIn) {
              // Filling in - quick flickery animation
              if (dot.flickerDelay > 0) {
                dot.flickerDelay--
              } else {
                // Much faster fill towards target
                const fillSpeed = dot.isOffice ? 0.3 : 0.25 // Faster speeds
                dot.currentLuminance = p.lerp(dot.currentLuminance, dot.targetLuminance, fillSpeed)
                
                // Add random flicker but ensure we reach target
                if (Math.random() < 0.2 && dot.currentLuminance < dot.targetLuminance * 0.9) {
                  dot.currentLuminance += (Math.random() - 0.3) * 0.15
                }
                
                // Snap to target when very close to ensure all dots reach final destination
                if (Math.abs(dot.currentLuminance - dot.targetLuminance) < 0.05) {
                  dot.currentLuminance = dot.targetLuminance
                }
              }
            } else if (isFadingOut) {
              // Fading out - individual randomness
              const fadeSpeed = (0.02 + Math.random() * 0.04) // 0.02 to 0.06 per frame
              dot.currentLuminance = Math.max(0, dot.currentLuminance - fadeSpeed)
              
              // Random flicker during fade
              if (Math.random() < 0.1) {
                dot.currentLuminance = Math.max(0, dot.currentLuminance - Math.random() * 0.1)
              }
            }
            
            // Clamp values
            dot.currentLuminance = Math.max(0, Math.min(1, dot.currentLuminance))
          }
        }
        
        // Render world map dots
        function renderWorldMap() {
          for (const dot of worldMapDots) {
            if (dot.currentLuminance > 0.01) { // Only render visible dots
              display.setPixel(dot.x, dot.y, dot.currentLuminance)
            }
          }
        }

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
          
          // Get current scroll position and detect section
          scrollY = window.pageYOffset || 0
          const scrollDelta = scrollY - lastScrollY
          
          // Always detect current section for smooth coordinate updates
          currentSection = detectCurrentSection()
          
          // Section-specific rendering
          if (currentSection === 'geographies') {
            // Check for section transitions
            if (lastSection !== 'geographies') {
              // Just entered geographies section - start filling in
              initializeWorldMapDots()
              isFillingIn = true
              isFadingOut = false
            }
            
            // Update positions to follow scroll and render world map with flicker animation
            updateWorldMapPositions()
            updateWorldMapAnimation()
            renderWorldMap()
          } else if (lastSection === 'geographies') {
            // Just left geographies section - start fading out
            isFillingIn = false
            isFadingOut = true
          }
          
          // Continue fade out animation even when not in section
          if (isFadingOut && currentSection !== 'geographies') {
            updateWorldMapPositions()
            updateWorldMapAnimation()
            renderWorldMap()
            
            // Check if all dots have faded out
            if (worldMapDots.every(dot => dot.currentLuminance <= 0)) {
              isFadingOut = false
              worldMapDots = []
            }
          }
          
          lastSection = currentSection
          
          if (currentSection !== 'geographies' && !isFadingOut) {
            // Default mode: subtle scroll-based animation
            if (Math.abs(scrollDelta) > 0.1) {
              for (let i = 0; i < 5; i++) { // Much fewer random dots
                const col = Math.floor(Math.random() * display.width)
                const row = Math.floor(Math.random() * display.height)
                const noise = (Math.sin(scrollY * 0.01 + col * 0.1 + row * 0.1) + 1) / 2
                display.setPixel(col, row, noise * 0.15) // Much more subtle
              }
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