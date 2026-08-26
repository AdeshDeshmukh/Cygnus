import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MidnightContextType {
  isConnected: boolean;
  walletAddress: string | null;
  contractAddress: string | null;
  connect: () => Promise<void>;
  setContractAddress: (addr: string) => void;
}

const MidnightContext = createContext<MidnightContextType | null>(null);

export const MidnightProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [contractAddress, setContractAddress] = useState<string | null>(null);

  const connect = async () => {
    try {
      // Connect to Midnight Lace wallet via DApp Connector API
      const connector = (window as any).midnight?.mnLace;
      if (!connector) {
        console.warn('Lace connector not found. Running in Simulator Mode.');
        setWalletAddress('mn_addr_preprod1vc393m7q2n60tukjjn4hvvucvr9um96qeps6vm6l6wqdajlpfj4sdjly9m');
        setIsConnected(true);
        return;
      }
      const api = await connector.enable();
      const addresses = await api.getUsedAddresses();
      setWalletAddress(addresses[0] || 'connected');
      setIsConnected(true);
    } catch (err) {
      console.error('Wallet connection failed:', err);
      // For demo/dev: simulate connected state
      setWalletAddress('dev-wallet-simulated');
      setIsConnected(true);
    }
  };

  return (
    <MidnightContext.Provider value={{
      isConnected, walletAddress, contractAddress, connect, setContractAddress
    }}>
      {children}
    </MidnightContext.Provider>
  );
};

export const useMidnight = () => {
  const ctx = useContext(MidnightContext);
  if (!ctx) throw new Error('useMidnight must be inside MidnightProvider');
  return ctx;
};
