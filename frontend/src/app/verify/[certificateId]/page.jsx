'use client';

import { useEffect, useState } from 'react';
import Certificate from '@/components/certificate';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { NavbarComponent } from '@/components/navbar';
import { ExampleComponentDemo } from '@/components/demo';

export default function VerifyPage({ params }) {
  const { certificateId } = params; // Extract certificateId from the URL
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        // Query Firestore for the document with the matching certificateId
        const certificatesRef = collection(db, 'certificates');
        const q = query(certificatesRef, where('certificateId', '==', certificateId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Get the first matching document
          const docData = querySnapshot.docs[0].data();
          setCertificateData(docData);
        } else {
          setError('Certificate not found. Please verify the certificate ID.');
        }
      } catch (err) {
        console.error('Error fetching certificate:', err);
        setError('An error occurred while verifying the certificate.');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [certificateId]);

  if (loading) {
    return <p className="text-center mt-8">Verifying certificate...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>;
  }

  const {
    name: recipientName,
    eventId,
    email,
  } = certificateData;

  const verificationUrl = `https://gdgoc-apsit.vercel.app/verify/${certificateId}`;
  const description = `In recognition of his/her hardwork and dedication shown in obtaining all the 15 skill badges and finishing 1 arcade of Google Gen AI Study Jam 2024, held by GDG On Campus APSIT`;

  return (
    <>
    <NavbarComponent />
    <ExampleComponentDemo />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Certificate Verification: Below Certificate is a valid certificate issued by GDGoC APSIT</h1>
      <Certificate
        recipientName={recipientName}
        courseName={`Event: ${eventId}`}
        date={new Date().toLocaleDateString()}
        organizerName="Yash Agrawal"
        organizerTitle="Organizer of GDGoC APSIT"
        facultyName="Prof. Rushikesh Nikam"
        facultyTitle="Faculty Head of GDGoC APSIT"
        mentorName="Jishanahmed Shaikh"
        mentorTitle="Cloud Head of GDGoC APSIT"
        groupLogo="/GDG_logo_horizontal.png"
        organizerSignature="/yash_sign.png"
        facultySignature="/sir_sign.png"
        mentorSignature="/jishan_sign.png"
        verificationUrl={verificationUrl}
        description={description}
      />
    </div>
    </>
  );
}
