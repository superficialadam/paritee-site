'use client'

import { useEffect } from 'react'
import HeaderIteration2V1 from '@/components/iteration2v1/HeaderIteration2V1'
import HeroIteration2V1 from '@/components/iteration2v1/HeroIteration2V1'
import MissionIteration2V1 from '@/components/iteration2v1/MissionIteration2V1'
import NewsIteration2V1 from '@/components/iteration2v1/NewsIteration2V1'
import ServicesIteration2V1 from '@/components/iteration2v1/ServicesIteration2V1'
import SectorsIteration2V1 from '@/components/iteration2v1/SectorsIteration2V1'
import GeographiesIteration2V1 from '@/components/iteration2v1/GeographiesIteration2V1'
import AgenciesIteration2V1 from '@/components/iteration2v1/AgenciesIteration2V1'
import CasesIteration2V1 from '@/components/iteration2v1/CasesIteration2V1'
import TeamIteration2V1 from '@/components/iteration2v1/TeamIteration2V1'
import ContactIteration2V1 from '@/components/iteration2v1/ContactIteration2V1'
import FooterIteration2V1 from '@/components/iteration2v1/FooterIteration2V1'

export default function Iteration2V1Page() {
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
    <div className="iteration2-v1-container relative min-h-screen">
      <HeaderIteration2V1 />
      
      <main>
        <HeroIteration2V1 />
        <MissionIteration2V1 />
        <NewsIteration2V1 />
        <ServicesIteration2V1 />
        <SectorsIteration2V1 />
        <GeographiesIteration2V1 />
        <AgenciesIteration2V1 />
        <CasesIteration2V1 />
        <TeamIteration2V1 />
        <ContactIteration2V1 />
      </main>

      <FooterIteration2V1 />
    </div>
  )
}