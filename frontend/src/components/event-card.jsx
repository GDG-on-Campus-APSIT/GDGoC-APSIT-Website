import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link'

export function EventCard({ event, onEdit, onDelete, onViewSummary, isPast = false }) {
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
                <Button asChild>
                    <Link href={`/events/${event.id}`}>View Details</Link>
                </Button>
            </>
          ) : (
            <Button variant="outline" onClick={onViewSummary}>
              View Summary
            </Button>
          )}
          {event.leaderboard ? (
                    <Button asChild>
                    <Link href={`/events/${event.id}/leaderboard`}>View Leaderboard</Link>
                </Button>
                ) : (<></>)}
        </CardFooter>
      </Card>
    );
  }