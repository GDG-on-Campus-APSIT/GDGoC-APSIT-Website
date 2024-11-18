'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { handleEditEvent } from '@/lib/eventActions'

export function EditEventDialog({ event, onClose }) {
  const [editedEvent, setEditedEvent] = useState(event)
  const [leaderboardFile, setLeaderboardFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handleEditEvent({ ...editedEvent, leaderboardFile })
      onClose()
    } catch (error) {
      console.error("Failed to edit event:", error)
      // Here you might want to show an error message to the user
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
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
          <div>
            <Label htmlFor="edit-leaderboard-file">Upload Leaderboard (CSV)</Label>
            <Input
              id="edit-leaderboard-file"
              type="file"
              accept=".csv"
              onChange={(e) => setLeaderboardFile(e.target.files[0])}
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
  )
}