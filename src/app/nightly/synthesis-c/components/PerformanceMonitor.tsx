'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WebVitals {
  FCP: number
  LCP: number
  FID: number
  CLS: number
  TTFB: number
}

interface PerformanceData {
  fps: number
  memoryUsage: number
  renderTime: number
  bundleSize: number
  cacheHitRate: number
  networkLatency: number
  jsHeapSize: number
  domNodes: number
  resourcesLoaded: number
  totalResources: number
}

interface Props {
  vitals: WebVitals
  isOnline: boolean
}

// Performance thresholds based on Web Vitals recommendations
const PERFORMANCE_THRESHOLDS = {
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  FID: { good: 100, needsImprovement: 300 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  TTFB: { good: 800, needsImprovement: 1800 },
  FPS: { good: 55, needsImprovement: 30 },
  Memory: { good: 50, needsImprovement: 100 }, // MB
}

// Get performance status based on thresholds
const getPerformanceStatus = (metric: string, value: number) => {
  const threshold = PERFORMANCE_THRESHOLDS[metric as keyof typeof PERFORMANCE_THRESHOLDS]
  if (!threshold) return 'unknown'
  
  if (value <= threshold.good) return 'good'
  if (value <= threshold.needsImprovement) return 'needs-improvement'
  return 'poor'
}

// Format metric values for display
const formatMetric = (metric: string, value: number) => {
  switch (metric) {
    case 'FCP':
    case 'LCP':
    case 'TTFB':
      return `${Math.round(value)}ms`
    case 'FID':
      return `${Math.round(value)}ms`
    case 'CLS':
      return value.toFixed(3)
    case 'FPS':
      return `${Math.round(value)}fps`
    case 'Memory':
      return `${Math.round(value)}MB`
    default:
      return Math.round(value).toString()
  }
}

export function PerformanceMonitor({ vitals, isOnline }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
    bundleSize: 0,
    cacheHitRate: 0,
    networkLatency: 0,
    jsHeapSize: 0,
    domNodes: 0,
    resourcesLoaded: 0,
    totalResources: 0
  })
  
  const [alerts, setAlerts] = useState<Array<{
    id: string
    type: 'warning' | 'error' | 'info'
    message: string
    timestamp: number
  }>>([])

  const frameTimeRef = useRef<number[]>([])
  const lastFrameRef = useRef(0)
  const performanceObserverRef = useRef<PerformanceObserver | null>(null)
  const alertIdRef = useRef(0)

  // Add performance alert
  const addAlert = useCallback((type: 'warning' | 'error' | 'info', message: string) => {
    const alert = {
      id: `alert-${++alertIdRef.current}`,
      type,
      message,
      timestamp: Date.now()
    }
    
    setAlerts(prev => [alert, ...prev.slice(0, 4)]) // Keep only 5 most recent
    
    // Auto-remove alert after delay
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== alert.id))
    }, type === 'error' ? 10000 : 5000)
  }, [])

  // Monitor FPS
  useEffect(() => {
    let animationFrame: number

    const measureFPS = () => {
      const now = performance.now()
      const delta = now - lastFrameRef.current
      
      frameTimeRef.current.push(delta)
      if (frameTimeRef.current.length > 60) {
        frameTimeRef.current.shift()
      }
      
      // Calculate average FPS
      const avgFrameTime = frameTimeRef.current.reduce((a, b) => a + b, 0) / frameTimeRef.current.length
      const fps = 1000 / avgFrameTime
      
      setPerformanceData(prev => ({
        ...prev,
        fps,
        renderTime: avgFrameTime
      }))
      
      // Check for performance issues
      if (fps < 30 && frameTimeRef.current.length > 30) {
        addAlert('warning', `Low FPS detected: ${Math.round(fps)}fps`)
      }
      
      lastFrameRef.current = now
      animationFrame = requestAnimationFrame(measureFPS)
    }

    animationFrame = requestAnimationFrame(measureFPS)
    return () => cancelAnimationFrame(animationFrame)
  }, [addAlert])

  // Monitor memory usage
  useEffect(() => {
    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        const heapSizeMB = memory.usedJSHeapSize / 1024 / 1024
        
        setPerformanceData(prev => ({
          ...prev,
          memoryUsage: heapSizeMB,
          jsHeapSize: memory.usedJSHeapSize
        }))
        
        // Memory leak detection
        if (heapSizeMB > 100) {
          addAlert('warning', `High memory usage: ${Math.round(heapSizeMB)}MB`)
        }
        
        if (heapSizeMB > 200) {
          addAlert('error', `Critical memory usage: ${Math.round(heapSizeMB)}MB`)
        }
      }
      
      // DOM nodes count
      const domNodes = document.querySelectorAll('*').length
      setPerformanceData(prev => ({
        ...prev,
        domNodes
      }))
      
      if (domNodes > 3000) {
        addAlert('warning', `High DOM complexity: ${domNodes} nodes`)
      }
    }

    const interval = setInterval(measureMemory, 5000)
    measureMemory() // Initial measurement
    return () => clearInterval(interval)
  }, [addAlert])

  // Performance Observer for advanced metrics
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        
        entries.forEach((entry) => {
          // Long task detection
          if (entry.entryType === 'longtask' && entry.duration > 50) {
            addAlert('warning', `Long task detected: ${Math.round(entry.duration)}ms`)
          }
          
          // Layout shift detection
          if (entry.entryType === 'layout-shift' && entry.value > 0.1) {
            addAlert('warning', `Layout shift detected: ${entry.value.toFixed(3)}`)
          }
          
          // Resource loading issues
          if (entry.entryType === 'resource' && entry.duration > 3000) {
            addAlert('warning', `Slow resource: ${entry.name.split('/').pop()}`)
          }
        })
      })
      
      try {
        observer.observe({ entryTypes: ['longtask', 'layout-shift', 'resource', 'navigation'] })
        performanceObserverRef.current = observer
      } catch (e) {
        console.warn('Some performance metrics not available')
      }
    }

    return () => {
      if (performanceObserverRef.current) {
        performanceObserverRef.current.disconnect()
      }
    }
  }, [addAlert])

  // Network monitoring
  useEffect(() => {
    const measureNetworkLatency = async () => {
      if (!isOnline) return
      
      try {
        const start = performance.now()
        await fetch('/favicon.ico', { method: 'HEAD', cache: 'no-cache' })
        const latency = performance.now() - start
        
        setPerformanceData(prev => ({
          ...prev,
          networkLatency: latency
        }))
        
        if (latency > 1000) {
          addAlert('warning', `High network latency: ${Math.round(latency)}ms`)
        }
      } catch (error) {
        addAlert('error', 'Network connectivity issue detected')
      }
    }

    const interval = setInterval(measureNetworkLatency, 30000)
    measureNetworkLatency() // Initial measurement
    return () => clearInterval(interval)
  }, [isOnline, addAlert])

  // Bundle size analysis
  useEffect(() => {
    if ('getEntriesByType' in performance) {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
      const jsResources = resources.filter(r => r.name.endsWith('.js'))
      const totalSize = jsResources.reduce((sum, r) => sum + (r.transferSize || 0), 0)
      
      setPerformanceData(prev => ({
        ...prev,
        bundleSize: totalSize / 1024, // KB
        resourcesLoaded: resources.length,
        totalResources: resources.length
      }))
      
      // Large bundle detection
      if (totalSize > 1024 * 1024) { // > 1MB
        addAlert('info', `Large bundle size: ${Math.round(totalSize / 1024)}KB`)
      }
    }
  }, [addAlert])

  // Overall performance score calculation
  const calculatePerformanceScore = () => {
    const scores = {
      FCP: getPerformanceStatus('FCP', vitals.FCP) === 'good' ? 100 : getPerformanceStatus('FCP', vitals.FCP) === 'needs-improvement' ? 50 : 0,
      LCP: getPerformanceStatus('LCP', vitals.LCP) === 'good' ? 100 : getPerformanceStatus('LCP', vitals.LCP) === 'needs-improvement' ? 50 : 0,
      FID: getPerformanceStatus('FID', vitals.FID) === 'good' ? 100 : getPerformanceStatus('FID', vitals.FID) === 'needs-improvement' ? 50 : 0,
      CLS: getPerformanceStatus('CLS', vitals.CLS) === 'good' ? 100 : getPerformanceStatus('CLS', vitals.CLS) === 'needs-improvement' ? 50 : 0,
      FPS: getPerformanceStatus('FPS', performanceData.fps) === 'good' ? 100 : getPerformanceStatus('FPS', performanceData.fps) === 'needs-improvement' ? 50 : 0
    }
    
    return Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length)
  }

  const performanceScore = calculatePerformanceScore()
  const scoreColor = performanceScore >= 80 ? 'text-green-400' : performanceScore >= 60 ? 'text-yellow-400' : 'text-red-400'

  return (
    <motion.div 
      className="fixed top-4 right-4 z-[100] font-mono text-xs"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Performance Alerts */}
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className={`mb-2 p-2 rounded border backdrop-blur-sm ${
              alert.type === 'error' ? 'bg-red-900/80 border-red-600 text-red-200' :
              alert.type === 'warning' ? 'bg-yellow-900/80 border-yellow-600 text-yellow-200' :
              'bg-blue-900/80 border-blue-600 text-blue-200'
            }`}
          >
            <div className="flex items-center gap-1">
              <span className={`w-1 h-1 rounded-full flex-shrink-0 ${
                alert.type === 'error' ? 'bg-red-400' :
                alert.type === 'warning' ? 'bg-yellow-400' :
                'bg-blue-400'
              }`} />
              <span className="text-xs">{alert.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Performance Monitor */}
      <motion.div 
        className="bg-slate-900/90 backdrop-blur-sm border border-slate-600/50 rounded-lg overflow-hidden shadow-xl"
        layout
      >
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-3 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} flex-shrink-0`} />
            <span className="text-slate-200 font-semibold">Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`${scoreColor} font-bold`}>{performanceScore}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="w-4 h-4 text-slate-400"
            >
              ▼
            </motion.div>
          </div>
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-slate-700/50"
            >
              <div className="p-3 space-y-3">
                {/* Web Vitals */}
                <div>
                  <h4 className="text-slate-300 font-semibold mb-2">Core Web Vitals</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(vitals).map(([key, value]) => {
                      const status = getPerformanceStatus(key, value)
                      const statusColor = status === 'good' ? 'text-green-400' : status === 'needs-improvement' ? 'text-yellow-400' : 'text-red-400'
                      
                      return (
                        <div key={key} className="flex justify-between">
                          <span className="text-slate-400">{key}:</span>
                          <span className={statusColor}>{formatMetric(key, value)}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Runtime Performance */}
                <div>
                  <h4 className="text-slate-300 font-semibold mb-2">Runtime</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">FPS:</span>
                      <span className={getPerformanceStatus('FPS', performanceData.fps) === 'good' ? 'text-green-400' : 'text-yellow-400'}>
                        {formatMetric('FPS', performanceData.fps)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Memory:</span>
                      <span className={getPerformanceStatus('Memory', performanceData.memoryUsage) === 'good' ? 'text-green-400' : 'text-yellow-400'}>
                        {formatMetric('Memory', performanceData.memoryUsage)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">DOM:</span>
                      <span className="text-slate-300">{performanceData.domNodes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Latency:</span>
                      <span className="text-slate-300">{Math.round(performanceData.networkLatency)}ms</span>
                    </div>
                  </div>
                </div>

                {/* Debug Actions */}
                <div className="pt-2 border-t border-slate-700/30">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        // Force garbage collection if available
                        if ('gc' in window) {
                          (window as any).gc()
                          addAlert('info', 'Garbage collection triggered')
                        }
                      }}
                      className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 transition-colors"
                    >
                      GC
                    </button>
                    <button
                      onClick={() => {
                        // Clear performance entries
                        if ('clearMeasures' in performance) {
                          performance.clearMeasures()
                          performance.clearMarks()
                          addAlert('info', 'Performance entries cleared')
                        }
                      }}
                      className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => {
                        // Export performance data
                        const data = {
                          vitals,
                          performanceData,
                          timestamp: Date.now(),
                          userAgent: navigator.userAgent,
                          url: window.location.href
                        }
                        
                        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = `performance-${Date.now()}.json`
                        a.click()
                        URL.revokeObjectURL(url)
                      }}
                      className="px-2 py-1 bg-blue-700 hover:bg-blue-600 rounded text-blue-200 transition-colors"
                    >
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}