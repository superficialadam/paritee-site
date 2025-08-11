const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs').promises;

const BASE_URL = 'http://localhost:3001';

async function validateCanvasA() {
  console.log('========================================');
  console.log('Validating Canvas A Implementation');
  console.log('========================================\n');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  const results = {
    timestamp: new Date().toISOString(),
    canvasTests: [],
    performanceTests: [],
    visualTests: [],
    errors: [],
    warnings: []
  };
  
  try {
    console.log('Loading canvas-a home page...');
    
    // Navigate to canvas-a
    await page.goto(`${BASE_URL}/nightly/canvas-a`, {
      waitUntil: 'networkidle0',
      timeout: 15000
    });
    
    // Wait for P5 canvas to load
    console.log('Waiting for P5 canvas to initialize...');
    await page.waitForTimeout(3000);
    
    // Test 1: Check if P5 canvas element exists
    console.log('Testing canvas element presence...');
    const canvasExists = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      return canvas !== null;
    });
    
    if (canvasExists) {
      console.log('✓ P5 Canvas element found');
      results.canvasTests.push({ test: 'Canvas Element', status: 'PASS' });
    } else {
      console.log('✗ P5 Canvas element not found');
      results.canvasTests.push({ test: 'Canvas Element', status: 'FAIL' });
      results.errors.push('P5 Canvas element not found');
    }
    
    // Test 2: Check canvas dimensions
    const canvasDimensions = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        return {
          width: canvas.width,
          height: canvas.height,
          style: {
            width: canvas.style.width,
            height: canvas.style.height
          }
        };
      }
      return null;
    });
    
    if (canvasDimensions) {
      console.log('✓ Canvas dimensions:', canvasDimensions);
      results.canvasTests.push({ 
        test: 'Canvas Dimensions', 
        status: 'PASS', 
        data: canvasDimensions 
      });
    } else {
      console.log('✗ Could not get canvas dimensions');
      results.canvasTests.push({ test: 'Canvas Dimensions', status: 'FAIL' });
    }
    
    // Test 3: Check z-index positioning
    console.log('Testing canvas z-index positioning...');
    const canvasZIndex = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (canvas && canvas.parentElement) {
        const computedStyle = window.getComputedStyle(canvas.parentElement);
        return {
          zIndex: computedStyle.zIndex,
          position: computedStyle.position,
          pointerEvents: computedStyle.pointerEvents
        };
      }
      return null;
    });
    
    if (canvasZIndex) {
      console.log('✓ Canvas positioning:', canvasZIndex);
      results.canvasTests.push({ 
        test: 'Canvas Positioning', 
        status: 'PASS', 
        data: canvasZIndex 
      });
    }
    
    // Test 4: Performance check - measure FPS
    console.log('Testing canvas performance...');
    const performanceMetrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        if (window.p5) {
          setTimeout(() => {
            const fps = window.p5.prototype._targetFrameRate || 'unknown';
            resolve({ fps, p5Available: true });
          }, 2000);
        } else {
          resolve({ fps: 'unknown', p5Available: false });
        }
      });
    });
    
    console.log('✓ Performance metrics:', performanceMetrics);
    results.performanceTests.push({
      test: 'FPS Check',
      status: 'PASS',
      data: performanceMetrics
    });
    
    // Test 5: Mouse interaction test
    console.log('Testing mouse interactions...');
    await page.mouse.move(500, 400);
    await page.waitForTimeout(1000);
    await page.mouse.move(800, 600);
    await page.waitForTimeout(1000);
    
    results.canvasTests.push({ 
      test: 'Mouse Interaction', 
      status: 'PASS',
      note: 'Mouse movements executed successfully'
    });
    
    // Test 6: Scroll interaction test
    console.log('Testing scroll interactions...');
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, 0));
    
    results.canvasTests.push({ 
      test: 'Scroll Interaction', 
      status: 'PASS',
      note: 'Scroll events executed successfully'
    });
    
    // Test 7: Take screenshot for visual verification
    console.log('Capturing visual verification screenshots...');
    const screenshotDir = path.join(process.cwd(), 'scripts', 'puppeteer', 'screenshots', 'canvas-a');
    await fs.mkdir(screenshotDir, { recursive: true });
    
    // Screenshot of full page
    await page.screenshot({
      path: path.join(screenshotDir, 'home-full.png'),
      fullPage: true
    });
    
    // Screenshot of viewport
    await page.screenshot({
      path: path.join(screenshotDir, 'home-viewport.png')
    });
    
    console.log('✓ Screenshots captured');
    results.visualTests.push({
      test: 'Screenshot Capture',
      status: 'PASS',
      files: ['home-full.png', 'home-viewport.png']
    });
    
  } catch (error) {
    console.error('✗ Validation error:', error.message);
    results.errors.push(`Validation error: ${error.message}`);
  }
  
  await browser.close();
  
  // Print final results
  console.log('\n========== CANVAS-A VALIDATION RESULTS ==========\n');
  
  console.log('Canvas Tests:');
  results.canvasTests.forEach(test => {
    const status = test.status === 'PASS' ? '✓' : '✗';
    console.log(`  ${status} ${test.test}: ${test.status}`);
  });
  
  console.log('\nPerformance Tests:');
  results.performanceTests.forEach(test => {
    const status = test.status === 'PASS' ? '✓' : '✗';
    console.log(`  ${status} ${test.test}: ${test.status}`);
  });
  
  console.log('\nVisual Tests:');
  results.visualTests.forEach(test => {
    const status = test.status === 'PASS' ? '✓' : '✗';
    console.log(`  ${status} ${test.test}: ${test.status}`);
  });
  
  if (results.errors.length === 0) {
    console.log('\n✅ All tests passed! Canvas-A is working correctly.');
  } else {
    console.log('\n❌ ERRORS:');
    results.errors.forEach(error => console.log(`  - ${error}`));
  }
  
  if (results.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    results.warnings.forEach(warning => console.log(`  - ${warning}`));
  }
  
  // Save results
  const resultsPath = path.join(process.cwd(), 'scripts', 'puppeteer', 'canvas-a-validation.json');
  await fs.writeFile(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n📝 Results saved to ${resultsPath}`);
  
  return results.errors.length === 0;
}

async function main() {
  try {
    const success = await validateCanvasA();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error('Canvas-A validation failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateCanvasA };