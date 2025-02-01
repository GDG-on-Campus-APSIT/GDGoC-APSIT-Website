'use client';

import { useState, useEffect } from 'react';

//import { Certificate } from './certificate'; // Adjust the import path
import { db } from '@/lib/firebase'; // Adjust the path based on your setup
import { collection, getDocs, doc, deleteDoc,query,where} from 'firebase/firestore';
import { toast } from 'react-toastify';

export function CertificateManagement(){
    const [certificates, setCertificates] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState("")

    async function fetchEvents() {
      const eventsRef = collection(db, "events")
      const snapshot = await getDocs(eventsRef)
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    }
  
     // Fetch certificates from Firebase
  async function fetchCertificatesFromFirebase(status,eventName) {
    
    const certificatesRef = collection(db, 'certificates');
    let q = certificatesRef;
   if(status){ q= query(q, where('status', '==', status));}
   if(eventName){q= query(q, where('eventName', '==', eventName))}
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

   // Rollback a certificate
async function deleteCertificate(id) {
  const confirmDelete = window.confirm('Are you sure you want to delete this certificate?');
  if (!confirmDelete) return;

  try {
    // Reference the document by ID
    const certRef = doc(db, 'certificates', id);

    // Delete the document from Firestore
    await deleteDoc(certRef);

    // Update local state by removing the deleted certificate
    setCertificates((prev) => prev.filter((cert) => cert.id !== id));

    toast.info('Certificate deleted successfully!',{position: "top-center", autoClose: 3000 });
  } catch (err) {
    console.error('Error deleting certificate:', err);
    toast.warn('Failed to delete the certificate.',{position: "top-center", autoClose: 3000});
  }
}

// Send certificate via email
async function sendCertificate(cert) {
  if (cert.sent) {
      toast.warn('Certificate has already been sent!', { position: "top-center", autoClose: 3000 });
      return;
  }

  try {
      // Send email logic (using Firebase Functions, SendGrid, or Nodemailer)
      await sendEmail(cert.email, cert);

      // Update Firestore document to mark it as sent
      const certRef = doc(db, 'certificates', cert.id);
      await updateDoc(certRef, { sent: true });

      toast.success('Certificate sent successfully!', { position: "top-center", autoClose: 3000 });

      // Update state to reflect change
      setCertificates((prev) =>
          prev.map((c) => (c.id === cert.id ? { ...c, sent: true } : c))
      );
  } catch (error) {
      console.error('Error sending certificate:', error);
      toast.error('Failed to send certificate.', { position: "top-center", autoClose: 3000 });
  }
}
// Resend certificate via email
async function resendCertificate(cert) {
  try {
      await sendEmail(cert.email, cert); // Re-send logic
      toast.success('Certificate re-sent successfully!', { position: "top-center", autoClose: 3000 });
  } catch (error) {
      console.error('Error re-sending certificate:', error);
      toast.error('Failed to resend certificate.', { position: "top-center", autoClose: 3000 });
  }
}


  // useEffect(() => {
  //   async function fetchCertificates() {
  //     const data = await fetchCertificatesFromFirebase(statusFilter);
  //     setCertificates(data);
  //   }
  //   fetchCertificates();
  // }, [statusFilter]);

  useEffect(() => {
    async function fetchData() {
      const eventsData = await fetchEvents()
      setEvents(eventsData)

      if (eventsData.length > 0) {
        setSelectedEvent(eventsData[0].title)
      }
    }
    fetchData()
  }, [])
  useEffect(() => {
    async function fetchCertificates() {
      const selectedEventData = events.find(event => event.title === selectedEvent);
      const eventName = selectedEventData ? selectedEventData.title : null; // Default if not found
      const data = await fetchCertificatesFromFirebase(statusFilter, selectedEvent,eventName)
      setCertificates(data)
    }
    if (selectedEvent) {
      fetchCertificates()
    }
  }, [statusFilter, selectedEvent,events])

  const handleEventChange = (e) => {
    setSelectedEvent(e.target.value)
  }

return (
 (
    <div className="p-6">
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Certificate Management</h1>
    <a href='/admin/events'><button className="bg-blue-600 text-white px-4 py-2 rounded">Issue New Certificate</button></a>
    </header>
    <div className="mb-4">
        <select className="border px-4 py-2 rounded w-full" value={selectedEvent} onChange={handleEventChange}>
          {events.map((event) => (
            <option key={event.id} value={event.title}>
              {event.title}
            </option>
          ))}
        </select>
      </div>

    <div className="flex mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search by name or ID"
          className="border px-4 py-2 rounded w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
         <select
          className="border px-4 py-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="revoked">Revoked</option>
        </select>
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">S/N</th>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Date Issued</th>
            <th className="border p-2">Event</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {certificates
            .filter((cert) => cert.name.toLowerCase().includes(searchQuery.toLowerCase()) || cert.certificateId.includes(searchQuery))
            .map((cert , index) => (
              <tr key={cert.id} className="hover:bg-gray-50">
                <td className="border p-2">{index + 1}</td> {/* S/N cell */}
                <td className="border p-2">{cert.certificateId}</td>
                <td className="border p-2">{cert.name}</td>
                <td className="border p-2">{cert.email}</td>
                <td className="border p-2">{new Date(cert.issueDate).toLocaleDateString()}</td>
                <td className="border p-2">{cert.eventName}</td>
                <td className="border p-2">
                  { (
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() =>deleteCertificate(cert.certificateId)}
                    >
                      Rollback
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
        </table>        
    </div>
 )
);
}