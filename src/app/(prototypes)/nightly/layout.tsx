export default function NightlyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="nightly-layout">
      {children}
    </div>
  )
}