'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Download, Star, Users, Zap, Target, Sparkles, Globe, Shield } from 'lucide-react'

export default function DesignSystemHybridPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-4 w-72 h-72 bg-blue-500/6 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-slate-700/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
                Paritee Design System
              </h1>
              <p className="text-slate-400 text-base mt-1">Sophisticated hybrid approach</p>
            </div>
            <Badge className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 px-4 py-2">
              v1.0.0-d
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-20 space-y-32 relative">
        
        {/* Color Palette */}
        <section>
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-white mb-4">Color system</h2>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Refined palette emphasizing brand blues with sophisticated dark mode foundation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Blues */}
            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-medium text-white">Brand blues</CardTitle>
                <CardDescription className="text-slate-400">Primary foundation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-blue-600 border border-slate-600 shadow-lg shadow-blue-600/20"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Blue 600</div>
                    <div className="text-xs text-slate-400 font-mono">#2563eb</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-blue-500 border border-slate-600 shadow-lg shadow-blue-500/20"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Blue 500</div>
                    <div className="text-xs text-slate-400 font-mono">#3b82f6</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-blue-400 border border-slate-600 shadow-lg shadow-blue-400/20"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Blue 400</div>
                    <div className="text-xs text-slate-400 font-mono">#60a5fa</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sophisticated Grays */}
            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-medium text-white">Refined grays</CardTitle>
                <CardDescription className="text-slate-400">Text and surfaces</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-white border border-slate-600"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Pure white</div>
                    <div className="text-xs text-slate-400 font-mono">#ffffff</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-slate-300 border border-slate-600"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Light gray</div>
                    <div className="text-xs text-slate-400 font-mono">#cbd5e1</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-slate-600 border border-slate-700"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Medium gray</div>
                    <div className="text-xs text-slate-400 font-mono">#475569</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dark Surfaces */}
            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-medium text-white">Dark surfaces</CardTitle>
                <CardDescription className="text-slate-400">Backgrounds and containers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-slate-950 border border-slate-800"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Deep dark</div>
                    <div className="text-xs text-slate-400 font-mono">#020617</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-slate-900 border border-slate-700"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Dark surface</div>
                    <div className="text-xs text-slate-400 font-mono">#0f172a</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-slate-800 border border-slate-700"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Card surface</div>
                    <div className="text-xs text-slate-400 font-mono">#1e293b</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subtle Accents */}
            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-medium text-white">Subtle accents</CardTitle>
                <CardDescription className="text-slate-400">Refined highlights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-emerald-600/20 border border-emerald-600/30"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Success tone</div>
                    <div className="text-xs text-slate-400 font-mono">#059669</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-amber-600/20 border border-amber-600/30"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Warning tone</div>
                    <div className="text-xs text-slate-400 font-mono">#d97706</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-red-600/20 border border-red-600/30"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Error tone</div>
                    <div className="text-xs text-slate-400 font-mono">#dc2626</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section>
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-white mb-4">Typography</h2>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Refined hierarchy with modern proportions and sophisticated contrast
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none">
              <CardHeader className="pb-6">
                <CardTitle className="text-white font-medium">Headings</CardTitle>
                <CardDescription className="text-slate-400">Modern hierarchy with restraint</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h1 className="text-4xl font-semibold text-white mb-2 leading-tight">Primary heading</h1>
                  <code className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">text-4xl font-semibold</code>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-2 leading-tight">Secondary heading</h2>
                  <code className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">text-3xl font-semibold</code>
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-2 leading-tight">Section heading</h3>
                  <code className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">text-2xl font-medium</code>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-white mb-2 leading-relaxed">Subsection heading</h4>
                  <code className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">text-xl font-medium</code>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none">
              <CardHeader className="pb-6">
                <CardTitle className="text-white font-medium">Body text</CardTitle>
                <CardDescription className="text-slate-400">Optimized for readability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <p className="text-lg text-slate-200 mb-2 leading-relaxed max-w-sm">Large introduction text for key messages and important content sections.</p>
                  <code className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">text-lg text-slate-200</code>
                </div>
                <div>
                  <p className="text-base text-slate-300 mb-2 leading-relaxed max-w-sm">Standard paragraph text with comfortable contrast and optimal line spacing.</p>
                  <code className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">text-base text-slate-300</code>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-2 leading-relaxed max-w-sm">Supporting text for captions and secondary information.</p>
                  <code className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">text-sm text-slate-400</code>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-2 leading-relaxed max-w-sm">Fine print and technical metadata information.</p>
                  <code className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">text-xs text-slate-500</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-white mb-4">Buttons</h2>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Modern interaction elements with sophisticated styling and subtle animations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none">
              <CardHeader className="pb-6">
                <CardTitle className="text-white font-medium">Primary actions</CardTitle>
                <CardDescription className="text-slate-400">Brand-focused interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300">
                    Get started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-6 py-3 transition-all duration-300">
                    Learn more
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-5 py-2.5 shadow-lg shadow-blue-600/20 transition-all duration-300">
                    Explore work
                  </Button>
                  <Button className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-5 py-2.5 transition-all duration-300">
                    Contact us
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none">
              <CardHeader className="pb-6">
                <CardTitle className="text-white font-medium">Subtle variants</CardTitle>
                <CardDescription className="text-slate-400">Refined interaction styles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-6 py-3 transition-all duration-300">
                    Ghost button
                  </Button>
                  <Button size="lg" className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
                    Link button
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-transparent border border-emerald-600/60 text-emerald-400 hover:bg-emerald-600/10 hover:border-emerald-600/80 rounded-full px-5 py-2.5 transition-all duration-300">
                    Success action
                  </Button>
                  <Button className="bg-transparent border border-amber-600/60 text-amber-400 hover:bg-amber-600/10 hover:border-amber-600/80 rounded-full px-5 py-2.5 transition-all duration-300">
                    Warning action
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cards & Components */}
        <section>
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-white mb-4">Cards & components</h2>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Clean content presentation with sophisticated dark styling and elegant proportions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card */}
            <Card className="group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/60 rounded-none">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-blue-600/20 border border-blue-600/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/30 group-hover:border-blue-600/50 transition-all duration-300">
                  <Target className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-xl font-medium text-white">Strategic consulting</CardTitle>
                <CardDescription className="text-slate-400 leading-relaxed">
                  Comprehensive business strategy and market positioning for meaningful results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-400 hover:text-blue-300 hover:bg-transparent">
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            {/* Team Card */}
            <Card className="group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm rounded-none">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-medium shadow-lg">
                    SJ
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">Sarah Johnson</h3>
                    <p className="text-slate-400 text-sm mb-2">Creative Director</p>
                    <p className="text-slate-500 text-xs">New York, NY</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-blue-600/10 border border-blue-600/30 backdrop-blur-sm rounded-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl font-semibold text-blue-400">150+</CardTitle>
                    <CardDescription className="text-blue-300">Projects completed</CardDescription>
                  </div>
                  <div className="w-12 h-12 bg-blue-600/20 border border-blue-600/30 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* News Card */}
            <Card className="group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 lg:col-span-2 bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm rounded-none">
              <CardContent className="p-8">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-slate-700 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <Badge className="mb-3 bg-amber-600/20 text-amber-400 border-amber-600/30 hover:bg-amber-600/30">
                      Industry insights
                    </Badge>
                    <h3 className="font-medium text-white mb-3 group-hover:text-blue-400 transition-colors leading-relaxed">
                      The future of design systems in 2024
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                      How modern design approaches are creating more sophisticated and user-friendly digital experiences.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>March 15, 2024</span>
                      <span>•</span>
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-blue-600/10 border border-blue-600/30 backdrop-blur-sm rounded-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-white font-medium">Ready to begin?</CardTitle>
                <CardDescription className="text-slate-400 leading-relaxed">
                  Join our network of exceptional agencies and transform your potential.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300">
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badges & Icons */}
        <section>
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-white mb-4">Badges & accents</h2>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Sophisticated status indicators with refined dark mode styling
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none">
              <CardHeader className="pb-6">
                <CardTitle className="text-white font-medium">Badge variations</CardTitle>
                <CardDescription className="text-slate-400">Status and category indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600">Default</Badge>
                  <Badge className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700">Secondary</Badge>
                  <Badge className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-800">Outline</Badge>
                  <Badge className="bg-red-600/20 text-red-400 border border-red-600/40 hover:bg-red-600/30">Alert</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-600/20 text-blue-400 border border-blue-600/40 hover:bg-blue-600/30">Featured</Badge>
                  <Badge className="bg-emerald-600/20 text-emerald-400 border border-emerald-600/40 hover:bg-emerald-600/30">Active</Badge>
                  <Badge className="bg-amber-600/20 text-amber-400 border border-amber-600/40 hover:bg-amber-600/30">Pending</Badge>
                  <Badge className="bg-yellow-600/20 text-yellow-400 border border-yellow-600/40 hover:bg-yellow-600/30">Priority</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none">
              <CardHeader className="pb-6">
                <CardTitle className="text-white font-medium">Icon system</CardTitle>
                <CardDescription className="text-slate-400">Refined iconography with consistent styling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors border border-slate-700/50">
                    <Users className="h-6 w-6 text-slate-400" />
                    <span className="text-xs text-slate-500">Team</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors border border-slate-700/50">
                    <Target className="h-6 w-6 text-slate-400" />
                    <span className="text-xs text-slate-500">Strategy</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors border border-slate-700/50">
                    <Zap className="h-6 w-6 text-slate-400" />
                    <span className="text-xs text-slate-500">Performance</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors border border-slate-700/50">
                    <Star className="h-6 w-6 text-slate-400" />
                    <span className="text-xs text-slate-500">Quality</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Design Principles */}
        <section>
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-white mb-4">Design principles</h2>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Sophisticated hybrid philosophy blending classical restraint with modern boldness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-emerald-600/30 bg-emerald-600/10 backdrop-blur-sm rounded-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-emerald-400 flex items-center gap-2 font-medium">
                  ✓ Embrace
                </CardTitle>
              </CardHeader>
              <CardContent className="text-emerald-300 space-y-3 leading-relaxed">
                <p>• Sophisticated dark mode with refined gray scales</p>
                <p>• Brand blues as primary color foundation</p>
                <p>• Generous spacing with modern proportions</p>
                <p>• Elegant typography without extreme weights</p>
                <p>• Subtle gradients and refined visual hierarchy</p>
                <p>• Professional glassmorphism and backdrop effects</p>
              </CardContent>
            </Card>

            <Card className="border border-red-600/30 bg-red-600/10 backdrop-blur-sm rounded-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-red-400 flex items-center gap-2 font-medium">
                  ✗ Avoid
                </CardTitle>
              </CardHeader>
              <CardContent className="text-red-300 space-y-3 leading-relaxed">
                <p>• Rainbow gradients on individual elements</p>
                <p>• Extreme font weights and dramatic scaling</p>
                <p>• Overwhelming animations and effects</p>
                <p>• Poor contrast in dark mode contexts</p>
                <p>• Inconsistent spacing and alignment</p>
                <p>• Excessive visual noise and complexity</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="pb-20">
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-white mb-4">Implementation notes</h2>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Key considerations for applying this sophisticated hybrid approach
            </p>
          </div>

          <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none">
            <CardHeader className="pb-6">
              <CardTitle className="text-white font-medium">Hybrid philosophy</CardTitle>
              <CardDescription className="text-slate-400">Balancing classical minimal with modern bold</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white">From modern bold</h4>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Dark gradient background foundation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Contemporary card layouts and interactions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Modern button styles with hover effects</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Sophisticated backdrop blur and glassmorphism</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white">From classical minimal</h4>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Refined typography hierarchy and spacing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Elegant restraint in color application</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Clean component design principles</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Sophisticated gray scale relationships</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  )
}