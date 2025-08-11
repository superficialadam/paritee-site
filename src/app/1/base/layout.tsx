import { Montserrat } from 'next/font/google'
import './theme.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${montserrat.variable} base-theme`}>
      {children}
    </div>
  )
}