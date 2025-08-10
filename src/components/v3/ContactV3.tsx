'use client'

import { useState } from 'react'
import SectionV3 from './SectionV3'

export default function ContactV3() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submission (no backend):', formData)
    alert('Thank you for your message.')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <SectionV3
      id="contact"
      eyebrow="Get in Touch"
      title="Start Your Project"
      intro="Ready to create something extraordinary? Let's discuss your goals."
    >
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-600 mb-3">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-black focus:ring-0 focus:outline-none text-black placeholder-gray-400"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-600 mb-3">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-black focus:ring-0 focus:outline-none text-black placeholder-gray-400"
                placeholder="your.email@company.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm text-gray-600 mb-3">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-black focus:ring-0 focus:outline-none text-black placeholder-gray-400 resize-none"
              placeholder="Tell us about your project..."
            />
          </div>
          
          <div className="text-center pt-8">
            <button
              type="submit"
              className="px-12 py-4 bg-black text-white hover:bg-gray-800 transition-colors font-light tracking-wide"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </SectionV3>
  )
}