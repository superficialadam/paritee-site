export default function V3BLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ backgroundColor: '#0E2756' }} className="min-h-screen">
      {children}
    </div>
  )
}