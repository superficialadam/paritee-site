'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function P5OrganicCanvas() {
  const sketchRef = useRef<HTMLDivElement>(null)
  const p5Instance = useRef<any>(null)
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

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
      try {
        const p5 = (await import('p5')).default
        
        const sketch = (p: any) => {
          let particles: OrganicParticle[] = []
          let flowField: any[][] = []
          let scrollOffset = 0
          let time = 0
          let cols: number, rows: number
          let scale = 25
          let zoff = 0
          let mouseInfluence = { x: 0, y: 0, strength: 0 }

          // Brand-consistent colors from styleguide-d
          const colors = {
            blue600: [37, 99, 235],    // #2563eb - Primary brand blue
            blue500: [59, 130, 246],   // #3b82f6 - Secondary brand blue
            blue400: [96, 165, 250],   // #60a5fa - Accent brand blue
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
              this.maxSpeed = p.random(0.3, 1.5)
              this.maxForce = p.random(0.02, 0.06)
              this.size = p.random(1, 3)
              this.alpha = p.random(0.2, 0.6)
              this.life = 255
              this.maxLife = 255
              this.trail = []
              this.pulsation = p.random(0.005, 0.02)
              this.noiseOffset = p.random(1000)
              
              // Brand-consistent color selection
              const colorChoice = p.random()
              if (colorChoice < 0.5) {
                this.color = colors.blue400  // Most common - lighter blue
              } else if (colorChoice < 0.8) {
                this.color = colors.blue500  // Secondary - medium blue
              } else {
                this.color = colors.blue600  // Accent - darker blue
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

            // Brand-consistent mouse interaction
            seek(target: any, isRepulsion = false) {
              const desired = p5.Vector.sub(target, this.pos)
              const d = desired.mag()
              
              if (d < 100) { // Brand-appropriate influence radius
                desired.normalize()
                
                if (d < 25) {
                  desired.mult(this.maxSpeed * 1.2)
                } else {
                  const speed = p.map(d, 0, 100, 0, this.maxSpeed)
                  desired.mult(speed)
                }
                
                if (isRepulsion) {
                  desired.mult(-1.2)
                }
                
                const steer = p5.Vector.sub(desired, this.vel)
                steer.limit(this.maxForce * 1.5)
                this.applyForce(steer)
              }
            }

            update() {
              if (prefersReducedMotion) {
                this.vel.mult(0.05) // Minimal movement for accessibility
                this.acc.mult(0.05)
              }

              // Subtle brand-consistent noise movement
              const noiseForce = p.createVector(
                p.noise(this.noiseOffset, time * 0.003) - 0.5,
                p.noise(this.noiseOffset + 1000, time * 0.003) - 0.5
              )
              noiseForce.mult(0.05)
              this.applyForce(noiseForce)

              this.vel.add(this.acc)
              this.vel.limit(this.maxSpeed)
              this.pos.add(this.vel)
              this.acc.mult(0)

              // Brand-consistent trail management
              this.trail.push(this.pos.copy())
              if (this.trail.length > 6) {
                this.trail.shift()
              }

              // Wrap around edges smoothly
              if (this.pos.x < -10) this.pos.x = p.width + 10
              if (this.pos.x > p.width + 10) this.pos.x = -10
              if (this.pos.y < -10) this.pos.y = p.height + 10
              if (this.pos.y > p.height + 10) this.pos.y = -10

              this.noiseOffset += 0.005
            }

            display() {
              p.push()
              
              // Refined trail with brand colors
              for (let i = 0; i < this.trail.length; i++) {
                const alpha = p.map(i, 0, this.trail.length - 1, 0, this.alpha * 0.4)
                const size = p.map(i, 0, this.trail.length - 1, this.size * 0.2, this.size)
                
                p.fill(this.color[0], this.color[1], this.color[2], alpha * 255)
                p.noStroke()
                p.circle(this.trail[i].x, this.trail[i].y, size)
              }

              // Main particle with subtle brand-consistent pulsation
              const pulsation = 1 + p.sin(time * this.pulsation) * 0.15
              const currentSize = this.size * pulsation
              
              // Professional glow effect
              for (let i = 0; i < 2; i++) {
                const glowSize = currentSize + (i * 2)
                const glowAlpha = this.alpha / (i + 1) * 0.2
                
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

            // Brand-appropriate particle count
            const particleCount = prefersReducedMotion ? 20 : 40
            for (let i = 0; i < particleCount; i++) {
              particles.push(new OrganicParticle(
                p.random(p.width), 
                p.random(p.height)
              ))
            }
            
            setIsLoaded(true)
          }

          p.draw = () => {
            // Professional background fade
            p.background(colors.slate900[0], colors.slate900[1], colors.slate900[2], 15)
            
            time++
            
            // Smooth mouse and scroll tracking
            if (typeof window !== 'undefined') {
              scrollOffset = window.pageYOffset
              
              const targetX = p.mouseX
              const targetY = p.mouseY
              mouseInfluence.x = p.lerp(mouseInfluence.x, targetX, 0.08)
              mouseInfluence.y = p.lerp(mouseInfluence.y, targetY, 0.08)
              
              const mouseSpeed = p.dist(mouseRef.current.x, mouseRef.current.y, targetX, targetY)
              mouseInfluence.strength = p.constrain(mouseSpeed * 0.05, 0, 3)
              
              mouseRef.current.prevX = mouseRef.current.x
              mouseRef.current.prevY = mouseRef.current.y
              mouseRef.current.x = targetX
              mouseRef.current.y = targetY
            }

            // Brand-consistent flow field
            let yoff = 0
            for (let y = 0; y < rows; y++) {
              let xoff = 0
              for (let x = 0; x < cols; x++) {
                const angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 2
                const v = p.createVector(p.cos(angle), p.sin(angle))
                flowField[x][y] = v
                xoff += 0.08
              }
              yoff += 0.08
            }
            zoff += 0.005

            // Update and display particles
            for (let i = 0; i < particles.length; i++) {
              const particle = particles[i]
              
              particle.follow(flowField)
              
              // Refined mouse interaction
              if (mouseInfluence.strength > 0.3) {
                const mousePos = p.createVector(mouseInfluence.x, mouseInfluence.y)
                const isRepulsion = mouseInfluence.strength > 1.5
                particle.seek(mousePos, isRepulsion)
              }

              // Subtle scroll influence
              const scrollForce = p.createVector(
                p.sin(scrollOffset * 0.0005 + particle.pos.x * 0.005) * 0.03,
                p.cos(scrollOffset * 0.0005 + particle.pos.y * 0.005) * 0.02
              )
              particle.applyForce(scrollForce)

              particle.update()
              particle.display()
            }

            // Brand-consistent connecting lines
            p.stroke(colors.blue400[0], colors.blue400[1], colors.blue400[2], 20)
            p.strokeWeight(0.3)
            for (let i = 0; i < particles.length; i++) {
              for (let j = i + 1; j < particles.length; j++) {
                const d = p5.Vector.dist(particles[i].pos, particles[j].pos)
                if (d < 60) {
                  const alpha = p.map(d, 0, 60, 25, 0)
                  p.stroke(colors.blue500[0], colors.blue500[1], colors.blue500[2], alpha)
                  p.line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y)
                }
              }
            }
          }

          p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight)
            
            cols = Math.floor(p.width / scale) + 1
            rows = Math.floor(p.height / scale) + 1
            flowField = new Array(cols)
            for (let i = 0; i < cols; i++) {
              flowField[i] = new Array(rows)
            }
          }

          // Professional particle burst on interaction
          p.mousePressed = () => {
            if (!prefersReducedMotion && particles.length < 60) {
              for (let i = 0; i < 3; i++) {
                particles.push(new OrganicParticle(
                  p.mouseX + p.random(-15, 15), 
                  p.mouseY + p.random(-15, 15)
                ))
              }
            }
          }
        }

        p5Instance.current = new p5(sketch, sketchRef.current)
      } catch (error) {
        console.warn('P5.js failed to load:', error)
        setIsLoaded(false)
      }
    }
    
    if (!prefersReducedMotion) {
      initP5()
    } else {
      setIsLoaded(true)
    }

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove()
      }
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return (
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        {/* Static brand-consistent subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-gradient-to-r from-blue-600/10 via-transparent to-blue-400/10" />
      </motion.div>
    )
  }

  return (
    <motion.div 
      ref={sketchRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ backgroundColor: '#0f172a' }}
      aria-hidden="true"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}