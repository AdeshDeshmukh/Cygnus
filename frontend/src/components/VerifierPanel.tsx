import React, { useState } from 'react';

export const VerifierPanel = () => {
  const [credentialId, setCredentialId] = useState('');
  const [result, setResult] = useState<boolean | null>(null);
  const [status, setStatus] = useState('');

  const checkEligibility = async () => {
    if (!credentialId) { alert('Enter a credential ID'); return; }
    setStatus('Querying Midnight PreProd blockchain...');
    setResult(null);

    // In full integration: query contract.checkEligibility() via Midnight SDK
    await new Promise(r => setTimeout(r, 1500));

    // Simulate result (in real app: read from on-chain ledger state)
    const eligible = Math.random() > 0.3; // 70% chance for demo
    setResult(eligible);
    setStatus(eligible
      ? '✅ Credential verified on Midnight PreProd'
      : '❌ Eligibility proof not found or threshold not met');
  };

  return (
    <div className="panel verifier-panel">
      <h2>🏢 Employer / Institution — Verify Eligibility</h2>
      <p className="subtitle">
        Check if a candidate meets your requirements. You will see only PASS or FAIL.
        No grades. No personal data. Ever.
      </p>

      <label>Credential ID (provided by candidate)</label>
      <input value={credentialId} onChange={e => setCredentialId(e.target.value)}
        placeholder="e.g. 4721" />

      <button onClick={checkEligibility} className="btn-primary">
        Verify on Blockchain
      </button>

      {status && <p className="status">{status}</p>}

      {result !== null && (
        <div className={`result-card ${result ? 'pass' : 'fail'}`}>
          <div className="result-icon">{result ? '✅' : '❌'}</div>
          <div className="result-text">
            <strong>{result ? 'ELIGIBLE' : 'NOT ELIGIBLE'}</strong>
            <p>Credential #{credentialId}</p>
            <p className="privacy-tag">Grade data: never revealed · Verified by ZK proof on Midnight</p>
          </div>
        </div>
      )}
    </div>
  );
};
