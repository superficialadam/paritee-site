import HeaderV5A from '@/components/v5a/HeaderV5A'
import HeroV5A from '@/components/v5a/HeroV5A'
import MissionV5A from '@/components/v5a/MissionV5A'
import ServicesV5A from '@/components/v5a/ServicesV5A'
import SectorsV5A from '@/components/v5a/SectorsV5A'
import GeographiesV5A from '@/components/v5a/GeographiesV5A'
import AgenciesV5A from '@/components/v5a/AgenciesV5A'
import CasesV5A from '@/components/v5a/CasesV5A'
import TeamV5A from '@/components/v5a/TeamV5A'
import NewsV5A from '@/components/v5a/NewsV5A'
import ContactV5A from '@/components/v5a/ContactV5A'
import FooterV5A from '@/components/v5a/FooterV5A'
import P5BackgroundV5A from '@/components/v5a/P5BackgroundV5A'

export default function V5APage() {
  return (
    <div className="v5a-page-container min-h-screen relative">
      <div className="fixed inset-0 bg-gradient-to-b from-[#0E2756] to-[#0A1B3D] z-0" />
      
      <P5BackgroundV5A />
      
      <div className="relative z-20">
        <HeaderV5A />
        <main>
          <section id="home">
            <HeroV5A />
          </section>
          
          <section id="mission">
            <MissionV5A />
          </section>

          <section id="services">
            <ServicesV5A />
          </section>

          <section id="sectors">
            <SectorsV5A />
          </section>

          <section id="geographies">
            <GeographiesV5A />
          </section>

          <section id="agencies">
            <AgenciesV5A />
          </section>

          <section id="cases">
            <CasesV5A />
          </section>

          <section id="team">
            <TeamV5A />
          </section>

          <section id="news">
            <NewsV5A />
          </section>

          <section id="contact">
            <ContactV5A />
          </section>
        </main>
        
        <FooterV5A />
      </div>
    </div>
  )
}