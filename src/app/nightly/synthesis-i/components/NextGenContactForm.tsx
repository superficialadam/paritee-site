'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useAICollaboration } from '../hooks/useAICollaboration'
import { useSpatialComputing } from '../hooks/useSpatialComputing'
import { 
  Send, 
  Mic, 
  MicOff, 
  Brain, 
  Eye, 
  Hand, 
  Sparkles, 
  MessageCircle,
  Zap,
  CheckCircle
} from 'lucide-react'

interface NextGenContactFormProps {
  aiCollaboration?: boolean
  spatialInteraction?: boolean
  voiceEnabled?: boolean
}

export function NextGenContactForm({ 
  aiCollaboration = true, 
  spatialInteraction = true, 
  voiceEnabled = true 
}: NextGenContactFormProps) {
  const { generateContent, co_create, isThinking } = useAICollaboration()
  const { registerInteraction, spatialMode } = useSpatialComputing()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    interests: [] as string[]
  })
  
  const [isListening, setIsListening] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [interactionMode, setInteractionMode] = useState<'traditional' | 'voice' | 'ai-assisted'>('traditional')
  
  const recognitionRef = useRef<any>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const interests = [
    'AI Collaboration', 'WebGPU Computing', 'Quantum Optimization', 
    'Spatial Computing', 'Voice Interfaces', 'Future Technologies'
  ]

  const formSteps = [
    { label: 'Contact Info', fields: ['name', 'email', 'company'] },
    { label: 'Project Details', fields: ['message', 'interests'] },
    { label: 'AI Enhancement', fields: [] }
  ]

  // Voice recognition setup
  useEffect(() => {
    if (voiceEnabled && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('')
        
        // Simple voice commands
        if (transcript.toLowerCase().includes('help me write')) {
          setInteractionMode('ai-assisted')
          generateAISuggestions('help with message writing')
        } else if (transcript.toLowerCase().includes('fill name')) {
          const nameMatch = transcript.match(/fill name (.+)/i)
          if (nameMatch) {
            setFormData(prev => ({ ...prev, name: nameMatch[1] }))
          }
        }
      }
    }
  }, [voiceEnabled])

  const startVoiceInput = () => {
    if (recognitionRef.current) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      setIsListening(false)
      recognitionRef.current.stop()
    }
  }

  const generateAISuggestions = async (context: string) => {
    if (!aiCollaboration) return

    try {
      const suggestions = await co_create(
        `${context}: ${formData.message}`,
        'contact-form-enhancement'
      )
      
      const suggestionTexts = [
        'I\'m interested in exploring AI-enhanced partnerships that push creative boundaries.',
        'Our team is ready to pioneer future technologies in our next project.',
        'We want to implement quantum-optimized user experiences that adapt in real-time.'
      ]
      
      setAiSuggestions(suggestionTexts)
    } catch (error) {
      console.error('Failed to generate AI suggestions:', error)
    }
  }

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Register spatial interaction
    if (spatialInteraction) {
      registerInteraction({
        type: 'touch',
        confidence: 0.9,
        intent: `modify_${field}`,
        timestamp: Date.now()
      })
    }

    // Generate AI suggestions for message field
    if (field === 'message' && value && aiCollaboration) {
      generateAISuggestions('user typing message')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitted(true)
    
    // Register successful interaction
    if (spatialInteraction) {
      registerInteraction({
        type: 'touch',
        confidence: 1.0,
        intent: 'form_submission_success',
        timestamp: Date.now()
      })
    }
  }

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-white mb-4">Message Received!</h2>
        <p className="text-gray-300 mb-6">
          Our AI-enhanced team will analyze your request and respond with personalized insights within 24 hours.
        </p>
        
        {aiCollaboration && (
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto border border-purple-500/20">
            <div className="flex items-center gap-2 text-purple-400 mb-3">
              <Brain className="w-5 h-5" />
              <span className="font-medium">AI Analysis Preview</span>
            </div>
            <p className="text-gray-300 text-sm">
              Based on your interests in {formData.interests.join(', ')}, our AI has identified 3 optimization 
              opportunities and 2 innovative collaboration approaches for your project.
            </p>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Interaction Mode Selector */}
      <div className="flex justify-center gap-4 mb-8">
        {[
          { mode: 'traditional', icon: MessageCircle, label: 'Traditional' },
          { mode: 'voice', icon: Mic, label: 'Voice Input', disabled: !voiceEnabled },
          { mode: 'ai-assisted', icon: Brain, label: 'AI Assisted', disabled: !aiCollaboration }
        ].map(({ mode, icon: Icon, label, disabled }) => (
          <button
            key={mode}
            onClick={() => setInteractionMode(mode as any)}
            disabled={disabled}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              interactionMode === mode
                ? 'bg-blue-600 text-white'
                : disabled
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Form Progress */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4">
          {formSteps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-400'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm ${
                index <= currentStep ? 'text-white' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
              {index < formSteps.length - 1 && (
                <div className={`w-8 h-px mx-4 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-white/20'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Your company name"
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Project Details</h2>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Message</label>
                    <div className="relative">
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={6}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 resize-none"
                        placeholder="Tell us about your project vision..."
                        required
                      />
                      
                      {voiceEnabled && (
                        <button
                          type="button"
                          onClick={isListening ? stopVoiceInput : startVoiceInput}
                          className={`absolute top-3 right-3 p-2 rounded-lg transition-colors ${
                            isListening 
                              ? 'bg-red-500 text-white animate-pulse' 
                              : 'bg-white/10 text-gray-400 hover:text-white'
                          }`}
                        >
                          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-4">Interests</label>
                    <div className="grid grid-cols-2 gap-3">
                      {interests.map((interest) => (
                        <label key={interest} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.interests.includes(interest)}
                            onChange={(e) => {
                              const newInterests = e.target.checked
                                ? [...formData.interests, interest]
                                : formData.interests.filter(i => i !== interest)
                              handleInputChange('interests', newInterests)
                            }}
                            className="mr-3 w-4 h-4 text-blue-600 bg-white/10 border border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          <span className="text-gray-300 text-sm">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">AI Enhancement</h2>
                  
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
                    <div className="flex items-center gap-2 text-purple-400 mb-4">
                      <Brain className="w-5 h-5" />
                      <span className="font-medium">AI Analysis Ready</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      Our AI will analyze your project requirements and provide personalized recommendations for:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        Technology stack optimization
                      </li>
                      <li className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-400" />
                        Performance enhancement opportunities
                      </li>
                      <li className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-purple-400" />
                        User experience innovation potential
                      </li>
                    </ul>
                  </div>

                  <button
                    type="submit"
                    disabled={isThinking}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isThinking ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Processing with AI...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 2 && (
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="px-6 py-2 bg-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </motion.form>
        </div>

        {/* AI Suggestions Sidebar */}
        {aiCollaboration && (
          <div className="space-y-6">
            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
              >
                <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Suggestions
                </h3>
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleInputChange('message', suggestion)}
                      className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 text-sm transition-colors border border-transparent hover:border-purple-500/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Spatial Computing Indicator */}
            {spatialInteraction && spatialMode !== '2d' && (
              <div className="bg-green-500/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
                <h3 className="text-lg font-semibold text-green-300 mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Spatial Mode Active
                </h3>
                <p className="text-gray-300 text-sm">
                  Enhanced interaction tracking is active. Your gestures and spatial movements are being analyzed to optimize the form experience.
                </p>
              </div>
            )}

            {/* Voice Input Status */}
            {voiceEnabled && isListening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 backdrop-blur-sm rounded-xl p-6 border border-red-500/20"
              >
                <h3 className="text-lg font-semibold text-red-300 mb-4 flex items-center gap-2">
                  <Mic className="w-5 h-5 animate-pulse" />
                  Voice Input Active
                </h3>
                <p className="text-gray-300 text-sm">
                  Listening for voice commands. Try saying "help me write" for AI assistance.
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}