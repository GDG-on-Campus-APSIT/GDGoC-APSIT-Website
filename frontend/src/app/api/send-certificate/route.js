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
      subject: `Congratulations on Completing ${eventName}!`,
      text: `Congratulations ${recipientName}!

During this program, you delved into core Google Cloud concepts, gaining valuable insights into:

* **Cloud Computing Fundamentals:** You now have a strong understanding of how Google Cloud works, including its compute, storage, and networking services. This foundational knowledge empowers you to design and deploy scalable and reliable cloud solutions.
* **Data Handling & Analysis:** You explored how to leverage Cloud Storage for efficient data management, utilize API Gateway to create and manage APIs, and harness the power of Looker and Dataplex for data analysis and transformation. These skills are highly sought after in today's data-driven world.
* **Developer Productivity Tools:** You learned how to streamline workflows with Google Workspace Tools, build serverless functions with Cloud Functions, and deploy applications on App Engine. These tools and techniques will significantly boost your productivity as a developer. 
* **AI & Machine Learning:** You explored the capabilities of Cloud Speech API for speech-to-text applications, learned how to analyze images with Cloud Vision API, and delved into the exciting world of generative AI with Vertex AI and Gemini. These skills are at the forefront of technological innovation.

This knowledge will equip you with the skills to build innovative and impactful cloud-based applications.

Your certificate of completion is now available online. Click the link below to view and download:

${process.env.BASE_URL}/certificate/${certificateId}

Thank you for participating in ${eventName}! We hope you continue to explore the exciting world of Google Cloud.

Best regards,
The GDGoC APSIT Team`,
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
