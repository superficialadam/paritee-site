'use client'

import dynamic from 'next/dynamic'

// Dynamic import for P5.js canvas to prevent SSR issues
const P5OrganicCanvas = dynamic(() => import('./P5OrganicCanvas'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-0" aria-hidden="true" />
})

export default function CanvasWrapper() {
  return <P5OrganicCanvas />
}