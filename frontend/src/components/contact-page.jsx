'use client';
import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function ContactPageComponent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
    // Reset form after submission
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    (<div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact GDGoC APSIT</h1>
          <p className="text-xl mb-8">Get in touch with us for any inquiries or support</p>
        </div>
      </section>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required />
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Find us on social media or reach out directly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <span>contact@gdgocapsit.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>APSIT Campus, Thane, Maharashtra</span>
              </div>
              <div className="flex gap-4 mt-6">
                <Link href="#" className="text-blue-600 hover:text-blue-800">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-blue-600 hover:text-blue-800">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-blue-600 hover:text-blue-800">
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-blue-600 hover:text-blue-800">
                  <Instagram className="h-6 w-6" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8">Stay connected and be part of our exciting tech journey!</p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/join">Become a Member</Link>
          </Button>
        </div>
      </section>
    </div>)
  );
}