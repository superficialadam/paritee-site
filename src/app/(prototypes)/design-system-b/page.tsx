'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Download, Star, Users, Zap, Target, Sparkles, Rocket, Globe, Shield, Lightbulb } from 'lucide-react'

export default function DesignSystemBoldPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 -right-4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50 shadow-2xl">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                  Bold Design System
                </h1>
                <p className="text-slate-300 text-lg font-medium">Next-generation components & patterns</p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-4 py-2 text-sm font-semibold shadow-lg">
              v2.0.0 BETA
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-8 py-20 space-y-32 relative">
        
        {/* Color Palette - Asymmetrical Layout */}
        <section className="relative">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full px-6 py-3 border border-blue-500/30">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-300 font-semibold text-sm tracking-wide uppercase">Color System</span>
              </div>
              <h2 className="text-7xl font-black text-white leading-none tracking-tight">
                Bold
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Colors
                </span>
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed max-w-md">
                Vibrant gradients and high-contrast palettes designed for maximum visual impact and modern aesthetics.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Dynamic Blue Gradients */}
                <Card className="group bg-gradient-to-br from-blue-900/50 to-slate-800/30 border border-blue-500/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg"></div>
                      Dynamic Blues
                    </CardTitle>
                    <CardDescription className="text-blue-200 text-lg">Primary brand gradients</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="group/color hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/50 mb-3 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-white">Primary Gradient</div>
                          <div className="text-sm text-blue-300 font-mono">#2563eb → #3b82f6</div>
                        </div>
                      </div>
                      <div className="group/color hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg shadow-blue-400/30 mb-3"></div>
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-white">Electric Blue</div>
                          <div className="text-sm text-blue-300 font-mono">#3b82f6 → #60a5fa</div>
                        </div>
                      </div>
                      <div className="group/color hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-purple-500/30 mb-3"></div>
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-white">Tech Purple</div>
                          <div className="text-sm text-blue-300 font-mono">#4f46e5 → #9333ea</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bold Accents */}
                <Card className="group bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-2">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
                      Bold Accents
                    </CardTitle>
                    <CardDescription className="text-purple-200 text-lg">High-impact highlights</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="group/color hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/40 mb-3"></div>
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-white">Success Gradient</div>
                          <div className="text-sm text-purple-300 font-mono">#10b981 → #14b8a6</div>
                        </div>
                      </div>
                      <div className="group/color hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/40 mb-3"></div>
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-white">Energy Burst</div>
                          <div className="text-sm text-purple-300 font-mono">#f97316 → #ef4444</div>
                        </div>
                      </div>
                      <div className="group/color hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-16 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 shadow-lg shadow-amber-400/40 mb-3"></div>
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-white">Premium Gold</div>
                          <div className="text-sm text-purple-300 font-mono">#fbbf24 → #facc15</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Typography - Large Scale Approach */}
        <section className="relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full px-6 py-3 border border-purple-500/30 mb-8">
              <Lightbulb className="w-4 h-4 text-purple-300" />
              <span className="text-purple-300 font-semibold text-sm tracking-wide uppercase">Typography</span>
            </div>
            <h2 className="text-8xl md:text-9xl font-black text-white leading-none tracking-tighter mb-6">
              TYPE
            </h2>
            <p className="text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Dramatic scale contrasts and confident hierarchy for maximum impact
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Heading Specimens */}
            <Card className="bg-black/40 border border-white/10 backdrop-blur-xl p-12 hover:shadow-2xl transition-all duration-500">
              <CardHeader className="pb-8">
                <CardTitle className="text-3xl font-black text-white">Scale Hierarchy</CardTitle>
                <CardDescription className="text-slate-300 text-lg">Dramatic size relationships</CardDescription>
              </CardHeader>
              <CardContent className="space-y-12">
                <div className="group cursor-pointer">
                  <h1 className="text-6xl font-black text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                    Hero Scale
                  </h1>
                  <code className="text-blue-400 font-mono text-sm bg-blue-900/20 px-3 py-1 rounded-lg">text-6xl font-black</code>
                </div>
                
                <div className="group cursor-pointer">
                  <h2 className="text-4xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    Major Heading
                  </h2>
                  <code className="text-blue-400 font-mono text-sm bg-blue-900/20 px-3 py-1 rounded-lg">text-4xl font-bold</code>
                </div>
                
                <div className="group cursor-pointer">
                  <h3 className="text-2xl font-semibold text-slate-200 mb-2 group-hover:text-white transition-colors duration-300">
                    Section Title
                  </h3>
                  <code className="text-blue-400 font-mono text-sm bg-blue-900/20 px-3 py-1 rounded-lg">text-2xl font-semibold</code>
                </div>
              </CardContent>
            </Card>

            {/* Text Styles */}
            <Card className="bg-gradient-to-br from-slate-900/50 to-blue-900/20 border border-blue-500/20 backdrop-blur-xl p-12 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
              <CardHeader className="pb-8">
                <CardTitle className="text-3xl font-black text-white">Text Styles</CardTitle>
                <CardDescription className="text-blue-200 text-lg">Readable content variations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xl text-white leading-relaxed font-medium mb-3">
                    Large impactful text for key messages and important content that demands attention and drives action.
                  </p>
                  <code className="text-blue-400 font-mono text-sm">text-xl font-medium</code>
                </div>
                
                <div className="p-6 bg-blue-900/10 rounded-2xl border border-blue-500/20">
                  <p className="text-lg text-slate-200 leading-relaxed mb-3">
                    Standard paragraph text with improved contrast and spacing for optimal readability and user experience.
                  </p>
                  <code className="text-blue-400 font-mono text-sm">text-lg text-slate-200</code>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-slate-800/30 rounded-xl border border-slate-600/30">
                    <p className="text-sm text-slate-400 mb-2">Supporting details and metadata</p>
                    <code className="text-blue-400 font-mono text-xs">text-sm text-slate-400</code>
                  </div>
                  <div className="flex-1 p-4 bg-slate-800/30 rounded-xl border border-slate-600/30">
                    <p className="text-xs text-slate-500 mb-2">Fine print and technical specs</p>
                    <code className="text-blue-400 font-mono text-xs">text-xs text-slate-500</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interactive Buttons - Contemporary Patterns */}
        <section className="relative">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-full px-6 py-3 border border-emerald-500/30">
                <Rocket className="w-4 h-4 text-emerald-300" />
                <span className="text-emerald-300 font-semibold text-sm tracking-wide uppercase">Interactions</span>
              </div>
              <h2 className="text-6xl font-black text-white leading-none">
                Dynamic
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Buttons
                </span>
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                Modern button designs with glassmorphism effects, hover animations, and contemporary styling patterns.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Primary Actions */}
                <Card className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 hover:shadow-2xl transition-all duration-500">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold text-white">Primary Actions</CardTitle>
                    <CardDescription className="text-slate-300">Hero call-to-action buttons</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col gap-4">
                      <Button 
                        size="lg" 
                        className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 rounded-2xl px-8 py-6 text-lg font-bold shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                        Get Started Now
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                      
                      <Button 
                        size="lg" 
                        className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/40 rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >
                        Explore Portfolio
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Glassmorphism Variants */}
                <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 backdrop-blur-xl p-8 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold text-white">Glass Effects</CardTitle>
                    <CardDescription className="text-purple-200">Modern glassmorphism styling</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col gap-4">
                      <Button 
                        size="lg"
                        className="relative bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:shadow-xl hover:shadow-white/10 rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-300 hover:-translate-y-1 group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 rounded-2xl group-hover:via-blue-400/20 transition-all duration-300"></div>
                        Glass Button
                        <Sparkles className="ml-3 h-5 w-5" />
                      </Button>
                      
                      <Button 
                        className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-100 hover:from-emerald-500/30 hover:to-blue-500/30 hover:border-emerald-400/50 rounded-2xl px-6 py-4 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
                      >
                        Success Action
                        <Star className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Cards - Asymmetrical Grid */}
        <section className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full px-6 py-3 border border-cyan-500/30 mb-8">
              <Globe className="w-4 h-4 text-cyan-300" />
              <span className="text-cyan-300 font-semibold text-sm tracking-wide uppercase">Components</span>
            </div>
            <h2 className="text-7xl font-black text-white leading-none mb-6">
              Modern
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Cards
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            
            {/* Hero Service Card */}
            <Card className="group lg:col-span-6 bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-500/30 backdrop-blur-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-3 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl"></div>
              <CardHeader className="pb-6 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-blue-500/25">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-black text-white mb-4">Strategic Innovation</CardTitle>
                <CardDescription className="text-slate-300 text-lg leading-relaxed">
                  Revolutionary approach to business strategy with AI-powered insights and data-driven decision making.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto text-blue-400 hover:text-blue-300 text-lg font-semibold group-hover:translate-x-2 transition-all duration-300"
                >
                  Explore Service
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="group lg:col-span-3 bg-gradient-to-br from-emerald-900/30 to-green-900/20 border border-emerald-500/30 backdrop-blur-xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:-translate-y-3 p-8">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-emerald-500/25">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-5xl font-black bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  500+
                </CardTitle>
                <CardDescription className="text-emerald-200 text-lg font-semibold">Projects Launched</CardDescription>
              </CardHeader>
            </Card>

            {/* Team Profile */}
            <Card className="group lg:col-span-3 bg-white/5 border border-white/10 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 p-6">
              <CardContent className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black text-xl mx-auto mb-4 shadow-xl">
                  MJ
                </div>
                <h3 className="font-black text-white text-xl mb-2">Maya Johnson</h3>
                <p className="text-blue-300 font-semibold mb-2">Lead Designer</p>
                <p className="text-slate-400 text-sm">San Francisco, CA</p>
                <div className="flex justify-center gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* News/Blog Card */}
            <Card className="group lg:col-span-8 bg-gradient-to-r from-slate-900/50 to-blue-900/30 border border-slate-700/50 backdrop-blur-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-600"></div>
              <CardContent className="pl-6">
                <div className="flex gap-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex-shrink-0 shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-3 mb-4">
                      <Badge className="bg-gradient-to-r from-amber-400/20 to-orange-400/20 text-amber-200 border-amber-400/30 font-semibold">
                        Featured Article
                      </Badge>
                      <Badge className="bg-blue-900/30 text-blue-300 border-blue-600/30">
                        Design Trends
                      </Badge>
                    </div>
                    <h3 className="font-black text-white mb-4 text-2xl group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                      The Evolution of Bold Design in Digital Experiences
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-4">
                      Exploring how modern design systems embrace dramatic contrasts, dynamic animations, and contemporary patterns to create unforgettable user experiences.
                    </p>
                    <div className="flex items-center gap-6 text-slate-400 text-sm">
                      <span className="font-semibold">March 28, 2024</span>
                      <span>•</span>
                      <span>8 min read</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        4.9
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="group lg:col-span-4 bg-gradient-to-br from-purple-800/30 to-pink-800/20 border border-purple-500/30 backdrop-blur-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-3 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10"></div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-purple-500/25">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-black text-white mb-4">Ready to Transform?</CardTitle>
                <CardDescription className="text-purple-200 text-lg leading-relaxed">
                  Join the next generation of digital experiences with our bold design system.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0 rounded-2xl py-6 text-lg font-bold shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-1">
                  Start Building
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Design Principles - Bold Layout */}
        <section className="relative">
          <div className="text-center mb-20">
            <h2 className="text-8xl font-black text-white leading-none mb-8 tracking-tighter">
              PRINCIPLES
            </h2>
            <p className="text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Core philosophy driving every design decision in our bold, contemporary system
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Do's */}
            <Card className="group border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-900/20 to-green-900/10 backdrop-blur-xl p-12 hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full blur-3xl"></div>
              <CardHeader className="pb-8 relative z-10">
                <CardTitle className="text-4xl font-black text-emerald-300 flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="text-white font-black text-xl">✓</span>
                  </div>
                  Bold Principles
                </CardTitle>
              </CardHeader>
              <CardContent className="text-emerald-100 space-y-6 text-lg leading-relaxed relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p>Embrace dramatic scale contrasts in typography for maximum visual impact</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p>Use bold gradients and dynamic color combinations confidently</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p>Implement glassmorphism and contemporary UI patterns</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p>Create asymmetrical layouts with confident geometric shapes</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p>Add dynamic micro-interactions and hover animations</p>
                </div>
              </CardContent>
            </Card>

            {/* Don'ts */}
            <Card className="group border-2 border-red-500/50 bg-gradient-to-br from-red-900/20 to-orange-900/10 backdrop-blur-xl p-12 hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-400/20 to-transparent rounded-full blur-3xl"></div>
              <CardHeader className="pb-8 relative z-10">
                <CardTitle className="text-4xl font-black text-red-300 flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="text-white font-black text-xl">✗</span>
                  </div>
                  Avoid These
                </CardTitle>
              </CardHeader>
              <CardContent className="text-red-100 space-y-6 text-lg leading-relaxed relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p>Never use ALL CAPS in headlines or body text</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p>Don't create timid or overly conservative layouts</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p>Avoid weak contrast ratios and washed-out colors</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p>Don't use outdated design patterns or generic styling</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p>Avoid static designs without interactive elements</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="relative py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full px-8 py-4 border border-blue-500/30 mb-12">
              <Rocket className="w-5 h-5 text-blue-300" />
              <span className="text-blue-300 font-bold text-lg tracking-wide">Ready to Build Bold?</span>
            </div>
            <h2 className="text-7xl md:text-8xl font-black text-white leading-none mb-8 tracking-tighter">
              START
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CREATING
              </span>
            </h2>
            <p className="text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-12">
              Transform your digital experiences with our modern bold design system
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg"
                className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 rounded-2xl px-12 py-8 text-xl font-black shadow-2xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-2 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                Download System
                <Download className="ml-3 h-6 w-6 group-hover:translate-y-1 transition-transform duration-300" />
              </Button>
              
              <Button 
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/20 hover:border-white/40 rounded-2xl px-12 py-8 text-xl font-bold transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10"
              >
                View Examples
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}