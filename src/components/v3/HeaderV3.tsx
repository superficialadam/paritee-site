'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Sectors', href: '#sectors' },
  { name: 'Geographies', href: '#geographies' },
  { name: 'Agencies', href: '#agencies' },
  { name: 'Cases', href: '#cases' },
  { name: 'Team', href: '#team' },
  { name: 'News', href: '#news' },
  { name: 'Contact', href: '#contact' },
]

export default function HeaderV3() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
      }
    )

    const sections = navigation.map(nav => nav.href.slice(1))
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100' : 'bg-transparent'
    }`}>
      <div className="container max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between py-8">
          <Link href="/" className="text-2xl font-light font-heading tracking-tight text-black">
            Paritee
          </Link>

          <nav className="hidden lg:flex items-center space-x-12">
            {navigation.map((item) => {
              const sectionId = item.href.slice(1)
              const isActive = activeSection === sectionId
              
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-light transition-colors duration-200 relative ${
                    isActive ? 'text-black' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 w-full h-px bg-black"></div>
                  )}
                </a>
              )
            })}
          </nav>

          {/* Mobile menu would be here - simplified for minimal design */}
          <div className="lg:hidden">
            <button className="text-sm font-light text-black">Menu</button>
          </div>
        </div>
      </div>
    </header>
  )
}