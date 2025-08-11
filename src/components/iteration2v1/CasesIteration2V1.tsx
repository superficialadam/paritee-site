'use client'

import Image from 'next/image'
import { cases } from '@/data/cases'

export default function CasesIteration2V1() {
  return (
    <section id="cases" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <div className="eyebrow">Portfolio</div>
          <h2 className="section-title text-white">
            Our Work
          </h2>
        </div>
        
        <div className="grid grid-3">
          {cases.map((caseItem, index) => (
            <div 
              key={caseItem.id}
              className="card card-small p-0 overflow-hidden fade-up"
              style={{ '--stagger-delay': index } as React.CSSProperties}
            >
              <div className="aspect-video overflow-hidden bg-[#1A3A6B]">
                <Image
                  src={caseItem.thumbnail}
                  alt={caseItem.name}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <h3 className="card-title text-white mb-3 text-sm">
                  {caseItem.name}
                </h3>
                
                <p className="text-[#94A3B8] text-xs leading-relaxed mb-4">
                  {caseItem.excerpt}
                </p>
                
                <button className="text-[#D4AF37] text-xs font-medium hover:text-white transition-colors">
                  Read Full Case →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}