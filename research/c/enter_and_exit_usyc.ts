import { Address, erc20ABI, writeContract } from '@wagmi/core'

const USYC_TELLER_ABI = [
  {
    inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
    name: 'sell',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
    name: 'buy',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

// Addresses on Ethereum Mainnet
const USYC_TELLER_ADDRESS: Address = '0xAAF405C48e8c73aECedA3E40fE34e5C0ff8f5DE5'
const USDC_ADDRESS: Address = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const USYC_ADDRESS: Address = '0x136471a34f6ef19fE571EFFC1CA711fdb8E49f2b'

// Quantities
const ONE_HUNDRED_USDC = BigInt(100_000000) // USDC decimals=6
const ONE_HUNDRED_USYC = BigInt(100_000000) // USYC decimals=6

// BUY USYC
export const approveUSYCTellerToSpendUSDC = () =>
  writeContract({
    chainId: 1,
    address: USDC_ADDRESS,
    abi: erc20ABI,
    functionName: 'approve',
    args: [USYC_TELLER_ADDRESS, ONE_HUNDRED_USDC],
  })
  
export const buyUSYC = () =>
  writeContract({
    address: USYC_TELLER_ADDRESS,
    chainId: 1,
    abi: USYC_TELLER_ABI,
    functionName: 'buy',
    args: [ONE_HUNDRED_USDC],
  })

// Sell USYC
export const approveUSYCTellerToSpendUSYC = () =>
  writeContract({
    chainId: 1,
    address: USYC_ADDRESS,
    abi: erc20ABI,
    functionName: 'approve',
    args: [USYC_TELLER_ADDRESS, ONE_HUNDRED_USYC],
  })

export const sellUSYC = () =>
  writeContract({
    address: USYC_TELLER_ADDRESS,
    chainId: 1,
    abi: USYC_TELLER_ABI,
    functionName: 'sell',
    args: [ONE_HUNDRED_USYC],
  })
