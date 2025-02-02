'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';

export function CertificateManagement() {
    const [certificates, setCertificates] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState("");
    const [isResending, setIsResending] = useState({});

    async function fetchEvents() {
      const eventsRef = collection(db, "events");
      const snapshot = await getDocs(eventsRef);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    async function fetchCertificatesFromFirebase(status, eventName) {
      const certificatesRef = collection(db, 'certificates');
      let q = certificatesRef;
      if(status) { q = query(q, where('status', '==', status)); }
      if(eventName) { q = query(q, where('eventName', '==', eventName)); }
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    async function deleteCertificate(id) {
      const confirmDelete = window.confirm('Are you sure you want to delete this certificate?');
      if (!confirmDelete) return;

      try {
        const certRef = doc(db, 'certificates', id);
        await deleteDoc(certRef);
        setCertificates((prev) => prev.filter((cert) => cert.id !== id));
        toast.info('Certificate deleted successfully!', {position: "top-center", autoClose: 3000});
      } catch (err) {
        console.error('Error deleting certificate:', err);
        toast.warn('Failed to delete the certificate.', {position: "top-center", autoClose: 3000});
      }
    }

    async function resendCertificateEmail(certificate) {
      setIsResending(prev => ({ ...prev, [certificate.id]: true }));
      try {
        const mailResponse = await fetch("/api/send-certificate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipientName: certificate.name,
            recipientEmail: certificate.email,
            certificateId: certificate.certificateId,
            eventName: certificate.eventName,
          }),
        });

        if (!mailResponse.ok) {
          throw new Error('Failed to send email');
        }

        toast.success(`Certificate email resent to ${certificate.email}`, {
          position: "top-center",
          autoClose: 3000
        });
      } catch (error) {
        console.error('Error resending certificate email:', error);
        toast.error(`Failed to resend email to ${certificate.email}`, {
          position: "top-center",
          autoClose: 3000
        });
      } finally {
        setIsResending(prev => ({ ...prev, [certificate.id]: false }));
      }
    }

    useEffect(() => {
      async function fetchData() {
        const eventsData = await fetchEvents();
        setEvents(eventsData);
        if (eventsData.length > 0) {
          setSelectedEvent(eventsData[0].title);
        }
      }
      fetchData();
    }, []);

    useEffect(() => {
      async function fetchCertificates() {
        const selectedEventData = events.find(event => event.title === selectedEvent);
        const eventName = selectedEventData ? selectedEventData.title : null;
        const data = await fetchCertificatesFromFirebase(statusFilter, selectedEvent, eventName);
        const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
        setCertificates(sortedData);
      }
      if (selectedEvent) {
        fetchCertificates();
      }
    }, [statusFilter, selectedEvent, events]);

    const handleEventChange = (e) => {
      setSelectedEvent(e.target.value);
    };

    return (
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

        <div className="overflow-x-auto">
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
                .map((cert, index) => (
                  <tr key={cert.id} className="hover:bg-gray-50">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{cert.certificateId}</td>
                    <td className="border p-2">{cert.name}</td>
                    <td className="border p-2">{cert.email}</td>
                    <td className="border p-2">{new Date(cert.issueDate).toLocaleDateString()}</td>
                    <td className="border p-2">{cert.eventName}</td>
                    <td className="border p-2 space-x-2">
                      <a 
                        href={`/certificate/${cert.id}`}
                        className="inline-block bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                      >
                        View
                      </a>
                      <button
                        className={`px-3 py-1 rounded mr-2 ${isResending[cert.id] 
                          ? 'bg-gray-400 text-white cursor-not-allowed' 
                          : 'bg-green-600 text-white hover:bg-green-700'}`}
                        onClick={() => resendCertificateEmail(cert)}
                        disabled={isResending[cert.id]}
                      >
                        {isResending[cert.id] ? 'Sending...' : 'Resend Mail'}
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        onClick={() => deleteCertificate(cert.id)}
                      >
                        Rollback
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}