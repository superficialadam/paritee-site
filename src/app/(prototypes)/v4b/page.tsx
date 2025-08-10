import HeroV4B from '@/components/v4b/HeroV4B'
import HeaderV4B from '@/components/v4b/HeaderV4B'
import MissionV4B from '@/components/v4b/MissionV4B'
import ServicesV4B from '@/components/v4b/ServicesV4B'
import SectionV4B from '@/components/v4b/SectionV4B'
import NewsV4B from '@/components/v4b/NewsV4B'
import CasesV4B from '@/components/v4b/CasesV4B'
import TeamV4B from '@/components/v4b/TeamV4B'
import ContactV4B from '@/components/v4b/ContactV4B'
import P5BackgroundV4B from '@/components/v4b/P5BackgroundV4B'
import FooterV4B from '@/components/v4b/FooterV4B'
import { sectors } from '@/data/sectors'
import { geographies } from '@/data/geographies'
import { agencies } from '@/data/agencies'

export default function V4BPage() {
  return (
    <div className="v4b-page-container bg-black min-h-screen">
      <P5BackgroundV4B />
      <div className="relative z-10">
        <HeaderV4B />
        <main>
          <section id="home" className="v4b-section">
            <HeroV4B />
          </section>
          
          <div className="v4b-section">
            <MissionV4B />
          </div>

          <div className="v4b-section">
            <ServicesV4B />
          </div>

          <SectionV4B 
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
          </SectionV4B>

          <SectionV4B 
            id="geographies"
            eyebrow="GLOBAL REACH"
            title="Creative Territories"
            intro="Local intelligence. Global ambition. Strategic presence where creativity meets opportunity."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
              {geographies.map((geo, index) => (
                <div 
                  key={geo.country} 
                  className="group relative p-16 border border-white/10 hover:border-red-600 transition-all duration-500 overflow-hidden"
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  <div className="absolute inset-0 bg-red-600 scale-0 group-hover:scale-100 transition-transform duration-700 origin-center" />
                  <div className="relative z-10 text-center">
                    <h3 className="text-3xl font-black text-white mb-8 group-hover:text-black transition-colors duration-700">
                      {geo.country}
                    </h3>
                    <div className="space-y-3">
                      {geo.cities.map((city) => (
                        <div key={city} className="text-white/60 group-hover:text-black/70 transition-colors duration-700 font-medium">
                          {city}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionV4B>

          <SectionV4B 
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
          </SectionV4B>

          <div className="v4b-section">
            <CasesV4B />
          </div>

          <div className="v4b-section">
            <TeamV4B />
          </div>

          <div className="v4b-section">
            <NewsV4B />
          </div>

          <div className="v4b-section">
            <ContactV4B />
          </div>
        </main>
        
        <FooterV4B />
      </div>
    </div>
  )
}