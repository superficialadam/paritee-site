import { Header } from './components/Header'
import { Footer } from './components/Footer'

export default function NightlyDesignCLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 focus:shadow-lg transition-all duration-300"
      >
        Skip to main content
      </a>
      
      {/* Accessible page structure */}
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main 
          id="main-content" 
          className="relative flex-grow focus:outline-none" 
          tabIndex={-1}
          role="main"
          aria-label="Main content"
        >
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  )
}