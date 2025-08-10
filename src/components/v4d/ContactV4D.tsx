'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

export default function ContactV4D() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    budget: '',
    timeline: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="gallery-container">
      {/* Section Header */}
      <div className="text-center mb-16 fade-up">
        <div className="gallery-eyebrow mb-4">
          Start Your Journey
        </div>
        <h2 className="section-title display-font text-black mb-6">
          Let's Curate Something Extraordinary
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Whether you're looking to elevate your brand or join our network of exceptional agencies, 
          we're here to begin the conversation.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div className="fade-up">
          <div className="gallery-card p-10">
            <h3 className="card-title display-font text-black mb-8">
              Tell Us About Your Vision
            </h3>
            
            {isSubmitted ? (
              <div className="text-center py-16">
                <CheckCircle size={64} className="text-green-600 mx-auto mb-6" />
                <h4 className="card-title display-font text-black mb-4">
                  Message Received
                </h4>
                <p className="text-gray-600">
                  Thank you for reaching out. We'll be in touch within 24 hours to discuss your project.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-600 focus:outline-none transition-colors duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-600 focus:outline-none transition-colors duration-300"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-600 focus:outline-none transition-colors duration-300"
                    placeholder="Your Company Name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-600 focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select Budget</option>
                      <option value="under-50k">Under $50K</option>
                      <option value="50k-100k">$50K - $100K</option>
                      <option value="100k-250k">$100K - $250K</option>
                      <option value="250k-500k">$250K - $500K</option>
                      <option value="over-500k">Over $500K</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-600 focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select Timeline</option>
                      <option value="urgent">ASAP</option>
                      <option value="1-2-months">1-2 Months</option>
                      <option value="3-6-months">3-6 Months</option>
                      <option value="6-plus-months">6+ Months</option>
                      <option value="ongoing">Ongoing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-600 focus:outline-none resize-vertical transition-colors duration-300"
                    placeholder="Tell us about your project, goals, and how we can help you achieve them..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-black text-white font-medium hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  Send Message
                  <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="fade-up">
          <div className="space-y-12">
            {/* Office Locations */}
            <div>
              <h3 className="card-title display-font text-black mb-8">
                Our Gallery Locations
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4 p-6 border border-gray-200 hover:border-yellow-300 transition-colors duration-300">
                  <MapPin size={20} className="text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-black mb-2">New York (Headquarters)</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      432 Park Avenue, Suite 1200<br />
                      New York, NY 10016<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 border border-gray-200 hover:border-yellow-300 transition-colors duration-300">
                  <MapPin size={20} className="text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-black mb-2">London</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      25 Old Bond Street<br />
                      Mayfair, London W1S 4QB<br />
                      United Kingdom
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 border border-gray-200 hover:border-yellow-300 transition-colors duration-300">
                  <MapPin size={20} className="text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-black mb-2">Los Angeles</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      8484 Wilshire Boulevard, Suite 745<br />
                      Beverly Hills, CA 90211<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div>
              <h3 className="card-title display-font text-black mb-8">
                Get in Touch
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail size={20} className="text-yellow-600" />
                  <div>
                    <p className="font-medium text-black">General Inquiries</p>
                    <a href="mailto:hello@paritee.com" className="text-gray-600 hover:text-yellow-600 transition-colors">
                      hello@paritee.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Phone size={20} className="text-yellow-600" />
                  <div>
                    <p className="font-medium text-black">Direct Line</p>
                    <a href="tel:+1-555-GALLERY" className="text-gray-600 hover:text-yellow-600 transition-colors">
                      +1 (555) GALLERY
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="p-8 bg-yellow-50 border border-yellow-200">
              <h4 className="font-medium text-black mb-4">Our Commitment</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                We respond to all inquiries within 24 hours. For urgent matters, 
                please call our direct line. Our gallery specialists are standing by 
                to discuss your project and match you with the perfect creative partner.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}