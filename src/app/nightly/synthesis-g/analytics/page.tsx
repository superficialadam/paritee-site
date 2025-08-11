'use client'

import { motion } from 'framer-motion'
import AdvancedAnalyticsDashboard from '../components/AdvancedAnalyticsDashboard'
import BusinessContextEngine from '../intelligence/BusinessContextEngine'
import PredictiveEngagementIntelligence from '../intelligence/PredictiveEngagementIntelligence'

// Full-Screen Analytics Dashboard Page
export default function AnalyticsPage() {
  return (
    <BusinessContextEngine>
      <PredictiveEngagementIntelligence>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          {/* Page Header */}
          <div className="px-8 py-16">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-6 mb-12"
              >
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
                  Live Intelligence Analytics
                </h1>
                <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                  Real-time competitive analysis, market intelligence, and strategic insights 
                  powered by revolutionary AI systems. Experience the future of business intelligence.
                </p>
                
                {/* Live Status Indicators */}
                <div className="flex flex-wrap justify-center gap-6 mt-8">
                  <div className="flex items-center space-x-2 bg-green-600/20 px-4 py-2 rounded-full border border-green-600/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-medium text-sm">AI Systems Active</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-blue-600/20 px-4 py-2 rounded-full border border-blue-600/30">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-400 font-medium text-sm">Real-time Analysis</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-purple-600/20 px-4 py-2 rounded-full border border-purple-600/30">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-purple-400 font-medium text-sm">Predictive Intelligence</span>
                  </div>
                </div>
              </motion.div>

              {/* Dashboard Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-slate-900/60 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 shadow-2xl shadow-blue-600/20"
              >
                <AdvancedAnalyticsDashboard />
              </motion.div>

              {/* Analytics Insights Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">< 10ms</div>
                  <div className="text-slate-300 font-medium mb-1">Response Time</div>
                  <div className="text-slate-500 text-sm">Faster than human perception</div>
                </div>
                
                <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
                  <div className="text-slate-300 font-medium mb-1">Prediction Accuracy</div>
                  <div className="text-slate-500 text-sm">AI-powered behavioral analysis</div>
                </div>
                
                <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                  <div className="text-slate-300 font-medium mb-1">Live Monitoring</div>
                  <div className="text-slate-500 text-sm">Continuous intelligence updates</div>
                </div>
              </motion.div>
              
              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="text-center mt-16"
              >
                <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 rounded-2xl p-8 max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Experience Personalized Intelligence
                  </h3>
                  <p className="text-slate-300 mb-6">
                    This dashboard shows general insights. Request personalized access to see 
                    intelligence specific to your business context and strategic needs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="/nightly/synthesis-g/contact"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 transform-gpu shadow-lg shadow-blue-600/30"
                    >
                      Request Personalized Dashboard
                    </a>
                    <a 
                      href="/nightly/synthesis-g"
                      className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 px-8 py-3 rounded-full font-semibold transition-all duration-300"
                    >
                      Explore Intelligence Platform
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </PredictiveEngagementIntelligence>
    </BusinessContextEngine>
  )
}