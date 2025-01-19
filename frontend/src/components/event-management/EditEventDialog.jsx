"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { handleEditEvent } from "@/lib/eventActions";

export function EditEventDialog({ event, onClose }) {
  const [editedEvent, setEditedEvent] = useState(event);
  const [leaderboardFile, setLeaderboardFile] = useState(null);
  const [dateTBA, setDateTBA] = useState(false);
  const [sendMail, setSendMail] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const [csvError, setCsvError] = useState(null); // to store any missing fields error

  const requiredCSVFields = [
    "User Name",
    "User Email",
    "Google Cloud Skills Boost Profile URL",
    "Profile URL Status",
    "Access Code Redemption Status",
    "No. of Skill Badges Completed",
    "No. of Arcade Games Completed",
    "Total Completion",
  ];

  useEffect(() => {
    if (dateTBA) {
      setEditedEvent((prev) => ({
        ...prev,
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
      }));
    }
  }, [dateTBA]);

  //function to validate the csv file before calling the handleEditEvent function.
  //Show missing fields if any
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
            resolve(true); // Pass parsed data for further processing
          }
        },
        error: (error) => reject(`Error parsing CSV file: ${error.message}`),
      });
    });
  };

  const handleFileChange = (file) => {
    validateCSVFile(file)
      .then(() => {
        setLeaderboardFile(file);
        setCsvError(null); // Clear previous errors
      })
      .catch((error) => {
        setCsvError(error); // Show the error message
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalCategory =
        editedEvent.category === "custom"
          ? customCategory
          : editedEvent.category;
      await handleEditEvent({
        ...editedEvent,
        leaderboardFile,
        category: finalCategory,
        sendMail,
      });
      onClose();
    } catch (error) {
      console.error("Failed to edit event:", error);
      // Here you might want to show an error message to the user
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-title">Event Title</Label>
            <Input
              id="edit-title"
              value={editedEvent.title}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, title: e.target.value })
              }
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="date-tba"
              checked={dateTBA}
              onCheckedChange={setDateTBA}
            />
            <Label htmlFor="date-tba">Date TBA</Label>
          </div>
          {!dateTBA && (
            <>
              <div>
                <Label htmlFor="edit-start-date">Start Date</Label>
                <Input
                  id="edit-start-date"
                  type="date"
                  value={editedEvent.startDate}
                  onChange={(e) =>
                    setEditedEvent({
                      ...editedEvent,
                      startDate: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-start-time">Start Time</Label>
                <Input
                  id="edit-start-time"
                  type="time"
                  value={editedEvent.startTime}
                  onChange={(e) =>
                    setEditedEvent({
                      ...editedEvent,
                      startTime: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-end-date">End Date</Label>
                <Input
                  id="edit-end-date"
                  type="date"
                  value={editedEvent.endDate}
                  onChange={(e) =>
                    setEditedEvent({ ...editedEvent, endDate: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-end-time">End Time</Label>
                <Input
                  id="edit-end-time"
                  type="time"
                  value={editedEvent.endTime}
                  onChange={(e) =>
                    setEditedEvent({ ...editedEvent, endTime: e.target.value })
                  }
                  required
                />
              </div>
            </>
          )}
          <div>
            <Label htmlFor="edit-location">Location</Label>
            <Input
              id="edit-location"
              value={editedEvent.location}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, location: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-category">Category</Label>
            <Select
              value={editedEvent.category}
              onValueChange={(value) => {
                setEditedEvent({ ...editedEvent, category: value });
                if (value === "custom") {
                  setCustomCategory("");
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="tech-talk">Tech Talk</SelectItem>
                <SelectItem value="hackathon">Hackathon</SelectItem>
                <SelectItem value="seminar">Seminar</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {editedEvent.category === "custom" && (
            <div>
              <Label htmlFor="edit-custom-category">Custom Category</Label>
              <Input
                id="edit-custom-category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={editedEvent.description}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, description: e.target.value })
              }
              required
            />
          </div>
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
            <div className="flex justify-between mt-2">
              <Label htmlFor="edit-leaderboard-file">
                Upload Leaderboard (CSV)
              </Label>
              <a
                href="/template.csv"
                download
                className="text-blue-300 underline text-sm"
              >
                Get CSV template
              </a>
            </div>
            <Input
              id="edit-leaderboard-file"
              type="file"
              accept=".csv"
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
            {csvError && <p className="text-red-500 text-sm">{csvError}</p>}
          </div>
          {leaderboardFile && !csvError && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="send-mail"
                checked={sendMail}
                onCheckedChange={setSendMail}
              />
              <Label htmlFor="send-mail">Send Mail</Label>
            </div>
          )}
          <div>
            <Label htmlFor="date">Upload Date</Label>
            <Input
              id="uploadDate"
              type="date"
              value={editedEvent.uploadDate}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, uploadDate: e.target.value })
              }
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={csvError !== null}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
