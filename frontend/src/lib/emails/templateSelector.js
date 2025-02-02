// src/lib/emails/templateSelector.js
import { studyJamTemplate } from "./templates/studyJamTemplate";
import { sqlWorkshopTemplate } from "./templates/sqlWorkshopTemplate";

export function getEmailTemplate(eventName, data) {
  const templates = {
    'Google GenAI Study Jam': studyJamTemplate,
    'SQL Mastery Bootcamp': sqlWorkshopTemplate
    // Add new event templates here
  };

  const templateFn = templates[eventName];
  if (!templateFn) {
    console.warn(`No template found for event: ${eventName}. Falling back to Study Jam template.`);
    return studyJamTemplate(data);
  }

  return templateFn(data);
}