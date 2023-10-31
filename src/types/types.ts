import { ethers } from "ethers";

export type NetworksInfo = {
  [name: string]: { chainId: number; rpcUrl: string };
};

export interface UwallContext {
  state: {
    screenOn: string;
    wallet: ethers.Wallet;
    token: TokenObject;
    nft: NFTObject;
    balance: string;
    usd: number;
    password: string;
    repassword: string;
    mnemonic: string;
    active: false;
    walletKey: string;
    provider: ethers.providers.JsonRpcProvider;
    loading: boolean;
  };
  setWallet: (wallet: ethers.Wallet) => void;
  setActive: (active: boolean) => void;
  setPassword: (password: string) => void;
  setRepassword: (repassword: string) => void;
  setBalance: (balance: string) => void;
  setUsd: (balance: number) => void;
  setScreen: (screenOn: string) => void;
  setMnemonic: (mnemonic: string) => void;
  setToken: (token: TokenObject | undefined) => void;
  setNft: (nft: NFTObject) => void;
  setLoading: (loading: boolean) => void;
}

export interface EventObject {
  id: number;
  from: string;
  to: string;
  amount: string;
  blockNumber: number;
  transactionHash: string;
  timestamp: string;
}

export interface NFTObject {
  address: string;
  collection: string;
  id: string;
  name: string;
  description: string;
  tokenUri: string;
  image: string;
  contract: ethers.Contract;
}

export interface TokenObject {
  symbol: string;
  name: string;
  balance: number;
  address: string;
  contract: ethers.Contract;
  decimals: string;
  price: string;
  usd: number;
}
