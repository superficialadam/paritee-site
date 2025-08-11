/**
 * Motion-C: Performance-First Interactive Animation System
 * Optimized for 60fps across all devices
 */

class MotionPerformance {
  constructor() {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.observers = new Set();
    this.rafId = null;
    this.scrollThrottle = null;
    this.resizeThrottle = null;
    this.isTouch = 'ontouchstart' in window;
    
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
    // Initialize performance monitoring
    this.initPerformanceMonitoring();
    
    // Setup scroll-triggered animations with throttling
    this.initScrollAnimations();
    
    // Setup intersection observer for fade-in effects
    this.initIntersectionObserver();
    
    // Setup performance optimizations
    this.initPerformanceOptimizations();
    
    // Setup reduced motion handling
    this.initReducedMotionHandling();
    
    // Setup cleanup on page unload
    this.initCleanup();
  }

  initPerformanceMonitoring() {
    if (this.isReducedMotion) return;
    
    // Performance monitoring for development
    if (window.location.search.includes('debug')) {
      this.createPerformanceMonitor();
    }
  }

  createPerformanceMonitor() {
    const monitor = document.createElement('div');
    monitor.className = 'motion-performance-monitor';
    monitor.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 8px 12px;
      font-size: 12px;
      border-radius: 4px;
      z-index: 9999;
      pointer-events: none;
      font-family: monospace;
    `;
    
    let frames = 0;
    let lastTime = performance.now();
    
    const updateFPS = () => {
      frames++;
      const now = performance.now();
      
      if (now - lastTime >= 1000) {
        const fps = Math.round(frames * 1000 / (now - lastTime));
        monitor.textContent = `FPS: ${fps}`;
        
        // Change color based on performance
        if (fps >= 50) {
          monitor.style.backgroundColor = 'rgba(0,128,0,0.8)';
        } else if (fps >= 30) {
          monitor.style.backgroundColor = 'rgba(255,165,0,0.8)';
        } else {
          monitor.style.backgroundColor = 'rgba(255,0,0,0.8)';
        }
        
        frames = 0;
        lastTime = now;
      }
      
      requestAnimationFrame(updateFPS);
    };
    
    document.body.appendChild(monitor);
    updateFPS();
  }

  initScrollAnimations() {
    if (this.isReducedMotion) return;
    
    // Throttled scroll handler for performance
    const handleScroll = this.throttle(() => {
      this.updateScrollAnimations();
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true });
    this.scrollThrottle = handleScroll;
    
    // Initial call
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
    
    // Optimized intersection observer for fade-in animations
    const observerOptions = {
      threshold: [0.1],
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Stop observing once animated
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with fade-in animation
    const fadeElements = document.querySelectorAll('.motion-fade-in-up, .motion-stagger-item');
    fadeElements.forEach(el => {
      observer.observe(el);
    });

    this.observers.add(observer);
  }

  initPerformanceOptimizations() {
    // Preload critical animations
    this.preloadCriticalAnimations();
    
    // Setup will-change management
    this.initWillChangeManagement();
    
    // Optimize touch interactions
    if (this.isTouch) {
      this.optimizeTouchInteractions();
    }
  }

  preloadCriticalAnimations() {
    // Force browser to prepare animations by triggering them briefly
    const criticalElements = document.querySelectorAll('.motion-card, .motion-button');
    
    criticalElements.forEach(el => {
      el.classList.add('motion-preload');
      
      // Remove preload class after a frame to allow animations
      requestAnimationFrame(() => {
        el.classList.remove('motion-preload');
      });
    });
  }

  initWillChangeManagement() {
    // Efficiently manage will-change property
    const hoverElements = document.querySelectorAll('.motion-card, .motion-button, .motion-nav-item');
    
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (!this.isTouch) {
          el.style.willChange = 'transform';
        }
      }, { passive: true });
      
      el.addEventListener('mouseleave', () => {
        if (!this.isTouch) {
          // Delay removing will-change to account for transition duration
          setTimeout(() => {
            el.style.willChange = 'auto';
          }, 250);
        }
      }, { passive: true });
    });
  }

  optimizeTouchInteractions() {
    // Optimize touch interactions for mobile
    const touchElements = document.querySelectorAll('.motion-card, .motion-button');
    
    touchElements.forEach(el => {
      // Use touchstart for immediate feedback
      el.addEventListener('touchstart', () => {
        el.style.willChange = 'transform';
        el.classList.add('touch-active');
      }, { passive: true });
      
      el.addEventListener('touchend', () => {
        // Small delay for visual feedback
        setTimeout(() => {
          el.style.willChange = 'auto';
          el.classList.remove('touch-active');
        }, 150);
      }, { passive: true });
    });
  }

  initReducedMotionHandling() {
    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addListener((e) => {
      this.isReducedMotion = e.matches;
      
      if (this.isReducedMotion) {
        this.disableAnimations();
      } else {
        this.enableAnimations();
      }
    });
  }

  disableAnimations() {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    
    // Add reduced motion class
    document.body.classList.add('motion-reduced');
  }

  enableAnimations() {
    document.documentElement.style.removeProperty('--animation-duration');
    document.documentElement.style.removeProperty('--transition-duration');
    
    // Remove reduced motion class
    document.body.classList.remove('motion-reduced');
  }

  initCleanup() {
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
    
    // Clean up on visibility change (mobile optimization)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAnimations();
      } else {
        this.resumeAnimations();
      }
    });
  }

  pauseAnimations() {
    // Pause animations when page is hidden (battery optimization)
    document.body.classList.add('motion-paused');
  }

  resumeAnimations() {
    // Resume animations when page becomes visible
    document.body.classList.remove('motion-paused');
  }

  cleanup() {
    // Cancel any pending animation frames
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    
    // Clear throttled functions
    if (this.scrollThrottle) {
      window.removeEventListener('scroll', this.scrollThrottle);
    }
    
    if (this.resizeThrottle) {
      window.removeEventListener('resize', this.resizeThrottle);
    }
    
    // Disconnect observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    
    // Reset will-change properties
    const elements = document.querySelectorAll('[style*="will-change"]');
    elements.forEach(el => {
      el.style.willChange = 'auto';
    });
  }

  // Utility: Throttle function for performance
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

  // Utility: Debounce function for performance
  debounce(func, delay) {
    let timeoutId;
    return function() {
      const args = arguments;
      const context = this;
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
  }

  // Public API: Add scroll-triggered animation
  addScrollAnimation(element, options = {}) {
    if (this.isReducedMotion) return;
    
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px',
      once: true
    };
    
    const config = { ...defaultOptions, ...options };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          element.classList.add('in-view');
          
          if (config.once) {
            observer.unobserve(element);
          }
        } else if (!config.once) {
          element.classList.remove('in-view');
        }
      });
    }, config);
    
    observer.observe(element);
    this.observers.add(observer);
    
    return observer;
  }

  // Public API: Force animation completion for testing
  completeAnimations() {
    const animatedElements = document.querySelectorAll('.motion-stagger-item, .motion-fade-in-up');
    animatedElements.forEach(el => {
      el.classList.add('in-view');
    });
  }
}

// Initialize when DOM is ready
if (typeof window !== 'undefined') {
  window.motionPerformance = new MotionPerformance();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MotionPerformance;
}