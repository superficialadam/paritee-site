import type { Metadata } from 'next'
import Header from './components/Header'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'Synthesis E - Collaborative Innovation | Paritee',
  description: 'Experience breakthrough innovations in user experience, collaborative design, and intelligent interactions. Where equals come together to create something extraordinary.',
  keywords: 'collaboration, innovation, partnership, user experience, adaptive design, intelligent interfaces',
}

export default function SynthesisELayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Header />
      <main className="relative">
        {children}
      </main>
      <Footer />
    </div>
  )
}