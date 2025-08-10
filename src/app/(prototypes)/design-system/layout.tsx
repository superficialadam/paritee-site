import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design System - Paritee',
  description: 'Professional design system components and guidelines',
}

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}