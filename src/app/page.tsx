'use client';
import './globals.css';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import WagerGame from './components/WagerGame';

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  // const { address, isConnecting, isDisconnected } = useAccount();

  return   account.status === 'connected' ? (
          <>
          <WagerGame/>
          <button type='button' onClick={() => disconnect()}>
            Disconnect
          </button>
          </>
        ): 
      <div>
        <h1>Account</h1>

        <div>
          {account.addresses ? account?.addresses[0] : ''}
          chainId: {account.chainId}
        </div>
        <div>
        <h2>Connect</h2>
        {connectors.map(
          (connector) =>
            connector.name === 'MetaMask' && (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                type='button'
              >
                Connect Wallet
              </button>
            )
        )}
        <div>{status}</div>
        <div>{error?.message}</div>
        </div>
      </div>
      
}

export default App;
