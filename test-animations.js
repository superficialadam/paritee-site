const puppeteer = require('puppeteer')

async function testAnimations() {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1200, height: 800 }
  })
  const page = await browser.newPage()
  
  console.log('🔄 Loading page and testing animations...')
  
  try {
    await page.goto('http://localhost:3002/1/base', { 
      waitUntil: 'networkidle2',
      timeout: 30000
    })
    
    // Wait for GSAP to initialize
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Check initial heading states
    const headingStyles = await page.evaluate(() => {
      const headings = document.querySelectorAll('.animated-heading')
      const styles = []
      
      headings.forEach((heading, index) => {
        const computed = window.getComputedStyle(heading)
        styles.push({
          index,
          text: heading.textContent?.trim().substring(0, 20) + '...',
          opacity: computed.opacity,
          letterSpacing: computed.letterSpacing,
          whiteSpace: computed.whiteSpace
        })
      })
      
      return styles
    })
    
    console.log('📊 Initial heading states:')
    headingStyles.forEach(style => {
      console.log(`  ${style.index}: "${style.text}"`)
      console.log(`    Opacity: ${style.opacity}`)
      console.log(`    Letter-spacing: ${style.letterSpacing}`)
      console.log(`    White-space: ${style.whiteSpace}`)
      console.log()
    })
    
    // Scroll to trigger animations
    console.log('🔄 Scrolling to test animations...')
    
    await page.evaluate(() => {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
    })
    
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Check post-animation states
    const postAnimationStyles = await page.evaluate(() => {
      const serviceHeading = document.querySelector('#services .animated-heading')
      if (serviceHeading) {
        const computed = window.getComputedStyle(serviceHeading)
        return {
          opacity: computed.opacity,
          letterSpacing: computed.letterSpacing,
          text: serviceHeading.textContent?.trim()
        }
      }
      return null
    })
    
    if (postAnimationStyles) {
      console.log('📊 Services heading after scroll:')
      console.log(`  Text: "${postAnimationStyles.text}"`)
      console.log(`  Opacity: ${postAnimationStyles.opacity}`)
      console.log(`  Letter-spacing: ${postAnimationStyles.letterSpacing}`)
      
      if (postAnimationStyles.opacity === '1' && postAnimationStyles.letterSpacing === 'normal') {
        console.log('✅ Animation working correctly!')
      } else {
        console.log('❌ Animation not working as expected')
      }
    }
    
    console.log('🔄 Testing wheel scroll snap...')
    
    // Test wheel scrolling
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simulate wheel scroll
    await page.evaluate(() => {
      const wheelEvent = new WheelEvent('wheel', {
        deltaY: 100,
        bubbles: true,
        cancelable: true
      })
      document.dispatchEvent(wheelEvent)
    })
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const scrollPosition = await page.evaluate(() => window.scrollY)
    console.log(`📍 Scroll position after wheel event: ${scrollPosition}px`)
    
    if (scrollPosition > 100) {
      console.log('✅ Wheel scroll snap working!')
    } else {
      console.log('❌ Wheel scroll snap not working')
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  } finally {
    await browser.close()
  }
}

testAnimations()