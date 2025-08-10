'use client'

import SectionV5A from './SectionV5A'
import { geographies } from '@/data/geographies'

const GeographiesV5A = () => {
  return (
    <SectionV5A 
      id="geographies"
      eyebrow="GLOBAL REACH"
      title="Creative Territories"
      intro="Local intelligence. Global ambition. Strategic presence where creativity meets opportunity."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {geographies.map((geo, index) => (
          <div 
            key={geo.country} 
            className="group relative p-16 border border-white/10 hover:border-red-600 transition-all duration-500 overflow-hidden"
            style={{
              animationDelay: `${index * 150}ms`
            }}
          >
            <div className="absolute inset-0 bg-red-600 scale-0 group-hover:scale-100 transition-transform duration-700 origin-center" />
            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-black text-white mb-8 group-hover:text-black transition-colors duration-700">
                {geo.country}
              </h3>
              <div className="space-y-3">
                {geo.cities.map((city) => (
                  <div key={city} className="text-white/60 group-hover:text-black/70 transition-colors duration-700 font-medium">
                    {city}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionV5A>
  )
}

export default GeographiesV5A