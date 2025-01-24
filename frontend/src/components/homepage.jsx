'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, BookOpen, Award } from 'lucide-react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/lib/firebase';

export function HomepageComponent() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      try {
        const currentDate = new Date().toISOString(); // Get the current date
        const eventsRef = collection(db, "events"); // Firestore collection
        const eventsQuery = query(eventsRef, where("startDate", ">=", currentDate)); // Query for upcoming events
        const querySnapshot = await getDocs(eventsQuery);

        const events = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUpcomingEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to GDGoC APSIT</h1>
          <p className="text-xl mb-8">Empowering students through technology and innovation</p>
          <Button asChild>
            <Link href="https://gdg.community.dev/gdg-on-campus-ap-shah-institute-of-technology-thane-india/">Join GDGoC APSIT</Link>
          </Button>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            GDGoC APSIT aims to foster a vibrant community of developers on campus, providing opportunities for learning, collaboration, and growth in the field of technology.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>Date: {new Date(event.startDate).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link href="/events">View All Events</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Recent News */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Recent News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>New Partnership Announcement</CardTitle>
                <CardDescription>October 26, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p>We&apos;re excited to announce our new partnership with Flutter Roadshow, bringing more opportunities to our members!</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>StudyJam Milestone</CardTitle>
                <CardDescription>October 20, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p>With over 80+ Completions GDGoC-APSIT has managed to secure a position in Top 10 GDG across India!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Calendar className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Events</h3>
              <p>Workshops, tech talks, and networking opportunities</p>
            </div>
            <div className="text-center">
              <Users className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p>Connect with like-minded developers and industry professionals</p>
            </div>
            <div className="text-center">
              <BookOpen className="mx-auto h-12 w-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Resources</h3>
              <p>Access to learning materials, tutorials, and project showcases</p>
            </div>
            <div className="text-center">
              <Award className="mx-auto h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Recognition</h3>
              <p>Earn badges and certificates for your contributions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-xl mb-8">Become a part of our thriving tech community at APSIT</p>
          <Button asChild size="lg">
            <Link href="https://gdg.community.dev/gdg-on-campus-ap-shah-institute-of-technology-thane-india/">Join Us Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
