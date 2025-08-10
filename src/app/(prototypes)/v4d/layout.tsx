'use client'

import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export default function V4DLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="v4d-gallery antialiased">
        <style jsx global>{`
          :root {
            --font-display: var(--font-playfair);
            --font-body: var(--font-inter);
            
            /* Gallery Color Palette - Pure B&W with Gold */
            --color-pure-black: #000000;
            --color-pure-white: #FFFFFF;
            --color-gallery-gold: #D4AF37;
            --color-warm-gray: #F8F8F8;
            --color-cool-gray: #2A2A2A;
            --color-accent-gray: #666666;
            
            /* Gallery Spacing System */
            --spacing-gallery-xs: 0.5rem;
            --spacing-gallery-sm: 1rem;
            --spacing-gallery-md: 2rem;
            --spacing-gallery-lg: 4rem;
            --spacing-gallery-xl: 8rem;
            
            /* Gallery Typography Scale */
            --text-display: 4.5rem;
            --text-hero: 3rem;
            --text-section: 2.25rem;
            --text-card: 1.5rem;
            --text-body: 1rem;
            --text-caption: 0.875rem;
            --text-micro: 0.75rem;
            
            /* Gallery Effects */
            --shadow-gallery: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            --shadow-float: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
            --transition-gallery: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            --transition-fast: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .v4d-gallery {
            background: var(--color-pure-white);
            color: var(--color-pure-black);
            font-family: var(--font-body);
            line-height: 1.6;
          }

          .v4d-gallery h1,
          .v4d-gallery h2,
          .v4d-gallery h3,
          .v4d-gallery .display-font {
            font-family: var(--font-display);
            font-weight: 400;
            line-height: 1.2;
            letter-spacing: -0.025em;
          }

          /* Gallery Layout Classes */
          .gallery-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 var(--spacing-gallery-md);
          }

          .gallery-section {
            padding: var(--spacing-gallery-xl) 0;
            border-bottom: 1px solid #F0F0F0;
          }

          .gallery-card {
            background: var(--color-pure-white);
            border: 1px solid #E8E8E8;
            transition: var(--transition-gallery);
            cursor: pointer;
          }

          .gallery-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-gallery);
            border-color: var(--color-gallery-gold);
          }

          .gallery-grid {
            display: grid;
            gap: var(--spacing-gallery-md);
          }

          .gallery-grid-2 {
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          }

          .gallery-grid-3 {
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          }

          .gallery-grid-4 {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }

          /* Typography Styles */
          .display-large {
            font-size: var(--text-display);
            font-weight: 300;
          }

          .display-medium {
            font-size: var(--text-hero);
            font-weight: 300;
          }

          .section-title {
            font-size: var(--text-section);
            font-weight: 400;
            margin-bottom: var(--spacing-gallery-md);
          }

          .card-title {
            font-size: var(--text-card);
            font-weight: 400;
            margin-bottom: var(--spacing-gallery-sm);
          }

          .gallery-eyebrow {
            font-size: var(--text-micro);
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--color-gallery-gold);
            margin-bottom: var(--spacing-gallery-sm);
          }

          /* Animation Classes */
          .fade-up {
            opacity: 0;
            transform: translateY(30px);
            transition: var(--transition-gallery);
          }

          .fade-up.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .stagger-children > * {
            transition-delay: calc(var(--stagger-delay, 0) * 100ms);
          }

          /* Modal and Overlay Styles */
          .gallery-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
          }

          .gallery-modal-content {
            background: var(--color-pure-white);
            max-width: 90vw;
            max-height: 90vh;
            overflow: auto;
            box-shadow: var(--shadow-gallery);
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            :root {
              --text-display: 3rem;
              --text-hero: 2.25rem;
              --text-section: 1.75rem;
              --spacing-gallery-xl: 4rem;
            }

            .gallery-container {
              padding: 0 var(--spacing-gallery-sm);
            }

            .gallery-grid-2,
            .gallery-grid-3,
            .gallery-grid-4 {
              grid-template-columns: 1fr;
            }
          }

          /* Custom Scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: var(--color-warm-gray);
          }

          ::-webkit-scrollbar-thumb {
            background: var(--color-accent-gray);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: var(--color-gallery-gold);
          }
        `}</style>
        {children}
      </body>
    </html>
  )
}