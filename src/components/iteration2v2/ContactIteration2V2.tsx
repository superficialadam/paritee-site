'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ContactIteration2V2() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <div className="eyebrow">Get in Touch</div>
          <h2 className="section-title text-white">
            Let's Talk
          </h2>
        </div>
        
        <div className="grid grid-2 gap-16">
          {/* Contact Form */}
          <div className="fade-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-rgba(255,255,255,0.05) border border-rgba(255,255,255,0.1) rounded-lg text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37] transition-colors backdrop-blur-sm"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-rgba(255,255,255,0.05) border border-rgba(255,255,255,0.1) rounded-lg text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37] transition-colors backdrop-blur-sm"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-rgba(255,255,255,0.05) border border-rgba(255,255,255,0.1) rounded-lg text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37] transition-colors backdrop-blur-sm resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#D4AF37] text-[#0E2756] font-semibold rounded-lg hover:bg-[#E6C547] transition-colors flex items-center justify-center"
              >
                <Send size={20} className="mr-2" />
                Send Message
              </button>
            </form>
          </div>
          
          {/* Office Info */}
          <div className="fade-up">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Global Offices
                </h3>
                <div className="space-y-6 text-[#94A3B8]">
                  <div>
                    <div className="font-medium text-[#D4AF37] mb-1">New York</div>
                    <div className="text-sm">
                      123 Madison Avenue<br />
                      New York, NY 10016<br />
                      +1 (555) 123-4567
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium text-[#D4AF37] mb-1">London</div>
                    <div className="text-sm">
                      45 Regent Street<br />
                      London W1B 4LR<br />
                      +44 20 7123 4567
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium text-[#D4AF37] mb-1">Berlin</div>
                    <div className="text-sm">
                      Unter den Linden 20<br />
                      10117 Berlin<br />
                      +49 30 123 456
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}