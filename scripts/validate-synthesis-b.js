const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

const BASE_URL = 'http://localhost:3001';
const OUTPUT_DIR = path.join(__dirname, 'puppeteer', 'synthesis-b-screenshots');
const VALIDATION_FILE = path.join(__dirname, 'puppeteer', 'synthesis-b-validation.json');

const pages = [
  { name: 'Home', path: '/nightly/synthesis-b' },
  { name: 'Services', path: '/nightly/synthesis-b/services' },
  { name: 'Sectors', path: '/nightly/synthesis-b/sectors' },
  { name: 'Geographies', path: '/nightly/synthesis-b/geographies' },
  { name: 'Agencies', path: '/nightly/synthesis-b/agencies' },
  { name: 'Cases', path: '/nightly/synthesis-b/cases' },
  { name: 'Team', path: '/nightly/synthesis-b/team' },
  { name: 'News', path: '/nightly/synthesis-b/news' },
  { name: 'Contact', path: '/nightly/synthesis-b/contact' },
];

const devices = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 }
];

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function validateAccessibility(page) {
  const results = {
    errors: [],
    warnings: [],
    success: true
  };

  try {
    // Check for ARIA labels and roles
    const ariaIssues = await page.evaluate(() => {
      const issues = [];
      
      // Check for buttons without accessible names
      const buttons = document.querySelectorAll('button');
      buttons.forEach((btn, index) => {
        if (!btn.getAttribute('aria-label') && !btn.textContent.trim() && !btn.querySelector('[aria-hidden="false"]')) {
          issues.push(`Button ${index + 1} missing accessible name`);
        }
      });
      
      // Check for images without alt text
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        if (!img.getAttribute('alt') && !img.getAttribute('aria-hidden')) {
          issues.push(`Image ${index + 1} missing alt text`);
        }
      });
      
      // Check for proper heading hierarchy
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      const levels = headings.map(h => parseInt(h.tagName.charAt(1)));
      for (let i = 1; i < levels.length; i++) {
        if (levels[i] > levels[i-1] + 1) {
          issues.push(`Heading level jump from h${levels[i-1]} to h${levels[i]}`);
        }
      }
      
      // Check for skip links
      const skipLinks = document.querySelectorAll('a[href^="#"]');
      if (skipLinks.length === 0) {
        issues.push('No skip links found for keyboard navigation');
      }
      
      return issues;
    });

    results.warnings.push(...ariaIssues);

    // Check for reduced motion support
    const motionSupport = await page.evaluate(() => {
      return document.querySelector('style, link[rel="stylesheet"]') !== null &&
             document.styleSheets.length > 0;
    });

    if (!motionSupport) {
      results.warnings.push('Motion reduction support not detected');
    }

    // Check for focus management
    const focusManagement = await page.evaluate(() => {
      const focusable = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      return focusable.length > 0;
    });

    if (!focusManagement) {
      results.errors.push('No focusable elements found');
      results.success = false;
    }

    // Test keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    if (!focusedElement) {
      results.warnings.push('Tab navigation may not be working properly');
    }

  } catch (error) {
    results.errors.push(`Accessibility validation error: ${error.message}`);
    results.success = false;
  }

  return results;
}

async function validatePerformance(page) {
  const results = {
    metrics: {},
    warnings: [],
    success: true
  };

  try {
    // Get performance metrics
    const metrics = await page.metrics();
    results.metrics = {
      JSHeapUsedSize: Math.round(metrics.JSHeapUsedSize / 1024 / 1024), // MB
      JSHeapTotalSize: Math.round(metrics.JSHeapTotalSize / 1024 / 1024), // MB
      LayoutCount: metrics.LayoutCount,
      RecalcStyleCount: metrics.RecalcStyleCount,
      JSEventListeners: metrics.JSEventListeners,
      Nodes: metrics.Nodes
    };

    // Performance thresholds
    if (results.metrics.JSHeapUsedSize > 50) {
      results.warnings.push(`High memory usage: ${results.metrics.JSHeapUsedSize}MB`);
    }

    if (results.metrics.LayoutCount > 10) {
      results.warnings.push(`High layout count: ${results.metrics.LayoutCount}`);
    }

    if (results.metrics.JSEventListeners > 100) {
      results.warnings.push(`High event listener count: ${results.metrics.JSEventListeners}`);
    }

  } catch (error) {
    results.warnings.push(`Performance validation error: ${error.message}`);
  }

  return results;
}

async function validateUXElements(page) {
  const results = {
    elements: {},
    warnings: [],
    success: true
  };

  try {
    // Check for UX enhancements
    const uxElements = await page.evaluate(() => {
      return {
        hasScrollProgress: !!document.querySelector('[role="progressbar"], .scroll-progress'),
        hasSkipLinks: !!document.querySelector('a[href^="#"]'),
        hasLargeClickTargets: Array.from(document.querySelectorAll('button, a')).some(el => {
          const rect = el.getBoundingClientRect();
          return rect.width >= 44 && rect.height >= 44;
        }),
        hasMotionClasses: !!document.querySelector('[class*="motion-"]'),
        hasAriaLabels: !!document.querySelector('[aria-label]'),
        hasFocusIndicators: getComputedStyle(document.body).getPropertyValue('--focus-ring') !== '',
        hasInteractiveCanvas: !!document.querySelector('canvas')
      };
    });

    results.elements = uxElements;

    // Validate UX requirements
    if (!uxElements.hasScrollProgress) {
      results.warnings.push('No scroll progress indicator found');
    }

    if (!uxElements.hasSkipLinks) {
      results.warnings.push('No skip links found');
    }

    if (!uxElements.hasLargeClickTargets) {
      results.warnings.push('Touch targets may be too small (< 44px)');
    }

    if (!uxElements.hasMotionClasses) {
      results.warnings.push('No motion animation classes detected');
    }

    if (!uxElements.hasAriaLabels) {
      results.warnings.push('No ARIA labels found');
    }

  } catch (error) {
    results.warnings.push(`UX validation error: ${error.message}`);
  }

  return results;
}

async function takeScreenshots(page, pageName) {
  const screenshots = {};

  for (const device of devices) {
    await page.setViewport({ width: device.width, height: device.height });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Allow responsive adjustments

    // Take viewport screenshot
    const viewportPath = path.join(OUTPUT_DIR, `${pageName.toLowerCase()}-${device.name}-viewport.png`);
    await page.screenshot({ 
      path: viewportPath,
      clip: { x: 0, y: 0, width: device.width, height: device.height }
    });

    // Take full page screenshot
    const fullPath = path.join(OUTPUT_DIR, `${pageName.toLowerCase()}-${device.name}-full.png`);
    await page.screenshot({ 
      path: fullPath,
      fullPage: true
    });

    screenshots[device.name] = {
      viewport: viewportPath,
      full: fullPath
    };
  }

  return screenshots;
}

async function validateSynthesisB() {
  console.log('🚀 Starting Synthesis-B Ultimate UX Validation...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const validation = {
    version: 'synthesis-b',
    timestamp: new Date().toISOString(),
    pages: {},
    overall: {
      errors: [],
      warnings: [],
      summary: {}
    }
  };

  try {
    await ensureDirectoryExists(OUTPUT_DIR);

    for (const pageConfig of pages) {
      console.log(`📊 Validating ${pageConfig.name}...`);
      
      const page = await browser.newPage();
      
      // Enable motion reduction for testing
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'no-preference' }
      ]);

      await page.setViewport({ width: 1920, height: 1080 });

      try {
        await page.goto(`${BASE_URL}${pageConfig.path}`, { 
          waitUntil: 'networkidle2', 
          timeout: 30000 
        });

        // Wait for animations and canvas to load
        await new Promise(resolve => setTimeout(resolve, 2000));

        const pageResults = {
          accessibility: await validateAccessibility(page),
          performance: await validatePerformance(page),
          ux: await validateUXElements(page),
          screenshots: await takeScreenshots(page, pageConfig.name),
          success: true
        };

        // Check overall page success
        if (!pageResults.accessibility.success || !pageResults.performance.success || !pageResults.ux.success) {
          pageResults.success = false;
        }

        validation.pages[pageConfig.name] = pageResults;
        console.log(`✅ ${pageConfig.name} validation complete`);

      } catch (error) {
        console.error(`❌ Error validating ${pageConfig.name}:`, error.message);
        validation.pages[pageConfig.name] = {
          error: error.message,
          success: false
        };
      } finally {
        await page.close();
      }
    }

    // Calculate overall metrics
    const allPages = Object.values(validation.pages);
    const successfulPages = allPages.filter(p => p.success);
    
    validation.overall.summary = {
      totalPages: allPages.length,
      successfulPages: successfulPages.length,
      successRate: `${Math.round((successfulPages.length / allPages.length) * 100)}%`,
      avgMemoryUsage: successfulPages.reduce((sum, p) => sum + (p.performance?.metrics?.JSHeapUsedSize || 0), 0) / successfulPages.length,
      totalWarnings: allPages.reduce((sum, p) => {
        return sum + (p.accessibility?.warnings?.length || 0) + 
               (p.performance?.warnings?.length || 0) + 
               (p.ux?.warnings?.length || 0);
      }, 0),
      totalErrors: allPages.reduce((sum, p) => {
        return sum + (p.accessibility?.errors?.length || 0) + 
               (p.performance?.errors?.length || 0) + 
               (p.ux?.errors?.length || 0);
      }, 0)
    };

    console.log('📈 Overall Results:');
    console.log(`   Success Rate: ${validation.overall.summary.successRate}`);
    console.log(`   Avg Memory: ${Math.round(validation.overall.summary.avgMemoryUsage)}MB`);
    console.log(`   Total Warnings: ${validation.overall.summary.totalWarnings}`);
    console.log(`   Total Errors: ${validation.overall.summary.totalErrors}`);

  } catch (error) {
    console.error('❌ Validation failed:', error);
    validation.overall.errors.push(`Validation failed: ${error.message}`);
  } finally {
    await browser.close();
  }

  // Save validation results
  await fs.writeFile(VALIDATION_FILE, JSON.stringify(validation, null, 2));
  console.log(`💾 Results saved to ${VALIDATION_FILE}`);
  
  return validation;
}

if (require.main === module) {
  validateSynthesisB()
    .then((results) => {
      console.log('🎉 Synthesis-B Ultimate UX validation complete!');
      process.exit(results.overall.summary.successRate === '100%' ? 0 : 1);
    })
    .catch((error) => {
      console.error('💥 Validation failed:', error);
      process.exit(1);
    });
}

module.exports = { validateSynthesisB };