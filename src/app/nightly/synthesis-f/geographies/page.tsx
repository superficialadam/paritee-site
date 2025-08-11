'use client'

import Link from 'next/link'
import { ArrowLeft, Compass } from 'lucide-react'

export default function AgenciesPage() {
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
            <span className="text-white">Agencies</span>
          </nav>
        </div>
      </div>
      
      {/* Perfect Page Header */}
      <div className="excellence-content-flow mb-fibonacci-89">
        <div className="col-start-2 text-center">
          <h1 className="excellence-heading-hero mb-fibonacci-21">
            Our Agencies
          </h1>
          <div className="h-1 w-fibonacci-89 bg-gradient-to-r from-excellence-blue-600 to-excellence-blue-400 rounded-full mx-auto mb-fibonacci-34" />
          <p className="excellence-text-body max-w-3xl mx-auto text-slate-300">
            Excellence in progress - this page is being crafted with the same attention to detail as the rest of our platform.
          </p>
        </div>
      </div>
      
      {/* Perfect Coming Soon */}
      <div className="excellence-content-flow mb-fibonacci-144">
        <div className="col-start-2 text-center">
          <div className="excellence-card p-fibonacci-55 max-w-2xl mx-auto">
            <Compass className="w-fibonacci-89 h-fibonacci-89 text-excellence-blue-400 mx-auto mb-fibonacci-34 animate-breathing" />
            <h2 className="text-phi-xl font-semibold text-white mb-fibonacci-21">
              Crafting Excellence
            </h2>
            <p className="text-slate-300 mb-fibonacci-34 leading-phi">
              This section is currently being developed with the same obsessive attention to detail that defines everything we do.
            </p>
            <Link
              href="/nightly/synthesis-f"
              className="excellence-button bg-excellence-blue-600 hover:bg-excellence-blue-500 text-white border-0 px-fibonacci-34 py-fibonacci-13"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  )
}