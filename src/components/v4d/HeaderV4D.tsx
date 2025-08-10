'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function HeaderV4D() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Sectors', id: 'sectors' },
    { label: 'Network', id: 'agencies' },
    { label: 'Portfolio', id: 'cases' },
    { label: 'Team', id: 'team' },
    { label: 'News', id: 'news' },
    { label: 'Contact', id: 'contact' }
  ]

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' 
            : 'bg-transparent'
        }`}
      >
        <div className="gallery-container">
          <nav className="flex items-center justify-between py-6">
            {/* Logo */}
            <div 
              className="display-font text-2xl font-light text-black cursor-pointer hover:text-yellow-600 transition-colors duration-300"
              onClick={() => scrollToSection('home')}
            >
              Paritee
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              {navItems.slice(1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-yellow-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-black text-white text-sm font-medium hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105"
              >
                Start a Project
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-black hover:text-yellow-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div 
          className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-500 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-8 pt-24">
            <nav className="space-y-8">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-2xl display-font font-light text-black hover:text-yellow-600 transition-all duration-300 transform hover:translate-x-2"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    opacity: isMenuOpen ? 1 : 0,
                    transform: `translateY(${isMenuOpen ? 0 : 20}px)`
                  }}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-8 border-t border-gray-100">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full px-8 py-4 bg-black text-white text-lg font-medium hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105"
                >
                  Start a Project
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-20" />

      <style jsx>{`
        @keyframes slideInMobile {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-nav-item {
          animation: slideInMobile 0.3s ease-out forwards;
        }
      `}</style>
    </>
  )
}