'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Github, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react';

// Mock user data
const userData = {
  name: "Aarav Patel",
  role: "Student Member",
  avatar: "/placeholder.svg",
  email: "aarav.patel@example.com",
  phone: "+91 98765 43210",
  location: "Mumbai, India",
  github: "https://github.com/aaravpatel",
  linkedin: "https://linkedin.com/in/aaravpatel",
  bio: "Passionate about web development and machine learning. Always eager to learn and contribute to innovative projects.",
  memberSince: "2023-09-01",
  achievements: [
    { name: "Code Ninja", description: "Completed 10 coding challenges", progress: 80 },
    { name: "Event Enthusiast", description: "Attended 5 GDGoC events", progress: 100 },
    { name: "Project Master", description: "Led a successful project", progress: 60 },
    { name: "Community Builder", description: "Referred 3 new members", progress: 40 },
  ],
  eventParticipation: [
    { name: "Web Dev Workshop", date: "2024-03-15", role: "Participant" },
    { name: "AI Hackathon", date: "2024-02-20", role: "Team Leader" },
    { name: "Cloud Computing Seminar", date: "2024-01-10", role: "Volunteer" },
  ],
  contributions: [
    { type: "Code Commits", count: 47 },
    { type: "Pull Requests", count: 12 },
    { type: "Issues Reported", count: 8 },
    { type: "Events Organized", count: 2 },
  ],
  skills: ["JavaScript", "React", "Node.js", "Python", "Machine Learning", "Git"],
}

export function ProfilePageComponent() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    (<div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Image
              src={userData.avatar}
              alt={userData.name}
              width={200}
              height={200}
              className="rounded-full border-4 border-white" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{userData.name}</h1>
              <p className="text-xl mb-4">{userData.role}</p>
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="text-sm">
                  <Mail className="w-4 h-4 mr-1" />
                  {userData.email}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <Phone className="w-4 h-4 mr-1" />
                  {userData.phone}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {userData.location}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{userData.bio}</p>
                  <div className="mt-4 flex flex-col gap-2">
                    <p><User className="inline-block mr-2" /> Member since: {new Date(userData.memberSince).toLocaleDateString()}</p>
                    <p>
                      <Github className="inline-block mr-2" />
                      <Link href={userData.github} className="text-blue-600 hover:underline">GitHub Profile</Link>
                    </p>
                    <p>
                      <Linkedin className="inline-block mr-2" />
                      <Link href={userData.linkedin} className="text-blue-600 hover:underline">LinkedIn Profile</Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>My Achievements</CardTitle>
                <CardDescription>Track your progress and unlock new achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {userData.achievements.map((achievement, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{achievement.name}</h3>
                        <Badge variant={achievement.progress === 100 ? "default" : "outline"}>
                          {achievement.progress === 100 ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Event Participation</CardTitle>
                <CardDescription>Your involvement in GDGoC APSIT events</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userData.eventParticipation.map((event, index) => (
                      <TableRow key={index}>
                        <TableCell>{event.name}</TableCell>
                        <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                        <TableCell>{event.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contributions Tab */}
          <TabsContent value="contributions">
            <Card>
              <CardHeader>
                <CardTitle>My Contributions</CardTitle>
                <CardDescription>Your impact on the GDGoC APSIT community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {userData.contributions.map((contribution, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold">{contribution.count}</CardTitle>
                        <CardDescription>{contribution.type}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Keep Growing with GDGoC APSIT!</h2>
          <p className="text-xl mb-8">Explore more opportunities to learn, contribute, and achieve.</p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/events">Upcoming Events</Link>
          </Button>
        </div>
      </section>
    </div>)
  );
}