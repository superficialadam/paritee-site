'use client'

import { useEffect, useRef } from 'react'

interface Blob {
  x: number
  y: number
  size: number
  targetX: number
  targetY: number
  targetSize: number
  vertices: { x: number; y: number; targetX: number; targetY: number }[]
  color: string
  opacity: number
  rotation: number
  rotationSpeed: number
}

const P5BackgroundV4B = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const p5InstanceRef = useRef<any>(null)

  useEffect(() => {
    if (!canvasRef.current || typeof window === 'undefined') return

    // Track if component is still mounted
    let isMounted = true
    
    const initP5 = async () => {
      // Prevent multiple instances
      if (p5InstanceRef.current) {
        return
      }

      try {
        const p5 = (await import('p5')).default

        let blobs: Blob[] = []
        let glitchMode = false
        let glitchTimer = 0
        let scrollY = 0
        let animationId: number

    const sketch = (p: p5) => {
      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
        canvas.parent(canvasRef.current!)
        
        // Initialize organic blob shapes
        for (let i = 0; i < 5; i++) {
          const blob: Blob = {
            x: p.random(p.width),
            y: p.random(p.height),
            size: p.random(200, 400),
            targetX: p.random(p.width),
            targetY: p.random(p.height),
            targetSize: p.random(200, 400),
            vertices: [],
            color: i % 2 === 0 ? '#FF0000' : '#FFFFFF',
            opacity: p.random(0.1, 0.3),
            rotation: 0,
            rotationSpeed: p.random(-0.01, 0.01)
          }

          // Create organic vertices for blob shape
          const vertexCount = 8
          for (let j = 0; j < vertexCount; j++) {
            const angle = (j / vertexCount) * p.TWO_PI
            const radius = blob.size * p.random(0.5, 1.2)
            blob.vertices.push({
              x: p.cos(angle) * radius,
              y: p.sin(angle) * radius,
              targetX: p.cos(angle) * radius,
              targetY: p.sin(angle) * radius
            })
          }

          blobs.push(blob)
        }
      }

      p.draw = () => {
        // Exit if component unmounted
        if (!isMounted) {
          p.noLoop()
          return
        }
        
        p.clear()
        
        // Update scroll position
        if (typeof window !== 'undefined') {
          scrollY = window.scrollY
        }

        // Glitch effect trigger
        glitchTimer++
        if (glitchTimer > 300) {
          glitchMode = !glitchMode
          glitchTimer = 0
        }

        // Update and draw blobs
        blobs.forEach((blob, index) => {
          // Smooth movement towards targets
          blob.x = p.lerp(blob.x, blob.targetX, 0.02)
          blob.y = p.lerp(blob.y, blob.targetY, 0.02)
          blob.size = p.lerp(blob.size, blob.targetSize, 0.03)
          blob.rotation += blob.rotationSpeed

          // Scroll-based morphing
          const scrollInfluence = scrollY * 0.001
          blob.y += Math.sin(p.millis() * 0.001 + index) * 2
          blob.x += Math.cos(p.millis() * 0.0008 + index) * 1.5

          // Update vertex positions for organic morphing
          blob.vertices.forEach((vertex, vIndex) => {
            const angle = (vIndex / blob.vertices.length) * p.TWO_PI + blob.rotation
            const baseRadius = blob.size * 0.5
            const morphOffset = Math.sin(p.millis() * 0.003 + vIndex + index) * 50
            const scrollMorph = scrollInfluence * 30 * Math.sin(angle)
            
            vertex.targetX = p.cos(angle) * (baseRadius + morphOffset + scrollMorph)
            vertex.targetY = p.sin(angle) * (baseRadius + morphOffset + scrollMorph)
            
            vertex.x = p.lerp(vertex.x, vertex.targetX, 0.05)
            vertex.y = p.lerp(vertex.y, vertex.targetY, 0.05)
          })

          // Randomly update targets
          if (p.random() < 0.005) {
            blob.targetX = p.random(p.width)
            blob.targetY = p.random(p.height)
            blob.targetSize = p.random(150, 500)
          }

          // Draw blob with organic curves
          p.push()
          p.translate(blob.x, blob.y)
          
          // Apply glitch effect
          if (glitchMode && index === 0) {
            p.translate(p.random(-20, 20), p.random(-20, 20))
            p.tint(255, p.random(100, 255))
          }

          // Set color and opacity
          if (blob.color === '#FF0000') {
            p.fill(255, 0, 0, blob.opacity * 255)
          } else {
            p.fill(255, 255, 255, blob.opacity * 255)
          }
          p.noStroke()

          // Draw organic blob shape
          p.beginShape()
          blob.vertices.forEach((vertex, vIndex) => {
            if (vIndex === 0) {
              p.vertex(vertex.x, vertex.y)
            } else {
              const prevVertex = blob.vertices[vIndex - 1]
              const controlX = (prevVertex.x + vertex.x) * 0.5
              const controlY = (prevVertex.y + vertex.y) * 0.5
              p.quadraticVertex(prevVertex.x, prevVertex.y, controlX, controlY)
            }
          })
          // Close the shape
          const firstVertex = blob.vertices[0]
          const lastVertex = blob.vertices[blob.vertices.length - 1]
          p.quadraticVertex(lastVertex.x, lastVertex.y, firstVertex.x, firstVertex.y)
          p.endShape(p.CLOSE)
          
          p.pop()
        })

        // Geometric pattern overlay with glitch
        if (glitchMode) {
          p.stroke(255, 0, 0, 100)
          p.strokeWeight(1)
          p.noFill()
          
          for (let i = 0; i < 10; i++) {
            const x = p.random(p.width)
            const y = p.random(p.height)
            const size = p.random(50, 200)
            
            p.push()
            p.translate(x, y)
            p.rotate(p.millis() * 0.001)
            
            // Draw fragmented geometric shapes
            for (let j = 0; j < 6; j++) {
              const angle = (j / 6) * p.TWO_PI
              const x1 = p.cos(angle) * size
              const y1 = p.sin(angle) * size
              const x2 = p.cos(angle + p.PI / 3) * size * 0.5
              const y2 = p.sin(angle + p.PI / 3) * size * 0.5
              
              if (p.random() > 0.5) {
                p.line(0, 0, x1, y1)
                p.line(x1, y1, x2, y2)
              }
            }
            p.pop()
          }
        }

        // Parallax lines
        p.stroke(255, 255, 255, 30)
        p.strokeWeight(0.5)
        for (let i = 0; i < 20; i++) {
          const y = (i * p.height / 20) - (scrollY * (0.1 + i * 0.05)) % p.height
          const wave = Math.sin(p.millis() * 0.001 + i * 0.5) * 100
          p.line(0, y + wave, p.width, y + wave)
        }
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
        
        // Reposition blobs on resize
        blobs.forEach(blob => {
          blob.targetX = p.random(p.width)
          blob.targetY = p.random(p.height)
        })
      }
    }

        p5InstanceRef.current = new p5(sketch, canvasRef.current)
      } catch (error) {
        console.error('P5.js initialization error:', error)
      }
    }
    
    initP5()

    return () => {
      isMounted = false
      if (p5InstanceRef.current) {
        try {
          p5InstanceRef.current.remove()
          p5InstanceRef.current = null
        } catch (error) {
          console.warn('P5.js cleanup error:', error)
        }
      }
    }
  }, [])

  return (
    <div 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        mixBlendMode: 'screen'
      }}
    />
  )
}

export default P5BackgroundV4B