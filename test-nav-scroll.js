const puppeteer = require('puppeteer')

async function testNavScroll() {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1200, height: 800 }
  })
  const page = await browser.newPage()
  
  console.log('🔄 Testing navigation-based scroll snap...')
  
  // Listen for console errors
  const errors = []
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text())
    }
  })
  
  try {
    await page.goto('http://localhost:3002/1/base', { 
      waitUntil: 'networkidle2',
      timeout: 30000
    })
    
    console.log('✅ Page loaded')
    
    // Wait for GSAP to initialize
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Test navigation click
    console.log('🔄 Clicking Services nav link...')
    
    const servicesLink = await page.$('a[href="#services"]')
    if (servicesLink) {
      await servicesLink.click()
      console.log('✅ Clicked services link')
      
      // Wait for scroll animation
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const scrollPosition = await page.evaluate(() => window.scrollY)
      console.log(`📍 Scroll position after nav click: ${scrollPosition}px`)
      
      // Check if we're at the services section
      const servicesSection = await page.evaluate(() => {
        const section = document.getElementById('services')
        if (section) {
          const rect = section.getBoundingClientRect()
          return {
            top: rect.top,
            height: rect.height
          }
        }
        return null
      })
      
      if (servicesSection) {
        console.log(`📊 Services section top: ${servicesSection.top}px`)
        if (servicesSection.top <= 100 && servicesSection.top >= -100) {
          console.log('✅ Successfully scrolled to services section!')
        } else {
          console.log('❌ Did not scroll to services section properly')
        }
      }
      
      // Test heading animation
      const headingState = await page.evaluate(() => {
        const heading = document.querySelector('#services .animated-heading')
        if (heading) {
          const computed = window.getComputedStyle(heading)
          return {
            opacity: computed.opacity,
            letterSpacing: computed.letterSpacing
          }
        }
        return null
      })
      
      if (headingState) {
        console.log(`📊 Services heading - Opacity: ${headingState.opacity}, Letter-spacing: ${headingState.letterSpacing}`)
        
        if (headingState.opacity === '1' && headingState.letterSpacing === 'normal') {
          console.log('✅ Heading animation working!')
        } else {
          console.log('⚠️  Heading animation may still be animating or not triggered')
        }
      }
      
    } else {
      console.log('❌ Services link not found')
    }
    
    if (errors.length > 0) {
      console.log('❌ JavaScript errors found:')
      errors.forEach(error => console.log(`   ${error}`))
    } else {
      console.log('✅ No JavaScript errors')
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  } finally {
    await browser.close()
  }
}

testNavScroll()