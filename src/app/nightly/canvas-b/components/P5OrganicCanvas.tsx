'use client'

import { useEffect, useRef, useState } from 'react'

export default function P5OrganicCanvas() {
  const sketchRef = useRef<HTMLDivElement>(null)
  const p5Instance = useRef<any>(null)
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!sketchRef.current || typeof window === 'undefined') return

    const initP5 = async () => {
      const p5 = (await import('p5')).default
      
      const sketch = (p: any) => {
        let particles: OrganicParticle[] = []
        let flowField: any[][] = []
        let scrollOffset = 0
        let time = 0
        let cols: number, rows: number
        let scale = 20
        let zoff = 0
        let mouseInfluence = { x: 0, y: 0, strength: 0 }
        let attractor: Attractor | null = null

        // Brand blue colors from styleguide-d.json
        const colors = {
          blue600: [37, 99, 235],    // #2563eb
          blue500: [59, 130, 246],   // #3b82f6  
          blue400: [96, 165, 250],   // #60a5fa
          slate800: [30, 41, 59],    // #1e293b
          slate900: [15, 23, 42],    // #0f172a
        }

        class OrganicParticle {
          pos: any
          vel: any
          acc: any
          maxSpeed: number
          maxForce: number
          size: number
          alpha: number
          color: number[]
          life: number
          maxLife: number
          trail: any[]
          pulsation: number
          noiseOffset: number
          
          constructor(x: number, y: number) {
            this.pos = p.createVector(x, y)
            this.vel = p.createVector(0, 0)
            this.acc = p.createVector(0, 0)
            this.maxSpeed = p.random(0.5, 2)
            this.maxForce = p.random(0.03, 0.08)
            this.size = p.random(1, 4)
            this.alpha = p.random(0.3, 0.8)
            this.life = 255
            this.maxLife = 255
            this.trail = []
            this.pulsation = p.random(0.01, 0.03)
            this.noiseOffset = p.random(1000)
            
            // Assign organic color variation based on brand blues
            const colorChoice = p.random()
            if (colorChoice < 0.4) {
              this.color = colors.blue400
            } else if (colorChoice < 0.7) {
              this.color = colors.blue500
            } else {
              this.color = colors.blue600
            }
          }

          applyForce(force: any) {
            this.acc.add(force)
          }

          follow(vectors: any[][]) {
            const x = Math.floor(this.pos.x / scale)
            const y = Math.floor(this.pos.y / scale)
            
            if (x >= 0 && x < cols && y >= 0 && y < rows) {
              const desired = vectors[x][y].copy()
              desired.mult(this.maxSpeed)
              
              const steer = p5.Vector.sub(desired, this.vel)
              steer.limit(this.maxForce)
              this.applyForce(steer)
            }
          }

          // Organic attraction/repulsion to mouse
          seek(target: any, isRepulsion = false) {
            const desired = p5.Vector.sub(target, this.pos)
            const d = desired.mag()
            
            if (d < 120) { // Influence radius
              desired.normalize()
              
              if (d < 30) {
                // Close range - stronger influence
                desired.mult(this.maxSpeed * 1.5)
              } else {
                // Map speed based on distance for organic feel
                const speed = p.map(d, 0, 120, 0, this.maxSpeed)
                desired.mult(speed)
              }
              
              if (isRepulsion) {
                desired.mult(-1.5) // Stronger repulsion for organic feel
              }
              
              const steer = p5.Vector.sub(desired, this.vel)
              steer.limit(this.maxForce * 2) // Allow stronger steering for mouse interaction
              this.applyForce(steer)
            }
          }

          // Flocking behavior for organic group movement
          flock(particles: OrganicParticle[]) {
            const sep = this.separate(particles)
            const ali = this.align(particles)
            const coh = this.cohesion(particles)
            
            sep.mult(2.0)  // Stronger separation
            ali.mult(1.0)  // Normal alignment
            coh.mult(1.0)  // Normal cohesion
            
            this.applyForce(sep)
            this.applyForce(ali)
            this.applyForce(coh)
          }

          separate(particles: OrganicParticle[]) {
            const desiredSeparation = 25
            const steer = p.createVector(0, 0)
            let count = 0
            
            for (const other of particles) {
              const d = p5.Vector.dist(this.pos, other.pos)
              if (d > 0 && d < desiredSeparation) {
                const diff = p5.Vector.sub(this.pos, other.pos)
                diff.normalize()
                diff.div(d) // Weight by distance
                steer.add(diff)
                count++
              }
            }
            
            if (count > 0) {
              steer.div(count)
              steer.normalize()
              steer.mult(this.maxSpeed)
              steer.sub(this.vel)
              steer.limit(this.maxForce)
            }
            
            return steer
          }

          align(particles: OrganicParticle[]) {
            const neighborDist = 50
            const sum = p.createVector(0, 0)
            let count = 0
            
            for (const other of particles) {
              const d = p5.Vector.dist(this.pos, other.pos)
              if (d > 0 && d < neighborDist) {
                sum.add(other.vel)
                count++
              }
            }
            
            if (count > 0) {
              sum.div(count)
              sum.normalize()
              sum.mult(this.maxSpeed)
              const steer = p5.Vector.sub(sum, this.vel)
              steer.limit(this.maxForce)
              return steer
            }
            
            return p.createVector(0, 0)
          }

          cohesion(particles: OrganicParticle[]) {
            const neighborDist = 50
            const sum = p.createVector(0, 0)
            let count = 0
            
            for (const other of particles) {
              const d = p5.Vector.dist(this.pos, other.pos)
              if (d > 0 && d < neighborDist) {
                sum.add(other.pos)
                count++
              }
            }
            
            if (count > 0) {
              sum.div(count)
              return this.seek(sum)
            }
            
            return p.createVector(0, 0)
          }

          update() {
            if (prefersReducedMotion) {
              // Minimal movement for accessibility
              this.vel.mult(0.1)
              this.acc.mult(0.1)
            }

            // Add subtle noise-based movement for organic feel
            const noiseForce = p.createVector(
              p.noise(this.noiseOffset, time * 0.005) - 0.5,
              p.noise(this.noiseOffset + 1000, time * 0.005) - 0.5
            )
            noiseForce.mult(0.1)
            this.applyForce(noiseForce)

            // Update physics
            this.vel.add(this.acc)
            this.vel.limit(this.maxSpeed)
            this.pos.add(this.vel)
            this.acc.mult(0)

            // Trail management for flowing effect
            this.trail.push(this.pos.copy())
            if (this.trail.length > 8) {
              this.trail.shift()
            }

            // Wrap around edges with organic transition
            if (this.pos.x < -10) this.pos.x = p.width + 10
            if (this.pos.x > p.width + 10) this.pos.x = -10
            if (this.pos.y < -10) this.pos.y = p.height + 10
            if (this.pos.y > p.height + 10) this.pos.y = -10

            this.noiseOffset += 0.01
          }

          display() {
            p.push()
            
            // Draw organic trail
            for (let i = 0; i < this.trail.length; i++) {
              const alpha = p.map(i, 0, this.trail.length - 1, 0, this.alpha * 0.6)
              const size = p.map(i, 0, this.trail.length - 1, this.size * 0.3, this.size)
              
              p.fill(this.color[0], this.color[1], this.color[2], alpha * 255)
              p.noStroke()
              p.circle(this.trail[i].x, this.trail[i].y, size)
            }

            // Main particle with organic pulsation
            const pulsation = 1 + p.sin(time * this.pulsation) * 0.3
            const currentSize = this.size * pulsation
            
            // Layered glow effect for organic feel
            for (let i = 0; i < 3; i++) {
              const glowSize = currentSize + (i * 4)
              const glowAlpha = this.alpha / (i + 1) * 0.3
              
              p.fill(this.color[0], this.color[1], this.color[2], glowAlpha * 255)
              p.noStroke()
              p.circle(this.pos.x, this.pos.y, glowSize)
            }

            // Core particle
            p.fill(this.color[0], this.color[1], this.color[2], this.alpha * 255)
            p.noStroke()
            p.circle(this.pos.x, this.pos.y, currentSize)
            
            p.pop()
          }
        }

        class Attractor {
          pos: any
          mass: number
          
          constructor(x: number, y: number) {
            this.pos = p.createVector(x, y)
            this.mass = 20
          }

          attract(particle: OrganicParticle) {
            const force = p5.Vector.sub(this.pos, particle.pos)
            const distance = p.constrain(force.mag(), 5, 50)
            const strength = (this.mass * particle.size) / (distance * distance)
            
            force.normalize()
            force.mult(strength * 0.1)
            return force
          }

          display() {
            p.push()
            p.fill(colors.blue400[0], colors.blue400[1], colors.blue400[2], 100)
            p.noStroke()
            
            // Breathing effect
            const breathe = 1 + p.sin(time * 0.02) * 0.2
            p.circle(this.pos.x, this.pos.y, this.mass * breathe)
            p.pop()
          }
        }

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight)
          p.colorMode(p.RGB)
          
          // Initialize flow field
          cols = Math.floor(p.width / scale) + 1
          rows = Math.floor(p.height / scale) + 1
          flowField = new Array(cols)
          for (let i = 0; i < cols; i++) {
            flowField[i] = new Array(rows)
          }

          // Create organic particle system
          const particleCount = prefersReducedMotion ? 30 : 60
          for (let i = 0; i < particleCount; i++) {
            particles.push(new OrganicParticle(
              p.random(p.width), 
              p.random(p.height)
            ))
          }
        }

        p.draw = () => {
          // Organic background with subtle gradient
          p.background(colors.slate900[0], colors.slate900[1], colors.slate900[2], 25)
          
          time++
          
          // Get scroll and mouse data
          if (typeof window !== 'undefined') {
            scrollOffset = window.pageYOffset
            
            // Smooth mouse tracking
            const targetX = p.mouseX
            const targetY = p.mouseY
            mouseInfluence.x = p.lerp(mouseInfluence.x, targetX, 0.1)
            mouseInfluence.y = p.lerp(mouseInfluence.y, targetY, 0.1)
            
            // Calculate mouse strength based on movement
            const mouseSpeed = p.dist(mouseRef.current.x, mouseRef.current.y, targetX, targetY)
            mouseInfluence.strength = p.constrain(mouseSpeed * 0.1, 0, 5)
            
            mouseRef.current.prevX = mouseRef.current.x
            mouseRef.current.prevY = mouseRef.current.y
            mouseRef.current.x = targetX
            mouseRef.current.y = targetY
          }

          // Generate organic flow field using Perlin noise
          let yoff = 0
          for (let y = 0; y < rows; y++) {
            let xoff = 0
            for (let x = 0; x < cols; x++) {
              const angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 4
              const v = p.createVector(p.cos(angle), p.sin(angle))
              flowField[x][y] = v
              xoff += 0.1
            }
            yoff += 0.1
          }
          zoff += 0.01

          // Create attractor on click/tap
          if (p.mouseIsPressed && mouseInfluence.strength > 1) {
            attractor = new Attractor(mouseInfluence.x, mouseInfluence.y)
          } else if (!p.mouseIsPressed) {
            attractor = null
          }

          // Update and display particles
          for (let i = 0; i < particles.length; i++) {
            const particle = particles[i]
            
            // Apply organic forces
            particle.follow(flowField)
            particle.flock(particles)
            
            // Mouse interaction
            if (mouseInfluence.strength > 0.5) {
              const mousePos = p.createVector(mouseInfluence.x, mouseInfluence.y)
              const isRepulsion = mouseInfluence.strength > 2
              particle.seek(mousePos, isRepulsion)
            }

            // Attractor influence
            if (attractor) {
              const attractiveForce = attractor.attract(particle)
              particle.applyForce(attractiveForce)
            }

            // Scroll influence for organic page interaction
            const scrollForce = p.createVector(
              p.sin(scrollOffset * 0.001 + particle.pos.x * 0.01) * 0.1,
              p.cos(scrollOffset * 0.001 + particle.pos.y * 0.01) * 0.05
            )
            particle.applyForce(scrollForce)

            particle.update()
            particle.display()
          }

          // Draw attractor
          if (attractor) {
            attractor.display()
          }

          // Organic connecting lines for nearby particles
          p.stroke(colors.blue400[0], colors.blue400[1], colors.blue400[2], 30)
          p.strokeWeight(0.5)
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const d = p5.Vector.dist(particles[i].pos, particles[j].pos)
              if (d < 80) {
                const alpha = p.map(d, 0, 80, 40, 0)
                p.stroke(colors.blue500[0], colors.blue500[1], colors.blue500[2], alpha)
                p.line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y)
              }
            }
          }
        }

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight)
          
          // Recalculate flow field
          cols = Math.floor(p.width / scale) + 1
          rows = Math.floor(p.height / scale) + 1
          flowField = new Array(cols)
          for (let i = 0; i < cols; i++) {
            flowField[i] = new Array(rows)
          }
        }

        // Add particle burst on click
        p.mousePressed = () => {
          if (!prefersReducedMotion) {
            for (let i = 0; i < 5; i++) {
              particles.push(new OrganicParticle(
                p.mouseX + p.random(-20, 20), 
                p.mouseY + p.random(-20, 20)
              ))
            }
            
            // Limit total particles for performance
            if (particles.length > 100) {
              particles.splice(0, particles.length - 100)
            }
          }
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
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        aria-hidden="true"
      />
    )
  }

  return (
    <div 
      ref={sketchRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ backgroundColor: '#0f172a' }}
      aria-hidden="true"
      role="presentation"
    />
  )
}