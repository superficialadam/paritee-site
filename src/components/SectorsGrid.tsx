import { sectors } from '@/data/sectors'
import Section from './Section'

export default function SectorsGrid() {
  return (
    <Section
      eyebrow="Industry Expertise"
      title="Sector Specialisms"
      intro="Deep industry knowledge across key sectors, enabling us to deliver insights and strategies that truly resonate."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector, index) => (
          <div key={sector.id} className="group">
            <div 
              className="bg-gradient-to-br from-background to-muted/30 border rounded-lg p-6 h-full hover:shadow-lg transition-all duration-300 group-hover:border-accent/50"
              style={{
                background: `linear-gradient(135deg, hsl(${index * 60}, 20%, 98%) 0%, hsl(${index * 60}, 30%, 95%) 100%)`
              }}
            >
              <h3 className="text-xl font-semibold font-heading mb-3">{sector.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{sector.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}