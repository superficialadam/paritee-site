import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function GeographiesPage() {
  return (
    <div className="px-4 py-20 sm:px-8 sm:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <Link 
          href="/nightly/synthesis-a"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 group mb-12"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Home</span>
        </Link>
        
        <h1 className="text-4xl sm:text-5xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-8">
          Our Footprint
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-8" />
        <p className="text-xl text-slate-300 leading-relaxed">
          Global presence with local expertise.
        </p>
      </div>
    </div>
  )
}