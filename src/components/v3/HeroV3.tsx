export default function HeroV3() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="container max-w-5xl text-center px-8">
        <h1 className="relative">
          <span className="absolute inset-0 shimmer-text" />
          <span className="relative text-6xl md:text-8xl lg:text-9xl font-light font-heading tracking-tighter leading-none text-black">
            No Compromise. Just Better.
          </span>
        </h1>
        
        <div className="mt-16 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl leading-relaxed text-black font-light">
            Where strategy meets execution.<br />
            Where creativity drives results.<br />
            Where compromise is not an option.
          </p>
        </div>
        
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-black opacity-20"></div>
        </div>
      </div>
    </section>
  )
}