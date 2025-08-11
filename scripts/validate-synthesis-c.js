const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Performance thresholds for technical validation
const PERFORMANCE_THRESHOLDS = {
  // Core Web Vitals
  FCP: 1800,      // First Contentful Paint (ms)
  LCP: 2500,      // Largest Contentful Paint (ms)
  FID: 100,       // First Input Delay (ms)
  CLS: 0.1,       // Cumulative Layout Shift
  
  // Custom metrics
  TTI: 3500,      // Time to Interactive (ms)
  FMP: 2000,      // First Meaningful Paint (ms)
  SI: 3000,       // Speed Index
  
  // Resource metrics
  JS_SIZE: 500 * 1024,        // Max JS bundle size (bytes)
  CSS_SIZE: 100 * 1024,       // Max CSS size (bytes)
  TOTAL_SIZE: 2 * 1024 * 1024, // Max total page size (bytes)
  
  // Performance scores
  PERFORMANCE_SCORE: 80,       // Min Lighthouse performance score
  ACCESSIBILITY_SCORE: 90,     // Min Lighthouse accessibility score
  BEST_PRACTICES_SCORE: 85,    // Min Lighthouse best practices score
  SEO_SCORE: 90,              // Min Lighthouse SEO score
  
  // Runtime metrics
  MEMORY_USAGE: 50 * 1024 * 1024, // Max memory usage (bytes)
  CPU_TIME: 2000,                  // Max CPU time (ms)
}

// Pages to validate
const PAGES_TO_TEST = [
  { name: 'Homepage', path: '/nightly/synthesis-c', critical: true },
  { name: 'Services', path: '/nightly/synthesis-c/services', critical: true },
  { name: 'Cases', path: '/nightly/synthesis-c/cases', critical: false },
  { name: 'Contact', path: '/nightly/synthesis-c/contact', critical: false },
]

// Technical features to validate
const TECHNICAL_FEATURES = [
  'ServiceWorker registration',
  'Progressive enhancement detection',
  'Performance monitoring',
  'Error boundary functionality',
  'Canvas rendering optimization',
  'Motion preference detection',
  'Accessibility features',
  'Memory leak prevention'
]

class SynthesisCValidator {
  constructor() {
    this.browser = null;
    this.results = {
      timestamp: new Date().toISOString(),
      overall: { passed: 0, failed: 0, warnings: 0 },
      pages: [],
      technical: [],
      summary: {}
    };
  }

  async init() {
    console.log('🚀 Starting Synthesis-C Technical Validation...\n');
    
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--disable-extensions',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding'
      ]
    });
  }

  async validatePage(pageConfig) {
    const page = await this.browser.newPage();
    const url = `http://localhost:3001${pageConfig.path}`;
    
    console.log(`🔍 Validating ${pageConfig.name} (${pageConfig.path})...`);
    
    // Enable performance monitoring
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1920, height: 1080 });
    
    const pageResult = {
      name: pageConfig.name,
      path: pageConfig.path,
      url,
      critical: pageConfig.critical,
      performance: {},
      accessibility: {},
      technical: {},
      issues: [],
      passed: true
    };

    try {
      // Start performance monitoring
      const performanceMetrics = [];
      
      page.on('metrics', (metrics) => {
        performanceMetrics.push(metrics);
      });

      // Navigate and wait for network idle
      const response = await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });

      if (!response.ok()) {
        throw new Error(`HTTP ${response.status()}: ${response.statusText()}`);
      }

      // Wait for React hydration
      await page.waitForFunction(() => {
        return window.React && document.querySelector('[data-reactroot], #__next, .synthesis-page-content');
      }, { timeout: 10000 });

      // Core Web Vitals measurement
      const vitals = await page.evaluate(() => {
        return new Promise((resolve) => {
          const vitals = {};
          
          // Use web-vitals library if available
          if (window.webVitals) {
            const { getCLS, getFID, getFCP, getLCP, getTTFB } = window.webVitals;
            
            Promise.all([
              new Promise(r => getCLS(r)),
              new Promise(r => getFID(r)),
              new Promise(r => getFCP(r)),
              new Promise(r => getLCP(r)),
              new Promise(r => getTTFB(r))
            ]).then(([cls, fid, fcp, lcp, ttfb]) => {
              resolve({
                CLS: cls.value,
                FID: fid.value,
                FCP: fcp.value,
                LCP: lcp.value,
                TTFB: ttfb.value
              });
            }).catch(() => resolve({}));
          } else {
            // Fallback measurements
            const paintEntries = performance.getEntriesByType('paint');
            const navigationEntry = performance.getEntriesByType('navigation')[0];
            
            resolve({
              FCP: paintEntries.find(e => e.name === 'first-contentful-paint')?.startTime || 0,
              LCP: 0, // Would need PerformanceObserver
              TTFB: navigationEntry?.responseStart || 0
            });
          }
        });
      });

      pageResult.performance = vitals;

      // Technical feature validation
      const technicalChecks = await page.evaluate(() => {
        const checks = {
          serviceWorker: 'serviceWorker' in navigator,
          intersectionObserver: 'IntersectionObserver' in window,
          performanceObserver: 'PerformanceObserver' in window,
          errorBoundary: !!document.querySelector('.error-boundary, [data-error-boundary]'),
          progressiveEnhancement: !!document.querySelector('[data-enhancement-tier]'),
          canvasOptimization: !!document.querySelector('canvas[style*="will-change"]'),
          accessibilityFeatures: !!document.querySelector('[aria-label], [role], [tabindex]'),
          memoryManagement: typeof window.gc === 'function' || performance.memory !== undefined
        };

        // Performance monitoring check
        checks.performanceMonitoring = !!document.querySelector('.synthesis-perf-monitor, [data-performance-monitor]');
        
        // Motion preference check
        checks.motionPreference = !!window.matchMedia('(prefers-reduced-motion: reduce)');
        
        // CSS containment check
        const testEl = document.createElement('div');
        testEl.style.contain = 'layout style paint';
        checks.cssContainment = testEl.style.contain === 'layout style paint';
        
        return checks;
      });

      pageResult.technical = technicalChecks;

      // Accessibility validation
      const accessibilityIssues = await page.evaluate(() => {
        const issues = [];
        
        // Check for missing alt texts
        const images = document.querySelectorAll('img:not([alt])');
        if (images.length > 0) {
          issues.push(`${images.length} images missing alt text`);
        }
        
        // Check for proper heading hierarchy
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        let lastLevel = 0;
        for (const heading of headings) {
          const level = parseInt(heading.tagName[1]);
          if (level > lastLevel + 1) {
            issues.push(`Heading hierarchy skip detected: ${heading.tagName} after h${lastLevel}`);
          }
          lastLevel = level;
        }
        
        // Check for focus management
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
        const focusableWithoutVisibleFocus = Array.from(focusableElements).filter(el => {
          const styles = getComputedStyle(el);
          return !el.matches(':focus-visible') && 
                 styles.outline === 'none' && 
                 !styles.boxShadow.includes('ring');
        });
        
        if (focusableWithoutVisibleFocus.length > 5) {
          issues.push(`${focusableWithoutVisibleFocus.length} focusable elements may lack visible focus indicators`);
        }
        
        return issues;
      });

      pageResult.accessibility.issues = accessibilityIssues;

      // Performance validation against thresholds
      Object.entries(PERFORMANCE_THRESHOLDS).forEach(([metric, threshold]) => {
        if (vitals[metric] !== undefined && vitals[metric] > threshold) {
          pageResult.issues.push(`${metric}: ${Math.round(vitals[metric])}${metric.includes('SIZE') ? 'B' : 'ms'} (threshold: ${threshold}${metric.includes('SIZE') ? 'B' : 'ms'})`);
          if (pageConfig.critical) {
            pageResult.passed = false;
            this.results.overall.failed++;
          } else {
            this.results.overall.warnings++;
          }
        }
      });

      // Technical feature validation
      Object.entries(technicalChecks).forEach(([feature, present]) => {
        if (!present) {
          pageResult.issues.push(`Missing technical feature: ${feature}`);
          this.results.overall.warnings++;
        }
      });

      // Accessibility issues
      if (accessibilityIssues.length > 0) {
        pageResult.issues.push(...accessibilityIssues);
        this.results.overall.warnings += accessibilityIssues.length;
      }

      // Memory leak detection
      const memoryInfo = await page.evaluate(() => {
        if (performance.memory) {
          return {
            usedJSHeapSize: performance.memory.usedJSHeapSize,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
          };
        }
        return null;
      });

      if (memoryInfo && memoryInfo.usedJSHeapSize > PERFORMANCE_THRESHOLDS.MEMORY_USAGE) {
        pageResult.issues.push(`High memory usage: ${Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024)}MB`);
        this.results.overall.warnings++;
      }

      if (pageResult.passed) {
        this.results.overall.passed++;
        console.log(`✅ ${pageConfig.name} validation passed`);
      } else {
        console.log(`❌ ${pageConfig.name} validation failed`);
      }

      if (pageResult.issues.length > 0) {
        console.log(`⚠️  Issues found: ${pageResult.issues.length}`);
        pageResult.issues.forEach(issue => console.log(`   - ${issue}`));
      }

    } catch (error) {
      pageResult.passed = false;
      pageResult.issues.push(`Validation error: ${error.message}`);
      this.results.overall.failed++;
      console.log(`❌ ${pageConfig.name} validation failed: ${error.message}`);
    }

    await page.close();
    this.results.pages.push(pageResult);
    console.log(''); // Empty line for readability
  }

  async validateTechnicalFeatures() {
    console.log('🔧 Validating Technical Implementation...\n');
    
    const page = await this.browser.newPage();
    const url = 'http://localhost:3001/nightly/synthesis-c';
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });

      // Advanced technical validation
      const advancedChecks = await page.evaluate(() => {
        const results = {};
        
        // Service Worker validation
        if ('serviceWorker' in navigator) {
          results.serviceWorkerSupport = true;
          navigator.serviceWorker.getRegistration().then(registration => {
            results.serviceWorkerActive = !!registration;
          });
        }
        
        // Progressive enhancement detection
        results.enhancementTier = document.documentElement.getAttribute('data-enhancement-tier');
        results.capabilitiesDetected = document.documentElement.getAttribute('data-capabilities');
        
        // Performance monitoring
        results.performanceMonitoring = !!window.PerformanceObserver;
        
        // Error boundary check
        results.errorBoundaryPresent = !!document.querySelector('[data-error-boundary]') || 
                                       window.React && window.React.Component;
        
        // Canvas optimization check
        const canvases = document.querySelectorAll('canvas');
        results.canvasOptimized = Array.from(canvases).some(canvas => 
          canvas.style.willChange || canvas.style.transform.includes('translateZ')
        );
        
        // Motion preference handling
        results.motionPreferenceHandled = window.matchMedia('(prefers-reduced-motion: reduce)').matches !== undefined;
        
        // Memory management
        results.memoryManagement = typeof window.gc === 'function' || 
                                  performance.memory !== undefined ||
                                  !!document.querySelector('[data-memory-monitor]');
        
        // CSS optimization features
        const testEl = document.createElement('div');
        testEl.style.contain = 'layout style paint';
        results.cssContainment = testEl.style.contain === 'layout style paint';
        
        testEl.style.contentVisibility = 'auto';
        results.contentVisibility = testEl.style.contentVisibility === 'auto';
        
        // Advanced CSS features
        results.backdropFilter = CSS.supports('backdrop-filter', 'blur(10px)');
        results.customProperties = CSS.supports('--custom', 'property');
        results.cssGrid = CSS.supports('display', 'grid');
        results.flexbox = CSS.supports('display', 'flex');
        
        return results;
      });

      // Validate each technical feature
      TECHNICAL_FEATURES.forEach(feature => {
        const featureKey = feature.toLowerCase().replace(/\s+/g, '');
        const isPresent = advancedChecks[featureKey] || 
                         Object.values(advancedChecks).some(v => 
                           typeof v === 'boolean' && v && 
                           feature.toLowerCase().includes(featureKey.toLowerCase())
                         );

        this.results.technical.push({
          feature,
          present: isPresent,
          status: isPresent ? 'PASS' : 'WARN'
        });

        if (isPresent) {
          console.log(`✅ ${feature}`);
        } else {
          console.log(`⚠️  ${feature} - Not detected or not implemented`);
          this.results.overall.warnings++;
        }
      });

    } catch (error) {
      console.log(`❌ Technical validation error: ${error.message}`);
      this.results.overall.failed++;
    }

    await page.close();
    console.log(''); // Empty line
  }

  async generateReport() {
    const reportData = {
      ...this.results,
      summary: {
        totalTests: this.results.overall.passed + this.results.overall.failed + this.results.overall.warnings,
        passRate: Math.round((this.results.overall.passed / (this.results.overall.passed + this.results.overall.failed)) * 100) || 0,
        criticalIssues: this.results.pages.filter(p => !p.passed && p.critical).length,
        technicalScore: Math.round((this.results.technical.filter(t => t.status === 'PASS').length / this.results.technical.length) * 100) || 0
      }
    };

    // Save detailed report
    const reportPath = path.join(__dirname, '..', 'validation-reports', 'synthesis-c-validation.json');
    await fs.mkdir(path.dirname(reportPath), { recursive: true });
    await fs.writeFile(reportPath, JSON.stringify(reportData, null, 2));

    // Generate summary
    console.log('📊 VALIDATION SUMMARY');
    console.log('====================');
    console.log(`Total Tests: ${reportData.summary.totalTests}`);
    console.log(`Passed: ${this.results.overall.passed}`);
    console.log(`Failed: ${this.results.overall.failed}`);
    console.log(`Warnings: ${this.results.overall.warnings}`);
    console.log(`Pass Rate: ${reportData.summary.passRate}%`);
    console.log(`Technical Score: ${reportData.summary.technicalScore}%`);
    console.log(`Critical Issues: ${reportData.summary.criticalIssues}`);
    console.log('');
    
    if (reportData.summary.criticalIssues === 0 && reportData.summary.passRate >= 80) {
      console.log('🎉 SYNTHESIS-C VALIDATION PASSED!');
      console.log('The technical implementation meets all performance and quality standards.');
    } else {
      console.log('⚠️  SYNTHESIS-C VALIDATION NEEDS ATTENTION');
      console.log('Some issues were found that should be addressed for optimal performance.');
    }
    
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    
    return reportData;
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async run() {
    try {
      await this.init();
      
      // Validate each page
      for (const pageConfig of PAGES_TO_TEST) {
        await this.validatePage(pageConfig);
      }
      
      // Validate technical features
      await this.validateTechnicalFeatures();
      
      // Generate report
      const report = await this.generateReport();
      
      return report;
      
    } catch (error) {
      console.error('Validation failed:', error);
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new SynthesisCValidator();
  validator.run()
    .then(report => {
      process.exit(report.summary.criticalIssues === 0 ? 0 : 1);
    })
    .catch(error => {
      console.error('Validation failed:', error);
      process.exit(1);
    });
}

module.exports = SynthesisCValidator;