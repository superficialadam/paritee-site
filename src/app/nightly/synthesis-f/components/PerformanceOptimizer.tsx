'use client'

import { useEffect, useRef, useState } from 'react'

interface PerformanceMetrics {
  fps: number
  frameTime: number
  memoryUsage: number
  cpuUsage: number
  paintTime: number
  layoutTime: number
  renderTime: number
  interactionDelay: number
  scrollJank: number
  batteryLevel?: number
  networkSpeed: number
  devicePixelRatio: number
  isLowEndDevice: boolean
}

interface OptimizationState {
  particleCount: number
  animationQuality: 'high' | 'medium' | 'low' | 'minimal'
  effectsEnabled: boolean
  canvasEnabled: boolean
  motionEnabled: boolean
  adaptiveQuality: boolean
}

export function PerformanceOptimizer() {
  const metricsRef = useRef<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    memoryUsage: 0,
    cpuUsage: 0,
    paintTime: 0,
    layoutTime: 0,
    renderTime: 0,
    interactionDelay: 0,
    scrollJank: 0,
    networkSpeed: 0,
    devicePixelRatio: 1,
    isLowEndDevice: false,
  })

  const optimizationRef = useRef<OptimizationState>({
    particleCount: 144, // Fibonacci excellence
    animationQuality: 'high',
    effectsEnabled: true,
    canvasEnabled: true,
    motionEnabled: true,
    adaptiveQuality: true,
  })

  const [performanceLevel, setPerformanceLevel] = useState<'excellent' | 'good' | 'fair' | 'poor'>('excellent')
  const frameTimesRef = useRef<number[]>([])
  const interactionTimesRef = useRef<number[]>([])
  const observerRef = useRef<PerformanceObserver>()

  // Monitor Core Web Vitals and performance metrics
  useEffect(() => {
    // FPS and frame timing monitoring
    let frameCount = 0
    let lastTime = performance.now()
    
    const measureFrameRate = () => {
      const currentTime = performance.now()
      const deltaTime = currentTime - lastTime
      frameCount++
      
      if (frameCount >= 60) { // Measure every 60 frames
        const fps = 1000 / (deltaTime / frameCount)
        metricsRef.current.fps = fps
        metricsRef.current.frameTime = deltaTime / frameCount
        
        // Track frame times for jank detection
        frameTimesRef.current.push(deltaTime / frameCount)
        if (frameTimesRef.current.length > 300) { // Keep last 5 seconds at 60fps
          frameTimesRef.current.shift()
        }
        
        frameCount = 0
        lastTime = currentTime
        
        // Detect performance degradation
        detectPerformanceDegradation()
      }
      
      requestAnimationFrame(measureFrameRate)
    }
    
    measureFrameRate()
    
    // Performance Observer for detailed metrics
    if ('PerformanceObserver' in window) {
      try {
        observerRef.current = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          
          for (const entry of entries) {
            switch (entry.entryType) {
              case 'paint':
                if (entry.name === 'first-contentful-paint') {
                  metricsRef.current.paintTime = entry.startTime
                }
                break
                
              case 'layout-shift':
                // Monitor layout stability
                break
                
              case 'longtask':
                // Monitor main thread blocking
                metricsRef.current.cpuUsage = Math.min(100, metricsRef.current.cpuUsage + 10)
                break
                
              case 'event':
                // Monitor interaction responsiveness
                if (entry.name === 'click' || entry.name === 'keydown') {
                  const interactionDelay = entry.processingEnd - entry.startTime
                  metricsRef.current.interactionDelay = interactionDelay
                  interactionTimesRef.current.push(interactionDelay)
                  
                  if (interactionTimesRef.current.length > 100) {
                    interactionTimesRef.current.shift()
                  }
                }
                break
            }
          }
        })
        
        // Observe various performance metrics
        observerRef.current.observe({ entryTypes: ['paint', 'layout-shift', 'longtask', 'event'] })
      } catch (e) {
        console.warn('PerformanceObserver not fully supported')
      }
    }
    
    // Memory monitoring
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        metricsRef.current.memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit * 100
      }
    }
    
    const memoryInterval = setInterval(monitorMemory, 5000)
    
    // Network monitoring
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      metricsRef.current.networkSpeed = connection.downlink || 0
      
      const updateConnection = () => {
        metricsRef.current.networkSpeed = connection.downlink || 0
      }
      
      connection.addEventListener('change', updateConnection)
    }
    
    // Battery monitoring
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        metricsRef.current.batteryLevel = battery.level * 100
        
        const updateBattery = () => {
          metricsRef.current.batteryLevel = battery.level * 100
        }
        
        battery.addEventListener('levelchange', updateBattery)
      })
    }
    
    // Device capability detection
    metricsRef.current.devicePixelRatio = window.devicePixelRatio || 1
    metricsRef.current.isLowEndDevice = detectLowEndDevice()
    
    return () => {
      clearInterval(memoryInterval)
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Detect low-end devices
  const detectLowEndDevice = (): boolean => {
    // Check various indicators
    const indicators = [
      navigator.hardwareConcurrency <= 2, // 2 or fewer CPU cores
      navigator.deviceMemory && navigator.deviceMemory <= 2, // 2GB RAM or less
      'connection' in navigator && (navigator as any).connection.saveData, // Data saver mode
      window.devicePixelRatio <= 1, // Low DPI display
      navigator.userAgent.includes('Mobile') && !navigator.userAgent.includes('Tablet'), // Mobile device
    ]
    
    return indicators.filter(Boolean).length >= 2
  }

  // Detect performance degradation and auto-optimize
  const detectPerformanceDegradation = () => {
    const metrics = metricsRef.current
    const optimization = optimizationRef.current
    
    // Calculate performance score
    let score = 100
    
    // FPS penalty
    if (metrics.fps < 60) score -= (60 - metrics.fps) * 2
    if (metrics.fps < 30) score -= 30
    if (metrics.fps < 15) score -= 50
    
    // Frame time penalty
    if (metrics.frameTime > 16.67) score -= (metrics.frameTime - 16.67) * 2
    
    // Memory penalty
    if (metrics.memoryUsage > 70) score -= (metrics.memoryUsage - 70) * 1.5
    
    // CPU penalty
    if (metrics.cpuUsage > 50) score -= metrics.cpuUsage - 50
    
    // Interaction delay penalty
    if (metrics.interactionDelay > 16) score -= (metrics.interactionDelay - 16) * 3
    
    // Jank detection
    const recentFrameTimes = frameTimesRef.current.slice(-60) // Last second
    const jankFrames = recentFrameTimes.filter(time => time > 50).length // Over 50ms = jank
    const jankPercentage = jankFrames / recentFrameTimes.length * 100
    metrics.scrollJank = jankPercentage
    
    if (jankPercentage > 5) score -= jankPercentage * 2
    
    // Determine performance level
    let newPerformanceLevel: typeof performanceLevel
    if (score >= 85) newPerformanceLevel = 'excellent'
    else if (score >= 70) newPerformanceLevel = 'good'
    else if (score >= 50) newPerformanceLevel = 'fair'
    else newPerformanceLevel = 'poor'
    
    // Auto-optimization based on performance
    if (optimization.adaptiveQuality) {
      switch (newPerformanceLevel) {
        case 'excellent':
          optimization.particleCount = 144 // Full Fibonacci excellence
          optimization.animationQuality = 'high'
          optimization.effectsEnabled = true
          optimization.canvasEnabled = true
          optimization.motionEnabled = true
          break
          
        case 'good':
          optimization.particleCount = 89 // Reduced Fibonacci
          optimization.animationQuality = 'high'
          optimization.effectsEnabled = true
          optimization.canvasEnabled = true
          optimization.motionEnabled = true
          break
          
        case 'fair':
          optimization.particleCount = 55 // Further reduced
          optimization.animationQuality = 'medium'
          optimization.effectsEnabled = false
          optimization.canvasEnabled = true
          optimization.motionEnabled = true
          break
          
        case 'poor':
          optimization.particleCount = 21 // Minimal
          optimization.animationQuality = 'low'
          optimization.effectsEnabled = false
          optimization.canvasEnabled = false
          optimization.motionEnabled = false
          break
      }
      
      // Apply optimizations via CSS custom properties
      document.documentElement.style.setProperty(
        '--performance-particle-count', 
        optimization.particleCount.toString()
      )
      
      document.documentElement.style.setProperty(
        '--performance-animation-quality', 
        optimization.animationQuality
      )
      
      document.documentElement.classList.toggle('effects-disabled', !optimization.effectsEnabled)
      document.documentElement.classList.toggle('canvas-disabled', !optimization.canvasEnabled)
      document.documentElement.classList.toggle('motion-disabled', !optimization.motionEnabled)
    }
    
    setPerformanceLevel(newPerformanceLevel)
    
    // Emit performance data for monitoring
    window.dispatchEvent(new CustomEvent('performance-update', {
      detail: { metrics, optimization, performanceLevel: newPerformanceLevel }
    }))
  }

  // Preemptive optimization based on device capabilities
  useEffect(() => {
    const metrics = metricsRef.current
    const optimization = optimizationRef.current
    
    if (metrics.isLowEndDevice) {
      optimization.particleCount = 34 // Conservative Fibonacci
      optimization.animationQuality = 'medium'
      optimization.effectsEnabled = false
      optimization.adaptiveQuality = true
    }
    
    if (metrics.batteryLevel && metrics.batteryLevel < 20) {
      optimization.animationQuality = 'low'
      optimization.effectsEnabled = false
    }
    
    if (metrics.networkSpeed < 1) { // Less than 1Mbps
      optimization.effectsEnabled = false
    }
    
    // Apply initial optimizations
    detectPerformanceDegradation()
  }, [])

  // Thermal throttling detection
  useEffect(() => {
    let thermalState = 'nominal'
    
    // Monitor for thermal throttling indicators
    const checkThermalThrottling = () => {
      const avgFrameTime = frameTimesRef.current.slice(-30).reduce((a, b) => a + b, 0) / 30
      const recentAvgFrameTime = frameTimesRef.current.slice(-10).reduce((a, b) => a + b, 0) / 10
      
      // If recent performance is significantly worse, might be thermal throttling
      if (recentAvgFrameTime > avgFrameTime * 1.5 && metricsRef.current.fps < 30) {
        if (thermalState === 'nominal') {
          thermalState = 'throttling'
          
          // Aggressive optimization for thermal throttling
          optimizationRef.current.particleCount = Math.min(21, optimizationRef.current.particleCount)
          optimizationRef.current.animationQuality = 'minimal'
          optimizationRef.current.effectsEnabled = false
          
          console.warn('Thermal throttling detected - applying aggressive optimizations')
        }
      } else if (thermalState === 'throttling' && metricsRef.current.fps > 45) {
        thermalState = 'nominal'
        console.log('Thermal state normalized - restoring optimizations')
      }
    }
    
    const thermalInterval = setInterval(checkThermalThrottling, 10000) // Check every 10s
    
    return () => clearInterval(thermalInterval)
  }, [])

  // Development performance monitoring (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const logPerformance = () => {
        const metrics = metricsRef.current
        const optimization = optimizationRef.current
        
        console.group('🚀 Synthesis-F Performance Excellence')
        console.log('📊 FPS:', metrics.fps.toFixed(1))
        console.log('⏱️ Frame Time:', metrics.frameTime.toFixed(2) + 'ms')
        console.log('🧠 Memory Usage:', metrics.memoryUsage.toFixed(1) + '%')
        console.log('🎯 Interaction Delay:', metrics.interactionDelay.toFixed(2) + 'ms')
        console.log('📶 Performance Level:', performanceLevel)
        console.log('✨ Particles:', optimization.particleCount)
        console.log('🎨 Quality:', optimization.animationQuality)
        console.groupEnd()
      }
      
      const devInterval = setInterval(logPerformance, 5000)
      
      return () => clearInterval(devInterval)
    }
  }, [performanceLevel])

  return null // This component doesn't render anything visible
}