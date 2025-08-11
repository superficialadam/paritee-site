'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, Award } from 'lucide-react'
import { cases } from '@/data/cases'

export default function CasesPage() {
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
            <span className="text-white">Cases</span>
          </nav>
        </div>
      </div>
      
      {/* Perfect Page Header */}
      <div className="excellence-content-flow mb-fibonacci-89">
        <div className="col-start-2 text-center">
          <h1 className="excellence-heading-hero mb-fibonacci-21">
            Our Work
          </h1>
          <div className="h-1 w-fibonacci-89 bg-gradient-to-r from-excellence-blue-600 to-excellence-blue-400 rounded-full mx-auto mb-fibonacci-34" />
          <p className="excellence-text-body max-w-3xl mx-auto text-slate-300">
            Where bold thinking meets flawless execution. Every project tells a story of transformation.
          </p>
        </div>
      </div>
      
      {/* Perfect Cases Grid */}
      <div className="excellence-content-flow mb-fibonacci-144">
        <div className="col-start-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fibonacci-34">
            {cases.map((caseItem, index) => (
              <div
                key={caseItem.id}
                className="excellence-card overflow-hidden group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image 
                    src={caseItem.thumbnail} 
                    alt={caseItem.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Perfect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Excellence Badge */}
                  <div className="absolute top-fibonacci-8 right-fibonacci-8">
                    <Award className="w-fibonacci-21 h-fibonacci-21 text-excellence-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Hover Content */}
                  <div className="absolute inset-0 flex items-end p-fibonacci-21 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white">
                      <div className="w-fibonacci-34 h-1 bg-excellence-blue-400 rounded-full mb-fibonacci-8" />
                      <p className="text-fibonacci-sm text-excellence-blue-200 font-medium">Case Study</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-fibonacci-21">
                  <h3 className="text-phi-lg font-semibold text-white group-hover:text-excellence-blue-100 transition-colors duration-300 mb-fibonacci-8">
                    {caseItem.name}
                  </h3>
                  <p className="text-slate-400 leading-phi text-fibonacci-sm group-hover:text-slate-300 transition-colors duration-300">
                    {caseItem.excerpt}
                  </p>
                </div>
                
                {/* Perfect Bottom Accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-excellence-blue-600 to-excellence-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Perfect CTA Section */}
      <div className="excellence-content-flow mb-fibonacci-89">
        <div className="col-start-2 text-center">
          <div className="bg-excellence-blue-600/5 border border-excellence-blue-600/20 backdrop-blur-sm rounded-fibonacci-21 p-fibonacci-55 max-w-3xl mx-auto">
            <ExternalLink className="w-fibonacci-55 h-fibonacci-55 text-excellence-blue-400 mx-auto mb-fibonacci-21" />
            <h2 className="text-phi-xl font-semibold text-white mb-fibonacci-21">
              Ready for Your Success Story?
            </h2>
            <p className="text-slate-300 mb-fibonacci-34 leading-phi">
              Let's create something exceptional together
            </p>
            <Link
              href="/nightly/synthesis-f/contact"
              className="excellence-button bg-excellence-blue-600 hover:bg-excellence-blue-500 text-white border-0 px-fibonacci-34 py-fibonacci-13"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  )
}