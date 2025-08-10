'use client'

import { useEffect, useRef } from 'react'

export default function P5BackgroundV4C() {
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

        const sketch = (p: any) => {
        let matrixChars: MatrixChar[] = []
        let scanlines: Scanline[] = []
        let glitchEffect = false
        let glitchTimer = 0
        let digitalRain: DigitalRain[] = []
        let geometricShapes: GeometricShape[] = []
        
        interface MatrixChar {
          x: number
          y: number
          char: string
          opacity: number
          size: number
          speed: number
          color: [number, number, number]
        }

        interface Scanline {
          y: number
          speed: number
          intensity: number
        }

        interface DigitalRain {
          x: number
          y: number
          speed: number
          chars: string[]
          trail: number[]
        }

        interface GeometricShape {
          x: number
          y: number
          size: number
          rotation: number
          rotSpeed: number
          opacity: number
          pulsePhase: number
          type: 'square' | 'triangle' | 'hexagon'
        }

        const matrixCharset = '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ'
        
        p.setup = () => {
          const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
          canvas.parent(canvasRef.current!)
          
          // Initialize matrix characters
          for (let i = 0; i < 150; i++) {
            matrixChars.push({
              x: p.random(p.width),
              y: p.random(p.height),
              char: p.random(matrixCharset.split('')),
              opacity: p.random(0.1, 0.8),
              size: p.random(8, 16),
              speed: p.random(0.5, 2),
              color: p.random() > 0.7 ? [255, 0, 0] : p.random() > 0.5 ? [0, 150, 255] : [100, 255, 100]
            })
          }

          // Initialize scanlines
          for (let i = 0; i < 5; i++) {
            scanlines.push({
              y: p.random(p.height),
              speed: p.random(2, 8),
              intensity: p.random(0.3, 0.7)
            })
          }

          // Initialize digital rain
          for (let i = 0; i < 30; i++) {
            const rainChars = []
            const trail = []
            for (let j = 0; j < 20; j++) {
              rainChars.push(p.random(matrixCharset.split('')))
              trail.push(p.random(0.1, 1))
            }
            digitalRain.push({
              x: p.random(p.width),
              y: p.random(-500, 0),
              speed: p.random(3, 8),
              chars: rainChars,
              trail: trail
            })
          }

          // Initialize geometric shapes
          for (let i = 0; i < 20; i++) {
            geometricShapes.push({
              x: p.random(p.width),
              y: p.random(p.height),
              size: p.random(20, 60),
              rotation: p.random(p.TWO_PI),
              rotSpeed: p.random(-0.02, 0.02),
              opacity: p.random(0.05, 0.2),
              pulsePhase: p.random(p.TWO_PI),
              type: p.random(['square', 'triangle', 'hexagon'])
            })
          }
        }

        p.draw = () => {
          // Exit if component unmounted
          if (!isMounted) {
            p.noLoop()
            return
          }
          
          // Deep navy background with subtle gradient
          for (let i = 0; i <= p.height; i += 2) {
            const inter = p.map(i, 0, p.height, 0, 1)
            const c = p.lerpColor(p.color(10, 10, 15), p.color(5, 5, 10), inter)
            p.stroke(c)
            p.line(0, i, p.width, i)
          }

          // Glitch effect timer
          glitchTimer++
          if (glitchTimer > 300) {
            glitchEffect = p.random() > 0.8
            glitchTimer = 0
          }

          // Draw geometric shapes with pulsing
          drawGeometricShapes()
          
          // Draw digital rain
          drawDigitalRain()
          
          // Draw matrix characters
          drawMatrixChars()
          
          // Draw scanlines
          drawScanlines()
          
          // Apply glitch effect
          if (glitchEffect) {
            applyGlitch()
          }

          // Update positions
          updatePositions()
        }

        const drawGeometricShapes = () => {
          geometricShapes.forEach(shape => {
            p.push()
            p.translate(shape.x, shape.y)
            p.rotate(shape.rotation)
            
            const pulse = p.sin(shape.pulsePhase) * 0.3 + 0.7
            const currentOpacity = shape.opacity * pulse
            
            p.noFill()
            p.strokeWeight(1)
            p.stroke(255, 0, 0, currentOpacity * 255 * 0.6)
            
            const size = shape.size * pulse
            
            switch (shape.type) {
              case 'square':
                p.rect(-size/2, -size/2, size, size)
                break
              case 'triangle':
                p.triangle(0, -size/2, -size/2, size/2, size/2, size/2)
                break
              case 'hexagon':
                p.beginShape()
                for (let i = 0; i < 6; i++) {
                  const angle = p.map(i, 0, 6, 0, p.TWO_PI)
                  const x = p.cos(angle) * size/2
                  const y = p.sin(angle) * size/2
                  p.vertex(x, y)
                }
                p.endShape(p.CLOSE)
                break
            }
            p.pop()
            
            // Update shape
            shape.rotation += shape.rotSpeed
            shape.pulsePhase += 0.02
            shape.x += p.sin(shape.pulsePhase * 0.5) * 0.2
            shape.y += p.cos(shape.pulsePhase * 0.3) * 0.1
          })
        }

        const drawDigitalRain = () => {
          digitalRain.forEach(rain => {
            for (let i = 0; i < rain.chars.length; i++) {
              const y = rain.y + i * 20
              if (y > -20 && y < p.height + 20) {
                const opacity = rain.trail[i] * (1 - i / rain.chars.length)
                p.fill(0, 255, 100, opacity * 100)
                p.textSize(12)
                p.textFont('monospace')
                p.text(rain.chars[i], rain.x, y)
              }
            }
            
            rain.y += rain.speed
            if (rain.y > p.height + 400) {
              rain.y = p.random(-200, -50)
              rain.x = p.random(p.width)
            }
          })
        }

        const drawMatrixChars = () => {
          matrixChars.forEach(char => {
            p.fill(char.color[0], char.color[1], char.color[2], char.opacity * 255)
            p.textSize(char.size)
            p.textFont('monospace')
            p.text(char.char, char.x, char.y)
          })
        }

        const drawScanlines = () => {
          scanlines.forEach(line => {
            const gradient = p.drawingContext.createLinearGradient(0, line.y, p.width, line.y)
            gradient.addColorStop(0, `rgba(0, 150, 255, 0)`)
            gradient.addColorStop(0.5, `rgba(0, 150, 255, ${line.intensity})`)
            gradient.addColorStop(1, `rgba(0, 150, 255, 0)`)
            
            p.drawingContext.strokeStyle = gradient
            p.drawingContext.lineWidth = 2
            p.drawingContext.beginPath()
            p.drawingContext.moveTo(0, line.y)
            p.drawingContext.lineTo(p.width, line.y)
            p.drawingContext.stroke()
            
            line.y += line.speed
            if (line.y > p.height) {
              line.y = -10
              line.speed = p.random(2, 8)
              line.intensity = p.random(0.3, 0.7)
            }
          })
        }

        const applyGlitch = () => {
          // RGB shift effect
          const offset = p.random(2, 10)
          p.loadPixels()
          const pixels = p.pixels
          
          for (let i = 0; i < pixels.length; i += 4) {
            if (p.random() > 0.99) {
              const shiftIndex = i + offset * 4
              if (shiftIndex < pixels.length) {
                pixels[i] = pixels[shiftIndex] // Red channel shift
              }
            }
          }
          p.updatePixels()
          
          // Horizontal glitch lines
          if (p.random() > 0.7) {
            const glitchY = p.random(p.height)
            p.stroke(255, 0, 0, 150)
            p.strokeWeight(p.random(1, 4))
            p.line(0, glitchY, p.width, glitchY + p.random(-2, 2))
          }
        }

        const updatePositions = () => {
          // Update matrix characters
          matrixChars.forEach(char => {
            char.y += char.speed
            char.opacity += p.random(-0.01, 0.01)
            char.opacity = p.constrain(char.opacity, 0.1, 0.8)
            
            if (char.y > p.height) {
              char.y = -20
              char.x = p.random(p.width)
              char.char = p.random(matrixCharset.split(''))
            }
            
            // Occasional character change
            if (p.random() > 0.98) {
              char.char = p.random(matrixCharset.split(''))
            }
          })
        }

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight)
          
          // Reset positions for new canvas size
          matrixChars.forEach(char => {
            char.x = p.random(p.width)
            char.y = p.random(p.height)
          })
          
          geometricShapes.forEach(shape => {
            shape.x = p.random(p.width)
            shape.y = p.random(p.height)
          })
          
          digitalRain.forEach(rain => {
            rain.x = p.random(p.width)
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