import { ethers } from "ethers";
import { NFTObject } from "~/types";
import { TokenObject } from "~/types";

export const initialState = {
  screenOn: "login",
  walletKey: "vault",
  password: "",
  repassword: "",
  mnemonic: "",
  active: false,
  loading: false,
  balance: "",
  usd: 0,
  wallet: {} as ethers.Wallet,
  token: undefined as TokenObject | undefined,
  nft: {} as NFTObject,
  provider: new ethers.providers.JsonRpcProvider(process.env.REACT_APP_POLYGON_PROVIDER),
};

export default initialState;
