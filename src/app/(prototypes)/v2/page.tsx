import HeroV2 from '@/components/v2/HeroV2'
import HeaderV2 from '@/components/v2/HeaderV2'
import SectionV2 from '@/components/v2/SectionV2'
import NewsCarouselV2 from '@/components/v2/NewsCarouselV2'
import AgenciesCarouselV2 from '@/components/v2/AgenciesCarouselV2'
import MissionBlock from '@/components/MissionBlock'
import ServicesGrid from '@/components/ServicesGrid'
import SectorsGrid from '@/components/SectorsGrid'
import GeoMapLite from '@/components/GeoMapLite'
import CasesGallery from '@/components/CasesGallery'
import PeopleGrid from '@/components/PeopleGrid'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function V2Page() {
  return (
    <>
      <HeaderV2 />
      <main className="bg-slate-900">
        <section id="home">
          <HeroV2 />
        </section>
        
        <SectionV2 
          id="mission" 
          eyebrow="Our Mission"
          title="Redefining What's Possible"
          variant="alternate"
        >
          <MissionBlock />
        </SectionV2>

        <SectionV2 
          id="services"
          eyebrow="What We Do"
          title="Comprehensive Solutions"
          intro="From strategic planning to creative execution, we cover every aspect of modern marketing with uncompromising excellence."
        >
          <ServicesGrid />
        </SectionV2>

        <SectionV2 
          id="sectors"
          eyebrow="Industry Expertise"
          title="Sector Specialisms"
          intro="Deep industry knowledge across key sectors, enabling us to deliver insights and strategies that truly resonate."
          variant="alternate"
        >
          <SectorsGrid />
        </SectionV2>

        <SectionV2 
          id="geographies"
          eyebrow="Global Presence"
          title="Where We Work"
          intro="Local expertise, global reach. Our teams across major markets ensure deep cultural understanding and market-specific strategies."
        >
          <GeoMapLite />
        </SectionV2>

        <AgenciesCarouselV2 />

        <SectionV2 
          id="cases"
          eyebrow="Our Work"
          title="Case Studies"
          intro="Real results for real brands. Explore our most impactful campaigns and the strategies behind their success."
        >
          <CasesGallery />
        </SectionV2>

        <SectionV2 
          id="team"
          eyebrow="Meet the Team"
          title="The People Behind the Work"
          intro="Experienced leaders from diverse backgrounds, united by a shared commitment to delivering exceptional marketing results."
          variant="alternate"
        >
          <PeopleGrid />
        </SectionV2>

        <NewsCarouselV2 />

        <SectionV2 
          id="contact"
          eyebrow="Get in Touch"
          title="Start Your Project"
          intro="Ready to create something extraordinary? Let's discuss your goals and explore how we can help you achieve them."
        >
          <ContactForm />
        </SectionV2>
      </main>
      <Footer />
    </>
  )
}