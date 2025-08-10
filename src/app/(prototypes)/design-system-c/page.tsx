'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Download, Star, Users, Zap, Target, Leaf, Sun, Coffee, Heart } from 'lucide-react'

export default function OrganicWarmDesignSystemPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-25 to-blue-50 relative overflow-hidden">
      {/* Organic background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-amber-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-gradient-to-br from-blue-300/20 to-cyan-200/10 rounded-full blur-2xl" style={{
          borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%',
          animation: 'blob-animation 8s ease-in-out infinite'
        }}></div>
        <div className="absolute bottom-32 right-1/4 w-64 h-64 bg-gradient-to-br from-green-200/20 to-emerald-200/15 rounded-full blur-xl" style={{
          borderRadius: '60% 40% 30% 70% / 40% 70% 30% 60%',
          animation: 'blob-animation 10s ease-in-out infinite reverse'
        }}></div>
      </div>

      {/* Blob animation styles */}
      <style jsx>{`
        @keyframes blob-animation {
          0%, 100% {
            border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
          }
        }
      `}</style>

      {/* Header */}
      <header className="border-b border-orange-100/30 bg-white/70 backdrop-blur-md sticky top-0 z-10 shadow-sm shadow-orange-100/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-blue-600 bg-clip-text text-transparent">
                Paritee Design System
              </h1>
              <p className="text-stone-600 text-base mt-1 font-medium">Organic warm components & guidelines</p>
            </div>
            <Badge className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200/50 px-4 py-2 rounded-full shadow-sm">
              <Leaf className="w-3 h-3 mr-1" />
              v1.0.0 Organic
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16 space-y-20 relative z-10">
        
        {/* Color Palette */}
        <section>
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-stone-800 mb-4">
              Color Harmony
            </h2>
            <p className="text-stone-600 text-xl leading-relaxed">
              Our warm, organic color palette creates comfort and connection while maintaining brand consistency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Primary Blues */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100/50 shadow-lg shadow-blue-100/20 rounded-3xl hover:shadow-xl hover:shadow-blue-200/30 transition-all duration-500 group">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-stone-800 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  Primary Blues
                </CardTitle>
                <CardDescription className="text-stone-600">Trusted brand foundation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 border-2 border-white shadow-md group-hover:scale-105 transition-transform"></div>
                  <div>
                    <div className="font-semibold text-stone-800">Ocean Blue</div>
                    <div className="text-sm text-stone-500">#2563eb</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500 border-2 border-white shadow-md group-hover:scale-105 transition-transform"></div>
                  <div>
                    <div className="font-semibold text-stone-800">Sky Blue</div>
                    <div className="text-sm text-stone-500">#3b82f6</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-400 border-2 border-white shadow-md group-hover:scale-105 transition-transform"></div>
                  <div>
                    <div className="font-semibold text-stone-800">Gentle Blue</div>
                    <div className="text-sm text-stone-500">#60a5fa</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warm Earth Tones */}
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100/50 shadow-lg shadow-orange-100/20 rounded-3xl hover:shadow-xl hover:shadow-orange-200/30 transition-all duration-500 group">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-stone-800 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  Warm Earth
                </CardTitle>
                <CardDescription className="text-stone-600">Organic comfort tones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-orange-500 border-2 border-white shadow-md group-hover:scale-105 transition-transform"></div>
                  <div>
                    <div className="font-semibold text-stone-800">Terracotta</div>
                    <div className="text-sm text-stone-500">#f97316</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500 border-2 border-white shadow-md group-hover:scale-105 transition-transform"></div>
                  <div>
                    <div className="font-semibold text-stone-800">Golden Amber</div>
                    <div className="text-sm text-stone-500">#f59e0b</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-yellow-600 border-2 border-white shadow-md group-hover:scale-105 transition-transform"></div>
                  <div>
                    <div className="font-semibold text-stone-800">Warm Honey</div>
                    <div className="text-sm text-stone-500">#ca8a04</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Natural Greens */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100/50 shadow-lg shadow-green-100/20 rounded-3xl hover:shadow-xl hover:shadow-green-200/30 transition-all duration-500 group">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-stone-800 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  Natural Greens
                </CardTitle>
                <CardDescription className="text-stone-600">Growth and harmony</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-green-600 border-2 border-white shadow-md group-hover:scale-105 transition-transform"></div>
                  <div>
                    <div className="font-semibold text-stone-800">Forest Green</div>
                    <div className="text-sm text-stone-500">#16a34a</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500 border-2 border-white shadow-md group-hover:scale-105 transition-transform"></div>
                  <div>
                    <div className="font-semibold text-stone-800">Sage Green</div>
                    <div className="text-sm text-stone-500">#10b981</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-lime-500 border-2 border-white shadow-md group-hover:scale-105 transition-transform"></div>
                  <div>
                    <div className="font-semibold text-stone-800">Fresh Lime</div>
                    <div className="text-sm text-stone-500">#84cc16</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Neutral Warmth */}
            <Card className="bg-white/80 backdrop-blur-sm border-stone-100/50 shadow-lg shadow-stone-100/20 rounded-3xl hover:shadow-xl hover:shadow-stone-200/30 transition-all duration-500 group">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-stone-800 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-stone-500"></div>
                  Neutral Warmth
                </CardTitle>
                <CardDescription className="text-stone-600">Cozy foundation tones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-stone-800 border-2 border-white shadow-md group-hover:scale-105 transition-transform"></div>
                  <div>
                    <div className="font-semibold text-stone-800">Warm Charcoal</div>
                    <div className="text-sm text-stone-500">#292524</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-stone-600 border-2 border-white shadow-md group-hover:scale-105 transition-transform"></div>
                  <div>
                    <div className="font-semibold text-stone-800">Clay Brown</div>
                    <div className="text-sm text-stone-500">#57534e</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-stone-300 border-2 border-white shadow-md group-hover:scale-105 transition-transform"></div>
                  <div>
                    <div className="font-semibold text-stone-800">Soft Linen</div>
                    <div className="text-sm text-stone-500">#d6d3d1</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section>
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-stone-800 mb-4">
              Human Typography
            </h2>
            <p className="text-stone-600 text-xl leading-relaxed">
              Friendly, approachable text that feels natural and invites connection
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100/50 shadow-lg shadow-orange-100/20 rounded-3xl p-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-stone-800 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-orange-500" />
                  Warm Headings
                </CardTitle>
                <CardDescription className="text-stone-600">Inviting hierarchy that draws people in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h1 className="text-5xl font-bold text-stone-800 mb-2 leading-tight">Welcome Home</h1>
                  <code className="text-sm text-stone-500 bg-stone-100/60 px-3 py-1 rounded-full">text-5xl font-bold</code>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-stone-700 mb-2 leading-tight">Create Together</h2>
                  <code className="text-sm text-stone-500 bg-stone-100/60 px-3 py-1 rounded-full">text-4xl font-bold</code>
                </div>
                <div>
                  <h3 className="text-3xl font-semibold text-stone-700 mb-2 leading-snug">Share Stories</h3>
                  <code className="text-sm text-stone-500 bg-stone-100/60 px-3 py-1 rounded-full">text-3xl font-semibold</code>
                </div>
                <div>
                  <h4 className="text-2xl font-medium text-stone-700 mb-2">Build Community</h4>
                  <code className="text-sm text-stone-500 bg-stone-100/60 px-3 py-1 rounded-full">text-2xl font-medium</code>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-green-100/50 shadow-lg shadow-green-100/20 rounded-3xl p-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-stone-800 flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-amber-600" />
                  Comfortable Reading
                </CardTitle>
                <CardDescription className="text-stone-600">Text that feels like a friendly conversation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <p className="text-xl text-stone-700 mb-2 leading-relaxed font-medium">
                    Large, welcoming text that makes you feel at home and invites deeper engagement.
                  </p>
                  <code className="text-sm text-stone-500 bg-stone-100/60 px-3 py-1 rounded-full">text-xl leading-relaxed</code>
                </div>
                <div>
                  <p className="text-lg text-stone-600 mb-2 leading-relaxed">
                    Regular reading text that flows naturally, like sitting with a friend over coffee and sharing ideas.
                  </p>
                  <code className="text-sm text-stone-500 bg-stone-100/60 px-3 py-1 rounded-full">text-lg leading-relaxed</code>
                </div>
                <div>
                  <p className="text-base text-stone-500 mb-2 leading-relaxed">
                    Supporting details and captions that add context without overwhelming.
                  </p>
                  <code className="text-sm text-stone-500 bg-stone-100/60 px-3 py-1 rounded-full">text-base text-stone-500</code>
                </div>
                <div>
                  <p className="text-sm text-stone-400 mb-2">
                    Small print and metadata with gentle presence.
                  </p>
                  <code className="text-sm text-stone-500 bg-stone-100/60 px-3 py-1 rounded-full">text-sm text-stone-400</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Spacing Guidelines */}
        <section>
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-stone-800 mb-4">
              Natural Spacing
            </h2>
            <p className="text-stone-600 text-xl leading-relaxed">
              Generous, organic spacing that creates comfortable breathing room for content
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100/50 shadow-lg shadow-blue-100/20 rounded-3xl p-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-stone-800 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Generous Margins
                </CardTitle>
                <CardDescription className="text-stone-600">Space that invites exploration and comfort</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <div className="mb-4">
                    <code className="text-sm text-stone-500 bg-gradient-to-r from-orange-100 to-amber-100 px-4 py-2 rounded-full font-medium">mb-20, mt-20</code>
                    <span className="text-stone-700 ml-4 font-semibold">Section breathing room (5rem)</span>
                  </div>
                  <p className="text-stone-600 text-base">Luxurious space between major content areas</p>
                </div>
                <div>
                  <div className="mb-4">
                    <code className="text-sm text-stone-500 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full font-medium">mb-16, mt-16</code>
                    <span className="text-stone-700 ml-4 font-semibold">Component spacing (4rem)</span>
                  </div>
                  <p className="text-stone-600 text-base">Comfortable space between related groups</p>
                </div>
                <div>
                  <div className="mb-4">
                    <code className="text-sm text-stone-500 bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 rounded-full font-medium">mb-12, mt-12</code>
                    <span className="text-stone-700 ml-4 font-semibold">Content flow (3rem)</span>
                  </div>
                  <p className="text-stone-600 text-base">Natural rhythm between content blocks</p>
                </div>
                <div>
                  <div className="mb-4">
                    <code className="text-sm text-stone-500 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full font-medium">mb-8, mt-8</code>
                    <span className="text-stone-700 ml-4 font-semibold">Element harmony (2rem)</span>
                  </div>
                  <p className="text-stone-600 text-base">Gentle separation between elements</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-amber-100/50 shadow-lg shadow-amber-100/20 rounded-3xl p-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-stone-800 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  Cozy Padding
                </CardTitle>
                <CardDescription className="text-stone-600">Internal warmth that embraces content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <div className="mb-4">
                    <code className="text-sm text-stone-500 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full font-medium">p-10, px-10, py-10</code>
                    <span className="text-stone-700 ml-4 font-semibold">Card embrace (2.5rem)</span>
                  </div>
                  <p className="text-stone-600 text-base">Warm, enveloping space for card content</p>
                </div>
                <div>
                  <div className="mb-4">
                    <code className="text-sm text-stone-500 bg-gradient-to-r from-green-100 to-teal-100 px-4 py-2 rounded-full font-medium">p-8, px-8, py-8</code>
                    <span className="text-stone-700 ml-4 font-semibold">Container comfort (2rem)</span>
                  </div>
                  <p className="text-stone-600 text-base">Generous internal container spacing</p>
                </div>
                <div>
                  <div className="mb-4">
                    <code className="text-sm text-stone-500 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full font-medium">px-6, py-4</code>
                    <span className="text-stone-700 ml-4 font-semibold">Button cushion</span>
                  </div>
                  <p className="text-stone-600 text-base">Soft, touchable button internal space</p>
                </div>
                <div>
                  <div className="mb-4">
                    <code className="text-sm text-stone-500 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full font-medium">p-4, px-4, py-4</code>
                    <span className="text-stone-700 ml-4 font-semibold">Intimate padding (1rem)</span>
                  </div>
                  <p className="text-stone-600 text-base">Close, personal space for smaller elements</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-stone-800 mb-4">
              Organic Interactions
            </h2>
            <p className="text-stone-600 text-xl leading-relaxed">
              Buttons that feel natural to touch, with warm gradients and gentle curves
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100/50 shadow-lg shadow-orange-100/20 rounded-3xl p-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-stone-800">Warm Primary Actions</CardTitle>
                <CardDescription className="text-stone-600">Inviting calls-to-action that feel approachable</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 rounded-full px-8 py-4 font-semibold shadow-lg shadow-orange-200/50 hover:shadow-xl hover:shadow-orange-300/50 transition-all duration-300 hover:scale-105">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 rounded-full px-8 py-4 font-semibold shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 transition-all duration-300 hover:scale-105">
                    Learn More
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white border-0 rounded-full px-6 py-3 font-medium shadow-md shadow-green-200/50 hover:shadow-lg hover:shadow-green-300/50 transition-all duration-300 hover:scale-105">
                    Explore Our Work
                  </Button>
                  <Button className="bg-white/90 backdrop-blur-sm text-stone-700 border border-stone-200/50 hover:bg-white hover:border-stone-300 rounded-full px-6 py-3 font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Get in Touch
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="sm" className="bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-900 border-0 rounded-full px-5 py-2 font-medium shadow-sm shadow-amber-200/50 hover:shadow-md hover:shadow-amber-300/50 transition-all duration-300">
                    Small Action
                  </Button>
                  <Button size="sm" className="bg-white/90 backdrop-blur-sm text-stone-600 border border-stone-200 hover:bg-stone-50 hover:border-stone-300 rounded-full px-5 py-2 font-medium shadow-sm hover:shadow-md transition-all duration-300">
                    Secondary
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-green-100/50 shadow-lg shadow-green-100/20 rounded-3xl p-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-stone-800">Gentle Variants</CardTitle>
                <CardDescription className="text-stone-600">Soft, approachable interaction styles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-transparent border-0 text-stone-600 hover:bg-orange-50 hover:text-orange-700 rounded-full px-6 py-3 font-medium transition-all duration-300">
                    Gentle Button
                  </Button>
                  <Button size="lg" className="bg-transparent border-0 text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline font-medium transition-colors duration-300">
                    Link Button
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border border-orange-200/50 hover:from-orange-200 hover:to-amber-200 hover:border-orange-300 rounded-full px-6 py-3 font-medium shadow-sm hover:shadow-md transition-all duration-300">
                    Warm Accent
                  </Button>
                  <Button className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200/50 hover:from-green-200 hover:to-emerald-200 hover:border-green-300 rounded-full px-6 py-3 font-medium shadow-sm hover:shadow-md transition-all duration-300">
                    Success Action
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-stone-100/80 text-stone-600 border border-stone-200/50 hover:bg-stone-200/80 hover:border-stone-300 rounded-full px-6 py-3 font-medium shadow-sm hover:shadow-md transition-all duration-300">
                    Neutral
                  </Button>
                  <Button size="sm" className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 hover:border-red-300 rounded-full px-4 py-2 font-medium shadow-sm hover:shadow-md transition-all duration-300">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cards */}
        <section>
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-stone-800 mb-4">
              Natural Material Cards
            </h2>
            <p className="text-stone-600 text-xl leading-relaxed">
              Card designs inspired by natural materials with organic shapes and warm textures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card */}
            <Card className="group hover:shadow-xl hover:shadow-orange-200/30 transition-all duration-500 bg-gradient-to-br from-white/90 to-orange-50/50 backdrop-blur-sm border-orange-100/30 rounded-3xl overflow-hidden hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-200/50">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-stone-800 font-bold mb-2">Strategic Consulting</CardTitle>
                <CardDescription className="text-stone-600 text-base leading-relaxed">
                  Comprehensive business strategy and market positioning that drives real, meaningful results for your growth.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-orange-600 hover:text-orange-700 font-medium">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Team Card */}
            <Card className="group hover:shadow-xl hover:shadow-blue-200/30 transition-all duration-500 bg-gradient-to-br from-white/90 to-blue-50/50 backdrop-blur-sm border-blue-100/30 rounded-3xl overflow-hidden hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200/50">
                    SJ
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-stone-800 text-xl mb-1">Sarah Johnson</h3>
                    <p className="text-stone-600 text-base mb-3 font-medium">Creative Director</p>
                    <p className="text-stone-500 text-sm">New York, NY</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-gradient-to-br from-blue-100/80 to-cyan-100/60 backdrop-blur-sm border-blue-200/30 rounded-3xl shadow-lg shadow-blue-200/20">
              <CardHeader className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-4xl font-bold text-blue-700 mb-2">150+</CardTitle>
                    <CardDescription className="text-blue-600 font-semibold text-lg">Projects Completed</CardDescription>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-300/50">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* News Card */}
            <Card className="group hover:shadow-xl hover:shadow-green-200/30 transition-all duration-500 lg:col-span-2 bg-gradient-to-br from-white/90 to-green-50/30 backdrop-blur-sm border-green-100/30 rounded-3xl overflow-hidden hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex gap-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-300 rounded-2xl flex-shrink-0 shadow-md"></div>
                  <div className="flex-1">
                    <Badge className="mb-4 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200/50 px-4 py-2 rounded-full font-medium">
                      Industry News
                    </Badge>
                    <h3 className="font-bold text-stone-800 mb-4 group-hover:text-green-700 transition-colors text-xl">
                      The Future of Creative Marketing Partnerships
                    </h3>
                    <p className="text-stone-600 text-base mb-4 line-clamp-2 leading-relaxed">
                      How strategic alliances between agencies are reshaping the industry landscape and delivering better outcomes for clients worldwide.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-stone-500 font-medium">
                      <span>March 15, 2024</span>
                      <span>•</span>
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-orange-100/80 to-amber-100/60 backdrop-blur-sm border-orange-200/30 rounded-3xl shadow-lg shadow-orange-200/20 text-stone-800">
              <CardHeader className="p-8">
                <CardTitle className="text-stone-800 text-2xl font-bold mb-2">Ready to get started?</CardTitle>
                <CardDescription className="text-orange-800 text-base leading-relaxed">
                  Join our network of top-tier agencies and transform your creative potential into remarkable results.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <Button className="w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 py-4 font-semibold shadow-lg shadow-orange-200/50 hover:shadow-xl hover:shadow-orange-300/50 transition-all duration-300 hover:scale-105">
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badges & Icons */}
        <section>
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-stone-800 mb-4">
              Organic Accents
            </h2>
            <p className="text-stone-600 text-xl leading-relaxed">
              Gentle badges and icons that add warmth and personality to your interface
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100/50 shadow-lg shadow-orange-100/20 rounded-3xl p-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-stone-800">Warm Badge Collection</CardTitle>
                <CardDescription className="text-stone-600">Status indicators with organic styling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200/50 px-4 py-2 rounded-full font-medium">Featured</Badge>
                  <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200/50 px-4 py-2 rounded-full font-medium">Active</Badge>
                  <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200/50 px-4 py-2 rounded-full font-medium">New</Badge>
                  <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200/50 px-4 py-2 rounded-full font-medium">Popular</Badge>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-gradient-to-r from-amber-200 to-orange-200 text-amber-900 border-amber-300/50 px-4 py-2 rounded-full font-semibold shadow-sm">Hot</Badge>
                  <Badge className="bg-gradient-to-r from-green-200 to-teal-200 text-green-900 border-green-300/50 px-4 py-2 rounded-full font-semibold shadow-sm">Trending</Badge>
                  <Badge className="bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200/50 px-4 py-2 rounded-full font-medium">Limited</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-green-100/50 shadow-lg shadow-green-100/20 rounded-3xl p-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-stone-800">Friendly Icons</CardTitle>
                <CardDescription className="text-stone-600">Icons with natural, approachable styling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100/50 hover:shadow-md transition-all duration-300">
                    <Users className="h-8 w-8 text-orange-600" />
                    <span className="text-sm text-stone-600 font-medium">Team</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100/50 hover:shadow-md transition-all duration-300">
                    <Target className="h-8 w-8 text-green-600" />
                    <span className="text-sm text-stone-600 font-medium">Strategy</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100/50 hover:shadow-md transition-all duration-300">
                    <Zap className="h-8 w-8 text-blue-600" />
                    <span className="text-sm text-stone-600 font-medium">Energy</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100/50 hover:shadow-md transition-all duration-300">
                    <Star className="h-8 w-8 text-purple-600" />
                    <span className="text-sm text-stone-600 font-medium">Quality</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Design Principles */}
        <section>
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-stone-800 mb-4">
              Organic Design Philosophy
            </h2>
            <p className="text-stone-600 text-xl leading-relaxed">
              Guiding principles for creating warm, human-centered experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-green-300/50 bg-gradient-to-br from-green-50/80 to-emerald-50/60 backdrop-blur-sm shadow-lg shadow-green-100/30 rounded-3xl">
              <CardHeader className="p-8">
                <CardTitle className="text-green-700 flex items-center gap-3 text-2xl font-bold">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  Embrace Warmth
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 text-green-800 space-y-4 text-base leading-relaxed">
                <p>• Use flowing, organic shapes that feel natural and inviting</p>
                <p>• Create generous spacing that allows content to breathe</p>
                <p>• Apply warm gradients and soft shadows for depth</p>
                <p>• Choose rounded corners and curved elements over sharp edges</p>
                <p>• Maintain high contrast for accessibility while feeling approachable</p>
                <p>• Use friendly, conversational language in all copy</p>
              </CardContent>
            </Card>

            <Card className="border-orange-300/50 bg-gradient-to-br from-orange-50/80 to-red-50/60 backdrop-blur-sm shadow-lg shadow-orange-100/30 rounded-3xl">
              <CardHeader className="p-8">
                <CardTitle className="text-orange-700 flex items-center gap-3 text-2xl font-bold">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">!</span>
                  </div>
                  Avoid Coldness
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 text-orange-800 space-y-4 text-base leading-relaxed">
                <p>• Don't use all caps text - it feels harsh and unwelcoming</p>
                <p>• Avoid stark, minimal designs that feel cold or sterile</p>
                <p>• Don't rely solely on pure grays - add warm undertones</p>
                <p>• Avoid cramped layouts that make users feel rushed</p>
                <p>• Don't use overly technical or formal language</p>
                <p>• Avoid sharp, angular shapes that feel aggressive</p>
              </CardContent>
            </Card>
          </div>
        </section>

      </div>
    </div>
  )
}