'use client'

import Link from 'next/link'
import { ArrowLeft, Star, Zap } from 'lucide-react'
import { services } from '@/data/services'
import * as Icons from 'lucide-react'

export default function ServicesPage() {
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
            <span className="text-white">Services</span>
          </nav>
        </div>
      </div>
      
      {/* Perfect Page Header */}
      <div className="excellence-content-flow mb-fibonacci-89">
        <div className="col-start-2 text-center">
          <h1 className="excellence-heading-hero mb-fibonacci-21">
            Our Services
          </h1>
          <div className="h-1 w-fibonacci-89 bg-gradient-to-r from-excellence-blue-600 to-excellence-blue-400 rounded-full mx-auto mb-fibonacci-34" />
          <p className="excellence-text-body max-w-3xl mx-auto text-slate-300">
            Comprehensive solutions designed to accelerate your business transformation
          </p>
        </div>
      </div>
      
      {/* Perfect Services Grid */}
      <div className="excellence-content-flow mb-fibonacci-144">
        <div className="col-start-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fibonacci-34">
            {services.map((service, index) => {
              const IconComponent = Icons[service.icon as keyof typeof Icons] as any
              
              return (
                <div
                  key={service.id}
                  className="excellence-card group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-fibonacci-34">
                    <div className="w-fibonacci-55 h-fibonacci-55 bg-gradient-to-br from-excellence-blue-600/30 to-excellence-blue-400/30 rounded-fibonacci-8 flex items-center justify-center mb-fibonacci-21 group-hover:scale-110 transition-transform duration-300">
                      {IconComponent && <IconComponent className="w-fibonacci-34 h-fibonacci-34 text-excellence-blue-400" />}
                    </div>
                    <h3 className="text-phi-lg font-semibold text-white mb-fibonacci-13">
                      {service.name}
                    </h3>
                    <p className="text-slate-400 leading-phi text-fibonacci-sm">
                      {service.blurb}
                    </p>
                  </div>
                  
                  {/* Excellence Indicator */}
                  <div className="absolute top-fibonacci-8 right-fibonacci-8">
                    <Star className="w-fibonacci-13 h-fibonacci-13 text-excellence-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Perfect CTA Section */}
      <div className="excellence-content-flow mb-fibonacci-89">
        <div className="col-start-2 text-center">
          <div className="bg-excellence-blue-600/5 border border-excellence-blue-600/20 backdrop-blur-sm rounded-fibonacci-21 p-fibonacci-55 max-w-3xl mx-auto">
            <Zap className="w-fibonacci-55 h-fibonacci-55 text-excellence-blue-400 mx-auto mb-fibonacci-21" />
            <h2 className="text-phi-xl font-semibold text-white mb-fibonacci-21">
              Ready to Transform Your Business?
            </h2>
            <p className="text-slate-300 mb-fibonacci-34 leading-phi">
              Let's discuss how our services can accelerate your growth
            </p>
            <Link
              href="/nightly/synthesis-f/contact"
              className="excellence-button bg-excellence-blue-600 hover:bg-excellence-blue-500 text-white border-0 px-fibonacci-34 py-fibonacci-13"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  )
}