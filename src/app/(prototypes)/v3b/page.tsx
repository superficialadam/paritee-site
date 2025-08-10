import HeroV3B from '@/components/v3b/HeroV3B'
import HeaderV3B from '@/components/v3b/HeaderV3B'
import MissionV3B from '@/components/v3b/MissionV3B'
import ServicesV3B from '@/components/v3b/ServicesV3B'
import SectionV3B from '@/components/v3b/SectionV3B'
import NewsV3B from '@/components/v3b/NewsV3B'
import CasesV3B from '@/components/v3b/CasesV3B'
import TeamV3B from '@/components/v3b/TeamV3B'
import ContactV3B from '@/components/v3b/ContactV3B'
import P5Background from '@/components/v3b/P5Background'
import { sectors } from '@/data/sectors'
import { geographies } from '@/data/geographies'
import { agencies } from '@/data/agencies'

export default function V3BPage() {
  return (
    <>
      <P5Background />
      <div className="relative z-10">
        <HeaderV3B />
        <main>
          <section id="home">
            <HeroV3B />
          </section>
          
          <MissionV3B />

          <ServicesV3B />

          <SectionV3B 
              id="sectors"
              eyebrow="Industry Expertise"
              title="Sectors"
              intro="Deep industry knowledge across key sectors."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sectors.map((sector) => (
                  <div key={sector.id} className="minimal-hover">
                    <div className="p-8 border border-white/20 hover:border-white/40 transition-colors duration-300 bg-white/5 backdrop-blur-sm">
                      <h3 className="text-xl font-light font-heading text-white mb-4">
                        {sector.name}
                      </h3>
                      <p className="text-white/70 leading-relaxed text-sm">
                        {sector.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionV3B>

          <SectionV3B 
            id="geographies"
            eyebrow="Global Presence"
            title="Where We Work"
            intro="Local expertise, global reach."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {geographies.map((geo) => (
                <div key={geo.country} className="minimal-hover">
                  <div className="p-8 text-center border border-white/20 hover:border-white/40 transition-colors duration-300 bg-white/5 backdrop-blur-sm">
                    <h3 className="text-xl font-light font-heading text-white mb-6">
                      {geo.country}
                    </h3>
                    <div className="space-y-2">
                      {geo.cities.map((city) => (
                        <div key={city} className="text-sm text-white/70">
                          {city}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionV3B>

          <SectionV3B 
            id="agencies"
            eyebrow="Our Network"
            title="Partner Agencies"
            intro="A curated network of specialist agencies."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {agencies.map((agency) => (
                <div key={agency.id} className="minimal-hover">
                  <div className="p-8 border border-white/20 hover:border-white/40 transition-colors duration-300 bg-white/5 backdrop-blur-sm">
                    <h3 className="text-xl font-light font-heading text-white mb-2">
                      {agency.name}
                    </h3>
                    <div className="text-sm text-white/50 mb-6">
                      {agency.locations.join(', ')}
                    </div>
                    <p className="text-white/70 leading-relaxed text-sm mb-6">
                      {agency.blurb}
                    </p>
                    <div className="text-xs text-white/40">
                      See Profile →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionV3B>

          <CasesV3B />

          <TeamV3B />

          <NewsV3B />

          <ContactV3B />
        </main>
        
        {/* Minimal Footer */}
        <footer className="border-t border-white/10 py-16 bg-black/20 backdrop-blur-sm">
          <div className="container max-w-6xl mx-auto px-8">
            <div className="text-center space-y-8">
              <div className="text-2xl font-light font-heading text-white">
                Paritee
              </div>
              <div className="flex justify-center space-x-12 text-sm text-white/70">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Legal</a>
              </div>
              <div className="text-xs text-white/40">
                © {new Date().getFullYear()} Paritee. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}