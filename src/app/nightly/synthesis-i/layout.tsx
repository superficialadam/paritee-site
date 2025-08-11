'use client'

import { Suspense } from 'react'
import { FutureInnovationProvider } from './hooks/useFutureInnovation'
import { QuantumOptimizationProvider } from './hooks/useQuantumOptimization'
import { AICollaborationProvider } from './hooks/useAICollaboration'
import { SpatialComputingProvider } from './hooks/useSpatialComputing'
import { FuturePerformanceMonitor } from './components/performance/FuturePerformanceMonitor'
import { ConversationalInterface } from './components/conversational-ui/ConversationalInterface'
import { VoiceGestureController } from './components/voice-gesture/VoiceGestureController'
import { BlockchainAttributionLayer } from './components/blockchain/BlockchainAttributionLayer'
import { WebGPUCanvas } from './components/webgpu/WebGPUCanvas'
import { SpatialNavigationLayer } from './components/spatial-computing/SpatialNavigationLayer'
import { QuantumUXOptimizer } from './components/quantum-optimization/QuantumUXOptimizer'

export default function SynthesisILayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Future Innovation Providers - Nested for cross-system collaboration */}
      <FutureInnovationProvider>
        <QuantumOptimizationProvider>
          <AICollaborationProvider>
            <SpatialComputingProvider>
              
              {/* WebGPU-Powered Generative Art Layer */}
              <Suspense fallback={<div className="fixed inset-0 bg-gradient-to-br from-slate-950 to-slate-900 z-0" />}>
                <WebGPUCanvas />
              </Suspense>

              {/* Quantum UX Optimization Engine */}
              <QuantumUXOptimizer />

              {/* Spatial Computing Navigation Layer */}
              <SpatialNavigationLayer />

              {/* Voice & Gesture Control Layer */}
              <VoiceGestureController />

              {/* Blockchain Creative Attribution Layer */}
              <BlockchainAttributionLayer />

              {/* Future Performance Monitoring */}
              <FuturePerformanceMonitor />

              {/* Main Content with AI Collaboration */}
              <main className="relative z-10">
                {children}
              </main>

              {/* Conversational AI Interface */}
              <ConversationalInterface />

            </SpatialComputingProvider>
          </AICollaborationProvider>
        </QuantumOptimizationProvider>
      </FutureInnovationProvider>
    </div>
  )
}