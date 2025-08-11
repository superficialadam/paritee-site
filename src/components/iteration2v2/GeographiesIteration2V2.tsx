'use client'

import { geographies } from '@/data/geographies'

export default function GeographiesIteration2V2() {
  return (
    <section id="geographies" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <div className="eyebrow">Global Reach</div>
          <h2 className="section-title text-white">
            Our Footprint
          </h2>
        </div>
        
        <div className="grid grid-3">
          {geographies.map((geo, index) => (
            <div 
              key={geo.country}
              className="card p-8 text-center fade-up"
              style={{ '--stagger-delay': index } as React.CSSProperties}
            >
              <h3 className="card-title text-white mb-6">
                {geo.country}
              </h3>
              
              <div className="space-y-2">
                {geo.cities.map((city) => (
                  <div key={city} className="text-[#94A3B8]">
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