"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Mail, Loader2 } from "lucide-react"
import { useAuthContext } from "@/context/AuthContext"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Skeleton } from "@/components/ui/skeleton"
import { AnimatedLoadingText } from "@/components/animated-loading-text"

export function ProfilePageComponent() {
  const { user } = useAuthContext()
  const [certificates, setCertificates] = useState([])
  const [loadingCertificates, setLoadingCertificates] = useState(true)

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!user?.email) return

      try {
        const certificatesRef = collection(db, "certificates")
        const q = query(certificatesRef, where("email", "==", user.email))
        const querySnapshot = await getDocs(q)

        const fetchedCertificates = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setCertificates(fetchedCertificates)
      } catch (error) {
        console.error("Error fetching certificates:", error)
        toast.error("Failed to load certificates. Please try again later.", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      } finally {
        setLoadingCertificates(false)
      }
    }

    fetchCertificates()
  }, [user])

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        <AnimatedLoadingText text="Loading your Amazing Achievements" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user.photoURL} alt={user.displayName} />
              <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{user.displayName}</h1>
              <p className="text-xl mb-4">Student Member</p>
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="text-sm">
                  <Mail className="w-4 h-4 mr-1" />
                  {user.email}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>My Certificates</CardTitle>
            <CardDescription>View all certificates issued to your email address.</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingCertificates ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
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
                      <TableCell>{certificate.eventName || "N/A"}</TableCell>
                      <TableCell>{certificate.certificateId}</TableCell>
                      <TableCell>{certificate.issueDate || "N/A"}</TableCell>
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
      </div>
    </div>
  )
}

