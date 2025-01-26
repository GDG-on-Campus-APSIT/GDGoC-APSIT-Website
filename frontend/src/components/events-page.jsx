"use client"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { db } from "@/lib/firebase"
import { collection, onSnapshot } from "firebase/firestore"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { EventCard } from "./event-card"
import { EventCardSkeleton } from "./event-card-skeleton"

export function EventsPageComponent() {
  const [date, setDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  // Real-time listener for events collection in Firestore
  useEffect(() => {
    const eventsCollection = collection(db, "events")
    const unsubscribe = onSnapshot(eventsCollection, (snapshot) => {
      const fetchedEvents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setEvents(fetchedEvents)
      setLoading(false)
    })

    return () => unsubscribe() // Clean up listener on component unmount
  }, [])

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const now = new Date()

  // Filter upcoming events
  const upcomingEvents = filteredEvents.filter((event) => {
    const eventStart = new Date(`${event.startDate}T${event.startTime}`)
    return eventStart > now
  })

  // Filter current events
  const currentEvents = filteredEvents.filter((event) => {
    const eventStart = new Date(`${event.startDate}T${event.startTime}`)
    const eventEnd = new Date(`${event.endDate}T${event.endTime}`)
    return eventStart <= now && eventEnd >= now
  })

  // Filter past events
  const pastEvents = filteredEvents.filter((event) => {
    const eventEnd = new Date(`${event.endDate}T${event.endTime}`)
    return eventEnd < now
  })

  const renderEventGrid = (events) => {
    if (loading) {
      return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      )
    }

    if (events.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No events found in this category.</p>
        </div>
      )
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">GDGoC APSIT Events</h1>
          <p className="text-xl mb-8">Sharing knowledge with peers, One talk, workshop and hackathon at a time!</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Label htmlFor="search" className="sr-only">
            Search events
          </Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search events..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {renderEventGrid(upcomingEvents)}
            {!loading && upcomingEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">We&apos;re preparing something exciting for you. Stay tuned!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="current">
            {renderEventGrid(currentEvents)}
            {!loading && currentEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">We&apos;ll have ongoing sessions soon. Check back later!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">{renderEventGrid(pastEvents)}</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

