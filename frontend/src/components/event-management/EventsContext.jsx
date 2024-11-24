'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { collection, onSnapshot } from "firebase/firestore"
import { db } from '@/lib/firebase'

const EventsContext = createContext(null)

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const eventsCollection = collection(db, "events")
    const unsubscribe = onSnapshot(eventsCollection, (snapshot) => {
      const fetchedEvents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setEvents(fetchedEvents)
    })

    return () => unsubscribe()
  }, [])

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const now = new Date()
  const upcomingEvents = filteredEvents.filter(event => new Date(`${event.startDate}T${event.startTime}`) > now)
  const currentEvents = filteredEvents.filter(event => {
    const start = new Date(`${event.startDate}T${event.startTime}`)
    const end = new Date(`${event.endDate}T${event.endTime}`)
    return start <= now && end >= now
  })
  const pastEvents = filteredEvents.filter(event => new Date(`${event.endDate}T${event.endTime}`) < now)

  return (
    <EventsContext.Provider value={{ events, setEvents, searchTerm, setSearchTerm, upcomingEvents, currentEvents, pastEvents }}>
      {children}
    </EventsContext.Provider>
  )
}

export const useEvents = () => useContext(EventsContext)