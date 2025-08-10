import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'V5A - Paritee',
  description: 'Paritee marketing network - Version 5A prototype',
}

export default function V5ALayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}