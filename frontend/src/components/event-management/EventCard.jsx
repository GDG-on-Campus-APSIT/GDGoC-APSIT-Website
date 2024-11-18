'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Edit, Trash2 } from 'lucide-react'
import { EditEventDialog } from './EditEventDialog'
import { EventSummaryDialog } from './EventSummaryDialog'
import { handleEditEvent, handleDeleteEvent, handleEndEvent } from '@/lib/eventActions'

export function EventCard({ event, isPast = false }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isViewingSummary, setIsViewingSummary] = useState(false)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {event.startDate === event.endDate ? (
                <span>{event.startDate}</span>
              ) : (
                <span>{event.startDate} - {event.endDate}</span>
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
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteEvent(event.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => setIsViewingSummary(true)}>
              View Summary
            </Button>
          )}
        </CardFooter>
      </Card>
      {isEditing && (
        <EditEventDialog
          event={event}
          onClose={() => setIsEditing(false)}
          onSave={handleEditEvent}
        />
      )}
      {isViewingSummary && (
        <EventSummaryDialog
          event={event}
          onClose={() => setIsViewingSummary(false)}
        />
      )}
    </>
  )
}