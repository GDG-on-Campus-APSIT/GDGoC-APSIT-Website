import React from 'react'
import { CalendarDays, Award } from 'lucide-react'

const Certificate = ({
  recipientName,
  courseName,
  date,
  signatureName,
}) => {
  return (
    (<div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg">
        <div className="p-8 border-[16px] border-double border-gray-200 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0 bg-repeat"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")" }}></div>
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

            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="w-64 mx-auto text-center">
                <div className="border-b border-gray-400"></div>
                <p className="text-gray-600 mt-2">{signatureName}</p>
                <p className="text-sm text-gray-500">Course Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
  );
}

export default Certificate

