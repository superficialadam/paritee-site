'use client'

import { useState } from 'react'
import { Filter } from 'lucide-react'
import { cases } from '@/data/cases'
import { sectors } from '@/data/sectors'
import { services } from '@/data/services'
import Section from './Section'

export default function CasesGallery() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const getSectorName = (sectorId: string) => {
    return sectors.find(s => s.id === sectorId)?.name || sectorId
  }

  const getServiceName = (serviceId: string) => {
    return services.find(s => s.id === serviceId)?.name || serviceId
  }

  return (
    <Section
      eyebrow="Our Work"
      title="Case Studies"
      intro="Real results for real brands. Explore our most impactful campaigns and the strategies behind their success."
    >
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          <Filter size={16} className="text-muted-foreground" />
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                selectedFilter === 'all' 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              onClick={() => setSelectedFilter('all')}
            >
              All Cases
            </button>
            {sectors.slice(0, 4).map((sector) => (
              <button
                key={sector.id}
                className={`px-4 py-2 text-sm rounded-full transition-colors opacity-50 cursor-not-allowed ${
                  selectedFilter === sector.id 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}
                disabled
              >
                {sector.name}
              </button>
            ))}
          </div>
        </div>
        <div className="text-center mt-2">
          <span className="text-xs text-muted-foreground">(Filter controls disabled for prototype)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cases.map((caseStudy) => (
          <div key={caseStudy.id} className="group cursor-pointer">
            <div className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:border-accent/50">
              <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/80 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                    {getSectorName(caseStudy.sectorId)}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold font-heading mb-2">{caseStudy.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{caseStudy.excerpt}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{getServiceName(caseStudy.serviceId)}</span>
                  <span className="group-hover:text-accent transition-colors">
                    Read Case Study →
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}