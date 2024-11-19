'use client';
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label";
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from "firebase/firestore";
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { EventCard } from './event-card';

export function EventsPageComponent() {
  const [date, setDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">GDGoC APSIT Events</h1>
          <p className="text-xl mb-8">Sharing knowledge with peers, One talk,workshop and hackathon at a time!</p>
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
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          

          <TabsContent value="upcoming">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="current">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map(event => (
                <EventCard key={event.id} event={event} isPast/>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}