import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cases } from '@/data/cases'
import { ArrowRight, Users, Star, Target, TrendingUp, Award } from 'lucide-react'

import { IntelligentMotionChoreographer } from '../components/IntelligentMotionChoreographer'
import { AdaptiveContentArchitecture } from '../components/AdaptiveContentArchitecture'
import { CollaborativeJourneyGuide } from '../components/CollaborativeJourneyGuide'

export default function CasesPage() {
  return (
    <CollaborativeJourneyGuide 
      journeyType="exploration"
      showProgressIndicators={true}
      allowPersonalization={true}
    >
      <div className="relative z-10 pt-24 pb-16">
        {/* Cases Hero */}
        <IntelligentMotionChoreographer 
          sectionId="cases-hero" 
          contentType="hero" 
          priority="high"
        >
          <section className="px-4 py-20">
            <AdaptiveContentArchitecture
              sectionId="cases-hero"
              variants={[
                { id: 'visual', type: 'visual', layout: 'spotlight', priority: 1, userSegments: ['visual-learner'], loadWeight: 'medium' },
                { id: 'results-focused', type: 'data-rich', layout: 'dashboard', priority: 2, userSegments: ['data-driven'], loadWeight: 'heavy' }
              ]}
              className="max-w-6xl mx-auto text-center"
            >
              <div className="space-y-8 mb-16">
                <div className="inline-flex items-center space-x-4 text-blue-300 text-sm font-medium mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <span>Partnership Success Stories</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="block text-white mb-2">Partnership</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                    in Action
                  </span>
                </h1>

                <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                  Real results from real collaborations. See what happens when equals come together 
                  to solve complex challenges without compromise.
                </p>

                {/* Success Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-12">
                  {[
                    { icon: <TrendingUp className="w-6 h-6" />, value: "300%", label: "Average ROI Increase", color: "text-green-400" },
                    { icon: <Users className="w-6 h-6" />, value: "85%", label: "Faster Time to Market", color: "text-blue-400" },
                    { icon: <Star className="w-6 h-6" />, value: "98%", label: "Client Satisfaction", color: "text-yellow-400" },
                    { icon: <Award className="w-6 h-6" />, value: "45+", label: "Industry Awards Won", color: "text-purple-400" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6 text-center hover:border-blue-600/30 transition-all duration-300 group">
                      <div className={`${stat.color} mb-3 flex justify-center group-hover:scale-110 transition-transform`}>
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-slate-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AdaptiveContentArchitecture>
          </section>
        </IntelligentMotionChoreographer>

        {/* Featured Case Studies */}
        <IntelligentMotionChoreographer 
          sectionId="featured-cases" 
          contentType="content"
          priority="high"
        >
          <section className="px-4 py-24">
            <AdaptiveContentArchitecture
              sectionId="featured-cases"
              variants={[
                { id: 'story-focused', type: 'visual', layout: 'masonry', priority: 1, userSegments: ['story-interested'], loadWeight: 'medium' },
                { id: 'results-focused', type: 'data-rich', layout: 'grid', priority: 2, userSegments: ['metrics-focused'], loadWeight: 'heavy' }
              ]}
              className="max-w-7xl mx-auto"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
                  Collaborative Breakthroughs
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-8" />
                <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                  Every success story represents multiple agencies working as equals to deliver exceptional results
                </p>
              </div>

              {/* Case Studies Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                {cases.slice(0, 4).map((caseStudy, index) => {
                  const isLarge = index === 0 || index === 2
                  
                  return (
                    <Card 
                      key={caseStudy.id} 
                      className={`bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:border-blue-600/30 transition-all duration-500 hover:shadow-xl hover:shadow-blue-900/20 group overflow-hidden ${isLarge ? 'lg:row-span-2' : ''}`}
                    >
                      <div className={`${isLarge ? 'aspect-[4/3]' : 'aspect-video'} relative overflow-hidden`}>
                        <Image 
                          src={caseStudy.thumbnail} 
                          alt={caseStudy.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Collaborative Partnership Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Partnership Indicator */}
                        <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600/80 backdrop-blur-sm text-white text-xs font-medium rounded-full flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>Collaborative Project</span>
                        </div>
                        
                        {/* Results Badge */}
                        <div className="absolute top-4 right-4 px-3 py-1 bg-green-600/80 backdrop-blur-sm text-white text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Award Winner
                        </div>
                        
                        {/* Hover Content Overlay */}
                        <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-white">
                            <div className="w-12 h-1 bg-blue-400 rounded-full mb-3" />
                            <p className="text-sm text-blue-200 font-medium mb-2">Partnership Success</p>
                            <p className="text-xs text-slate-300">Multiple agencies • Collaborative approach</p>
                          </div>
                        </div>
                      </div>
                      
                      <CardHeader className="p-8">
                        <div className="flex items-center space-x-2 text-blue-400 text-sm font-medium mb-3">
                          <Target className="w-4 h-4" />
                          <span>Collaborative Success Story</span>
                        </div>
                        <CardTitle className={`${isLarge ? 'text-2xl lg:text-3xl' : 'text-xl'} font-bold text-white group-hover:text-blue-100 transition-colors leading-tight mb-3`}>
                          {caseStudy.name}
                        </CardTitle>
                        <CardDescription className={`text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors ${isLarge ? 'text-base' : 'text-sm'}`}>
                          {caseStudy.excerpt}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="px-8 pb-8">
                        {/* Partnership Benefits Showcase */}
                        <div className="space-y-4 mb-6">
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            <span className="text-slate-300">Multi-agency collaboration</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-blue-400 rounded-full" />
                            <span className="text-slate-300">Accelerated timeline</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-purple-400 rounded-full" />
                            <span className="text-slate-300">Award-winning results</span>
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/10 p-0 h-auto font-medium transition-all duration-300 group-hover:translate-x-2 flex items-center space-x-2"
                        >
                          <span>View Partnership Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </CardContent>
                      
                      {/* Partnership Enhancement Line */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </Card>
                  )
                })}
              </div>

              {/* All Case Studies */}
              <div className="text-center mb-16">
                <h3 className="text-2xl font-bold text-white mb-8">More Partnership Success Stories</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {cases.slice(4).map((caseStudy, index) => (
                  <Card 
                    key={caseStudy.id} 
                    className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:border-blue-600/30 transition-all duration-500 hover:shadow-xl hover:shadow-blue-900/20 group overflow-hidden"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <Image 
                        src={caseStudy.thumbnail} 
                        alt={caseStudy.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Collaboration Indicator */}
                      <div className="absolute top-3 left-3 px-2 py-1 bg-blue-600/80 backdrop-blur-sm text-white text-xs font-medium rounded-full flex items-center space-x-1">
                        <Users className="w-2 h-2" />
                        <span>Partnership</span>
                      </div>
                    </div>
                    
                    <CardHeader className="p-6">
                      <div className="flex items-center space-x-2 text-blue-400 text-xs font-medium mb-2">
                        <Star className="w-3 h-3" />
                        <span>Collaborative Success</span>
                      </div>
                      <CardTitle className="text-lg font-semibold text-white group-hover:text-blue-100 transition-colors leading-tight mb-2">
                        {caseStudy.name}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="px-6 pb-6">
                      <CardDescription className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors mb-4">
                        {caseStudy.excerpt}
                      </CardDescription>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-blue-300/80">
                          <div className="w-1 h-1 bg-blue-400 rounded-full" />
                          <span>Multi-agency project</span>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/10 p-0 h-auto font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                    
                    {/* Partnership Line */}
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Card>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 max-w-4xl mx-auto">
                  <h3 className="text-3xl font-bold text-white mb-6">Ready to Create Your Success Story?</h3>
                  <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
                    See how our collaborative approach can transform your challenges into award-winning results. 
                    No compromise, just partnership.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 group">
                      <Link href="/nightly/synthesis-e/contact" className="flex items-center space-x-2">
                        <Users className="w-5 h-5" />
                        <span>Start Your Partnership</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    
                    <Button asChild className="bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-600/10 hover:border-blue-300 hover:text-blue-300 rounded-full px-8 py-4 text-lg transition-all duration-300 hover:scale-105 group">
                      <Link href="/nightly/synthesis-e/agencies" className="flex items-center space-x-2">
                        <Star className="w-5 h-5" />
                        <span>Meet Our Partners</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </AdaptiveContentArchitecture>
          </section>
        </IntelligentMotionChoreographer>
      </div>
    </CollaborativeJourneyGuide>
  )
}