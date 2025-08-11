import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Synthesis-G: The Future of Agency Networks | Paritee',
  description: 'Experience revolutionary AI-powered partnership intelligence, predictive engagement systems, and advanced competitive analytics. Industry-first technology that sets new standards for agency collaboration.',
  keywords: [
    'AI agency partnerships',
    'predictive engagement intelligence',
    'competitive analytics dashboard',
    'business context detection',
    'partnership visualization',
    'revolutionary marketing technology',
    'intelligent agency networks',
    'advanced ROI modeling'
  ].join(', '),
  openGraph: {
    title: 'Synthesis-G: Revolutionary Agency Intelligence Platform',
    description: 'The future of agency partnerships powered by AI, predictive analytics, and immersive visualization technology.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Quantum-Performance Layout with Advanced Optimization
export default function SynthesisGLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Quantum-Performance CSS Variables */}
      <style jsx global>{`
        :root {
          /* Revolutionary Design System Variables */
          --quantum-duration: 0.8s;
          --quantum-easing: cubic-bezier(0.215, 0.610, 0.355, 1.000);
          --intelligence-blue: theme('colors.blue.600');
          --intelligence-purple: theme('colors.purple.600');
          --intelligence-green: theme('colors.green.600');
          --network-glow: 0 0 30px rgba(59, 130, 246, 0.3);
          
          /* Advanced Performance Variables */
          --gpu-acceleration: translateZ(0);
          --will-change: transform, opacity, filter;
          --render-optimization: optimizeSpeed;
        }
        
        /* Quantum-Smooth Animation Classes */
        .quantum-smooth {
          transition: all var(--quantum-duration) var(--quantum-easing);
          will-change: var(--will-change);
          transform: var(--gpu-acceleration);
        }
        
        .intelligence-glow {
          box-shadow: var(--network-glow);
        }
        
        /* Advanced Accessibility Support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .quantum-smooth {
            transition: none;
          }
        }
        
        /* High Contrast Mode Support */
        @media (prefers-contrast: high) {
          .bg-slate-800\\/40 {
            background-color: rgb(30 41 59 / 0.9) !important;
          }
          
          .border-slate-700\\/50 {
            border-color: rgb(51 65 85 / 0.8) !important;
          }
        }
        
        /* Performance-First Loading States */
        .intelligence-loading {
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          animation: intelligence-shimmer 2s infinite;
        }
        
        @keyframes intelligence-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      
      {/* Revolutionary Navigation with Adaptive Intelligence */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <a 
                href="/nightly/synthesis-g" 
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all duration-300"
              >
                Synthesis-G
              </a>
              
              <div className="hidden lg:flex items-center space-x-6">
                <a href="/nightly/synthesis-g/analytics" className="text-slate-300 hover:text-blue-400 transition-colors duration-200">
                  Live Analytics
                </a>
                <a href="/nightly/synthesis-g/services" className="text-slate-300 hover:text-blue-400 transition-colors duration-200">
                  Intelligence Services
                </a>
                <a href="/nightly/synthesis-g/cases" className="text-slate-300 hover:text-blue-400 transition-colors duration-200">
                  Success Stories
                </a>
                <a href="/nightly/synthesis-g/agencies" className="text-slate-300 hover:text-blue-400 transition-colors duration-200">
                  Network Partners
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href="/nightly/synthesis-g/contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 transform-gpu shadow-lg shadow-blue-600/30"
              >
                Request Preview
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content with Quantum Performance */}
      <main className="pt-20">
        {children}
      </main>
      
      {/* Revolutionary Footer with Network Intelligence */}
      <footer className="bg-slate-900/60 backdrop-blur-xl border-t border-slate-800/50 mt-32">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Synthesis-G Intelligence Platform
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Revolutionary AI-powered agency partnership platform that delivers unprecedented 
                business advantages through predictive intelligence, competitive analytics, 
                and immersive network visualization.
              </p>
              <div className="flex space-x-4">
                <div className="bg-blue-600/20 px-4 py-2 rounded-full border border-blue-600/30">
                  <span className="text-blue-400 text-sm font-medium">AI-Powered</span>
                </div>
                <div className="bg-purple-600/20 px-4 py-2 rounded-full border border-purple-600/30">
                  <span className="text-purple-400 text-sm font-medium">Future-Ready</span>
                </div>
                <div className="bg-green-600/20 px-4 py-2 rounded-full border border-green-600/30">
                  <span className="text-green-400 text-sm font-medium">Industry-First</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Intelligence Features</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a href="/nightly/synthesis-g/analytics" className="hover:text-blue-400 transition-colors duration-200">
                    Live Analytics Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                    Partnership Visualization
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                    Predictive Engagement
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                    Competitive Intelligence
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Network Access</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a href="/nightly/synthesis-g/contact" className="hover:text-blue-400 transition-colors duration-200">
                    Request Preview Access
                  </a>
                </li>
                <li>
                  <a href="/nightly/synthesis-g/agencies" className="hover:text-blue-400 transition-colors duration-200">
                    Partner Network
                  </a>
                </li>
                <li>
                  <a href="/nightly/synthesis-g/cases" className="hover:text-blue-400 transition-colors duration-200">
                    Success Metrics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                    Technical Documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800/50 pt-8 mt-12">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <p className="text-slate-500 text-sm">
                © 2024 Paritee. Synthesis-G Intelligence Platform. Revolutionary technology setting industry standards.
              </p>
              <div className="flex items-center space-x-6 text-sm text-slate-500">
                <span>Powered by Advanced AI</span>
                <span>•</span>
                <span>Real-time Intelligence</span>
                <span>•</span>
                <span>Industry-First Innovation</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}