'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Send, Mail, Phone, MapPin, Clock, Shield, Zap, Database } from 'lucide-react'

export default function ContactV4C() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitStatus('success')
    setIsSubmitting(false)
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        company: '',
        project: '',
        message: ''
      })
      setSubmitStatus('idle')
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'EMAIL_ADDRESS',
      value: 'connect@paritee.com',
      subtext: 'Primary communication channel',
      color: 'text-red-400'
    },
    {
      icon: Phone,
      label: 'DIRECT_LINE',
      value: '+1 (555) 123-4567',
      subtext: 'Available 9AM-6PM EST',
      color: 'text-blue-400'
    },
    {
      icon: MapPin,
      label: 'HEADQUARTERS',
      value: 'New York, NY',
      subtext: 'Global operations center',
      color: 'text-green-400'
    },
    {
      icon: Clock,
      label: 'RESPONSE_TIME',
      value: '< 24 Hours',
      subtext: 'Average first response',
      color: 'text-yellow-400'
    }
  ]

  const projectTypes = [
    'STRATEGIC_CONSULTING',
    'CREATIVE_DEVELOPMENT',
    'DIGITAL_TRANSFORMATION',
    'DATA_ANALYTICS',
    'PERFORMANCE_OPTIMIZATION',
    'SYSTEM_INTEGRATION'
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden" id="contact">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-slate-900/50"></div>
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ff0000' stroke-width='1'%3E%3Cpath d='M50 0v100M0 50h100' opacity='0.1'/%3E%3Ccircle cx='50' cy='50' r='20' opacity='0.1'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <div className="container max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-red-400 text-sm font-mono tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            INITIALIZE_CONNECTION
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-mono tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            CONTACT_US
          </motion.h2>
          
          <motion.p
            className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Ready to transform your business through creative intelligence? 
            Initiate contact and let's engineer breakthrough performance together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div
              className="bg-slate-900/40 border border-red-500/30 p-8 backdrop-blur-sm"
              variants={itemVariants}
            >
              {/* Form Header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold font-mono text-white">TRANSMISSION_FORM</h3>
                <div className="flex items-center space-x-2">
                  <Shield size={16} className="text-green-400" />
                  <span className="text-xs font-mono text-green-400">SECURED</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Name Field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-mono text-slate-300 mb-2 tracking-wider">
                      NAME_INPUT*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800/50 border border-slate-600 focus:border-red-400 text-white p-3 font-mono text-sm focus:outline-none transition-colors duration-300"
                      placeholder="Enter designation"
                    />
                  </motion.div>

                  {/* Email Field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-mono text-slate-300 mb-2 tracking-wider">
                      EMAIL_PROTOCOL*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800/50 border border-slate-600 focus:border-red-400 text-white p-3 font-mono text-sm focus:outline-none transition-colors duration-300"
                      placeholder="user@domain.com"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Company Field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-mono text-slate-300 mb-2 tracking-wider">
                      ORGANIZATION
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800/50 border border-slate-600 focus:border-blue-400 text-white p-3 font-mono text-sm focus:outline-none transition-colors duration-300"
                      placeholder="Company identifier"
                    />
                  </motion.div>

                  {/* Project Type */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-mono text-slate-300 mb-2 tracking-wider">
                      PROJECT_TYPE
                    </label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800/50 border border-slate-600 focus:border-blue-400 text-white p-3 font-mono text-sm focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select module</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </motion.div>
                </div>

                {/* Message Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-mono text-slate-300 mb-2 tracking-wider">
                    MESSAGE_CONTENT*
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full bg-slate-800/50 border border-slate-600 focus:border-red-400 text-white p-3 font-mono text-sm focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Describe your project requirements, objectives, and success metrics..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className={`group relative w-full overflow-hidden py-4 px-8 font-mono text-sm tracking-widest uppercase transition-all duration-300 ${
                      submitStatus === 'success' 
                        ? 'bg-green-600 text-white' 
                        : isSubmitting 
                          ? 'bg-yellow-600 text-white' 
                          : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      {submitStatus === 'success' ? (
                        <>
                          <Shield size={16} />
                          <span>TRANSMISSION_SUCCESSFUL</span>
                        </>
                      ) : isSubmitting ? (
                        <>
                          <Database size={16} className="animate-spin" />
                          <span>TRANSMITTING_DATA...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>TRANSMIT_MESSAGE</span>
                        </>
                      )}
                    </span>
                    {!isSubmitting && submitStatus !== 'success' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                    )}
                  </motion.button>
                </motion.div>
              </form>

              {/* Form Footer */}
              <motion.div
                className="mt-6 pt-6 border-t border-slate-700 text-xs font-mono text-slate-400"
                variants={itemVariants}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Zap size={12} className="text-green-400" />
                  <span>Response time: &lt; 24 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield size={12} className="text-blue-400" />
                  <span>All transmissions encrypted and secured</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-6"
          >
            
            {/* Contact Cards */}
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <motion.div
                  key={info.label}
                  className="group bg-slate-900/30 border border-slate-700 hover:border-slate-600 p-6 transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <motion.div
                      className="p-3 bg-slate-800/50 border border-slate-600 group-hover:border-current transition-colors duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      <IconComponent size={20} className={`${info.color} transition-colors duration-300`} />
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="text-xs font-mono text-slate-400 tracking-wider mb-1">
                        {info.label}
                      </div>
                      <div className={`text-lg font-bold font-mono ${info.color} mb-1`}>
                        {info.value}
                      </div>
                      <div className="text-sm text-slate-300">
                        {info.subtext}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* System Status Panel */}
            <motion.div
              className="bg-slate-900/40 border border-green-500/30 p-6"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-mono font-bold text-white">SYSTEM_STATUS</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs font-mono text-green-400">OPERATIONAL</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'COMMUNICATION_CHANNELS', status: 'ONLINE', value: '100%' },
                  { label: 'RESPONSE_SYSTEMS', status: 'ACTIVE', value: '99.7%' },
                  { label: 'PROJECT_PIPELINE', status: 'READY', value: '94.2%' },
                  { label: 'TEAM_AVAILABILITY', status: 'HIGH', value: '87.5%' }
                ].map((item, index) => (
                  <div key={item.label} className="flex justify-between items-center text-sm font-mono">
                    <span className="text-slate-300">{item.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">{item.status}</span>
                      <span className="text-white">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Connect */}
            <motion.div
              className="bg-slate-900/30 border border-blue-500/30 p-6"
              variants={itemVariants}
            >
              <h4 className="font-mono font-bold text-white mb-4">QUICK_CONNECT</h4>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 font-mono text-xs tracking-widest uppercase transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  SCHEDULE_CALL
                </motion.button>
                <motion.button
                  className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 font-mono text-xs tracking-widest uppercase transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  URGENT_REQUEST
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}