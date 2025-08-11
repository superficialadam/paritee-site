'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useBusinessIntelligence } from '../intelligence/BusinessContextEngine'
import { usePredictiveEngagement } from '../intelligence/PredictiveEngagementIntelligence'
import * as Icons from 'lucide-react'

// Intelligent Contact Form with AI-Powered Insights
export default function ContactPage() {
  const { intelligenceState } = useBusinessIntelligence()
  const { engagementState, getConversionProbability } = usePredictiveEngagement()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    interests: [] as string[],
    message: '',
    intelligencePreview: false
  })
  
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate AI-powered form processing
    setTimeout(() => {
      setIsSubmitted(true)
      setIsSubmitting(false)
    }, 2000)
  }

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const intelligenceInsights = [
    {
      icon: 'Brain',
      title: 'Business Context Detection',
      description: `We've identified you as a ${intelligenceState.businessContext.decisionMakerLevel} in the ${intelligenceState.businessContext.industry} industry`,
      confidence: 85
    },
    {
      icon: 'TrendingUp',
      title: 'Partnership Potential',
      description: `${intelligenceState.competitiveIntel.partnershipPotential}% strategic fit based on your engagement patterns`,
      confidence: intelligenceState.competitiveIntel.partnershipPotential
    },
    {
      icon: 'Target',
      title: 'Conversion Probability',
      description: `${Math.round(getConversionProbability())}% likelihood of partnership success`,
      confidence: Math.round(getConversionProbability())
    },
    {
      icon: 'DollarSign',
      title: 'Expected ROI Range',
      description: `${intelligenceState.competitiveIntel.expectedROI.min}-${intelligenceState.competitiveIntel.expectedROI.max}% projected returns`,
      confidence: 78
    }
  ]

  const serviceInterests = [
    'AI-Powered Business Intelligence',
    'Partnership Network Visualization',
    'Predictive Engagement Systems',
    'Competitive Analytics Dashboard',
    'Strategic Consulting',
    'Market Intelligence Reports',
    'ROI Optimization',
    'Industry-Specific Solutions'
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-8 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-green-600 to-blue-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8"
          >
            <Icons.CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-white"
          >
            Intelligence Preview Request Received
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto"
          >
            Our AI has analyzed your request and identified high strategic fit. 
            You'll receive personalized intelligence insights within 24 hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-slate-800/60 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 max-w-2xl mx-auto"
          >
            <h3 className="text-lg font-semibold text-blue-400 mb-4">What Happens Next</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">AI Analysis Complete</h4>
                  <p className="text-slate-400 text-sm">Your business context and partnership potential have been analyzed</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">Personalized Intelligence Report</h4>
                  <p className="text-slate-400 text-sm">Custom insights and recommendations based on your specific needs</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">Strategic Consultation</h4>
                  <p className="text-slate-400 text-sm">Direct access to our intelligence platform and partnership opportunities</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 py-4 text-lg font-semibold">
              <a href="/nightly/synthesis-g">Return to Intelligence Platform</a>
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-8 py-32">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-8 mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
            Request Intelligence Preview
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Experience the future of agency partnerships with personalized AI insights, 
            competitive analysis, and strategic recommendations tailored to your business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Intelligence Insights Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/60 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Live Intelligence Insights</h3>
              
              <div className="space-y-4">
                {intelligenceInsights.map((insight, index) => {
                  const IconComponent = Icons[insight.icon as keyof typeof Icons] as any
                  return (
                    <div key={index} className="border-b border-slate-700/50 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">{insight.title}</h4>
                          <p className="text-slate-400 text-xs mt-1">{insight.description}</p>
                        </div>
                      </div>
                      <div className="ml-13">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-500">Confidence</span>
                          <span className="text-slate-400">{insight.confidence}%</span>
                        </div>
                        <div className="w-full bg-slate-700/50 h-2 rounded-full">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${insight.confidence}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icons.Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-medium text-sm">AI Recommendation</span>
                </div>
                <p className="text-slate-300 text-sm">
                  Based on your engagement pattern, you're an ideal candidate for our 
                  {intelligenceState.businessContext.urgency === 'urgent' ? ' fast-track' : ' comprehensive'} 
                  intelligence preview program.
                </p>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Company *</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                        placeholder="Your company"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Your Role *</label>
                      <select
                        required
                        value={formData.role}
                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                      >
                        <option value="">Select your role</option>
                        <option value="ceo">CEO / Founder</option>
                        <option value="cmo">Chief Marketing Officer</option>
                        <option value="vp-marketing">VP of Marketing</option>
                        <option value="marketing-director">Marketing Director</option>
                        <option value="agency-owner">Agency Owner</option>
                        <option value="consultant">Marketing Consultant</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Intelligence Interests */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Intelligence Interests</h3>
                  <p className="text-slate-400">Select the areas where you'd like personalized insights:</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {serviceInterests.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`p-3 text-sm font-medium rounded-lg border transition-all duration-200 ${
                          formData.interests.includes(interest)
                            ? 'bg-blue-600/20 border-blue-600/40 text-blue-400'
                            : 'bg-slate-700/30 border-slate-600/40 text-slate-300 hover:border-slate-500/60'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-4">
                  <label className="block text-slate-300 font-medium">Additional Information</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                    placeholder="Tell us about your specific challenges or goals..."
                  />
                </div>

                {/* AI Preview Option */}
                <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      id="intelligence-preview"
                      checked={formData.intelligencePreview}
                      onChange={(e) => setFormData(prev => ({ ...prev, intelligencePreview: e.target.checked }))}
                      className="mt-1 w-5 h-5 bg-slate-700 border border-slate-600 rounded focus:ring-blue-500"
                    />
                    <div>
                      <label htmlFor="intelligence-preview" className="text-white font-medium cursor-pointer">
                        Request Live Intelligence Demo
                      </label>
                      <p className="text-slate-400 text-sm mt-1">
                        Include a personalized demo of our AI-powered analytics dashboard showing 
                        insights specific to your business and industry.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg py-4 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] transform-gpu shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing with AI...</span>
                      </div>
                    ) : (
                      'Request Intelligence Preview'
                    )}
                  </Button>
                  
                  <p className="text-slate-500 text-sm text-center mt-4">
                    Your information is processed by our AI systems to provide personalized insights. 
                    We respect your privacy and never share your data.
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}