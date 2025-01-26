'use client';

import { useEffect, useState } from 'react';
import Certificate from '@/components/certificate';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { NavbarComponent } from '@/components/navbar';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CongratulationsPopUp } from '@/components/congratulations-popup';

export default function CertificatePage({ params }) {
  const { certificateId } = params; // Extract the certificateId from the URL
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    // Function to check and set orientation
    const handleOrientationChange = () => {
      const isLandscapeMode = window.matchMedia('(orientation: landscape)').matches;
      setIsLandscape(isLandscapeMode);
      if (!isLandscapeMode) {
        toast.info('Please switch to landscape mode for the best viewing experience.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
      }
    };

    // Add event listener for orientation changes
    window.addEventListener('resize', handleOrientationChange);
    handleOrientationChange(); // Initial check

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        // Query the Firestore collection for a document where `certificateId` matches
        const certificatesRef = collection(db, 'certificates');
        const q = query(certificatesRef, where('certificateId', '==', certificateId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Get the first matching document
          const docData = querySnapshot.docs[0].data();
          setCertificateData(docData);
          toast.success('Certificate loaded successfully', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          setError('Certificate not found.');
        }
      } catch (err) {
        console.error('Error fetching certificate:', err);
        setError('Failed to load certificate.');
        toast.error("Failed to load certificate:", err, {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [certificateId]);

  if (loading) {
    return <p className="text-center mt-8">Loading certificate...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>;
  }

  const {
    name: recipientName,
    eventId,
    email,
  } = certificateData;

  const verificationUrl = `https://gdgoc-apsit.vercel.app//verify/${certificateId}`;
  const description = `In recognition of his/her hard work and dedication shown in obtaining all the 15 skill badges and finishing 1 arcade of Google Gen AI Study Jam 2024, held by GDG On Campus APSIT`;

  return (
    <>
      <CongratulationsPopUp />
      <NavbarComponent />
      {!isLandscape ? (
        <div className="flex justify-center items-center h-screen text-center">
          <p className="text-lg font-medium">
            Please rotate your device to landscape mode to view the certificate properly.
          </p>
        </div>
      ) : (
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
          organizerSignature="/signs/yash_sign.jpg"
          facultySignature="/signs/rushikesh_sir_sign.jpg"
          mentorSignature="/signs/jishan_sign.png"
          verificationUrl={verificationUrl}
          description={description}
        />
      )}
    </>
  );
}
