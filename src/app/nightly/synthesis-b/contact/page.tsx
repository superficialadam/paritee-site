'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { geographies } from '@/data/geographies'
import { MapPin, Phone, Mail, MessageCircle, Clock, Linkedin, Twitter, Instagram, ChevronRight, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    subject: '',
    phone: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Reset form and show success
    setFormData({
      name: '',
      email: '',
      company: '',
      message: '',
      subject: '',
      phone: ''
    })
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Hide success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const offices = [
    {
      city: 'New York',
      country: 'United States',
      address: '123 Fifth Avenue, Suite 1500\nNew York, NY 10010',
      phone: '+1 (212) 555-0123',
      email: 'newyork@paritee.com',
      hours: 'Monday - Friday: 9:00 AM - 6:00 PM EST'
    },
    {
      city: 'London',
      country: 'United Kingdom',
      address: '25 Old Bond Street\nLondon W1S 4QB',
      phone: '+44 (0) 20 7123 4567',
      email: 'london@paritee.com',
      hours: 'Monday - Friday: 9:00 AM - 6:00 PM GMT'
    },
    {
      city: 'Berlin',
      country: 'Germany',
      address: 'Unter den Linden 32\n10117 Berlin',
      phone: '+49 (0) 30 1234 5678',
      email: 'berlin@paritee.com',
      hours: 'Monday - Friday: 9:00 AM - 6:00 PM CET'
    },
    {
      city: 'Sydney',
      country: 'Australia',
      address: '456 George Street\nSydney NSW 2000',
      phone: '+61 (0) 2 9123 4567',
      email: 'sydney@paritee.com',
      hours: 'Monday - Friday: 9:00 AM - 6:00 PM AEDT'
    }
  ]

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
  ]

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32">
      {/* Success Message - Mobile-optimized */}
      {isSubmitted && (
        <div className="fixed top-20 left-4 right-4 sm:left-auto sm:right-8 sm:max-w-sm z-50">
          <div className="bg-emerald-600/20 border border-emerald-600/40 backdrop-blur-sm rounded-none p-4 sm:p-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <h4 className="text-emerald-400 font-medium text-sm">Message Sent!</h4>
                <p className="text-emerald-200 text-xs mt-1">We'll get back to you within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Mobile-first with breadcrumb */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb navigation */}
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-slate-400">
              <li>
                <Link href="/nightly/design-c" className="hover:text-blue-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <ChevronRight className="w-4 h-4" />
              <li className="text-white" aria-current="page">Contact</li>
            </ol>
          </nav>

          <div className="text-center space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-tight">
              Let's Talk
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
              Ready to transform your marketing strategy? Get in touch with our team to discuss how we can help you achieve your goals.
            </p>
            
            {/* Stats - Mobile-friendly grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto pt-8">
              <div className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm rounded-none p-6 hover:border-blue-600/30 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-semibold text-blue-400 mb-2">24/7</div>
                <div className="text-slate-400 text-sm">Response Time</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm rounded-none p-6 hover:border-blue-600/30 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-semibold text-blue-400 mb-2">{offices.length}</div>
                <div className="text-slate-400 text-sm">Global Offices</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm rounded-none p-6 hover:border-blue-600/30 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-semibold text-blue-400 mb-2">15+</div>
                <div className="text-slate-400 text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info - Mobile-first layout */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Form - Mobile-optimized */}
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 sm:mb-8">Get Started</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 sm:py-4 bg-slate-800/40 border rounded-none text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all duration-300 min-h-[48px] ${errors.name ? 'border-red-500/60 focus:border-red-500/80' : 'border-slate-700/50 focus:border-blue-600/60'}`}
                      placeholder="Your full name"
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <div id="name-error" className="flex items-center space-x-2 mt-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 sm:py-4 bg-slate-800/40 border rounded-none text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all duration-300 min-h-[48px] ${errors.email ? 'border-red-500/60 focus:border-red-500/80' : 'border-slate-700/50 focus:border-blue-600/60'}`}
                      placeholder="your.email@company.com"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <div id="email-error" className="flex items-center space-x-2 mt-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-400 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 sm:py-4 bg-slate-800/40 border border-slate-700/50 rounded-none text-white placeholder-slate-500 focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20 transition-all duration-300 min-h-[48px]"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-400 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 sm:py-4 bg-slate-800/40 border border-slate-700/50 rounded-none text-white placeholder-slate-500 focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20 transition-all duration-300 min-h-[48px]"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-400 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 sm:py-4 bg-slate-800/40 border rounded-none text-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all duration-300 min-h-[48px] ${errors.subject ? 'border-red-500/60 focus:border-red-500/80' : 'border-slate-700/50 focus:border-blue-600/60'}`}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  >
                    <option value="">Select a subject</option>
                    <option value="new-business">New Business Inquiry</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="media">Media & Press</option>
                    <option value="careers">Careers</option>
                    <option value="general">General Inquiry</option>
                  </select>
                  {errors.subject && (
                    <div id="subject-error" className="flex items-center space-x-2 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errors.subject}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 sm:py-4 bg-slate-800/40 border rounded-none text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all duration-300 resize-none ${errors.message ? 'border-red-500/60 focus:border-red-500/80' : 'border-slate-700/50 focus:border-blue-600/60'}`}
                    placeholder="Tell us about your project, goals, and how we can help..."
                    aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                  />
                  {errors.message ? (
                    <div id="message-error" className="flex items-center space-x-2 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errors.message}</span>
                    </div>
                  ) : (
                    <p id="message-hint" className="mt-2 text-slate-500 text-xs">
                      {formData.message.length}/500 characters (minimum 10 required)
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 sm:py-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 flex items-center justify-center space-x-2"
                >
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information - Better mobile layout */}
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 sm:mb-8">Contact Information</h2>
              <div className="space-y-8">
                {/* Quick Contact */}
                <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none">
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl font-medium text-white flex items-center space-x-3">
                      <MessageCircle className="w-5 h-5 text-blue-400" />
                      <span>Quick Contact</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">hello@paritee.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">+1 (555) 123-PARITEE</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">24/7 Response Time</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none">
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl font-medium text-white">Follow Us</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="flex space-x-4">
                      {socialLinks.map((social) => (
                        <Link
                          key={social.name}
                          href={social.href}
                          className="p-3 text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 rounded-full transition-all duration-300"
                        >
                          <social.icon className="w-5 h-5" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* What Happens Next */}
                <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none">
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl font-medium text-white">What Happens Next?</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-400 text-xs font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">Quick Response</h4>
                        <p className="text-slate-400 text-xs">We&apos;ll respond within 24 hours to acknowledge your inquiry.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-400 text-xs font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">Discovery Call</h4>
                        <p className="text-slate-400 text-xs">We&apos;ll schedule a call to understand your needs and goals.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-400 text-xs font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">Proposal</h4>
                        <p className="text-slate-400 text-xs">We&apos;ll create a tailored proposal with recommendations.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations - Mobile-optimized */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4">Our Offices</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Global presence with local expertise
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office) => (
              <Card key={office.city} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60">
                <CardHeader className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <CardTitle className="text-lg font-medium text-white">{office.city}</CardTitle>
                  </div>
                  <CardDescription className="text-slate-400 text-sm">{office.country}</CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6 space-y-3">
                  <div>
                    <p className="text-slate-300 text-sm whitespace-pre-line">{office.address}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-300 text-xs">{office.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-300 text-xs">{office.email}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Clock className="w-3 h-3 text-slate-400 mt-0.5" />
                      <span className="text-slate-400 text-xs">{office.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "How do you work with clients across different time zones?",
                answer: "Our global network ensures we can provide 24/7 support with local teams in major time zones. We use collaborative tools and structured communication processes to keep projects moving smoothly."
              },
              {
                question: "What makes Paritee different from traditional agency networks?",
                answer: "We're built on partnership, not hierarchy. Our independent agencies maintain their unique cultures and expertise while collaborating as equals, giving you the best of both worlds: specialized talent and integrated solutions."
              },
              {
                question: "How quickly can you start a new project?",
                answer: "Most projects can begin within 1-2 weeks of signed agreements. Rush projects can often start sooner. We'll provide a realistic timeline during our initial consultation based on your specific needs."
              },
              {
                question: "Do you work with businesses of all sizes?",
                answer: "Yes, from startups to Fortune 500 companies. Our network model allows us to scale teams and resources to match your needs and budget while maintaining quality standards."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-medium text-white">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <CardDescription className="text-slate-300 leading-relaxed">{faq.answer}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}