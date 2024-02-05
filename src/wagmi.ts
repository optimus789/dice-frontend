import { http, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { type Chain } from "viem";

const pegasus: Chain = {
  id: 1891,
  name: "Pegasus Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  // network: 'Pegasus Testnet',
  rpcUrls: {
    default: { http: ["https://replicator.pegasus.lightlink.io/rpc/v1"] },
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://pegasus.lightlink.io/" },
    snowtrace: { name: "SnowTrace", url: "https://pegasus.lightlink.io/" },
  },
  testnet: true,
};
export const config = createConfig({
  chains: [pegasus],
  connectors: [
    injected(),
    // coinbaseWallet({ appName: 'Create Wagmi' }),
    // walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID }),
  ],
  ssr: true,
  transports: {
    // You may want to use a custom RPC url here
    [pegasus.id]: http('https://replicator.pegasus.lightlink.io/rpc/v1')
  }
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
