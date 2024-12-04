'use client'


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"



const leaderboard = [
  { rank: 1, name: "Aarav Patel", points: 1250, badges: 8 },
  { rank: 2, name: "Zara Khan", points: 1150, badges: 7 },
  { rank: 3, name: "Rohan Sharma", points: 1050, badges: 6 },
  { rank: 4, name: "Priya Desai", points: 950, badges: 5 },
  { rank: 5, name: "Arjun Mehta", points: 850, badges: 4 },
  { rank: 6, name: "Shreya Gupta", points: 750, badges: 3 },
  { rank: 7, name: "Vikram Singh", points: 650, badges: 2 },
  { rank: 8, name: "Ananya Sharma", points: 550, badges: 1 },
  { rank: 9, name: "Rahul Kumar", points: 450, badges: 1 },
  { rank: 10, name: "Mira Patel", points: 350, badges: 1 },
]

export default function LeaderboardRecognition() {
  return (
    <TabsContent value="leaderboard">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">GDGoC APSIT Leaderboard</CardTitle>
          <CardDescription>Top performers in our community</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Top 3 Highlights */}
          <div className="flex justify-center items-center gap-2 mb-8">
            {/* Second Ranker on Left */}
            <div className="bg-gradient-to-b from-amber-500 to-amber-700 text-white shadow-md rounded-lg p-6 flex flex-col items-center w-[18%]">
              <div className="text-2xl font-bold mb-4">{leaderboard[1].rank}</div>
              <div className="text-base font-medium">{leaderboard[1].name}</div>
              <div className="text-xs">{leaderboard[1].badges} badges</div>
              <Button variant="secondary" size="lg" className="mt-4">
                View
              </Button>
            </div>

            {/* First Ranker in the Middle */}
            <div className="bg-gradient-to-b from-yellow-300 to-yellow-500 text-white shadow-lg rounded-lg p-8 flex flex-col items-center w-[24%]">
              <div className="text-6xl font-bold mb-6">{leaderboard[0].rank}</div>
              <div className="text-2xl font-medium mb-2">{leaderboard[0].name}</div>
              <div className="text-lg">{leaderboard[0].badges} badges</div>
              <Button variant="secondary" size="lg" className="mt-4">
                View
              </Button>
            </div>

            {/* Third Ranker on Right */}
            <div className="bg-gradient-to-b from-gray-300 to-gray-500 text-white shadow-md rounded-lg p-4 flex flex-col items-center w-[18%]">
              <div className="text-2xl font-bold mb-2">{leaderboard[2].rank}</div>
              <div className="text-base font-medium">{leaderboard[2].name}</div>
              <div className="text-xs">{leaderboard[2].badges} badges</div>
              <Button variant="secondary" size="lg" className="mt-4">
                View
              </Button>
            </div>
          </div>

          {/* Detailed Leaderboard Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left font-semibold">Rank</th>
                  <th className="p-3 text-left font-semibold">Name</th>
                  <th className="p-3 text-left font-semibold">Points</th>
                  <th className="p-3 text-right font-semibold">Badges</th>
                  <th className="p-3 text-center font-semibold">Profile</th> {/* New column */}
                </tr>
              </thead>
              <tbody>
                {leaderboard.slice(3).map((member, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-medium">{member.rank}</td>
                    <td className="p-3">{member.name}</td>
                    <td className="p-3">{member.points}</td>
                    <td className="p-3 text-right">{member.badges}</td>
                    <td className="p-3 text-center">
                      <Button
                        variant="secondary"
                        size="lg"
                        className="mt-4 gradient-btn"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
