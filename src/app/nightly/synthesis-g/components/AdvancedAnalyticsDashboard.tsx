'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useBusinessIntelligence } from '../intelligence/BusinessContextEngine'
import { usePredictiveEngagement } from '../intelligence/PredictiveEngagementIntelligence'

// Analytics Dashboard Interfaces
interface MarketIntelligence {
  marketPosition: {
    currentRanking: number
    competitiveAdvantages: string[]
    marketGaps: string[]
    opportunityScore: number
  }
  competitorAnalysis: {
    primaryCompetitors: Array<{
      name: string
      marketShare: number
      strengths: string[]
      weaknesses: string[]
      pricing: 'premium' | 'standard' | 'budget'
    }>
    competitiveDifferentiators: string[]
    marketTrends: string[]
  }
  strategicRecommendations: Array<{
    category: 'positioning' | 'pricing' | 'capabilities' | 'partnerships'
    recommendation: string
    impact: 'high' | 'medium' | 'low'
    timeframe: string
    investment: 'low' | 'medium' | 'high'
  }>
}

interface ROICalculation {
  scenario: 'conservative' | 'realistic' | 'optimistic'
  investmentRange: { min: number; max: number }
  expectedReturns: {
    year1: { revenue: number; efficiency: number; growth: number }
    year2: { revenue: number; efficiency: number; growth: number }
    year3: { revenue: number; efficiency: number; growth: number }
  }
  breakEvenPoint: number // months
  riskFactors: string[]
  confidenceLevel: number // 0-100
}

interface RealTimeMetrics {
  engagementQuality: number
  conversionProbability: number
  competitiveAdvantage: number
  strategicFit: number
  urgencyLevel: number
  decisionMakerConfidence: number
  partnershipReadiness: number
  expectedROI: number
}

// Advanced Analytics Dashboard Component
export function AdvancedAnalyticsDashboard() {
  const { intelligenceState, getCompetitivePositioning } = useBusinessIntelligence()
  const { engagementState, getConversionProbability } = usePredictiveEngagement()
  
  const [marketIntelligence, setMarketIntelligence] = useState<MarketIntelligence | null>(null)
  const [roiCalculations, setROICalculations] = useState<ROICalculation[]>([])
  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetrics>({
    engagementQuality: 0,
    conversionProbability: 0,
    competitiveAdvantage: 0,
    strategicFit: 0,
    urgencyLevel: 0,
    decisionMakerConfidence: 0,
    partnershipReadiness: 0,
    expectedROI: 0
  })
  
  const [activeView, setActiveView] = useState<'overview' | 'competitive' | 'roi' | 'recommendations'>('overview')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const refreshInterval = useRef<NodeJS.Timeout | null>(null)

  // Generate Market Intelligence
  const generateMarketIntelligence = useCallback((): MarketIntelligence => {
    const { businessContext, competitiveIntel } = intelligenceState
    
    // Industry-specific competitive analysis
    const industryCompetitors = {
      technology: [
        { name: 'Traditional Tech Agencies', marketShare: 35, strengths: ['Established relationships', 'Industry knowledge'], weaknesses: ['Outdated approaches', 'High overhead'], pricing: 'premium' as const },
        { name: 'Freelancer Networks', marketShare: 25, strengths: ['Cost-effective', 'Specialized skills'], weaknesses: ['Inconsistent quality', 'No strategic vision'], pricing: 'budget' as const },
        { name: 'In-house Teams', marketShare: 20, strengths: ['Product knowledge', 'Alignment'], weaknesses: ['Limited expertise', 'Resource constraints'], pricing: 'standard' as const },
        { name: 'Consulting Firms', marketShare: 20, strengths: ['Strategic thinking', 'Global reach'], weaknesses: ['High cost', 'Generic solutions'], pricing: 'premium' as const }
      ],
      healthcare: [
        { name: 'Healthcare Marketing Specialists', marketShare: 40, strengths: ['Compliance expertise', 'Medical knowledge'], weaknesses: ['Limited innovation', 'Traditional approaches'], pricing: 'premium' as const },
        { name: 'Medical Communications', marketShare: 30, strengths: ['Scientific credibility', 'Regulatory knowledge'], weaknesses: ['Poor creativity', 'Slow adaptation'], pricing: 'premium' as const },
        { name: 'Digital Health Agencies', marketShare: 20, strengths: ['Modern approach', 'Tech-savvy'], weaknesses: ['Limited healthcare experience', 'Compliance gaps'], pricing: 'standard' as const },
        { name: 'Pharma Internal Teams', marketShare: 10, strengths: ['Product expertise', 'Quick decisions'], weaknesses: ['Resource limitations', 'Narrow perspective'], pricing: 'standard' as const }
      ],
      finance: [
        { name: 'Financial Services Agencies', marketShare: 35, strengths: ['Industry expertise', 'Compliance knowledge'], weaknesses: ['Conservative approach', 'Slow innovation'], pricing: 'premium' as const },
        { name: 'Fintech Specialists', marketShare: 25, strengths: ['Innovation focus', 'Tech understanding'], weaknesses: ['Limited traditional finance experience', 'Regulatory gaps'], pricing: 'standard' as const },
        { name: 'B2B Financial Communications', marketShare: 25, strengths: ['Professional networks', 'Trust building'], weaknesses: ['Limited creativity', 'Outdated methods'], pricing: 'premium' as const },
        { name: 'Internal Marketing Teams', marketShare: 15, strengths: ['Product knowledge', 'Brand alignment'], weaknesses: ['Resource constraints', 'Limited external perspective'], pricing: 'standard' as const }
      ]
    }
    
    const competitors = industryCompetitors[businessContext.industry as keyof typeof industryCompetitors] || 
                      industryCompetitors.technology
    
    const competitiveDifferentiators = [
      'Network effect advantages through collaborative partnerships',
      'AI-powered business intelligence for strategic decision making',
      'Real-time competitive analysis and market positioning',
      'Predictive ROI modeling with continuous optimization',
      'Cross-industry expertise through diverse agency network',
      'Performance-based partnership models with shared risk',
      'Advanced technology integration across all service areas',
      'Cultural diversity and global perspective in strategy development'
    ]
    
    const marketTrends = {
      technology: ['AI integration', 'Remote-first operations', 'Sustainability focus', 'Privacy-first marketing'],
      healthcare: ['Digital therapeutics', 'Patient-centric care', 'AI diagnostics', 'Telemedicine adoption'],
      finance: ['Open banking', 'DeFi adoption', 'ESG investing', 'Embedded finance']
    }
    
    const strategicRecommendations = [
      {
        category: 'positioning' as const,
        recommendation: 'Position as the intelligent partnership platform that provides competitive advantages',
        impact: 'high' as const,
        timeframe: '3-6 months',
        investment: 'medium' as const
      },
      {
        category: 'capabilities' as const,
        recommendation: 'Develop industry-specific AI intelligence modules for deeper market insights',
        impact: 'high' as const,
        timeframe: '6-12 months',
        investment: 'high' as const
      },
      {
        category: 'partnerships' as const,
        recommendation: 'Create exclusive partnerships with leading technology and data providers',
        impact: 'medium' as const,
        timeframe: '4-8 months',
        investment: 'medium' as const
      },
      {
        category: 'pricing' as const,
        recommendation: 'Implement value-based pricing model tied to measurable business outcomes',
        impact: 'high' as const,
        timeframe: '2-4 months',
        investment: 'low' as const
      }
    ]
    
    return {
      marketPosition: {
        currentRanking: 1, // Positioned as leader through innovation
        competitiveAdvantages: competitiveIntel.marketOpportunities,
        marketGaps: competitiveIntel.competitiveGaps,
        opportunityScore: competitiveIntel.partnershipPotential
      },
      competitorAnalysis: {
        primaryCompetitors: competitors,
        competitiveDifferentiators,
        marketTrends: marketTrends[businessContext.industry as keyof typeof marketTrends] || marketTrends.technology
      },
      strategicRecommendations
    }
  }, [intelligenceState])

  // Calculate ROI Scenarios
  const calculateROIScenarios = useCallback((): ROICalculation[] => {
    const { businessContext, competitiveIntel } = intelligenceState
    
    const baseInvestment = {
      startup: { min: 50000, max: 150000 },
      smb: { min: 100000, max: 300000 },
      midmarket: { min: 250000, max: 750000 },
      enterprise: { min: 500000, max: 1500000 }
    }[businessContext.budgetRange] || { min: 100000, max: 300000 }
    
    const scenarios: ROICalculation[] = [
      {
        scenario: 'conservative',
        investmentRange: baseInvestment,
        expectedReturns: {
          year1: {
            revenue: baseInvestment.min * 1.5,
            efficiency: baseInvestment.min * 0.3,
            growth: baseInvestment.min * 0.2
          },
          year2: {
            revenue: baseInvestment.min * 2.2,
            efficiency: baseInvestment.min * 0.5,
            growth: baseInvestment.min * 0.4
          },
          year3: {
            revenue: baseInvestment.min * 3.0,
            efficiency: baseInvestment.min * 0.8,
            growth: baseInvestment.min * 0.7
          }
        },
        breakEvenPoint: 8,
        riskFactors: ['Market conditions', 'Competition response', 'Economic uncertainty'],
        confidenceLevel: 85
      },
      {
        scenario: 'realistic',
        investmentRange: { 
          min: Math.round(baseInvestment.min * 1.2), 
          max: Math.round(baseInvestment.max * 1.2) 
        },
        expectedReturns: {
          year1: {
            revenue: baseInvestment.min * 2.5,
            efficiency: baseInvestment.min * 0.6,
            growth: baseInvestment.min * 0.4
          },
          year2: {
            revenue: baseInvestment.min * 4.0,
            efficiency: baseInvestment.min * 1.2,
            growth: baseInvestment.min * 0.8
          },
          year3: {
            revenue: baseInvestment.min * 6.5,
            efficiency: baseInvestment.min * 2.0,
            growth: baseInvestment.min * 1.5
          }
        },
        breakEvenPoint: 6,
        riskFactors: ['Implementation challenges', 'Team adoption', 'Market dynamics'],
        confidenceLevel: 78
      },
      {
        scenario: 'optimistic',
        investmentRange: { 
          min: Math.round(baseInvestment.min * 1.5), 
          max: Math.round(baseInvestment.max * 1.5) 
        },
        expectedReturns: {
          year1: {
            revenue: baseInvestment.min * 4.0,
            efficiency: baseInvestment.min * 1.0,
            growth: baseInvestment.min * 0.8
          },
          year2: {
            revenue: baseInvestment.min * 7.5,
            efficiency: baseInvestment.min * 2.2,
            growth: baseInvestment.min * 1.8
          },
          year3: {
            revenue: baseInvestment.min * 12.0,
            efficiency: baseInvestment.min * 4.0,
            growth: baseInvestment.min * 3.0
          }
        },
        breakEvenPoint: 4,
        riskFactors: ['Market disruption risk', 'Scaling challenges', 'Competitive response'],
        confidenceLevel: 65
      }
    ]
    
    return scenarios
  }, [intelligenceState])

  // Update Real-Time Metrics
  const updateRealTimeMetrics = useCallback(() => {
    const { intelligenceState } = useBusinessIntelligence()
    const { engagementState } = usePredictiveEngagement()
    
    const metrics: RealTimeMetrics = {
      engagementQuality: Math.round(
        (engagementState.cognitiveState.attentionLevel * 0.4 +
         engagementState.cognitiveState.comprehensionSignals * 0.3 +
         (engagementState.behavioralPattern.engagementDepth === 'deep' ? 80 : 
          engagementState.behavioralPattern.engagementDepth === 'moderate' ? 60 : 
          engagementState.behavioralPattern.engagementDepth === 'analytical' ? 90 : 40) * 0.3)
      ),
      
      conversionProbability: Math.round(getConversionProbability()),
      
      competitiveAdvantage: Math.round(
        (intelligenceState.competitiveIntel.partnershipPotential * 0.6 +
         intelligenceState.competitiveIntel.marketOpportunities.length * 8 +
         (intelligenceState.businessContext.marketPosition === 'leader' ? 20 : 
          intelligenceState.businessContext.marketPosition === 'challenger' ? 15 :
          intelligenceState.businessContext.marketPosition === 'disruptor' ? 25 : 10))
      ),
      
      strategicFit: Math.round(
        (intelligenceState.competitiveIntel.partnershipPotential * 0.5 +
         (intelligenceState.businessContext.growthStage === 'growth' ? 25 : 
          intelligenceState.businessContext.growthStage === 'scale' ? 20 :
          intelligenceState.businessContext.growthStage === 'mvp' ? 15 : 10) +
         (intelligenceState.businessContext.technicalSophistication === 'advanced' ? 20 :
          intelligenceState.businessContext.technicalSophistication === 'innovative' ? 25 :
          intelligenceState.businessContext.technicalSophistication === 'intermediate' ? 15 : 5))
      ),
      
      urgencyLevel: Math.round(
        (engagementState.cognitiveState.decisionReadiness * 0.4 +
         (intelligenceState.businessContext.urgency === 'urgent' ? 90 :
          intelligenceState.businessContext.urgency === 'active' ? 70 :
          intelligenceState.businessContext.urgency === 'planning' ? 50 : 30) * 0.6)
      ),
      
      decisionMakerConfidence: Math.round(
        (engagementState.cognitiveState.comprehensionSignals * 0.3 +
         engagementState.cognitiveState.attentionLevel * 0.3 +
         (intelligenceState.businessContext.decisionMakerLevel === 'cxo' ? 90 :
          intelligenceState.businessContext.decisionMakerLevel === 'vp' ? 80 :
          intelligenceState.businessContext.decisionMakerLevel === 'director' ? 70 :
          intelligenceState.businessContext.decisionMakerLevel === 'manager' ? 60 : 50) * 0.4)
      ),
      
      partnershipReadiness: Math.round(
        (intelligenceState.competitiveIntel.partnershipPotential * 0.5 +
         engagementState.sessionProgression * 0.3 +
         engagementState.cognitiveState.decisionReadiness * 0.2)
      ),
      
      expectedROI: Math.round(
        (intelligenceState.competitiveIntel.expectedROI.min + intelligenceState.competitiveIntel.expectedROI.max) / 2
      )
    }
    
    setRealTimeMetrics(metrics)
  }, [getConversionProbability])

  // Initialize and update data
  useEffect(() => {
    const intelligence = generateMarketIntelligence()
    const roi = calculateROIScenarios()
    
    setMarketIntelligence(intelligence)
    setROICalculations(roi)
    updateRealTimeMetrics()
  }, [generateMarketIntelligence, calculateROIScenarios, updateRealTimeMetrics])

  // Auto-refresh mechanism
  useEffect(() => {
    if (autoRefresh) {
      refreshInterval.current = setInterval(() => {
        updateRealTimeMetrics()
      }, 2000) // Update every 2 seconds
    }
    
    return () => {
      if (refreshInterval.current) {
        clearInterval(refreshInterval.current)
      }
    }
  }, [autoRefresh, updateRealTimeMetrics])

  // Metric visualization component
  const MetricCard = ({ title, value, unit, trend, color }: {
    title: string
    value: number
    unit?: string
    trend?: 'up' | 'down' | 'stable'
    color: 'blue' | 'green' | 'yellow' | 'purple'
  }) => {
    const colorClasses = {
      blue: 'bg-blue-600/20 border-blue-600/40 text-blue-400',
      green: 'bg-green-600/20 border-green-600/40 text-green-400',
      yellow: 'bg-yellow-600/20 border-yellow-600/40 text-yellow-400',
      purple: 'bg-purple-600/20 border-purple-600/40 text-purple-400'
    }
    
    return (
      <div className={`p-4 rounded-none border backdrop-blur-sm ${colorClasses[color]}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-slate-300">{title}</h3>
          {trend && (
            <span className={`text-xs ${trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-slate-400'}`}>
              {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
            </span>
          )}
        </div>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold">{value}</span>
          {unit && <span className="text-sm opacity-80">{unit}</span>}
        </div>
      </div>
    )
  }

  // ROI Scenario Component
  const ROIScenarioCard = ({ scenario }: { scenario: ROICalculation }) => (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-none p-6 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white capitalize">{scenario.scenario}</h3>
        <span className={`px-3 py-1 text-xs rounded-full font-medium ${
          scenario.confidenceLevel > 80 ? 'bg-green-600/20 text-green-400' :
          scenario.confidenceLevel > 70 ? 'bg-yellow-600/20 text-yellow-400' :
          'bg-red-600/20 text-red-400'
        }`}>
          {scenario.confidenceLevel}% confidence
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-slate-400 mb-1">Investment Range</p>
          <p className="text-white font-medium">
            ${(scenario.investmentRange.min / 1000).toFixed(0)}K - ${(scenario.investmentRange.max / 1000).toFixed(0)}K
          </p>
        </div>
        <div>
          <p className="text-sm text-slate-400 mb-1">Break Even</p>
          <p className="text-white font-medium">{scenario.breakEvenPoint} months</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-slate-200">3-Year Returns</h4>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-slate-700/30 p-2 rounded">
            <p className="text-slate-400">Year 1</p>
            <p className="text-blue-400 font-medium">${(scenario.expectedReturns.year1.revenue / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-slate-700/30 p-2 rounded">
            <p className="text-slate-400">Year 2</p>
            <p className="text-blue-400 font-medium">${(scenario.expectedReturns.year2.revenue / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-slate-700/30 p-2 rounded">
            <p className="text-slate-400">Year 3</p>
            <p className="text-blue-400 font-medium">${(scenario.expectedReturns.year3.revenue / 1000).toFixed(0)}K</p>
          </div>
        </div>
      </div>
    </div>
  )

  if (!marketIntelligence || roiCalculations.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-400">Generating competitive intelligence...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Advanced Analytics & Competitive Intelligence</h2>
          <p className="text-slate-400">Real-time market analysis and strategic insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              autoRefresh 
                ? 'bg-green-600/20 text-green-400 border border-green-600/40'
                : 'bg-slate-700/50 text-slate-400 border border-slate-600/40'
            }`}
          >
            {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-slate-800/30 p-1 rounded-none border border-slate-700/50">
        {(['overview', 'competitive', 'roi', 'recommendations'] as const).map(view => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-none transition-all duration-200 capitalize ${
              activeView === view
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Dashboard Content */}
      <div className="space-y-6">
        {activeView === 'overview' && (
          <>
            {/* Real-Time Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard 
                title="Engagement Quality" 
                value={realTimeMetrics.engagementQuality} 
                unit="%" 
                color="blue"
                trend={realTimeMetrics.engagementQuality > 70 ? 'up' : realTimeMetrics.engagementQuality > 40 ? 'stable' : 'down'}
              />
              <MetricCard 
                title="Conversion Probability" 
                value={realTimeMetrics.conversionProbability} 
                unit="%" 
                color="green"
                trend={realTimeMetrics.conversionProbability > 60 ? 'up' : 'stable'}
              />
              <MetricCard 
                title="Strategic Fit Score" 
                value={realTimeMetrics.strategicFit} 
                unit="/100" 
                color="purple"
              />
              <MetricCard 
                title="Partnership Readiness" 
                value={realTimeMetrics.partnershipReadiness} 
                unit="%" 
                color="yellow"
              />
            </div>

            {/* Key Insights */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-none p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Key Strategic Insights</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-blue-400 mb-2">Competitive Advantages</h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    {getCompetitivePositioning().slice(0, 3).map((advantage, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-purple-400 mb-2">Market Opportunities</h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    {marketIntelligence.marketPosition.marketGaps.slice(0, 3).map((gap, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {activeView === 'competitive' && marketIntelligence && (
          <div className="space-y-6">
            {/* Competitive Landscape */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-none p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Competitive Landscape Analysis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {marketIntelligence.competitorAnalysis.primaryCompetitors.map((competitor, index) => (
                  <div key={index} className="bg-slate-700/30 p-4 rounded-none">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-white">{competitor.name}</h4>
                      <span className="text-sm text-slate-400">{competitor.marketShare}% share</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-green-400 font-medium mb-1">Strengths</p>
                        <ul className="space-y-0.5 text-slate-300">
                          {competitor.strengths.map((strength, i) => (
                            <li key={i}>• {strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-red-400 font-medium mb-1">Weaknesses</p>
                        <ul className="space-y-0.5 text-slate-300">
                          {competitor.weaknesses.map((weakness, i) => (
                            <li key={i}>• {weakness}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Trends */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-none p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Market Trends & Opportunities</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-blue-400 mb-3">Current Market Trends</h4>
                  <div className="space-y-2">
                    {marketIntelligence.competitorAnalysis.marketTrends.map((trend, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm text-slate-300">{trend}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-400 mb-3">Paritee Differentiators</h4>
                  <div className="space-y-2">
                    {marketIntelligence.competitorAnalysis.competitiveDifferentiators.slice(0, 4).map((diff, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="text-sm text-slate-300">{diff}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'roi' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {roiCalculations.map((scenario, index) => (
                <ROIScenarioCard key={index} scenario={scenario} />
              ))}
            </div>
            
            {/* ROI Insights */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-none p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">ROI Analysis Insights</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-blue-400 mb-3">Key Financial Benefits</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>Network effect generates exponential value growth</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>Reduced time-to-market through collaborative expertise</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>Lower risk through diversified capabilities</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>Premium positioning justifies higher pricing</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-yellow-400 mb-3">Risk Mitigation Factors</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>Phased implementation reduces financial exposure</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>Performance-based metrics ensure ROI delivery</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>Diverse agency network provides backup capabilities</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>Continuous optimization improves efficiency over time</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'recommendations' && marketIntelligence && (
          <div className="space-y-6">
            {marketIntelligence.strategicRecommendations.map((rec, index) => (
              <div key={index} className="bg-slate-800/40 border border-slate-700/50 rounded-none p-6 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white capitalize">{rec.category} Strategy</h3>
                    <p className="text-slate-300 mt-2">{rec.recommendation}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                    rec.impact === 'high' ? 'bg-red-600/20 text-red-400' :
                    rec.impact === 'medium' ? 'bg-yellow-600/20 text-yellow-400' :
                    'bg-green-600/20 text-green-400'
                  }`}>
                    {rec.impact.toUpperCase()} IMPACT
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400 mb-1">Timeframe</p>
                    <p className="text-white font-medium">{rec.timeframe}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1">Investment Level</p>
                    <p className="text-white font-medium capitalize">{rec.investment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdvancedAnalyticsDashboard