'use client'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, AlignJustify } from 'lucide-react'

export function EventSummaryDialog({ event, onClose }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
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
            <h4 className="font-semibold">Category:</h4>
            <p>{event.category}</p>
          </div>
          <div>
            <h4 className="font-semibold">Description:</h4>
            <p>{event.description}</p>
          </div>
          {event.leaderboard && (
            <div>
              <h4 className="font-semibold">Leaderboard Summary:</h4>
              <p>Total Participants: {event.leaderboard.length}</p>
              <p>Completion Rate: {event.leaderboard.filter(p => p["Total Completion"] === "Yes").length / event.leaderboard.length * 100}%</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}