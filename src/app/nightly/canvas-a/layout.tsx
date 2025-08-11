'use client'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import './canvas-performance.css'

// Dynamic import for P5 canvas to avoid SSR issues
const P5BackgroundCanvasA = dynamic(() => import('@/components/canvas-a/P5BackgroundCanvasA'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-slate-900 z-0" />
})

export default function NightlyBaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen relative">
      {/* P5 Canvas Background - positioned below all content */}
      <P5BackgroundCanvasA />
      
      {/* Header - positioned above canvas */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-50"
      >
        <Header />
      </motion.div>
      
      {/* Main Content - positioned above canvas */}
      <main className="relative overflow-hidden z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ 
              opacity: 0, 
              y: 20,
              filter: "blur(4px)"
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              filter: "blur(0px)"
            }}
            exit={{ 
              opacity: 0, 
              y: -20,
              filter: "blur(4px)"
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1], // Custom sophisticated easing
              staggerChildren: 0.1,
            }}
            className="motion-reduce:transition-none"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Footer - positioned above canvas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.4, 
          ease: "easeOut",
          delay: 0.3 
        }}
        className="relative z-10"
      >
        <Footer />
      </motion.div>
    </div>
  )
}