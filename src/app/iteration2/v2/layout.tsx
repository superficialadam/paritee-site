'use client'

import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export default function Iteration2V2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --font-display: ${montserrat.style.fontFamily};
          --font-body: ${montserrat.style.fontFamily};
          
          /* Blue Theme Color Palette */
          --color-primary-blue: #0E2756;
          --color-pure-white: #FFFFFF;
          --color-accent-gold: #D4AF37;
          --color-light-blue: #1A3A6B;
          --color-dark-blue: #0A1E42;
          --color-text-light: #E8EDF5;
          --color-text-gray: #94A3B8;
          
          /* Spacing System */
          --spacing-xs: 0.5rem;
          --spacing-sm: 1rem;
          --spacing-md: 2rem;
          --spacing-lg: 4rem;
          --spacing-xl: 8rem;
          
          /* Typography Scale */
          --text-display: 4.5rem;
          --text-hero: 3rem;
          --text-section: 2.25rem;
          --text-card: 1.5rem;
          --text-body: 1rem;
          --text-caption: 0.875rem;
          --text-micro: 0.75rem;
          
          /* Effects */
          --shadow-blue: 0 25px 50px -12px rgba(14, 39, 86, 0.25);
          --shadow-float: 0 10px 25px -3px rgba(14, 39, 86, 0.1);
          --transition-smooth: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          --transition-fast: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        body {
          background: var(--color-primary-blue) !important;
          color: var(--color-pure-white) !important;
          font-family: ${montserrat.style.fontFamily};
          line-height: 1.6;
          margin: 0;
          padding: 0;
        }

        .iteration2-v2 {
          background: var(--color-primary-blue);
          color: var(--color-pure-white);
          font-family: ${montserrat.style.fontFamily};
          min-height: 100vh;
          position: relative;
        }

        .iteration2-v2 h1,
        .iteration2-v2 h2,
        .iteration2-v2 h3,
        .iteration2-v2 .display-font {
          font-family: ${montserrat.style.fontFamily};
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.025em;
        }

        /* Canvas Layer */
        .dot-matrix-canvas {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          z-index: 1 !important;
          pointer-events: none !important;
        }

        /* Content Layer */
        .content-layer {
          position: relative;
          z-index: 2;
        }

        /* Layout Classes */
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }

        .section {
          padding: var(--spacing-xl) 0;
        }

        .card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          transition: var(--transition-smooth);
          cursor: pointer;
          backdrop-filter: blur(10px);
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-blue);
          border-color: var(--color-accent-gold);
          background: rgba(255, 255, 255, 0.08);
        }

        .grid {
          display: grid;
          gap: var(--spacing-md);
        }

        .grid-2 {
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        }

        .grid-3 {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        .grid-4 {
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }

        /* Card Size Reduction - 50% smaller */
        .card-small {
          transform: scale(0.75);
          margin: -12.5% -12.5%;
        }

        .card-small:hover {
          transform: scale(0.75) translateY(-8px);
        }

        /* Typography Styles */
        .display-large {
          font-size: var(--text-display);
          font-weight: 700;
        }

        .display-medium {
          font-size: var(--text-hero);
          font-weight: 700;
        }

        .section-title {
          font-size: var(--text-section);
          font-weight: 700;
          margin-bottom: var(--spacing-md);
        }

        .card-title {
          font-size: var(--text-card);
          font-weight: 600;
          margin-bottom: var(--spacing-sm);
        }

        .eyebrow {
          font-size: var(--text-micro);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-accent-gold);
          margin-bottom: var(--spacing-sm);
        }

        /* Animation Classes */
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: var(--transition-smooth);
        }

        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-children > * {
          transition-delay: calc(var(--stagger-delay, 0) * 100ms);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          :root {
            --text-display: 3rem;
            --text-hero: 2.25rem;
            --text-section: 1.75rem;
            --spacing-xl: 4rem;
          }

          .container {
            padding: 0 var(--spacing-sm);
          }

          .grid-2,
          .grid-3,
          .grid-4 {
            grid-template-columns: 1fr;
          }

          .card-small {
            transform: scale(0.85);
            margin: -7.5% -7.5%;
          }

          .card-small:hover {
            transform: scale(0.85) translateY(-8px);
          }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: var(--color-light-blue);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--color-accent-gold);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #E6C547;
        }
      `}} />
      <div className={`${montserrat.className} iteration2-v2 antialiased`}>
        {children}
      </div>
    </>
  )
}