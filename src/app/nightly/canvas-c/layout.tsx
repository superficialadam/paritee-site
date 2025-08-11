import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { P5InteractiveCanvas } from './components/P5InteractiveCanvas'
import './canvas-performance.css'
import Script from 'next/script'

export default function NightlyCanvasCLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen" style={{willChange: 'auto', contain: 'layout style paint'}}>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 focus:shadow-lg transition-all duration-200 will-change-transform"
      >
        Skip to main content
      </a>
      
      {/* Interactive P5.js Canvas Layer */}
      <P5InteractiveCanvas />
      
      {/* Accessible page structure */}
      <div className="flex flex-col min-h-screen relative z-10">
        <Header />
        
        <main 
          id="main-content" 
          className="relative flex-grow focus:outline-none motion-page-enter z-20" 
          tabIndex={-1}
          role="main"
          aria-label="Main content"
          style={{willChange: 'transform, opacity', contain: 'layout style'}}
        >
          {children}
        </main>
        
        <Footer />
      </div>
      
      {/* Performance-optimized canvas system */}
      <Script
        src="/canvas-performance.js"
        strategy="afterInteractive"
        id="canvas-performance"
      />
    </div>
  )
}