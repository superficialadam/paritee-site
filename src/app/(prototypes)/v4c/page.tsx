import HeroV4C from '@/components/v4c/HeroV4C'
import HeaderV4C from '@/components/v4c/HeaderV4C'
import MissionV4C from '@/components/v4c/MissionV4C'
import ServicesV4C from '@/components/v4c/ServicesV4C'
import SectionV4C from '@/components/v4c/SectionV4C'
import NewsV4C from '@/components/v4c/NewsV4C'
import CasesV4C from '@/components/v4c/CasesV4C'
import TeamV4C from '@/components/v4c/TeamV4C'
import ContactV4C from '@/components/v4c/ContactV4C'
import FooterV4C from '@/components/v4c/FooterV4C'
import P5BackgroundV4C from '@/components/v4c/P5BackgroundV4C'
import { sectors } from '@/data/sectors'
import { geographies } from '@/data/geographies'
import { agencies } from '@/data/agencies'

export default function V4CPage() {
  return (
    <div className="v4c-page-container bg-[#0a0a0f] min-h-screen">
      <P5BackgroundV4C />
      <div className="relative z-10">
        <HeaderV4C />
        <main>
          <section id="home" className="v4c-section">
            <HeroV4C />
          </section>
          
          <div className="v4c-section">
            <MissionV4C />
          </div>

          <div className="v4c-section">
            <ServicesV4C />
          </div>

          <SectionV4C 
            id="sectors"
            eyebrow="INDUSTRY INTELLIGENCE"
            title="Sectors"
            intro="Where data meets imagination across key verticals"
            direction="left"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectors.map((sector, index) => (
                <div key={sector.id} className="tech-card group" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="relative overflow-hidden bg-slate-900/50 border border-red-500/20 hover:border-red-400/60 transition-all duration-500 backdrop-blur-sm hover:bg-slate-800/70">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative p-6">
                      <h3 className="text-lg font-bold text-white mb-3 font-mono tracking-tight">
                        {sector.name.toUpperCase()}
                      </h3>
                      <p className="text-slate-300 leading-relaxed text-sm">
                        {sector.description}
                      </p>
                      <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionV4C>

          <SectionV4C 
            id="geographies"
            eyebrow="GLOBAL NETWORK"
            title="Locations"
            intro="Local intelligence, global scale"
            direction="right"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {geographies.map((geo, index) => (
                <div key={geo.country} className="tech-card group" style={{animationDelay: `${index * 150}ms`}}>
                  <div className="relative overflow-hidden bg-slate-900/50 border border-blue-500/20 hover:border-blue-400/60 transition-all duration-500 backdrop-blur-sm hover:bg-slate-800/70 text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative p-6">
                      <h3 className="text-lg font-bold text-white mb-4 font-mono tracking-tight">
                        {geo.country.toUpperCase()}
                      </h3>
                      <div className="space-y-1">
                        {geo.cities.map((city) => (
                          <div key={city} className="text-sm text-slate-400 font-mono">
                            {city}
                          </div>
                        ))}
                      </div>
                      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionV4C>

          <SectionV4C 
            id="agencies"
            eyebrow="NETWORK PARTNERS"
            title="Agencies"
            intro="Curated specialist network for maximum performance"
            direction="left"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {agencies.map((agency, index) => (
                <div key={agency.id} className="tech-card group" style={{animationDelay: `${index * 200}ms`}}>
                  <div className="relative overflow-hidden bg-slate-900/50 border border-red-500/20 hover:border-red-400/60 transition-all duration-500 backdrop-blur-sm hover:bg-slate-800/70">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative p-8">
                      <h3 className="text-xl font-bold text-white mb-2 font-mono tracking-tight">
                        {agency.name.toUpperCase()}
                      </h3>
                      <div className="text-sm text-red-400 mb-4 font-mono">
                        {agency.locations.join(' • ')}
                      </div>
                      <p className="text-slate-300 leading-relaxed text-sm mb-6">
                        {agency.blurb}
                      </p>
                      <div className="text-xs text-blue-400 font-mono tracking-wider group-hover:text-blue-300 transition-colors">
                        ACCESS_PROFILE →
                      </div>
                      <div className="absolute top-6 right-6 w-3 h-3 border border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rotate-45"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionV4C>

          <div className="v4c-section">
            <CasesV4C />
          </div>

          <div className="v4c-section">
            <TeamV4C />
          </div>

          <div className="v4c-section">
            <NewsV4C />
          </div>

          <div className="v4c-section">
            <ContactV4C />
          </div>
        </main>
        
        <FooterV4C />
      </div>
    </div>
  )
}