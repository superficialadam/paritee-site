'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, MessageCircle, Calendar, Users } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    filter: "blur(4px)" 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function ContactPage() {
  return (
    <div className="space-y-32">
      {/* Header Section */}
      <motion.section 
        className="px-4 py-20 sm:px-8 sm:py-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div className="mb-12" variants={itemVariants}>
            <Link 
              href="/nightly/synthesis-a"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          {/* Page Header */}
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight"
              variants={itemVariants}
            >
              Let&apos;s Talk
            </motion.h1>
            <motion.div 
              className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto"
              variants={itemVariants}
            />
            <motion.p 
              className="text-xl text-slate-300 leading-relaxed"
              variants={itemVariants}
            >
              Ready to end the compromise? Let&apos;s discuss how Paritee can deliver the impact you deserve.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Contact Options */}
      <motion.section 
        className="px-4 pb-20 sm:px-8 sm:pb-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            variants={containerVariants}
          >
            {/* Email Contact */}
            <motion.div variants={cardVariants}>
              <Card className="bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-blue-900/30 transition-all duration-500 hover:border-blue-600/40 hover:bg-slate-800/50 hover:-translate-y-2 motion-reduce:hover:-translate-y-0 hover:scale-[1.02] motion-reduce:hover:scale-100 transform-gpu text-center h-full">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-400/20 rounded-none flex items-center justify-center mx-auto mb-6 group-hover:from-blue-500/30 group-hover:to-blue-300/30 group-hover:scale-110 transition-all duration-400 transform-gpu">
                    <Mail className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">Email Us</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <CardDescription className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300 mb-4">
                    Start the conversation with a direct message to our team.
                  </CardDescription>
                  <Button className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 border border-blue-600/40 hover:border-blue-500/60 rounded-full px-6 py-2 text-sm transition-all duration-300">
                    hello@paritee.com
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Schedule Meeting */}
            <motion.div variants={cardVariants}>
              <Card className="bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-blue-900/30 transition-all duration-500 hover:border-blue-600/40 hover:bg-slate-800/50 hover:-translate-y-2 motion-reduce:hover:-translate-y-0 hover:scale-[1.02] motion-reduce:hover:scale-100 transform-gpu text-center h-full">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-400/20 rounded-none flex items-center justify-center mx-auto mb-6 group-hover:from-blue-500/30 group-hover:to-blue-300/30 group-hover:scale-110 transition-all duration-400 transform-gpu">
                    <Calendar className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">Schedule a Call</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <CardDescription className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300 mb-4">
                    Book time with our strategy team for a deep dive discussion.
                  </CardDescription>
                  <Button className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 border border-blue-600/40 hover:border-blue-500/60 rounded-full px-6 py-2 text-sm transition-all duration-300">
                    Book Meeting
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Consultation */}
            <motion.div variants={cardVariants}>
              <Card className="bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-blue-900/30 transition-all duration-500 hover:border-blue-600/40 hover:bg-slate-800/50 hover:-translate-y-2 motion-reduce:hover:-translate-y-0 hover:scale-[1.02] motion-reduce:hover:scale-100 transform-gpu text-center h-full">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-400/20 rounded-none flex items-center justify-center mx-auto mb-6 group-hover:from-blue-500/30 group-hover:to-blue-300/30 group-hover:scale-110 transition-all duration-400 transform-gpu">
                    <MessageCircle className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">Free Consultation</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <CardDescription className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300 mb-4">
                    Get expert insights tailored to your specific challenges.
                  </CardDescription>
                  <Button className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 border border-blue-600/40 hover:border-blue-500/60 rounded-full px-6 py-2 text-sm transition-all duration-300">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Team Introduction */}
            <motion.div variants={cardVariants}>
              <Card className="bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-blue-900/30 transition-all duration-500 hover:border-blue-600/40 hover:bg-slate-800/50 hover:-translate-y-2 motion-reduce:hover:-translate-y-0 hover:scale-[1.02] motion-reduce:hover:scale-100 transform-gpu text-center h-full">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-400/20 rounded-none flex items-center justify-center mx-auto mb-6 group-hover:from-blue-500/30 group-hover:to-blue-300/30 group-hover:scale-110 transition-all duration-400 transform-gpu">
                    <Users className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">Meet the Team</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <CardDescription className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300 mb-4">
                    Connect with our agency leaders and expert professionals.
                  </CardDescription>
                  <Button className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 border border-blue-600/40 hover:border-blue-500/60 rounded-full px-6 py-2 text-sm transition-all duration-300">
                    View Team
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main CTA */}
      <motion.section 
        className="px-4 py-20 sm:px-8 sm:py-32 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-slate-950 to-slate-950"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/3 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="lg:col-span-7">
              <motion.div className="space-y-8" variants={containerVariants}>
                <div>
                  <motion.h2 
                    className="text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6"
                    variants={itemVariants}
                  >
                    End the Compromise
                  </motion.h2>
                  <motion.div 
                    className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-8"
                    variants={itemVariants}
                  />
                </div>
                
                <motion.div className="space-y-6 max-w-2xl" variants={containerVariants}>
                  <motion.p 
                    className="text-xl text-slate-200 leading-relaxed font-medium"
                    variants={itemVariants}
                  >
                    You deserve better than the trade-offs you&apos;ve been forced to make.
                  </motion.p>
                  <motion.p 
                    className="text-lg text-slate-300 leading-relaxed"
                    variants={itemVariants}
                  >
                    Paritee brings together the best of both worlds: the scale and capabilities of large networks with the agility and care of boutique agencies. Our coalition of top-tier, advisory-led agencies is united by one principle.
                  </motion.p>
                  <motion.p 
                    className="text-xl text-blue-300 leading-relaxed font-medium"
                    variants={itemVariants}
                  >
                    You deserve better.
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Right Column - Actions */}
            <div className="lg:col-span-5">
              <motion.div className="space-y-8" variants={containerVariants}>
                <motion.div 
                  className="bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm rounded-none p-8 space-y-6"
                  variants={cardVariants}
                >
                  <h3 className="text-2xl font-semibold text-white mb-6">Ready to Start?</h3>
                  
                  <div className="space-y-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] motion-reduce:hover:scale-100 transform-gpu shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50">
                      Start a Conversation
                    </Button>
                    
                    <Button className="w-full bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-600/10 hover:border-blue-300 hover:text-blue-300 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] motion-reduce:hover:scale-100 transform-gpu">
                      Schedule a Meeting
                    </Button>
                    
                    <p className="text-sm text-slate-400 text-center mt-4">
                      Free consultation • No obligation • Fast response
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="text-center text-slate-400 text-sm"
                  variants={itemVariants}
                >
                  <p>Questions? Email us at <span className="text-blue-400 font-medium">hello@paritee.com</span></p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}