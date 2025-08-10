import HeroV4 from '@/components/v4/HeroV4'
import HeaderV4 from '@/components/v4/HeaderV4'
import MissionV4 from '@/components/v4/MissionV4'
import ServicesV4 from '@/components/v4/ServicesV4'
import SectionV4 from '@/components/v4/SectionV4'
import NewsV4 from '@/components/v4/NewsV4'
import CasesV4 from '@/components/v4/CasesV4'
import TeamV4 from '@/components/v4/TeamV4'
import ContactV4 from '@/components/v4/ContactV4'
import P5BackgroundV4 from '@/components/v4/P5BackgroundV4'
import { sectors } from '@/data/sectors'
import { geographies } from '@/data/geographies'
import { agencies } from '@/data/agencies'

export default function V4Page() {
  return (
    <div className="v4-page-container bg-[#0E2756]">
      <P5BackgroundV4 />
      <div className="relative z-10">
        <HeaderV4 />
        <main>
          <section id="home" className="v4-section">
            <HeroV4 />
          </section>
          
          <div className="v4-section">
            <MissionV4 />
          </div>

          <div className="v4-section">
            <ServicesV4 />
          </div>

          <SectionV4 
            id="sectors"
            eyebrow="Industry Expertise"
            title="Sectors"
            intro="Deep industry knowledge across key sectors."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sectors.map((sector) => (
                <div key={sector.id} className="minimal-hover">
                  <div className="p-8 border border-cream/10 hover:border-sage/30 transition-colors duration-300 bg-cream/5 backdrop-blur-sm">
                    <h3 className="text-xl font-light font-heading text-cream mb-4">
                      {sector.name}
                    </h3>
                    <p className="text-warm-gray leading-relaxed text-sm">
                      {sector.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionV4>

          <SectionV4 
            id="geographies"
            eyebrow="Global Presence"
            title="Where We Work"
            intro="Local expertise, global reach."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {geographies.map((geo) => (
                <div key={geo.country} className="minimal-hover">
                  <div className="p-8 text-center border border-cream/10 hover:border-sage/30 transition-colors duration-300 bg-cream/5 backdrop-blur-sm">
                    <h3 className="text-xl font-light font-heading text-cream mb-6">
                      {geo.country}
                    </h3>
                    <div className="space-y-2">
                      {geo.cities.map((city) => (
                        <div key={city} className="text-sm text-warm-gray">
                          {city}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionV4>

          <SectionV4 
            id="agencies"
            eyebrow="Our Network"
            title="Partner Agencies"
            intro="A curated network of specialist agencies."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {agencies.map((agency) => (
                <div key={agency.id} className="minimal-hover">
                  <div className="p-8 border border-cream/10 hover:border-sage/30 transition-colors duration-300 bg-cream/5 backdrop-blur-sm">
                    <h3 className="text-xl font-light font-heading text-cream mb-2">
                      {agency.name}
                    </h3>
                    <div className="text-sm text-gold mb-6">
                      {agency.locations.join(', ')}
                    </div>
                    <p className="text-warm-gray leading-relaxed text-sm mb-6">
                      {agency.blurb}
                    </p>
                    <div className="text-xs text-sage">
                      See Profile →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionV4>

          <div className="v4-section">
            <CasesV4 />
          </div>

          <div className="v4-section">
            <TeamV4 />
          </div>

          <div className="v4-section">
            <NewsV4 />
          </div>

          <div className="v4-section">
            <ContactV4 />
          </div>
        </main>
        
        {/* V4 Footer */}
        <footer className="border-t border-cream/5 py-16 bg-charcoal/5 backdrop-blur-sm">
          <div className="container max-w-6xl mx-auto px-8">
            <div className="text-center space-y-8">
              <div className="text-2xl font-light font-heading text-cream">
                Paritee
              </div>
              <div className="flex justify-center space-x-12 text-sm text-warm-gray">
                <a href="#" className="hover:text-sage transition-colors">Privacy</a>
                <a href="#" className="hover:text-sage transition-colors">Terms</a>
                <a href="#" className="hover:text-sage transition-colors">Legal</a>
              </div>
              <div className="text-xs text-gold">
                © {new Date().getFullYear()} Paritee. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}