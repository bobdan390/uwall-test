import { Wallet } from "ethers";

export default async function decryptWallet(jsonWallet: string, password: string) {
  const wallet = await Wallet.fromEncryptedJson(jsonWallet, password);
  return wallet;
}
