'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface SectionV2Props {
  title?: string
  eyebrow?: string
  intro?: string
  children: React.ReactNode
  className?: string
  id?: string
  variant?: 'default' | 'alternate'
}

export default function SectionV2({ 
  title, 
  eyebrow, 
  intro, 
  children, 
  className = '', 
  id,
  variant = 'default'
}: SectionV2Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      // Show content immediately for reduced motion
      gsap.set([dividerRef.current, contentRef.current, titleRef.current], {
        opacity: 1,
        y: 0,
        scaleX: 1
      })
      return
    }

    // Set initial states
    gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(contentRef.current, { opacity: 0, y: 30 })
    gsap.set(titleRef.current, { opacity: 0, y: 40 })

    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timeline = gsap.timeline()
            
            timeline
              .to(dividerRef.current, {
                scaleX: 1,
                duration: 1.2,
                ease: 'power3.out'
              })
              .to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out'
              }, '-=0.6')
              .to(contentRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out'
              }, '-=0.4')
          }
        })
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const bgClass = variant === 'alternate' ? 'bg-slate-800' : 'bg-slate-900'
  const dividerColor = variant === 'alternate' 
    ? 'from-cyan-400 via-blue-500 to-amber-400'
    : 'from-blue-500 via-cyan-400 to-amber-400'

  return (
    <section 
      ref={sectionRef}
      id={id} 
      className={`py-20 md:py-32 relative ${bgClass} ${className}`}
    >
      {/* Animated divider */}
      <div 
        ref={dividerRef}
        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${dividerColor}`}
      />

      <div className="container relative z-10">
        {(eyebrow || title || intro) && (
          <div ref={titleRef} className="mb-16 md:mb-24">
            {eyebrow && (
              <div className="text-sm font-medium text-cyan-400 uppercase tracking-[0.2em] mb-4">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight leading-[0.9] text-white mb-6">
                {title}
              </h2>
            )}
            {intro && (
              <p className="text-xl md:text-2xl leading-relaxed text-slate-300 max-w-4xl font-light">
                {intro}
              </p>
            )}
          </div>
        )}
        <div ref={contentRef}>
          {children}
        </div>
      </div>
    </section>
  )
}