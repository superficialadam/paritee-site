'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { geographies } from '@/data/geographies'

export default function GeographiesIteration2V2() {
  const mapContainerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="geographies" className="section">
      <div className="container">
        <div className="text-center mb-12">
          <div className="eyebrow">Global Reach</div>
          <h2 className="section-title text-white">
            Our Footprint
          </h2>
        </div>
        
        {/* World Map Container - Full Width */}
        <div 
          ref={mapContainerRef}
          className="relative w-full mx-auto mb-8"
          style={{ height: '500px' }}
        >
          {/* SVG World Map */}
          <Image
            src="/svg/worldmap.svg"
            alt="World Map"
            fill
            className="object-contain opacity-0"
            priority
          />
        </div>

        {/* Locations Text - Countries with Cities in Columns */}
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-6">
          {geographies.map((geo, index) => (
            <div 
              key={geo.country}
              className="fade-up text-left"
              style={{ '--stagger-delay': index * 0.1 } as React.CSSProperties}
            >
              <div className="text-white text-sm font-semibold mb-2">
                {geo.country}
              </div>
              <div className="space-y-1">
                {geo.cities.map((city) => (
                  <div key={city} className="text-[#94A3B8] text-sm">
                    {city}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}