'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Textarea } from  "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function BlogSubmission() {
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Submitting blog:', blogData)
    // Reset form or show success message
  }

  return (
    (<div className="min-h-screen bg-gray-50">
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Submit Your Blog Post</h1>
          <p className="text-xl mb-8">Share your knowledge and insights with the GDGoC APSIT community</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Blog Submission Form</CardTitle>
            <CardDescription>Fill out the details of your blog post below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Blog Title</Label>
                <Input
                  id="title"
                  value={blogData.title}
                  onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                  required />
              </div>
              <div>
                <Label htmlFor="content">Blog Content</Label>
                <Textarea
                  id="content"
                  value={blogData.content}
                  onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
                  required
                  className="min-h-[200px]" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={blogData.category}
                  onValueChange={(value) => setBlogData({ ...blogData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-dev">Web Development</SelectItem>
                    <SelectItem value="mobile-dev">Mobile Development</SelectItem>
                    <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                    <SelectItem value="cloud">Cloud Computing</SelectItem>
                    <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={blogData.tags}
                  onChange={(e) => setBlogData({ ...blogData, tags: e.target.value })}
                  placeholder="e.g., JavaScript, React, Web Development" />
              </div>
              <Button type="submit">Submit Blog Post</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>)
  );
}