// api/token.js — Vercel serverless function
// Issues a short-lived (10-min) Azure Speech auth token.
// The Azure key never leaves this server-side function.
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const key    = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION || 'eastus';

  if (!key) {
    return res.status(500).json({ error: 'AZURE_SPEECH_KEY environment variable is not set.' });
  }

  try {
    const response = await fetch(
      `https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      { method: 'POST', headers: { 'Ocp-Apim-Subscription-Key': key } }
    );

    if (!response.ok) {
      return res.status(502).json({ error: `Azure returned HTTP ${response.status}` });
    }

    const token = await response.text();
    return res.status(200).json({ token, region });
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
}
