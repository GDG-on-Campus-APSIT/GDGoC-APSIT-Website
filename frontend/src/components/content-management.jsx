'use client';;
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react';

// Mock data
const resources = [
  { id: 1, title: "Introduction to Web Development", type: "Article", category: "Web Dev", status: "Published" },
  { id: 2, title: "Machine Learning Fundamentals", type: "Video", category: "AI & ML", status: "Under Review" },
  { id: 3, title: "Building RESTful APIs", type: "Tutorial", category: "Backend", status: "Draft" },
]

const blogs = [
  { id: 1, title: "The Future of AI", author: "John Doe", category: "AI & ML", status: "Published" },
  { id: 2, title: "Web Development Trends 2024", author: "Jane Smith", category: "Web Dev", status: "Under Review" },
  { id: 3, title: "Cybersecurity Best Practices", author: "Alice Johnson", category: "Security", status: "Draft" },
]

const projects = [
  { id: 1, title: "AI Chatbot", author: "Team Alpha", category: "AI & ML", status: "Under Review" },
  { id: 2, title: "E-commerce Platform", author: "Team Beta", category: "Web Dev", status: "Approved" },
  { id: 3, title: "Mobile Game", author: "Team Gamma", category: "Mobile Dev", status: "Rejected" },
]

export function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    (<div className="min-h-screen bg-gray-50">
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Content Management</h1>
          <p className="text-xl mb-8">Manage resources, blogs, and project submissions</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Manage Resources</CardTitle>
                <CardDescription>Add, edit, or remove learning resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm" />
                  <Button>Add New Resource</Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>{resource.title}</TableCell>
                        <TableCell>{resource.type}</TableCell>
                        <TableCell>{resource.category}</TableCell>
                        <TableCell>
                          <Badge variant={resource.status === "Published" ? "default" : "secondary"}>
                            {resource.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost"><Edit className="h-4 w-4" /></Button>
                            <Button size="sm" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
                            <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blogs">
            <Card>
              <CardHeader>
                <CardTitle>Manage Blogs</CardTitle>
                <CardDescription>Review and manage blog posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <Input
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm" />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBlogs.map((blog) => (
                      <TableRow key={blog.id}>
                        <TableCell>{blog.title}</TableCell>
                        <TableCell>{blog.author}</TableCell>
                        <TableCell>{blog.category}</TableCell>
                        <TableCell>
                          <Badge variant={blog.status === "Published" ? "default" : "secondary"}>
                            {blog.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost"><Edit className="h-4 w-4" /></Button>
                            <Button size="sm" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
                            <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                            {blog.status === "Under Review" && (
                              <>
                                <Button size="sm" variant="ghost"><CheckCircle className="h-4 w-4" /></Button>
                                <Button size="sm" variant="ghost"><XCircle className="h-4 w-4" /></Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Manage Projects</CardTitle>
                <CardDescription>Review and manage project submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm" />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>{project.title}</TableCell>
                        <TableCell>{project.author}</TableCell>
                        <TableCell>{project.category}</TableCell>
                        <TableCell>
                          <Badge
                            variant={project.status === "Approved" ? "default" : project.status === "Rejected" ? "destructive" : "secondary"}>
                            {project.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                            {project.status === "Under Review" && (
                              <>
                                <Button size="sm" variant="ghost"><CheckCircle className="h-4 w-4" /></Button>
                                <Button size="sm" variant="ghost"><XCircle className="h-4 w-4" /></Button>
                              </>
                            )}
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
    </div>)
  );
}