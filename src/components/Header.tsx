'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Sector Specialisms', href: '#sectors' },
  { name: 'Geographies', href: '#geographies' },
  { name: 'Agencies', href: '#agencies' },
  { name: 'Cases', href: '#cases' },
  { name: 'Team', href: '#team' },
  { name: 'News', href: '#news' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

    // Observe all sections
    const sections = navigation.map(nav => nav.href.slice(1)) // Remove '#'
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-stone-50/95 backdrop-blur-md shadow-sm border-b border-stone-200/50' 
        : 'bg-transparent'
    }`}>
      <div className="container">
        <div className="flex items-center justify-between py-6">
          <Link href="/" className="text-3xl font-bold font-heading tracking-tight text-stone-900">
            Paritee
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const sectionId = item.href.slice(1)
              const isActive = activeSection === sectionId
              
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                    isActive
                      ? 'text-stone-900 bg-stone-900/5 border-b-2 border-stone-900'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-900/5'
                  }`}
                >
                  {item.name}
                </a>
              )
            })}
          </nav>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? 
              <X size={24} className="text-stone-700" /> : 
              <Menu size={24} className="text-stone-700" />
            }
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-200/50">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const sectionId = item.href.slice(1)
                const isActive = activeSection === sectionId
                
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-3 text-sm font-medium transition-colors rounded-md ${
                      isActive
                        ? 'text-stone-900 bg-stone-900/10 border-l-4 border-stone-900'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-900/5'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}