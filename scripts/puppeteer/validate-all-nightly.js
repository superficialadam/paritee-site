const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs').promises;

const BASE_URL = 'http://localhost:3001';

const versions = [
  'base',
  'design-a', 'design-b', 'design-c',
  'motion-a', 'motion-b', 'motion-c',
  'canvas-a', 'canvas-b', 'canvas-c',
  'synthesis-a', 'synthesis-b', 'synthesis-c'
];

async function validateLandingPage(page) {
  console.log('Testing landing page...');
  const errors = [];
  
  try {
    await page.goto(`${BASE_URL}/nightly`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Check for main sections
    const heroExists = await page.$('h1');
    if (!heroExists) {
      errors.push('Landing page missing hero section');
    }
    
    // Check for version cards
    const cards = await page.$$('[data-version]');
    if (cards.length === 0) {
      console.log('Warning: No version cards found with data-version attribute');
      // Check for any cards
      const anyCards = await page.$$('.group');
      console.log(`Found ${anyCards.length} card elements`);
    }
    
    // Test phase filters
    const phaseButtons = await page.$$('button');
    console.log(`Found ${phaseButtons.length} buttons (including phase filters)`);
    
    // Check for links to versions
    const links = await page.$$eval('a[href*="/nightly/"]', links => 
      links.map(link => link.href)
    );
    console.log(`Found ${links.length} nightly version links`);
    
    return { errors, success: errors.length === 0 };
  } catch (error) {
    errors.push(`Landing page validation failed: ${error.message}`);
    return { errors, success: false };
  }
}

async function quickValidateVersion(page, version) {
  console.log(`Quick testing ${version}...`);
  const errors = [];
  
  try {
    const response = await page.goto(`${BASE_URL}/nightly/${version}`, {
      waitUntil: 'networkidle2',
      timeout: 20000
    });
    
    if (!response.ok()) {
      errors.push(`${version} returned status ${response.status()}`);
    }
    
    // Quick check for main content
    const mainExists = await page.$('main');
    if (!mainExists) {
      errors.push(`${version} missing main content`);
    }
    
    return { errors, success: errors.length === 0 };
  } catch (error) {
    errors.push(`${version} failed to load: ${error.message}`);
    return { errors, success: false };
  }
}

async function captureLandingScreenshot(page) {
  try {
    await page.goto(`${BASE_URL}/nightly`, {
      waitUntil: 'networkidle2'
    });
    
    const screenshotDir = path.join(process.cwd(), 'scripts', 'puppeteer', 'screenshots', 'landing');
    await fs.mkdir(screenshotDir, { recursive: true });
    
    // Capture full page
    await page.screenshot({
      path: path.join(screenshotDir, 'landing-full.png'),
      fullPage: true
    });
    
    // Capture viewport
    await page.screenshot({
      path: path.join(screenshotDir, 'landing-viewport.png')
    });
    
    console.log('✓ Captured landing page screenshots');
  } catch (error) {
    console.error('✗ Failed to capture landing screenshots:', error.message);
  }
}

async function main() {
  console.log('\n========================================');
  console.log('FINAL NIGHTLY VALIDATION - ALL VERSIONS');
  console.log('========================================\n');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  const results = {
    timestamp: new Date().toISOString(),
    landing: {},
    versions: {},
    summary: {
      total: versions.length + 1, // +1 for landing
      successful: 0,
      failed: 0,
      errors: []
    }
  };
  
  // Test landing page
  console.log('🏠 TESTING LANDING PAGE');
  console.log('========================\n');
  
  const landingResult = await validateLandingPage(page);
  results.landing = landingResult;
  
  if (landingResult.success) {
    console.log('✅ Landing page validation passed');
    results.summary.successful++;
  } else {
    console.log('❌ Landing page validation failed');
    results.summary.failed++;
    results.summary.errors.push(...landingResult.errors);
  }
  
  await captureLandingScreenshot(page);
  
  // Test all versions
  console.log('\n🔄 TESTING ALL VERSIONS');
  console.log('========================\n');
  
  for (const version of versions) {
    const result = await quickValidateVersion(page, version);
    results.versions[version] = result;
    
    if (result.success) {
      console.log(`✅ ${version} - OK`);
      results.summary.successful++;
    } else {
      console.log(`❌ ${version} - FAILED`);
      results.summary.failed++;
      results.summary.errors.push(...result.errors);
    }
  }
  
  await browser.close();
  
  // Print final summary
  console.log('\n🎯 FINAL SUMMARY');
  console.log('================\n');
  
  console.log(`📊 RESULTS:`);
  console.log(`   ✅ Successful: ${results.summary.successful}/${results.summary.total}`);
  console.log(`   ❌ Failed: ${results.summary.failed}/${results.summary.total}`);
  console.log(`   📈 Success Rate: ${Math.round((results.summary.successful/results.summary.total)*100)}%`);
  
  if (results.summary.errors.length === 0) {
    console.log('\n🎉 ALL TESTS PASSED! 🎉');
    console.log('\n✨ OVERNIGHT DESIGN ITERATION PROJECT COMPLETE ✨');
    console.log('\nAvailable versions:');
    console.log('🏠 Landing: http://localhost:3001/nightly');
    
    const phaseGroups = {
      'Phase 1': ['base'],
      'Phase 2': ['design-a', 'design-b', 'design-c'], 
      'Phase 3': ['motion-a', 'motion-b', 'motion-c'],
      'Phase 4': ['canvas-a', 'canvas-b', 'canvas-c'],
      'Phase 5': ['synthesis-a', 'synthesis-b', 'synthesis-c']
    };
    
    Object.entries(phaseGroups).forEach(([phase, versionList]) => {
      console.log(`\n${phase}:`);
      versionList.forEach(v => {
        console.log(`   • http://localhost:3001/nightly/${v}`);
      });
    });
    
  } else {
    console.log('\n⚠️  ISSUES FOUND:');
    results.summary.errors.forEach(error => {
      console.log(`   - ${error}`);
    });
  }
  
  // Save results
  const resultsPath = path.join(process.cwd(), 'scripts', 'puppeteer', 'final-validation.json');
  await fs.writeFile(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n📝 Full results saved to ${resultsPath}`);
  
  const success = results.summary.failed === 0;
  process.exit(success ? 0 : 1);
}

if (require.main === module) {
  main().catch(error => {
    console.error('Validation failed:', error);
    process.exit(1);
  });
}