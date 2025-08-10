import { ExternalLink } from 'lucide-react'
import { agencies } from '@/data/agencies'
import { sectors } from '@/data/sectors'
import Section from './Section'

export default function AgenciesGrid() {
  const getSectorName = (sectorId: string) => {
    return sectors.find(s => s.id === sectorId)?.name || sectorId
  }

  return (
    <Section
      eyebrow="Our Network"
      title="Partner Agencies"
      intro="A curated network of specialist agencies, each bringing unique expertise and proven track records in their domains."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {agencies.map((agency) => (
          <div key={agency.id} className="group">
            <div className="bg-card border rounded-lg p-6 h-full hover:shadow-lg transition-all duration-300 group-hover:border-accent/50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-muted/30 rounded-lg flex items-center justify-center">
                    <div className="text-xs font-medium text-muted-foreground">
                      {agency.name.split(' ').map(word => word[0]).join('')}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold font-heading">{agency.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      {agency.locations.join(', ')}
                    </div>
                  </div>
                </div>
                <ExternalLink size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-4">{agency.blurb}</p>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Specializations:</div>
                <div className="flex flex-wrap gap-2">
                  {agency.sectors.map((sectorId) => (
                    <span key={sectorId} className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                      {getSectorName(sectorId)}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <button className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                  See Profile →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}