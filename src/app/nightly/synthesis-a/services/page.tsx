'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { services } from '@/data/services'
import * as Icons from 'lucide-react'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronRight } from 'lucide-react'

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

export default function ServicesPage() {
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
              What We Do
            </motion.h1>
            <motion.div 
              className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto"
              variants={itemVariants}
            />
            <motion.p 
              className="text-xl text-slate-300 leading-relaxed"
              variants={itemVariants}
            >
              Comprehensive strategies. Sharp execution. Transformative results across every discipline that drives business growth.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section 
        className="px-4 pb-20 sm:px-8 sm:pb-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {services.map((service, index) => {
              const IconComponent = Icons[service.icon as keyof typeof Icons] as any
              return (
                <motion.div key={service.id} variants={cardVariants}>
                  <Card className="bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-blue-900/30 transition-all duration-500 hover:border-blue-600/40 hover:bg-slate-800/50 hover:-translate-y-2 motion-reduce:hover:-translate-y-0 hover:scale-[1.02] motion-reduce:hover:scale-100 transform-gpu h-full">
                    <CardHeader className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-400/20 rounded-none flex items-center justify-center mb-6 group-hover:from-blue-500/30 group-hover:to-blue-300/30 group-hover:scale-110 transition-all duration-400 transform-gpu">
                        {IconComponent && <IconComponent className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />}
                      </div>
                      <CardTitle className="text-xl font-semibold text-white group-hover:text-blue-100 transition-colors duration-300 leading-tight">{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8 space-y-4">
                      <CardDescription className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{service.blurb}</CardDescription>
                      
                      {service.description && (
                        <CardDescription className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors duration-300 border-t border-slate-700/30 pt-4">
                          {service.description}
                        </CardDescription>
                      )}
                    </CardContent>
                    
                    {/* Hover Accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
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

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-8"
            variants={itemVariants}
          >
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-300 leading-relaxed mb-12 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Let&apos;s discuss how our comprehensive services can drive your next breakthrough. No compromise. Just better results.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={itemVariants}
          >
            <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 motion-reduce:hover:scale-100 transform-gpu shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 group">
              <Link href="/nightly/synthesis-a/contact" className="flex items-center space-x-2">
                <span>Start a Conversation</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button asChild className="bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-600/10 hover:border-blue-300 hover:text-blue-300 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 motion-reduce:hover:scale-100 transform-gpu group">
              <Link href="/nightly/synthesis-a/cases" className="flex items-center space-x-2">
                <span>View Our Work</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}