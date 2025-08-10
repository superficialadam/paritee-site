'use client'

import { useState, useEffect } from 'react'
import { ArrowUp, Linkedin, Twitter, Instagram, Mail } from 'lucide-react'

export default function FooterV4D() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative border-t border-gray-100 bg-white">
      {/* Background Pattern - Dot Matrix that becomes World Map via P5.js */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0'
        }} />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Footer Top */}
        <div className="gallery-container py-20">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="display-font text-3xl font-light text-black mb-6">
                Paritee
              </div>
              <p className="text-gray-600 leading-relaxed mb-8 max-w-md">
                Curating excellence in creative partnerships. We connect visionary brands 
                with the world's most exceptional agencies to create work worthy of permanent exhibition.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mb-8">
                <h4 className="font-medium text-black mb-4">Stay Gallery Connected</h4>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-grow px-4 py-3 border border-gray-300 focus:border-yellow-600 focus:outline-none text-sm"
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-black text-white hover:bg-yellow-600 transition-colors duration-300"
                  >
                    <Mail size={16} />
                  </button>
                </form>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-10 h-10 border border-gray-300 hover:border-yellow-600 flex items-center justify-center transition-all duration-300 hover:bg-yellow-600 hover:text-white group"
                >
                  <Linkedin size={18} className="transition-colors" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 border border-gray-300 hover:border-yellow-600 flex items-center justify-center transition-all duration-300 hover:bg-yellow-600 hover:text-white group"
                >
                  <Twitter size={18} className="transition-colors" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 border border-gray-300 hover:border-yellow-600 flex items-center justify-center transition-all duration-300 hover:bg-yellow-600 hover:text-white group"
                >
                  <Instagram size={18} className="transition-colors" />
                </a>
              </div>
            </div>

            {/* Navigation Column */}
            <div>
              <h4 className="font-medium text-black mb-6">Gallery Navigation</h4>
              <nav className="space-y-4">
                {[
                  { label: 'Services', id: 'services' },
                  { label: 'Portfolio', id: 'cases' },
                  { label: 'Our Network', id: 'agencies' },
                  { label: 'Team', id: 'team' },
                  { label: 'News & Insights', id: 'news' },
                  { label: 'Contact', id: 'contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-gray-600 hover:text-yellow-600 transition-colors duration-300 text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Information Column */}
            <div>
              <h4 className="font-medium text-black mb-6">Information</h4>
              <nav className="space-y-4 mb-8">
                {[
                  'About Us',
                  'Careers',
                  'Press Kit',
                  'Awards',
                  'Sustainability',
                  'Privacy Policy'
                ].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-gray-600 hover:text-yellow-600 transition-colors duration-300"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              {/* Certifications */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-3">Certifications</h5>
                <div className="space-y-2 text-xs text-gray-500">
                  <div>ISO 27001 Certified</div>
                  <div>Google Premier Partner</div>
                  <div>Facebook Marketing Partner</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-100 py-8">
          <div className="gallery-container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} Paritee. All rights reserved. Crafted with precision.
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="text-gray-500 hover:text-yellow-600 transition-colors">
                  Terms of Service
                </a>
                <span className="text-gray-300">|</span>
                <a href="#" className="text-gray-500 hover:text-yellow-600 transition-colors">
                  Privacy Policy
                </a>
                <span className="text-gray-300">|</span>
                <a href="#" className="text-gray-500 hover:text-yellow-600 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>

            {/* Gallery Philosophy Quote */}
            <div className="mt-12 pt-8 border-t border-gray-100 text-center">
              <blockquote className="text-lg display-font font-light text-gray-700 max-w-2xl mx-auto">
                "In every partnership, we seek not just to create campaigns, 
                but to curate moments of creative transcendence that endure."
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-black text-white hover:bg-yellow-600 transition-all duration-300 z-50 ${
          showScrollTop 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp size={20} className="mx-auto" />
      </button>

      {/* Custom Styles for Footer Animations */}
      <style jsx>{`
        .footer-fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Subtle hover effects for links */
        nav a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: #D4AF37;
          transition: width 0.3s ease-out;
        }

        nav a:hover::after {
          width: 100%;
        }
      `}</style>
    </footer>
  )
}