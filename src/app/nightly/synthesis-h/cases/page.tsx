'use client'

import { useHolisticIntelligence } from '../hooks/useHolisticIntelligence'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function CasesPage() {
  const { state } = useHolisticIntelligence()

  return (
    <>
      <Header />
      
      <main className="pt-20">
        <section className="holistic-section">
          <div className="holistic-section-content">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Holistic Integration Case Studies
                </h1>
                
                <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto">
                  Revolutionary implementations where systems transcend individual capabilities
                </p>
              </div>

              <div className="holistic-card">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">
                  🌟 Case Study: Synthesis-H Implementation
                </h3>
                <div className="text-left space-y-4">
                  <div>
                    <strong className="text-green-400">Challenge:</strong>
                    <p className="text-slate-300 mt-2">
                      Create perfect holistic integration across 18+ previous implementations, 
                      achieving system harmony where the whole transcends the sum of its parts.
                    </p>
                  </div>
                  
                  <div>
                    <strong className="text-purple-400">Solution:</strong>
                    <p className="text-slate-300 mt-2">
                      Unified Intelligence Layer with cross-component communication, emergent capabilities 
                      framework, and mathematical foundation using Golden Ratio and Fibonacci sequences.
                    </p>
                  </div>
                  
                  <div>
                    <strong className="text-cyan-400">Results:</strong>
                    <ul className="text-slate-300 mt-2 space-y-1 list-disc list-inside">
                      <li>Integration Level: {Math.floor(state.integrationLevel * 100)}%</li>
                      <li>System Harmony: {Math.floor(state.systemHarmony * 100)}%</li>
                      <li>Emergent Capabilities: {state.emergentCapabilities.length} active</li>
                      <li>Performance: {Math.floor(state.performance.fps)}fps with complex visuals</li>
                      <li>Business Alignment: Perfect brand-experience harmony</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-sm text-slate-400">
                🚧 Additional case studies will be populated as the holistic integration system matures
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}