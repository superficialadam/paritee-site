import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { people } from '@/data/people'
import { geographies } from '@/data/geographies'
import { Linkedin, MapPin, Users } from 'lucide-react'

export default function TeamPage() {
  // Group people by location
  const peopleByLocation = people.reduce((acc, person) => {
    if (!acc[person.location]) {
      acc[person.location] = []
    }
    acc[person.location].push(person)
    return acc
  }, {} as Record<string, typeof people>)

  // Get unique locations
  const locations = Object.keys(peopleByLocation).sort()

  // Get statistics
  const totalPeople = people.length
  const totalLocations = locations.length
  const leadershipTeam = people.filter(person => 
    person.role.toLowerCase().includes('chief') || 
    person.role.toLowerCase().includes('ceo') || 
    person.role.toLowerCase().includes('managing director')
  )

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-semibold text-white leading-tight">
            Meet the People
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            The talent behind our success. Meet the diverse team of strategists, creatives, and innovators who make the magic happen across our global network.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">{totalPeople}</div>
              <div className="text-slate-400 text-sm">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">{totalLocations}</div>
              <div className="text-slate-400 text-sm">Global Locations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">{leadershipTeam.length}</div>
              <div className="text-slate-400 text-sm">Leadership Team</div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map((person) => (
              <Card key={person.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60 text-center">
                <CardHeader className="p-8">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <Image 
                      src={person.avatarUrl} 
                      alt={person.name}
                      fill
                      className="rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle className="text-xl font-medium text-white mb-2">{person.name}</CardTitle>
                  <CardDescription className="text-blue-400 text-sm mb-1">{person.role}</CardDescription>
                  <div className="flex items-center justify-center space-x-1 text-slate-500 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>{person.location}</span>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <Button asChild variant="ghost" className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-600/10 rounded-full">
                    <Link href={person.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team by Location */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">Global Team</h2>
          <div className="space-y-16">
            {locations.map((location) => {
              const locationPeople = peopleByLocation[location]
              const nonLeadership = locationPeople.filter(person => !leadershipTeam.includes(person))
              
              if (nonLeadership.length === 0) return null

              return (
                <div key={location} className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-2xl font-medium text-white">{location}</h3>
                    <div className="flex items-center space-x-1 text-slate-400">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{locationPeople.length} team members</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {nonLeadership.map((person) => (
                      <Card key={person.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60 text-center">
                        <CardHeader className="p-6">
                          <div className="relative w-16 h-16 mx-auto mb-4">
                            <Image 
                              src={person.avatarUrl} 
                              alt={person.name}
                              fill
                              className="rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <CardTitle className="text-lg font-medium text-white mb-1">{person.name}</CardTitle>
                          <CardDescription className="text-slate-400 text-sm mb-3">{person.role}</CardDescription>
                        </CardHeader>
                        <CardContent className="px-6 pb-6">
                          <Button asChild variant="ghost" className="text-blue-400 hover:text-blue-300 p-1 hover:bg-blue-600/10 rounded-full">
                            <Link href={person.linkedin} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="w-4 h-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Culture */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">Our Culture</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none text-center">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-xl font-medium text-white">Collaborative</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-slate-400 leading-relaxed">
                  We believe the best ideas come from diverse perspectives working together. Our collaborative culture breaks down silos and builds up solutions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none text-center">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-emerald-400 font-bold text-xl">∞</span>
                </div>
                <CardTitle className="text-xl font-medium text-white">Continuous Learning</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-slate-400 leading-relaxed">
                  The industry evolves rapidly, and so do we. Our team is committed to staying ahead of trends and continuously expanding their expertise.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none text-center">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-400 font-bold text-xl">★</span>
                </div>
                <CardTitle className="text-xl font-medium text-white">Excellence</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-slate-400 leading-relaxed">
                  We set high standards for ourselves and our work. Excellence isn&apos;t just a goal—it&apos;s how we approach every project, every day.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-semibold text-white">Join Our Team</h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Ready to be part of something bigger? We&apos;re always looking for talented individuals who share our passion for excellence and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/canvas-b/contact">Get in Touch</Link>
            </Button>
            <Button asChild className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/canvas-b/agencies">Partner Agencies</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}