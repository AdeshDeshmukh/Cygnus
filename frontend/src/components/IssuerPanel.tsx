import React, { useState } from 'react';
import { useMidnight } from '../contexts/MidnightContext';

export const IssuerPanel = () => {
  const { isConnected } = useMidnight();
  const [studentId, setStudentId] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [threshold, setThreshold] = useState('70');
  const [status, setStatus] = useState('');
  const [credentialId, setCredentialId] = useState<number | null>(null);

  const issueCredential = async () => {
    if (!isConnected) { alert('Connect wallet first'); return; }
    setStatus('Signing credential with attestation API...');

    try {
      const res = await fetch('http://localhost:4000/api/credential/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, cgpa: parseFloat(cgpa), threshold: parseInt(threshold) })
      });
      const data = await res.json();

      setStatus('Deploying ZK commitment to Midnight PreProd...');
      // In full integration: call contract.issueCredential() via Midnight SDK
      // For demo: simulate with a delay
      await new Promise(r => setTimeout(r, 2000));

      const mockCredId = Math.floor(Math.random() * 10000);
      setCredentialId(mockCredId);
      setStatus(`✅ Credential issued! ID: ${mockCredId} | Commitment: ${data.commitment.slice(0,16)}...`);
    } catch (err) {
      setStatus(`❌ Error: ${err}`);
    }
  };

  return (
    <div className="panel issuer-panel">
      <h2>🏛️ University — Issue Credential</h2>
      <p className="subtitle">
        Commit a student's academic record on-chain. The grade is never revealed.
      </p>

      <label>Student ID</label>
      <input value={studentId} onChange={e => setStudentId(e.target.value)}
        placeholder="e.g. STU2024001" />

      <label>CGPA (private — stays off-chain)</label>
      <input type="number" value={cgpa} onChange={e => setCgpa(e.target.value)}
        placeholder="e.g. 8.7" min="0" max="10" step="0.1" />

      <label>Minimum threshold to disclose (public)</label>
      <select value={threshold} onChange={e => setThreshold(e.target.value)}>
        <option value="60">60 — Pass (6.0/10)</option>
        <option value="70">70 — Good (7.0/10)</option>
        <option value="80">80 — Very Good (8.0/10)</option>
        <option value="90">90 — Distinction (9.0/10)</option>
      </select>

      <button onClick={issueCredential} className="btn-primary">
        Issue ZK Credential
      </button>

      {status && <p className="status">{status}</p>}
      {credentialId !== null && (
        <div className="credential-id">
          <strong>Share this Credential ID with the student:</strong>
          <code>{credentialId}</code>
        </div>
      )}
    </div>
  );
};
