'use client'

export default function HeroIteration2V2() {
  return (
    <section 
      id="home" 
      className="section relative min-h-screen flex items-center"
    >
      <div className="container">
        <div className="max-w-4xl">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 fade-up visible">
            No Compromise. Just Better.
          </h1>
          
          {/* Subheadline */}
          <div className="text-lg leading-relaxed text-[#E8EDF5] max-w-3xl fade-up visible">
            <p>
              You've been asked to make trade-offs for too long. Big agencies that go big on overhead but fall short on care. Small agencies that bring passion but can't keep pace. You've had to choose between speed and scale. Bold thinking and trusted delivery. That compromise ends with Paritee. We are a coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
            </p>
          </div>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 fade-up visible">
            <button 
              onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 border border-gray-400 text-white font-medium rounded-full hover:bg-white hover:text-black transition-all"
            >
              Explore Our Work
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 border border-gray-400 text-white font-medium rounded-full hover:bg-white hover:text-black transition-all"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}