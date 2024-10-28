'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter } from 'lucide-react'

const teamMembers = [
  { name: "Aarav Patel", role: "President", image: "/placeholder.svg", github: "#", linkedin: "#", twitter: "#" },
  { name: "Zara Khan", role: "Vice President", image: "/placeholder.svg", github: "#", linkedin: "#", twitter: "#" },
  { name: "Rohan Sharma", role: "Technical Lead", image: "/placeholder.svg", github: "#", linkedin: "#", twitter: "#" },
  { name: "Priya Desai", role: "Event Coordinator", image: "/placeholder.svg", github: "#", linkedin: "#", twitter: "#" },
  { name: "Arjun Mehta", role: "Content Creator", image: "/placeholder.svg", github: "#", linkedin: "#", twitter: "#" },
  { name: "Ananya Reddy", role: "Outreach Manager", image: "/placeholder.svg", github: "#", linkedin: "#", twitter: "#" },
]

const alumniMembers = [
  { name: "Vikram Malhotra", role: "Software Engineer at Google", image: "/placeholder.svg", linkedin: "#" },
  { name: "Neha Gupta", role: "Data Scientist at Amazon", image: "/placeholder.svg", linkedin: "#" },
  { name: "Rahul Kapoor", role: "Product Manager at Microsoft", image: "/placeholder.svg", linkedin: "#" },
]

export function CommunityPageComponent() {
  return (
    (<div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our GDGoC APSIT Community</h1>
          <p className="text-xl mb-8">Connect, Collaborate, and Grow with Fellow Tech Enthusiasts</p>
        </div>
      </section>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="team" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="team">Meet the Team</TabsTrigger>
            <TabsTrigger value="membership">Membership Program</TabsTrigger>
            <TabsTrigger value="alumni">Alumni Network</TabsTrigger>
          </TabsList>

          {/* Meet the Team */}
          <TabsContent value="team">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover" />
                  </CardHeader>
                  <CardContent className="text-center pt-4">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </CardContent>
                  <CardFooter className="justify-center space-x-4">
                    <Link href={member.github}>
                      <Github className="h-5 w-5 text-gray-600 hover:text-blue-600" />
                    </Link>
                    <Link href={member.linkedin}>
                      <Linkedin className="h-5 w-5 text-gray-600 hover:text-blue-600" />
                    </Link>
                    <Link href={member.twitter}>
                      <Twitter className="h-5 w-5 text-gray-600 hover:text-blue-600" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Membership Program */}
          <TabsContent value="membership">
            <Card>
              <CardHeader>
                <CardTitle>Join Our Community</CardTitle>
                <CardDescription>Become a part of GDGoC APSIT and unlock amazing opportunities!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-xl font-semibold">Membership Benefits:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Access to exclusive workshops and events</li>
                  <li>Networking opportunities with industry professionals</li>
                  <li>Hands-on experience with cutting-edge technologies</li>
                  <li>Mentorship from senior members and alumni</li>
                  <li>Opportunity to showcase your projects</li>
                  <li>Certificate of membership and participation</li>
                </ul>
                <h3 className="text-xl font-semibold mt-6">How to Apply:</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Fill out the online application form</li>
                  <li>Attend an orientation session</li>
                  <li>Complete a small coding challenge or project</li>
                  <li>Interview with the GDGoC APSIT team</li>
                </ol>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/apply">Apply for Membership</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Alumni Network */}
          <TabsContent value="alumni">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Our Alumni Network</CardTitle>
                  <CardDescription>Celebrating the success of our former members</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Our alumni have gone on to achieve great things in the tech industry. They continue to support and inspire our current members through mentorship, guest lectures, and networking events.</p>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {alumniMembers.map((alumni, index) => (
                      <Card key={index}>
                        <CardHeader className="text-center">
                          <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                            <Image
                              src={alumni.image}
                              alt={alumni.name}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover" />
                          </div>
                          <CardTitle>{alumni.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-gray-600">{alumni.role}</p>
                        </CardContent>
                        <CardFooter className="justify-center">
                          <Link href={alumni.linkedin}>
                            <Linkedin className="h-5 w-5 text-gray-600 hover:text-blue-600" />
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Alumni Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">50+</Badge>
                    <span>Alumni working at top tech companies</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">10+</Badge>
                    <span>Startups founded by our alumni</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">100+</Badge>
                    <span>Open-source contributions</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* Call to Action */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8">Take the first step towards an exciting journey in tech!</p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      </section>
    </div>)
  );
}