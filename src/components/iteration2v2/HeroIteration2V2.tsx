'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

// Animation timing configuration
const ANIMATION_CONFIG = {
  squareFlicker: { duration: 3.0, flickerCount: 18 }, // 3x longer
  squareScaleUp: { duration: 0.4, ease: 'power2.out' },
  squareScaleHorizontal: { duration: 0.3, ease: 'power2.inOut' },
  squareFadeOut: { duration: 0.3, ease: 'power2.out' },
  logoHold: { duration: 0.8 },
  logoReverse: {
    rectangleFadeUp: { duration: 0.15, ease: 'power2.out' }, // 2x faster than horizontal scale (0.3/2)
    shrinkToSquare: { duration: 0.2, ease: 'power2.inOut' }, // 2x faster than scale up (0.4/2) 
    shrinkSmall: { duration: 0.1, ease: 'power2.in' },
    flicker: { duration: 0.75, flickerCount: 5 } // Half as long (1.5/2)
  },
  headlineTypewriter: { duration: 0.6, letterStagger: 0.04 },
  contentDelay: 1.0, // Longer wait
  contentFadeIn: { duration: 0.8, ease: 'power2.out' }
}

export default function HeroIteration2V2() {
  const whiteSquareRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  // Split headline text into individual letters for animation (preserve line breaks)
  const headlineLines = ['No Compromise', 'You deserve better']
  const createShuffledIndices = (length: number) => [...Array(length)].map((_, i) => i).sort(() => Math.random() - 0.5)
  useEffect(() => {
    const tl = gsap.timeline()

    // Set initial states - start with small square
    gsap.set(whiteSquareRef.current, {
      width: 8,
      height: 8,
      opacity: 1,
      transformOrigin: 'center center'
    })
    gsap.set(logoRef.current, { opacity: 0 })
    gsap.set([subheadingRef.current, buttonsRef.current], { 
      opacity: 0
    })
    // Hide all headline letters initially
    gsap.set(headlineRef.current?.querySelectorAll('.letter'), { opacity: 0 })

    // Animation timeline with flicker then scale
    tl
      // 1. Flicker effect - random quick opacity changes
      .to(whiteSquareRef.current, {
        opacity: 0,
        duration: 0.05,
        repeat: ANIMATION_CONFIG.squareFlicker.flickerCount - 1,
        yoyo: true,
        ease: 'none'
      })
      .set(whiteSquareRef.current, { opacity: 1 })
      // 2. Quick scale up to tall rectangle (104px height to match logo + 30%)
      .to(whiteSquareRef.current, {
        width: 104,
        height: 104,
        duration: ANIMATION_CONFIG.squareScaleUp.duration,
        ease: ANIMATION_CONFIG.squareScaleUp.ease
      })
      // 3. Scale horizontally to logo width (240px)
      .to(whiteSquareRef.current, {
        width: 240,
        duration: ANIMATION_CONFIG.squareScaleHorizontal.duration,
        ease: ANIMATION_CONFIG.squareScaleHorizontal.ease
      })
      // 3. White square fades out, logo fades in simultaneously
      .to(whiteSquareRef.current, {
        opacity: 0,
        duration: ANIMATION_CONFIG.squareFadeOut.duration,
        ease: ANIMATION_CONFIG.squareFadeOut.ease
      })
      .to(logoRef.current, {
        opacity: 1,
        duration: ANIMATION_CONFIG.squareFadeOut.duration,
        ease: ANIMATION_CONFIG.squareFadeOut.ease
      }, '<') // Start at same time as square fade
      // 4. Logo holds for a moment
      .to({}, { duration: ANIMATION_CONFIG.logoHold.duration })
      // 5. Reverse animation: rectangle covers logo, shrinks, flickers out
      // First, make rectangle opaque to cover logo
      .to(whiteSquareRef.current, {
        opacity: 1,
        duration: ANIMATION_CONFIG.logoReverse.rectangleFadeUp.duration,
        ease: ANIMATION_CONFIG.logoReverse.rectangleFadeUp.ease
      })
      .set(logoRef.current, { opacity: 0 }) // Hide logo behind rectangle
      // Shrink horizontally back to square
      .to(whiteSquareRef.current, {
        width: 104,
        duration: ANIMATION_CONFIG.logoReverse.shrinkToSquare.duration,
        ease: ANIMATION_CONFIG.logoReverse.shrinkToSquare.ease
      })
      // Shrink to small square
      .to(whiteSquareRef.current, {
        width: 8,
        height: 8,
        duration: ANIMATION_CONFIG.logoReverse.shrinkSmall.duration,
        ease: ANIMATION_CONFIG.logoReverse.shrinkSmall.ease
      })
      // Headlines start when rectangle becomes square (parallel timing)
      .add(() => {
        const line1Letters = headlineRef.current?.querySelectorAll('.line1 .letter')
        const line2Letters = headlineRef.current?.querySelectorAll('.line2 .letter')
        
        if (line1Letters) {
          const shuffled1 = createShuffledIndices(line1Letters.length)
          shuffled1.forEach((index, i) => {
            gsap.delayedCall(i * ANIMATION_CONFIG.headlineTypewriter.letterStagger, () => {
              // Binary flicker pattern: on/off/on/on/on/off/off/on
              const flickerPattern = [1, 0, 1, 1, 1, 0, 0, 1]
              const flickerTl = gsap.timeline()
              flickerPattern.forEach((opacity, j) => {
                flickerTl.set(line1Letters[index], { opacity }, j * 0.02)
              })
              flickerTl.set(line1Letters[index], { opacity: 1 }) // Final state
            })
          })
        }
        
        if (line2Letters) {
          const shuffled2 = createShuffledIndices(line2Letters.length)
          shuffled2.forEach((index, i) => {
            gsap.delayedCall((i + 3) * ANIMATION_CONFIG.headlineTypewriter.letterStagger, () => {
              // Binary flicker pattern: on/off/on/on/on/off/off/on
              const flickerPattern = [1, 0, 1, 1, 1, 0, 0, 1]
              const flickerTl = gsap.timeline()
              flickerPattern.forEach((opacity, j) => {
                flickerTl.set(line2Letters[index], { opacity }, j * 0.02)
              })
              flickerTl.set(line2Letters[index], { opacity: 1 }) // Final state
            })
          })
        }
      }) // Start after rectangle animation completes
      // Continue with flicker out after headlines start
      .to(whiteSquareRef.current, {
        opacity: 0,
        duration: 0.075, // Quick flicker intervals  
        repeat: ANIMATION_CONFIG.logoReverse.flicker.flickerCount - 1,
        yoyo: true,
        ease: 'none'
      }, '-=1.35') // Start flicker right after rectangle becomes square
      .set(whiteSquareRef.current, { opacity: 0 }) // Final state
      // 7. Wait longer then fade in subheading and buttons
      .to({}, { duration: ANIMATION_CONFIG.contentDelay })
      .to([subheadingRef.current, buttonsRef.current], {
        opacity: 1,
        duration: ANIMATION_CONFIG.contentFadeIn.duration,
        ease: ANIMATION_CONFIG.contentFadeIn.ease
      })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section 
      id="home" 
      className="section relative min-h-screen flex items-center"
    >
      <div className="container">
        <div className="max-w-4xl relative">
          {/* Animation Elements - Centered on page */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
            {/* White Square */}
            <div 
              ref={whiteSquareRef}
              className="bg-white"
              style={{ position: 'absolute' }}
            />
            
            {/* Logo - Scaled to match storyboard while maintaining aspect ratio */}
            <div 
              ref={logoRef}
              className="absolute flex items-center justify-center"
            >
              <Image 
                src="/images/logo.png" 
                alt="Paritee" 
                width={240} 
                height={67}
                className="w-[240px] h-auto"
              />
            </div>
          </div>

          {/* Main Headline - Split into letters for flicker effect */}
          <h1 
            ref={headlineRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
          >
            <div className="line1">
              {headlineLines[0].split('').map((char, i) => (
                <span key={i} className="letter">{char}</span>
              ))}
            </div>
            <div className="line2">
              {headlineLines[1].split('').map((char, i) => (
                <span key={i} className="letter">{char}</span>
              ))}
            </div>
          </h1>
          
          {/* Subheadline */}
          <div 
            ref={subheadingRef}
            className="text-lg leading-relaxed text-[#E8EDF5] max-w-3xl"
          >
            <p>
              You've been asked to make trade-offs for too long. Big agencies that go big on overhead but fall short on care. Small agencies that bring passion but can't keep pace. You've had to choose between speed and scale. Bold thinking and trusted delivery. That compromise ends with Paritee. We are a coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
            </p>
          </div>
          
          {/* Call to Action Buttons */}
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <button 
              onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 border border-gray-400 text-white font-medium rounded-full hover:bg-white hover:text-black transition-all"
            >
              Explore Our Work
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 border border-gray-400 text-white font-medium rounded-full hover:bg-white hover:text-black transition-all"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}