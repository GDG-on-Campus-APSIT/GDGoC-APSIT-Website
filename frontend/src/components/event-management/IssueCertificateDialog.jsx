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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "react-toastify";
import Papa from "papaparse";

export function IssueCertificateDialog({ eventId, eventName, onClose }) {
  const [csvFile, setCsvFile] = useState(null);
  const [certificateType, setCertificateType] = useState("");
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processingSummary, setProcessingSummary] = useState({
    total: 0,
    processed: 0,
    issued: 0,
    duplicates: [],
    errors: []
  });
  
  const requiredCSVFields = ["name", "email"];
  
  const certificateTypes = [
    "Completion",
    "Attendance",
    "Volunteering",
    "Speaker",
    "Excellence"
  ];

  const validateCSVFile = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const { data, meta } = results;
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
            resolve(data);
          }
        },
        error: (error) => reject(`Error parsing CSV file: ${error.message}`),
      });
    });
  };

  const checkForExistingCertificate = async (email) => {
    const certificatesRef = collection(db, "certificates");
    const q = query(
      certificatesRef,
      where("eventId", "==", eventId),
      where("email", "==", email),
      where("type", "==", certificateType)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const downloadResultsCSV = (originalData, results) => {
    const csvData = originalData.map(row => ({
      ...row,
      certificateType,
      status: results.duplicates.includes(row.email) 
        ? 'duplicate' 
        : results.errors.find(e => e.email === row.email) 
          ? 'error' 
          : 'issued'
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `certificate_issuance_results_${eventName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const parsedData = await validateCSVFile(file);
      setCsvFile(file);
      setError(null);
      setProcessingSummary(prev => ({ ...prev, total: parsedData.length }));
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
    
    if (!certificateType) {
      setError("Please select a certificate type.");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const parsedData = await validateCSVFile(csvFile);
      const results = {
        total: parsedData.length,
        processed: 0,
        issued: 0,
        duplicates: [],
        errors: []
      };

      for (const participant of parsedData) {
        try {
          const isDuplicate = await checkForExistingCertificate(participant.email);
          
          if (isDuplicate) {
            results.duplicates.push(participant.email);
          } else {
            const uniqueId = `${eventId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const issueDate = new Date().toISOString();

            await addDoc(collection(db, "certificates"), {
              eventId,
              eventName,
              name: participant.name,
              email: participant.email,
              certificateId: uniqueId,
              type: certificateType,
              issueDate,
              status: 'active'
            });

            const mailResponse = await fetch("/api/send-certificate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                recipientName: participant.name,
                recipientEmail: participant.email,
                certificateId: uniqueId,
                eventName,
                certificateType,
              }),
            });

            if (!mailResponse.ok) {
              throw new Error(`Failed to send email to ${participant.email}`);
            }

            results.issued++;
          }
        } catch (error) {
          results.errors.push({
            email: participant.email,
            error: error.message
          });
        }

        results.processed++;
        const progressPercent = (results.processed / results.total) * 100;
        setProgress(progressPercent);
        setProcessingSummary(results);
      }

      downloadResultsCSV(parsedData, results);

      toast.success(`Processing complete:
        ${results.issued} certificates issued,
        ${results.duplicates.length} duplicates skipped,
        ${results.errors.length} errors`, {
        position: "bottom-right",
        autoClose: 5000
      });

      if (results.errors.length === 0 && results.duplicates.length === 0) {
        onClose();
      }
    } catch (error) {
      console.error("Error processing certificates:", error);
      setError("Failed to process the file. Please try again.");
      toast.error("Processing failed. Please try again.", {
        position: "bottom-right"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Issue Certificates</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="certificate-type" className="block mb-2">
                Certificate Type
              </label>
              <Select
                value={certificateType}
                onValueChange={setCertificateType}
                disabled={isProcessing}
              >
                <SelectTrigger id="certificate-type">
                  <SelectValue placeholder="Select certificate type" />
                </SelectTrigger>
                <SelectContent>
                  {certificateTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
            
            <div>
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
                disabled={isProcessing}
              />
            </div>
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-500">
                Processed: {processingSummary.processed} / {processingSummary.total}
              </p>
              <p className="text-sm text-green-500">
                Issued: {processingSummary.issued}
              </p>
              {processingSummary.duplicates.length > 0 && (
                <div className="text-sm text-yellow-500">
                  <p>Duplicates: {processingSummary.duplicates.length}</p>
                  <ul className="text-xs mt-1 ml-4">
                    {processingSummary.duplicates.map((email, i) => (
                      <li key={i}>{email}</li>
                    ))}
                  </ul>
                </div>
              )}
              {processingSummary.errors.length > 0 && (
                <div className="text-sm text-red-500">
                  <p>Errors: {processingSummary.errors.length}</p>
                  <ul className="text-xs mt-1 ml-4">
                    {processingSummary.errors.map((error, i) => (
                      <li key={i}>{error.email}: {error.error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {error && <p className="text-red-500">{error}</p>}
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!csvFile || !certificateType || isProcessing}
            >
              {isProcessing ? "Processing..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}