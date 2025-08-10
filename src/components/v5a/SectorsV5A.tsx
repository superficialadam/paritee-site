'use client'

import SectionV5A from './SectionV5A'
import { sectors } from '@/data/sectors'

const SectorsV5A = () => {
  return (
    <SectionV5A 
      id="sectors"
      eyebrow="INDUSTRY"
      title="Sectors We Architect"
      intro="We don't just serve industries—we transform them through strategic creative ecosystems."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-white/10">
        {sectors.map((sector, index) => (
          <div 
            key={sector.id} 
            className="group border-r border-b border-white/10 p-12 hover:bg-red-600 transition-all duration-700 relative overflow-hidden"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-black transition-colors duration-700">
                {sector.name}
              </h3>
              <p className="text-white/70 leading-relaxed group-hover:text-black/80 transition-colors duration-700">
                {sector.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionV5A>
  )
}

export default SectorsV5A