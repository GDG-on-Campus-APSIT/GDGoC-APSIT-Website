"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import { NavbarComponent } from "@/components/navbar"
import { Shield, Loader2, Smartphone } from "lucide-react"
import { toast, Bounce } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Certificate from "@/components/certificate"
import SQLCertificate from "@/components/certificates/SQLCertificate"

export default function CertificatePage({ params }) {
  const { certificateId } = params
  const [certificateData, setCertificateData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isLandscape, setIsLandscape] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const certificatesRef = collection(db, "certificates")
        const q = query(certificatesRef, where("certificateId", "==", certificateId))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data()
          setCertificateData(docData)
          toast.success("Certificate loaded successfully", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          })
        } else {
          setError("Unable to find a certificate. Please check the ID.")
        }
      } catch (err) {
        console.error("Error fetching certificate:", err)
        setError("Failed to load certificate.")
        toast.error("Failed to load certificate:", err, {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCertificate()
  }, [certificateId])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">Loading Certificate...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <>
        <NavbarComponent />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white p-8">
          <Shield className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">Generation Failed</h2>
          <p className="text-gray-600 text-center max-w-md">{error}</p>
        </div>
      </>
    )
  }

  const { name: recipientName, eventId, email, issueDate, type } = certificateData
  const verificationUrl = `https://gdgoc-apsit.vercel.app/verify/${certificateId}`

  const renderCertificate = () => {
    if (eventId === "4hJkqz3lGlI5IEotiZyk") {
      return (
        <SQLCertificate
          recipientName={recipientName}
          type={type}
          date={new Date(issueDate).toLocaleDateString()}
          verificationUrl={verificationUrl}
        />
      )
    } else {
      // Assuming this is for Study Jam
      return (
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
      )
    }
  }

  return (
    <>
      <NavbarComponent />
      {!isLandscape ? (
        <div className="flex flex-col justify-center items-center h-screen text-center p-4">
          <div className="animate-rotate-device mb-6">
            <Smartphone className="w-16 h-16 text-blue-500" />
          </div>
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md shadow-md max-w-md">
            <p className="text-lg font-medium">
              Please rotate your device to landscape mode to view the certificate properly.
            </p>
          </div>
        </div>
      ) : (
        renderCertificate()
      )}
    </>
  )
}

