import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { participants, dailyStats, eventName, eventId } = body;

    // Validate required fields
    if (!participants || !dailyStats || !eventName || !eventId) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Replace with your SMTP provider
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER, // Your email
        pass: process.env.SMTP_PASS, // App-specific password
      },
    });

    const bccRecipients = participants.map(participant => participant["User Email"]);

    const { totalParticipants, totalBadges, totalGames, completionRate } = dailyStats.stats;

    const htmlContent = `
      <h1>${eventName} Leaderboard Update</h1>
      <p>Dear Participants,</p>
      <p>The leaderboard for <strong>${eventName}</strong> has been updated. Here are the daily stats:</p>
      <ul>
        <li><strong>Total Participants:</strong> ${totalParticipants}</li>
        <li><strong>Total Skill Badges Completed:</strong> ${totalBadges}</li>
        <li><strong>Total Arcade Games Completed:</strong> ${totalGames}</li>
        <li><strong>Completion Rate:</strong> ${completionRate}%</li>
      </ul>
      <p>Check out the leaderboard for more details and see how you rank:</p>
      <p><a href="https://gdgoc-apsit.vercel.app/events/${eventId}/leaderboard" style="color:blue; text-decoration:underline;">View Leaderboard</a></p>
      <p>Thank you for participating in ${eventName}!</p>
    `;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      bcc: bccRecipients,
      subject: `${eventName} Leaderboard Updated`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Emails sent successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending emails:", error.message);
    return new Response(JSON.stringify({ error: "Failed to send emails" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
