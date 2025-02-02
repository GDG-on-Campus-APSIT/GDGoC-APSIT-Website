"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import { NavbarComponent } from "@/components/navbar"
import { Shield, ShieldCheck, Loader2, Smartphone } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import Certificate from "@/components/certificate"
import SQLCertificate from "@/components/certificates/SQLCertificate"

export default function VerifyPage({ params }) {
  const { certificateId } = params
  const [certificateData, setCertificateData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { toast } = useToast()
  const [isLandscape, setIsLandscape] = useState(true)

  useEffect(() => {
    const handleOrientationChange = () => {
      const isLandscapeMode = window.matchMedia("(orientation: landscape)").matches
      setIsLandscape(isLandscapeMode)
      if (!isLandscapeMode) {
        toast({
          title: "Rotate Device",
          description: "Please switch to landscape mode to view the certificate.",
          duration: 3000,
        })
      }
    }

    window.addEventListener("resize", handleOrientationChange)
    handleOrientationChange()

    return () => {
      window.removeEventListener("resize", handleOrientationChange)
    }
  }, [toast])

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const certificatesRef = collection(db, "certificates")
        const q = query(certificatesRef, where("certificateId", "==", certificateId))
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data()
          setCertificateData(docData)
          toast({
            title: "Certificate Verified",
            description: "This is a valid certificate issued by GDGoC APSIT",
            variant: "success",
          })
        } else {
          setError("Certificate not found. Please verify the certificate ID.")
          toast({
            title: "Verification Failed",
            description: "Unable to verify this certificate. Please check the ID.",
            variant: "destructive",
          })
        }
      } catch (err) {
        console.error("Error fetching certificate:", err)
        setError("An error occurred while verifying the certificate.")
        toast({
          title: "Error",
          description: "An error occurred during verification.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchCertificate()
  }, [certificateId, toast])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">Verifying Certificate...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <>
        <NavbarComponent />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white p-8">
          <Shield className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">Verification Failed</h2>
          <p className="text-gray-600 text-center max-w-md">{error}</p>
        </div>
      </>
    )
  }

  const { name: recipientName, eventId, eventName, email, issueDate, type } = certificateData
  const verificationUrl = `https://gdgoc-apsit.vercel.app/verify/${certificateId}`

  return (
    <>
      <NavbarComponent />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="inline-block bg-green-100 rounded-full p-4 mb-4"
            >
              <ShieldCheck className="w-12 h-12 text-green-600" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Certificate Successfully Verified</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              This certificate has been verified as authentic and was issued by GDGoC APSIT
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-xl p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Recipient Name</h3>
                <p className="text-lg font-semibold text-gray-900">{recipientName}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Event</h3>
                <p className="text-lg font-semibold text-gray-900">{eventName}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Certificate ID</h3>
                <p className="text-lg font-semibold text-gray-900">{certificateId}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Issue Date</h3>
                <p className="text-lg font-semibold text-gray-900">{new Date(issueDate).toLocaleDateString()}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Recipient Email</h3>
                <p className="text-lg font-semibold text-gray-900">{email}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Certificate Type</h3>
                <p className="text-lg font-semibold text-gray-900">
                  {eventId === "4hJkqz3lGlI5IEotiZyk"
                    ? `SQL Mastery Bootcamp - ${type}`
                    : "Google Gen AI Study Jam 2024"}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Verification URL</h3>
              <p className="text-lg font-semibold text-blue-600 break-all">
                <a href={verificationUrl} target="_blank" rel="noopener noreferrer">
                  {verificationUrl}
                </a>
              </p>
            </div>
          </motion.div>
          {isLandscape ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              {eventId === "4hJkqz3lGlI5IEotiZyk" ? (
                <SQLCertificate
                  recipientName={recipientName}
                  type={type}
                  date={new Date(issueDate).toLocaleDateString()}
                  verificationUrl={verificationUrl}
                />
              ) : (
                <Certificate
                  recipientName={recipientName}
                  courseName={`Event: ${eventId}`}
                  date={new Date(issueDate).toLocaleDateString()}
                  organizerName="Yash Agrawal"
                  organizerTitle="Organizer"
                  facultyName="Prof. Rushikesh Nikam"
                  facultyTitle="Faculty Advisor"
                  mentorName="Jishanahmed Shaikh"
                  mentorTitle="Cloud Head"
                  groupLogo="/GDG_logo_horizontal.png"
                  organizerSignature="/signs/yash_sign.jpg"
                  facultySignature="/signs/rushikesh_sir_sign.jpg"
                  mentorSignature="/signs/jishan_sign.png"
                  verificationUrl={verificationUrl}
                  description="In recognition of his/her hard work and dedication shown in obtaining all the 15 skill badges and finishing 1 arcade of Google Gen AI Study Jam 2024, held by GDG On Campus APSIT"
                />
              )}
            </motion.div>
          ) : (
            <div className="flex flex-col justify-center items-center text-center p-4">
              <div className="animate-rotate-device mb-6">
                <Smartphone className="w-16 h-16 text-blue-500" />
              </div>
              <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md shadow-md max-w-md">
                <p className="text-lg font-medium">
                  Please rotate your device to landscape mode to view the certificate properly.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

