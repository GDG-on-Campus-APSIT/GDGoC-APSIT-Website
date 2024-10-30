'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Edit, Trash2, Search, Calendar, Clock, MapPin } from 'lucide-react';

// Mock data for events
const allEvents = [
  { id: 1, title: "Web Development Workshop", date: "2024-11-15", time: "14:00", location: "Room 101", category: "Workshop", description: "Learn the basics of web development with HTML, CSS, and JavaScript.", status: "upcoming" },
  { id: 2, title: "AI in Healthcare Talk", date: "2024-11-20", time: "15:30", location: "Auditorium", category: "Tech Talk", description: "Explore the applications of AI in modern healthcare systems.", status: "upcoming" },
  { id: 3, title: "Mobile App Hackathon", date: "2024-12-01", time: "09:00", location: "Innovation Lab", category: "Hackathon", description: "Build innovative mobile apps in this 24-hour coding challenge.", status: "upcoming" },
  { id: 4, title: "Cloud Computing Seminar", date: "2024-10-10", time: "13:00", location: "Conference Hall", category: "Seminar", description: "An overview of cloud computing technologies and their business applications.", status: "past" },
  { id: 5, title: "Data Science Bootcamp", date: "2024-09-25", time: "10:00", location: "Room 205", category: "Workshop", description: "Intensive 3-day bootcamp covering data analysis, machine learning, and visualization.", status: "past" },
  { id: 6, title: "Tech Career Fair", date: "2024-09-15", time: "11:00", location: "Main Hall", category: "Networking", description: "Connect with top tech companies and explore career opportunities.", status: "past" },
]

export function EventManagement() {
  const [events, setEvents] = useState(allEvents)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingEvent, setEditingEvent] = useState(null)
  const [viewingSummary, setViewingSummary] = useState(null)

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()))

  const upcomingEvents = filteredEvents.filter(event => event.status === "upcoming")
  const pastEvents = filteredEvents.filter(event => event.status === "past")

  const handleCreateEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: events.length + 1, status: "upcoming" }])
  }

  const handleEditEvent = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event))
    setEditingEvent(null)
  }

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id))
  }

  const handleEndEvent = (id) => {
    setEvents(
      events.map(event => event.id === id ? { ...event, status: "past" } : event)
    )
  }

  return (
    (<div className="min-h-screen bg-gray-50">
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Event Management</h1>
          <p className="text-xl mb-8">Manage and create events for GDGoC APSIT</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Label htmlFor="search" className="sr-only">Search events</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search events..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="create">Create Event</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onEdit={() => setEditingEvent(event)}
                  onDelete={() => handleDeleteEvent(event.id)}
                  onEnd={() => handleEndEvent(event.id)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  isPast
                  onViewSummary={() => setViewingSummary(event)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create">
            <CreateEventForm onCreateEvent={handleCreateEvent} />
          </TabsContent>
        </Tabs>

        {editingEvent && (
          <EditEventDialog
            event={editingEvent}
            onClose={() => setEditingEvent(null)}
            onSave={handleEditEvent} />
        )}

        {viewingSummary && (
          <EventSummaryDialog event={viewingSummary} onClose={() => setViewingSummary(null)} />
        )}
      </div>
    </div>)
  );
}

function EventCard({ event, onEdit, onDelete, onEnd, onViewSummary, isPast = false }) {
  return (
    (<Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {event.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {event.time}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {event.location}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{event.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isPast ? (
          <>
            <Button variant="outline" onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
            <Button variant="secondary" onClick={onEnd}>
              End Event
            </Button>
          </>
        ) : (
          <Button variant="outline" onClick={onViewSummary}>
            View Summary
          </Button>
        )}
      </CardFooter>
    </Card>)
  );
}

function CreateEventForm({ onCreateEvent }) {
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    category: "",
    description: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreateEvent(newEvent)
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      category: "",
      description: "",
    })
  }

  return (
    (<Card>
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              required />
          </div>
          <div>
            <Label htmlFor="date">Event Date</Label>
            <Input
              id="date"
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              required />
          </div>
          <div>
            <Label htmlFor="time">Event Time</Label>
            <Input
              id="time"
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              required />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              required />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={newEvent.category}
              onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="tech-talk">Tech Talk</SelectItem>
                <SelectItem value="hackathon">Hackathon</SelectItem>
                <SelectItem value="seminar">Seminar</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              required />
          </div>
          <Button type="submit">Create Event</Button>
        </form>
      </CardContent>
    </Card>)
  );
}

function EditEventDialog({ event, onClose, onSave }) {
  const [editedEvent, setEditedEvent] = useState(event)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(editedEvent)
  }

  return (
    (<Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-title">Event Title</Label>
            <Input
              id="edit-title"
              value={editedEvent.title}
              onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
              required />
          </div>
          <div>
            <Label htmlFor="edit-date">Event Date</Label>
            <Input
              id="edit-date"
              type="date"
              value={editedEvent.date}
              onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })}
              required />
          </div>
          <div>
            <Label htmlFor="edit-time">Event Time</Label>
            <Input
              id="edit-time"
              type="time"
              value={editedEvent.time}
              onChange={(e) => setEditedEvent({ ...editedEvent, time: e.target.value })}
              required />
          </div>
          <div>
            <Label htmlFor="edit-location">Location</Label>
            <Input
              id="edit-location"
              value={editedEvent.location}
              onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
              required />
          </div>
          <div>
            <Label htmlFor="edit-category">Category</Label>
            <Select
              value={editedEvent.category}
              onValueChange={(value) => setEditedEvent({ ...editedEvent, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="tech-talk">Tech Talk</SelectItem>
                <SelectItem value="hackathon">Hackathon</SelectItem>
                <SelectItem value="seminar">Seminar</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={editedEvent.description}
              onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
              required />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>)
  );
}

function EventSummaryDialog({ event, onClose }) {
  return (
    (<Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title} - Event Summary</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Date and  Time</h4>
            <p>{event.date} at {event.time}</p>
          </div>
          <div>
            <h4 className="font-semibold">Location</h4>
            <p>{event.location}</p>
          </div>
          <div>
            <h4 className="font-semibold">Category</h4>
            <p>{event.category}</p>
          </div>
          <div>
            <h4 className="font-semibold">Description</h4>
            <p>{event.description}</p>
          </div>
          {/* Add more summary details as needed */}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>)
  );
}