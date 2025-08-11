'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import for better performance and SSR safety
const P5OptimizedCanvas = dynamic(() => import('./P5OptimizedCanvas'), {
  ssr: false,
  loading: () => null
})

export function CanvasWrapper() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // Respect user's motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    setIsVisible(!mediaQuery.matches)
    
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches)
      setIsVisible(!mediaQuery.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Battery optimization - pause animations on low battery
  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const handleBatteryChange = () => {
          if (battery.level < 0.2 && !battery.charging) {
            setIsVisible(false)
          } else if (battery.charging || battery.level > 0.3) {
            setIsVisible(!prefersReducedMotion)
          }
        }
        
        battery.addEventListener('levelchange', handleBatteryChange)
        battery.addEventListener('chargingchange', handleBatteryChange)
        
        return () => {
          battery.removeEventListener('levelchange', handleBatteryChange)
          battery.removeEventListener('chargingchange', handleBatteryChange)
        }
      })
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion || !isVisible) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        aria-hidden="true"
        role="presentation"
      />
    )
  }

  return <P5OptimizedCanvas />
}