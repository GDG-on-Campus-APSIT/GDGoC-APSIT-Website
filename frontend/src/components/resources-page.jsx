'use client';
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Book, Code, Video, Github, ExternalLink } from 'lucide-react'

const learningResources = [
  { title: "Introduction to Web Development", type: "Article", link: "#", icon: Book },
  { title: "Machine Learning Fundamentals", type: "Video", link: "#", icon: Video },
  { title: "Building RESTful APIs", type: "Tutorial", link: "#", icon: Code },
  { title: "Mobile App Development with React Native", type: "Course", link: "#", icon: Video },
  { title: "Data Structures and Algorithms", type: "Article", link: "#", icon: Book },
  { title: "Cloud Computing Essentials", type: "Tutorial", link: "#", icon: Code },
]

const projectShowcase = [
  { title: "AI-powered Chatbot", description: "A chatbot built with natural language processing capabilities.", image: "/placeholder.svg", github: "#", demo: "#" },
  { title: "Smart Home IoT System", description: "An IoT system for controlling home appliances using voice commands.", image: "/placeholder.svg", github: "#", demo: "#" },
  { title: "Blockchain-based Voting App", description: "A secure and transparent voting application using blockchain technology.", image: "/placeholder.svg", github: "#", demo: "#" },
]

const faqItems = [
  { question: "How can I join GDGoC APSIT?", answer: "To join GDGoC APSIT, you need to fill out an application form on our website and attend an orientation session. After that, you'll be invited to participate in our activities and events." },
  { question: "What kind of events does GDGoC APSIT organize?", answer: "We organize a variety of events including workshops, hackathons, tech talks, coding competitions, and networking sessions with industry professionals." },
  { question: "Do I need to have prior coding experience to join?", answer: "While some coding experience is helpful, it's not mandatory. We welcome students with all levels of experience who are passionate about technology and willing to learn." },
  { question: "How can I contribute to GDGoC APSIT projects?", answer: "You can contribute by participating in our project teams, sharing your ideas during brainstorming sessions, or leading a project of your own. We encourage all members to actively participate and contribute." },
  { question: "Are there any membership fees?", answer: "GDGoC APSIT membership is free for all APSIT students. However, some events or workshops may have a nominal fee to cover expenses." },
]

export function ResourcesPageComponent() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredResources = learningResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    (<div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">GDGoC APSIT Resources</h1>
          <p className="text-xl mb-8">Empower your learning journey with our curated resources</p>
        </div>
      </section>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="learning" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="learning">Learning Resources</TabsTrigger>
            <TabsTrigger value="projects">Project Showcase</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Learning Resources */}
          <TabsContent value="learning">
            <Card>
              <CardHeader>
                <CardTitle>Learning Resources</CardTitle>
                <CardDescription>Explore our curated collection of tutorials, articles, and courses</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-6" />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredResources.map((resource, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center gap-4">
                        <resource.icon className="h-8 w-8 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                          <CardDescription>{resource.type}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={resource.link}>Access Resource</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Project Showcase */}
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Project Showcase</CardTitle>
                <CardDescription>Discover amazing projects built by our community members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {projectShowcase.map((project, index) => (
                    <Card key={index} className="overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover" />
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{project.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button asChild variant="outline" size="sm">
                          <Link href={project.github}><Github className="mr-2 h-4 w-4" /> GitHub</Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link href={project.demo}><ExternalLink className="mr-2 h-4 w-4" /> Live Demo</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions about GDGoC APSIT</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Built something awesome?</h2>
          <p className="text-xl mb-8">Share your amazing work with the GDGoC APSIT community!</p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/resources/project/submit">Submit Your Project</Link>
          </Button>
        </div>
      </section>
    </div>)
  );
}