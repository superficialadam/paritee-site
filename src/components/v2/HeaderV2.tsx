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

export default function HeaderV2() {
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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700/50' 
        : 'bg-transparent'
    }`}>
      <div className="container">
        <div className="flex items-center justify-between py-6">
          <Link href="/" className="text-3xl font-bold font-heading tracking-tight text-white">
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
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md relative overflow-hidden ${
                    isActive
                      ? 'text-white bg-slate-800 border-b-2 border-blue-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 pointer-events-none"></div>
                  )}
                </a>
              )
            })}
          </nav>

          <button
            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-700/50">
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
                        ? 'text-white bg-slate-800 border-l-4 border-blue-400'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
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