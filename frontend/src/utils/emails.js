// utils/emails.js

export function buildUpdateNotificationEmail(participant, eventName) {
    return `
        <p>Dear ${participant["User Name"]},</p>
        <p>The leaderboard for <strong>${eventName}</strong> has been updated.</p>
        <p>Your latest stats:</p>
        <ul>
            <li><strong>Skill Badges Completed:</strong> ${participant["No. of Skill Badges Completed"]}</li>
            <li><strong>Arcade Games Completed:</strong> ${participant["No. of Arcade Games Completed"]}</li>
            <li><strong>Total Completion:</strong> ${participant["Total Completion"]}</li>
        </ul>
        <p>You can view your profile here: <a href="${participant["Google Cloud Skills Boost Profile URL"]}">Profile Link</a></p>
        <p>Thank you for participating!</p>
    `;
}
