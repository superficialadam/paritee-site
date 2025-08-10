import HeroV3 from '@/components/v3/HeroV3'
import HeaderV3 from '@/components/v3/HeaderV3'
import MissionV3 from '@/components/v3/MissionV3'
import ServicesV3 from '@/components/v3/ServicesV3'
import SectionV3 from '@/components/v3/SectionV3'
import NewsV3 from '@/components/v3/NewsV3'
import CasesV3 from '@/components/v3/CasesV3'
import TeamV3 from '@/components/v3/TeamV3'
import ContactV3 from '@/components/v3/ContactV3'
import { sectors } from '@/data/sectors'
import { geographies } from '@/data/geographies'
import { agencies } from '@/data/agencies'

export default function V3Page() {
  return (
    <>
      <HeaderV3 />
      <main className="bg-white">
        <section id="home">
          <HeroV3 />
        </section>
        
        <MissionV3 />

        <ServicesV3 />

        <SectionV3 
          id="sectors"
          eyebrow="Industry Expertise"
          title="Sectors"
          intro="Deep industry knowledge across key sectors."
          className="bg-gray-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector) => (
              <div key={sector.id} className="minimal-hover">
                <div className="p-8 border border-gray-200 hover:border-black transition-colors duration-300">
                  <h3 className="text-xl font-light font-heading text-black mb-4">
                    {sector.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {sector.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionV3>

        <SectionV3 
          id="geographies"
          eyebrow="Global Presence"
          title="Where We Work"
          intro="Local expertise, global reach."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {geographies.map((geo) => (
              <div key={geo.country} className="minimal-hover">
                <div className="p-8 text-center border border-gray-200 hover:border-black transition-colors duration-300">
                  <h3 className="text-xl font-light font-heading text-black mb-6">
                    {geo.country}
                  </h3>
                  <div className="space-y-2">
                    {geo.cities.map((city) => (
                      <div key={city} className="text-sm text-gray-600">
                        {city}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionV3>

        <SectionV3 
          id="agencies"
          eyebrow="Our Network"
          title="Partner Agencies"
          intro="A curated network of specialist agencies."
          className="bg-gray-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agencies.map((agency) => (
              <div key={agency.id} className="minimal-hover">
                <div className="p-8 border border-gray-200 hover:border-black transition-colors duration-300">
                  <h3 className="text-xl font-light font-heading text-black mb-2">
                    {agency.name}
                  </h3>
                  <div className="text-sm text-gray-500 mb-6">
                    {agency.locations.join(', ')}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm mb-6">
                    {agency.blurb}
                  </p>
                  <div className="text-xs text-gray-400">
                    See Profile →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionV3>

        <CasesV3 />

        <TeamV3 />

        <NewsV3 />

        <ContactV3 />
      </main>
      
      {/* Minimal Footer */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="container max-w-6xl mx-auto px-8">
          <div className="text-center space-y-8">
            <div className="text-2xl font-light font-heading text-black">
              Paritee
            </div>
            <div className="flex justify-center space-x-12 text-sm text-gray-600">
              <a href="#" className="hover:text-black transition-colors">Privacy</a>
              <a href="#" className="hover:text-black transition-colors">Terms</a>
              <a href="#" className="hover:text-black transition-colors">Legal</a>
            </div>
            <div className="text-xs text-gray-400">
              © {new Date().getFullYear()} Paritee. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}