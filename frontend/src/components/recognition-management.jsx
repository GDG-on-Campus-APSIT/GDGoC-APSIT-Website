'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore" // Firestore imports
import { toast , Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function RecognitionManagement() {
  const [eventName, setEventName] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [csvFile, setCsvFile] = useState(null)

  const firestore = getFirestore() // Initialize Firestore

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!csvFile) {
      toast.error('Please select a CSV file to upload.');
      return
    }

    const fileReader = new FileReader()
    fileReader.onload = async (e) => {
      const content = e.target.result
      const rows = content.split("\n").slice(1) // Skip the header row
      for (let row of rows) {
        if (!row.trim()) continue
        const [moodleId, name, points] = row.split(",").map((cell) => cell.trim())
        const pointsNumber = parseInt(points, 10)

        // Process the data for Firestore
        const recognitionDocRef = doc(firestore, "recognition", moodleId)
        const docSnapshot = await getDoc(recognitionDocRef)

        if (docSnapshot.exists()) {
          // Update existing document
          const existingData = docSnapshot.data()
          const updatedEvents = [
            ...existingData.events,
            { name: eventName, points: pointsNumber, date: eventDate }
          ]
          const updatedTotalPoints = existingData.totalPoints + pointsNumber
          await setDoc(recognitionDocRef, {
            ...existingData,
            totalPoints: updatedTotalPoints,
            events: updatedEvents
          })
        } else {
          // Create new document
          await setDoc(recognitionDocRef, {
            name,
            moodleId,
            totalPoints: pointsNumber,
            events: [{ name: eventName, points: pointsNumber, date: eventDate }]
          })
        }
      }

      toast.success("Data successfully saved to Firestore!", {position: "bottom-right",autoClose: 3000,})
      setEventName("")
      setEventDate("")
      setCsvFile(null)
    }
    fileReader.readAsText(csvFile)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <section className="bg-yellow-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Recognition Program Management</h1>
          <p className="text-xl mb-8">Manage achievements and hall of fame entries</p>
        </div>
      </section>
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Recognition Program Admin</CardTitle>
            <CardDescription>Add new event points to the leaderboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                  id="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="csvFile">CSV File</Label>
                <Input
                  id="csvFile"
                  type="file"
                  accept=".csv"
                  onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" >Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
