const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs').promises;

const BASE_URL = 'http://localhost:3001';

async function validatePage(page, pagePath, pageName) {
  const errors = [];
  const warnings = [];
  
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`Console error on ${pageName}: ${msg.text()}`);
    }
  });
  
  // Listen for page errors
  page.on('pageerror', error => {
    errors.push(`Page error on ${pageName}: ${error.message}`);
  });
  
  try {
    console.log(`Testing ${pageName}...`);
    const response = await page.goto(`${BASE_URL}${pagePath}`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    if (!response.ok()) {
      errors.push(`${pageName} returned status ${response.status()}`);
    }
    
    // Check for navigation elements
    const navExists = await page.$('nav');
    if (!navExists) {
      warnings.push(`${pageName} missing navigation`);
    }
    
    // Check for main content
    const mainExists = await page.$('main');
    if (!mainExists) {
      warnings.push(`${pageName} missing main content area`);
    }
    
    // Test navigation links
    const links = await page.$$eval('nav a', links => 
      links.map(link => ({ href: link.href, text: link.textContent }))
    );
    
    if (links.length === 0) {
      warnings.push(`${pageName} has no navigation links`);
    }
    
    return { errors, warnings, success: errors.length === 0 };
  } catch (error) {
    errors.push(`Failed to load ${pageName}: ${error.message}`);
    return { errors, warnings, success: false };
  }
}

async function validateCasesFiltering(page) {
  console.log('Testing Cases page filtering...');
  const errors = [];
  
  try {
    await page.goto(`${BASE_URL}/nightly/base/cases`, {
      waitUntil: 'networkidle2'
    });
    
    // Click the filters button to expand filters
    const filterToggleButton = await page.$$eval('button', buttons => {
      const filterBtn = buttons.find(btn => btn.textContent?.includes('Filters'));
      if (filterBtn) filterBtn.click();
      return !!filterBtn;
    });
    
    if (filterToggleButton) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Check if filter buttons exist
    const filterButtons = await page.$$('[data-filter]');
    if (filterButtons.length === 0) {
      console.log('Warning: No filter elements found on Cases page');
    } else {
      console.log(`Found ${filterButtons.length} filter elements`);
    }
    
    // Test sector filter
    await page.goto(`${BASE_URL}/nightly/base/cases?sector=technology`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test service filter
    await page.goto(`${BASE_URL}/nightly/base/cases?service=strategy`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test agency filter
    await page.goto(`${BASE_URL}/nightly/base/cases?agency=brands2life`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: errors.length === 0, errors };
  } catch (error) {
    errors.push(`Cases filtering test failed: ${error.message}`);
    return { success: false, errors };
  }
}

async function captureScreenshots(page, version) {
  const screenshotDir = path.join(process.cwd(), 'scripts', 'puppeteer', 'screenshots', version);
  await fs.mkdir(screenshotDir, { recursive: true });
  
  const pages = [
    { path: '/nightly/' + version, name: 'home' },
    { path: '/nightly/' + version + '/services', name: 'services' },
    { path: '/nightly/' + version + '/cases', name: 'cases' },
    { path: '/nightly/' + version + '/agencies', name: 'agencies' },
    { path: '/nightly/' + version + '/contact', name: 'contact' }
  ];
  
  for (const pageInfo of pages) {
    try {
      await page.goto(`${BASE_URL}${pageInfo.path}`, {
        waitUntil: 'networkidle2'
      });
      
      // Capture full page screenshot
      await page.screenshot({
        path: path.join(screenshotDir, `${pageInfo.name}-full.png`),
        fullPage: true
      });
      
      // Capture viewport screenshot
      await page.screenshot({
        path: path.join(screenshotDir, `${pageInfo.name}-viewport.png`)
      });
      
      console.log(`✓ Captured screenshots for ${pageInfo.name}`);
    } catch (error) {
      console.error(`✗ Failed to capture ${pageInfo.name}: ${error.message}`);
    }
  }
}

async function validateVersion(version) {
  console.log(`\n========================================`);
  console.log(`Validating /nightly/${version}`);
  console.log(`========================================\n`);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  const results = {
    version,
    timestamp: new Date().toISOString(),
    pages: {},
    filtering: {},
    overall: { errors: [], warnings: [] }
  };
  
  // Test all pages
  const pagesToTest = [
    { path: `/nightly/${version}`, name: 'Home' },
    { path: `/nightly/${version}/services`, name: 'Services' },
    { path: `/nightly/${version}/sectors`, name: 'Sectors' },
    { path: `/nightly/${version}/geographies`, name: 'Geographies' },
    { path: `/nightly/${version}/agencies`, name: 'Agencies' },
    { path: `/nightly/${version}/cases`, name: 'Cases' },
    { path: `/nightly/${version}/team`, name: 'Team' },
    { path: `/nightly/${version}/news`, name: 'News' },
    { path: `/nightly/${version}/contact`, name: 'Contact' }
  ];
  
  for (const pageInfo of pagesToTest) {
    const result = await validatePage(page, pageInfo.path, pageInfo.name);
    results.pages[pageInfo.name] = result;
    results.overall.errors.push(...result.errors);
    results.overall.warnings.push(...result.warnings);
  }
  
  // Test Cases filtering
  if (version === 'base') {
    const filterResult = await validateCasesFiltering(page);
    results.filtering = filterResult;
    results.overall.errors.push(...filterResult.errors);
  }
  
  // Capture screenshots
  await captureScreenshots(page, version);
  
  await browser.close();
  
  // Print results
  console.log('\n========== VALIDATION RESULTS ==========\n');
  
  if (results.overall.errors.length === 0) {
    console.log('✅ No errors found!');
  } else {
    console.log('❌ ERRORS:');
    results.overall.errors.forEach(error => console.log(`  - ${error}`));
  }
  
  if (results.overall.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    results.overall.warnings.forEach(warning => console.log(`  - ${warning}`));
  }
  
  // Save results to file
  const resultsPath = path.join(process.cwd(), 'scripts', 'puppeteer', `${version}-validation.json`);
  await fs.writeFile(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n📝 Results saved to ${resultsPath}`);
  
  return results.overall.errors.length === 0;
}

async function main() {
  const version = process.argv[2] || 'base';
  
  try {
    const success = await validateVersion(version);
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error('Validation failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateVersion };