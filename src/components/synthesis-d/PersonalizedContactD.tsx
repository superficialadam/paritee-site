'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useUserJourney } from './UserJourneyProvider'
import { ArrowRight, Check } from 'lucide-react'

export default function PersonalizedContactD() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    challenge: '',
    timeline: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const sectionRef = useRef<HTMLElement>(null)
  const { recordInteraction, updateStage, journeyState } = useUserJourney()
  const isInView = useInView(sectionRef, { margin: "-30%" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    recordInteraction('contact-form-submit')
    updateStage('conversion')
  }

  const getPersonalizedMessage = () => {
    const { userType, engagement } = journeyState
    
    if (userType === 'cmo') {
      return "As a CMO, you need marketing partners who understand the strategic challenges you face. Let's discuss how our advisory-led approach can drive the results you need."
    }
    if (userType === 'agency-owner') {
      return "We understand the unique challenges of growing an agency while maintaining quality. Let's explore how our partnership model can support your growth goals."
    }
    if (userType === 'marketer') {
      return "Great marketing happens when strategy and execution work seamlessly together. Let's discuss how our advisory team can support your marketing objectives."
    }
    
    return "Ready to experience advisory-led marketing? Let's start a conversation about your goals and how we can help you achieve them."
  }

  return (
    <motion.section 
      ref={sectionRef}
      id="personalized-contact"
      className="relative py-32 bg-gradient-to-br from-blue-900/20 to-purple-900/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => {
        updateStage('conversion')
        recordInteraction('contact-view')
      }}
    >
      <div className="container mx-auto px-8 max-w-4xl">
        
        {!isSubmitted ? (
          <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-12">
            <motion.div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
                Ready to Begin?
              </h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
                {getPersonalizedMessage()}
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="Your company"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-blue-400 focus:outline-none transition-colors"
                  >
                    <option value="" className="bg-slate-900">Select your role</option>
                    <option value="cmo" className="bg-slate-900">CMO/Marketing Director</option>
                    <option value="agency-owner" className="bg-slate-900">Agency Owner</option>
                    <option value="marketer" className="bg-slate-900">Marketing Manager</option>
                    <option value="other" className="bg-slate-900">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Primary Challenge
                </label>
                <textarea
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-colors resize-none"
                  placeholder="What's your biggest marketing challenge right now?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-blue-400 focus:outline-none transition-colors"
                >
                  <option value="" className="bg-slate-900">When do you need help?</option>
                  <option value="immediate" className="bg-slate-900">Immediate (within 30 days)</option>
                  <option value="short-term" className="bg-slate-900">Short-term (1-3 months)</option>
                  <option value="medium-term" className="bg-slate-900">Medium-term (3-6 months)</option>
                  <option value="exploring" className="bg-slate-900">Just exploring options</option>
                </select>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start the Conversation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
          </div>
        ) : (
          <motion.div 
            className="bg-gradient-to-br from-emerald-900/60 to-emerald-800/40 backdrop-blur-xl border border-emerald-400/30 rounded-2xl p-8 md:p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-400/30 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Check className="h-8 w-8 text-emerald-400" />
            </div>
            
            <h3 className="text-2xl font-semibold text-white mb-4">
              Thank You!
            </h3>
            
            <p className="text-emerald-100 text-lg mb-6">
              We've received your message and will be in touch within 24 hours.
            </p>
            
            <p className="text-emerald-200/80 text-sm">
              A senior advisor will review your information and reach out to discuss how we can help achieve your marketing goals.
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}