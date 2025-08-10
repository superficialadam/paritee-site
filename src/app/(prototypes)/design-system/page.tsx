'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Download, Star, Users, Zap, Target } from 'lucide-react'

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">Paritee Design System</h1>
              <p className="text-slate-300 text-sm">Professional components and guidelines</p>
            </div>
            <Badge variant="secondary" className="bg-blue-900/50 text-blue-300 border-blue-700/50">
              v1.0.0
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 space-y-16">
        
        {/* Color Palette */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-white mb-2">Color System</h2>
            <p className="text-slate-300 text-lg">Our professional color palette designed for accessibility and brand consistency</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Primary Blues */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Primary Blues</CardTitle>
                <CardDescription className="text-slate-300">Main brand colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-600 border border-slate-600"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Blue 600</div>
                    <div className="text-xs text-slate-400">#2563eb</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-500 border border-slate-600"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Blue 500</div>
                    <div className="text-xs text-slate-400">#3b82f6</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-400 border border-slate-600"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Blue 400</div>
                    <div className="text-xs text-slate-400">#60a5fa</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Neutrals */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Neutrals</CardTitle>
                <CardDescription className="text-slate-300">Text and backgrounds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-600"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Slate 900</div>
                    <div className="text-xs text-slate-400">#0f172a</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-600 border border-slate-600"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Slate 600</div>
                    <div className="text-xs text-slate-400">#475569</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-300 border border-slate-600"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Slate 300</div>
                    <div className="text-xs text-slate-400">#cbd5e1</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warm Accents */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Warm Accents</CardTitle>
                <CardDescription className="text-slate-300">Success and highlights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-amber-200/30 border border-slate-600"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Amber Subtle</div>
                    <div className="text-xs text-slate-400">#fde68a (30% opacity)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-yellow-100/20 border border-slate-600"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Warm Yellow</div>
                    <div className="text-xs text-slate-400">#fef3c7 (20% opacity)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-green-100/25 border border-slate-600"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Soft Green</div>
                    <div className="text-xs text-slate-400">#dcfce7 (25% opacity)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Background Tones */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Backgrounds</CardTitle>
                <CardDescription className="text-slate-300">Surface colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-600"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Dark Surface</div>
                    <div className="text-xs text-slate-400">#1e293b</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-700 border border-slate-600"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Card Background</div>
                    <div className="text-xs text-slate-400">#334155</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-600/50 border border-slate-600"></div>
                  <div>
                    <div className="font-medium text-sm text-white">Subtle Overlay</div>
                    <div className="text-xs text-slate-400">#475569 (50% opacity)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-white mb-2">Typography</h2>
            <p className="text-slate-300 text-lg">Clear hierarchy with proper spacing and readability</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Headings</CardTitle>
                <CardDescription className="text-slate-300">Semantic heading hierarchy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-1">Heading 1</h1>
                  <code className="text-sm text-slate-400">text-4xl font-bold</code>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-1">Heading 2</h2>
                  <code className="text-sm text-slate-400">text-3xl font-semibold</code>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-1">Heading 3</h3>
                  <code className="text-sm text-slate-400">text-2xl font-semibold</code>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-white mb-1">Heading 4</h4>
                  <code className="text-sm text-slate-400">text-xl font-medium</code>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Body Text</CardTitle>
                <CardDescription className="text-slate-300">Readable text variations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-lg text-white mb-1">Large paragraph text for important content and introductions that need emphasis.</p>
                  <code className="text-sm text-slate-400">text-lg</code>
                </div>
                <div>
                  <p className="text-base text-slate-300 mb-1">Regular paragraph text for most body content. This should be highly readable and comfortable for extended reading.</p>
                  <code className="text-sm text-slate-400">text-base</code>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Small text for captions, labels, and secondary information.</p>
                  <code className="text-sm text-slate-400">text-sm text-slate-400</code>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Extra small text for metadata and fine print.</p>
                  <code className="text-sm text-slate-400">text-xs text-slate-500</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Spacing Guidelines */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-white mb-2">Spacing & Layout</h2>
            <p className="text-slate-300 text-lg">Professional spacing system for airy, uncluttered layouts</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Margin Standards</CardTitle>
                <CardDescription className="text-slate-300">Generous margins for breathing room</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="mb-3">
                    <code className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded">mb-16, mt-16</code>
                    <span className="text-white ml-3">Section spacing (4rem)</span>
                  </div>
                  <p className="text-slate-300 text-sm">Large breathing room between major sections</p>
                </div>
                <div>
                  <div className="mb-3">
                    <code className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded">mb-12, mt-12</code>
                    <span className="text-white ml-3">Component spacing (3rem)</span>
                  </div>
                  <p className="text-slate-300 text-sm">Space between related component groups</p>
                </div>
                <div>
                  <div className="mb-3">
                    <code className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded">mb-8, mt-8</code>
                    <span className="text-white ml-3">Content spacing (2rem)</span>
                  </div>
                  <p className="text-slate-300 text-sm">Standard spacing between content blocks</p>
                </div>
                <div>
                  <div className="mb-3">
                    <code className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded">mb-6, mt-6</code>
                    <span className="text-white ml-3">Element spacing (1.5rem)</span>
                  </div>
                  <p className="text-slate-300 text-sm">Space between individual elements</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Padding Guidelines</CardTitle>
                <CardDescription className="text-slate-300">Internal spacing for comfortable content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="mb-3">
                    <code className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded">p-8, px-8, py-8</code>
                    <span className="text-white ml-3">Card padding (2rem)</span>
                  </div>
                  <p className="text-slate-300 text-sm">Generous padding for card content areas</p>
                </div>
                <div>
                  <div className="mb-3">
                    <code className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded">p-6, px-6, py-6</code>
                    <span className="text-white ml-3">Container padding (1.5rem)</span>
                  </div>
                  <p className="text-slate-300 text-sm">Standard container internal spacing</p>
                </div>
                <div>
                  <div className="mb-3">
                    <code className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded">px-4, py-3</code>
                    <span className="text-white ml-3">Button padding</span>
                  </div>
                  <p className="text-slate-300 text-sm">Comfortable button internal spacing</p>
                </div>
                <div>
                  <div className="mb-3">
                    <code className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded">p-3, px-3, py-3</code>
                    <span className="text-white ml-3">Compact padding (0.75rem)</span>
                  </div>
                  <p className="text-slate-300 text-sm">For smaller components and tight layouts</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Layout Principles</CardTitle>
                <CardDescription className="text-slate-300">Best practices for airy, professional layouts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Do: Create Breathing Room</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-300 mt-1">•</span>
                        <span>Use generous margins between sections (4rem+)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-300 mt-1">•</span>
                        <span>Allow content to breathe with ample padding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-300 mt-1">•</span>
                        <span>Limit content width for better readability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-300 mt-1">•</span>
                        <span>Group related elements with consistent spacing</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Avoid: Cramped Layouts</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-300 mt-1">•</span>
                        <span>Don't pack too much information in one view</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-300 mt-1">•</span>
                        <span>Avoid minimal margins between major sections</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-300 mt-1">•</span>
                        <span>Don't use inconsistent spacing patterns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-300 mt-1">•</span>
                        <span>Avoid text lines longer than 65 characters</span>
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
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-white mb-2">Buttons</h2>
            <p className="text-slate-300 text-lg">Modern button variants with transparent backgrounds and thin borders</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Primary Actions</CardTitle>
                <CardDescription className="text-slate-300">Main call-to-action buttons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-transparent border border-blue-400/50 text-blue-300 hover:bg-blue-400/10 hover:border-blue-400 rounded-full">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" className="bg-transparent border border-slate-400/50 text-slate-300 hover:bg-slate-400/10 hover:border-slate-400 rounded-full">
                    Learn More
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-transparent border border-blue-400/50 text-blue-300 hover:bg-blue-400/10 hover:border-blue-400 rounded-full">
                    Explore Our Work
                  </Button>
                  <Button className="bg-transparent border border-slate-400/50 text-slate-300 hover:bg-slate-400/10 hover:border-slate-400 rounded-full">
                    Get in Touch
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm" className="bg-transparent border border-blue-400/50 text-blue-300 hover:bg-blue-400/10 hover:border-blue-400 rounded-full">
                    Small Action
                  </Button>
                  <Button size="sm" className="bg-transparent border border-slate-400/50 text-slate-300 hover:bg-slate-400/10 hover:border-slate-400 rounded-full">
                    Secondary
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Special Variants</CardTitle>
                <CardDescription className="text-slate-300">Ghost, link, and accent buttons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-transparent border-0 text-slate-400 hover:bg-slate-700/30 hover:text-slate-300 rounded-full">
                    Ghost Button
                  </Button>
                  <Button size="lg" className="bg-transparent border-0 text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline">
                    Link Button
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-transparent border border-amber-200/20 text-amber-100 hover:bg-amber-200/5 hover:border-amber-200/30 rounded-full">
                    Warm Accent
                  </Button>
                  <Button className="bg-transparent border border-green-100/20 text-green-100 hover:bg-green-100/5 hover:border-green-100/30 rounded-full">
                    Success Action
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-transparent border border-slate-500/50 text-slate-400 hover:bg-slate-500/10 hover:border-slate-500 rounded-full">
                    Secondary
                  </Button>
                  <Button size="sm" className="bg-transparent border border-red-400/50 text-red-400 hover:bg-red-400/10 hover:border-red-400 rounded-full">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cards */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-white mb-2">Cards & Components</h2>
            <p className="text-slate-300 text-lg">Flexible card layouts for content presentation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service Card */}
            <Card className="group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 bg-slate-800/50 border-slate-700 hover:border-blue-400/50">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-900/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-800/50 transition-colors">
                  <Target className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-xl text-white">Strategic Consulting</CardTitle>
                <CardDescription className="text-slate-300">
                  Comprehensive business strategy and market positioning that drives real results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-400 hover:text-blue-300">
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            {/* Team Card */}
            <Card className="group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold">
                    SJ
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Sarah Johnson</h3>
                    <p className="text-slate-300 text-sm mb-2">Creative Director</p>
                    <p className="text-slate-400 text-xs">New York, NY</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-gradient-to-br from-blue-900/30 to-slate-800/50 border-blue-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold text-blue-300">150+</CardTitle>
                    <CardDescription className="text-blue-200">Projects Completed</CardDescription>
                  </div>
                  <div className="w-12 h-12 bg-blue-800/50 rounded-xl flex items-center justify-center">
                    <Star className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* News Card */}
            <Card className="group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 lg:col-span-2 bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-slate-700 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-2 bg-amber-200/10 text-amber-100 border-amber-300/15">
                      Industry News
                    </Badge>
                    <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      The Future of Creative Marketing Partnerships
                    </h3>
                    <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                      How strategic alliances between agencies are reshaping the industry landscape and delivering better outcomes for clients.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>March 15, 2024</span>
                      <span>•</span>
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-blue-800/50 to-slate-800 border-blue-700/50 text-white">
              <CardHeader>
                <CardTitle className="text-white">Ready to get started?</CardTitle>
                <CardDescription className="text-blue-200">
                  Join our network of top-tier agencies and transform your creative potential.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full rounded-full bg-transparent border border-blue-400/50 text-blue-300 hover:bg-blue-400/10 hover:border-blue-400">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badges & Icons */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-white mb-2">Badges & Accents</h2>
            <p className="text-slate-300 text-lg">Status indicators and visual accents</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Badge Variants</CardTitle>
                <CardDescription className="text-slate-300">Status and category indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-900/30 text-blue-300 border-blue-600/50 hover:bg-blue-800/30">Featured</Badge>
                  <Badge className="bg-green-100/10 text-green-100 border-green-300/15">Active</Badge>
                  <Badge className="bg-amber-200/10 text-amber-100 border-amber-300/15">Pending</Badge>
                  <Badge className="bg-yellow-100/10 text-yellow-100 border-yellow-200/15">Hot</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Icon Examples</CardTitle>
                <CardDescription className="text-slate-300">Lucide icons with consistent sizing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-700/50">
                    <Users className="h-6 w-6 text-slate-300" />
                    <span className="text-xs text-slate-400">Team</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-700/50">
                    <Target className="h-6 w-6 text-slate-300" />
                    <span className="text-xs text-slate-400">Strategy</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-700/50">
                    <Zap className="h-6 w-6 text-slate-300" />
                    <span className="text-xs text-slate-400">Performance</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-700/50">
                    <Star className="h-6 w-6 text-slate-300" />
                    <span className="text-xs text-slate-400">Quality</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-white mb-2">Design Principles</h2>
            <p className="text-slate-300 text-lg">Key guidelines for maintaining consistency</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center gap-2">
                  ✓ Do
                </CardTitle>
              </CardHeader>
              <CardContent className="text-green-200 space-y-2">
                <p>• Use sentence case for headlines and buttons</p>
                <p>• Maintain consistent spacing (4, 6, 8, 12, 16px increments)</p>
                <p>• Use rounded corners (4px, 8px, 12px) consistently</p>
                <p>• Keep color palette limited and purposeful</p>
                <p>• Ensure proper contrast ratios for accessibility</p>
              </CardContent>
            </Card>

            <Card className="border-red-500/30 bg-red-900/20">
              <CardHeader>
                <CardTitle className="text-red-300 flex items-center gap-2">
                  ✗ Don't
                </CardTitle>
              </CardHeader>
              <CardContent className="text-red-200 space-y-2">
                <p>• Avoid ALL CAPS in headlines and body text</p>
                <p>• Don't mix rounded and sharp corners inconsistently</p>
                <p>• Avoid using too many accent colors</p>
                <p>• Don't use overly heavy font weights for body text</p>
                <p>• Avoid low contrast color combinations</p>
              </CardContent>
            </Card>
          </div>
        </section>

      </div>
    </div>
  )
}