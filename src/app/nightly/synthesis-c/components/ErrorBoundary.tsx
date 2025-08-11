'use client'

import React, { Component, ReactNode, ErrorInfo } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  errorId: string
}

// Error reporting service (placeholder for real implementation)
const reportError = async (error: Error, errorInfo: ErrorInfo, errorId: string) => {
  if (process.env.NODE_ENV === 'production') {
    // Send error to monitoring service (e.g., Sentry, LogRocket, etc.)
    try {
      // Example: await errorReportingService.captureException(error, { extra: errorInfo, tags: { errorId } })
      console.error('Error reported:', { error, errorInfo, errorId })
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError)
    }
  } else {
    console.group('🚨 Error Boundary Caught Error')
    console.error('Error:', error)
    console.error('Error Info:', errorInfo)
    console.error('Error ID:', errorId)
    console.groupEnd()
  }
}

// Generate unique error ID
const generateErrorId = () => {
  return `error_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}

// Enhanced error boundary with advanced error handling
export class ErrorBoundary extends Component<Props, State> {
  private retryCount = 0
  private maxRetries = 3
  private retryDelay = 1000

  constructor(props: Props) {
    super(props)
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state to show fallback UI
    return {
      hasError: true,
      error,
      errorId: generateErrorId()
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    this.setState({
      error,
      errorInfo,
      errorId: this.state.errorId || generateErrorId()
    })

    // Report error
    reportError(error, errorInfo, this.state.errorId)

    // Performance monitoring - track error impact
    if ('performance' in window && 'measure' in window.performance) {
      try {
        window.performance.mark('error-boundary-triggered')
        window.performance.measure('error-recovery-time', 'error-boundary-triggered')
      } catch (perfError) {
        console.warn('Performance measurement failed:', perfError)
      }
    }
  }

  handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++
      
      // Add progressive delay
      const delay = this.retryDelay * Math.pow(2, this.retryCount - 1)
      
      setTimeout(() => {
        this.setState({
          hasError: false,
          error: null,
          errorInfo: null,
          errorId: ''
        })
      }, delay)
    }
  }

  handleReload = () => {
    // Attempt to preserve scroll position and form data before reload
    try {
      sessionStorage.setItem('pre_error_scroll', window.scrollY.toString())
      sessionStorage.setItem('error_recovery_attempt', Date.now().toString())
    } catch (storageError) {
      console.warn('Could not save recovery data:', storageError)
    }
    
    window.location.reload()
  }

  handleReportFeedback = () => {
    // Open feedback mechanism (could be a modal, mailto, or external service)
    const subject = encodeURIComponent(`Error Report - ${this.state.errorId}`)
    const body = encodeURIComponent(`
Error ID: ${this.state.errorId}
Timestamp: ${new Date().toISOString()}
User Agent: ${navigator.userAgent}
URL: ${window.location.href}

Description of what you were doing when the error occurred:
[Please describe here]

Error Details (for debugging):
${this.state.error?.message}
${this.state.error?.stack}
    `)
    
    window.open(`mailto:support@paritee.com?subject=${subject}&body=${body}`, '_blank')
  }

  render() {
    if (this.state.hasError) {
      // Enhanced fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4"
        >
          <div className="max-w-lg w-full">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-lg p-8 text-center shadow-xl"
            >
              {/* Error Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center"
              >
                <svg 
                  className="w-8 h-8 text-red-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.348 16.5c-.77.833.192 2.5 1.732 2.5z" 
                  />
                </svg>
              </motion.div>

              {/* Error Message */}
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-semibold text-white mb-4"
              >
                Something went wrong
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-300 mb-6 leading-relaxed"
              >
                We encountered an unexpected error while loading this page. 
                Don't worry - this issue has been automatically reported to our team.
              </motion.p>

              {/* Error ID for support */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6 p-3 bg-slate-900/50 rounded border border-slate-600/30"
              >
                <p className="text-xs text-slate-400 mb-1">Error ID for support:</p>
                <p className="text-sm font-mono text-slate-300 break-all">{this.state.errorId}</p>
              </motion.div>

              {/* Development Mode Error Details */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <motion.details 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6 text-left"
                >
                  <summary className="cursor-pointer text-sm text-slate-400 hover:text-slate-300 transition-colors mb-2">
                    View technical details
                  </summary>
                  <div className="bg-slate-950/50 p-4 rounded border border-slate-600/30 text-xs">
                    <p className="text-red-400 font-semibold mb-2">{this.state.error.message}</p>
                    <pre className="text-slate-400 overflow-auto max-h-32 whitespace-pre-wrap">
                      {this.state.error.stack}
                    </pre>
                    {this.state.errorInfo && (
                      <>
                        <p className="text-yellow-400 font-semibold mt-4 mb-2">Component Stack:</p>
                        <pre className="text-slate-400 overflow-auto max-h-32 whitespace-pre-wrap">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </>
                    )}
                  </div>
                </motion.details>
              )}

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                {this.retryCount < this.maxRetries && (
                  <button
                    onClick={this.handleRetry}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                  >
                    Try Again ({this.maxRetries - this.retryCount} attempts left)
                  </button>
                )}
                
                <button
                  onClick={this.handleReload}
                  className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                  Reload Page
                </button>
                
                <button
                  onClick={this.handleReportFeedback}
                  className="px-6 py-3 bg-transparent border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                  Report Issue
                </button>
              </motion.div>

              {/* Helpful Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 pt-6 border-t border-slate-700/50"
              >
                <p className="text-sm text-slate-400 mb-3">Need help?</p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <a 
                    href="/nightly/synthesis-c" 
                    className="text-blue-400 hover:text-blue-300 transition-colors underline"
                  >
                    Return Home
                  </a>
                  <a 
                    href="/nightly/synthesis-c/contact" 
                    className="text-blue-400 hover:text-blue-300 transition-colors underline"
                  >
                    Contact Support
                  </a>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); window.history.back() }}
                    className="text-blue-400 hover:text-blue-300 transition-colors underline"
                  >
                    Go Back
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )
    }

    return this.props.children
  }
}

// Hook version for functional components
export function useErrorBoundary() {
  return {
    captureError: (error: Error, errorInfo?: any) => {
      // This would typically integrate with the same error reporting system
      const errorId = generateErrorId()
      reportError(error, errorInfo || { componentStack: '' }, errorId)
      return errorId
    }
  }
}