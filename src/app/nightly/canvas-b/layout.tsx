import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'
import CanvasWrapper from './components/CanvasWrapper'

export default function NightlyCanvasBLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen relative">
      {/* P5.js Organic Canvas - Behind everything */}
      <CanvasWrapper />
      
      {/* UI Layer with higher z-index */}
      <div className="relative z-10">
        <ScrollProgress />
        <Header />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}