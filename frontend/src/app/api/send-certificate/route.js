// src/app/api/send-certificate/route.js
import nodemailer from "nodemailer";
import { getEmailTemplate } from "@/lib/emails/templateSelector";

export async function POST(req) {
  try {
    const { recipientName, recipientEmail, certificateId, eventName } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const certificateUrl = `${process.env.BASE_URL}/certificate/${certificateId}`;
    const htmlContent = getEmailTemplate(eventName, {
      recipientName,
      certificateUrl,
      eventName
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: `Congratulations on Completing ${eventName}!`,
      html: htmlContent,
    });

    return new Response(JSON.stringify({ message: "Certificate sent successfully." }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending certificate:", error);
    return new Response(JSON.stringify({ error: "Failed to send certificate." }), {
      status: 500,
    });
  }
}