'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Layout, 
  Palette, 
  Users, 
  Zap, 
  MousePointer, 
  Gauge,
  Shapes,
  Waves,
  Target,
  Award,
  Eye,
  Cpu,
  CheckCircle2,
  ExternalLink,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react'

interface Version {
  id: string
  path: string
  title: string
  phase: string
  specialist: string
  description: string
  features: string[]
  icon: any
  status: 'completed' | 'in_progress' | 'planned'
  color: string
}

const versions: Version[] = [
  {
    id: 'base',
    path: '/nightly/base',
    title: 'Base Implementation',
    phase: 'Phase 1',
    specialist: 'Foundation',
    description: 'Core implementation following sitemap structure with Design System D',
    features: ['Design System D', 'Complete Navigation', 'Responsive Layout', 'Filter System'],
    icon: Layout,
    status: 'completed',
    color: 'bg-slate-600/20 border-slate-600/40 text-slate-300'
  },
  {
    id: 'design-a',
    path: '/nightly/design-a',
    title: 'Layout Optimization',
    phase: 'Phase 2',
    specialist: 'Designer A',
    description: 'Conservative approach emphasizing readability and structured layouts',
    features: ['Golden Ratio Grids', 'Enhanced Typography', 'Structured Cards', 'Clear Hierarchy'],
    icon: Layout,
    status: 'completed',
    color: 'bg-blue-600/20 border-blue-600/40 text-blue-300'
  },
  {
    id: 'design-b',
    path: '/nightly/design-b',
    title: 'Visual Impact',
    phase: 'Phase 2', 
    specialist: 'Designer B',
    description: 'Experimental approach pushing visual boundaries with striking presentation',
    features: ['Bold Visuals', 'Asymmetric Layouts', 'Creative Gradients', 'Impact Cards'],
    icon: Palette,
    status: 'completed',
    color: 'bg-blue-600/20 border-blue-600/40 text-blue-300'
  },
  {
    id: 'design-c',
    path: '/nightly/design-c',
    title: 'User-Centered Design',
    phase: 'Phase 2',
    specialist: 'Designer C',
    description: 'UX-focused approach optimizing for accessibility and mobile-first design',
    features: ['Mobile-First', 'Accessibility', 'Touch-Friendly', 'Skip Navigation'],
    icon: Users,
    status: 'completed',
    color: 'bg-blue-600/20 border-blue-600/40 text-blue-300'
  },
  {
    id: 'motion-a',
    path: '/nightly/motion-a',
    title: 'Smooth Transitions',
    phase: 'Phase 3',
    specialist: 'Motion Designer A',
    description: 'Elegant, understated motion that enhances usability with refined timing',
    features: ['Framer Motion', 'Refined Easing', 'Staggered Reveals', 'Professional Polish'],
    icon: Zap,
    status: 'completed',
    color: 'bg-emerald-600/20 border-emerald-600/40 text-emerald-300'
  },
  {
    id: 'motion-b',
    path: '/nightly/motion-b',
    title: 'Dynamic Interactions',
    phase: 'Phase 3',
    specialist: 'Motion Designer B',
    description: 'Engaging user feedback with playful hover states and scroll animations',
    features: ['Scroll Progress', 'Spring Physics', 'Parallax Effects', 'Dynamic Hovers'],
    icon: MousePointer,
    status: 'completed',
    color: 'bg-emerald-600/20 border-emerald-600/40 text-emerald-300'
  },
  {
    id: 'motion-c',
    path: '/nightly/motion-c',
    title: 'Performance-First',
    phase: 'Phase 3',
    specialist: 'Motion Designer C',
    description: 'Optimized, lightweight animations working smoothly across all devices',
    features: ['GPU Acceleration', '60fps Performance', 'CSS-Only Animations', 'Battery Optimization'],
    icon: Gauge,
    status: 'completed',
    color: 'bg-emerald-600/20 border-emerald-600/40 text-emerald-300'
  },
  {
    id: 'canvas-a',
    path: '/nightly/canvas-a',
    title: 'Geometric Patterns',
    phase: 'Phase 4',
    specialist: 'Creative Coder A',
    description: 'Clean, mathematical compositions with structured grid-based generative elements',
    features: ['P5.js Canvas', 'Geometric Grids', 'Mathematical Spirals', 'Interactive Patterns'],
    icon: Shapes,
    status: 'completed',
    color: 'bg-amber-600/20 border-amber-600/40 text-amber-300'
  },
  {
    id: 'canvas-b',
    path: '/nightly/canvas-b',
    title: 'Organic Movement',
    phase: 'Phase 4',
    specialist: 'Creative Coder B',
    description: 'Fluid, natural motion with particle systems and flowing background elements',
    features: ['Organic Particles', 'Flocking Behavior', 'Perlin Noise', 'Natural Physics'],
    icon: Waves,
    status: 'completed',
    color: 'bg-amber-600/20 border-amber-600/40 text-amber-300'
  },
  {
    id: 'canvas-c',
    path: '/nightly/canvas-c',
    title: 'Interactive Response',
    phase: 'Phase 4',
    specialist: 'Creative Coder C',
    description: 'Systems that react subtly to user behavior with responsive visual feedback',
    features: ['User Interaction', 'Section Detection', 'Performance Monitoring', 'Adaptive Behavior'],
    icon: Target,
    status: 'completed',
    color: 'bg-amber-600/20 border-amber-600/40 text-amber-300'
  },
  {
    id: 'synthesis-a',
    path: '/nightly/synthesis-a',
    title: 'Brand Consistency',
    phase: 'Phase 5',
    specialist: 'Creative Director A',
    description: 'Ultimate brand-consistent synthesis maintaining visual coherence across elements',
    features: ['Brand Coherence', 'Visual Harmony', 'Component Standards', 'Professional Polish'],
    icon: Award,
    status: 'completed',
    color: 'bg-purple-600/20 border-purple-600/40 text-purple-300'
  },
  {
    id: 'synthesis-b',
    path: '/nightly/synthesis-b',
    title: 'User Experience',
    phase: 'Phase 5',
    specialist: 'Creative Director B',
    description: 'Optimized user experience synthesis enhancing usability and accessibility',
    features: ['UX Excellence', 'WCAG AA+', 'Mobile Optimization', 'User-Centered Flow'],
    icon: Eye,
    status: 'completed',
    color: 'bg-purple-600/20 border-purple-600/40 text-purple-300'
  },
  {
    id: 'synthesis-c',
    path: '/nightly/synthesis-c',
    title: 'Technical Innovation',
    phase: 'Phase 5',
    specialist: 'Creative Director C',
    description: 'Technical excellence with performance optimization and cutting-edge implementation',
    features: ['Technical Excellence', 'Performance Monitoring', 'Progressive Enhancement', 'Modern Web APIs'],
    icon: Cpu,
    status: 'completed',
    color: 'bg-purple-600/20 border-purple-600/40 text-purple-300'
  }
]

const phaseInfo = {
  'Phase 1': {
    title: 'Base Implementation',
    description: 'Foundation layer implementing core sitemap and design system',
    color: 'text-slate-400'
  },
  'Phase 2': {
    title: 'Layout & Visual Design',
    description: '3 expert web designers with distinct specializations',
    color: 'text-blue-400'
  },
  'Phase 3': {
    title: 'Motion & Transitions',
    description: '3 motion design specialists adding animations and interactions',
    color: 'text-emerald-400'
  },
  'Phase 4': {
    title: 'Generative Canvas Layer',
    description: '3 creative coding specialists implementing P5.js systems',
    color: 'text-amber-400'
  },
  'Phase 5': {
    title: 'Creative Direction Synthesis',
    description: '3 creative directors combining the best elements from all iterations',
    color: 'text-purple-400'
  }
}

export default function NightlyIndexPage() {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredVersions = versions.filter(version => {
    const matchesPhase = !selectedPhase || version.phase === selectedPhase
    const matchesSearch = !searchTerm || 
      version.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      version.specialist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      version.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesPhase && matchesSearch
  })

  const phases = Object.keys(phaseInfo)
  const completedVersions = versions.filter(v => v.status === 'completed').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-semibold bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                Paritee
              </Link>
              <Badge className="bg-blue-600/20 text-blue-400 border border-blue-600/40">
                Nightly Iterations
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{completedVersions}/15 Complete</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-slate-400 hover:text-white"
                onClick={() => window.location.reload()}
              >
                <Clock className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold text-white mb-6 leading-tight">
            Overnight Website Design Iterations
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto mb-8">
            A comprehensive exploration of design evolution through 6 phases, featuring 15 distinct 
            implementations from expert specialists in layout, motion, generative art, and creative direction.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {Object.entries(phaseInfo).map(([phase, info]) => (
              <div key={phase} className="text-center">
                <div className={`text-2xl font-semibold mb-2 ${info.color}`}>
                  {versions.filter(v => v.phase === phase).length}
                </div>
                <div className="text-slate-400 text-sm">{phase}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-8">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedPhase === null ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPhase(null)}
                className={selectedPhase === null ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}
              >
                All Phases
              </Button>
              {phases.map(phase => (
                <Button
                  key={phase}
                  variant={selectedPhase === phase ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedPhase(phase)}
                  className={selectedPhase === phase ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}
                >
                  {phase}
                </Button>
              ))}
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search implementations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-full text-white placeholder-slate-400 focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20 w-full lg:w-80"
              />
            </div>
          </div>

          {/* Phase Info */}
          {selectedPhase && (
            <div className="mb-8 p-6 bg-slate-800/40 border border-slate-700/50 rounded-none">
              <h3 className={`text-xl font-semibold mb-2 ${phaseInfo[selectedPhase as keyof typeof phaseInfo].color}`}>
                {phaseInfo[selectedPhase as keyof typeof phaseInfo].title}
              </h3>
              <p className="text-slate-400">
                {phaseInfo[selectedPhase as keyof typeof phaseInfo].description}
              </p>
            </div>
          )}
        </div>

        {/* Version Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredVersions.map(version => {
            const IconComponent = version.icon
            return (
              <Card key={version.id} className="bg-slate-800/40 border border-slate-700/50 rounded-none hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60 group">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${version.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">{version.phase}</div>
                        <CardTitle className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {version.title}
                        </CardTitle>
                      </div>
                    </div>
                    <Badge className={`text-xs ${version.color}`}>
                      {version.specialist}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {version.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {version.features.map(feature => (
                      <Badge 
                        key={feature} 
                        variant="secondary" 
                        className="bg-slate-700/50 text-slate-300 text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <Link href={version.path}>
                      <Button 
                        className="w-full bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full transition-all duration-300 group"
                        size="sm"
                      >
                        <span>View Implementation</span>
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Project Overview */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-none p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-white mb-4">Project Overview</h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
              This overnight design iteration project demonstrates comprehensive design thinking through 
              systematic exploration of layout, motion, generative art, and creative direction approaches.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-slate-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Systematic Approach</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Structured 6-phase process exploring design from foundation through synthesis
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Expert Perspectives</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                12 specialist personas bringing unique expertise and design philosophies
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Technical Innovation</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Cutting-edge web technologies with P5.js generative art and performance optimization
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Creative Synthesis</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Best-of combinations distilling excellence across brand, UX, and technical dimensions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}