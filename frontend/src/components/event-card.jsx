import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function EventCard({ event, onEdit, onDelete, onViewSummary, isPast = false }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
            {event.category}
          </span>
        </div>
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
        <Button asChild>
          <Link href={`/events/${event.id}`}>View Details</Link>
        </Button>
        {event.leaderboard ? (
          <Button asChild>
            <Link href={`/events/${event.id}/leaderboard`}>View Leaderboard</Link>
          </Button>
        ) : (
          <></>
        )}
      </CardFooter>
    </Card>
  )
}