'use client'

import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Fixed scroll progress bar */}
      <div 
        className="fixed top-0 left-0 w-full h-1 bg-slate-800/50 backdrop-blur-sm z-[60]"
        aria-hidden="true"
      >
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 ease-out shadow-md shadow-blue-500/50"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-label={`Page scroll progress: ${Math.round(progress)}%`}
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      
      {/* Circular progress indicator with accessibility enhancements */}
      <div className="fixed bottom-8 right-8 z-50 group">
        <div className="relative w-16 h-16">
          {/* Background circle */}
          <svg 
            className="w-16 h-16 transform -rotate-90" 
            viewBox="0 0 64 64"
            aria-hidden="true"
          >
            <circle 
              cx="32" 
              cy="32" 
              r="28" 
              stroke="rgb(71 85 105 / 0.5)" 
              strokeWidth="4" 
              fill="none"
            />
            <circle 
              cx="32" 
              cy="32" 
              r="28" 
              stroke="url(#gradient-synthesis-b)" 
              strokeWidth="4" 
              fill="none"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
              className="transition-all duration-300 ease-out drop-shadow-sm"
            />
            <defs>
              <linearGradient id="gradient-synthesis-b" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(37 99 235)" />
                <stop offset="100%" stopColor="rgb(96 165 250)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              className="w-10 h-10 bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-blue-600/20 transition-all duration-300 group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label={`Scroll to top - ${Math.round(progress)}% through page`}
              title="Scroll to top"
            >
              <span className="text-xs font-medium text-blue-400 group-hover:text-blue-300">
                {Math.round(progress)}%
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}