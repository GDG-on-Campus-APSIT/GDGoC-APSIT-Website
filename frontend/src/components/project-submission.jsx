'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ProjectSubmission() {
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    category: '',
    githubLink: '',
    demoLink: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Submitting project:', projectData)
    // Reset form or show success message
  }

  return (
    (<div className="min-h-screen bg-gray-50">
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Submit Your Project</h1>
          <p className="text-xl mb-8">Share your amazing work with the GDGoC APSIT community</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Project Submission Form</CardTitle>
            <CardDescription>Fill out the details of your project below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={projectData.title}
                  onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                  required />
              </div>
              <div>
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  value={projectData.description}
                  onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                  required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={projectData.category}
                  onValueChange={(value) => setProjectData({ ...projectData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-dev">Web Development</SelectItem>
                    <SelectItem value="mobile-dev">Mobile Development</SelectItem>
                    <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                    <SelectItem value="iot">Internet of Things</SelectItem>
                    <SelectItem value="blockchain">Blockchain</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="githubLink">GitHub Repository Link</Label>
                <Input
                  id="githubLink"
                  type="url"
                  value={projectData.githubLink}
                  onChange={(e) => setProjectData({ ...projectData, githubLink: e.target.value })}
                  required />
              </div>
              <div>
                <Label htmlFor="demoLink">Demo Link (if available)</Label>
                <Input
                  id="demoLink"
                  type="url"
                  value={projectData.demoLink}
                  onChange={(e) => setProjectData({ ...projectData, demoLink: e.target.value })} />
              </div>
              <Button type="submit">Submit Project</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>)
  );
}