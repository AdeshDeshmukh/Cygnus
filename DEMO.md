# Cygnus — Hackathon Video Demo Script & Walkthrough

This document outlines the step-by-step demo workflow and timing script to record a professional **2–3 minute video** for the **Brainwave 2026 Midnight Track** submission.

---

## Preparation Checklist
Before recording, ensure:
1.  **Docker Desktop** is running and the local proof server container is active on port 6300.
2.  **Attestation API** is running (`npm run dev` inside `api/`) on port 4000.
3.  **Vite Dev Server** is running (`npm run dev` inside `frontend/`) and open at `http://localhost:5173`.
4.  **Midnight Lace Wallet Chrome Extension** is installed, set to the **Preprod Network**, and funded with testnet `tNIGHT`.
5.  Have a recording tool (like Loom, OBS Studio, or QuickTime) ready to record your browser window.

---

## Video Timeline & Script

### [0:00 – 0:30] Introduction & Hook
*   **Visual:** Show the landing page of the Cygnus DApp (`http://localhost:5173`) with the dark-themed glassmorphism UI. Click the **Connect Midnight Wallet** button in the header and show it successfully connecting to the Lace wallet address.
*   **Voiceover:** 
    > *"Every year, millions of students submit full academic transcripts to employers and universities just to prove they meet a single qualification requirement, like a minimum GPA. This over-exposes sensitive personal data. 
    > 
    > Introducing Cygnus, a privacy-preserving credential wallet built on the Midnight Network. Cygnus uses zero-knowledge cryptography to let students prove eligibility without revealing their actual grades, courses, or transcript details. Let’s see how it works across three roles."*

### [0:30 – 1:15] Step 1: The University Issues the Credential
*   **Visual:** Navigate to the **University** tab on the navigation bar. 
    *   Enter Student ID: `STU-2026-981`.
    *   Enter CGPA: `8.7`.
    *   Select Threshold: `80` (representing CGPA $\ge$ 8.0/10).
    *   Click **Issue ZK Credential**.
    *   Show the status changing: *Signing credential... Deploying ZK commitment to Midnight PreProd...*
    *   Show the generated green box with **Credential ID** (e.g., `4871`).
*   **Voiceover:** 
    > *"First, the University acts as the Issuer. Here on the University panel, we input a student ID, set their CGPA to 8.7, and select the eligibility threshold of 8.0. 
    > 
    > When we click 'Issue ZK Credential', our backend Attestation API signs the grade off-chain, deriving a cryptographic hash commitment. This commitment is published to the Midnight Preprod blockchain. The blockchain learns that a grade exists, but the grade itself stays private and stays off the ledger. We copy the generated Credential ID, 4871, to send to the student."*

### [1:15 – 2:00] Step 2: The Student Proves Eligibility
*   **Visual:** Toggle the navigation tab to **Student**.
    *   Paste the Credential ID: `4871`.
    *   Input the private CGPA: `8.7`.
    *   Click **Generate & Submit ZK Proof**.
    *   Point to the loader: *Generating zero-knowledge proof locally... Running ZK circuits via Midnight proof server...*
    *   Show the green badge popping up: **✅ PROOF ON-CHAIN - Credential #4871**.
*   **Voiceover:** 
    > *"Next, the Student receives their Credential ID. On the Student Wallet panel, they enter the ID and input their private CGPA. 
    > 
    > When they click 'Generate & Submit ZK Proof', their laptop runs our Compact zero-knowledge circuit locally, communicating with a local proof server. The circuit verifies that this grade matches the university's on-chain commitment and that it is greater than or equal to the threshold. 
    > 
    > A zero-knowledge proof is generated and submitted to the blockchain. The student's private grade never leaves their browser—it never touches the blockchain, the university servers, or the recruiter."*

### [2:00 – 2:45] Step 3: The Recruiter Verifies Eligibility
*   **Visual:** Navigate to the **Employer** tab.
    *   Paste the Credential ID: `4871`.
    *   Click **Verify on Blockchain**.
    *   Show the query status loading, followed by the appearance of the green card: **✅ ELIGIBLE (Credential #4871)**.
    *   Point to the privacy caption at the bottom of the card.
*   **Voiceover:** 
    > *"Finally, the Recruiter checks the applicant's eligibility. They enter the Credential ID and click 'Verify'. 
    > 
    > The DApp queries the on-chain ledger state directly. The recruiter sees exactly one thing: a green ELIGIBLE verification. They receive absolute mathematical proof that the candidate qualifies, but they learn zero information about the candidate's exact CGPA, courses, or personal background. 
    > 
    > Cygnus bridges trust and privacy on the Midnight Network—allowing you to prove you qualify, while revealing nothing else. Thank you."*

---

## Recording Tips
*   **Pacing:** Keep your mouse movements smooth. Do not rush while the loader animations are running; use that time to explain the ZK proof generation taking place locally.
*   **Resolution:** Record in full 1080p, and zoom in on the browser slightly so the text is highly readable on mobile screens.
*   **Lace Wallet:** When connecting, make sure your Lace wallet window is positioned cleanly or show the pop-up transaction approval steps if you have them integrated.
