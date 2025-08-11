import { Inter } from 'next/font/google'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ExcellenceCanvas } from './components/ExcellenceCanvas'
import { PerformanceOptimizer } from './components/PerformanceOptimizer'
import { InteractionAnalyzer } from './components/InteractionAnalyzer'
import './styles/synthesis-f-excellence.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

export default function SynthesisFLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.variable} font-sans synthesis-f-excellence`}>
      {/* Performance Monitoring System */}
      <PerformanceOptimizer />
      
      {/* Predictive Interaction Analysis */}
      <InteractionAnalyzer />
      
      {/* Mathematical Beauty Canvas - Consciousness-Level Responsive */}
      <ExcellenceCanvas />
      
      {/* Perfect Navigation Header */}
      <Header />
      
      {/* Content with Flawless Execution */}
      <main className="relative z-10 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/20 overflow-hidden">
        {/* Golden Ratio Layout Container */}
        <div className="excellence-content-flow">
          {children}
        </div>
        
        {/* Micro-Interaction Enhancement Layer */}
        <div className="micro-interaction-layer" aria-hidden="true" />
      </main>
      
      {/* Refined Brand Footer */}
      <Footer />
    </div>
  )
}