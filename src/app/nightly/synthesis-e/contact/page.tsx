'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Mail, Phone, MapPin, Star, ArrowRight, Heart, Target, Zap } from 'lucide-react'

import { IntelligentMotionChoreographer } from '../components/IntelligentMotionChoreographer'
import { AdaptiveContentArchitecture } from '../components/AdaptiveContentArchitecture'
import { CollaborativeJourneyGuide } from '../components/CollaborativeJourneyGuide'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    partnershipType: 'collaboration',
    timeline: 'immediate'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Partnership inquiry submitted:', formData)
    // Handle form submission
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <CollaborativeJourneyGuide 
      journeyType="decision-making"
      showProgressIndicators={true}
      allowPersonalization={true}
    >
      <div className="relative z-10 pt-24 pb-16">
        {/* Partnership Hero */}
        <IntelligentMotionChoreographer 
          sectionId="contact-hero" 
          contentType="hero" 
          priority="high"
        >
          <section className="px-4 py-20">
            <AdaptiveContentArchitecture
              sectionId="contact-hero"
              variants={[
                { id: 'focused', type: 'minimal', layout: 'spotlight', priority: 1, userSegments: ['decision-ready'], loadWeight: 'light' },
                { id: 'detailed', type: 'detailed', layout: 'grid', priority: 2, userSegments: ['information-seeking'], loadWeight: 'medium' }
              ]}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="space-y-8 mb-16">
                <div className="inline-flex items-center space-x-4 text-blue-300 text-sm font-medium mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <span>Start Your Partnership Journey</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="block text-white mb-2">Ready for</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                    Partnership?
                  </span>
                </h1>

                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                  Let's explore how equals coming together can transform your challenges 
                  into breakthrough results. No compromise, just better.
                </p>
              </div>
            </AdaptiveContentArchitecture>
          </section>
        </IntelligentMotionChoreographer>

        {/* Contact Form and Information */}
        <IntelligentMotionChoreographer 
          sectionId="contact-form" 
          contentType="interactive" 
          priority="high"
        >
          <section className="px-4 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Partnership Form */}
                <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="p-8">
                    <CardTitle className="text-2xl text-white flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-400" />
                      </div>
                      <span>Partnership Inquiry</span>
                    </CardTitle>
                    <CardDescription className="text-slate-400 mt-4">
                      Tell us about your challenges and let's discuss how our collaborative network can help.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-8 pt-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                            Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                          placeholder="Your company name"
                          value={formData.company}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Partnership Type */}
                      <div>
                        <label htmlFor="partnershipType" className="block text-sm font-medium text-slate-300 mb-2">
                          What type of partnership interests you? *
                        </label>
                        <select
                          id="partnershipType"
                          name="partnershipType"
                          required
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                          value={formData.partnershipType}
                          onChange={handleInputChange}
                        >
                          <option value="collaboration">Project Collaboration</option>
                          <option value="ongoing">Ongoing Partnership</option>
                          <option value="strategic">Strategic Alliance</option>
                          <option value="consultation">Initial Consultation</option>
                        </select>
                      </div>

                      {/* Timeline */}
                      <div>
                        <label htmlFor="timeline" className="block text-sm font-medium text-slate-300 mb-2">
                          Timeline
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                          value={formData.timeline}
                          onChange={handleInputChange}
                        >
                          <option value="immediate">Immediate (within 2 weeks)</option>
                          <option value="soon">Soon (within 1 month)</option>
                          <option value="quarter">This quarter</option>
                          <option value="planning">Future planning</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                          Tell us about your challenge
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-vertical"
                          placeholder="Describe your project, challenges, or goals. The more detail you provide, the better we can understand how our partnership network can help."
                          value={formData.message}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Submit Button */}
                      <Button 
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-lg py-4 text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 group"
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <Users className="w-5 h-5" />
                          <span>Start Partnership Discussion</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>

                      <p className="text-xs text-slate-500 text-center">
                        By submitting, you're taking the first step toward collaborative success. 
                        We'll respond within 24 hours to discuss your partnership opportunity.
                      </p>
                    </form>
                  </CardContent>
                </Card>

                {/* Partnership Information */}
                <div className="space-y-8">
                  {/* Why Partnership Works */}
                  <Card className="bg-gradient-to-br from-blue-900/20 to-slate-800/40 border border-blue-400/30 backdrop-blur-sm">
                    <CardHeader className="p-6">
                      <CardTitle className="text-xl text-blue-100 flex items-center space-x-3">
                        <Heart className="w-6 h-6 text-blue-400" />
                        <span>Why Partnership Works</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <div className="space-y-4">
                        {[
                          { 
                            icon: <Star className="w-5 h-5 text-yellow-400" />, 
                            text: "Multiple expert perspectives on every challenge" 
                          },
                          { 
                            icon: <Target className="w-5 h-5 text-green-400" />, 
                            text: "Faster execution through collaborative efficiency" 
                          },
                          { 
                            icon: <Zap className="w-5 h-5 text-purple-400" />, 
                            text: "Innovation amplified by diverse expertise" 
                          },
                          { 
                            icon: <Users className="w-5 h-5 text-blue-400" />, 
                            text: "No hierarchies, just equals working toward your success" 
                          }
                        ].map((benefit, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {benefit.icon}
                            </div>
                            <span className="text-slate-300 text-sm">{benefit.text}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
                    <CardHeader className="p-6">
                      <CardTitle className="text-xl text-white flex items-center space-x-3">
                        <Mail className="w-6 h-6 text-blue-400" />
                        <span>Get in Touch</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-4">
                      <div className="flex items-center space-x-3 text-slate-300">
                        <Mail className="w-5 h-5 text-blue-400" />
                        <span>partnership@paritee.com</span>
                      </div>
                      <div className="flex items-center space-x-3 text-slate-300">
                        <Phone className="w-5 h-5 text-blue-400" />
                        <span>+1 (555) 123-PARTNER</span>
                      </div>
                      <div className="flex items-start space-x-3 text-slate-300">
                        <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <div>Global Network</div>
                          <div className="text-sm text-slate-500">15+ markets worldwide</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Response Time */}
                  <Card className="bg-green-900/20 border border-green-400/30 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                        <div>
                          <div className="text-green-200 font-medium">Quick Response Guaranteed</div>
                          <div className="text-green-300/70 text-sm">We respond to all partnership inquiries within 24 hours</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </IntelligentMotionChoreographer>

        {/* Next Steps */}
        <IntelligentMotionChoreographer 
          sectionId="next-steps" 
          contentType="content"
        >
          <section className="px-4 py-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">What Happens Next?</h2>
                <p className="text-slate-300">Our collaborative partnership process</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    step: "01",
                    title: "Initial Discussion",
                    description: "We'll schedule a conversation to understand your challenges and goals.",
                    icon: <Users className="w-6 h-6" />
                  },
                  {
                    step: "02", 
                    title: "Partnership Design",
                    description: "We'll identify which agencies and expertise best fit your needs.",
                    icon: <Target className="w-6 h-6" />
                  },
                  {
                    step: "03",
                    title: "Team Introduction",
                    description: "Meet your collaborative team and align on approach.",
                    icon: <Heart className="w-6 h-6" />
                  },
                  {
                    step: "04",
                    title: "Collaborative Execution",
                    description: "Launch your project with the full power of partnership.",
                    icon: <Zap className="w-6 h-6" />
                  }
                ].map((step, index) => (
                  <Card key={index} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:border-blue-600/30 transition-all duration-300 group text-center">
                    <CardContent className="p-6">
                      <div className="text-blue-400 text-2xl font-bold mb-2">{step.step}</div>
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                        {step.icon}
                      </div>
                      <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </IntelligentMotionChoreographer>
      </div>
    </CollaborativeJourneyGuide>
  )
}