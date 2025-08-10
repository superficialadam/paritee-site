import { MapPin } from 'lucide-react'
import { geographies } from '@/data/geographies'
import Section from './Section'

export default function GeoMapLite() {
  return (
    <Section
      eyebrow="Global Presence"
      title="Where We Work"
      intro="Local expertise, global reach. Our teams across major markets ensure deep cultural understanding and market-specific strategies."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {geographies.map((geo) => (
          <div key={geo.country} className="text-center">
            <div className="bg-accent/5 border rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <MapPin size={24} className="text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold font-heading mb-4">{geo.country}</h3>
              <div className="space-y-2">
                {geo.cities.map((city) => (
                  <div key={city} className="text-sm text-muted-foreground px-3 py-1 bg-muted/30 rounded-full inline-block mr-2 mb-2">
                    {city}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}