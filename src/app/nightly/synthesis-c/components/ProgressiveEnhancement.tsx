'use client'

import { useEffect, useState, useRef, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  isEnhanced: boolean
}

interface CapabilityMatrix {
  // Browser APIs
  intersectionObserver: boolean
  resizeObserver: boolean
  mutationObserver: boolean
  performanceObserver: boolean
  
  // CSS Features
  cssGrid: boolean
  cssFlexbox: boolean
  cssBackdropFilter: boolean
  cssContainment: boolean
  cssCustomProperties: boolean
  cssViewTransitions: boolean
  
  // JavaScript Features
  es6Modules: boolean
  asyncAwait: boolean
  webWorkers: boolean
  serviceWorker: boolean
  webAssembly: boolean
  
  // Media APIs
  webGL: boolean
  webGL2: boolean
  audioContext: boolean
  getUserMedia: boolean
  
  // Storage & Networking
  localStorage: boolean
  sessionStorage: boolean
  indexedDB: boolean
  fetchAPI: boolean
  streams: boolean
  
  // Hardware Access
  deviceOrientation: boolean
  vibration: boolean
  geolocation: boolean
  
  // Performance Features
  requestIdleCallback: boolean
  requestAnimationFrame: boolean
}

// Feature detection functions
const detectCapabilities = (): CapabilityMatrix => {
  const capabilities: CapabilityMatrix = {
    // Browser APIs
    intersectionObserver: 'IntersectionObserver' in window,
    resizeObserver: 'ResizeObserver' in window,
    mutationObserver: 'MutationObserver' in window,
    performanceObserver: 'PerformanceObserver' in window,
    
    // CSS Features
    cssGrid: CSS.supports('display', 'grid'),
    cssFlexbox: CSS.supports('display', 'flex'),
    cssBackdropFilter: CSS.supports('backdrop-filter', 'blur(10px)'),
    cssContainment: CSS.supports('contain', 'layout style paint'),
    cssCustomProperties: CSS.supports('--custom', 'property'),
    cssViewTransitions: 'startViewTransition' in document,
    
    // JavaScript Features
    es6Modules: 'import' in document.createElement('script'),
    asyncAwait: (async () => {})() instanceof Promise,
    webWorkers: 'Worker' in window,
    serviceWorker: 'serviceWorker' in navigator,
    webAssembly: 'WebAssembly' in window,
    
    // Media APIs
    webGL: (() => {
      const canvas = document.createElement('canvas')
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    })(),
    webGL2: (() => {
      const canvas = document.createElement('canvas')
      return !!canvas.getContext('webgl2')
    })(),
    audioContext: 'AudioContext' in window || 'webkitAudioContext' in window,
    getUserMedia: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    
    // Storage & Networking
    localStorage: (() => {
      try {
        return 'localStorage' in window && window.localStorage !== null
      } catch {
        return false
      }
    })(),
    sessionStorage: (() => {
      try {
        return 'sessionStorage' in window && window.sessionStorage !== null
      } catch {
        return false
      }
    })(),
    indexedDB: 'indexedDB' in window,
    fetchAPI: 'fetch' in window,
    streams: 'ReadableStream' in window,
    
    // Hardware Access
    deviceOrientation: 'DeviceOrientationEvent' in window,
    vibration: 'vibrate' in navigator,
    geolocation: 'geolocation' in navigator,
    
    // Performance Features
    requestIdleCallback: 'requestIdleCallback' in window,
    requestAnimationFrame: 'requestAnimationFrame' in window,
  }

  return capabilities
}

// Calculate enhancement tier based on capabilities
const calculateEnhancementTier = (capabilities: CapabilityMatrix): 'basic' | 'enhanced' | 'premium' => {
  const coreFeatures = [
    capabilities.cssGrid,
    capabilities.cssFlexbox,
    capabilities.fetchAPI,
    capabilities.localStorage,
    capabilities.intersectionObserver
  ]
  
  const enhancedFeatures = [
    capabilities.cssBackdropFilter,
    capabilities.cssContainment,
    capabilities.performanceObserver,
    capabilities.webGL,
    capabilities.serviceWorker
  ]
  
  const premiumFeatures = [
    capabilities.webGL2,
    capabilities.cssViewTransitions,
    capabilities.webAssembly,
    capabilities.requestIdleCallback
  ]
  
  const coreScore = coreFeatures.filter(Boolean).length / coreFeatures.length
  const enhancedScore = enhancedFeatures.filter(Boolean).length / enhancedFeatures.length
  const premiumScore = premiumFeatures.filter(Boolean).length / premiumFeatures.length
  
  if (coreScore >= 0.8 && enhancedScore >= 0.6 && premiumScore >= 0.5) {
    return 'premium'
  } else if (coreScore >= 0.8 && enhancedScore >= 0.4) {
    return 'enhanced'
  } else {
    return 'basic'
  }
}

// Progressive enhancement strategies
const getEnhancementStrategy = (tier: 'basic' | 'enhanced' | 'premium') => {
  const strategies = {
    basic: {
      animations: false,
      complexInteractions: false,
      advancedVisuals: false,
      backgroundEffects: false,
      lazyLoading: true,
      criticalCSS: true,
      serviceWorker: false
    },
    enhanced: {
      animations: true,
      complexInteractions: true,
      advancedVisuals: false,
      backgroundEffects: true,
      lazyLoading: true,
      criticalCSS: true,
      serviceWorker: true
    },
    premium: {
      animations: true,
      complexInteractions: true,
      advancedVisuals: true,
      backgroundEffects: true,
      lazyLoading: true,
      criticalCSS: true,
      serviceWorker: true
    }
  }
  
  return strategies[tier]
}

export function ProgressiveEnhancement({ children, isEnhanced }: Props) {
  const [capabilities, setCapabilities] = useState<CapabilityMatrix | null>(null)
  const [enhancementTier, setEnhancementTier] = useState<'basic' | 'enhanced' | 'premium'>('basic')
  const [isLoading, setIsLoading] = useState(true)
  const enhancementRef = useRef<HTMLDivElement>(null)

  // Initialize progressive enhancement
  useEffect(() => {
    const initializeEnhancement = async () => {
      try {
        // Detect capabilities
        const detectedCapabilities = detectCapabilities()
        setCapabilities(detectedCapabilities)
        
        // Calculate enhancement tier
        const tier = calculateEnhancementTier(detectedCapabilities)
        setEnhancementTier(tier)
        
        // Apply enhancement classes to document
        document.documentElement.setAttribute('data-enhancement-tier', tier)
        document.documentElement.setAttribute('data-capabilities', 
          Object.entries(detectedCapabilities)
            .filter(([_, supported]) => supported)
            .map(([feature]) => feature)
            .join(',')
        )
        
        // Load tier-specific resources
        await loadTierResources(tier, detectedCapabilities)
        
        setIsLoading(false)
      } catch (error) {
        console.warn('Progressive enhancement initialization failed:', error)
        setEnhancementTier('basic')
        setIsLoading(false)
      }
    }

    initializeEnhancement()
  }, [])

  // Load resources based on enhancement tier
  const loadTierResources = async (tier: 'basic' | 'enhanced' | 'premium', capabilities: CapabilityMatrix) => {
    const strategy = getEnhancementStrategy(tier)
    
    // Service Worker registration for enhanced/premium tiers
    if (strategy.serviceWorker && capabilities.serviceWorker) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/nightly/synthesis-c/'
        })
        console.log('Service Worker registered:', registration)
      } catch (error) {
        console.warn('Service Worker registration failed:', error)
      }
    }
    
    // Preload critical resources based on tier
    if (tier === 'premium' && capabilities.webGL2) {
      // Preload advanced graphics resources
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = '/advanced-shaders.wasm'
      link.as = 'fetch'
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    }
    
    // Enable advanced CSS features
    if (capabilities.cssViewTransitions) {
      document.documentElement.style.setProperty('view-transition-name', 'root')
    }
    
    // Apply containment optimizations
    if (capabilities.cssContainment && enhancementRef.current) {
      enhancementRef.current.style.contain = 'layout style paint'
    }
  }

  // Adaptive resource loading based on network conditions
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      
      const handleConnectionChange = () => {
        const effectiveType = connection.effectiveType
        const saveData = connection.saveData
        
        // Adjust enhancement tier based on network conditions
        if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
          document.documentElement.setAttribute('data-network-tier', 'low')
          // Disable heavy features
          document.documentElement.classList.add('reduce-enhancements')
        } else if (effectiveType === '3g') {
          document.documentElement.setAttribute('data-network-tier', 'medium')
        } else {
          document.documentElement.setAttribute('data-network-tier', 'high')
          document.documentElement.classList.remove('reduce-enhancements')
        }
      }
      
      connection.addEventListener('change', handleConnectionChange)
      handleConnectionChange() // Initial check
      
      return () => connection.removeEventListener('change', handleConnectionChange)
    }
  }, [])

  // Performance monitoring and adaptive adjustments
  useEffect(() => {
    if (!capabilities?.performanceObserver) return

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      
      entries.forEach((entry) => {
        // Detect performance issues and downgrade enhancement tier
        if (entry.entryType === 'longtask' && entry.duration > 100) {
          console.warn('Long task detected, considering enhancement downgrade')
          
          // Temporarily reduce enhancements
          document.documentElement.classList.add('performance-degraded')
          
          // Remove degradation flag after recovery period
          setTimeout(() => {
            document.documentElement.classList.remove('performance-degraded')
          }, 10000)
        }
        
        // Monitor layout shifts and disable problematic features
        if (entry.entryType === 'layout-shift' && entry.value > 0.1) {
          document.documentElement.classList.add('layout-unstable')
          setTimeout(() => {
            document.documentElement.classList.remove('layout-unstable')
          }, 5000)
        }
      })
    })

    try {
      observer.observe({ entryTypes: ['longtask', 'layout-shift', 'largest-contentful-paint'] })
    } catch (error) {
      console.warn('Performance monitoring not fully supported')
    }

    return () => observer.disconnect()
  }, [capabilities?.performanceObserver])

  // Battery API integration for power-aware enhancements
  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updatePowerState = () => {
          const level = battery.level
          const charging = battery.charging
          
          if (!charging && level < 0.2) {
            // Low battery: reduce enhancements
            document.documentElement.classList.add('low-power-mode')
            console.log('Low power mode activated')
          } else {
            document.documentElement.classList.remove('low-power-mode')
          }
        }
        
        battery.addEventListener('levelchange', updatePowerState)
        battery.addEventListener('chargingchange', updatePowerState)
        updatePowerState()
      }).catch(() => {
        // Battery API not supported
      })
    }
  }, [])

  if (isLoading) {
    return (
      <div className="synthesis-loading min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Optimizing experience...</p>
        </motion.div>
      </div>
    )
  }

  const strategy = getEnhancementStrategy(enhancementTier)

  return (
    <div
      ref={enhancementRef}
      className={`progressive-enhancement progressive-enhancement--${enhancementTier}`}
      data-enhancement-tier={enhancementTier}
      data-animations={strategy.animations}
      data-complex-interactions={strategy.complexInteractions}
      data-advanced-visuals={strategy.advancedVisuals}
      data-background-effects={strategy.backgroundEffects}
    >
      {/* Enhancement indicator for development */}
      {process.env.NODE_ENV === 'development' && capabilities && (
        <div className="fixed bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm border border-slate-600/50 rounded-lg p-3 text-xs font-mono z-[90]">
          <div className="mb-2">
            <span className="text-slate-400">Enhancement Tier: </span>
            <span className={`font-bold ${
              enhancementTier === 'premium' ? 'text-green-400' :
              enhancementTier === 'enhanced' ? 'text-yellow-400' :
              'text-slate-400'
            }`}>
              {enhancementTier.toUpperCase()}
            </span>
          </div>
          <div className="text-slate-500 text-xs">
            {Object.entries(capabilities).filter(([_, supported]) => supported).length} features supported
          </div>
          
          {/* Feature matrix (expandable) */}
          <details className="mt-2">
            <summary className="cursor-pointer text-slate-400 hover:text-slate-300">
              View capabilities
            </summary>
            <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
              {Object.entries(capabilities).map(([feature, supported]) => (
                <div key={feature} className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs">{feature}:</span>
                  <span className={supported ? 'text-green-400' : 'text-red-400'}>
                    {supported ? '✓' : '✗'}
                  </span>
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
      
      {children}
    </div>
  )
}

// CSS classes are dynamically applied based on enhancement tier
// These can be used in your CSS to provide different experiences:
//
// .progressive-enhancement--basic { /* Basic styles */ }
// .progressive-enhancement--enhanced { /* Enhanced styles */ }
// .progressive-enhancement--premium { /* Premium styles */ }
//
// [data-animations="false"] .some-animation { animation: none !important; }
// [data-background-effects="false"] .bg-effect { display: none; }
// .reduce-enhancements .expensive-feature { display: none; }
// .performance-degraded .heavy-animation { animation-duration: 0.1s; }
// .low-power-mode .power-intensive { display: none; }