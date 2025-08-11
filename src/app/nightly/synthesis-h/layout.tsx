import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { HolisticIntelligenceProvider } from './hooks/useHolisticIntelligence'
import HolisticCanvas from './components/HolisticCanvas'
import './styles/synthesis-h-holistic.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Synthesis-H: Holistic Integration Master | Paritee Marketing Network',
  description: 'Experience perfect holistic integration where design, motion, code, brand, UX, and business strategy operate as a unified living system. Revolutionary implementation showcasing emergent capabilities that arise from system harmony.',
  keywords: [
    'holistic integration',
    'system harmony',
    'emergent capabilities',
    'unified intelligence',
    'cross-component communication',
    'marketing network',
    'design integration',
    'motion synchronization',
    'business intelligence',
    'performance optimization'
  ],
  authors: [{ name: 'Master Creative Director H - Holistic Integration Specialist' }],
  openGraph: {
    title: 'Synthesis-H: Perfect Holistic Integration',
    description: 'Where every element serves both individual excellence and collective harmony',
    type: 'website',
  },
}

interface SynthesisHLayoutProps {
  children: React.ReactNode
}

export default function SynthesisHLayout({ children }: SynthesisHLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="synthesis-h-holistic">
        {/* Holistic Intelligence Provider - The Heart of Integration */}
        <HolisticIntelligenceProvider>
          {/* Integrated Canvas System - Visual Manifestation of System Harmony */}
          <HolisticCanvas />
          
          {/* Integration Status Overlay - Development/Debug Tool */}
          <div className="fixed top-4 right-4 z-50 opacity-20 hover:opacity-100 transition-opacity duration-300">
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 text-xs text-slate-400 font-mono">
              <div className="text-blue-400 font-semibold mb-1">SYNTHESIS-H STATUS</div>
              <div>🔄 Holistic Integration: ACTIVE</div>
              <div>🌟 System Harmony: OPTIMIZING</div>
              <div>🚀 Emergent Capabilities: EVOLVING</div>
              <div className="text-xs mt-1 text-slate-500">Master Creative Director H</div>
            </div>
          </div>
          
          {/* Main Content with Holistic Intelligence Integration */}
          <div className="holistic-content-container">
            {children}
          </div>
        </HolisticIntelligenceProvider>
      </body>
    </html>
  )
}