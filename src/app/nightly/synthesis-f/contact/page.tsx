'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Send, CheckCircle, MessageCircle, Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen pt-fibonacci-144">
      
      {/* Perfect Breadcrumb Navigation */}
      <div className="excellence-content-flow mb-fibonacci-89">
        <div className="col-start-2">
          <nav className="flex items-center space-x-fibonacci-13 text-fibonacci-sm text-slate-400">
            <Link 
              href="/nightly/synthesis-f"
              className="hover:text-excellence-blue-400 transition-colors duration-300 flex items-center space-x-fibonacci-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </nav>
        </div>
      </div>
      
      {/* Perfect Page Header */}
      <div className="excellence-content-flow mb-fibonacci-89">
        <div className="col-start-2 text-center">
          <h1 className="excellence-heading-hero mb-fibonacci-21">
            Get in Touch
          </h1>
          <div className="h-1 w-fibonacci-89 bg-gradient-to-r from-excellence-blue-600 to-excellence-blue-400 rounded-full mx-auto mb-fibonacci-34" />
          <p className="excellence-text-body max-w-3xl mx-auto text-slate-300">
            Ready to experience excellence without compromise? Let's start the conversation.
          </p>
        </div>
      </div>
      
      {/* Perfect Contact Layout */}
      <div className="excellence-content-flow mb-fibonacci-144">
        <div className="col-start-2">
          
          {isSubmitted ? (
            /* Success State with Perfect Animation */
            <div className="max-w-2xl mx-auto text-center">
              <div className="excellence-card p-fibonacci-55 animate-breathing">
                <CheckCircle className="w-fibonacci-89 h-fibonacci-89 text-green-400 mx-auto mb-fibonacci-34" />
                <h2 className="text-phi-xl font-semibold text-white mb-fibonacci-21">
                  Message Sent Successfully!
                </h2>
                <p className="text-slate-300 mb-fibonacci-34 leading-phi">
                  Thank you for reaching out. We'll get back to you within 24 hours with our excellence guarantee.
                </p>
                <Link
                  href="/nightly/synthesis-f"
                  className="excellence-button bg-excellence-blue-600 hover:bg-excellence-blue-500 text-white border-0 px-fibonacci-34 py-fibonacci-13"
                >
                  Return Home
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-fibonacci-55">
              
              {/* Perfect Contact Form */}
              <div className="lg:col-span-8">
                <form onSubmit={handleSubmit} className="space-y-fibonacci-34">
                  
                  {/* Form Fields with Mathematical Spacing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-fibonacci-21">
                    <div>
                      <label htmlFor="name" className="block text-fibonacci-sm font-medium text-slate-300 mb-fibonacci-8">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-fibonacci-21 py-fibonacci-13 bg-slate-800/40 border border-slate-700/50 rounded-fibonacci-8 text-white focus:outline-none focus:ring-2 focus:ring-excellence-blue-400 focus:border-transparent transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-fibonacci-sm font-medium text-slate-300 mb-fibonacci-8">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-fibonacci-21 py-fibonacci-13 bg-slate-800/40 border border-slate-700/50 rounded-fibonacci-8 text-white focus:outline-none focus:ring-2 focus:ring-excellence-blue-400 focus:border-transparent transition-all duration-300"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-fibonacci-sm font-medium text-slate-300 mb-fibonacci-8">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-fibonacci-21 py-fibonacci-13 bg-slate-800/40 border border-slate-700/50 rounded-fibonacci-8 text-white focus:outline-none focus:ring-2 focus:ring-excellence-blue-400 focus:border-transparent transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-fibonacci-sm font-medium text-slate-300 mb-fibonacci-8">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-fibonacci-21 py-fibonacci-13 bg-slate-800/40 border border-slate-700/50 rounded-fibonacci-8 text-white focus:outline-none focus:ring-2 focus:ring-excellence-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about your project or how we can help..."
                    />
                  </div>
                  
                  {/* Perfect Submit Button */}
                  <button
                    type="submit"
                    className="excellence-button bg-excellence-blue-600 hover:bg-excellence-blue-500 text-white border-0 px-fibonacci-34 py-fibonacci-13 group w-full md:w-auto"
                  >
                    <span className="flex items-center justify-center space-x-fibonacci-8">
                      <span>Send Message</span>
                      <Send className="w-fibonacci-13 h-fibonacci-13 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                  
                </form>
              </div>
              
              {/* Perfect Contact Information */}
              <div className="lg:col-span-4 space-y-fibonacci-34">
                
                <div className="excellence-card p-fibonacci-34">
                  <MessageCircle className="w-fibonacci-34 h-fibonacci-34 text-excellence-blue-400 mb-fibonacci-21" />
                  <h3 className="text-phi-lg font-semibold text-white mb-fibonacci-13">
                    Let's Talk
                  </h3>
                  <p className="text-slate-400 leading-phi text-fibonacci-sm">
                    Ready to experience what happens when equals come together? We're here to listen.
                  </p>
                </div>
                
                {/* Contact Methods */}
                <div className="space-y-fibonacci-21">
                  <div className="flex items-center space-x-fibonacci-13">
                    <div className="w-fibonacci-34 h-fibonacci-34 bg-excellence-blue-600/20 rounded-full flex items-center justify-center">
                      <Mail className="w-fibonacci-13 h-fibonacci-13 text-excellence-blue-400" />
                    </div>
                    <div>
                      <p className="text-fibonacci-sm text-slate-400">Email</p>
                      <p className="text-white">hello@paritee.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-fibonacci-13">
                    <div className="w-fibonacci-34 h-fibonacci-34 bg-excellence-blue-600/20 rounded-full flex items-center justify-center">
                      <Phone className="w-fibonacci-13 h-fibonacci-13 text-excellence-blue-400" />
                    </div>
                    <div>
                      <p className="text-fibonacci-sm text-slate-400">Phone</p>
                      <p className="text-white">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-fibonacci-13">
                    <div className="w-fibonacci-34 h-fibonacci-34 bg-excellence-blue-600/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-fibonacci-13 h-fibonacci-13 text-excellence-blue-400" />
                    </div>
                    <div>
                      <p className="text-fibonacci-sm text-slate-400">Global Network</p>
                      <p className="text-white">15+ markets worldwide</p>
                    </div>
                  </div>
                </div>
                
              </div>
              
            </div>
          )}
          
        </div>
      </div>
      
    </div>
  )
}