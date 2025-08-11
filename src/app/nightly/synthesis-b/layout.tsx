import type { Metadata } from 'next'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'
import { CanvasWrapper } from './components/CanvasWrapper'
import './synthesis-b-performance.css'

export const metadata: Metadata = {
  title: 'Synthesis B - Ultimate UX | Paritee',
  description: 'The ultimate user experience synthesis combining accessibility, performance, and beautiful design.',
}

export default function SynthesisBLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      {/* Performance-optimized interactive canvas */}
      <CanvasWrapper />
      
      {/* Accessibility-enhanced header with icons and focus management */}
      <Header />
      
      {/* Motion-B's excellent scroll progress for user orientation */}
      <ScrollProgress />
      
      {/* Main content with motion-reduced support */}
      <main 
        className="relative z-10 motion-page-enter motion-layout-batch"
        role="main"
        aria-label="Main content"
      >
        {children}
      </main>
      
      {/* Footer with proper semantic structure */}
      <Footer />
    </div>
  )
}