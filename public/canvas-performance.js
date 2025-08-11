/**
 * Canvas-C: Interactive P5.js Canvas Performance System
 * Extends Motion-C with canvas-aware performance optimizations
 * Optimized for 60fps across all devices with intelligent canvas management
 */

class CanvasPerformance {
  constructor() {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.observers = new Set();
    this.rafId = null;
    this.scrollThrottle = null;
    this.resizeThrottle = null;
    this.isTouch = 'ontouchstart' in window;
    this.canvasPerformanceMetrics = {
      fps: 60,
      frameTime: 16.67,
      isPerformant: true,
      adaptiveLevel: 'high'
    };
    
    // Canvas-specific properties
    this.canvasVisible = true;
    this.batteryAPI = null;
    this.networkInfo = null;
    this.devicePixelRatio = window.devicePixelRatio || 1;
    
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Initialize base performance monitoring
    this.initPerformanceMonitoring();
    
    // Setup canvas-specific performance monitoring
    this.initCanvasPerformanceMonitoring();
    
    // Setup scroll-triggered animations with throttling
    this.initScrollAnimations();
    
    // Setup intersection observer for fade-in effects
    this.initIntersectionObserver();
    
    // Setup canvas-aware performance optimizations
    this.initCanvasPerformanceOptimizations();
    
    // Setup reduced motion handling
    this.initReducedMotionHandling();
    
    // Setup battery and network monitoring
    this.initBatteryNetworkMonitoring();
    
    // Setup section detection for canvas
    this.initSectionDetection();
    
    // Setup cleanup on page unload
    this.initCleanup();
  }

  initCanvasPerformanceMonitoring() {
    if (this.isReducedMotion) return;
    
    // Enhanced performance monitoring for canvas
    if (window.location.search.includes('debug') || process?.env?.NODE_ENV === 'development') {
      this.createCanvasPerformanceMonitor();
    }
    
    // Setup canvas performance observers
    this.setupCanvasPerformanceObservers();
  }

  createCanvasPerformanceMonitor() {
    const monitor = document.createElement('div');
    monitor.className = 'canvas-performance-monitor';
    monitor.id = 'canvas-perf-monitor';
    
    let frames = 0;
    let lastTime = performance.now();
    let canvasFrames = 0;
    let canvasLastTime = lastTime;
    
    const updateMetrics = () => {
      frames++;
      const now = performance.now();
      
      if (now - lastTime >= 1000) {
        const fps = Math.round(frames * 1000 / (now - lastTime));
        const canvasFPS = Math.round(canvasFrames * 1000 / (now - canvasLastTime));
        const frameTime = (now - lastTime) / frames;
        
        this.canvasPerformanceMetrics = {
          fps: fps,
          canvasFPS: canvasFPS,
          frameTime: frameTime,
          isPerformant: fps > 30 && canvasFPS > 20,
          adaptiveLevel: this.getAdaptiveLevel(fps, canvasFPS)
        };
        
        // Update monitor display
        monitor.innerHTML = `
          <div class="perf-line">System: <span class="${fps >= 50 ? 'perf-good' : fps >= 30 ? 'perf-warning' : 'perf-poor'}">${fps} FPS</span></div>
          <div class="perf-line">Canvas: <span class="${canvasFPS >= 30 ? 'perf-good' : canvasFPS >= 20 ? 'perf-warning' : 'perf-poor'}">${canvasFPS} FPS</span></div>
          <div class="perf-line">Frame: ${frameTime.toFixed(2)}ms</div>
          <div class="perf-line">Level: ${this.canvasPerformanceMetrics.adaptiveLevel}</div>
          <div class="perf-line">Battery: ${this.getBatteryStatus()}</div>
          <div class="perf-line">Network: ${this.getNetworkStatus()}</div>
        `;
        
        frames = 0;
        canvasFrames = 0;
        lastTime = now;
        canvasLastTime = now;
        
        // Dispatch performance update event
        window.dispatchEvent(new CustomEvent('canvasPerformanceUpdate', {
          detail: this.canvasPerformanceMetrics
        }));
      }
      
      requestAnimationFrame(updateMetrics);
    };
    
    // Listen for canvas frame updates
    window.addEventListener('canvasFrameRendered', () => {
      canvasFrames++;
    });
    
    document.body.appendChild(monitor);
    updateMetrics();
  }

  getAdaptiveLevel(systemFPS, canvasFPS) {
    if (systemFPS >= 50 && canvasFPS >= 40) return 'high';
    if (systemFPS >= 40 && canvasFPS >= 25) return 'medium';
    if (systemFPS >= 25 && canvasFPS >= 15) return 'low';
    return 'critical';
  }

  getBatteryStatus() {
    if (this.batteryAPI) {
      const level = Math.round(this.batteryAPI.level * 100);
      const charging = this.batteryAPI.charging;
      return `${level}%${charging ? ' ⚡' : ''}`;
    }
    return 'N/A';
  }

  getNetworkStatus() {
    if (this.networkInfo) {
      return `${this.networkInfo.effectiveType || 'unknown'}`;
    }
    return 'N/A';
  }

  setupCanvasPerformanceObservers() {
    // Monitor canvas performance and adapt accordingly
    window.addEventListener('canvasPerformanceUpdate', (event) => {
      const metrics = event.detail;
      
      // Adjust canvas complexity based on performance
      if (metrics.fps < 25) {
        this.reduceCanvasComplexity();
      } else if (metrics.fps > 45 && this.canvasPerformanceMetrics.adaptiveLevel !== 'high') {
        this.increaseCanvasComplexity();
      }
    });
  }

  reduceCanvasComplexity() {
    window.dispatchEvent(new CustomEvent('canvasAdaptPerformance', {
      detail: { action: 'reduce', level: 'low' }
    }));
  }

  increaseCanvasComplexity() {
    window.dispatchEvent(new CustomEvent('canvasAdaptPerformance', {
      detail: { action: 'increase', level: 'high' }
    }));
  }

  initCanvasPerformanceOptimizations() {
    // Canvas-specific optimizations
    this.initCanvasVisibilityOptimization();
    this.initCanvasDeviceOptimizations();
    this.initCanvasInteractionOptimizations();
  }

  initCanvasVisibilityOptimization() {
    // Pause canvas when page is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseCanvas();
      } else {
        this.resumeCanvas();
      }
    });
    
    // Pause canvas when scrolled out of view
    const canvasObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.id === 'canvas-container' || entry.target.tagName === 'CANVAS') {
          this.canvasVisible = entry.isIntersecting;
          
          if (!this.canvasVisible) {
            this.pauseCanvas();
          } else {
            this.resumeCanvas();
          }
        }
      });
    }, { threshold: 0.1 });
    
    // Observe canvas elements when they're added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.tagName === 'CANVAS' || (node.id && node.id.includes('canvas'))) {
            canvasObserver.observe(node);
          }
        });
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    this.observers.add(canvasObserver);
  }

  initCanvasDeviceOptimizations() {
    // Optimize based on device capabilities
    const isMobile = window.innerWidth < 768;
    const isHighDPI = this.devicePixelRatio > 1.5;
    const isLowPowerMode = this.batteryAPI?.level < 0.2 && !this.batteryAPI?.charging;
    
    let optimizationLevel = 'high';
    
    if (isMobile && isHighDPI) {
      optimizationLevel = 'medium';
    }
    
    if (isLowPowerMode || (isMobile && this.devicePixelRatio > 2)) {
      optimizationLevel = 'low';
    }
    
    // Dispatch device optimization event
    window.dispatchEvent(new CustomEvent('canvasDeviceOptimization', {
      detail: { 
        level: optimizationLevel,
        isMobile,
        isHighDPI,
        isLowPowerMode,
        devicePixelRatio: this.devicePixelRatio
      }
    }));
  }

  initCanvasInteractionOptimizations() {
    // Optimize canvas interactions based on input type
    if (this.isTouch) {
      // Touch-specific canvas optimizations
      window.dispatchEvent(new CustomEvent('canvasTouchOptimization', {
        detail: { enabled: true, reduceParticles: true }
      }));
    }
    
    // Optimize for mouse vs touch interactions
    window.addEventListener('mousemove', this.throttle(() => {
      window.dispatchEvent(new CustomEvent('canvasMouseActive'));
    }, 16));
    
    window.addEventListener('touchmove', this.throttle(() => {
      window.dispatchEvent(new CustomEvent('canvasTouchActive'));
    }, 16), { passive: true });
  }

  initBatteryNetworkMonitoring() {
    // Battery API monitoring
    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        this.batteryAPI = battery;
        
        // Listen for battery changes
        battery.addEventListener('chargingchange', () => {
          this.adaptToBatteryStatus();
        });
        
        battery.addEventListener('levelchange', () => {
          this.adaptToBatteryStatus();
        });
        
        this.adaptToBatteryStatus();
      });
    }
    
    // Network Information API monitoring
    if ('connection' in navigator) {
      this.networkInfo = navigator.connection;
      
      navigator.connection.addEventListener('change', () => {
        this.adaptToNetworkStatus();
      });
      
      this.adaptToNetworkStatus();
    }
  }

  adaptToBatteryStatus() {
    if (!this.batteryAPI) return;
    
    const isLowBattery = this.batteryAPI.level < 0.2 && !this.batteryAPI.charging;
    
    if (isLowBattery) {
      // Reduce canvas performance for battery saving
      window.dispatchEvent(new CustomEvent('canvasAdaptPerformance', {
        detail: { action: 'battery_save', level: 'minimal' }
      }));
    }
  }

  adaptToNetworkStatus() {
    if (!this.networkInfo) return;
    
    const isSlowConnection = this.networkInfo.effectiveType === 'slow-2g' || 
                           this.networkInfo.effectiveType === '2g';
    
    if (isSlowConnection) {
      // Reduce canvas complexity for slow connections
      window.dispatchEvent(new CustomEvent('canvasAdaptPerformance', {
        detail: { action: 'network_save', level: 'low' }
      }));
    }
  }

  initSectionDetection() {
    // Enhanced section detection for canvas awareness
    const sections = document.querySelectorAll('section[id], main section, div[data-section]');
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          const sectionName = entry.target.id || 
                            entry.target.getAttribute('data-section') || 
                            entry.target.tagName.toLowerCase();
          
          // Dispatch section change event for canvas
          window.dispatchEvent(new CustomEvent('canvasSectionChange', {
            detail: { 
              section: sectionName,
              progress: entry.intersectionRatio,
              isActive: true
            }
          }));
          
          // Update body class for CSS targeting
          document.body.className = document.body.className.replace(/canvas-section-\w+/g, '');
          document.body.classList.add(`canvas-section-${sectionName}`);
        }
      });
    }, { 
      threshold: [0.1, 0.3, 0.5, 0.7],
      rootMargin: '-10% 0px -10% 0px'
    });
    
    sections.forEach(section => sectionObserver.observe(section));
    this.observers.add(sectionObserver);
  }

  pauseCanvas() {
    window.dispatchEvent(new CustomEvent('canvasPause'));
    document.body.classList.add('canvas-paused');
  }

  resumeCanvas() {
    window.dispatchEvent(new CustomEvent('canvasResume'));
    document.body.classList.remove('canvas-paused');
  }

  // Inherit all methods from MotionPerformance
  initPerformanceMonitoring() {
    // Base performance monitoring (simplified from motion-performance.js)
    if (this.isReducedMotion) return;
  }

  initScrollAnimations() {
    if (this.isReducedMotion) return;
    
    const handleScroll = this.throttle(() => {
      this.updateScrollAnimations();
    }, 16);

    window.addEventListener('scroll', handleScroll, { passive: true });
    this.scrollThrottle = handleScroll;
    this.updateScrollAnimations();
  }

  updateScrollAnimations() {
    const scrollY = window.scrollY;
    const header = document.querySelector('.motion-header-sticky');
    
    if (header) {
      if (scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  initIntersectionObserver() {
    if (this.isReducedMotion) return;
    
    const observerOptions = {
      threshold: [0.1],
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.motion-fade-in-up, .motion-stagger-item');
    fadeElements.forEach(el => observer.observe(el));
    this.observers.add(observer);
  }

  initReducedMotionHandling() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addListener((e) => {
      this.isReducedMotion = e.matches;
      
      if (this.isReducedMotion) {
        this.disableAnimations();
        this.disableCanvas();
      } else {
        this.enableAnimations();
        this.enableCanvas();
      }
    });
  }

  disableAnimations() {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    document.body.classList.add('motion-reduced');
  }

  enableAnimations() {
    document.documentElement.style.removeProperty('--animation-duration');
    document.documentElement.style.removeProperty('--transition-duration');
    document.body.classList.remove('motion-reduced');
  }

  disableCanvas() {
    window.dispatchEvent(new CustomEvent('canvasDisable'));
    document.body.classList.add('canvas-disabled');
  }

  enableCanvas() {
    window.dispatchEvent(new CustomEvent('canvasEnable'));
    document.body.classList.remove('canvas-disabled');
  }

  initCleanup() {
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAnimations();
        this.pauseCanvas();
      } else {
        this.resumeAnimations();
        this.resumeCanvas();
      }
    });
  }

  pauseAnimations() {
    document.body.classList.add('motion-paused');
  }

  resumeAnimations() {
    document.body.classList.remove('motion-paused');
  }

  cleanup() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    
    if (this.scrollThrottle) {
      window.removeEventListener('scroll', this.scrollThrottle);
    }
    
    if (this.resizeThrottle) {
      window.removeEventListener('resize', this.resizeThrottle);
    }
    
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    
    const elements = document.querySelectorAll('[style*="will-change"]');
    elements.forEach(el => {
      el.style.willChange = 'auto';
    });
    
    // Clean up canvas-specific resources
    this.pauseCanvas();
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, delay) {
    let timeoutId;
    return function() {
      const args = arguments;
      const context = this;
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
  }

  // Public API for canvas integration
  getCanvasPerformanceMetrics() {
    return this.canvasPerformanceMetrics;
  }

  isCanvasOptimal() {
    return this.canvasPerformanceMetrics.isPerformant && this.canvasVisible;
  }

  getRecommendedCanvasSettings() {
    const { adaptiveLevel } = this.canvasPerformanceMetrics;
    
    const settings = {
      high: { maxParticles: 50, quality: 1, effects: true },
      medium: { maxParticles: 30, quality: 0.8, effects: true },
      low: { maxParticles: 15, quality: 0.6, effects: false },
      critical: { maxParticles: 5, quality: 0.4, effects: false }
    };
    
    return settings[adaptiveLevel] || settings.medium;
  }
}

// Initialize when DOM is ready
if (typeof window !== 'undefined') {
  window.canvasPerformance = new CanvasPerformance();
  
  // Also expose the motion performance API for compatibility
  window.motionPerformance = window.canvasPerformance;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CanvasPerformance;
}