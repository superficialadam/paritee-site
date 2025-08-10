'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ExternalLink } from 'lucide-react'
import { agencies } from '@/data/agencies'
import { sectors } from '@/data/sectors'
import SectionV2 from './SectionV2'

export default function AgenciesCarouselV2() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const getSectorName = (sectorId: string) => {
    return sectors.find(s => s.id === sectorId)?.name || sectorId
  }

  const startAutoLoop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % agencies.length)
    }, 4000) // 4 seconds per slide
  }

  const stopAutoLoop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    startAutoLoop()
    return () => stopAutoLoop()
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const cards = containerRef.current.querySelectorAll('.agency-card')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    cards.forEach((card, index) => {
      const isActive = index === currentIndex
      const isPrev = index === (currentIndex - 1 + agencies.length) % agencies.length
      const isNext = index === (currentIndex + 1) % agencies.length

      if (prefersReducedMotion) {
        // Reduced motion: just show/hide
        gsap.set(card, {
          opacity: isActive ? 1 : 0.3,
          scale: 1,
          x: 0,
          zIndex: isActive ? 10 : 1
        })
      } else {
        // Full animation
        let targetX = 0
        let targetScale = 0.85
        let targetOpacity = 0.4
        let targetZ = 1

        if (isActive) {
          targetX = 0
          targetScale = 1
          targetOpacity = 1
          targetZ = 10
        } else if (isPrev) {
          targetX = -120
          targetScale = 0.9
          targetOpacity = 0.6
          targetZ = 5
        } else if (isNext) {
          targetX = 120
          targetScale = 0.9
          targetOpacity = 0.6
          targetZ = 5
        } else {
          targetX = index < currentIndex ? -200 : 200
          targetScale = 0.8
          targetOpacity = 0.2
          targetZ = 1
        }

        gsap.to(card, {
          x: targetX,
          scale: targetScale,
          opacity: targetOpacity,
          zIndex: targetZ,
          duration: 0.8,
          ease: 'power2.out'
        })
      }
    })
  }, [currentIndex])

  return (
    <SectionV2
      id="agencies"
      eyebrow="Our Network"
      title="Partner Agencies"
      intro="A curated network of specialist agencies, each bringing unique expertise and proven track records in their domains."
    >
      <div 
        className="relative h-96 overflow-hidden"
        onMouseEnter={stopAutoLoop}
        onMouseLeave={startAutoLoop}
      >
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
          {agencies.map((agency, index) => (
            <div
              key={agency.id}
              className="agency-card absolute w-80 h-80 cursor-pointer"
              onClick={() => setCurrentIndex(index)}
            >
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 h-full hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group hover:border-blue-500/50">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg flex items-center justify-center group-hover:from-blue-500 group-hover:to-cyan-500 transition-all duration-300">
                        <div className="text-sm font-bold text-white">
                          {agency.name.split(' ').map(word => word[0]).join('')}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold font-heading text-white group-hover:text-blue-200 transition-colors">
                          {agency.name}
                        </h3>
                        <div className="text-sm text-slate-400">
                          {agency.locations.join(', ')}
                        </div>
                      </div>
                    </div>
                    <ExternalLink 
                      size={20} 
                      className="text-slate-500 group-hover:text-blue-400 transition-colors" 
                    />
                  </div>
                  
                  <p className="text-slate-300 leading-relaxed mb-6 flex-grow">
                    {agency.blurb}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-cyan-400">Specializations:</div>
                    <div className="flex flex-wrap gap-2">
                      {agency.sectors.map((sectorId) => (
                        <span 
                          key={sectorId} 
                          className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30"
                        >
                          {getSectorName(sectorId)}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-700">
                    <div className="text-sm font-medium text-blue-400 group-hover:text-cyan-400 transition-colors">
                      See Profile →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {agencies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-400 scale-150 shadow-lg shadow-blue-400/50'
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
              aria-label={`Go to agency ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionV2>
  )
}