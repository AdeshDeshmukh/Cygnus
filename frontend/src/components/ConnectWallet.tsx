import React from 'react';
import { useMidnight } from '../contexts/MidnightContext';

export const ConnectWallet = () => {
  const { isConnected, walletAddress, connect } = useMidnight();

  return (
    <div className="wallet-bar">
      {isConnected ? (
        <div className="connected">
          <span className="dot" />
          <span>{walletAddress?.slice(0, 12)}...{walletAddress?.slice(-6)}</span>
        </div>
      ) : (
        <button onClick={connect} className="btn-connect">
          Connect Midnight Wallet
        </button>
      )}
    </div>
  );
};
