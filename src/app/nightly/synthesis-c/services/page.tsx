'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { services } from '@/data/services'
import * as Icons from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="space-y-32 synthesis-page-content">
      {/* Hero Section */}
      <section className="px-8 py-32 text-center" data-section="services-hero">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h1 
            className="text-5xl lg:text-6xl font-semibold bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent leading-tight synthesis-text-reveal"
            style={{ '--text-delay': '0ms' } as React.CSSProperties}
          >
            Services Built for Impact
          </motion.h1>
          
          <motion.p 
            className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto synthesis-text-reveal"
            style={{ '--text-delay': '200ms' } as React.CSSProperties}
          >
            Our comprehensive suite of services spans strategy, creative, technology, and growth. 
            Each offering is designed to deliver measurable results and lasting impact for your business.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-8 py-24 synthesis-scroll-reveal synthesis-card-grid" data-section="services-grid">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => {
              const IconComponent = Icons[service.icon as keyof typeof Icons] as any
              return (
                <motion.div
                  key={service.id}
                  className="synthesis-stagger-item"
                  style={{ '--stagger-delay': `${index * 50}ms` } as React.CSSProperties}
                  id={service.slug}
                >
                  <Card className="synthesis-card h-full group">
                    <CardHeader className="p-8">
                      <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600/30 transition-all duration-300">
                        {IconComponent && (
                          <IconComponent className="w-8 h-8 text-blue-400 synthesis-card-icon" />
                        )}
                      </div>
                      <CardTitle className="text-2xl font-semibold text-white leading-tight mb-4">
                        {service.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8 space-y-6">
                      <CardDescription className="text-slate-400 leading-relaxed text-base">
                        {service.blurb}
                      </CardDescription>
                      
                      <div className="space-y-4">
                        <h4 className="text-white font-medium">Key Capabilities:</h4>
                        <ul className="space-y-2">
                          {service.capabilities?.map((capability, capIndex) => (
                            <li key={capIndex} className="text-slate-300 text-sm flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                              {capability}
                            </li>
                          )) || [
                            <li key="default" className="text-slate-300 text-sm flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                              Strategic planning and execution
                            </li>
                          ]}
                        </ul>
                      </div>
                      
                      <div className="pt-4">
                        <Button 
                          asChild
                          className="synthesis-button w-full bg-transparent border border-blue-600/50 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 transition-all duration-300"
                        >
                          <Link href="/nightly/synthesis-c/contact">Learn More</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-8 py-24 text-center synthesis-scroll-reveal" data-section="services-cta">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h2 
            className="text-4xl font-semibold text-white synthesis-text-reveal"
            style={{ '--text-delay': '0ms' } as React.CSSProperties}
          >
            Ready to Get Started?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-300 leading-relaxed synthesis-text-reveal"
            style={{ '--text-delay': '200ms' } as React.CSSProperties}
          >
            Let&apos;s discuss how our services can drive your business forward.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center synthesis-stagger-item"
            style={{ '--stagger-delay': '400ms' } as React.CSSProperties}
          >
            <Button asChild className="synthesis-button bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              <Link href="/nightly/synthesis-c/contact">Start a Project</Link>
            </Button>
            <Button asChild className="synthesis-button bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 px-8 py-4 text-lg">
              <Link href="/nightly/synthesis-c/cases">View Our Work</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}