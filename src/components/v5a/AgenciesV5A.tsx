'use client'

import SectionV5A from './SectionV5A'
import { agencies } from '@/data/agencies'

const AgenciesV5A = () => {
  return (
    <SectionV5A 
      id="agencies"
      eyebrow="NETWORK"
      title="Creative Partners"
      intro="Curated collaborators who share our vision for transformative creative solutions."
    >
      <div className="space-y-0">
        {agencies.map((agency, index) => (
          <div 
            key={agency.id} 
            className="group border-t border-white/10 p-12 hover:bg-white hover:text-black transition-all duration-700 relative overflow-hidden"
            style={{
              animationDelay: `${index * 200}ms`
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-4xl font-black text-white group-hover:text-black transition-colors duration-700 mb-4">
                  {agency.name}
                </h3>
                <div className="text-red-600 group-hover:text-red-600 mb-6 font-bold">
                  {agency.locations.join(' • ')}
                </div>
                <p className="text-white/80 group-hover:text-black/80 leading-relaxed text-lg">
                  {agency.blurb}
                </p>
              </div>
              <div className="text-red-600 group-hover:text-black font-black text-lg">
                EXPLORE →
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionV5A>
  )
}

export default AgenciesV5A