"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InfoCircledIcon } from "@radix-ui/react-icons";

import Papa from "papaparse";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function IssueCertificateDialog({ eventId, eventName, onClose }) {
  const [csvFile, setCsvFile] = useState(null);
  const [error, setError] = useState("");

  const requiredCSVFields = ["name", "email"];

  const validateCSVFile = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const uploadedFields = results.meta.fields || [];
          const missingFields = requiredCSVFields.filter(
            (field) => !uploadedFields.includes(field)
          );

          if (missingFields.length > 0) {
            reject(`Missing required fields: ${missingFields.join(", ")}`);
          } else {
            resolve(true);
          }
        },
        error: (error) => reject(`Error parsing CSV file: ${error.message}`),
      });
    });
  };

  const handleFileChange = (file) => {
    validateCSVFile(file)
      .then(() => {
        setCsvFile(file);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

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
      const validParticipants = parsedData.filter(
        (row) => row.name && row.email
      );

      // Create certificates in Firestore and trigger mail
      const certificatePromises = validParticipants.map(async (participant) => {
        const uniqueId = `${eventId}-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`;
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
        const mailResponse = await fetch("/api/send-certificate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipientName: participant.name,
            recipientEmail: participant.email,
            certificateId: uniqueId,
            eventName,
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
            <Accordion type="single" collapsible className="mt-0">
              <AccordionItem value="required-fields">
                <AccordionTrigger className="text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <InfoCircledIcon />
                    Required CSV Fields
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-gray-400">
                    {requiredCSVFields.map((field) => (
                      <li key={field}>{field}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex justify-between items-center mt-2">
              <label htmlFor="csv-input">Upload CSV file</label>
              <a
                href="/users-template.csv"
                download={true}
                className="text-blue-300 underline text-sm"
              >
                Get template
              </a>
            </div>
            <Input
              id="csv-input"
              type="file"
              accept=".csv"
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={error !== null}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
