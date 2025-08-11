'use client'

import { useEffect, useRef } from 'react'

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
        let dotSpacing = 13 // 3x denser (40/3 ≈ 13)
        let baseDotSize = 4.5    // Half of previous size (9/2 = 4.5)
        let cols: number
        let rows: number
        let scrollY = 0
        let lastScrollY = 0
        let randomDots: Set<string> = new Set()
        let dotAnimationValues: Map<string, number> = new Map()
        
        // Darker blue color (darker than background #0E2756)
        const darkBlue = [8, 20, 40] // Even darker blue
        const white = [255, 255, 255] // White

        p.setup = () => {
          const canvas = p.createCanvas(window.innerWidth, window.innerHeight)
          canvas.parent(canvasRef.current!)
          
          // Calculate grid dimensions
          cols = Math.ceil(p.width / dotSpacing)
          rows = Math.ceil(p.height / dotSpacing)
          
          // Generate random set of dots to animate (10% of total)
          const totalDots = cols * rows
          const animatedDotsCount = Math.floor(totalDots * 0.1)
          
          for (let count = 0; count < animatedDotsCount; count++) {
            const i = Math.floor(Math.random() * cols)
            const j = Math.floor(Math.random() * rows)
            const dotKey = `${i}-${j}`
            randomDots.add(dotKey)
            dotAnimationValues.set(dotKey, 0) // Start at dark blue
          }
          
          // Start animation loop
          p.frameRate(60)
        }

        p.draw = () => {
          p.clear() // Transparent background
          p.noStroke()
          
          // Get current scroll position
          scrollY = window.pageYOffset || 0
          const scrollDelta = scrollY - lastScrollY
          
          // Only update animation values if there's scroll movement
          if (Math.abs(scrollDelta) > 0.1) {
            randomDots.forEach(dotKey => {
              const currentValue = dotAnimationValues.get(dotKey) || 0
              // Use scroll position to drive the sine wave
              const newValue = (Math.sin(scrollY * 0.01 + parseFloat(dotKey.split('-')[0]) * 0.1 + parseFloat(dotKey.split('-')[1]) * 0.1) + 1) / 2
              dotAnimationValues.set(dotKey, newValue)
            })
          }
          
          // Draw dot matrix grid
          for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
              const x = i * dotSpacing + dotSpacing / 2
              const y = j * dotSpacing + dotSpacing / 2
              const dotKey = `${i}-${j}`
              
              if (randomDots.has(dotKey)) {
                // Animated dot - interpolate between dark blue and white based on scroll
                const animationValue = dotAnimationValues.get(dotKey) || 0
                
                // Interpolate between dark blue and white
                const r = p.lerp(darkBlue[0], white[0], animationValue)
                const g = p.lerp(darkBlue[1], white[1], animationValue)
                const b = p.lerp(darkBlue[2], white[2], animationValue)
                
                p.fill(r, g, b)
                
                // Grow and shrink based on animation value
                const size = baseDotSize + (animationValue * baseDotSize * 1.5)
                p.circle(x, y, size)
              } else {
                // Draw normal dark blue dot
                p.fill(darkBlue[0], darkBlue[1], darkBlue[2])
                p.circle(x, y, baseDotSize)
              }
            }
          }
          
          lastScrollY = scrollY
        }

        p.windowResized = () => {
          p.resizeCanvas(window.innerWidth, window.innerHeight)
          
          // Recalculate grid dimensions
          cols = Math.ceil(p.width / dotSpacing)
          rows = Math.ceil(p.height / dotSpacing)
          
          // Regenerate random dots for new grid size
          randomDots.clear()
          dotAnimationValues.clear()
          
          const totalDots = cols * rows
          const animatedDotsCount = Math.floor(totalDots * 0.1)
          
          for (let count = 0; count < animatedDotsCount; count++) {
            const i = Math.floor(Math.random() * cols)
            const j = Math.floor(Math.random() * rows)
            const dotKey = `${i}-${j}`
            randomDots.add(dotKey)
            dotAnimationValues.set(dotKey, 0)
          }
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