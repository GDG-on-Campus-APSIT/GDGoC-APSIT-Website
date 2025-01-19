'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Papa from "papaparse";
import { addDoc, collection } from "firebase/firestore";
import { db } from '@/lib/firebase';
import { toast , Bounce } from 'react-toastify';

export function IssueCertificateDialog({ eventId, eventName, onClose }) {
  const [csvFile, setCsvFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

    const issue = ()=>toast.success('Certiicate Issued',{position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,})

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!csvFile) {
      setError("Please upload a CSV file.");
      return;
    }

    try {
      // Parse CSV file
      const parsedData = await new Promise((resolve, reject) => {
        Papa.parse(csvFile, {
          header: true,
          complete: (results) => resolve(results.data),
          error: (error) => reject(error),
        });
      });

      // Filter valid participants
      const validParticipants = parsedData.filter(row => row.name && row.email);

      // Create certificates in Firestore and trigger mail
      const certificatePromises = validParticipants.map(async (participant) => {
        const uniqueId = `${eventId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const issueDate = new Date().toISOString(); // Current date as ISO string

        // Add certificate details to Firestore
        await addDoc(collection(db, "certificates"), {
          eventId,
          eventName,
          name: participant.name,
          email: participant.email,
          certificateId: uniqueId,
          issueDate, // Store issue date
        });
        

        // Trigger mail function
        const mailResponse = await fetch('/api/send-certificate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipientName: participant.name,
            recipientEmail: participant.email,
            certificateId: uniqueId,
            eventName
          }),
        });

        if (!mailResponse.ok) {
          throw new Error(`Failed to send email to ${participant.email}`);
        }
      });

      await Promise.all(certificatePromises);

      alert("Certificates issued and emailed successfully!");
      onClose();
    } catch (error) {
      console.error("Error issuing certificates:", error);
      setError("Failed to process the file or send emails. Please try again.");
      toast.error('Failed to process the file or send emails. Please try again.',{position: "bottom-right",});
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Issue Certificates</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={()=>{
              onClose();
              issue();
            }}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
