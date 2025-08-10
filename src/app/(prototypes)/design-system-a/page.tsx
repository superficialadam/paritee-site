'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Download, Star, Users, Zap, Target } from 'lucide-react'

export default function DesignSystemAPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-gray-900">Paritee Design System</h1>
              <p className="text-gray-500 text-sm mt-1">Classical minimal principles</p>
            </div>
            <Badge className="bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100">
              v1.0.0-a
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-20 space-y-32">
        
        {/* Color Palette */}
        <section>
          <div className="mb-16">
            <h2 className="text-2xl font-medium text-gray-900 mb-3">Color system</h2>
            <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
              A refined palette emphasizing clarity and sophistication through thoughtful restraint
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Primary Blues */}
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-gray-900">Primary blues</CardTitle>
                <CardDescription className="text-gray-500">Brand foundation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-blue-600 border border-gray-100"></div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Blue 600</div>
                    <div className="text-xs text-gray-400 font-mono">#2563eb</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-blue-500 border border-gray-100"></div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Blue 500</div>
                    <div className="text-xs text-gray-400 font-mono">#3b82f6</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-blue-400 border border-gray-100"></div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Blue 400</div>
                    <div className="text-xs text-gray-400 font-mono">#60a5fa</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Neutrals */}
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-gray-900">Neutrals</CardTitle>
                <CardDescription className="text-gray-500">Text and surfaces</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-900 border border-gray-100"></div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Gray 900</div>
                    <div className="text-xs text-gray-400 font-mono">#111827</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-600 border border-gray-100"></div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Gray 600</div>
                    <div className="text-xs text-gray-400 font-mono">#4b5563</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-100 border border-gray-200"></div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Gray 100</div>
                    <div className="text-xs text-gray-400 font-mono">#f3f4f6</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subtle Accents */}
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-gray-900">Subtle accents</CardTitle>
                <CardDescription className="text-gray-500">Refined highlights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-amber-50 border border-amber-100"></div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Warm neutral</div>
                    <div className="text-xs text-gray-400 font-mono">#fffbeb</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-blue-50 border border-blue-100"></div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Cool neutral</div>
                    <div className="text-xs text-gray-400 font-mono">#eff6ff</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-green-50 border border-green-100"></div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Success tone</div>
                    <div className="text-xs text-gray-400 font-mono">#f0fdf4</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Colors */}
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-gray-900">System tones</CardTitle>
                <CardDescription className="text-gray-500">Functional colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-white border border-gray-200"></div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Pure white</div>
                    <div className="text-xs text-gray-400 font-mono">#ffffff</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-100"></div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Soft surface</div>
                    <div className="text-xs text-gray-400 font-mono">#f9fafb</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-200 border border-gray-300"></div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Subtle border</div>
                    <div className="text-xs text-gray-400 font-mono">#e5e7eb</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section>
          <div className="mb-16">
            <h2 className="text-2xl font-medium text-gray-900 mb-3">Typography</h2>
            <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
              Refined hierarchy emphasizing clarity and elegant proportion
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-gray-900 font-medium">Headings</CardTitle>
                <CardDescription className="text-gray-500">Semantic hierarchy with restraint</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h1 className="text-3xl font-medium text-gray-900 mb-2 leading-tight">Primary heading</h1>
                  <code className="text-xs text-gray-400 font-mono">text-3xl font-medium</code>
                </div>
                <div>
                  <h2 className="text-2xl font-medium text-gray-900 mb-2 leading-tight">Secondary heading</h2>
                  <code className="text-xs text-gray-400 font-mono">text-2xl font-medium</code>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2 leading-tight">Tertiary heading</h3>
                  <code className="text-xs text-gray-400 font-mono">text-xl font-medium</code>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2 leading-relaxed">Section heading</h4>
                  <code className="text-xs text-gray-400 font-mono">text-lg font-medium</code>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-gray-900 font-medium">Body text</CardTitle>
                <CardDescription className="text-gray-500">Comfortable reading experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <p className="text-lg text-gray-700 mb-2 leading-relaxed max-w-sm">Large introduction text for emphasis and important content that requires attention.</p>
                  <code className="text-xs text-gray-400 font-mono">text-lg text-gray-700</code>
                </div>
                <div>
                  <p className="text-base text-gray-600 mb-2 leading-relaxed max-w-sm">Standard paragraph text for most body content with comfortable reading flow.</p>
                  <code className="text-xs text-gray-400 font-mono">text-base text-gray-600</code>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2 leading-relaxed max-w-sm">Supporting text for captions and secondary information.</p>
                  <code className="text-xs text-gray-400 font-mono">text-sm text-gray-500</code>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2 leading-relaxed max-w-sm">Fine print for metadata and minimal information.</p>
                  <code className="text-xs text-gray-400 font-mono">text-xs text-gray-400</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Spacing Guidelines */}
        <section>
          <div className="mb-16">
            <h2 className="text-2xl font-medium text-gray-900 mb-3">Spacing & layout</h2>
            <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
              Generous whitespace creating breathing room and visual hierarchy
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-gray-900 font-medium">Vertical rhythm</CardTitle>
                <CardDescription className="text-gray-500">Consistent spacing increments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <div className="mb-3">
                    <code className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded font-mono">mb-32, mt-32</code>
                    <span className="text-gray-900 ml-4 font-medium">Major sections (8rem)</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">Substantial breathing room between primary content areas</p>
                </div>
                <div>
                  <div className="mb-3">
                    <code className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded font-mono">mb-16, mt-16</code>
                    <span className="text-gray-900 ml-4 font-medium">Component groups (4rem)</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">Space between related component collections</p>
                </div>
                <div>
                  <div className="mb-3">
                    <code className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded font-mono">mb-12, mt-12</code>
                    <span className="text-gray-900 ml-4 font-medium">Content blocks (3rem)</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">Standard spacing for content separation</p>
                </div>
                <div>
                  <div className="mb-3">
                    <code className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded font-mono">mb-8, mt-8</code>
                    <span className="text-gray-900 ml-4 font-medium">Element spacing (2rem)</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">Space between individual interface elements</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-gray-900 font-medium">Internal spacing</CardTitle>
                <CardDescription className="text-gray-500">Comfortable content padding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <div className="mb-3">
                    <code className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded font-mono">p-12, px-12, py-12</code>
                    <span className="text-gray-900 ml-4 font-medium">Large containers (3rem)</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">Generous padding for primary content areas</p>
                </div>
                <div>
                  <div className="mb-3">
                    <code className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded font-mono">p-8, px-8, py-8</code>
                    <span className="text-gray-900 ml-4 font-medium">Card padding (2rem)</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">Standard card and component internal spacing</p>
                </div>
                <div>
                  <div className="mb-3">
                    <code className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded font-mono">px-6, py-4</code>
                    <span className="text-gray-900 ml-4 font-medium">Button padding</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">Refined button internal spacing for comfort</p>
                </div>
                <div>
                  <div className="mb-3">
                    <code className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded font-mono">p-4, px-4, py-4</code>
                    <span className="text-gray-900 ml-4 font-medium">Compact padding (1rem)</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">For smaller components and tight layouts</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm lg:col-span-2">
              <CardHeader className="pb-6">
                <CardTitle className="text-gray-900 font-medium">Layout principles</CardTitle>
                <CardDescription className="text-gray-500">Classical minimal design philosophy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-lg font-medium text-gray-900">Essential practices</h4>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Embrace generous whitespace for visual breathing room</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Maintain consistent spacing increments throughout</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Limit content width for optimal reading comfort</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Group related elements with purposeful proximity</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-lg font-medium text-gray-900">Avoid complexity</h4>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-3">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Dense layouts that overwhelm the viewer</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Inconsistent spacing that disrupts visual flow</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Excessive visual elements competing for attention</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Text lines extending beyond comfortable reading width</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <div className="mb-16">
            <h2 className="text-2xl font-medium text-gray-900 mb-3">Buttons</h2>
            <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
              Refined interaction elements with subtle styling and clean geometry
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-gray-900 font-medium">Primary actions</CardTitle>
                <CardDescription className="text-gray-500">Essential interface interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg px-6 py-3">
                    Get started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg px-6 py-3">
                    Learn more
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg px-5 py-2.5">
                    Explore our work
                  </Button>
                  <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg px-5 py-2.5">
                    Get in touch
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg px-4 py-2">
                    Small action
                  </Button>
                  <Button size="sm" className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg px-4 py-2">
                    Secondary
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-gray-900 font-medium">Subtle variants</CardTitle>
                <CardDescription className="text-gray-500">Minimal interaction styles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-transparent border-0 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg px-6 py-3">
                    Ghost button
                  </Button>
                  <Button size="lg" className="bg-transparent border-0 text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline px-6 py-3">
                    Link button
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 hover:border-amber-300 rounded-lg px-5 py-2.5">
                    Warm accent
                  </Button>
                  <Button className="bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 rounded-lg px-5 py-2.5">
                    Success action
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300 rounded-lg px-5 py-2.5">
                    Subtle secondary
                  </Button>
                  <Button size="sm" className="bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300 rounded-lg px-4 py-2">
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cards */}
        <section>
          <div className="mb-16">
            <h2 className="text-2xl font-medium text-gray-900 mb-3">Cards & components</h2>
            <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
              Clean content presentation with subtle shadows and refined proportions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-100 hover:border-gray-200">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-medium text-gray-900">Strategic consulting</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Comprehensive business strategy and market positioning that drives meaningful results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-700 hover:bg-transparent">
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            {/* Team Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-medium">
                    SJ
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Sarah Johnson</h3>
                    <p className="text-gray-600 text-sm mb-2">Creative Director</p>
                    <p className="text-gray-400 text-xs">New York, NY</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-blue-50 border border-blue-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl font-medium text-blue-900">150+</CardTitle>
                    <CardDescription className="text-blue-700">Projects completed</CardDescription>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* News Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 lg:col-span-2 bg-white border border-gray-100">
              <CardContent className="p-8">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <Badge className="mb-3 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">
                      Industry insights
                    </Badge>
                    <h3 className="font-medium text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-relaxed">
                      The future of creative marketing partnerships
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      How strategic alliances between agencies are reshaping the industry landscape and delivering exceptional outcomes for clients.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>March 15, 2024</span>
                      <span>•</span>
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-blue-50 border border-blue-100">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900 font-medium">Ready to begin?</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Join our network of exceptional agencies and transform your creative potential.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg">
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
            <h2 className="text-2xl font-medium text-gray-900 mb-3">Badges & accents</h2>
            <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
              Subtle status indicators and refined visual accents
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-gray-900 font-medium">Badge variations</CardTitle>
                <CardDescription className="text-gray-500">Status and category indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gray-900 text-white hover:bg-gray-800">Default</Badge>
                  <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-200">Secondary</Badge>
                  <Badge className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">Outline</Badge>
                  <Badge className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100">Alert</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100">Featured</Badge>
                  <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-100">Active</Badge>
                  <Badge className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100">Pending</Badge>
                  <Badge className="bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100">Priority</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-gray-900 font-medium">Icon system</CardTitle>
                <CardDescription className="text-gray-500">Consistent iconography with refined styling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Users className="h-6 w-6 text-gray-600" />
                    <span className="text-xs text-gray-500">Team</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Target className="h-6 w-6 text-gray-600" />
                    <span className="text-xs text-gray-500">Strategy</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Zap className="h-6 w-6 text-gray-600" />
                    <span className="text-xs text-gray-500">Performance</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Star className="h-6 w-6 text-gray-600" />
                    <span className="text-xs text-gray-500">Quality</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section>
          <div className="mb-16">
            <h2 className="text-2xl font-medium text-gray-900 mb-3">Design principles</h2>
            <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
              Classical minimal philosophy for sophisticated, timeless design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-green-800 flex items-center gap-2 font-medium">
                  ✓ Embrace
                </CardTitle>
              </CardHeader>
              <CardContent className="text-green-700 space-y-3 leading-relaxed">
                <p>• Sentence case for all text elements</p>
                <p>• Consistent spacing rhythm (4, 8, 12, 16, 32px)</p>
                <p>• Subtle rounded corners (4px, 8px, 12px)</p>
                <p>• Restrained color palette with purpose</p>
                <p>• Generous whitespace for breathing room</p>
                <p>• Clean geometric forms and proportions</p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-red-800 flex items-center gap-2 font-medium">
                  ✗ Avoid
                </CardTitle>
              </CardHeader>
              <CardContent className="text-red-700 space-y-3 leading-relaxed">
                <p>• All caps text in any context</p>
                <p>• Heavy font weights for body text</p>
                <p>• Dense layouts without breathing room</p>
                <p>• Inconsistent spacing patterns</p>
                <p>• Excessive visual complexity</p>
                <p>• Poor contrast ratios and accessibility</p>
              </CardContent>
            </Card>
          </div>
        </section>

      </div>
    </div>
  )
}