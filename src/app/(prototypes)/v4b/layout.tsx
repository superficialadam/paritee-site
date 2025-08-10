import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Paritee V4B - Team Farner Inspired',
  description: 'Bold European design prototype with organic forms and sophisticated typography',
}

export default function V4BLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="v4b-layout">
      {children}
    </div>
  )
}