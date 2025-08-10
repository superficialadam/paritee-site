'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, Play } from 'lucide-react'
import CtaButtons from '../CtaButtons'

export default function HeroV2() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const colorBandRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = gsap.timeline()
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // Instant display for reduced motion
      gsap.set([headlineRef.current, subtextRef.current, ctaRef.current], {
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        y: 0
      })
      gsap.set(colorBandRef.current, { scaleX: 1 })
    } else {
      // Animated timeline
      timeline
        .set([headlineRef.current, subtextRef.current, ctaRef.current], {
          opacity: 0
        })
        .set(headlineRef.current, {
          clipPath: 'inset(0% 100% 0% 0%)'
        })
        .set(colorBandRef.current, {
          scaleX: 0,
          transformOrigin: 'left center'
        })
        // Clip-path headline reveal
        .to(headlineRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power3.out'
        })
        .to(headlineRef.current, {
          opacity: 1,
          duration: 0.1
        }, '<')
        // Subtext fade in
        .to(subtextRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.5')
        // CTA slide in
        .to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.3')
        // Color band wipe
        .to(colorBandRef.current, {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.inOut'
        }, '-=0.5')
    }

    return () => {
      timeline.kill()
    }
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900"
    >
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        style={{
          backgroundImage: 'url(/images/hero/image-0-92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="absolute inset-0 bg-slate-900/70" />
      
      {/* Cinematic backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50"></div>
      
      {/* Color band */}
      <div 
        ref={colorBandRef}
        className="absolute top-1/3 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-400 transform origin-left"
      ></div>

      <div className="container relative z-10 text-center space-y-12 px-6">
        {/* Main headline with clip-path reveal */}
        <div 
          ref={headlineRef}
          className="space-y-6"
        >
          <h1 className="font-heading font-bold tracking-tight leading-[0.85] text-white">
            <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-4">
              No Compromise.
            </div>
            <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-slate-300">
              Just Better.
            </div>
          </h1>
        </div>
        
        {/* Subtext */}
        <div 
          ref={subtextRef}
          className="max-w-5xl mx-auto space-y-8 opacity-0 transform translate-y-8"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-[1.2] text-slate-200">
            Where strategy meets execution. Where creativity drives results.
          </p>
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-400 max-w-4xl mx-auto font-light">
            In a world of false choices and compromised solutions, we stand apart. 
            Our network delivers the power of unified expertise without the politics of traditional agencies.
          </p>
        </div>

        {/* CTAs */}
        <div 
          ref={ctaRef}
          className="opacity-0 transform translate-y-8"
        >
          <CtaButtons
            primary={{ 
              text: 'Start Your Project', 
              href: '#contact', 
              icon: <ArrowRight size={20} /> 
            }}
            secondary={{ 
              text: 'Watch Our Story', 
              href: '#', 
              icon: <Play size={20} /> 
            }}
            className="mb-16"
          />
        </div>

        {/* Stats */}
        <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
          {[
            { value: '150+', label: 'Global Clients' },
            { value: '25+', label: 'Countries' },
            { value: '500+', label: 'Campaigns' },
            { value: '$2B+', label: 'Media Managed' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-heading text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-wide text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ambient particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: 'float 6s infinite ease-in-out alternate'
            }}
          />
        ))}
      </div>
    </section>
  )
}