'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react'

const ContactV4B = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-2%', '2%'])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'EMAIL',
      value: 'hello@paritee.com',
      link: 'mailto:hello@paritee.com'
    },
    {
      icon: Phone,
      label: 'PHONE',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'HEADQUARTERS',
      value: 'New York City, NY',
      link: '#'
    }
  ]

  return (
    <motion.section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-black"
      id="contact"
      style={{ y: backgroundY }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-bl from-red-600/15 to-transparent" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="mb-24 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="text-red-600 font-black text-sm tracking-[0.5em] mb-8 block">
            GET IN TOUCH
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-tight mb-8">
            Let's Create
            <br />
            <span className="text-red-600">Something Bold</span>
          </h2>
          <p className="text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            Ready to architect your next creative breakthrough? Let's transform your vision into reality.
          </p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-20">
          
          {/* Contact Form */}
          <motion.div
            className="mb-16 lg:mb-0"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="border border-white/10 p-12 hover:border-red-600/50 transition-colors duration-700">
              <h3 className="text-3xl font-black text-white mb-8">
                Start Your Project
              </h3>

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-white font-bold text-sm tracking-wider mb-3">
                      NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent border-b-2 border-white/30 focus:border-red-600 text-white py-3 px-0 text-lg font-medium placeholder-white/40 transition-colors duration-500 focus:outline-none"
                      placeholder="Your Name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-white font-bold text-sm tracking-wider mb-3">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent border-b-2 border-white/30 focus:border-red-600 text-white py-3 px-0 text-lg font-medium placeholder-white/40 transition-colors duration-500 focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>

                {/* Company */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-white font-bold text-sm tracking-wider mb-3">
                    COMPANY
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b-2 border-white/30 focus:border-red-600 text-white py-3 px-0 text-lg font-medium placeholder-white/40 transition-colors duration-500 focus:outline-none"
                    placeholder="Your Company"
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-white font-bold text-sm tracking-wider mb-3">
                    MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full bg-transparent border-2 border-white/30 focus:border-red-600 text-white py-4 px-4 text-lg font-medium placeholder-white/40 transition-colors duration-500 focus:outline-none resize-none"
                    placeholder="Tell us about your project..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <button
                    type="submit"
                    className="group bg-red-600 hover:bg-white text-white hover:text-black px-12 py-4 font-black text-lg tracking-wider transition-all duration-700 relative overflow-hidden w-full sm:w-auto flex items-center justify-center space-x-3"
                  >
                    <span className="relative z-10">SEND MESSAGE</span>
                    <Send size={20} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            
            {/* Contact Methods */}
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.link}
                  className="group block border border-white/10 hover:border-red-600 hover:bg-red-600 p-8 transition-all duration-700"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                >
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <info.icon 
                        size={32} 
                        className="text-red-600 group-hover:text-white transition-colors duration-700" 
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-white/60 group-hover:text-black/60 text-sm font-bold tracking-wider mb-2 transition-colors duration-700">
                        {info.label}
                      </div>
                      <div className="text-white group-hover:text-black text-xl font-black transition-colors duration-700">
                        {info.value}
                      </div>
                    </div>

                    <ArrowRight 
                      size={24} 
                      className="text-white/40 group-hover:text-black group-hover:translate-x-2 transition-all duration-500" 
                    />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Office Hours */}
            <motion.div
              className="border border-white/10 p-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <h4 className="text-red-600 font-black text-sm tracking-wider mb-4">
                OFFICE HOURS
              </h4>
              <div className="space-y-2 text-white/80">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-bold">9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Weekend</span>
                  <span className="font-bold">Emergency Only</span>
                </div>
              </div>
            </motion.div>

            {/* Global Network */}
            <motion.div
              className="border border-white/10 p-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-red-600 font-black text-sm tracking-wider mb-4">
                GLOBAL NETWORK
              </h4>
              <div className="grid grid-cols-2 gap-4 text-white/80">
                <div>New York</div>
                <div>London</div>
                <div>Los Angeles</div>
                <div>Berlin</div>
                <div>Tokyo</div>
                <div>Sydney</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Large Background Typography */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.02 }}
          transition={{ duration: 2, delay: 2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-[8vw] font-black text-white leading-none tracking-tighter">
            CONTACT
          </h3>
        </motion.div>

        {/* Asymmetric Decorative Elements */}
        <motion.div
          className="absolute top-32 right-16 w-32 h-32 border-4 border-red-600/20 transform -rotate-12"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          viewport={{ once: true }}
        />
        
        <motion.div
          className="absolute bottom-32 left-12 w-20 h-20 bg-white/5 transform rotate-45"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 3 }}
          viewport={{ once: true }}
        />

        {/* Glitch Effect Typography */}
        <motion.div
          className="absolute top-1/4 left-8 text-white/5 font-black text-6xl tracking-wider transform rotate-90 origin-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.1, 0, 0.1, 0.05] }}
          transition={{ duration: 3, delay: 3.5 }}
          viewport={{ once: true }}
        >
          BOLD
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-16 text-red-600/10 font-black text-5xl tracking-wider transform -rotate-45 origin-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.2, 0, 0.2, 0.1] }}
          transition={{ duration: 2.5, delay: 4 }}
          viewport={{ once: true }}
        >
          CREATE
        </motion.div>
      </div>
    </motion.section>
  )
}

export default ContactV4B