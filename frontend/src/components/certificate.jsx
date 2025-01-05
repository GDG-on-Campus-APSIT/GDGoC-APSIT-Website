'use client';
import React, { useRef } from 'react';
import { CalendarDays, Award } from 'lucide-react';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';

const Certificate = ({
  recipientName,
  courseName,
  date,
  signatureName,
  groupLogo,
  instructorSignature,
  verificationUrl,
}) => {
  const certificateRef = useRef();

  const downloadCertificate = () => {
    html2canvas(certificateRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'certificate.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div ref={certificateRef} className="w-full max-w-4xl bg-white shadow-lg">
        <div className="p-8 border-[16px] border-double border-gray-200 relative">
          {/* Logo */}
          <div className="text-center mb-8">
            {groupLogo && <img src={groupLogo} alt="Group Logo" className="mx-auto h-16" />}
          </div>

          {/* Certificate Content */}
          <div className="relative">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Certificate of Completion</h1>

            <div className="text-center mb-8">
              <p className="text-xl text-gray-600">This is to certify that</p>
              <h2 className="text-3xl font-bold text-gray-800 my-4">{recipientName}</h2>
              <p className="text-xl text-gray-600">has successfully completed the course</p>
              <h3 className="text-2xl font-semibold text-gray-800 my-4">{courseName}</h3>
            </div>

            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <CalendarDays className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{date}</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-gray-600">With Honors</span>
              </div>
            </div>

            {/* Signature and QR Code Row */}
            <div className="mt-8 flex justify-between items-center">
              {/* Centered Signature */}
              <div className="flex-1 text-center">
                {instructorSignature && (
                  <img
                    src={instructorSignature}
                    alt="Instructor Signature"
                    className="h-12 mx-auto"
                  />
                )}
                <div className="border-b border-gray-400 mt-2 w-3/4 mx-auto"></div>
                <p className="text-gray-600 mt-2">{signatureName}</p>
                <p className="text-sm text-gray-500">Course Instructor</p>
              </div>

              {/* QR Code */}
              <div className="text-right">
                {verificationUrl && (
                  <>
                    <p className="text-sm text-gray-500 mb-2">Scan to verify:</p>
                    <QRCodeSVG
                      value={verificationUrl}
                      size={128}
                      bgColor="#ffffff"
                      fgColor="#000000"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-4 text-center">
        <button
          onClick={downloadCertificate}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default Certificate;
