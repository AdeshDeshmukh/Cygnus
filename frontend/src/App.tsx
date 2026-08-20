import React, { useState } from 'react';
import { MidnightProvider } from './contexts/MidnightContext';
import { ConnectWallet } from './components/ConnectWallet';
import { IssuerPanel } from './components/IssuerPanel';
import { StudentWallet } from './components/StudentWallet';
import { VerifierPanel } from './components/VerifierPanel';
import './styles.css';

type Role = 'issuer' | 'student' | 'verifier';

export default function App() {
  const [activeRole, setActiveRole] = useState<Role>('student');

  return (
    <MidnightProvider>
      <div className="app">
        <header>
          <div className="brand">
            <span className="logo">🔐</span>
            <div>
              <h1>Cygnus</h1>
              <p>Privacy-preserving academic credentials on Midnight Network</p>
            </div>
          </div>
          <ConnectWallet />
        </header>

        <nav className="role-nav">
          {(['issuer', 'student', 'verifier'] as Role[]).map(role => (
            <button
              key={role}
              className={activeRole === role ? 'active' : ''}
              onClick={() => setActiveRole(role)}
            >
              {role === 'issuer' ? '🏛️ University' :
               role === 'student' ? '🎓 Student' : '🏢 Employer'}
            </button>
          ))}
        </nav>

        <main>
          {activeRole === 'issuer' && <IssuerPanel />}
          {activeRole === 'student' && <StudentWallet />}
          {activeRole === 'verifier' && <VerifierPanel />}
        </main>

        <footer>
          <p>Built on <strong>Midnight Network</strong> · Zero-knowledge proofs powered by Compact</p>
          <p>Private data never leaves your device · Hackathon: Brainwave 2026 Midnight Track</p>
        </footer>
      </div>
    </MidnightProvider>
  );
}
