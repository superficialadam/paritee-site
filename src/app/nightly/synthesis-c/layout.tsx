'use client'

import { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { PerformanceMonitor } from './components/PerformanceMonitor'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ProgressiveEnhancement } from './components/ProgressiveEnhancement'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import './styles/synthesis.css'

// Dynamic imports for optimal code splitting
const P5AdvancedCanvas = dynamic(() => import('./components/P5AdvancedCanvas'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
})

const ServiceWorkerManager = dynamic(() => import('./components/ServiceWorkerManager'), {
  ssr: false
})

// Web Vitals monitoring
function useWebVitals() {
  const [vitals, setVitals] = useState({
    FCP: 0,
    LCP: 0,
    FID: 0,
    CLS: 0,
    TTFB: 0
  })

  useEffect(() => {
    // Dynamic import for web-vitals
    import('web-vitals').then(({ onFCP, onLCP, onFID, onCLS, onTTFB }) => {
      onFCP((metric) => setVitals(prev => ({ ...prev, FCP: metric.value })))
      onLCP((metric) => setVitals(prev => ({ ...prev, LCP: metric.value })))
      onFID((metric) => setVitals(prev => ({ ...prev, FID: metric.value })))
      onCLS((metric) => setVitals(prev => ({ ...prev, CLS: metric.value })))
      onTTFB((metric) => setVitals(prev => ({ ...prev, TTFB: metric.value })))
    }).catch(() => {
      // Graceful degradation if web-vitals is not available
      console.log('Web Vitals monitoring not available')
    })
  }, [])

  return vitals
}

export default function SynthesisCLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const vitals = useWebVitals()
  
  const [isEnhanced, setIsEnhanced] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  // Progressive enhancement detection
  useEffect(() => {
    // Check for modern browser features
    const hasModernFeatures = 
      'IntersectionObserver' in window &&
      'ResizeObserver' in window &&
      'MutationObserver' in window &&
      CSS.supports('backdrop-filter', 'blur(10px)') &&
      CSS.supports('contain', 'layout style paint')

    setIsEnhanced(hasModernFeatures)

    // Reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleMotionChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleMotionChange)

    // Online/offline detection
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    setIsOnline(navigator.onLine)

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Advanced layout structure with technical optimizations
  return (
    <ErrorBoundary>
      <div className="synthesis-layout min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Skip to content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 focus:shadow-lg transition-all duration-300"
        >
          Skip to main content
        </a>

        {/* Progressive Canvas Layer */}
        <Suspense fallback={null}>
          {isEnhanced && !prefersReducedMotion && (
            <P5AdvancedCanvas />
          )}
        </Suspense>

        {/* Main Application Structure */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Header with performance optimizations */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: prefersReducedMotion ? 0.01 : 0.4, 
              ease: "easeOut",
              staggerChildren: 0.1
            }}
            className="synthesis-header"
          >
            <Header />
          </motion.header>

          {/* Main Content Area */}
          <main 
            id="main-content" 
            className="synthesis-main flex-grow focus:outline-none"
            tabIndex={-1}
            role="main"
            aria-label="Main content"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={pathname}
                initial={prefersReducedMotion ? false : { 
                  opacity: 0, 
                  y: 20,
                  filter: "blur(4px)",
                  scale: 0.98
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1
                }}
                exit={prefersReducedMotion ? false : { 
                  opacity: 0, 
                  y: -10,
                  filter: "blur(2px)",
                  scale: 1.02
                }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.5,
                  ease: [0.22, 1, 0.36, 1], // Advanced cubic bezier
                  staggerChildren: prefersReducedMotion ? 0 : 0.05,
                }}
                className="synthesis-page-content"
              >
                <ProgressiveEnhancement isEnhanced={isEnhanced}>
                  {children}
                </ProgressiveEnhancement>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Footer with enhanced animations */}
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: prefersReducedMotion ? 0.01 : 0.4, 
              ease: "easeOut",
              delay: prefersReducedMotion ? 0 : 0.2
            }}
            className="synthesis-footer"
          >
            <Footer />
          </motion.footer>
        </div>

        {/* Advanced Technical Features */}
        <Suspense fallback={null}>
          <ServiceWorkerManager />
        </Suspense>

        {/* Performance Monitoring (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <PerformanceMonitor vitals={vitals} isOnline={isOnline} />
        )}

        {/* Offline Indicator */}
        <AnimatePresence>
          {!isOnline && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              className="fixed top-0 left-0 right-0 bg-amber-600 text-white py-2 px-4 text-center text-sm font-medium z-[90]"
              role="alert"
              aria-live="polite"
            >
              You're currently offline. Some features may be limited.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Focus Management */}
        <div 
          className="fixed inset-0 pointer-events-none z-[95] opacity-0 focus-within:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-sm" />
        </div>
      </div>
    </ErrorBoundary>
  )
}