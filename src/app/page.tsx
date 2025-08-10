import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted/30">
      <div className="container text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tight">
            Paritee
            <br />
            <span className="text-accent">Prototypes</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three prototype implementations of the Paritee marketing network site, 
            each with unique theme variations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <Link 
            href="/v1" 
            className="group bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-accent/50"
          >
            <div className="w-full h-32 bg-gradient-to-br from-green-50 to-green-100 rounded-lg mb-4 flex items-center justify-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">V1</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold font-heading mb-2">Version 1</h3>
            <p className="text-sm text-muted-foreground">Green theme variation</p>
          </Link>

          <Link 
            href="/v2" 
            className="group bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-accent/50"
          >
            <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">V2</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold font-heading mb-2">Version 2</h3>
            <p className="text-sm text-muted-foreground">Blue theme variation</p>
          </Link>

          <Link 
            href="/v3" 
            className="group bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-accent/50"
          >
            <div className="w-full h-32 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">V3</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold font-heading mb-2">Version 3</h3>
            <p className="text-sm text-muted-foreground">Purple theme variation</p>
          </Link>

          <Link 
            href="/v3b" 
            className="group bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-accent/50"
          >
            <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-4 flex items-center justify-center">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-purple-700">V3B</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold font-heading mb-2">Version 3B</h3>
            <p className="text-sm text-muted-foreground">Enhanced purple with P5.js</p>
          </Link>

          <Link 
            href="/v4" 
            className="group bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-accent/50"
          >
            <div className="w-full h-32 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg mb-4 flex items-center justify-center">
              <div className="w-16 h-16 bg-slate-500/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-600">V4</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold font-heading mb-2">Version 4</h3>
            <p className="text-sm text-muted-foreground">Minimal modern design</p>
          </Link>

          <Link 
            href="/v4b" 
            className="group bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-accent/50"
          >
            <div className="w-full h-32 bg-gradient-to-br from-red-50 to-black rounded-lg mb-4 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-red-700">V4B</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold font-heading mb-2">Version 4B</h3>
            <p className="text-sm text-muted-foreground">Team Farner inspired bold design</p>
          </Link>

          <Link 
            href="/v4c" 
            className="group bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-red-500/50 bg-gradient-to-br from-slate-900/10 to-red-900/10"
          >
            <div className="w-full h-32 bg-gradient-to-br from-slate-900 to-red-900 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20 animate-pulse"></div>
              <div className="w-16 h-16 bg-red-500/30 border border-red-400/50 flex items-center justify-center relative z-10">
                <span className="text-xl font-bold text-red-100 font-mono">V4C</span>
              </div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-xl font-semibold font-heading mb-2">Version 4C</h3>
            <p className="text-sm text-muted-foreground">RGA/Noomo tech-forward design</p>
            <div className="mt-2 inline-block px-2 py-1 bg-red-600 text-red-100 text-xs font-mono rounded">
              TECH
            </div>
          </Link>

          <Link 
            href="/v4d" 
            className="group bg-card border-2 border-amber-300 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:border-amber-500 bg-gradient-to-br from-amber-50/50 to-yellow-50/50"
          >
            <div className="w-full h-32 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg mb-4 flex items-center justify-center border border-amber-200">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500/30 to-yellow-500/30 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-amber-700">V4D</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold font-heading mb-2 text-amber-900">Gallery Design</h3>
            <p className="text-sm text-amber-700">Pentagram-inspired gallery aesthetic</p>
            <div className="mt-2 inline-block px-2 py-1 bg-amber-200 text-amber-800 text-xs font-medium rounded">
              NEW
            </div>
          </Link>
        </div>

        <div className="pt-8">
          <p className="text-sm text-muted-foreground">
            Each prototype includes all sections: Hero, Services, Sectors, Geographies, 
            Agencies, Cases, Team, News, and Contact
          </p>
        </div>
      </div>
    </div>
  )
}
