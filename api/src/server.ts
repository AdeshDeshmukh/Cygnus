import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
app.use(cors());
app.use(express.json());

// In production: load from a secure key store
// For demo: generate a keypair on startup
const issuerKeyPair = {
  privateKey: process.env.ISSUER_PRIVATE_KEY || crypto.randomBytes(32).toString('hex'),
  publicKey: ''
};

// POST /api/credential/sign
// University calls this to sign a student's academic record
// Returns a signed commitment (grade stays server-side in real use)
app.post('/api/credential/sign', (req, res) => {
  const { studentId, cgpa, threshold } = req.body;

  if (!studentId || cgpa === undefined || !threshold) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Create a deterministic commitment to the grade
  const gradeData = Buffer.from(JSON.stringify({ studentId, cgpa }));
  const hmac = crypto.createHmac('sha256', issuerKeyPair.privateKey);
  hmac.update(gradeData);
  const signature = hmac.digest('hex');

  return res.json({
    success: true,
    studentId,
    threshold,
    // cgpa is NOT returned — it stays with the university
    commitment: signature,
    issuerPublicKey: issuerKeyPair.privateKey.slice(0, 32), // demo only
    timestamp: Date.now()
  });
});

// GET /api/health
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Cygnus Attestation API' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Cygnus Attestation API running on http://localhost:${PORT}`);
  console.log(`Issuer public key: ${issuerKeyPair.privateKey.slice(0, 16)}...`);
});
