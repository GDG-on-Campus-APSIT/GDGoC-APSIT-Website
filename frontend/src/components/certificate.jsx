'use client';

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';

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
      html2canvas(certificateRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'certificate.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div 
        ref={certificateRef} 
        className="w-full max-w-5xl bg-white rounded-2xl shadow-lg relative overflow-hidden"
      >
        {/* Colored Corners */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-red-400 -translate-x-24 -translate-y-24 rotate-45" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-green-400 translate-x-24 -translate-y-24 rotate-45" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 -translate-x-24 translate-y-24 rotate-45" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-400 translate-x-24 translate-y-24 rotate-45" />

        {/* Certificate Content */}
        <div className="relative m-8 p-8 border-2 rounded-xl border-gray-200">
          {/* Logo */}
          <div className="text-center mb-12">
            <img src={groupLogo} alt="Google Developer Groups" className="h-16 mx-auto" />
          </div>

          {/* Title */}
          <h1 className="text-5xl font-black text-center tracking-wider mb-8">
            CERTIFICATE OF COMPLETION
          </h1>

          <h2 className="text-xl text-center text-gray-600 mb-6">
            THIS CERTIFICATE IS PROUDLY PRESENTED TO
          </h2>

          {/* Recipient Name */}
          <h3 className="text-4xl text-center font-script text-amber-500 mb-8">
            {recipientName}
          </h3>

          {/* Description */}
          <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            {description}
          </p>

          {/* Signatures Section */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            {/* Mentor Signature */}
            <div className="text-center">
              <img src={mentorSignature} alt="Mentor Signature" className="h-12 mx-auto mb-2" />
              <div className="w-48 h-px bg-gray-300 mx-auto mb-2" />
              <p className="font-bold">{mentorName}</p>
              <p className="text-sm text-gray-600">{mentorTitle}</p>
            </div>

            {/* Organizer Signature */}
            <div className="text-center">
              <img src={organizerSignature} alt="Organizer Signature" className="h-12 mx-auto mb-2" />
              <div className="w-48 h-px bg-gray-300 mx-auto mb-2" />
              <p className="font-bold">{organizerName}</p>
              <p className="text-sm text-gray-600">{organizerTitle}</p>
            </div>

            {/* Faculty Signature */}
            <div className="text-center">
              <img src={facultySignature} alt="Faculty Signature" className="h-12 mx-auto mb-2" />
              <div className="w-48 h-px bg-gray-300 mx-auto mb-2" />
              <p className="font-bold">{facultyName}</p>
              <p className="text-sm text-gray-600">{facultyTitle}</p>
            </div>

          </div>

          {/* QR Code and Date */}
          <div className="text-center">
            <QRCodeSVG
              value={verificationUrl}
              size={100}
              className="mx-auto mb-2"
            />
            <p className="text-sm text-gray-500">SCAN TO VERIFY</p>
            <p className="text-sm text-gray-500 mt-2">ISSUE DATE: {date}</p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadCertificate}
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;

