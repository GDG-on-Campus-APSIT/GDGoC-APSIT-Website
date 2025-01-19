'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Github, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react';
import { useAuthContext } from "@/context/AuthContext";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "@/lib/firebase";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast , Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

// Mock user data
const userData = {
  name: "Aarav Patel",
  role: "Student Member",
  avatar: "/placeholder.svg",
  email: "aarav.patel@example.com",
  phone: "+91 98765 43210",
  location: "Mumbai, India",
  github: "https://github.com/aaravpatel",
  linkedin: "https://linkedin.com/in/aaravpatel",
  bio: "Passionate about web development and machine learning. Always eager to learn and contribute to innovative projects.",
  memberSince: "2023-09-01",
  achievements: [
    { name: "Code Ninja", description: "Completed 10 coding challenges", progress: 80 },
    { name: "Event Enthusiast", description: "Attended 5 GDGoC events", progress: 100 },
  ],
};

export function ProfilePageComponent() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, signInWithGoogle, signOutUser } = useAuthContext();
  const [certificates, setCertificates] = useState([]);
  const [loadingCertificates, setLoadingCertificates] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!user?.email) return;

      try {
        const certificatesRef = collection(db, 'certificates');
        const q = query(certificatesRef, where('email', '==', user.email));
        const querySnapshot = await getDocs(q);

        const fetchedCertificates = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCertificates(fetchedCertificates);
      } catch (error) {
        console.error('Error fetching certificates:', error);
        toast.error("Failed to load certificates:", error, {position: "bottom-right",autoClose: 2000,hideProgressBar: false,
          closeOnClick: false, pauseOnHover: true,draggable: true,progress: undefined,theme: "light",});
      } finally {
        setLoadingCertificates(false);
      }
    };

    fetchCertificates();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user.photoURL || userData.avatar} alt={user.displayName || userData.name} />
              <AvatarFallback>{(user.displayName || userData.name)?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{user.displayName}</h1>
              <p className="text-xl mb-4">{userData.role}</p>
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="text-sm">
                  <Mail className="w-4 h-4 mr-1" />
                  {user.email}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <Phone className="w-4 h-4 mr-1" />
                  {userData.phone}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {userData.location}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>My Certificates</CardTitle>
                <CardDescription>View all certificates issued to your email address.</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingCertificates ? (
                  <p>Loading certificates...</p>
                ) : certificates.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event Name</TableHead>
                        <TableHead>Certificate ID</TableHead>
                        <TableHead>Date Issued</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {certificates.map((certificate) => (
                        <TableRow key={certificate.id}>
                          <TableCell>{certificate.eventName || 'N/A'}</TableCell>
                          <TableCell>{certificate.certificateId}</TableCell>
                          <TableCell>{certificate.issueDate || 'N/A'}</TableCell>
                          <TableCell>
                            <Button asChild size="sm" variant="outline">
                              <Link href={`/certificate/${certificate.certificateId}`}>View</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No certificates found.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
