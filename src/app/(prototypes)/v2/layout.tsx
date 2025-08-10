export default function V2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div 
      className="min-h-screen bg-slate-900"
      style={{
        '--bg': '#0f172a', // slate-900 - deep dark
        '--fg': '#f8fafc', // slate-50 - crisp white
        '--muted': '#1e293b', // slate-800
        '--accent': '#3b82f6', // blue-500 - electric blue accent
        '--accent-bright': '#06b6d4', // cyan-500 - bright highlight
        '--accent-warm': '#f59e0b' // amber-500 - warm highlight
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}