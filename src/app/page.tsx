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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
