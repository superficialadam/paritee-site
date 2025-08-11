import { Header } from './components/Header'
import { Footer } from './components/Footer'

export default function SynthesisALayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen relative">
      {/* Brand-consistent background with subtle pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 opacity-[0.03] bg-gradient-to-r from-blue-600/10 via-transparent to-blue-400/10" />
      
      <Header />
      <main className="relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}