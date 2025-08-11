import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'

export default function NightlyBaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      <ScrollProgress />
      <Header />
      <main className="relative">
        {children}
      </main>
      <Footer />
    </div>
  )
}