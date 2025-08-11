'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ServiceWorkerState {
  registration: ServiceWorkerRegistration | null
  isSupported: boolean
  isRegistered: boolean
  isUpdating: boolean
  hasUpdate: boolean
  error: string | null
  cacheStatus: 'idle' | 'caching' | 'cached' | 'error'
}

export default function ServiceWorkerManager() {
  const [swState, setSwState] = useState<ServiceWorkerState>({
    registration: null,
    isSupported: 'serviceWorker' in navigator,
    isRegistered: false,
    isUpdating: false,
    hasUpdate: false,
    error: null,
    cacheStatus: 'idle'
  })

  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)
  const [cacheProgress, setCacheProgress] = useState(0)

  // Service Worker registration
  const registerServiceWorker = useCallback(async () => {
    if (!swState.isSupported) {
      console.log('Service Worker not supported')
      return
    }

    try {
      // First, create the service worker file if it doesn't exist
      await createServiceWorkerFile()

      const registration = await navigator.serviceWorker.register('/sw-synthesis-c.js', {
        scope: '/nightly/synthesis-c/',
        updateViaCache: 'none' // Always check for updates
      })

      console.log('Service Worker registered:', registration)

      setSwState(prev => ({
        ...prev,
        registration,
        isRegistered: true
      }))

      // Listen for updates
      registration.addEventListener('updatefound', () => {
        console.log('Service Worker update found')
        setSwState(prev => ({ ...prev, isUpdating: true }))
        
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('Service Worker update ready')
              setSwState(prev => ({ 
                ...prev, 
                hasUpdate: true, 
                isUpdating: false 
              }))
              setShowUpdatePrompt(true)
            }
          })
        }
      })

      // Handle controlled state
      if (registration.active && !navigator.serviceWorker.controller) {
        console.log('Service Worker active but not controlling')
        window.location.reload()
      }

    } catch (error) {
      console.error('Service Worker registration failed:', error)
      setSwState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Registration failed'
      }))
    }
  }, [swState.isSupported])

  // Create service worker file dynamically
  const createServiceWorkerFile = async () => {
    // This would typically be a build-time process, but for demo purposes
    // we'll show what the service worker would contain
    const serviceWorkerContent = `
      // Synthesis-C Service Worker - Advanced Caching Strategy
      const CACHE_NAME = 'synthesis-c-v1';
      const STATIC_CACHE = 'synthesis-c-static-v1';
      const DYNAMIC_CACHE = 'synthesis-c-dynamic-v1';
      
      // Resources to cache immediately
      const STATIC_ASSETS = [
        '/nightly/synthesis-c/',
        '/nightly/synthesis-c/services',
        '/nightly/synthesis-c/cases',
        '/nightly/synthesis-c/contact',
        // Add critical CSS and JS bundles
      ];
      
      // Install event - cache static assets
      self.addEventListener('install', event => {
        event.waitUntil(
          caches.open(STATIC_CACHE)
            .then(cache => {
              console.log('Caching static assets');
              return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
        );
      });
      
      // Activate event - clean up old caches
      self.addEventListener('activate', event => {
        event.waitUntil(
          caches.keys().then(cacheNames => {
            return Promise.all(
              cacheNames.map(cacheName => {
                if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                  console.log('Deleting old cache:', cacheName);
                  return caches.delete(cacheName);
                }
              })
            );
          }).then(() => self.clients.claim())
        );
      });
      
      // Fetch event - network-first with fallback to cache
      self.addEventListener('fetch', event => {
        const { request } = event;
        
        // Skip non-GET requests
        if (request.method !== 'GET') return;
        
        // Skip external requests
        if (!request.url.startsWith(self.location.origin)) return;
        
        // API requests - network first, cache fallback
        if (request.url.includes('/api/')) {
          event.respondWith(
            fetch(request)
              .then(response => {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE).then(cache => {
                  cache.put(request, responseClone);
                });
                return response;
              })
              .catch(() => caches.match(request))
          );
          return;
        }
        
        // Static assets - cache first, network fallback
        if (request.url.match(/\\.(js|css|png|jpg|jpeg|gif|svg|webp)$/)) {
          event.respondWith(
            caches.match(request)
              .then(response => {
                if (response) return response;
                
                return fetch(request).then(response => {
                  const responseClone = response.clone();
                  caches.open(STATIC_CACHE).then(cache => {
                    cache.put(request, responseClone);
                  });
                  return response;
                });
              })
          );
          return;
        }
        
        // HTML pages - network first, cache fallback
        if (request.headers.get('accept')?.includes('text/html')) {
          event.respondWith(
            fetch(request)
              .then(response => {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE).then(cache => {
                  cache.put(request, responseClone);
                });
                return response;
              })
              .catch(() => {
                return caches.match(request)
                  .then(response => {
                    if (response) return response;
                    // Return offline page if available
                    return caches.match('/offline.html');
                  });
              })
          );
          return;
        }
        
        // Default: try network, fallback to cache
        event.respondWith(
          fetch(request)
            .catch(() => caches.match(request))
        );
      });
      
      // Background sync for offline actions
      self.addEventListener('sync', event => {
        if (event.tag === 'background-sync') {
          event.waitUntil(doBackgroundSync());
        }
      });
      
      // Push notifications
      self.addEventListener('push', event => {
        if (event.data) {
          const data = event.data.json();
          event.waitUntil(
            self.registration.showNotification(data.title, {
              body: data.body,
              icon: data.icon || '/icon-192x192.png',
              badge: '/badge-72x72.png',
              tag: data.tag,
              renotify: true
            })
          );
        }
      });
      
      // Notification click
      self.addEventListener('notificationclick', event => {
        event.notification.close();
        event.waitUntil(
          clients.openWindow(event.notification.data?.url || '/')
        );
      });
      
      // Helper functions
      function doBackgroundSync() {
        // Handle background sync operations
        return Promise.resolve();
      }
      
      // Cache size management
      self.addEventListener('message', event => {
        if (event.data && event.data.type === 'CACHE_STATUS') {
          getCacheStatus().then(status => {
            event.ports[0].postMessage(status);
          });
        }
        
        if (event.data && event.data.type === 'CLEAR_CACHE') {
          clearCaches().then(() => {
            event.ports[0].postMessage({ success: true });
          });
        }
      });
      
      async function getCacheStatus() {
        const cacheNames = await caches.keys();
        const cacheInfo = await Promise.all(
          cacheNames.map(async name => {
            const cache = await caches.open(name);
            const keys = await cache.keys();
            return { name, count: keys.length };
          })
        );
        return cacheInfo;
      }
      
      async function clearCaches() {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }
    `

    // Note: In a real application, this would be handled by your build process
    console.log('Service Worker content prepared (would be written to /public/sw-synthesis-c.js)')
  }

  // Handle service worker updates
  const applyUpdate = useCallback(async () => {
    if (!swState.registration) return

    const waitingWorker = swState.registration.waiting
    if (waitingWorker) {
      // Tell the waiting service worker to skip waiting and become active
      waitingWorker.postMessage({ type: 'SKIP_WAITING' })
      
      // Listen for the controlling change and reload
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })
    }
  }, [swState.registration])

  // Check cache status
  const checkCacheStatus = useCallback(async () => {
    if (!swState.registration) return

    setSwState(prev => ({ ...prev, cacheStatus: 'caching' }))

    try {
      // Create a message channel to communicate with service worker
      const messageChannel = new MessageChannel()
      
      messageChannel.port1.onmessage = (event) => {
        const cacheInfo = event.data
        console.log('Cache status:', cacheInfo)
        
        setSwState(prev => ({ ...prev, cacheStatus: 'cached' }))
        
        // Simulate cache progress
        const totalResources = cacheInfo.reduce((sum: number, cache: any) => sum + cache.count, 0)
        setCacheProgress(totalResources > 0 ? 100 : 0)
      }

      // Send message to service worker
      swState.registration.active?.postMessage({ type: 'CACHE_STATUS' }, [messageChannel.port2])
    } catch (error) {
      console.error('Cache status check failed:', error)
      setSwState(prev => ({ ...prev, cacheStatus: 'error' }))
    }
  }, [swState.registration])

  // Clear cache
  const clearCache = useCallback(async () => {
    if (!swState.registration) return

    try {
      const messageChannel = new MessageChannel()
      
      messageChannel.port1.onmessage = (event) => {
        if (event.data.success) {
          console.log('Cache cleared successfully')
          setSwState(prev => ({ ...prev, cacheStatus: 'idle' }))
          setCacheProgress(0)
        }
      }

      swState.registration.active?.postMessage({ type: 'CLEAR_CACHE' }, [messageChannel.port2])
    } catch (error) {
      console.error('Cache clear failed:', error)
    }
  }, [swState.registration])

  // Initialize service worker
  useEffect(() => {
    if (swState.isSupported) {
      registerServiceWorker()
    }
  }, [registerServiceWorker, swState.isSupported])

  // Listen for service worker messages
  useEffect(() => {
    if (!swState.isSupported) return

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'SW_UPDATE_AVAILABLE') {
        setShowUpdatePrompt(true)
      }
    }

    navigator.serviceWorker.addEventListener('message', handleMessage)
    return () => navigator.serviceWorker.removeEventListener('message', handleMessage)
  }, [swState.isSupported])

  // Periodic cache status check
  useEffect(() => {
    if (!swState.isRegistered) return

    const interval = setInterval(() => {
      checkCacheStatus()
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [swState.isRegistered, checkCacheStatus])

  if (!swState.isSupported) {
    return null
  }

  return (
    <>
      {/* Update Prompt */}
      <AnimatePresence>
        {showUpdatePrompt && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-slate-900/95 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4 shadow-xl z-[80]"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-white font-medium mb-1">Update Available</h3>
                <p className="text-slate-300 text-sm mb-3">
                  A new version of the application is available with improvements and bug fixes.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      applyUpdate()
                      setShowUpdatePrompt(false)
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                  >
                    Update Now
                  </button>
                  <button
                    onClick={() => setShowUpdatePrompt(false)}
                    className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded transition-colors"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Development Service Worker Status */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-20 left-4 bg-slate-900/90 backdrop-blur-sm border border-slate-600/50 rounded-lg p-3 text-xs font-mono z-[70]">
          <div className="mb-2">
            <span className="text-slate-400">Service Worker: </span>
            <span className={`font-bold ${
              swState.isRegistered ? 'text-green-400' : 
              swState.error ? 'text-red-400' : 'text-yellow-400'
            }`}>
              {swState.isRegistered ? 'ACTIVE' : 
               swState.error ? 'ERROR' : 'LOADING'}
            </span>
          </div>
          
          {swState.error && (
            <div className="text-red-400 text-xs mb-2">
              Error: {swState.error}
            </div>
          )}
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-slate-400">Cache:</span>
            <span className={`text-xs ${
              swState.cacheStatus === 'cached' ? 'text-green-400' :
              swState.cacheStatus === 'caching' ? 'text-yellow-400' :
              swState.cacheStatus === 'error' ? 'text-red-400' :
              'text-slate-400'
            }`}>
              {swState.cacheStatus.toUpperCase()}
            </span>
            {swState.cacheStatus === 'caching' && (
              <div className="w-12 bg-slate-700 rounded-full h-1">
                <div 
                  className="bg-blue-400 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${cacheProgress}%` }}
                />
              </div>
            )}
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={checkCacheStatus}
              className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 transition-colors text-xs"
              disabled={!swState.isRegistered}
            >
              Check
            </button>
            <button
              onClick={clearCache}
              className="px-2 py-1 bg-red-700 hover:bg-red-600 rounded text-red-200 transition-colors text-xs"
              disabled={!swState.isRegistered}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </>
  )
}