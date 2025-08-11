'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

// Animation timing configuration
const ANIMATION_CONFIG = {
  squareFlicker: { duration: 1.0, flickerCount: 6 },
  squareScaleUp: { duration: 0.4, ease: 'power2.out' },
  squareScaleHorizontal: { duration: 0.3, ease: 'power2.inOut' },
  squareFadeOut: { duration: 0.3, ease: 'power2.out' },
  logoHold: { duration: 0.8 },
  logoFadeOut: { duration: 0.4, ease: 'power2.out' },
  headlineFadeIn: { duration: 0.6, ease: 'power2.out' },
  contentFadeIn: { duration: 0.8, ease: 'power2.out' },
  contentStagger: 0.2
}

export default function HeroIteration2V2() {
  const whiteSquareRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
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
    gsap.set([headlineRef.current, subheadingRef.current, buttonsRef.current], { 
      opacity: 0
    })

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
      // 5. Logo fades out as headline fades in
      .to(logoRef.current, {
        opacity: 0,
        duration: ANIMATION_CONFIG.logoFadeOut.duration,
        ease: ANIMATION_CONFIG.logoFadeOut.ease
      })
      .to(headlineRef.current, {
        opacity: 1,
        duration: ANIMATION_CONFIG.headlineFadeIn.duration,
        ease: ANIMATION_CONFIG.headlineFadeIn.ease
      }, '<') // Start at same time as logo fade out
      // 6. Subheading and buttons fade in with stagger
      .to(subheadingRef.current, {
        opacity: 1,
        duration: ANIMATION_CONFIG.contentFadeIn.duration,
        ease: ANIMATION_CONFIG.contentFadeIn.ease
      }, `+=${ANIMATION_CONFIG.contentStagger}`)
      .to(buttonsRef.current, {
        opacity: 1,
        duration: ANIMATION_CONFIG.contentFadeIn.duration,
        ease: ANIMATION_CONFIG.contentFadeIn.ease
      }, `+=${ANIMATION_CONFIG.contentStagger}`)

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

          {/* Main Headline */}
          <h1 
            ref={headlineRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
          >
            No Compromise<br />
            You deserve better
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