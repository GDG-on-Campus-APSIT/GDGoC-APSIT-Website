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
import Papa from "papaparse";
import {
  addDoc,
  collection,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast, Bounce } from "react-toastify";

export function IssueCertificateDialog({ eventId, eventName, onClose }) {
  const [csvFile, setCsvFile] = useState(null);
  const [error, setError] = useState(null);
  const requiredCSVFields = ["name", "email"];

  const issue = () =>
    toast.success("Certificate issued and emailed successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const validateCSVFile = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const { meta } = results;
          const uploadedFields = meta.fields || [];
          const missingFields = requiredCSVFields.filter(
            (field) => !uploadedFields.includes(field)
          );
          if (missingFields.length > 0) {
            reject(
              `The uploaded file is missing the following required fields: ${missingFields.join(
                ", "
              )}`
            );
          } else {
            resolve(true);
          }
        },
        error: (error) =>
          reject(`Error parsing CSV file: ${error.message}`),
      });
    });
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    try {
      await validateCSVFile(file);
      setCsvFile(file);
      setError(null);
    } catch (error) {
      setError(error);
      setCsvFile(null);
    }
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
      

      // 1. Create certificate documents in Firestore (without sending emails yet)
      const certificateDocs = await Promise.all(
        validParticipants.map(async (participant) => {
          const uniqueId = `${eventId}-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;
          const issueDate = new Date().toISOString();

          return {
            participant,
            uniqueId,
            issueDate,
            docRef: await addDoc(collection(db, "certificates"), {
              eventId,
              eventName,
              name: participant.name,
              email: participant.email,
              certificateId: uniqueId,
              issueDate,
              sent: false,
              status: "issued",
            }),
          };
        })
      );

      // 2. Now, fetch all relevant certificate documents in a single query
      const certificateIds = certificateDocs.map((doc) => doc.uniqueId); // Get all ids
      const certificatesQuery = query(
        collection(db, "certificates"),
        where("certificateId", "in", certificateIds) // Efficient batch query
      );
      const certificatesSnapshot = await getDocs(certificatesQuery);
      const existingCertificates = certificatesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 3. Send emails only for certificates that haven't been sent
      const emailPromises = certificateDocs.map(async ({
        participant,
        uniqueId,
        docRef,
      }) => {
        const existingCert = existingCertificates.find(
          (cert) => cert.certificateId === uniqueId
        );

        if (!existingCert || !existingCert.sent) {
          try {
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

            if (mailResponse.ok) {
              await updateDoc(docRef, { sent: true });
              console.log(`Sent to ${participant.email}`);
            } else {
              const errorData = await mailResponse.json();
              console.error(
                `Failed to send to ${participant.email}:`,
                errorData
              );
              await updateDoc(docRef, {
                status: "sending_failed",
                sent: false,
                error: errorData,
              });
              toast.error(
                `Failed: ${errorData?.message || "Unknown error"}`,
                { position: "bottom-right" }
              );
            }
          } catch (emailError) {
            console.error(
              `Error sending email to ${participant.email}:`,
              emailError
            );
          }
        } else {
          toast.success("Certificate already sent.", {autoClose: 5000});
          console.log(`Certificate ${uniqueId} already sent. Skipping.`);
        }
      });

      await Promise.all(emailPromises);

      issue();
      onClose();
    } catch (error) {
      console.error("Error issuing certificates:", error);
      setError(
        "Failed to process the file or send emails. Please try again."
      );
      toast.error(
        "Failed to process the file or send emails. Please try again.",
        { position: "bottom-right" }
      );
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
            <Accordion type="single" collapsible>
              <AccordionItem value="required-fields">
                <AccordionTrigger className="text-sm text-gray-400">
                  Required CSV Fields
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                    {requiredCSVFields.map((field) => (
                      <li key={field}>{field}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex justify-between items-center">
              <label htmlFor="file-input">Upload File</label>
              <a
                href="/certificate-template.csv"
                download
                className="text-blue-400 text-sm underline"
              >
                Download Template
              </a>
            </div>
            <Input
              id="file-input"
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
