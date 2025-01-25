import nodemailer from "nodemailer"

export async function POST(req) {
  try {
    const { recipientName, recipientEmail, certificateId, eventName } = await req.json()

    // Email Configuration
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // HTML Email Content
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Congratulations on Completing ${eventName}!</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f9; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <div style="text-align: center;">
            <img src="${process.env.BASE_URL}/GDG_logo_horizontal.png" alt="GDG Email Header" style="width: 100%; height: auto; display: block; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #4285f4;">Congratulations, ${recipientName}!</h1>
          </div>
          <div style="padding: 30px; line-height: 1.6; color: #333;">
            <p style="margin-top: 0;">Dear <strong>${recipientName}</strong>,</p>
            <p>
              We're thrilled to congratulate you on successfully completing <strong style="color: #4285f4;">${eventName}</strong>!
              During this program, you've delved into core Google Cloud concepts, gaining valuable insights into:
            </p>
            <ul style="padding-left: 20px; margin-bottom: 20px;">
              <li style="margin-bottom: 10px;"><strong style="color: #0f9d58;">Cloud Computing Fundamentals:</strong> Understanding compute, storage, and networking services for scalable cloud solutions.</li>
              <li style="margin-bottom: 10px;"><strong style="color: #4285f4;">Data Handling & Analysis:</strong> Leveraging Cloud Storage, API Gateway, and Looker for data transformation and analysis.</li>
              <li style="margin-bottom: 10px;"><strong style="color: #db4437;">Developer Productivity Tools:</strong> Building serverless functions and deploying applications efficiently.</li>
              <li style="margin-bottom: 10px;"><strong style="color: #f4b400;">AI & Machine Learning:</strong> Exploring tools like Cloud Vision API, Vertex AI, and generative AI innovations.</li>
            </ul>
            <p>
              Your certificate of completion is now available online. 
              <a 
                href="${process.env.BASE_URL}/certificate/${certificateId}" 
                style="background-color: #4285f4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px; font-weight: bold;">
                View and Download Certificate
              </a>
            </p>
            <p style="margin-top: 20px;">
              Thank you for participating in <strong>${eventName}</strong>. 
              We hope you continue to explore the exciting world of Google Cloud and apply your newfound knowledge to innovative projects.
            </p>
            <p style="margin-bottom: 0;">Keep learning and growing!</p>
          </div>
          <div style="background-color: #f4f4f9; padding: 20px; text-align: center; color: #666;">
            <p style="margin: 0; font-size: 14px;">Best regards,<br><strong>The GDGoC APSIT Team</strong></p>
            <div style="margin-top: 20px; font-size: 12px;">
              <a href="https://gdgoc-apsit.vercel.app/" style="color: #4285f4; text-decoration: none; margin: 0 10px;">Website</a>
              <a href="https://www.youtube.com/@GDGonCampusAPSIT" style="color: #4285f4; text-decoration: none; margin: 0 10px;">Youtube</a>
              <a href="https://www.linkedin.com/company/gdg-apsit" style="color: #4285f4; text-decoration: none; margin: 0 10px;">LinkedIn</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: `Congratulations on Completing ${eventName}!`,
      html: htmlContent,
    })

    return new Response(JSON.stringify({ message: "Certificate sent successfully." }), {
      status: 200,
    })
  } catch (error) {
    console.error("Error sending certificate:", error)
    return new Response(JSON.stringify({ error: "Failed to send certificate." }), {
      status: 500,
    })
  }
}

