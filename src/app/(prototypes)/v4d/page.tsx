'use client'

import { useEffect } from 'react'
import HeaderV4D from '@/components/v4d/HeaderV4D'
import HeroV4D from '@/components/v4d/HeroV4D'
import MissionV4D from '@/components/v4d/MissionV4D'
import ServicesV4D from '@/components/v4d/ServicesV4D'
import SectionV4D from '@/components/v4d/SectionV4D'
import CasesV4D from '@/components/v4d/CasesV4D'
import TeamV4D from '@/components/v4d/TeamV4D'
import NewsV4D from '@/components/v4d/NewsV4D'
import ContactV4D from '@/components/v4d/ContactV4D'
import FooterV4D from '@/components/v4d/FooterV4D'
import P5BackgroundV4D from '@/components/v4d/P5BackgroundV4D'
import { sectors } from '@/data/sectors'
import { geographies } from '@/data/geographies'
import { agencies } from '@/data/agencies'

export default function V4DPage() {
  useEffect(() => {
    // Initialize scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          
          // Add staggered animation to children
          const children = entry.target.querySelectorAll('.stagger-child')
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('visible')
            }, index * 100)
          })
        }
      })
    }, observerOptions)

    // Observe all fade-up elements
    const fadeElements = document.querySelectorAll('.fade-up')
    fadeElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="v4d-page-container relative min-h-screen bg-white">
      {/* P5.js Background Canvas */}
      <P5BackgroundV4D />
      
      {/* Main Content */}
      <div className="relative z-10">
        <HeaderV4D />
        
        <main>
          {/* Hero Section */}
          <section id="home" className="gallery-section">
            <HeroV4D />
          </section>

          {/* Mission Section */}
          <section className="gallery-section fade-up">
            <MissionV4D />
          </section>

          {/* Services Section */}
          <section className="gallery-section fade-up">
            <ServicesV4D />
          </section>

          {/* Sectors Section */}
          <SectionV4D
            id="sectors"
            eyebrow="Industry Expertise"
            title="Sectors We Serve"
            intro="Curating excellence across key industries with deep sector knowledge and specialized expertise."
          >
            <div className="gallery-grid gallery-grid-3">
              {sectors.map((sector, index) => (
                <div
                  key={sector.id}
                  className="gallery-card p-8 stagger-child fade-up"
                  style={{ '--stagger-delay': index } as React.CSSProperties}
                >
                  <h3 className="card-title display-font text-black mb-4">
                    {sector.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {sector.description}
                  </p>
                  <div className="mt-6 text-sm font-medium text-yellow-600 hover:text-yellow-700 transition-colors">
                    Explore Sector →
                  </div>
                </div>
              ))}
            </div>
          </SectionV4D>

          {/* Geographies Section */}
          <SectionV4D
            id="geographies"
            eyebrow="Global Reach"
            title="Where We Create"
            intro="Local expertise meets global perspective across our carefully selected markets."
          >
            <div className="gallery-grid gallery-grid-4">
              {geographies.map((geo, index) => (
                <div
                  key={geo.country}
                  className="gallery-card p-8 text-center stagger-child fade-up"
                  style={{ '--stagger-delay': index } as React.CSSProperties}
                >
                  <h3 className="card-title display-font text-black mb-6">
                    {geo.country}
                  </h3>
                  <div className="space-y-2">
                    {geo.cities.map((city) => (
                      <div key={city} className="text-gray-600">
                        {city}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionV4D>

          {/* Agencies Section */}
          <SectionV4D
            id="agencies"
            eyebrow="Our Network"
            title="Partner Agencies"
            intro="A curated collection of the world's most talented creative agencies."
          >
            <div className="gallery-grid gallery-grid-2">
              {agencies.map((agency, index) => (
                <div
                  key={agency.id}
                  className="gallery-card p-10 stagger-child fade-up"
                  style={{ '--stagger-delay': index } as React.CSSProperties}
                >
                  <h3 className="card-title display-font text-black mb-3">
                    {agency.name}
                  </h3>
                  <div className="text-sm text-yellow-600 mb-6 font-medium">
                    {agency.locations.join(' • ')}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {agency.blurb}
                  </p>
                  <div className="text-sm font-medium text-black hover:text-yellow-600 transition-colors">
                    View Portfolio →
                  </div>
                </div>
              ))}
            </div>
          </SectionV4D>

          {/* Cases Section */}
          <section className="gallery-section fade-up">
            <CasesV4D />
          </section>

          {/* Team Section */}
          <section className="gallery-section fade-up">
            <TeamV4D />
          </section>

          {/* News Section */}
          <section className="gallery-section fade-up">
            <NewsV4D />
          </section>

          {/* Contact Section */}
          <section className="gallery-section fade-up">
            <ContactV4D />
          </section>
        </main>

        {/* Footer with World Map */}
        <FooterV4D />
      </div>
    </div>
  )
}