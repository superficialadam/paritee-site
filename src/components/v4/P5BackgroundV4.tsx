'use client'

import { useEffect, useRef } from 'react'

export default function P5BackgroundV4() {
  const sketchRef = useRef<HTMLDivElement>(null)
  const p5Instance = useRef<any>(null)

  useEffect(() => {
    if (!sketchRef.current || typeof window === 'undefined') return

    const initP5 = async () => {
      const p5 = (await import('p5')).default
      
      const sketch = (p: any) => {
        let particles: Particle[] = []
        let scrollOffset = 0
        let time = 0

        // V4 Enhanced particle colors
        const particleColors = {
          primary: [122, 156, 198, 0.6],   // Soft blue
          secondary: [156, 174, 138, 0.4], // Sage
          accent: [212, 184, 134, 0.3],    // Gold
        }

        class Particle {
          x: number
          y: number
          vx: number
          vy: number
          size: number
          alpha: number
          connections: Particle[]
          colorType: 'primary' | 'secondary' | 'accent'

          constructor() {
            this.x = p.random(p.windowWidth)
            this.y = p.random(p.windowHeight)
            this.vx = p.random(-0.3, 0.3)
            this.vy = p.random(-0.3, 0.3)
            this.size = p.random(2, 8)
            this.alpha = p.random(0.4, 0.9)
            this.connections = []
            
            // Assign color based on position for subtle gradients
            const colorIndex = Math.floor(this.x / p.windowWidth * 3)
            this.colorType = ['primary', 'secondary', 'accent'][colorIndex] as 'primary' | 'secondary' | 'accent'
          }

          update() {
            // Enhanced scroll influence with smoother movement
            const scrollInfluence = scrollOffset * 0.0008
            this.x += this.vx + scrollInfluence
            this.y += this.vy + p.sin(time * 0.008 + this.x * 0.008) * 0.3

            // Smooth wrap around edges with fade effect
            if (this.x > p.windowWidth + 50) this.x = -50
            if (this.x < -50) this.x = p.windowWidth + 50
            if (this.y > p.windowHeight + 50) this.y = -50
            if (this.y < -50) this.y = p.windowHeight + 50

            // Subtle size pulsing
            this.size += p.sin(time * 0.01 + this.x * 0.005) * 0.1
          }

          draw() {
            p.push()
            const color = particleColors[this.colorType]
            p.fill(...color.slice(0, 3), color[3] * this.alpha * 255)
            p.noStroke()
            
            // Enhanced glow effect
            for (let i = 3; i >= 0; i--) {
              const glowAlpha = (color[3] * this.alpha * 255) / (i + 1)
              p.fill(...color.slice(0, 3), glowAlpha)
              p.circle(this.x, this.y, this.size + i * 2)
            }
            
            // Draw sophisticated connections
            for (let other of this.connections) {
              const d = p.dist(this.x, this.y, other.x, other.y)
              if (d < 180) {
                const lineAlpha = p.map(d, 0, 180, 0.4, 0) * this.alpha
                
                // Use gradient-like connection colors
                const mixedColor = [
                  (color[0] + particleColors[other.colorType][0]) / 2,
                  (color[1] + particleColors[other.colorType][1]) / 2,
                  (color[2] + particleColors[other.colorType][2]) / 2
                ]
                
                p.stroke(...mixedColor, lineAlpha * 255)
                p.strokeWeight(0.8)
                p.line(this.x, this.y, other.x, other.y)
              }
            }
            p.pop()
          }

          findConnections() {
            this.connections = []
            for (let other of particles) {
              if (other !== this) {
                const d = p.dist(this.x, this.y, other.x, other.y)
                if (d < 180 && this.connections.length < 4) {
                  this.connections.push(other)
                }
              }
            }
          }
        }

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight)
          
          // Create more particles for richer effect
          for (let i = 0; i < 95; i++) {
            particles.push(new Particle())
          }
        }

        p.draw = () => {
          // Enhanced background with subtle motion blur
          p.background(14, 39, 86, 20)
          
          time++
          
          // Get scroll position with smoothing
          if (typeof window !== 'undefined') {
            scrollOffset = window.pageYOffset
          }

          // Update particles and find connections
          for (let particle of particles) {
            particle.update()
            particle.findConnections()
          }

          // Draw particles with depth sorting
          particles.sort((a, b) => a.size - b.size)
          for (let particle of particles) {
            particle.draw()
          }
        }

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight)
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
      style={{ backgroundColor: '#0E2756' }}
    />
  )
}