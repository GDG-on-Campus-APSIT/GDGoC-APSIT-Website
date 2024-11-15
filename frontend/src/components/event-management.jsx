'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Edit, Trash2, Search, Calendar, Clock, MapPin, AlignJustify } from 'lucide-react';

import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, arrayUnion } from "firebase/firestore"; // Firestore imports
import Papa from "papaparse";

export function EventManagement() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewingSummary, setViewingSummary] = useState(null);

  // Real-time listener for events collection in Firestore
  useEffect(() => {
    const eventsCollection = collection(db, "events");
    const unsubscribe = onSnapshot(eventsCollection, (snapshot) => {
      const fetchedEvents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(fetchedEvents);
    });

    return () => unsubscribe(); // Clean up listener on component unmount
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const now = new Date();

  // Filter upcoming events
  const upcomingEvents = filteredEvents.filter(event => {
    const eventStart = new Date(`${event.startDate}T${event.startTime}`);
    return eventStart > now;
  });
  
  // Filter current events
  const currentEvents = filteredEvents.filter(event => {
    const eventStart = new Date(`${event.startDate}T${event.startTime}`);
    const eventEnd = new Date(`${event.endDate}T${event.endTime}`);
    return eventStart <= now && eventEnd >= now;
  });
  
  // Filter past events
  const pastEvents = filteredEvents.filter(event => {
    const eventEnd = new Date(`${event.endDate}T${event.endTime}`);
    return eventEnd < now;
  });
  
  console.log("Events",events)
  console.log("Upcoming events", upcomingEvents);
  console.log("Current events", currentEvents);
  console.log("Past events", pastEvents);
  

  // Add new event to Firestore
  const handleCreateEvent = async (newEvent) => {
    await addDoc(collection(db, "events"), { ...newEvent });
  };


  // Update an existing event in Firestore
  const handleEditEvent = async (updatedEvent) => {
    const eventRef = doc(db, "events", updatedEvent.id);
  
    // Extract and remove leaderboardFile from updatedEvent
    const { leaderboardFile, ...eventData } = updatedEvent;
  
    if (leaderboardFile) {
      try {
        // Parse the CSV file using PapaParse
        const parsedData = await new Promise((resolve, reject) => {
          Papa.parse(leaderboardFile, {
            header: true, // Assumes the CSV has a header row
            complete: (results) => resolve(results.data),
            error: (error) => reject(error),
          });
        });
  
        // Filter out rows missing the "User Email" field, which is required as a unique key
        const validLeaderboardData = parsedData
          .filter(row => row["User Email"]) // Only keep rows with a "User Email" field
          .map(row => ({
            userEmail: row["User Email"], // Store as "userEmail" in Firestore
            ...row, // Spread other columns as properties
          }));
  
        // Add the leaderboard data to the event data
        eventData.leaderboard = validLeaderboardData;
      } catch (error) {
        console.error("Error parsing CSV file:", error);
        alert("Failed to parse the CSV file. Please check the file format.");
        return; // Stop the function if there's a parsing error
      }
    }
  
    try {
      // Update the event document in Firestore
      await updateDoc(eventRef, eventData);
      setEditingEvent(null);
    } catch (error) {
      console.error("Error updating Firestore:", error);
      alert("Failed to update the event. Please try again.");
    }
  };
  
  

  // Delete an event from Firestore
  const handleDeleteEvent = async (id) => {
    const eventRef = doc(db, "events", id);
    await deleteDoc(eventRef);
  };

  // Update the event status to "past" in Firestore
  const handleEndEvent = async (id) => {
    const eventRef = doc(db, "events", id);
    await updateDoc(eventRef, { status: "past" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="current">Current Events</TabsTrigger>
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

          <TabsContent value="current">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentEvents.map(event => (
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
    </div>
  );
}

function EventCard({ event, onEdit, onDelete, onViewSummary, isPast = false }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {event.startDate === event.endDate ? (
              <span>{event.startDate}</span>
            ) : (
              <span>
                {event.startDate} - {event.endDate}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {event.startTime} - {event.endTime}
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
          </>
        ) : (
          <Button variant="outline" onClick={onViewSummary}>
            View Summary
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

function CreateEventForm({ onCreateEvent }) {
  const [newEvent, setNewEvent] = useState({
    title: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: "",
    category: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateEvent(newEvent);
    setNewEvent({
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      location: "",
      category: "",
      description: "",
    });
  };

  return (
    <Card>
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
            <Label htmlFor="date">Event Start Date</Label>
            <Input
              id="date"
              type="date"
              value={newEvent.startDate}
              onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
              required />
          </div>
          <div>
            <Label htmlFor="time">Event Start Time</Label>
            <Input
              id="time"
              type="time"
              value={newEvent.startTime}
              onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
              required />
          </div>
          <div>
            <Label htmlFor="date">Event End Date</Label>
            <Input
              id="date"
              type="date"
              value={newEvent.endDate}
              onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
              required />
          </div>
          <div>
            <Label htmlFor="time">Event End Time</Label>
            <Input
              id="time"
              type="time"
              value={newEvent.endTime}
              onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
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
              onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}
            >
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
    </Card>
  );
}

function EditEventDialog({ event, onClose, onSave }) {
  const [editedEvent, setEditedEvent] = useState(event);
  const [leaderboardFile, setLeaderboardFile] = useState(null); // State to hold the CSV file

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...editedEvent, leaderboardFile }); // Pass leaderboardFile with other event data
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent style={{ maxHeight: '80vh', overflowY: 'auto' }}>
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
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-start-date">Start Date</Label>
            <Input
              id="edit-start-date"
              type="date"
              value={editedEvent.startDate}
              onChange={(e) => setEditedEvent({ ...editedEvent, startDate: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-start-time">Start Time</Label>
            <Input
              id="edit-start-time"
              type="time"
              value={editedEvent.startTime}
              onChange={(e) => setEditedEvent({ ...editedEvent, startTime: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-end-date">End Date</Label>
            <Input
              id="edit-end-date"
              type="date"
              value={editedEvent.endDate}
              onChange={(e) => setEditedEvent({ ...editedEvent, endDate: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-end-time">End Time</Label>
            <Input
              id="edit-end-time"
              type="time"
              value={editedEvent.endTime}
              onChange={(e) => setEditedEvent({ ...editedEvent, endTime: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-location">Location</Label>
            <Input
              id="edit-location"
              value={editedEvent.location}
              onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-category">Category</Label>
            <Select
              value={editedEvent.category}
              onValueChange={(value) => setEditedEvent({ ...editedEvent, category: value })}
            >
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
              required
            />
          </div>
          {/* New CSV file upload field for leaderboard */}
          <div>
            <Label htmlFor="edit-leaderboard-file">Upload Leaderboard (CSV)</Label>
            <Input
              id="edit-leaderboard-file"
              type="file"
              accept=".csv"
              onChange={(e) => setLeaderboardFile(e.target.files[0])} // Update state with selected file
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


function EventSummaryDialog({ event, onClose }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title} - Event Summary</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <h4 className="font-semibold">Date & Time:</h4>
            {event.startDate === event.endDate ? (
              <span>{event.startDate} from {event.startTime} to {event.endTime}</span>
            ) : (
              <span>
                {event.startDate} {event.startTime} - {event.endDate} {event.endTime}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <h4 className="font-semibold">Location:</h4>
            <p>{event.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <AlignJustify className="h-4 w-4" />
            <h4 className="font-semibold">Category</h4>
            <p>{event.category}</p>
          </div>
          <div>
            <h4 className="font-semibold">Description</h4>
            <p>{event.description}</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}