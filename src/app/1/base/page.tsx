'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Header from './components/Header'
import Hero from './components/Hero'
import MissionBlock from './components/MissionBlock'
import ServicesGrid from './components/ServicesGrid'
import SectorsGrid from './components/SectorsGrid'
import NewsCarousel from './components/NewsCarousel'
import GeoMapLite from './components/GeoMapLite'
import AgenciesGrid from './components/AgenciesGrid'
import PeopleGrid from './components/PeopleGrid'
import CasesGallery from './components/CasesGallery'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

export default function BasePage() {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    const sections = gsap.utils.toArray('section')

    // goToSection function - improved pattern for smooth fullpage snap
    function goToSection(i: number) {
      const targetSection = sections[i] as HTMLElement
      if (targetSection) {
        gsap.to(window, {
          scrollTo: {
            y: targetSection,
            offsetY: 0,
            autoKill: false,
            ease: 'power2.inOut'
          },
          duration: 1.2
        })
      }
    }

    // Set initial states for all animated headings
    gsap.set('.animated-heading', {
      opacity: 0,
      letterSpacing: '1rem',
      y: 30
    })

    // Create ScrollTrigger for each section - improved fullpage pattern
    sections.forEach((section: any, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => goToSection(i),
        onEnterBack: () => goToSection(i)
      })

      // Create heading animation for this section with better timing
      const heading = section.querySelector('.animated-heading')
      if (heading) {
        gsap.to(heading, {
          opacity: 1,
          letterSpacing: 'normal',
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
            scrub: 0.5
          }
        })
      }
    })

    // Handle navigation link clicks
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash) {
        e.preventDefault()
        const element = document.querySelector(target.hash)
        if (element) {
          const index = sections.indexOf(element)
          if (index !== -1) {
            goToSection(index)
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <MissionBlock />
      <ServicesGrid />
      <SectorsGrid />
      <NewsCarousel />
      <GeoMapLite />
      <AgenciesGrid />
      <PeopleGrid />
      <CasesGallery />
      <ContactForm />
      <Footer />
    </main>
  )
}