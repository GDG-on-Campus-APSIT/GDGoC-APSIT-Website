'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase" // Ensure this points to your Firebase setup
import { Calendar, Clock, MapPin, Users, Award, Gamepad2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function EventDetails({ eventId }) {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventRef = doc(db, "events", eventId)
        const eventSnap = await getDoc(eventRef)

        if (eventSnap.exists()) {
          setEvent(eventSnap.data())
        } else {
          setError("Event not found")
        }
      } catch (err) {
        setError("Failed to load event details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>
  }

  const now = new Date()
  const eventStart = new Date(`${event.startDate}T${event.startTime}`);
  console.log(eventStart)

  // Ensure event.history exists before accessing it
  const latestStats = event.history?.[event.history.length - 1]?.stats || {}

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold">{event.title}</CardTitle>
              <CardDescription className="text-lg mt-2">{event.description}</CardDescription>
            </div>
            <Badge variant="outline" className="text-lg py-1 px-3">
              {event.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>{event.startDate} to {event.endDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>{event.startTime} - {event.endTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>{event.location}</span>
            </div>
          </div>
          {eventStart < now ? (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Latest Stats</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={<Users />} value={latestStats.totalParticipants || 0} label="Participants" />
                <StatCard icon={<Award />} value={latestStats.totalBadges || 0} label="Badges Earned" />
                <StatCard icon={<Gamepad2 />} value={latestStats.totalGames || 0} label="Games Completed" />
                <div className="flex items-center space-x-2 bg-muted p-3 rounded-lg">
                  <div className="col-span-full sm:col-span-2 md:col-span-1">
                    <h4 className="text-sm font-bold mb-2">Completion Rate</h4>
                    <Progress value={parseFloat(latestStats.completionRate) || 0} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">{latestStats.completionRate || 0}%</p>
                  </div>
                </div>
              </div>
            </div>
          ):(
            <></>
          )}
          

        </CardContent>
        <CardFooter className="flex justify-between">
          {eventStart > now ? (
            <Button variant="outline">Register Now</Button>
          ): (
            <></>
          )}
          
          <Link href={`/events/${eventId}/leaderboard`}>
            <Button>View Leaderboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

function StatCard({ icon, value, label }) {
  return (
    <div className="flex items-center space-x-2 bg-muted p-3 rounded-lg">
      {icon}
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  )
}
