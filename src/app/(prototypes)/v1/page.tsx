import Hero from '@/components/Hero'
import MissionBlock from '@/components/MissionBlock'
import ServicesGrid from '@/components/ServicesGrid'
import SectorsGrid from '@/components/SectorsGrid'
import GeoMapLite from '@/components/GeoMapLite'
import AgenciesGrid from '@/components/AgenciesGrid'
import CasesGallery from '@/components/CasesGallery'
import PeopleGrid from '@/components/PeopleGrid'
import NewsCarousel from '@/components/NewsCarousel'
import ContactForm from '@/components/ContactForm'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function V1Page() {
  return (
    <>
      <Header />
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="mission" className="py-16">
          <div className="container">
            <MissionBlock />
          </div>
        </section>

        <section id="services" className="py-16">
          <div className="container">
            <ServicesGrid />
          </div>
        </section>

        <section id="sectors" className="py-16">
          <div className="container">
            <SectorsGrid />
          </div>
        </section>

        <section id="geographies" className="py-16">
          <div className="container">
            <GeoMapLite />
          </div>
        </section>

        <section id="agencies" className="py-16">
          <div className="container">
            <AgenciesGrid />
          </div>
        </section>

        <section id="cases" className="py-16">
          <div className="container">
            <CasesGallery />
          </div>
        </section>

        <section id="team" className="py-16">
          <div className="container">
            <PeopleGrid />
          </div>
        </section>

        <section id="news" className="py-16">
          <div className="container">
            <NewsCarousel />
          </div>
        </section>

        <section id="contact" className="py-16">
          <div className="container">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}