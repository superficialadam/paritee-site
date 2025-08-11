'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, Star, Globe, Mail, ArrowRight } from 'lucide-react'

export default function Footer() {
  const footerSections = [
    {
      title: 'Partnership',
      links: [
        { href: '/nightly/synthesis-e/agencies', label: 'Our Network' },
        { href: '/nightly/synthesis-e/cases', label: 'Success Stories' },
        { href: '/nightly/synthesis-e/team', label: 'The People' },
        { href: '/nightly/synthesis-e/contact', label: 'Get Started' }
      ]
    },
    {
      title: 'What We Do',
      links: [
        { href: '/nightly/synthesis-e/services', label: 'Services' },
        { href: '/nightly/synthesis-e/sectors', label: 'Industries' },
        { href: '/nightly/synthesis-e/geographies', label: 'Locations' },
        { href: '/nightly/synthesis-e/news', label: 'Latest News' }
      ]
    },
    {
      title: 'Innovation',
      links: [
        { href: '#', label: 'Collaborative Design' },
        { href: '#', label: 'Adaptive UX' },
        { href: '#', label: 'Smart Interactions' },
        { href: '#', label: 'Partnership Canvas' }
      ]
    }
  ]

  return (
    <footer className="relative bg-slate-950/90 backdrop-blur-sm border-t border-slate-800">
      {/* Partnership visualization background */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-96 h-96">
            {/* Central collaboration hub */}
            <div className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 bg-blue-400 rounded-full" />
            
            {/* Partner nodes */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * 2 * Math.PI
              const radius = 120
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius
              
              return (
                <div
                  key={i}
                  className="absolute w-2 h-2 -mt-1 -ml-1 bg-blue-500 rounded-full"
                  style={{
                    top: `calc(50% + ${y}px)`,
                    left: `calc(50% + ${x}px)`
                  }}
                />
              )
            })}
            
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full">
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * 2 * Math.PI
                const radius = 120
                const x = 192 + Math.cos(angle) * radius
                const y = 192 + Math.sin(angle) * radius
                
                return (
                  <line
                    key={i}
                    x1={192}
                    y1={192}
                    x2={x}
                    y2={y}
                    stroke="rgba(59, 130, 246, 1)"
                    strokeWidth="0.5"
                  />
                )
              })}
            </svg>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/nightly/synthesis-e" className="flex items-center space-x-3 group mb-6">
              <div className="relative">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-125 transition-transform duration-300" />
                  <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-300" style={{ transitionDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-125 transition-transform duration-300" style={{ transitionDelay: '0.2s' }} />
                </div>
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                Paritee
              </span>
            </Link>
            
            <p className="text-slate-400 leading-relaxed mb-6 text-sm">
              A coalition of top-tier, advisory-led agencies united by one principle: 
              Great things happen when equals come together.
            </p>

            {/* Partnership Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">25+</div>
                <div className="text-xs text-slate-500">Partner Agencies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">15+</div>
                <div className="text-xs text-slate-500">Global Markets</div>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          {footerSections.map((section, sectionIndex) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                {sectionIndex === 0 && <Users className="w-4 h-4 text-blue-400" />}
                {sectionIndex === 1 && <Star className="w-4 h-4 text-blue-400" />}
                {sectionIndex === 2 && <Globe className="w-4 h-4 text-blue-400" />}
                <span>{section.title}</span>
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={link.href}>
                    <motion.div
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1, x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-blue-300 transition-colors duration-300 text-sm flex items-center space-x-2 group"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Ready to Experience Partnership?</h3>
              <p className="text-slate-300">
                Let's explore how equals coming together can transform your challenges into breakthrough results.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/nightly/synthesis-e/contact"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 flex items-center justify-center space-x-2 group"
              >
                <Users className="w-5 h-5" />
                <span>Start Partnership</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/nightly/synthesis-e/cases"
                className="bg-transparent border-2 border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 hover:text-slate-200 px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Star className="w-5 h-5" />
                <span>See Results</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-500 text-sm">
              © 2024 Paritee. A collaborative network where equals come together.
            </div>
            
            {/* Innovation Badge */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2 text-blue-400/70">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span>Synthesis E</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="text-slate-500">
                Collaborative Innovation
              </div>
            </div>

            {/* Partnership Quality Indicators */}
            <div className="flex items-center space-x-6 text-xs text-slate-500">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>Equal Partners</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3" />
                <span>Proven Results</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe className="w-3 h-3" />
                <span>Global Network</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle collaborative animation */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600/20 via-blue-500/40 to-blue-600/20">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
          initial={{ width: '0%', opacity: 0.5 }}
          animate={{ 
            width: ['0%', '100%', '0%'],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>
    </footer>
  )
}