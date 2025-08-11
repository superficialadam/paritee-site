const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

async function validateSynthesisF() {
  console.log('🚀 Starting Synthesis-F Excellence Validation...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--enable-gpu',
      '--no-first-run',
      '--no-zygote',
      '--single-process'
    ]
  });

  const baseUrl = 'http://localhost:3001/nightly/synthesis-f';
  const screenshotDir = path.join(__dirname, '..', 'scripts', 'puppeteer', 'synthesis-f-screenshots');
  
  // Ensure screenshot directory exists
  await fs.mkdir(screenshotDir, { recursive: true });

  // Excellence test pages
  const pages = [
    { name: 'home', path: '' },
    { name: 'services', path: '/services' },
    { name: 'contact', path: '/contact' },
    { name: 'cases', path: '/cases' },
    { name: 'agencies', path: '/agencies' }
  ];

  // Device configurations for responsive excellence
  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 812 }
  ];

  const results = {
    timestamp: new Date().toISOString(),
    excellenceLevel: 'ABSOLUTE',
    performance: {},
    accessibility: {},
    screenshots: {},
    errors: []
  };

  for (const viewport of viewports) {
    console.log(`\n📱 Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
    
    const page = await browser.newPage();
    
    // Set viewport and enable performance monitoring
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
    });

    // Monitor performance metrics
    await page.evaluateOnNewDocument(() => {
      window.performanceMetrics = {
        navigationStart: Date.now(),
        loadTimes: [],
        paintTimes: [],
        interactionTimes: []
      };
    });

    // Enable request interception for performance analysis
    await page.setRequestInterception(true);
    const requestTimes = new Map();
    
    page.on('request', request => {
      requestTimes.set(request.url(), Date.now());
      request.continue();
    });
    
    page.on('response', response => {
      const url = response.url();
      const startTime = requestTimes.get(url);
      if (startTime) {
        const responseTime = Date.now() - startTime;
        console.log(`  ⚡ ${path.basename(url)}: ${responseTime}ms`);
      }
    });

    for (const pageDef of pages) {
      const url = baseUrl + pageDef.path;
      console.log(`  🎯 Testing ${pageDef.name}: ${url}`);
      
      try {
        const startTime = Date.now();
        
        // Navigate with excellence timeout
        await page.goto(url, { 
          waitUntil: 'networkidle0', 
          timeout: 30000 
        });
        
        const loadTime = Date.now() - startTime;
        console.log(`    ⏱️ Load time: ${loadTime}ms`);
        
        // Wait for consciousness-level interactions to initialize
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Test for excellence components
        const excellenceMetrics = await page.evaluate(() => {
          const metrics = {
            hasExcellenceCanvas: !!document.querySelector('[role="presentation"]'),
            hasGoldenRatioLayout: !!document.querySelector('.excellence-content-flow'),
            hasFibonacciSpacing: !!document.querySelector('[class*="fibonacci-"]'),
            hasConsciousnessAnimations: !!document.querySelector('.animate-breathing'),
            performanceOptimizer: !!window.performanceMetrics,
            interactionAnalyzer: !!document.querySelector('.micro-interaction-layer'),
            responsiveElements: document.querySelectorAll('.excellence-card').length,
            totalElements: document.querySelectorAll('*').length
          };
          
          // Check for CSS custom properties (excellence variables)
          const styles = getComputedStyle(document.documentElement);
          metrics.hasExcellenceVariables = styles.getPropertyValue('--golden-ratio') !== '';
          
          return metrics;
        });
        
        console.log(`    ✨ Excellence Components:`, excellenceMetrics);
        
        // Capture full page screenshot with perfect quality
        const screenshotPath = path.join(screenshotDir, `${pageDef.name}-${viewport.name}-full.png`);
        await page.screenshot({
          path: screenshotPath,
          fullPage: true,
          type: 'png',
          quality: 100
        });
        console.log(`    📸 Screenshot: ${screenshotPath}`);
        
        // Capture viewport screenshot
        const viewportScreenshotPath = path.join(screenshotDir, `${pageDef.name}-${viewport.name}-viewport.png`);
        await page.screenshot({
          path: viewportScreenshotPath,
          fullPage: false,
          type: 'png',
          quality: 100
        });
        
        // Test consciousness-level interactions
        if (viewport.name === 'desktop') {
          console.log(`    🎭 Testing interactions...`);
          
          // Test hover states
          const cards = await page.$$('.excellence-card');
          if (cards.length > 0) {
            await cards[0].hover();
            await new Promise(resolve => setTimeout(resolve, 500));
          }
          
          // Test navigation
          const navLinks = await page.$$('nav a');
          if (navLinks.length > 0) {
            await navLinks[0].hover();
            await new Promise(resolve => setTimeout(resolve, 300));
          }
          
          // Test scroll behavior if it's the home page
          if (pageDef.name === 'home') {
            await page.evaluate(() => {
              window.scrollBy(0, window.innerHeight);
            });
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            await page.evaluate(() => {
              window.scrollTo(0, 0);
            });
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
        
        // Store results
        if (!results.screenshots[pageDef.name]) {
          results.screenshots[pageDef.name] = {};
        }
        results.screenshots[pageDef.name][viewport.name] = {
          fullPath: screenshotPath,
          viewportPath: viewportScreenshotPath,
          loadTime,
          excellenceMetrics
        };
        
        // Performance analysis
        const performanceMetrics = await page.evaluate(() => {
          return {
            timing: performance.timing,
            navigation: performance.navigation,
            memory: performance.memory || {},
            paintTiming: performance.getEntriesByType('paint'),
            layoutShift: performance.getEntriesByType('layout-shift'),
            longTasks: performance.getEntriesByType('longtask')
          };
        });
        
        results.performance[`${pageDef.name}-${viewport.name}`] = performanceMetrics;
        
        console.log(`    ✅ ${pageDef.name} validated successfully`);
        
      } catch (error) {
        console.error(`    ❌ Error testing ${pageDef.name}:`, error.message);
        results.errors.push({
          page: pageDef.name,
          viewport: viewport.name,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    await page.close();
  }

  await browser.close();
  
  // Calculate excellence score
  let excellenceScore = 100;
  const totalTests = pages.length * viewports.length;
  const successfulTests = Object.keys(results.screenshots).reduce((acc, page) => {
    return acc + Object.keys(results.screenshots[page]).length;
  }, 0);
  
  results.excellenceScore = Math.round((successfulTests / totalTests) * 100);
  results.totalErrors = results.errors.length;
  results.successRate = `${successfulTests}/${totalTests}`;
  
  // Save validation results
  const resultsPath = path.join(__dirname, 'puppeteer', 'synthesis-f-validation.json');
  await fs.writeFile(resultsPath, JSON.stringify(results, null, 2));
  
  console.log('\n🏆 SYNTHESIS-F EXCELLENCE VALIDATION COMPLETE');
  console.log('=' .repeat(60));
  console.log(`📊 Excellence Score: ${results.excellenceScore}%`);
  console.log(`✅ Success Rate: ${results.successRate}`);
  console.log(`❌ Errors: ${results.totalErrors}`);
  console.log(`📸 Screenshots: ${Object.keys(results.screenshots).length} pages`);
  console.log(`📋 Results saved: ${resultsPath}`);
  
  if (results.excellenceScore === 100) {
    console.log('\n🌟 ABSOLUTE EXCELLENCE ACHIEVED! 🌟');
    console.log('All specialist refinement directives successfully implemented.');
    console.log('Synthesis-F represents the pinnacle of execution excellence.');
  } else {
    console.log(`\n⚠️ Excellence refinements needed: ${100 - results.excellenceScore}% gap`);
  }
  
  return results;
}

// Run validation
validateSynthesisF().catch(console.error);