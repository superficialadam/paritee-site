export default function V3Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div 
      className="min-h-screen bg-white"
      style={{
        '--bg': '#ffffff', // Pure white
        '--fg': '#000000', // Pure black
        '--muted': '#f5f5f5', // Near white
        '--accent': '#000000' // Pure black accent
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}