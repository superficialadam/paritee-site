'use client'

import { sectors } from '@/data/sectors'

export default function SectorsIteration2V1() {
  return (
    <section id="sectors" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <div className="eyebrow">Industry Expertise</div>
          <h2 className="section-title text-white">
            Industries We Know
          </h2>
        </div>
        
        <div className="grid grid-3">
          {sectors.map((sector, index) => (
            <div 
              key={sector.id}
              className="card p-8 fade-up"
              style={{ '--stagger-delay': index } as React.CSSProperties}
            >
              <h3 className="card-title text-white mb-4">
                {sector.name}
              </h3>
              
              <p className="text-[#94A3B8] leading-relaxed mb-6">
                {sector.description}
              </p>
              
              <button className="text-[#D4AF37] text-sm font-medium hover:text-white transition-colors">
                Explore Sector →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}