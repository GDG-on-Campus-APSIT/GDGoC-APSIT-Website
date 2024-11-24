'use client'

import { useEvents } from './EventsContext'
import { EventCard } from './EventCard'
import { TabsContent } from "@/components/ui/tabs"
import { CreateEventForm } from "@/components/event-management/CreateEventForm"

export function EventList() {
  const { upcomingEvents, currentEvents, pastEvents } = useEvents()

  return (
    <>
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
            <EventCard key={event.id} event={event} isPast />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="create">
        <CreateEventForm />
      </TabsContent>
    </>
  )
}