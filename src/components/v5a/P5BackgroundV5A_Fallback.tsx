'use client'

// Temporary CSS-only background to prevent memory leaks
const P5BackgroundV4B_Fallback = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Organic blob shapes with CSS animations */}
      <div className="absolute inset-0">
        {/* Morphing blob 1 */}
        <div 
          className="absolute w-96 h-96 opacity-20"
          style={{
            top: '20%',
            left: '10%',
            background: 'radial-gradient(circle, #ff0000 0%, transparent 70%)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animation: 'blob1 20s ease-in-out infinite',
            filter: 'blur(40px)',
          }}
        />
        
        {/* Morphing blob 2 */}
        <div 
          className="absolute w-80 h-80 opacity-15"
          style={{
            top: '60%',
            right: '15%',
            background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
            borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
            animation: 'blob2 25s ease-in-out infinite reverse',
            filter: 'blur(35px)',
          }}
        />
        
        {/* Geometric patterns */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 40%, rgba(255,0,0,0.1) 50%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)
            `,
            backgroundSize: '100px 100px',
            animation: 'geometric 30s linear infinite',
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes blob1 {
          0%, 100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            border-radius: 70% 30% 30% 70% / 50% 60% 40% 50%;
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            border-radius: 20% 80% 80% 20% / 60% 20% 80% 40%;
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        @keyframes blob2 {
          0%, 100% {
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            border-radius: 30% 70% 70% 30% / 30% 50% 50% 30%;
            transform: translate(-30px, 30px) scale(1.2);
          }
        }
        
        @keyframes geometric {
          0% {
            transform: translateX(0) translateY(0);
          }
          100% {
            transform: translateX(50px) translateY(25px);
          }
        }
      `}</style>
    </div>
  )
}

export default P5BackgroundV4B_Fallback