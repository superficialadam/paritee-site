const puppeteer = require('puppeteer')

async function validateBasePage() {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()
  
  console.log('🔄 Loading /1/base page...')
  
  try {
    // Navigate to the page
    await page.goto('http://localhost:3002/1/base', { 
      waitUntil: 'networkidle2',
      timeout: 30000
    })
    
    console.log('✅ Page loaded successfully')
    
    // Check for key components
    const components = [
      { name: 'Header', selector: 'header' },
      { name: 'Hero section', selector: '#home' },
      { name: 'Mission section', selector: '#mission' },
      { name: 'Services section', selector: '#services' },
      { name: 'Sectors section', selector: '#sectors' },
      { name: 'News section', selector: '#news' },
      { name: 'Geographies section', selector: '#geographies' },
      { name: 'Agencies section', selector: '#agencies' },
      { name: 'Team section', selector: '#team' },
      { name: 'Cases section', selector: '#cases' },
      { name: 'Contact section', selector: '#contact' },
      { name: 'Footer', selector: 'footer' }
    ]
    
    for (const component of components) {
      const element = await page.$(component.selector)
      if (element) {
        console.log(`✅ ${component.name} found`)
      } else {
        console.log(`❌ ${component.name} NOT found`)
      }
    }
    
    // Check for no JavaScript errors
    const errors = []
    page.on('pageerror', error => {
      errors.push(error.message)
    })
    
    // Wait a bit for any async operations
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Test heading animations
    console.log('🔄 Testing heading animations...')
    try {
      const headings = await page.$$('.animated-heading')
      console.log(`✅ Found ${headings.length} animated headings`)
      
      // Check if hero heading has proper styling
      const heroHeading = await page.$('.hero-heading')
      if (heroHeading) {
        const style = await page.evaluate(el => {
          const computed = window.getComputedStyle(el)
          return {
            whiteSpace: computed.whiteSpace,
            overflow: computed.overflow
          }
        }, heroHeading)
        
        if (style.whiteSpace === 'nowrap') {
          console.log('✅ Hero heading has nowrap styling')
        } else {
          console.log('⚠️  Hero heading might break into multiple lines')
        }
      }
      
      // Test scroll behavior by scrolling to different sections
      console.log('🔄 Testing smooth scroll navigation...')
      const sections = ['#mission', '#services', '#sectors']
      
      for (const sectionId of sections) {
        const link = await page.$(`a[href="${sectionId}"]`)
        if (link) {
          await link.click()
          await new Promise(resolve => setTimeout(resolve, 1500)) // Wait for scroll animation
          console.log(`✅ Scrolled to ${sectionId}`)
        }
      }
      
    } catch (animationError) {
      console.log('❌ Animation test failed:', animationError.message)
    }

    // Test carousel functionality
    console.log('🔄 Testing carousel navigation...')
    try {
      // Scroll to news section first
      await page.evaluate(() => {
        document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' })
      })
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const nextButton = await page.$('button[aria-label="Next"]')
      if (nextButton) {
        await nextButton.click()
        console.log('✅ Carousel next button clicked successfully')
        await new Promise(resolve => setTimeout(resolve, 500))
      } else {
        console.log('⚠️  Carousel next button not found')
      }
      
      const prevButton = await page.$('button[aria-label="Previous"]')
      if (prevButton) {
        await prevButton.click()
        console.log('✅ Carousel prev button clicked successfully')
        await new Promise(resolve => setTimeout(resolve, 500))
      } else {
        console.log('⚠️  Carousel prev button not found')
      }
    } catch (carouselError) {
      console.log('❌ Carousel test failed:', carouselError.message)
    }
    
    if (errors.length === 0) {
      console.log('✅ No JavaScript errors detected')
    } else {
      console.log('❌ JavaScript errors found:')
      errors.forEach(error => console.log(`   ${error}`))
    }
    
    // Check page title
    const title = await page.title()
    console.log(`📄 Page title: "${title}"`)
    
    // Check some sample content
    const heroText = await page.$eval('h1', el => el.textContent.trim())
    console.log(`📝 Hero text: "${heroText}"`)
    
    console.log('\n🎉 Base page validation complete!')
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message)
  } finally {
    await browser.close()
  }
}

validateBasePage()