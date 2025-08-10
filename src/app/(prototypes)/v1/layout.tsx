export default function V1Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div 
      className="min-h-screen bg-stone-50"
      style={{
        '--bg': '#fafaf9', // stone-50 - bone white
        '--fg': '#1c1917', // stone-900 - ink black
        '--muted': '#f5f5f4', // stone-100 
        '--accent': '#44403c' // stone-700
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}