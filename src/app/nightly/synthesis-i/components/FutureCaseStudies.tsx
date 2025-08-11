'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Brain, Zap, Eye, Sparkles } from 'lucide-react'

interface FutureCaseStudiesProps {
  aiPersonality: any
  userProfile: any
}

export function FutureCaseStudies({ aiPersonality, userProfile }: FutureCaseStudiesProps) {
  const [selectedCase, setSelectedCase] = useState(0)

  const cases = [
    {
      title: "Quantum-Enhanced E-commerce Platform",
      client: "Future Retail Corp",
      technology: "Quantum UX Optimization + AI Personalization",
      results: "300% conversion increase through quantum A/B testing",
      description: "Revolutionary shopping experience that uses quantum superposition to test multiple layouts simultaneously, with AI predicting user preferences before they know them.",
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      title: "WebGPU Creative Collaboration Suite",
      client: "Global Design Agency",
      technology: "WebGPU Compute Shaders + Real-time Collaboration",
      results: "60x performance improvement in creative workflows",
      description: "GPU-accelerated design tools that enable real-time collaboration between human designers and AI creative partners across multiple time zones.",
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "Spatial Computing Medical Interface",
      client: "HealthTech Innovations",
      technology: "AR/VR + Gesture Recognition + AI Analysis",
      results: "90% reduction in diagnostic time with spatial data visualization",
      description: "Immersive medical interface that allows doctors to manipulate 3D patient data in mixed reality while AI provides real-time diagnostic insights.",
      icon: <Eye className="w-6 h-6" />
    }
  ]

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Case Study Selector */}
      <div className="space-y-6">
        {cases.map((caseStudy, index) => (
          <motion.div
            key={index}
            onClick={() => setSelectedCase(index)}
            className={`p-6 rounded-xl border cursor-pointer transition-all ${
              selectedCase === index
                ? 'bg-blue-600/20 border-blue-500/50 shadow-lg shadow-blue-500/20'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${
                selectedCase === index ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-gray-400'
              }`}>
                {caseStudy.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">{caseStudy.title}</h3>
                <p className="text-blue-400 text-sm mb-2">{caseStudy.client}</p>
                <p className="text-gray-300 text-sm">{caseStudy.technology}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Case Study Details */}
      <motion.div
        key={selectedCase}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-white/10"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            {cases[selectedCase].title}
          </h2>
          <div className="flex items-center gap-2 text-green-400 mb-4">
            <Zap className="w-4 h-4" />
            <span className="font-semibold">{cases[selectedCase].results}</span>
          </div>
          <p className="text-gray-300 leading-relaxed">
            {cases[selectedCase].description}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-blue-400 mb-2">Technologies Used</h4>
            <p className="text-gray-300 text-sm">{cases[selectedCase].technology}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-blue-400 mb-2">AI Enhancement</h4>
            <p className="text-gray-300 text-sm">
              Enhanced with {aiPersonality.name || 'AI'} creative collaboration, providing 
              real-time insights and optimization suggestions throughout the project.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}