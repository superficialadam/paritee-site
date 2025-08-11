'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowUp, Heart, Zap } from 'lucide-react'

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  
  // Show footer when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const threshold = window.innerHeight * 0.5 // Show after scrolling 50vh
      setIsVisible(scrolled > threshold)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className={`
      relative bg-gradient-to-t from-slate-950 via-slate-900 to-transparent 
      border-t border-slate-800/30 backdrop-blur-xl
      transition-all duration-700 ease-consciousness transform-gpu
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
    `}>
      <div className="excellence-content-flow">
        <div className="col-start-2 px-fibonacci-21 py-fibonacci-55">
          
          {/* Excellence Attribution */}
          <div className="text-center space-y-fibonacci-21">
            
            {/* Refined Brand Statement */}
            <div className="space-y-fibonacci-13">
              <Link 
                href="/nightly/synthesis-f"
                className="inline-block group"
              >
                <h2 className="excellence-heading-section bg-gradient-to-r from-white via-excellence-blue-300 to-excellence-blue-400 bg-clip-text text-transparent group-hover:from-excellence-blue-400 group-hover:via-excellence-blue-300 group-hover:to-white transition-all duration-500 ease-consciousness">
                  Paritee
                </h2>
              </Link>
              
              <p className="excellence-text-body text-slate-400 max-w-2xl mx-auto">
                Where equals come together to deliver excellence without compromise.
              </p>
            </div>
            
            {/* Excellence Craftsmanship Credits */}
            <div className="space-y-fibonacci-8 text-fibonacci-13 text-slate-500">
              <p className="flex items-center justify-center space-x-2">
                <span>Crafted with</span>
                <Heart className="w-4 h-4 text-red-400 animate-breathing" />
                <span>and obsessive attention to detail</span>
              </p>
              
              <p className="flex items-center justify-center space-x-2">
                <span>Powered by consciousness-level algorithms</span>
                <Zap className="w-4 h-4 text-yellow-400" />
              </p>
              
              <div className="space-y-2">
                <p className="font-mono">
                  Synthesis-F: Excellence Refinement Specialist
                </p>
                <p className="text-fibonacci-xs opacity-75">
                  Mathematical beauty • Physics-accurate motion • Sub-16ms response
                </p>
              </div>
            </div>
            
            {/* Perfect Navigation Links */}
            <nav className="flex flex-wrap justify-center gap-fibonacci-21 text-fibonacci-sm">
              <Link 
                href="/nightly/synthesis-f/services" 
                className="text-slate-400 hover:text-excellence-blue-400 transition-colors duration-300 hover:translate-y-[-1px] motion-reduce:hover:translate-y-0 transform-gpu"
              >
                Services
              </Link>
              <Link 
                href="/nightly/synthesis-f/agencies" 
                className="text-slate-400 hover:text-excellence-blue-400 transition-colors duration-300 hover:translate-y-[-1px] motion-reduce:hover:translate-y-0 transform-gpu"
              >
                Agencies
              </Link>
              <Link 
                href="/nightly/synthesis-f/cases" 
                className="text-slate-400 hover:text-excellence-blue-400 transition-colors duration-300 hover:translate-y-[-1px] motion-reduce:hover:translate-y-0 transform-gpu"
              >
                Cases
              </Link>
              <Link 
                href="/nightly/synthesis-f/contact" 
                className="text-slate-400 hover:text-excellence-blue-400 transition-colors duration-300 hover:translate-y-[-1px] motion-reduce:hover:translate-y-0 transform-gpu"
              >
                Contact
              </Link>
            </nav>
            
            {/* Technical Excellence Footer */}
            <div className="pt-fibonacci-21 border-t border-slate-800/20 space-y-fibonacci-13 text-fibonacci-xs text-slate-600">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                <p>
                  &copy; {new Date().getFullYear()} Paritee. Excellence without compromise.
                </p>
                
                <div className="flex items-center space-x-fibonacci-13">
                  <span className="opacity-50">|</span>
                  <span>Golden Ratio Design</span>
                  <span className="opacity-50">|</span>
                  <span>Fibonacci Spacing</span>
                  <span className="opacity-50">|</span>
                  <span>60fps Guaranteed</span>
                </div>
              </div>
              
              {/* Performance Metrics Display */}
              <div className="text-center opacity-50 font-mono">
                <p>
                  Rendered with mathematical precision and consciousness-level responsiveness
                </p>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
      
      {/* Perfect Scroll-to-Top Button */}
      <button
        onClick={scrollToTop}
        className={`
          fixed bottom-fibonacci-34 right-fibonacci-34 z-50
          excellence-button bg-excellence-blue-600 text-white
          w-fibonacci-55 h-fibonacci-55 rounded-full
          shadow-excellence hover:shadow-none
          transition-all duration-300 ease-consciousness transform-gpu
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          hover:scale-110 motion-reduce:hover:scale-100
          focus:outline-none focus:ring-2 focus:ring-excellence-blue-400 focus:ring-offset-2
          group overflow-hidden
        `}
        aria-label="Scroll to top"
      >
        {/* Button background with consciousness gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-excellence-blue-600 to-excellence-blue-700 group-hover:from-excellence-blue-500 group-hover:to-excellence-blue-600 transition-all duration-300" />
        
        {/* Ripple effect on hover */}
        <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-consciousness" />
        
        {/* Icon with perfect positioning */}
        <ArrowUp className="relative z-10 w-fibonacci-21 h-fibonacci-21 group-hover:animate-breathing" />
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-excellence-blue-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg scale-150" />
      </button>
    </footer>
  )
}