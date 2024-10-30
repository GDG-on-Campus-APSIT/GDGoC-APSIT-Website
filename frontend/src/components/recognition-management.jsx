'use client';;
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Trash2, PlusCircle, Award } from 'lucide-react'

// Mock data for achievements and hall of fame
const achievements = [
  { id: 1, name: "Code Ninja", description: "Completed 10 coding challenges", points: 100 },
  { id: 2, name: "Event Enthusiast", description: "Attended 5 GDGoC events", points: 50 },
  { id: 3, name: "Project Master", description: "Led a successful project", points: 200 },
]

const hallOfFame = [
  { id: 1, name: "Vikram Malhotra", achievement: "Google Summer of Code Mentor", year: 2023 },
  { id: 2, name: "Neha Gupta", achievement: "Best Final Year Project", year: 2022 },
  { id: 3, name: "Rahul Kapoor", achievement: "Hackathon Champion", year: 2021 },
]

export function RecognitionManagement() {
  const [activeTab, setActiveTab] = useState("achievements")
  const [editingItem, setEditingItem] = useState(null)

  const handleEdit = (item) => {
    setEditingItem(item)
  }

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log(`Deleting item with id: ${id}`)
  }

  return (
    (<div className="min-h-screen bg-gray-50">
      <section className="bg-yellow-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Recognition Program Management</h1>
          <p className="text-xl mb-8">Manage achievements and hall of fame entries</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="hall-of-fame">Hall of Fame</TabsTrigger>
          </TabsList>
          
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Manage Achievements</CardTitle>
                <CardDescription>Create, edit, or delete achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Achievement
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {achievements.map((achievement) => (
                      <TableRow key={achievement.id}>
                        <TableCell>{achievement.name}</TableCell>
                        <TableCell>{achievement.description}</TableCell>
                        <TableCell>{achievement.points}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => handleEdit(achievement)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDelete(achievement.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="hall-of-fame">
            <Card>
              <CardHeader>
                <CardTitle>Manage Hall of Fame</CardTitle>
                <CardDescription>Add or remove hall of fame entries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button>
                    <Award className="mr-2 h-4 w-4" />
                    Add New Entry
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Achievement</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hallOfFame.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.name}</TableCell>
                        <TableCell>{entry.achievement}</TableCell>
                        <TableCell>{entry.year}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => handleEdit(entry)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDelete(entry.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {editingItem && (
        <Dialog open={true} onOpenChange={() => setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {activeTab === "achievements" ? "Achievement" : "Hall of Fame Entry"}</DialogTitle>
              <DialogDescription>Make changes here.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={editingItem.name} />
              </div>
              {activeTab === "achievements" ? (
                <>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" defaultValue={editingItem.description} />
                  </div>
                  <div>
                    <Label htmlFor="points">Points</Label>
                    <Input id="points" type="number" defaultValue={editingItem.points} />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="achievement">Achievement</Label>
                    <Input id="achievement" defaultValue={editingItem.achievement} />
                  </div>
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" type="number" defaultValue={editingItem.year} />
                  </div>
                </>
              )}
            </form>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>)
  );

}