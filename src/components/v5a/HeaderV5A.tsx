'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const HeaderV5A = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1])
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 20])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { label: 'HOME', href: '#home' },
    { label: 'MISSION', href: '#mission' },
    { label: 'SERVICES', href: '#services' },
    { label: 'SECTORS', href: '#sectors' },
    { label: 'NETWORK', href: '#agencies' },
    { label: 'CASES', href: '#cases' },
    { label: 'TEAM', href: '#team' },
    { label: 'NEWS', href: '#news' },
    { label: 'CONTACT', href: '#contact' },
  ]

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'bg-black/80 border-b border-white/10' : 'bg-transparent'
        }`}
        style={{
          opacity: headerOpacity,
          backdropFilter: `blur(${backdropBlur}px)`
        }}
      >
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <a href="#home">
                <img
                  src="/images/logo.png"
                  alt="Paritee"
                  className="h-10 w-auto"
                />
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-12">
              {menuItems.slice(1, -1).map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: "easeOut" 
                  }}
                >
                  <a
                    href={item.href}
                    className="text-sm font-bold text-white hover:text-red-600 transition-all duration-300 tracking-wider relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-500" />
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Contact Button */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <a
                href="#contact"
                className="bg-red-600 hover:bg-white text-white hover:text-black px-8 py-3 font-black text-sm tracking-wider transition-all duration-500 relative overflow-hidden group"
              >
                <span className="relative z-10">CONTACT</span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
              aria-label="Toggle menu"
            >
              <motion.span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
                animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
                animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <motion.div
        className={`fixed inset-0 z-40 bg-black ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 0.95 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0, 
                y: isMenuOpen ? 0 : 50 
              }}
              transition={{ 
                duration: 0.6, 
                delay: isMenuOpen ? index * 0.1 : 0,
                ease: "easeOut" 
              }}
            >
              <a
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-black text-white hover:text-red-600 transition-colors duration-500 tracking-tighter"
              >
                {item.label}
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}

export default HeaderV5A