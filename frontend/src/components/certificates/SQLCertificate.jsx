"use client"

import { useRef } from "react"
import { QRCodeCanvas } from "qrcode.react"
import html2canvas from "html2canvas"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const SQLCertificate = ({ recipientName, type, date, verificationUrl, eventName = "SQL Mastery Bootcamp" }) => {
  const certificateRef = useRef(null)

  const downloadCertificate = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
      }).then((canvas) => {
        const link = document.createElement("a")
        const fileName = `GDGoC-APSIT-SQL-Mastery-Bootcamp-${recipientName}-certificate.png`
        link.download = fileName
        link.href = canvas.toDataURL("image/png")
        link.click()
        toast.success("Certificate downloaded successfully!")
      })
    }
  }

  const descriptions = {
    Attendance: "For successfully attending the SQL Mastery Bootcamp and engaging with the learning process.",
    Excellence:
      "For successfully completing the SQL Mastery Bootcamp with excellence, showcasing outstanding skills and dedication.",
    Speaker:
      "For delivering a valuable session as a speaker at the SQL Mastery Bootcamp, inspiring and educating participants.",
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-8">
      <Button onClick={downloadCertificate} className="mb-8 px-6 bg-blue-600 hover:bg-blue-700 transition-colors py-2 text-base font-googleSansBold" variant="default">
        Download Certificate
      </Button>

      <Card ref={certificateRef} className="w-full max-w-5xl bg-white relative overflow-hidden p-8 sm:p-12">
        {/* Colored Corners with original colors */}
        <div className="absolute top-0 left-0 w-[55vmin] h-[55vmin] lg:w-[35vmin] lg:h-[35vmin] bg-blue-500 -translate-x-[50%] -translate-y-[50%] rotate-45" />
        <div className="absolute top-0 right-0 w-[55vmin] h-[55vmin] lg:w-[35vmin] lg:h-[35vmin] bg-green-500 translate-x-[50%] -translate-y-[50%] rotate-45" />
        <div className="absolute bottom-0 left-0 w-[55vmin] h-[55vmin] lg:w-[35vmin] lg:h-[35vmin] bg-yellow-500 -translate-x-[50%] translate-y-[50%] rotate-45" />
        <div className="absolute bottom-0 right-0 w-[55vmin] h-[55vmin] lg:w-[35vmin] lg:h-[35vmin] bg-red-500 translate-x-[50%] translate-y-[50%] rotate-45" />

        <div className="relative border-2 rounded-xl border-gray-200 p-6 sm:p-8 space-y-8">
          {/* Header */}
          <div className="text-center">
            <img src="/GDG_logo_horizontal.png" alt="Google Developer Groups" className="h-16 sm:h-20 mx-auto" />
          </div>

          <div className="space-y-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-googleSansBold tracking-tight">
              CERTIFICATE OF {type.toUpperCase()}
            </h1>
            <h2 className="text-2xl sm:text-3xl text-blue-600 font-googleSansBold">{eventName}</h2>
          </div>

          {/* Recipient Details */}
          <div className="space-y-6 text-center max-w-2xl mx-auto">
            <p className="text-gray-600 font-googleSansRegular">THIS CERTIFICATE IS PROUDLY PRESENTED TO</p>
            <h3 className="text-3xl sm:text-4xl font-googleSansBold text-blue-600">{recipientName}</h3>
            <p className="text-lg text-gray-700 font-googleSansRegular">{descriptions[type]}</p>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-8 mt-12">
            {[
              { name: "Gourav Midya", role: "Dev & Db Head", sign: "/signs/gourav_sign.png" },
              { name: "Yash Agrawal", role: "Organizer", sign: "/signs/yash_sign.jpg" },
              { name: "Prof. Rushikesh Nikam", role: "Faculty Advisor", sign: "/signs/rushikesh_sir_sign.jpg" },
            ].map((person) => (
              <div key={person.name} className="text-center space-y-2">
                <img
                  src={person.sign || "/placeholder.svg"}
                  alt={`${person.name}'s Signature`}
                  className="h-16 mx-auto object-contain"
                />
                <div className="w-28 sm:w-36 md:w-44 lg:w-52 h-px bg-gray-300 mx-auto" />
                <p className="font-GoogleSansDisplay-Bold">{person.name}</p>
                <p className="text-sm text-gray-600 font-googleSansRegular">{person.role}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center space-y-4 mt-8">
            <QRCodeCanvas value={verificationUrl} size={120} className="mx-auto" level="H" />
            <div className="text-sm text-gray-500 space-y-1 font-googleSansRegular">
              <p>SCAN TO VERIFY</p>
              <p>ISSUE DATE: {date}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SQLCertificate

