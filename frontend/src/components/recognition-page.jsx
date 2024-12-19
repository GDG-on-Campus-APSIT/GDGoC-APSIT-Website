'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

import {
  Calendar, Code, Star, Briefcase, Users, Mic, Github } from 'lucide-react';
import LeaderboardRecognition from './leaderboard-recognition'

const achievements = [
  { name: "Code Ninja", description: "Completed 10 coding challenges", icon: Code },
  { name: "Event Enthusiast", description: "Attended 5 GDGoC events", icon: Calendar },
  { name: "Project Master", description: "Led a successful project", icon: Briefcase },
  { name: "Community Builder", description: "Referred 3 new members", icon: Users },
  { name: "Tech Guru", description: "Conducted a workshop", icon: Mic },
  { name: "Open Source Contributor", description: "Made 5 open source contributions", icon: Github },
]


const hallOfFame = [
  { name: "Vikram Malhotra", achievement: "Google Summer of Code Mentor", year: 2023, image: "/placeholder.svg" },
  { name: "Neha Gupta", achievement: "Best Final Year Project", year: 2022, image: "/placeholder.svg" },
  { name: "Rahul Kapoor", achievement: "Hackathon Champion", year: 2021, image: "/placeholder.svg" },
]

export function RecognitionPageComponent() {
  const [selectedAchievement, setSelectedAchievement] = useState(null)

  return (
    (<div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-yellow-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">GDGoC APSIT Recognition Program</h1>
          <p className="text-xl mb-8">Celebrating excellence and contributions in our tech community</p>
        </div>
      </section>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="hall-of-fame">Hall of Fame</TabsTrigger>
          </TabsList>

          {/* Achievements */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Member Achievements</CardTitle>
                <CardDescription>Unlock badges and certificates by participating in GDGoC APSIT activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {achievements.map((achievement, index) => (
                    <Card
                      key={index}
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setSelectedAchievement(achievement)}>
                      <CardHeader className="flex flex-row items-center gap-4">
                        <achievement.icon className="h-8 w-8 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">{achievement.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{achievement.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            {selectedAchievement && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>{selectedAchievement.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedAchievement.description}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">How to earn this achievement:</h4>
                    <ul className="list-disc pl-5">
                      <li>Participate actively in GDGoC APSIT events</li>
                      <li>Complete the required tasks or milestones</li>
                      <li>Contribute to the community consistently</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setSelectedAchievement(null)}>Close</Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <LeaderboardRecognition />




          {/* Hall of Fame */}
          <TabsContent value="hall-of-fame">
            <Card>
              <CardHeader>
                <CardTitle>Hall of Fame</CardTitle>
                <CardDescription>Recognizing outstanding achievements of our members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {hallOfFame.map((member, index) => (
                    <Card key={index} className="overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover" />
                      <CardHeader>
                        <CardTitle>{member.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-semibold">{member.achievement}</p>
                        <p className="text-sm text-gray-500">{member.year}</p>
                      </CardContent>
                      <CardFooter>
                        <Badge variant="secondary">
                          <Star className="mr-1 h-3 w-3" /> Hall of Fame
                        </Badge>
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
      <section className="bg-yellow-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Your Mark?</h2>
          <p className="text-xl mb-8">Join GDGoC APSIT and start your journey towards recognition!</p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/join">Get Involved</Link>
          </Button>
        </div>
      </section>
    </div>)
  );
}