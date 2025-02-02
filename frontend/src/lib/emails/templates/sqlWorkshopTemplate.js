// src/lib/emails/templates/sqlWorkshopTemplate.js
export function sqlWorkshopTemplate({ recipientName, certificateUrl, eventName }) {
  return `
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
          <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #0f9d58;">Congratulations, ${recipientName}!</h1>
        </div>
        <div style="padding: 30px; line-height: 1.6; color: #333;">
          <p style="margin-top: 0;">Dear <strong>${recipientName}</strong>,</p>
          <p>
            Congratulations on successfully completing the <strong style="color: #4285f4;">${eventName}</strong>!
            Throughout this intensive workshop, you've mastered essential database concepts and practical SQL skills:
          </p>
          <ul style="padding-left: 20px; margin-bottom: 20px;">
            <li style="margin-bottom: 10px;">
              <strong style="color: #0f9d58;">Relational Database Basics:</strong> 
              You've mastered key concepts including tables, schemas, primary and foreign keys, along with database design fundamentals through ER diagrams and normalization (1NF, 2NF, 3NF).
            </li>
            <li style="margin-bottom: 10px;">
              <strong style="color: #4285f4;">SQL Syntax Essentials:</strong> 
              Gained proficiency in both DDL (CREATE, ALTER, DROP) and DML (INSERT, SELECT, UPDATE, DELETE) operations.
            </li>
            <li style="margin-bottom: 10px;">
              <strong style="color: #db4437;">Advanced SQL Concepts:</strong> 
              Mastered complex operations including various types of joins (INNER, LEFT, RIGHT, FULL OUTER), along with GROUP BY, HAVING, ORDER BY, window functions, and subqueries.
            </li>
            <li style="margin-bottom: 10px;">
              <strong style="color: #f4b400;">Transactions and ACID Properties:</strong> 
              Learned critical transaction management using COMMIT, ROLLBACK, and SAVEPOINT operations.
            </li>
            <li style="margin-bottom: 10px;">
              <strong style="color: #0f9d58;">Indexing and Query Optimization:</strong> 
              Explored practical implementation of indexes and query analysis using EXPLAIN for optimization.
            </li>
          </ul>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong style="color: #4285f4;">Practical Implementation:</strong>
            <p style="margin: 10px 0;">You've successfully worked with a Restaurant Management System, applying your knowledge to real-world scenarios.</p>
            <strong style="color: #4285f4;">Additional Achievement:</strong>
            <p style="margin: 10px 0;">Completed Advanced Query Challenges in a gamified environment, demonstrating your ability to handle complex database operations.</p>
            <strong style="color: #4285f4;">Hands-on Experience:</strong>
            <p style="margin: 10px 0;">Successfully performed challenges on a massive RMS database, proving your ability to work with large-scale data systems.</p>
          </div>
          <p>
            Your certificate of completion is now available online. 
            <a 
              href="${certificateUrl}" 
              style="background-color: #4285f4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px; font-weight: bold;">
              View and Download Certificate
            </a>
          </p>
          <p style="margin-top: 20px;">
            Thank you for your active participation in the <strong>${eventName}</strong>. 
            We're confident that these database skills will prove invaluable in your future projects and career.
          </p>
          <p style="margin-bottom: 0;">Continue exploring the world of databases!</p>
        </div>
        <div style="background-color: #f4f4f9; padding: 20px; text-align: center; color: #666;">
          <p style="margin: 0; font-size: 14px;">Best regards,<br><strong>The GDG on Campus APSIT Team</strong></p>
          <div style="margin-top: 20px; font-size: 12px;">
            <a href="https://gdgoc-apsit.vercel.app/" style="color: #4285f4; text-decoration: none; margin: 0 10px;">Website</a>
            <a href="https://www.youtube.com/@GDGonCampusAPSIT" style="color: #4285f4; text-decoration: none; margin: 0 10px;">Youtube</a>
            <a href="https://www.linkedin.com/company/gdg-apsit" style="color: #4285f4; text-decoration: none; margin: 0 10px;">LinkedIn</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}