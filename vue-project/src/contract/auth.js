import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/vue'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '75043e0dd2b224d692af49e65cb6d2b0'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const sepolia = {
    chainId: 11155111,
    name: 'Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://rpc2.sepolia.org'
    
}

const rootstocktestnet = {
    chainId: 31,
    name: 'Rootstock Testnet',
    currency: 'RBTC',
    explorerUrl: 'https://explorer.testnet.rsk.co',
    rpcUrl: 'https://public-node.testnet.rsk.co'
    }
    

// 3. Create your application's metadata object
const metadata = {
  name: 'Koopi Core',
  description: 'My Website description',
  url: 'https://localhost:5173', // url must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  // enableEIP6963: true, // true by default
  // enableInjected: true, // true by default
  // enableCoinbase: true, // true by default
  // rpcUrl: '...' // used for the Coinbase SDK
  // defaultChainId: 1, // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
const modal = createWeb3Modal({
  ethersConfig,
  chains: [mainnet, sepolia, rootstocktestnet],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})