'use client'

import Image from 'next/image'
import { agencies } from '@/data/agencies'

export default function AgenciesIteration2V1() {
  return (
    <section id="agencies" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <div className="eyebrow">Our Network</div>
          <h2 className="section-title text-white">
            Our Agencies
          </h2>
        </div>
        
        <div className="grid grid-2">
          {agencies.map((agency, index) => (
            <div 
              key={agency.id}
              className="card card-small p-8 fade-up"
              style={{ '--stagger-delay': index } as React.CSSProperties}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 mr-4 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={agency.logoUrl}
                    alt={agency.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <h3 className="card-title text-white mb-1">
                    {agency.name}
                  </h3>
                  <div className="text-[#D4AF37] text-sm font-medium">
                    {agency.locations.join(' • ')}
                  </div>
                </div>
              </div>
              
              <p className="text-[#94A3B8] leading-relaxed mb-6">
                {agency.blurb}
              </p>
              
              <button className="text-[#D4AF37] text-sm font-medium hover:text-white transition-colors">
                See Profile →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}