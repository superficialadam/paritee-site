'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Users, ArrowRight } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/nightly/synthesis-e/services', label: 'What We Do' },
    { href: '/nightly/synthesis-e/agencies', label: 'Our Partners' },
    { href: '/nightly/synthesis-e/cases', label: 'Success Stories' },
    { href: '/nightly/synthesis-e/team', label: 'The People' },
    { href: '/nightly/synthesis-e/contact', label: 'Partner With Us' }
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo with Partnership Symbol */}
          <Link href="/nightly/synthesis-e" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Collaborative logo representation */}
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-125 transition-transform duration-300" />
                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-300" style={{ transitionDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-125 transition-transform duration-300" style={{ transitionDelay: '0.2s' }} />
              </div>
              <div className="absolute -top-1 -left-1 w-5 h-5 border border-blue-400/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
              Paritee
            </span>
            <div className="hidden sm:flex items-center space-x-2 text-xs text-blue-400/70">
              <span>•</span>
              <span>Synthesis E</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-300 hover:text-white transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/nightly/synthesis-e/contact"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 flex items-center space-x-2 group"
            >
              <span>Start Partnership</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden bg-slate-950/98 backdrop-blur-md border-t border-slate-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                className="pt-4 border-t border-slate-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
              >
                <Link
                  href="/nightly/synthesis-e/contact"
                  className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full transition-all duration-300 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="w-5 h-5" />
                  <span>Start Partnership</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collaborative Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/50">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
          initial={{ width: '0%' }}
          animate={{ width: scrolled ? '20%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.header>
  )
}