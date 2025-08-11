'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import to ensure client-side only rendering
const DotMatrixCanvas = dynamic(() => import('@/components/iteration2v2/DotMatrixCanvas'), { 
  ssr: false 
})
import HeaderIteration2V2 from '@/components/iteration2v2/HeaderIteration2V2'
import HeroIteration2V2 from '@/components/iteration2v2/HeroIteration2V2'
import MissionIteration2V2 from '@/components/iteration2v2/MissionIteration2V2'
import NewsIteration2V2 from '@/components/iteration2v2/NewsIteration2V2'
import ServicesIteration2V2 from '@/components/iteration2v2/ServicesIteration2V2'
import SectorsIteration2V2 from '@/components/iteration2v2/SectorsIteration2V2'
import GeographiesIteration2V2 from '@/components/iteration2v2/GeographiesIteration2V2'
import AgenciesIteration2V2 from '@/components/iteration2v2/AgenciesIteration2V2'
import CasesIteration2V2 from '@/components/iteration2v2/CasesIteration2V2'
import TeamIteration2V2 from '@/components/iteration2v2/TeamIteration2V2'
import ContactIteration2V2 from '@/components/iteration2v2/ContactIteration2V2'
import FooterIteration2V2 from '@/components/iteration2v2/FooterIteration2V2'

export default function Iteration2V2Page() {
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
    <div className="iteration2-v2-container relative min-h-screen">
      {/* Dot Matrix Canvas Layer - Behind all content */}
      <DotMatrixCanvas />
      
      {/* Content Layer - Above canvas */}
      <div className="content-layer">
        <HeaderIteration2V2 />
        
        <main>
          <HeroIteration2V2 />
          <MissionIteration2V2 />
          <NewsIteration2V2 />
          <ServicesIteration2V2 />
          <SectorsIteration2V2 />
          <GeographiesIteration2V2 />
          <AgenciesIteration2V2 />
          <CasesIteration2V2 />
          <TeamIteration2V2 />
          <ContactIteration2V2 />
        </main>

        <FooterIteration2V2 />
      </div>
    </div>
  )
}