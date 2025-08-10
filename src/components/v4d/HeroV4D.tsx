'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Play } from 'lucide-react'

export default function HeroV4D() {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content Container */}
      <div className="gallery-container text-center relative z-10">
        {/* Eyebrow */}
        <div 
          className={`gallery-eyebrow inline-block mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Curating Excellence in Creative Partnerships
        </div>

        {/* Main Headline */}
        <h1 
          className={`display-large leading-none text-black mb-8 max-w-4xl mx-auto transition-all duration-1200 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          Where Strategy
          <br />
          <span className="text-yellow-600">Meets Artistry</span>
        </h1>

        {/* Subtitle */}
        <p 
          className={`text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          A carefully curated network of the world's most exceptional creative agencies, 
          united by a shared commitment to craftsmanship and attention to detail.
        </p>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-900 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={() => scrollToSection('services')}
            className="group px-10 py-4 bg-black text-white font-medium text-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
          >
            Explore Our Work
            <ArrowRight 
              size={20} 
              className="transition-transform duration-300 group-hover:translate-x-1" 
            />
          </button>
          
          <button
            onClick={() => scrollToSection('cases')}
            className="group px-10 py-4 border-2 border-black text-black font-medium text-lg hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
          >
            <Play size={18} className="transition-transform duration-300 group-hover:scale-110" />
            View Gallery
          </button>
        </div>

        {/* Scroll Indicator */}
        <div 
          className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm text-gray-400 font-medium tracking-wide">SCROLL TO EXPLORE</span>
            <div className="w-px h-12 bg-gradient-to-b from-gray-300 to-transparent relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yellow-600 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric Accent */}
        <div 
          className={`absolute top-20 right-20 w-32 h-32 border border-gray-200 transform rotate-45 transition-all duration-2000 delay-1000 ${
            isVisible ? 'opacity-30 scale-100' : 'opacity-0 scale-50'
          }`}
        />
        
        {/* Left Accent */}
        <div 
          className={`absolute bottom-40 left-20 w-24 h-24 bg-yellow-600/5 transform rotate-12 transition-all duration-2000 delay-1200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        />
        
        {/* Floating Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 26%, transparent 27%, transparent 74%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 26%, transparent 27%, transparent 74%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-10px) rotate(45deg); }
        }

        @keyframes pulse-line {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(48px); opacity: 0; }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-line::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #D4AF37;
          animation: pulse-line 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}