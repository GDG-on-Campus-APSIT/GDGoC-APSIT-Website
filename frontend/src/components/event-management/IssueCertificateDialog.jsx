// IssueCertificateDialog.js
'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Papa from "papaparse";
import { addDoc, collection } from "firebase/firestore";
import { db } from '@/lib/firebase';

export function IssueCertificateDialog({ eventId, onClose }) {
  const [csvFile, setCsvFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      setError("Please upload a CSV file.");
      return;
    }

    try {
      const parsedData = await new Promise((resolve, reject) => {
        Papa.parse(csvFile, {
          header: true,
          complete: (results) => resolve(results.data),
          error: (error) => reject(error),
        });
      });

      const validParticipants = parsedData.filter(row => row.name && row.email);

      const certificatePromises = validParticipants.map(participant => {
        const uniqueId = `${eventId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        return addDoc(collection(db, "certificates"), {
          eventId,
          name: participant.name,
          email: participant.email,
          certificateId: uniqueId,
        });
      });

      await Promise.all(certificatePromises);
      alert("Certificates issued successfully!");
      onClose();
    } catch (error) {
      console.error("Error issuing certificates:", error);
      setError("Failed to process the file. Please try again.");
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
