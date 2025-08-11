'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { geographies } from '@/data/geographies'
import { MapPin, Phone, Mail, MessageCircle, Clock, Linkedin, Twitter, Instagram } from 'lucide-react'

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      message: '',
      subject: '',
      phone: ''
    })
    setIsSubmitting(false)
    
    // You would typically show a success message here
    alert('Thank you for your message! We\'ll get back to you soon.')
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
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-semibold text-white leading-tight">
            Let&apos;s Talk
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Ready to transform your marketing strategy? Get in touch with our team to discuss how we can help you achieve your goals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">24/7</div>
              <div className="text-slate-400 text-sm">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">{offices.length}</div>
              <div className="text-slate-400 text-sm">Global Offices</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">15+</div>
              <div className="text-slate-400 text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-semibold text-white mb-8">Get Started</h2>
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
                      className="w-full px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-none text-white placeholder-slate-500 focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20 focus:bg-slate-800/60 transition-all duration-300 transform-gpu focus:scale-102 motion-reduce:focus:scale-100 hover:bg-slate-800/50"
                      placeholder="Your full name"
                    />
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
                      className="w-full px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-none text-white placeholder-slate-500 focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20 focus:bg-slate-800/60 transition-all duration-300 transform-gpu focus:scale-102 motion-reduce:focus:scale-100 hover:bg-slate-800/50"
                      placeholder="your.email@company.com"
                    />
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
                      className="w-full px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-none text-white placeholder-slate-500 focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20 focus:bg-slate-800/60 transition-all duration-300 transform-gpu focus:scale-102 motion-reduce:focus:scale-100 hover:bg-slate-800/50"
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
                      className="w-full px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-none text-white placeholder-slate-500 focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20 focus:bg-slate-800/60 transition-all duration-300 transform-gpu focus:scale-102 motion-reduce:focus:scale-100 hover:bg-slate-800/50"
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
                    className="w-full px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-none text-white focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20 transition-all duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="new-business">New Business Inquiry</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="media">Media & Press</option>
                    <option value="careers">Careers</option>
                    <option value="general">General Inquiry</option>
                  </select>
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
                    className="w-full px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-none text-white placeholder-slate-500 focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project, goals, and how we can help..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 motion-reduce:hover:scale-100 transform-gpu hover:-translate-y-0.5 motion-reduce:hover:-translate-y-0"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-semibold text-white mb-8">Contact Information</h2>
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
                          className="p-3 text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 rounded-full transition-all duration-300 hover:scale-110 motion-reduce:hover:scale-100 transform-gpu hover:-translate-y-0.5 motion-reduce:hover:-translate-y-0 group"
                        >
                          <social.icon className="w-5 h-5 group-hover:rotate-12 motion-reduce:group-hover:rotate-0 transition-transform duration-300" />
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

      {/* Office Locations */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office) => (
              <Card key={office.city} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60 hover:-translate-y-1 motion-reduce:hover:-translate-y-0 hover:scale-102 motion-reduce:hover:scale-100 transform-gpu">
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