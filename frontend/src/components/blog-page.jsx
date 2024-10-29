'use client';
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input"
import { Calendar, User, Clock } from 'lucide-react';

const blogPosts = [
  { 
    title: "Introduction to Machine Learning", 
    excerpt: "Learn the basics of machine learning and its applications in today's tech world.", 
    author: "Jane Doe", 
    date: "2024-03-15", 
    category: "AI & ML",
    readTime: "5 min read",
    image: "/placeholder.svg" 
  },
  { 
    title: "Web Development Best Practices", 
    excerpt: "Discover the latest best practices in web development to create efficient and scalable applications.", 
    author: "John Smith", 
    date: "2024-03-10", 
    category: "Web Dev",
    readTime: "7 min read",
    image: "/placeholder.svg" 
  },
  { 
    title: "The Future of Cloud Computing", 
    excerpt: "Explore the emerging trends in cloud computing and how they're shaping the tech industry.", 
    author: "Alice Johnson", 
    date: "2024-03-05", 
    category: "Cloud",
    readTime: "6 min read",
    image: "/placeholder.svg" 
  },
]

const categories = ["All", "AI & ML", "Web Dev", "Cloud", "Mobile Dev", "Cybersecurity"]

export function BlogPageComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || post.category === selectedCategory))

  return (
    (<div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">GDGoC APSIT Blog</h1>
          <p className="text-xl mb-8">Stay updated with the latest in tech and our community</p>
        </div>
      </section>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Latest Blog Posts</CardTitle>
            <CardDescription>Explore our articles on various tech topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Input
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:w-1/2" />
              <Tabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="md:w-1/2">
                <TabsList className="grid grid-cols-3 md:grid-cols-6">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover" />
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`}>Read More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Call to Action */}
      <section className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Contribute?</h2>
          <p className="text-xl mb-8">Share your knowledge and experiences with our community!</p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/get-involved">Write a Blog Post</Link>
          </Button>
        </div>
      </section>
    </div>)
  );
}