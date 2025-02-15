'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Papa from 'papaparse'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

function InfoBox({ title, description, sampleFile }) {
  return (
    <Alert className="mb-4">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
        {sampleFile && (
          <a href={sampleFile} download className="text-blue-500 hover:underline ml-2">
            Download sample CSV
          </a>
        )}
      </AlertDescription>
    </Alert>
  )
}

export function RecognitionManagement() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <section className="bg-yellow-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Recognition Program Management</h1>
          <p className="text-xl mb-8">Manage achievements and hall of fame entries</p>
        </div>
      </section>
      <div className="container mx-auto px-4">
        <Tabs defaultValue="management" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="management">Management</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="management">
            <ManagementTab />
          </TabsContent>
          
          <TabsContent value="comparison">
            <ComparisonTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ManagementTab() {
  const [eventName, setEventName] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [csvFile, setCsvFile] = useState(null)

  const firestore = getFirestore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!csvFile) {
      toast.error('Please select a CSV file to upload.')
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

      toast.success("Data successfully saved to Firestore!", {
        position: "bottom-right",
        autoClose: 3000,
      })
      setEventName("")
      setEventDate("")
      setCsvFile(null)
    }
    fileReader.readAsText(csvFile)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recognition Program Admin</CardTitle>
        <CardDescription>Add new event points to the leaderboard</CardDescription>
      </CardHeader>
      <CardContent>
        <InfoBox
            title="Required CSV Columns"
            description="The CSV file should include the following columns: Moodle ID, Name, Points."
            sampleFile="/sample-management.csv"
          />
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
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </CardContent>
    </Card>
  )
}

// Helper function to calculate name match score
function calculateNameMatchScore(nameParts1, nameParts2) {
  // If either name is empty, return 0
  if (!nameParts1.length || !nameParts2.length) return 0
  
  // Get first and last names from both sets
  const firstName1 = nameParts1[0]
  const lastName1 = nameParts1[nameParts1.length - 1]
  const firstName2 = nameParts2[0]
  const lastName2 = nameParts2[nameParts2.length - 1]
  
  let score = 0
  
  // First name match is essential
  if (firstName1 !== firstName2) return 0
  score += 0.5
  
  // Last name match is also essential
  if (lastName1 !== lastName2) return 0
  score += 0.5
  
  // Additional matching for middle names if they exist
  const middleNames1 = nameParts1.slice(1, -1)
  const middleNames2 = nameParts2.slice(1, -1)
  
  // If one has middle names and the other doesn't, we still consider it a match
  // but with a slightly lower score
  if (middleNames1.length === 0 || middleNames2.length === 0) {
    return score * 0.9
  }
  
  // If both have middle names, check for matches
  const commonMiddleNames = middleNames1.filter(name => 
    middleNames2.includes(name)
  )
  
  // Add bonus score for matching middle names
  if (commonMiddleNames.length > 0) {
    score += 0.1
  }
  
  return score
}

function ComparisonTab() {
  const [csvFile, setCsvFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const firestore = getFirestore()

  const handleCompare = async (e) => {
    e.preventDefault()
    if (!csvFile) {
      toast.error('Please select a CSV file to compare')
      return
    }

    setIsProcessing(true)

    try {
      // First, get all recognition data from Firestore
      const recognitionSnapshot = await getDocs(collection(firestore, "recognition"))
      const recognitionData = []
      
      recognitionSnapshot.forEach((doc) => {
        const data = doc.data()
        if (data.name) {  // Check if name exists
          recognitionData.push({
            fullName: data.name,
            nameParts: data.name.toLowerCase().split(' ').filter(part => part.length > 0),
            points: data.totalPoints || 0
          })
        }
      })

      // Process the input CSV
      Papa.parse(csvFile, {
        complete: (results) => {
          // Assume first row is header and first column is names
          const comparisonData = results.data.slice(1).map(row => {
            const name = row[0]
            if (!name) return null // Skip empty rows
            
            // Split the comparison name into parts
            const comparisonNameParts = name.toLowerCase().split(' ').filter(part => part.length > 0)
            
            // Find the best matching name from recognition data
            let bestMatch = null
            let maxMatchScore = 0
            
            for (const entry of recognitionData) {
              const matchScore = calculateNameMatchScore(comparisonNameParts, entry.nameParts)
              if (matchScore > maxMatchScore) {
                maxMatchScore = matchScore
                bestMatch = entry
              }
            }
            
            // Only consider it a match if the score is high enough
            const matchThreshold = 0.7 // Adjust this threshold as needed
            return {
              name: name,
              points: (bestMatch && maxMatchScore >= matchThreshold) ? bestMatch.points : 0,
              matched_name: (bestMatch && maxMatchScore >= matchThreshold) ? bestMatch.fullName : 'No match found'
            }
          }).filter(Boolean) // Remove null entries

          // Sort by points in descending order
          comparisonData.sort((a, b) => b.points - a.points)

          // Generate output CSV
          const csv = Papa.unparse(comparisonData)
          
          // Create and trigger download
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.setAttribute('download', 'recognition_comparison.csv')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)

          toast.success('Comparison complete! Download started.')
          setCsvFile(null)
        },
        error: (error) => {
          console.error('Error parsing CSV:', error)
          toast.error('Error processing CSV file')
        }
      })
    } catch (error) {
      console.error('Error processing comparison:', error)
      toast.error('Error processing comparison')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recognition Comparison</CardTitle>
        <CardDescription>
          Upload a CSV file with participant names to compare against recognition records
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InfoBox
            title="Required CSV Column"
            description="The CSV file should include a 'Name' column with participant names."
            sampleFile="/sample-comparison.csv"
          />
        <form onSubmit={handleCompare} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="compareFile">CSV File (with names column)</Label>
            <Input
              id="compareFile"
              type="file"
              accept=".csv"
              onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Compare and Download'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}