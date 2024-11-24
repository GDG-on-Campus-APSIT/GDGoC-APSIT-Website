import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function EventManagement({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Event Management</h1>
          <p className="text-xl mb-8">Manage and create events for GDGoC APSIT</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="current">Current Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="create">Create Event</TabsTrigger>
          </TabsList>
          {children}
        </Tabs>
      </div>
    </div>
  )
}