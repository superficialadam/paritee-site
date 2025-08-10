'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import Section from './Section'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submission (no backend):', formData)
    alert('Thank you for your message! (This is a prototype - no backend connected)')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Section
      eyebrow="Get in Touch"
      title="Start Your Project"
      intro="Ready to create something extraordinary? Let's discuss your goals and explore how we can help you achieve them."
    >
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md bg-background focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md bg-background focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                placeholder="your.email@company.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md bg-background focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-vertical"
              placeholder="Tell us about your project, goals, and how we can help..."
            />
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              Send Message
              <Send size={20} className="ml-2" />
            </button>
          </div>
        </form>
        
        <div className="mt-12 text-center space-y-4">
          <div className="text-sm text-muted-foreground">
            Prefer to reach out directly?
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm">
            <a href="mailto:hello@paritee.com" className="text-accent hover:text-accent/80 transition-colors">
              hello@paritee.com
            </a>
            <a href="tel:+15551234567" className="text-accent hover:text-accent/80 transition-colors">
              +1 (555) 123-4567
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}