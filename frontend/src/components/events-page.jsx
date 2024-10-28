'use client';
import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for events
const upcomingEvents = [
  { id: 1, title: "Web Development Workshop", date: "2024-11-15", category: "Workshop", description: "Learn the basics of web development with HTML, CSS, and JavaScript." },
  { id: 2, title: "AI in Healthcare Talk", date: "2024-11-20", category: "Tech Talk", description: "Explore the applications of AI in modern healthcare systems." },
  { id: 3, title: "Mobile App Hackathon", date: "2024-12-01", category: "Hackathon", description: "Build innovative mobile apps in this 24-hour coding challenge." },
]

const pastEvents = [
  { id: 4, title: "Cloud Computing Seminar", date: "2024-10-10", category: "Seminar", description: "An overview of cloud computing technologies and their business applications." },
  { id: 5, title: "Data Science Bootcamp", date: "2024-09-25", category: "Workshop", description: "Intensive 3-day bootcamp covering data analysis, machine learning, and visualization." },
  { id: 6, title: "Tech Career Fair", date: "2024-09-15", category: "Networking", description: "Connect with top tech companies and explore career opportunities." },
]

export function EventsPageComponent() {
  const [date, setDate] = useState(new Date())

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">GDGoC APSIT Events</h1>
          <p className="text-xl mb-8">Sharing knowledge with peers, One talk,workshop and hackathon at a time!</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="calendar">Event Calendar</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Event Calendar</CardTitle>
                <CardDescription>View and filter events by date and category</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-4">Events on {date?.toDateString()}</h3>
                  <Select>
                    <SelectTrigger className="w-full mb-4">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="tech-talk">Tech Talk</SelectItem>
                      <SelectItem value="hackathon">Hackathon</SelectItem>
                      <SelectItem value="seminar">Seminar</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <Card key={event.id}>
                        <CardHeader>
                          <CardTitle>{event.title}</CardTitle>
                          <CardDescription>{event.date} - {event.category}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{event.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button asChild>
                            <Link href={`/events/${event.id}`}>View Details</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map(event => (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.date} - {event.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href={`/events/${event.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map(event => (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.date} - {event.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline">
                      <Link href={`/events/${event.id}`}>View Summary</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}