'use client'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function NightlyBaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Header />
      </motion.div>
      
      <main className="relative overflow-hidden">
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
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.4, 
          ease: "easeOut",
          delay: 0.3 
        }}
      >
        <Footer />
      </motion.div>
    </div>
  )
}