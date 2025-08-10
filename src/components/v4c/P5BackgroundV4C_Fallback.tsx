'use client'

// Temporary CSS-only background to prevent memory leaks
const P5BackgroundV4C_Fallback = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-900">
      {/* Digital matrix effect with CSS */}
      <div className="absolute inset-0">
        {/* Scanlines */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 150, 255, 0.03) 2px,
              rgba(0, 150, 255, 0.03) 4px
            )`,
            animation: 'scanlines 2s linear infinite',
          }}
        />
        
        {/* Matrix characters simulation */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255, 0, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(0, 150, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(0, 150, 255, 0.05) 0%, transparent 70%)
            `,
            backgroundSize: '200px 200px, 300px 300px, 150px 150px',
            animation: 'matrix 15s ease-in-out infinite',
          }}
        />
        
        {/* Glitch effect */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(255, 0, 0, 0.1) 25%, 
              transparent 50%, 
              rgba(0, 150, 255, 0.1) 75%, 
              transparent 100%
            )`,
            animation: 'glitch 8s ease-in-out infinite',
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes scanlines {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(4px);
          }
        }
        
        @keyframes matrix {
          0%, 100% {
            transform: translate(0, 0);
            filter: hue-rotate(0deg);
          }
          33% {
            transform: translate(10px, -10px);
            filter: hue-rotate(120deg);
          }
          66% {
            transform: translate(-5px, 15px);
            filter: hue-rotate(240deg);
          }
        }
        
        @keyframes glitch {
          0%, 100% {
            transform: translateX(0);
            opacity: 0.1;
          }
          10% {
            transform: translateX(2px);
            opacity: 0.2;
          }
          20% {
            transform: translateX(-2px);
            opacity: 0.1;
          }
          30% {
            transform: translateX(1px);
            opacity: 0.15;
          }
          40%, 60% {
            transform: translateX(0);
            opacity: 0.05;
          }
          50% {
            transform: translateX(-1px);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  )
}

export default P5BackgroundV4C_Fallback