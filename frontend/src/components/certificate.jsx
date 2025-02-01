"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Certificate = ({
  recipientName,
  courseName,
  date,
  organizerName,
  organizerTitle,
  facultyName,
  facultyTitle,
  mentorName,
  mentorTitle,
  groupLogo,
  organizerSignature,
  facultySignature,
  mentorSignature,
  verificationUrl,
  description,
}) => {
  const certificateRef = useRef(null);

  const downloadCertificate = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current, {
        backgroundColor: null,
        useCORS: true,
        scale: 2, // Increase scale for better quality on mobile
      }).then((canvas) => {
        const link = document.createElement("a");
        const fileName = `GDGoC-APSIT-GenAI-StudyJam-${recipientName}-certificate.png`;
        link.download = fileName;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
    toast.info("Downloading certificate...", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-2 sm:p-4">
        {/* Download Button */}
        <button
          onClick={downloadCertificate}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-googleSansBold flex items-center justify-center"
        >
          Download Certificate
        </button>

        <div
          ref={certificateRef}
          className="w-full bg-white rounded-xl shadow-lg relative overflow-hidden p-4 sm:p-8"
          style={{ backgroundColor: "white" }}
        >
          {/* Colored Corners */}
          <div className="absolute top-0 left-0 w-[55vmin] h-[55vmin] lg:w-[35vmin] lg:h-[35vmin] bg-red-500 -translate-x-[50%] -translate-y-[50%] rotate-45" />
          <div className="absolute top-0 right-0 w-[55vmin] h-[55vmin] lg:w-[35vmin] lg:h-[35vmin] bg-green-500 translate-x-[50%] -translate-y-[50%] rotate-45" />
          <div className="absolute bottom-0 left-0 w-[55vmin] h-[55vmin] lg:w-[35vmin] lg:h-[35vmin] bg-blue-500 -translate-x-[50%] translate-y-[50%] rotate-45" />
          <div className="absolute bottom-0 right-0 w-[55vmin] h-[55vmin] lg:w-[35vmin] lg:h-[35vmin] bg-yellow-500 translate-x-[50%] translate-y-[50%] rotate-45" />

          {/* Certificate Content */}
          <div className="relative m-2 sm:m-4 md:m-6 lg:m-8 p-2 sm:p-4 md:p-6 lg:p-8 border-2 rounded-xl border-gray-200">
            {/* Logo */}
            <div className="text-center mb-4 sm:mb-6">
              <img
                src={groupLogo || "/placeholder.svg"}
                alt="Google Developer Groups"
                className="h-8 sm:h-10 md:h-12 lg:h-16 mx-auto"
              />
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center tracking-wider mb-3 sm:mb-4 md:mb-6 font-googleSansBold">
              CERTIFICATE OF COMPLETION
            </h1>

            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-center text-gray-600 mb-2 sm:mb-3 md:mb-4 font-googleSansRegular">
              THIS CERTIFICATE IS PROUDLY PRESENTED TO
            </h2>

            {/* Recipient Name */}
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center text-amber-500 mb-3 sm:mb-4 md:mb-6 font-googleSansBold">
              {recipientName}
            </h3>

            {/* Description */}
            <p className="text-center text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto font-googleSansRegular">
              {description}
            </p>

            {/* Signatures Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-4 md:mb-6">
              {/* Mentor Signature */}
              <div className="text-center">
                <img
                  src={mentorSignature || "/placeholder.svg"}
                  alt="Mentor Signature"
                  className="h-8 sm:h-12 md:h-14 lg:h-16 mx-auto mb-1 sm:mb-2"
                />
                <div className="w-28 sm:w-36 md:w-44 lg:w-52 h-px bg-gray-300 mx-auto mb-1 sm:mb-2" />
                <p className="font-GoogleSansDisplay-Bold text-xs sm:text-sm md:text-base">{mentorName}</p>
                <p className="text-xs md:text-sm text-gray-600">{mentorTitle}</p>
              </div>

              {/* Organizer Signature */}
              <div className="text-center">
                <img
                  src={organizerSignature || "/placeholder.svg"}
                  alt="Organizer Signature"
                  className="h-8 sm:h-12 md:h-14 lg:h-16 mx-auto mb-1 sm:mb-2"
                />
                <div className="w-28 sm:w-36 md:w-44 lg:w-52 h-px bg-gray-300 mx-auto mb-1 sm:mb-2" />
                <p className="font-GoogleSansDisplay-Bold text-xs sm:text-sm md:text-base">{organizerName}</p>
                <p className="text-xs md:text-sm text-gray-600">{organizerTitle}</p>
              </div>

              {/* Faculty Signature */}
              <div className="text-center">
                <img
                  src={facultySignature || "/placeholder.svg"}
                  alt="Faculty Signature"
                  className="h-8 sm:h-12 md:h-14 lg:h-16 mx-auto mb-1 sm:mb-2"
                />
                <div className="w-28 sm:w-36 md:w-44 lg:w-52 h-px bg-gray-300 mx-auto mb-1 sm:mb-2" />
                <p className="font-GoogleSansDisplay-Bold text-xs sm:text-sm md:text-base ">{facultyName}</p>
                <p className="text-xs md:text-sm text-gray-600">{facultyTitle}</p>
              </div>
            </div>

            {/* QR Code and Date */}
            <div className="text-center">
              <QRCodeCanvas value={verificationUrl} size={100} className="mx-auto mb-1 sm:mb-2" />
              <p className="text-xs md:text-sm text-gray-500">SCAN TO VERIFY</p>
              <p className="text-xs md:text-sm text-gray-500 mt-1 sm:mt-2">ISSUE DATE: {date}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Certificate;