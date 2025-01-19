import { addDoc, updateDoc, deleteDoc, getDoc, doc, collection } from "firebase/firestore";
import { db } from '@/lib/firebase';
import Papa from "papaparse";

export const handleCreateEvent = async (newEvent) => {
  await addDoc(collection(db, "events"), { ...newEvent });
};

export const handleEditEvent = async (updatedEvent) => {
  const eventRef = doc(db, "events", updatedEvent.id);
  const { leaderboardFile, sendMail, ...eventData } = updatedEvent;

  // Handle Date TBA logic
  if (eventData.dateTBA) {
    eventData.startDate = null;
    eventData.startTime = null;
    eventData.endDate = null;
    eventData.endTime = null;
  }

//   let validLeaderboardData = [];
// if (leaderboardFile) {
//   try {
//     const parsedData = await new Promise((resolve, reject) => {
//       Papa.parse(leaderboardFile, {
//         header: true,
//         complete: (results) => resolve(results.data),
//         error: (error) => reject(error),
//       });
//     });

//     const todayDate = new Date().toISOString().split("T")[0]; // Format today's date as YYYY-MM-DD

//     validLeaderboardData = parsedData
//       .filter(row => row["User Email"]) // Filter rows with a valid "User Email"
//       .map(row => ({
//         "User Name": row["User Name"] || row["User Name"],
//         "User Email": row["User Email"],
//         "Google Cloud Skills Boost Profile URL": row["Google Cloud Skills Boost Profile URL"],
//         "Profile URL Status": row["Profile URL Status"],
//         "Access Code Redemption Status": row["Access Code Redemption Status"],
//         "No. of Skill Badges Completed": row["# of Skill Badges Completed"] || row["No. of Skill Badges Completed"],
//         "No. of Arcade Games Completed": row["# of Arcade Games Completed"] || row["No. of Arcade Games Completed"],
//         "Total Completion": row["All Skill Badges & Games Completed"] || row["Total Completion"],
//       }));

//     // Add the "Completion Date" column after parsing
//     validLeaderboardData = validLeaderboardData.map(entry => ({
//       ...entry,
//       "Completion Date": entry["Total Completion"] === "Yes" ? eventData.uploadDate : null, // Add upload date only if Total Completion is Yes
//       // ...newEntry,
//       // "Completion Date": newEntry["Total Completion"] === "Yes" ? eventData.uploadDate : null, // Add today's date only if Total Completion is Yes
//     }));    

//     // Assign the processed leaderboard data to eventData
//     eventData.leaderboard = validLeaderboardData;
//     console.log(eventData.uploadDate);
    
//   } catch (error) {
//     console.error("Error parsing CSV file:", error);
//     throw new Error("Failed to parse the CSV file. Please check the file format.");
//   }
// }


let validLeaderboardData = [];
if (leaderboardFile) {
  try {
    const parsedData = await new Promise((resolve, reject) => {
      Papa.parse(leaderboardFile, {
        header: true,
        complete: (results) => resolve(results.data),
        error: (error) => reject(error),
      });
    });

   // const todayDate = new Date().toISOString().split("T")[0];

    const eventSnap = await getDoc(doc(db, "events", updatedEvent.id));
    const existingLeaderboard = eventSnap.exists() && eventSnap.data().leaderboard ? eventSnap.data().leaderboard : [];

    const parsedLeaderboardData = parsedData
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
      }));

    const updatedLeaderboard = parsedLeaderboardData.map(newEntry => {
      const existingEntry = existingLeaderboard.find(entry => entry["User Email"] === newEntry["User Email"]);

      let completionDate = null;
      if (existingEntry) {
        completionDate = existingEntry["Completion Date"]         //rank by completion date
          ? existingEntry["Completion Date"]
          : newEntry["Total Completion"] === "Yes"
          ? eventData.uploadDate
          : null;
      } else {
        completionDate = newEntry["Total Completion"] === "Yes" ? eventData.uploadDate : null;        
      }

      return {
        ...newEntry,                               //for next CSV upload create new entry
        "Completion Date": completionDate,
      };
    });

    // Rank leaderboard by completion date
    const rankedLeaderboard = updatedLeaderboard
    validLeaderboardData = rankedLeaderboard;
    eventData.leaderboard = validLeaderboardData;

    console.log("Ranked Leaderboard:", validLeaderboardData);
  } catch (error) {
    console.error("Error parsing CSV file: ", error);
    throw new Error("Failed to parse the CSV file. Please check the file format.");
  }
}




  try {
    const eventSnap = await getDoc(eventRef);
    const existingData = eventSnap.exists() ? eventSnap.data() : {};
    const { history = [] } = existingData;

    const today = new Date().toISOString().split("T")[0];

    const totalParticipants = validLeaderboardData.length;
    const totalBadges = validLeaderboardData.reduce(
      (sum, row) => sum + (parseInt(row["No. of Skill Badges Completed"] || 0) || 0),
      0
    );
    const totalGames = validLeaderboardData.reduce(
      (sum, row) => sum + (parseInt(row["No. of Arcade Games Completed"] || 0) || 0),
      0
    );
    const completionRate = totalParticipants
      ? ((validLeaderboardData.filter(row => row["Total Completion"] === "Yes").length / totalParticipants) * 100).toFixed(1)
      : 0;

    const dailyStats = {
      date: eventData.uploadDate,
      participants: validLeaderboardData,
      stats: {
        totalParticipants,
        totalBadges,
        totalGames,
        completionRate,
      },
    };
    const existingEntryIndex = history.findIndex(entry => entry.date === today);
    if (existingEntryIndex !== -1) {
      history[existingEntryIndex] = dailyStats;
    } else {
      history.push(dailyStats);
    }

    eventData.history = history;
    eventData.modified = new Date();

    await updateDoc(eventRef, eventData);

    // Trigger email notifications if sendMail is true
    if (sendMail) {
      await sendEmailToParticipants(validLeaderboardData, dailyStats, eventData.title || "The Event",eventData.id);
    }
  } catch (error) {
    console.error("Error updating Firestore:", error);
    throw new Error("Failed to update the event. Please try again.");
  }
};

export const handleDeleteEvent = async (id) => {
  const eventRef = doc(db, "events", id);
  await deleteDoc(eventRef);
};

export const handleEndEvent = async (id) => {
  const eventRef = doc(db, "events", id);
  await updateDoc(eventRef, { status: "past" });
};

//function for sending email to participants
export const sendEmailToParticipants = async (participants, dailyStats, eventName,eventId) => {
  try {
    const response = await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ participants, dailyStats, eventName, eventId }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to send emails");
    }

    console.log("Emails sent successfully:", data.message);
    return { success: true };
  } catch (error) {
    console.error("Error in sendEmailToParticipants:", error.message);
    return { success: false, error: error.message };
  }
};


export async function getEventDetails(eventId) {
  console.log("Getting event details")
  try {
    const eventDoc = doc(db, "events", eventId)
    const docSnap = await getDoc(eventDoc)

    if (docSnap.exists()) {
      return { id: eventId, ...docSnap.data() }
    } else {
      console.error("No such document!")
      return null
    }
  } catch (error) {
    console.error("Error fetching event details:", error)
    return null
  }
}

