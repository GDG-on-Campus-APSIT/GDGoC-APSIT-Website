'use client';
import { useState,useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Search, Award, Users } from 'lucide-react';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/lib/firebase';

export function EnhancedLeaderboard({eventId,eventTitle="Hello"}) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('badges')
  const [event, setEvent] = useState("")

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      try {
        const eventDoc = doc(db, "events", eventId);
        const docSnap = await getDoc(eventDoc);

        console.log("event",docSnap)

        if (docSnap.exists()) {
          const eventData = docSnap.data();
          setEvent(eventData);
          setParticipants(eventData.leaderboard || []);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [eventId]);

  // Sort participants
  const sortedParticipants = [...participants].sort((a, b) => {
    if (sortBy === 'badges') {
      return parseInt(b["No. of Skill Badges Completed"]) - parseInt(a["No. of Skill Badges Completed"]);
    }
    return parseInt(b["No. of Arcade Games Completed"]) - parseInt(a["No. of Arcade Games Completed"]);
  })

  // Filter participants
  const filteredParticipants = sortedParticipants.filter(participant => 
    participant["User Name"].toLowerCase().includes(search.toLowerCase()))

  const totalParticipants = participants.length
  const totalBadges = participants.reduce((sum, p) => sum + parseInt(p["No. of Skill Badges Completed"]), 0)
  const totalGames = participants.reduce((sum, p) => sum + parseInt(p["No. of Arcade Games Completed"]), 0)

  return (
    (<div className="container mx-auto py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-center">{event.title} Leaderboard</h1>
        <p className="text-xl text-muted-foreground text-center">
          Track participant progress and achievements
        </p>
      </div>
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalParticipants}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skill Badges Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBadges}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Arcade Games Completed</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGames}</div>
          </CardContent>
        </Card>
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Search className="text-muted-foreground" />
          <Input
            placeholder="Search participants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-[250px]" />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="badges">Skill Badges</SelectItem>
            <SelectItem value="arcade">Arcade Games</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Leaderboard Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="w-12 text-center">Rank</TableHead>
              <TableHead>Participant</TableHead>
              <TableHead className="text-center">Skill Badges</TableHead>
              <TableHead className="text-center">Arcade Games</TableHead>
              <TableHead className="text-center">Completion Status</TableHead>
              <TableHead className="text-center">Profile</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
  {filteredParticipants.map((participant, index) => (
    <TableRow
      key={participant["User Email"]}
      className={`${index % 2 === 0 ? "bg-muted/50" : ""} ${
        participant["Total Completion"] === "Yes" ? "bg-green-100" : ""
      }`}
    >
      <TableCell className="text-center font-medium">
        {index + 1 <= 3 ? (
          <div className="flex items-center justify-center">
            {index + 1 === 1 && <Trophy className="h-6 w-6 text-yellow-500" />}
            {index + 1 === 2 && <Medal className="h-6 w-6 text-gray-400" />}
            {index + 1 === 3 && <Medal className="h-6 w-6 text-amber-600" />}
          </div>
        ) : (
          <span>{index + 1}</span>
        )}
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">{participant["User Name"]}</span>
          <span className="text-sm text-muted-foreground">{participant["User Email"]}</span>
        </div>
      </TableCell>
      <TableCell className="text-center font-medium">
        {participant["No. of Skill Badges Completed"]}
      </TableCell>
      <TableCell className="text-center font-medium">
        {participant["No. of Arcade Games Completed"]}
      </TableCell>
      <TableCell className="text-center">
        <Badge
          variant={
            participant["Total Completion"] === "Yes" ? "success" : "secondary"
          }
        >
          {participant["Total Completion"]}
        </Badge>
      </TableCell>
      <TableCell className="text-center">
        <a
          href={participant["Google Cloud Skills Boost Profile URL"]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          View
        </a>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </div>
    </div>)
  );
}