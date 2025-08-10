'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

export default function P5Background() {
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

      class Particle {
        x: number
        y: number
        vx: number
        vy: number
        size: number
        alpha: number
        connections: Particle[]

        constructor() {
          this.x = p.random(p.windowWidth)
          this.y = p.random(p.windowHeight)
          this.vx = p.random(-0.5, 0.5)
          this.vy = p.random(-0.5, 0.5)
          this.size = p.random(2, 6)
          this.alpha = p.random(0.3, 0.8)
          this.connections = []
        }

        update() {
          // Scroll influence on movement
          const scrollInfluence = scrollOffset * 0.001
          this.x += this.vx + scrollInfluence
          this.y += this.vy + p.sin(time * 0.01 + this.x * 0.01) * 0.2

          // Wrap around edges
          if (this.x > p.windowWidth + 50) this.x = -50
          if (this.x < -50) this.x = p.windowWidth + 50
          if (this.y > p.windowHeight + 50) this.y = -50
          if (this.y < -50) this.y = p.windowHeight + 50
        }

        draw() {
          p.push()
          p.fill(255, this.alpha * 255)
          p.noStroke()
          p.circle(this.x, this.y, this.size)
          
          // Draw connections
          for (let other of this.connections) {
            const d = p.dist(this.x, this.y, other.x, other.y)
            if (d < 150) {
              const lineAlpha = p.map(d, 0, 150, 0.3, 0) * this.alpha
              p.stroke(255, lineAlpha * 255)
              p.strokeWeight(0.5)
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
              if (d < 150 && this.connections.length < 3) {
                this.connections.push(other)
              }
            }
          }
        }
      }

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        
        // Create particles
        for (let i = 0; i < 80; i++) {
          particles.push(new Particle())
        }
      }

      p.draw = () => {
        // Dark blue background with slight transparency for motion blur effect
        p.background(14, 39, 86, 25)
        
        time++
        
        // Get scroll position
        if (typeof window !== 'undefined') {
          scrollOffset = window.pageYOffset
        }

        // Update particles and find connections
        for (let particle of particles) {
          particle.update()
          particle.findConnections()
        }

        // Draw particles
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