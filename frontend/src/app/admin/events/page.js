import { Suspense } from 'react'
import { EventManagement } from "@/components/event-management/EventManagement"
import { NavbarComponent } from "@/components/navbar"
import { EventsProvider } from "@/components/event-management/EventsContext"
import { EventList } from "@/components/event-management/EventList"
import { SearchBar } from "@/components/event-management/SearchBar"

export default function EventsPage() {
  return (
    <>
      <NavbarComponent />
      <EventManagement>
        <EventsProvider>
          <SearchBar />
          <Suspense fallback={<div>Loading...</div>}>
            <EventList />
          </Suspense>
        </EventsProvider>
      </EventManagement>
    </>
  )
}