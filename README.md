# Cygnus — ZK Academic Credential Wallet

**Prove you qualify. Reveal nothing else.**

Built for the **Brainwave 2026 Midnight Blockchain Track**.

Cygnus is a privacy-preserving academic credential system built on the **Midnight Network**. Using zero-knowledge proofs and Compact smart contracts, students can prove they meet eligibility requirements (e.g., CGPA $\ge$ 8.0/10) without revealing their actual grades, courses, or personal academic transcript history.

---

## The Privacy Paradigm

In traditional academic applications, students are forced to share their entire transcript (disclosing failures, course retakes, and grades in unrelated subjects) just to prove one binary question: *"Do I meet your minimum requirements?"*

**Cygnus** changes this paradigm using Zero-Knowledge (ZK) cryptography:
*   **The University (Issuer)** publishes a cryptographic commitment (hash) of the student's grade on-chain. The raw grade is never stored on the ledger.
*   **The Student (Holder)** inputs their grade as a private *witness* to generate a ZK proof locally on their machine. The proof verifies that the secret grade matches the commitment and meets the threshold.
*   **The Employer (Verifier)** checks the proof on-chain and receives a strict `PASS / FAIL` validation. They gain absolute assurance of data integrity with zero exposure to raw grades.

---

## Active PreProd Deployment

Cygnus is compiled and deployed to the public **Midnight PreProd Network**:
*   **On-Chain Contract Address:** `53fe8fbc9c9cf5477266d6bf60e8be66525016d55a5e69bddf2a5bf2c3d6b3e1`
*   **Deployer Wallet Address:** `mn_addr_preprod1vc393m7q2n60tukjjn4hvvucvr9um96qeps6vm6l6wqdajlpfj4sdjly9m`

---

## Tech Stack

*   **Midnight Network:** Privacy-first L1 blockchain (PreProd testnet).
*   **Compact:** Midnight's smart contract language for writing zero-knowledge circuits.
*   **React + Vite:** Frontend DApp using TypeScript and a modern glassmorphism dark-theme design.
*   **Midnight DApp Connector API:** Integrates with the Google Chrome Midnight Lace wallet extension.
*   **Express + TypeScript:** Attestation API backend to securely sign credential hashes off-chain.
*   **Docker Desktop:** Hosts the local proof server container required to compile contracts and verify client-side proofs locally.

---

## Project Structure

```
Cygnus/
├── contract/         # Compact smart contract circuits & compiled TS bindings
├── api/              # Express Attestation API for off-chain record signing
├── frontend/         # React DApp client (University, Student, and Recruiter UIs)
├── cli/              # CLI scripts mapping deployment options
├── preprod-deploy/   # Midnight deployment configuration directory
└── package.json      # Workspace configurations linking all modules
```

---

## Installation & Setup

### 1. Prerequisites
Ensure you have the following installed on your host system:
*   **Node.js** (v22+) & **npm**
*   **Docker Desktop** (running in the background)
*   **Compact Compiler** (v0.31.1+):
    ```bash
    curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
    source ~/.zshrc
    compact update
    ```

### 2. Clone and Install dependencies
Clone this repository and run npm install at the root level to configure workspaces:
```bash
git clone https://github.com/AdeshDeshmukh/Cygnus.git
cd Cygnus
npm install
```

### 3. Spin up the Local Proof Server
Open Docker Desktop and start the Midnight Proof Server. This container compiles contracts and generates ZK proofs locally on port 6300:
```bash
docker run -p 6300:6300 midnightntwrk/proof-server:8.1.0 midnight-proof-server -v
```

### 4. Compile the Smart Contract
Compile the Compact circuits and generate the TypeScript bindings and proving keys:
```bash
cd contract
npm run compact
npm run build
cd ..
```

### 5. Launch the Attestation API Server
Set up the local environment and launch the Express backend on port 4000:
```bash
cd api
cp .env.example .env
npm run dev
```

### 6. Run the Frontend Client
Launch the Vite React frontend server locally on port 5173:
```bash
cd frontend
npm run dev
```

---

## How to Test the DApp Workflow

1.  Ensure you have the [Midnight Lace Wallet](https://midnight.network) extension installed in Google Chrome.
2.  Switch the Lace wallet network to **Preprod** and fund it using the [Preprod Faucet](https://midnight-tmnight-preprod.nethermind.dev).
3.  Open `http://localhost:5173` in your browser.
4.  **University Panel:** Input a Mock Student ID, set CGPA to `8.7`, set the threshold to `80` (CGPA $\ge$ 8.0/10), and click **Issue ZK Credential**. This calls the Attestation API and publishes the commitment to Midnight PreProd. Copy the generated **Credential ID**.
5.  **Student Panel:** Enter the **Credential ID** and input your private CGPA (`8.7`). Click **Generate & Submit ZK Proof**. This runs local ZK circuit verification on your machine via the local proof server and updates the on-chain status to `VERIFIED`.
6.  **Employer Panel:** Enter the **Credential ID** and click **Verify on Blockchain**. The app queries the ledger and displays a green `ELIGIBLE` card. Your raw grade `8.7` is never exposed to the employer or saved on the blockchain.

---

## License

MIT © 2026 Adesh Kishor Deshmukh
