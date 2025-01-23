'use client';

import { useState, useEffect } from 'react';

//import { Certificate } from './certificate'; // Adjust the import path
import { db } from '@/lib/firebase'; // Adjust the path based on your setup
import { collection, getDocs, doc, deleteDoc} from 'firebase/firestore';
import { toast } from 'react-toastify';

export function CertificateManagement(){
    const [certificates, setCertificates] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

     // Fetch certificates from Firebase
  async function fetchCertificatesFromFirebase(status) {
    const certificatesRef = collection(db, 'certificates');
   // const q = status ? query(certificatesRef, where('status', '==', status)) : certificatesRef;
    const snapshot = await getDocs(certificatesRef);
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

  useEffect(() => {
    async function fetchCertificates() {
      const data = await fetchCertificatesFromFirebase(statusFilter);
      setCertificates(data);
    }
    fetchCertificates();
  }, [statusFilter]);

return (
 (
    <div className="p-6">
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Certificate Management</h1>
    <a href='/admin/events'><button className="bg-blue-600 text-white px-4 py-2 rounded">Issue New Certificate</button></a>
    </header>

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
            .map((cert) => (
              <tr key={cert.id} className="hover:bg-gray-50">
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