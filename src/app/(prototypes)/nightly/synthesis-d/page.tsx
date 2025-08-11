'use client'

import { Suspense } from 'react'
import AdaptiveLayoutD from '@/components/synthesis-d/AdaptiveLayoutD'
import NarrativeHeroD from '@/components/synthesis-d/NarrativeHeroD'
import ProgressiveDisclosureD from '@/components/synthesis-d/ProgressiveDisclosureD'
import EmotionalMissionD from '@/components/synthesis-d/EmotionalMissionD'
import IntelligentServicesD from '@/components/synthesis-d/IntelligentServicesD'
import AdvisoryExcellenceD from '@/components/synthesis-d/AdvisoryExcellenceD'
import ConnectedEcosystemD from '@/components/synthesis-d/ConnectedEcosystemD'
import AuthenticCasesD from '@/components/synthesis-d/AuthenticCasesD'
import HumanTeamD from '@/components/synthesis-d/HumanTeamD'
import PersonalizedContactD from '@/components/synthesis-d/PersonalizedContactD'
import { UserJourneyProvider } from '@/components/synthesis-d/UserJourneyProvider'

export default function SynthesisDPage() {
  return (
    <UserJourneyProvider>
      <AdaptiveLayoutD>
        <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900" />}>
          
          {/* Advanced Narrative Hero with Emotional Resonance */}
          <section id="narrative-entry" className="relative">
            <NarrativeHeroD />
          </section>
          
          {/* Progressive Disclosure System */}
          <ProgressiveDisclosureD>
            
            {/* Emotional Mission with Human Connection */}
            <section id="emotional-mission" data-journey-stage="discovery">
              <EmotionalMissionD />
            </section>

            {/* Intelligent Services with Adaptive Content */}
            <section id="intelligent-services" data-journey-stage="exploration">
              <IntelligentServicesD />
            </section>

            {/* Advisory Excellence Demonstration */}
            <section id="advisory-excellence" data-journey-stage="consideration">
              <AdvisoryExcellenceD />
            </section>

            {/* Connected Ecosystem Visualization */}
            <section id="connected-ecosystem" data-journey-stage="understanding">
              <ConnectedEcosystemD />
            </section>

            {/* Authentic Case Studies with Storytelling */}
            <section id="authentic-cases" data-journey-stage="validation">
              <AuthenticCasesD />
            </section>

            {/* Human Team with Personality */}
            <section id="human-team" data-journey-stage="trust">
              <HumanTeamD />
            </section>

            {/* Personalized Contact Experience */}
            <section id="personalized-contact" data-journey-stage="conversion">
              <PersonalizedContactD />
            </section>
            
          </ProgressiveDisclosureD>
          
        </Suspense>
      </AdaptiveLayoutD>
    </UserJourneyProvider>
  )
}