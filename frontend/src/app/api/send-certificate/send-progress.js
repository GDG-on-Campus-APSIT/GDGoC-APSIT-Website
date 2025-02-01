// pages/api/send-certificates.js
let progressStore = {};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Expecting CSV data or file details in the request body.
    const { entries, processId } = req.body; // entries: [{ name, email }, ...]
    
    // Initialize progress for this processId
    progressStore[processId] = {
      total: entries.length,
      success: 0,
      failure: 0,
      done: false,
    };

    // Process entries sequentially (for demo purposes)
    // You might want to handle errors and parallelism differently.
    for (const entry of entries) {
      try {
        // Assume sendCertificate is a function that sends a certificate.
        await sendCertificate(entry);
        progressStore[processId].success++;
      } catch (error) {
        progressStore[processId].failure++;
      }
      // Optionally, you can add a delay to simulate processing time
    }

    // Mark as done when finished
    progressStore[processId].done = true;

    // Respond immediately after processing
    return res.status(200).json({ message: 'Certificate sending completed.' });
  } else if (req.method === 'GET') {
    // GET method used to query progress
    const { processId } = req.query;
    const progress = progressStore[processId];
    if (!progress) {
      return res.status(404).json({ error: 'Process not found.' });
    }
    return res.status(200).json(progress);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

// Dummy sendCertificate function for demonstration
async function sendCertificate({ name, email }) {
  // Simulate sending certificate (replace with your actual sending logic)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Randomly resolve or reject to simulate success/failure
      Math.random() > 0.2 ? resolve() : reject(new Error('Failed to send'));
    }, 500);
  });
}
