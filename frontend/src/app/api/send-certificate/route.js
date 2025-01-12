import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { recipientName, recipientEmail, certificateId, eventName } = await req.json();
    // Email Configuration
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: recipientEmail,
        subject: `Your Certificate of Completion of ${eventName}`,
        text: `Congratulations ${recipientName}!
      
      Your certificate for successfully attending/completing ${eventName} is now available online. Click the link below to view and download your certificate:
      
      ${process.env.BASE_URL}/certificate/${certificateId}
      
      Thank you for participating!
      
      Best regards,
      GDGoC APSIT Team`,
      });      

    return new Response(JSON.stringify({ message: 'Certificate sent successfully.' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending certificate:', error);
    return new Response(JSON.stringify({ error: 'Failed to send certificate.' }), {
      status: 500,
    });
  }
}
