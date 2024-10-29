'use client';
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, Code, Megaphone } from 'lucide-react'

const involvementOpportunities = [
  { 
    title: "Organize Events", 
    description: "Help plan and execute workshops, hackathons, and tech talks.", 
    icon: Calendar 
  },
  { 
    title: "Mentorship Program", 
    description: "Guide and support fellow students in their tech journey.", 
    icon: Users 
  },
  { 
    title: "Open Source Projects", 
    description: "Contribute to our community-driven open source initiatives.", 
    icon: Code 
  },
  { 
    title: "Content Creation", 
    description: "Write blog posts, create tutorials, or produce video content.", 
    icon: Megaphone 
  },
]

const upcomingEvents = [
  { 
    title: "Web Development Workshop", 
    date: "2024-04-15", 
    description: "Learn the latest web technologies and best practices.", 
    image: "/placeholder.svg" 
  },
  { 
    title: "AI Hackathon", 
    date: "2024-05-01", 
    description: "Build innovative AI solutions in a 48-hour coding marathon.", 
    image: "/placeholder.svg" 
  },
]

export function GetInvolvedPageComponent() {
  return (
    (<div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Get Involved with GDGoC APSIT</h1>
          <p className="text-xl mb-8">Join our community and make a difference in the tech world</p>
        </div>
      </section>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="opportunities" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="opportunities">Involvement Opportunities</TabsTrigger>
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          </TabsList>

          {/* Involvement Opportunities */}
          <TabsContent value="opportunities">
            <Card>
              <CardHeader>
                <CardTitle>Ways to Get Involved</CardTitle>
                <CardDescription>Explore various opportunities to contribute to our community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {involvementOpportunities.map((opportunity, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center gap-4">
                        <opportunity.icon className="h-8 w-8 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{opportunity.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link href={`/apply/${opportunity.title.toLowerCase().replace(/ /g, '-')}`}>Apply Now</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upcoming Events */}
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Join our exciting events and expand your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {upcomingEvents.map((event, index) => (
                    <Card key={index} className="overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover" />
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{event.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link href={`/events/${event.title.toLowerCase().replace(/ /g, '-')}`}>Learn More & Register</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* Call to Action */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8">Join GDGoC APSIT and be part of our thriving tech community!</p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/join">Become a Member</Link>
          </Button>
        </div>
      </section>
    </div>)
  );
}