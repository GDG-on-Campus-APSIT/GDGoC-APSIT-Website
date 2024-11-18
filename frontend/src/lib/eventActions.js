import { addDoc, updateDoc, deleteDoc, getDoc, doc, collection } from "firebase/firestore"
import { db } from '@/lib/firebase'
import Papa from "papaparse"

export const handleCreateEvent = async (newEvent) => {
  await addDoc(collection(db, "events"), { ...newEvent })
}

export const handleEditEvent = async (updatedEvent) => {
  const eventRef = doc(db, "events", updatedEvent.id)
  const { leaderboardFile, ...eventData } = updatedEvent

  let validLeaderboardData = []
  if (leaderboardFile) {
    try {
      const parsedData = await new Promise((resolve, reject) => {
        Papa.parse(leaderboardFile, {
          header: true,
          complete: (results) => resolve(results.data),
          error: (error) => reject(error),
        })
      })

      validLeaderboardData = parsedData
        .filter(row => row["User Email"])
        .map(row => ({
          "User Name": row["User Name"] || row["User Name"],
          "User Email": row["User Email"],
          "Google Cloud Skills Boost Profile URL": row["Google Cloud Skills Boost Profile URL"],
          "Profile URL Status": row["Profile URL Status"],
          "Access Code Redemption Status": row["Access Code Redemption Status"],
          "No. of Skill Badges Completed": row["# of Skill Badges Completed"] || row["No. of Skill Badges Completed"],
          "No. of Arcade Games Completed": row["# of Arcade Games Completed"] || row["No. of Arcade Games Completed"],
          "Total Completion": row["All Skill Badges & Games Completed"] || row["Total Completion"],
        }))

      eventData.leaderboard = validLeaderboardData
    } catch (error) {
      console.error("Error parsing CSV file:", error)
      throw new Error("Failed to parse the CSV file. Please check the file format.")
    }
  }

  try {
    const eventSnap = await getDoc(eventRef)
    const existingData = eventSnap.exists() ? eventSnap.data() : {}
    const { history = [] } = existingData

    const today = new Date().toISOString().split("T")[0]

    const totalParticipants = validLeaderboardData.length
    const totalBadges = validLeaderboardData.reduce(
      (sum, row) => sum + (parseInt(row["No. of Skill Badges Completed"] || 0) || 0),
      0
    )
    const totalGames = validLeaderboardData.reduce(
      (sum, row) => sum + (parseInt(row["No. of Arcade Games Completed"] || 0) || 0),
      0
    )
    const completionRate = totalParticipants
      ? ((validLeaderboardData.filter(row => row["Total Completion"] === "Yes").length / totalParticipants) * 100).toFixed(1)
      : 0

    const dailyStats = {
      date: today,
      participants: validLeaderboardData,
      stats: {
        totalParticipants,
        totalBadges,
        totalGames,
        completionRate,
      },
    }

    const existingEntryIndex = history.findIndex(entry => entry.date === today)
    if (existingEntryIndex !== -1) {
      history[existingEntryIndex] = dailyStats
    } else {
      history.push(dailyStats)
    }

    eventData.history = history
    eventData.modified = new Date()

    await updateDoc(eventRef, eventData)
  } catch (error) {
    console.error("Error updating Firestore:", error)
    throw new Error("Failed to update the event. Please try again.")
  }
}

export const handleDeleteEvent = async (id) => {
  const eventRef = doc(db, "events", id)
  await deleteDoc(eventRef)
}

export const handleEndEvent = async (id) => {
  const eventRef = doc(db, "events", id)
  await updateDoc(eventRef, { status: "past" })
}